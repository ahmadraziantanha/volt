import { StatusDropdown } from "./StatusDropdown";
import { formatPrice } from "@/lib/utils";
import type { OrderRow } from "@/lib/supabase/types";

export function OrdersTable({ orders }: { orders: OrderRow[] }) {
  if (orders.length === 0) {
    return (
      <div className="border border-line-2 py-20 text-center">
        <div className="text-[clamp(24px,3vw,32px)] font-medium text-text tracking-tight mb-2">
          No orders yet.
        </div>
        <p className="text-sm text-muted">
          Once customers place orders, they&apos;ll appear here in real time.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-line-2 overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="text-left bg-surface-2">
            <Th>ORDER</Th>
            <Th>CUSTOMER</Th>
            <Th>ITEMS</Th>
            <Th align="right">TOTAL</Th>
            <Th>STATUS</Th>
            <Th align="right">DATE</Th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const ref = o.id.slice(0, 8).toUpperCase();
            const totalQty = o.items.reduce((s, i) => s + i.qty, 0);
            const date = new Date(o.created_at);
            return (
              <tr
                key={o.id}
                className="border-t border-line-2 hover:bg-surface-2/60 transition-colors"
              >
                <Td>
                  <span className="font-mono text-text text-[13px]">#{ref}</span>
                </Td>
                <Td>
                  <div className="text-text text-[13.5px]">{o.customer_name}</div>
                  <div className="text-[12px] text-body font-mono mt-1">
                    {o.customer_email}
                  </div>
                </Td>
                <Td>
                  <div className="text-text text-[13.5px]">
                    {totalQty} {totalQty === 1 ? "unit" : "units"}
                  </div>
                  <div className="text-[12px] text-body mt-1">
                    {o.items.map((i) => i.product_name).join(", ")}
                  </div>
                </Td>
                <Td align="right">
                  <span className="font-mono text-text text-[13.5px]">
                    {formatPrice(o.total)}
                  </span>
                </Td>
                <Td>
                  <StatusDropdown orderId={o.id} value={o.status} />
                </Td>
                <Td align="right">
                  <div className="font-mono text-text text-[13px]">
                    {date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })}
                  </div>
                  <div className="text-[12px] text-body font-mono mt-1">
                    {date.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3.5 text-[11px] font-mono text-body tracking-wider font-normal text-${align}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <td className={`px-5 py-4 align-top text-${align}`}>{children}</td>
  );
}
