import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ClearCartOnMount } from "@/components/checkout/ClearCartOnMount";
import { getOrderById } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order placed",
  description: "Your order is on its way.",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: { order_id?: string };
}

export default async function OrderConfirmedPage({ searchParams }: Props) {
  const id = searchParams.order_id;
  if (!id) redirect("/");

  const order = await getOrderById(id);
  if (!order) notFound();

  const orderRef = order.id.slice(0, 8).toUpperCase();
  const placedAt = new Date(order.created_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="px-5 md:px-8 pt-24 md:pt-32 pb-24">
      <ClearCartOnMount />

      {/* Confirmation hero */}
      <div className="text-center max-w-2xl mx-auto pb-14 md:pb-20 border-b border-line">
        <div className="inline-flex w-16 h-16 items-center justify-center border border-accent text-accent mb-8">
          <Check strokeWidth={1.5} className="h-7 w-7" />
        </div>
        <div className="text-[11px] font-mono text-accent tracking-wider mb-4">
          ORDER · {orderRef}
        </div>
        <h1 className="text-display-md font-medium text-text mb-5">
          Order placed<span className="text-quiet">.</span>
        </h1>
        <p className="text-[15px] text-body leading-relaxed max-w-md mx-auto">
          Thank you, {order.customer_name.split(" ")[0]}. We&apos;ll call{" "}
          <span className="text-text">{order.customer_phone}</span> to confirm the
          delivery window before we ship.
        </p>
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 pt-14 md:pt-20 max-w-5xl mx-auto">
        {/* LEFT — items */}
        <div>
          <div className="text-[11px] font-mono text-muted tracking-wider mb-5 pb-4 border-b border-line">
            ITEMS &nbsp;·&nbsp; {String(order.items.length).padStart(2, "0")}
          </div>

          <ul className="divide-y divide-line">
            {order.items.map((item, i) => (
              <li key={i} className="py-4 flex gap-4">
                <div className="text-[11px] font-mono text-quiet shrink-0 pt-1 w-6">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-text">
                    {item.product_name}
                  </div>
                  <div className="text-[11px] font-mono text-muted tracking-wider uppercase mt-1">
                    {item.variant_color} · QTY {item.qty}
                  </div>
                </div>
                <div className="text-[13px] font-mono text-text shrink-0 text-right">
                  {formatPrice(item.unit_price * item.qty)}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-5 border-t border-line space-y-2 text-[13px]">
            <div className="flex justify-between text-body">
              <span>Subtotal</span>
              <span className="font-mono text-text">
                {formatPrice(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-body">
              <span>Shipping</span>
              <span className="font-mono text-text">
                {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-body">
              <span>Payment</span>
              <span className="font-mono text-text">Cash on delivery</span>
            </div>
            <div className="flex justify-between pt-4 mt-2 border-t border-line text-text font-medium text-[15px]">
              <span>Total due on delivery</span>
              <span className="font-mono">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — shipping + status */}
        <div className="space-y-10">
          <div>
            <div className="text-[11px] font-mono text-muted tracking-wider mb-5 pb-4 border-b border-line">
              SHIPPING TO
            </div>
            <address className="not-italic text-[14px] text-body leading-relaxed">
              <div className="text-text">{order.customer_name}</div>
              <div>{order.shipping_address.line1}</div>
              {order.shipping_address.line2 && (
                <div>{order.shipping_address.line2}</div>
              )}
              <div>
                {order.shipping_address.postal_code}{" "}
                {order.shipping_address.city}
              </div>
              <div>{order.shipping_address.country}</div>
              <div className="mt-4 text-[12px] font-mono text-muted tracking-wider">
                {order.customer_email.toUpperCase()}
              </div>
              <div className="text-[12px] font-mono text-muted tracking-wider">
                {order.customer_phone}
              </div>
            </address>

            {order.notes && (
              <div className="mt-6 pt-4 border-t border-line">
                <div className="text-[11px] font-mono text-muted tracking-wider mb-2">
                  DELIVERY NOTE
                </div>
                <p className="text-[13px] text-body italic leading-relaxed">
                  &ldquo;{order.notes}&rdquo;
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="text-[11px] font-mono text-muted tracking-wider mb-5 pb-4 border-b border-line">
              STATUS
            </div>
            <Timeline status={order.status} />
            <div className="mt-6 text-[11px] font-mono text-quiet tracking-wider">
              PLACED · {placedAt.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-16 md:mt-24">
        <Link
          href="/shop"
          className="group inline-flex items-center gap-3 text-[13px] font-medium text-text border-b border-text pb-1 hover:text-accent hover:border-accent hover:gap-5 transition-all duration-300 ease-smooth"
        >
          Back to the catalogue
          <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

const STEPS = [
  { key: "pending", label: "Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
] as const;

function Timeline({ status }: { status: string }) {
  const activeIndex = STEPS.findIndex((s) => s.key === status);
  const reached = (i: number) => activeIndex >= 0 && i <= activeIndex;

  return (
    <ol className="space-y-3">
      {STEPS.map((step, i) => {
        const isActive = step.key === status;
        const isReached = reached(i);
        return (
          <li
            key={step.key}
            className="grid grid-cols-[16px_1fr_auto] items-center gap-3"
          >
            <span
              className={`inline-block w-2 h-2 rounded-full transition-colors ${
                isActive
                  ? "bg-accent"
                  : isReached
                    ? "bg-text"
                    : "bg-line"
              }`}
              aria-hidden
            />
            <span
              className={`text-[13.5px] transition-colors ${
                isReached ? "text-text" : "text-quiet"
              }`}
            >
              {step.label}
            </span>
            {isActive && (
              <span className="text-[10px] font-mono text-accent tracking-wider">
                NOW
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
