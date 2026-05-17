import "server-only";
import { getSupabaseAdmin } from "./supabase/server";
import type { CouponDiscountType, CouponRow } from "./supabase/types";

export interface ValidatedCoupon {
  id: string;
  code: string;
  type: CouponDiscountType;
  value: number;
  discount: number;
}

export type CouponValidationResult =
  | { ok: true; coupon: ValidatedCoupon }
  | { ok: false; error: string };

/**
 * Server-side coupon validation. Pass the cart subtotal (cents) and the code
 * to apply. Returns the resolved discount in cents or an explanatory error.
 */
export async function validateCouponServer(
  rawCode: string,
  subtotal: number
): Promise<CouponValidationResult> {
  const code = rawCode?.trim().toUpperCase();
  if (!code) return { ok: false, error: "Enter a coupon code." };

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .ilike("code", code)
    .maybeSingle();

  if (error) {
    console.error("[validateCouponServer] lookup failed:", error);
    return { ok: false, error: "Could not check that coupon." };
  }
  if (!data) return { ok: false, error: "That coupon code doesn't exist." };

  const coupon = data as unknown as CouponRow;

  if (!coupon.active) return { ok: false, error: "This coupon is inactive." };
  if (coupon.valid_until && new Date(coupon.valid_until) < new Date())
    return { ok: false, error: "This coupon has expired." };
  if (coupon.max_uses !== null && coupon.uses_count >= coupon.max_uses)
    return { ok: false, error: "This coupon has been fully redeemed." };
  if (subtotal < coupon.min_subtotal)
    return {
      ok: false,
      error: `Spend at least $${(coupon.min_subtotal / 100).toFixed(0)} to use this coupon.`,
    };

  const discount =
    coupon.discount_type === "percent"
      ? Math.floor((subtotal * coupon.discount_value) / 100)
      : Math.min(subtotal, coupon.discount_value);

  return {
    ok: true,
    coupon: {
      id: coupon.id,
      code: coupon.code,
      type: coupon.discount_type,
      value: coupon.discount_value,
      discount,
    },
  };
}

export async function incrementCouponUses(couponId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const couponsTable: any = supabase.from("coupons");
  const { data, error } = await couponsTable
    .select("uses_count")
    .eq("id", couponId)
    .maybeSingle();

  if (error || !data) {
    console.error("[incrementCouponUses] read failed:", error);
    return;
  }

  await couponsTable
    .update({ uses_count: (data.uses_count ?? 0) + 1 })
    .eq("id", couponId);
}
