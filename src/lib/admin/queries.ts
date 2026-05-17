import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type {
  CouponRow,
  OrderRow,
  ProductWithVariants,
  ShippingSettings,
} from "@/lib/supabase/types";

export interface AdminStats {
  todaysOrders: number;
  todaysOrdersValue: number; // cents (excludes cancelled)
  totalProducts: number;
  lowStockVariants: number;
}

function startOfTodayISO(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return start.toISOString();
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = getSupabaseAdmin();
  const sinceIso = startOfTodayISO();

  const [ordersToday, productsCount, lowStock] = await Promise.all([
    supabase
      .from("orders")
      .select("total, status")
      .gte("created_at", sinceIso),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase
      .from("product_variants")
      .select("id", { count: "exact", head: true })
      .lte("stock", 5),
  ]);

  const ordersTodayRows =
    (ordersToday.data as Array<{ total: number; status: string }> | null) ?? [];

  const todaysOrders = ordersTodayRows.length;
  const todaysOrdersValue = ordersTodayRows
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  return {
    todaysOrders,
    todaysOrdersValue,
    totalProducts: productsCount.count ?? 0,
    lowStockVariants: lowStock.count ?? 0,
  };
}

export async function getAllOrders(): Promise<OrderRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAllOrders] failed:", error);
    return [];
  }
  return (data ?? []) as OrderRow[];
}

export async function getAllProductsAdmin(): Promise<ProductWithVariants[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[getAllProductsAdmin] failed:", error);
    return [];
  }
  return (data ?? []) as ProductWithVariants[];
}

export async function getAllCoupons(): Promise<CouponRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAllCoupons] failed:", error);
    return [];
  }
  return (data ?? []) as unknown as CouponRow[];
}

const DEFAULT_SHIPPING: ShippingSettings = {
  flat_fee_cents: 1500,
  free_threshold_cents: 20000,
  enabled: true,
};

export async function getShippingSettingsAdmin(): Promise<ShippingSettings> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "shipping")
    .maybeSingle();

  if (error || !data) return DEFAULT_SHIPPING;

  const value = (data as { value: Partial<ShippingSettings> }).value ?? {};
  return {
    flat_fee_cents:
      typeof value.flat_fee_cents === "number"
        ? value.flat_fee_cents
        : DEFAULT_SHIPPING.flat_fee_cents,
    free_threshold_cents:
      typeof value.free_threshold_cents === "number"
        ? value.free_threshold_cents
        : DEFAULT_SHIPPING.free_threshold_cents,
    enabled:
      typeof value.enabled === "boolean"
        ? value.enabled
        : DEFAULT_SHIPPING.enabled,
  };
}
