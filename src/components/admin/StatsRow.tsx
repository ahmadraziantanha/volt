import { Package, Receipt, AlertTriangle, ShoppingBag, type LucideIcon } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { AdminStats } from "@/lib/admin/queries";

interface Stat {
  label: string;
  value: string;
  Icon: LucideIcon;
  hint?: string;
  accent?: boolean;
}

export function StatsRow({ stats }: { stats: AdminStats }) {
  const cells: Stat[] = [
    {
      label: "TODAY · ORDERS",
      value: stats.todaysOrders.toString().padStart(2, "0"),
      Icon: ShoppingBag,
      hint: stats.todaysOrders === 0 ? "No orders yet today" : "Placed since 00:00",
    },
    {
      label: "TODAY · VALUE",
      value: formatPrice(stats.todaysOrdersValue),
      Icon: Receipt,
      hint: "Excludes cancelled",
    },
    {
      label: "PRODUCTS",
      value: stats.totalProducts.toString().padStart(2, "0"),
      Icon: Package,
      hint: "Live in catalogue",
    },
    {
      label: "LOW STOCK",
      value: stats.lowStockVariants.toString().padStart(2, "0"),
      Icon: AlertTriangle,
      hint: stats.lowStockVariants === 0 ? "Inventory healthy" : "Variants ≤ 5 left",
      accent: stats.lowStockVariants > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border border-line-2">
      {cells.map((cell, i) => (
        <div
          key={cell.label}
          className={cn(
            "p-5 md:p-6 relative",
            i < cells.length - 1 && "border-b lg:border-b-0 border-line-2",
            i % 2 === 0 && i < cells.length - 1 && "lg:border-r",
            i % 2 === 0 && "border-r",
            i === 1 && "border-r-0 lg:border-r"
          )}
        >
          <div className="flex items-start justify-between mb-5">
            <div className="text-[11px] font-mono text-body tracking-wider">
              {cell.label}
            </div>
            <cell.Icon
              strokeWidth={1.5}
              className={cn(
                "h-4 w-4",
                cell.accent ? "text-accent" : "text-body"
              )}
            />
          </div>
          <div
            className={cn(
              "text-[28px] md:text-[34px] font-medium tracking-tight leading-none mb-2",
              cell.accent ? "text-accent" : "text-text"
            )}
          >
            {cell.value}
          </div>
          {cell.hint && (
            <div className="text-[12px] text-body">{cell.hint}</div>
          )}
        </div>
      ))}
    </div>
  );
}
