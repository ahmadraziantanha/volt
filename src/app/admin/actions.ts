"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthed } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type {
  CouponDiscountType,
  OrderStatus,
  ShippingSettings,
} from "@/lib/supabase/types";

const VALID_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isAdminAuthed()) return { ok: false, error: "Not authorized." };
  if (!VALID_STATUSES.includes(status))
    return { ok: false, error: "Invalid status." };

  const supabase = getSupabaseAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ordersTable: any = supabase.from("orders");
  const { error } = await ordersTable
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error("[updateOrderStatus] failed:", error);
    return { ok: false, error: "Could not update order." };
  }

  revalidatePath("/admin");
  return { ok: true };
}

export interface UpdateProductInput {
  productId: string;
  name: string;
  base_price: number; // cents
  variants: Array<{ id: string; stock: number }>;
}

export async function updateProduct(
  input: UpdateProductInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isAdminAuthed()) return { ok: false, error: "Not authorized." };
  if (!input.name?.trim()) return { ok: false, error: "Name is required." };
  if (!Number.isFinite(input.base_price) || input.base_price < 0)
    return { ok: false, error: "Invalid price." };

  const supabase = getSupabaseAdmin();

  // Update product row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const productsTable: any = supabase.from("products");
  const { error: pErr } = await productsTable
    .update({ name: input.name.trim(), base_price: Math.round(input.base_price) })
    .eq("id", input.productId);

  if (pErr) {
    console.error("[updateProduct] product update failed:", pErr);
    return { ok: false, error: "Could not update product." };
  }

  // Update each variant's stock
  for (const v of input.variants) {
    if (!Number.isFinite(v.stock) || v.stock < 0) continue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const variantsTable: any = supabase.from("product_variants");
    const { error: vErr } = await variantsTable
      .update({ stock: Math.round(v.stock) })
      .eq("id", v.id);
    if (vErr) {
      console.error("[updateProduct] variant update failed:", vErr);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");

  return { ok: true };
}

// =====================================================================
// Shipping settings
// =====================================================================

export async function updateShippingSettings(
  input: ShippingSettings
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isAdminAuthed()) return { ok: false, error: "Not authorized." };
  if (!Number.isFinite(input.flat_fee_cents) || input.flat_fee_cents < 0)
    return { ok: false, error: "Invalid shipping fee." };
  if (!Number.isFinite(input.free_threshold_cents) || input.free_threshold_cents < 0)
    return { ok: false, error: "Invalid free-shipping threshold." };

  const supabase = getSupabaseAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settingsTable: any = supabase.from("settings");
  const { error } = await settingsTable.upsert(
    {
      key: "shipping",
      value: {
        flat_fee_cents: Math.round(input.flat_fee_cents),
        free_threshold_cents: Math.round(input.free_threshold_cents),
        enabled: Boolean(input.enabled),
      },
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );

  if (error) {
    console.error("[updateShippingSettings] failed:", error);
    return { ok: false, error: "Could not save settings." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/checkout");

  return { ok: true };
}

// =====================================================================
// Coupons
// =====================================================================

export interface CreateCouponInput {
  code: string;
  description?: string;
  discount_type: CouponDiscountType;
  discount_value: number; // percent (1..100) OR cents
  min_subtotal?: number; // cents
  max_uses?: number | null;
  valid_until?: string | null;
  active?: boolean;
}

export async function createCoupon(
  input: CreateCouponInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isAdminAuthed()) return { ok: false, error: "Not authorized." };
  const code = input.code?.trim().toUpperCase();
  if (!code || code.length < 3 || code.length > 32)
    return { ok: false, error: "Code must be 3–32 characters." };
  if (!/^[A-Z0-9_-]+$/.test(code))
    return { ok: false, error: "Code may only contain A–Z, 0–9, dash, underscore." };
  if (!["percent", "fixed"].includes(input.discount_type))
    return { ok: false, error: "Invalid discount type." };
  if (!Number.isFinite(input.discount_value) || input.discount_value <= 0)
    return { ok: false, error: "Discount value must be positive." };
  if (input.discount_type === "percent" && input.discount_value > 100)
    return { ok: false, error: "Percent discount cannot exceed 100." };

  const supabase = getSupabaseAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const couponsTable: any = supabase.from("coupons");
  const { error } = await couponsTable.insert({
    code,
    description: input.description?.trim() || null,
    discount_type: input.discount_type,
    discount_value: Math.round(input.discount_value),
    min_subtotal: Math.max(0, Math.round(input.min_subtotal ?? 0)),
    max_uses: input.max_uses ?? null,
    valid_until: input.valid_until || null,
    active: input.active ?? true,
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "A coupon with that code already exists." };
    }
    console.error("[createCoupon] failed:", error);
    return { ok: false, error: "Could not create coupon." };
  }

  revalidatePath("/admin");
  return { ok: true };
}

export async function toggleCoupon(
  id: string,
  active: boolean
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isAdminAuthed()) return { ok: false, error: "Not authorized." };

  const supabase = getSupabaseAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const couponsTable: any = supabase.from("coupons");
  const { error } = await couponsTable.update({ active }).eq("id", id);

  if (error) {
    console.error("[toggleCoupon] failed:", error);
    return { ok: false, error: "Could not update coupon." };
  }

  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteCoupon(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isAdminAuthed()) return { ok: false, error: "Not authorized." };

  const supabase = getSupabaseAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const couponsTable: any = supabase.from("coupons");
  const { error } = await couponsTable.delete().eq("id", id);

  if (error) {
    console.error("[deleteCoupon] failed:", error);
    return { ok: false, error: "Could not delete coupon." };
  }

  revalidatePath("/admin");
  return { ok: true };
}
