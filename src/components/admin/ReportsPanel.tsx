import { TrendingUp, Wallet, Receipt, Banknote } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { ReportSnapshot } from "@/lib/admin/reports";

interface Props {
  snapshot: ReportSnapshot;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-accent",
  confirmed: "bg-[#6ABF4B]",
  shipped: "bg-[#4B8AFF]",
  delivered: "bg-text",
  cancelled: "bg-[#FB7185]",
};

export function ReportsPanel({ snapshot }: Props) {
  const maxOrders = Math.max(1, ...snapshot.daily.map((d) => d.orders));
  const maxRevenue = Math.max(1, ...snapshot.daily.map((d) => d.revenue));
  const totalStatusCount = Math.max(
    1,
    snapshot.statusBreakdown.reduce((s, x) => s + x.count, 0)
  );

  return (
    <div className="space-y-8">
      {/* Headline metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border border-line-2">
        <Metric
          label="REVENUE · 30D"
          value={formatPrice(snapshot.revenueTotal)}
          icon={TrendingUp}
          hint={`${snapshot.ordersTotal} active order${snapshot.ordersTotal === 1 ? "" : "s"}`}
          accent
        />
        <Metric
          label="COLLECTED"
          value={formatPrice(snapshot.collectedRevenue)}
          icon={Wallet}
          hint="Delivered (cash received)"
        />
        <Metric
          label="PENDING"
          value={formatPrice(snapshot.pendingRevenue)}
          icon={Banknote}
          hint="Awaiting delivery"
        />
        <Metric
          label="AVG ORDER"
          value={formatPrice(snapshot.avgOrderValue)}
          icon={Receipt}
          hint="Excludes cancelled"
        />
      </div>

      {/* Daily orders chart */}
      <div className="border border-line-2">
        <div className="px-6 py-5 border-b border-line-2 flex items-baseline justify-between gap-4">
          <div>
            <h3 className="text-[16px] font-medium text-text">
              Orders &amp; revenue · last 30 days
            </h3>
            <p className="text-[12px] text-body mt-1">
              Daily bars. Bar height = orders, fill = revenue intensity.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-body tracking-wider">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-accent" />
              ORDERS
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#363636]" />
              EMPTY DAY
            </span>
          </div>
        </div>

        <div className="px-6 pt-8 pb-4">
          <div className="flex items-end gap-[3px] h-[180px]">
            {snapshot.daily.map((point) => {
              const heightPct =
                point.orders === 0 ? 4 : Math.max(8, (point.orders / maxOrders) * 100);
              const intensity =
                point.revenue === 0
                  ? 0
                  : Math.min(1, point.revenue / maxRevenue);
              return (
                <div
                  key={point.date}
                  className="flex-1 relative group"
                  title={`${point.date} — ${point.orders} order${point.orders === 1 ? "" : "s"} · ${formatPrice(point.revenue)}`}
                >
                  <div
                    style={{
                      height: `${heightPct}%`,
                      opacity: point.orders === 0 ? 1 : 0.4 + intensity * 0.6,
                    }}
                    className={cn(
                      "w-full transition-colors",
                      point.orders === 0
                        ? "bg-[#1F1F1F]"
                        : "bg-accent group-hover:brightness-110"
                    )}
                  />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 mt-3 text-[10px] font-mono text-body tracking-wider">
            <span className="text-left">
              {snapshot.daily[0]?.date.slice(5)}
            </span>
            <span className="text-center">
              {snapshot.daily[Math.floor(snapshot.daily.length / 2)]?.date.slice(5)}
            </span>
            <span className="text-right">
              {snapshot.daily[snapshot.daily.length - 1]?.date.slice(5)}
            </span>
          </div>
        </div>
      </div>

      {/* Two-column: top products + status breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top products */}
        <div className="border border-line-2">
          <div className="px-6 py-5 border-b border-line-2">
            <h3 className="text-[16px] font-medium text-text">Top products</h3>
            <p className="text-[12px] text-body mt-1">
              By revenue, last 30 days.
            </p>
          </div>
          {snapshot.topProducts.length === 0 ? (
            <div className="px-6 py-10 text-center text-[13px] text-body">
              No sales yet in this window.
            </div>
          ) : (
            <ul className="divide-y divide-line-2">
              {snapshot.topProducts.map((p, i) => {
                const maxRev = snapshot.topProducts[0].revenue;
                const pct = (p.revenue / maxRev) * 100;
                return (
                  <li key={p.productName} className="px-6 py-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span className="text-[11px] font-mono text-body tracking-wider w-6 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-text font-medium text-[14px] truncate">
                          {p.productName}
                        </span>
                      </div>
                      <span className="text-text font-mono text-[13px] shrink-0">
                        {formatPrice(p.revenue)}
                      </span>
                    </div>
                    <div className="grid grid-cols-[24px_1fr_auto] gap-3 items-center pl-9 -mt-0.5">
                      <div />
                      <div className="h-[3px] bg-[#1F1F1F]">
                        <div
                          className="h-full bg-accent transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-body shrink-0">
                        {p.qty} sold
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Status breakdown */}
        <div className="border border-line-2">
          <div className="px-6 py-5 border-b border-line-2">
            <h3 className="text-[16px] font-medium text-text">Status breakdown</h3>
            <p className="text-[12px] text-body mt-1">
              All orders in the last 30 days.
            </p>
          </div>

          {/* Stacked bar */}
          <div className="px-6 pt-6">
            <div className="flex h-2 overflow-hidden">
              {snapshot.statusBreakdown.map((s) =>
                s.count > 0 ? (
                  <div
                    key={s.status}
                    title={`${s.status}: ${s.count}`}
                    style={{ width: `${(s.count / totalStatusCount) * 100}%` }}
                    className={cn("h-full", STATUS_COLORS[s.status])}
                  />
                ) : null
              )}
            </div>
          </div>

          <ul className="divide-y divide-line-2 mt-4">
            {snapshot.statusBreakdown.map((s) => (
              <li
                key={s.status}
                className="px-6 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-block w-2 h-2 rounded-full",
                      STATUS_COLORS[s.status]
                    )}
                  />
                  <span className="text-[13px] text-text capitalize">
                    {s.status}
                  </span>
                </div>
                <span className="text-[13px] font-mono text-text">
                  {String(s.count).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  hint,
  accent,
}: {
  label: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="p-5 md:p-6 border-b lg:border-b-0 border-line-2 lg:border-r last:border-r-0 [&:nth-child(2)]:lg:border-r [&:nth-child(odd)]:border-r [&:nth-child(odd)]:lg:border-r">
      <div className="flex items-start justify-between mb-5">
        <div className="text-[11px] font-mono text-body tracking-wider">
          {label}
        </div>
        <Icon
          strokeWidth={1.5}
          className={cn("h-4 w-4", accent ? "text-accent" : "text-body")}
        />
      </div>
      <div
        className={cn(
          "text-[28px] md:text-[32px] font-medium tracking-tight leading-none mb-2",
          accent ? "text-accent" : "text-text"
        )}
      >
        {value}
      </div>
      {hint && <div className="text-[12px] text-body">{hint}</div>}
    </div>
  );
}
