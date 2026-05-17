"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getShippingSettings, calculateShipping } from "@/lib/settings";
import {
  validateCouponServer,
  incrementCouponUses,
  type ValidatedCoupon,
} from "@/lib/coupons";
import type { CouponDiscountType, OrderItem, ShippingAddress } from "@/lib/supabase/types";

export interface PlaceOrderInput {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: ShippingAddress;
  notes?: string;
  couponCode?: string;
  items: Array<{
    productId: string;
    variantId: string;
    qty: number;
  }>;
}

export type PlaceOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(input: PlaceOrderInput): string | null {
  const { customer, shipping, items } = input;
  if (!customer.name?.trim()) return "Name is required.";
  if (!customer.email?.trim() || !EMAIL_RE.test(customer.email))
    return "A valid email is required.";
  if (!customer.phone?.trim() || customer.phone.replace(/\D/g, "").length < 7)
    return "A valid phone number is required.";
  if (!shipping.line1?.trim()) return "Address is required.";
  if (!shipping.city?.trim()) return "City is required.";
  if (!shipping.country?.trim()) return "Country is required.";
  if (!shipping.postal_code?.trim()) return "Postal code is required.";
  if (!Array.isArray(items) || items.length === 0) return "Your cart is empty.";
  for (const it of items) {
    if (!it.productId || !it.variantId) return "Invalid cart item.";
    if (!Number.isFinite(it.qty) || it.qty < 1 || it.qty > 99)
      return "Invalid quantity.";
  }
  return null;
}

// =====================================================================
// validateCoupon  — exposed to the client checkout form
// =====================================================================

export type ValidateCouponResult =
  | { ok: true; code: string; discount: number; type: CouponDiscountType; value: number }
  | { ok: false; error: string };

export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<ValidateCouponResult> {
  const res = await validateCouponServer(code, subtotal);
  if (!res.ok) return res;
  const c: ValidatedCoupon = res.coupon;
  return {
    ok: true,
    code: c.code,
    discount: c.discount,
    type: c.type,
    value: c.value,
  };
}

// =====================================================================
// placeOrder
// =====================================================================

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const invalid = validate(input);
  if (invalid) return { ok: false, error: invalid };

  const supabase = getSupabaseAdmin();
  const variantIds = input.items.map((i) => i.variantId);

  // 1. Fetch variants
  type VariantLite = {
    id: string;
    product_id: string;
    color_name: string;
    stock: number;
    image_urls: string[];
  };
  const variantQuery = await supabase
    .from("product_variants")
    .select("id, product_id, color_name, stock, image_urls")
    .in("id", variantIds);

  if (variantQuery.error || !variantQuery.data) {
    console.error("[placeOrder] variant fetch failed:", variantQuery.error);
    return { ok: false, error: "Could not verify cart. Try again." };
  }
  const variants = variantQuery.data as unknown as VariantLite[];

  // 2. Fetch parent products
  type ProductLite = { id: string; name: string; base_price: number };
  const productIds = Array.from(new Set(variants.map((v) => v.product_id)));
  const productQuery = await supabase
    .from("products")
    .select("id, name, base_price")
    .in("id", productIds);

  if (productQuery.error || !productQuery.data) {
    console.error("[placeOrder] product fetch failed:", productQuery.error);
    return { ok: false, error: "Could not verify cart. Try again." };
  }
  const products = productQuery.data as unknown as ProductLite[];

  const productById = new Map(products.map((p) => [p.id, p]));

  // Build server-trusted line items
  const lineItems: OrderItem[] = [];
  let subtotal = 0;
  for (const item of input.items) {
    const variant = variants.find((v) => v.id === item.variantId);
    if (!variant)
      return { ok: false, error: "Cart contains a product we no longer carry." };
    const product = productById.get(variant.product_id);
    if (!product)
      return { ok: false, error: "Cart contains a product we no longer carry." };
    if (variant.stock < item.qty)
      return {
        ok: false,
        error: `${product.name} (${variant.color_name}) — only ${variant.stock} left.`,
      };

    lineItems.push({
      product_id: product.id,
      variant_id: variant.id,
      product_name: product.name,
      variant_color: variant.color_name,
      qty: item.qty,
      unit_price: product.base_price,
    });
    subtotal += product.base_price * item.qty;
  }

  // Coupon (optional)
  let discount = 0;
  let couponCode: string | null = null;
  let validatedCoupon: ValidatedCoupon | null = null;
  if (input.couponCode?.trim()) {
    const couponRes = await validateCouponServer(input.couponCode, subtotal);
    if (!couponRes.ok) {
      return { ok: false, error: couponRes.error };
    }
    discount = couponRes.coupon.discount;
    couponCode = couponRes.coupon.code;
    validatedCoupon = couponRes.coupon;
  }

  // Shipping fee from settings
  const settings = await getShippingSettings();
  const shipping = calculateShipping(subtotal, settings);
  const total = Math.max(0, subtotal - discount + shipping);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ordersTable: any = supabase.from("orders");
  const insertResult = await ordersTable
    .insert({
      customer_name: input.customer.name.trim(),
      customer_email: input.customer.email.trim().toLowerCase(),
      customer_phone: input.customer.phone.trim(),
      shipping_address: input.shipping,
      items: lineItems,
      subtotal,
      shipping,
      discount,
      coupon_code: couponCode,
      total,
      notes: input.notes?.trim() || null,
      payment_method: "cod",
      status: "pending",
    })
    .select("id")
    .single();

  if (insertResult.error || !insertResult.data) {
    console.error("[placeOrder] insert failed:", insertResult.error);
    return { ok: false, error: "Could not place the order. Try again." };
  }
  const order = insertResult.data as { id: string };

  // Decrement stock per variant (best-effort)
  for (const item of input.items) {
    const variant = variants.find((v) => v.id === item.variantId);
    if (!variant) continue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const variantsTable: any = supabase.from("product_variants");
    await variantsTable
      .update({ stock: variant.stock - item.qty })
      .eq("id", variant.id);
  }

  if (validatedCoupon) {
    await incrementCouponUses(validatedCoupon.id);
  }

  revalidatePath("/");
  revalidatePath("/shop");

  return { ok: true, orderId: order.id };
}
