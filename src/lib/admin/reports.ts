import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { OrderItem, OrderStatus } from "@/lib/supabase/types";

type AggregatedOrder = {
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  created_at: string;
};

export interface DailyPoint {
  date: string; // YYYY-MM-DD
  orders: number;
  revenue: number; // cents (delivered + shipped + confirmed only)
}

export interface ProductSale {
  productName: string;
  qty: number;
  revenue: number; // cents
}

export interface StatusCount {
  status: OrderStatus;
  count: number;
}

export interface ReportSnapshot {
  windowDays: number;
  ordersTotal: number;
  revenueTotal: number;        // cents
  pendingRevenue: number;      // cents (status pending/confirmed/shipped)
  collectedRevenue: number;    // cents (status delivered)
  avgOrderValue: number;       // cents
  daily: DailyPoint[];
  topProducts: ProductSale[];
  statusBreakdown: StatusCount[];
}

const ACTIVE_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
];

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function getReportSnapshot(windowDays = 30): Promise<ReportSnapshot> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from("orders")
    .select("total, status, items, created_at")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  const rows = ((data as unknown as AggregatedOrder[] | null) ?? []).filter(
    (r): r is AggregatedOrder => !!r
  );

  if (error) {
    console.error("[getReportSnapshot] failed:", error);
  }

  // Daily series
  const daily = new Map<string, DailyPoint>();
  for (let i = 0; i < windowDays; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (windowDays - 1 - i));
    daily.set(ymd(d), { date: ymd(d), orders: 0, revenue: 0 });
  }

  const productMap = new Map<string, ProductSale>();
  const statusMap = new Map<OrderStatus, number>();

  let ordersTotal = 0;
  let revenueTotal = 0;
  let pendingRevenue = 0;
  let collectedRevenue = 0;
  let activeOrders = 0;

  for (const row of rows) {
    const key = ymd(new Date(row.created_at));
    const bucket = daily.get(key);
    if (bucket) bucket.orders += 1;

    statusMap.set(row.status, (statusMap.get(row.status) ?? 0) + 1);

    if (row.status === "cancelled") continue;

    ordersTotal += 1;
    activeOrders += 1;
    revenueTotal += row.total;

    if (bucket && ACTIVE_STATUSES.includes(row.status)) {
      bucket.revenue += row.total;
    }

    if (row.status === "delivered") {
      collectedRevenue += row.total;
    } else {
      pendingRevenue += row.total;
    }

    for (const item of row.items ?? []) {
      const existing = productMap.get(item.product_name);
      if (existing) {
        existing.qty += item.qty;
        existing.revenue += item.unit_price * item.qty;
      } else {
        productMap.set(item.product_name, {
          productName: item.product_name,
          qty: item.qty,
          revenue: item.unit_price * item.qty,
        });
      }
    }
  }

  const topProducts = Array.from(productMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const statusBreakdown = (
    [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ] as OrderStatus[]
  ).map((status) => ({
    status,
    count: statusMap.get(status) ?? 0,
  }));

  const avgOrderValue = activeOrders > 0 ? Math.round(revenueTotal / activeOrders) : 0;

  return {
    windowDays,
    ordersTotal,
    revenueTotal,
    pendingRevenue,
    collectedRevenue,
    avgOrderValue,
    daily: Array.from(daily.values()),
    topProducts,
    statusBreakdown,
  };
}
