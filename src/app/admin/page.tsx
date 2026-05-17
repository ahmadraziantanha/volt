import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthed } from "@/lib/admin/auth";
import {
  getAdminStats,
  getAllCoupons,
  getAllOrders,
  getAllProductsAdmin,
  getShippingSettingsAdmin,
} from "@/lib/admin/queries";
import { getReportSnapshot } from "@/lib/admin/reports";

export const metadata: Metadata = {
  title: "Admin",
  description: "VOLT internal — orders and inventory.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminAuthed()) {
    return <AdminLogin />;
  }

  const [stats, orders, products, coupons, shipping, report] = await Promise.all([
    getAdminStats(),
    getAllOrders(),
    getAllProductsAdmin(),
    getAllCoupons(),
    getShippingSettingsAdmin(),
    getReportSnapshot(30),
  ]);

  return (
    <AdminShell
      stats={stats}
      orders={orders}
      products={products}
      coupons={coupons}
      shipping={shipping}
      report={report}
    />
  );
}
