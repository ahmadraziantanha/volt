"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  LogOut,
  Moon,
  Package,
  Receipt,
  Settings as SettingsIcon,
  Sun,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsRow } from "./StatsRow";
import { OrdersTable } from "./OrdersTable";
import { ProductsTable } from "./ProductsTable";
import { CouponsPanel } from "./CouponsPanel";
import { SettingsPanel } from "./SettingsPanel";
import { ReportsPanel } from "./ReportsPanel";
import type { AdminStats } from "@/lib/admin/queries";
import type { ReportSnapshot } from "@/lib/admin/reports";
import type {
  CouponRow,
  OrderRow,
  ProductWithVariants,
  ShippingSettings,
} from "@/lib/supabase/types";

interface Props {
  stats: AdminStats;
  orders: OrderRow[];
  products: ProductWithVariants[];
  coupons: CouponRow[];
  shipping: ShippingSettings;
  report: ReportSnapshot;
}

export function AdminShell({
  stats,
  orders,
  products,
  coupons,
  shipping,
  report,
}: Props) {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("volt-admin-theme") as "light" | "dark" | null;
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("volt-admin-theme", next);
  };

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className={cn(
      "min-h-screen px-5 md:px-8 pt-10 md:pt-14 pb-20 bg-bg transition-colors duration-300",
      theme === "light" ? "admin-light" : ""
    )}>
      {/* Header */}
      <header className="flex items-center justify-between pb-8 md:pb-10 mb-8 md:mb-10 border-b border-line-2">
        <div>
          <div className="text-[11px] font-mono text-accent tracking-wider mb-2">
            VOLT · ADMIN
          </div>
          <h1 className="text-[26px] md:text-[32px] font-medium text-text tracking-tight">
            Dashboard<span className="text-quiet">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Light / dark toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="inline-flex items-center justify-center w-10 h-10 border border-line-2 text-body hover:text-text hover:border-muted transition-colors"
          >
            {theme === "light"
              ? <Moon strokeWidth={1.5} className="h-4 w-4" />
              : <Sun  strokeWidth={1.5} className="h-4 w-4" />}
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 h-10 px-4 border border-line-2 text-[12px] text-body hover:text-text hover:border-muted transition-colors"
          >
            <LogOut strokeWidth={1.5} className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </header>

      {/* Stats */}
      <StatsRow stats={stats} />

      {/* Tabs */}
      <div className="mt-10 md:mt-14">
        <Tabs defaultValue="orders">
          <TabsList className="overflow-x-auto no-scrollbar">
            <TabsTrigger value="orders">
              <Receipt strokeWidth={1.5} className="h-3.5 w-3.5" />
              Orders
              <span className="ml-1 text-[10px] font-mono text-body">
                ({orders.length})
              </span>
            </TabsTrigger>
            <TabsTrigger value="products">
              <Package strokeWidth={1.5} className="h-3.5 w-3.5" />
              Products
              <span className="ml-1 text-[10px] font-mono text-body">
                ({products.length})
              </span>
            </TabsTrigger>
            <TabsTrigger value="coupons">
              <Tag strokeWidth={1.5} className="h-3.5 w-3.5" />
              Coupons
              <span className="ml-1 text-[10px] font-mono text-body">
                ({coupons.length})
              </span>
            </TabsTrigger>
            <TabsTrigger value="reports">
              <BarChart3 strokeWidth={1.5} className="h-3.5 w-3.5" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon strokeWidth={1.5} className="h-3.5 w-3.5" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTable orders={orders} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTable products={products} />
          </TabsContent>

          <TabsContent value="coupons">
            <CouponsPanel coupons={coupons} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsPanel snapshot={report} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel initial={shipping} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
