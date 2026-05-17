import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types";

interface Props {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  couponCode?: string | null;
  total: number;
}

export function OrderSummary({
  items,
  subtotal,
  shipping,
  discount = 0,
  couponCode,
  total,
}: Props) {
  return (
    <aside className="bg-surface-2 border border-line-2 p-6 md:p-8 space-y-7 lg:sticky lg:top-24 lg:self-start">
      <div className="flex items-baseline justify-between border-b border-line-2 pb-4">
        <div className="text-[11px] font-mono text-accent tracking-wider">ORDER</div>
        <div className="text-[11px] font-mono text-muted">
          {String(items.length).padStart(2, "0")}{" "}
          {items.length === 1 ? "ITEM" : "ITEMS"}
        </div>
      </div>

      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.variantId} className="flex gap-4">
            <div className="w-16 h-16 shrink-0 bg-surface overflow-hidden border border-line-2">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium text-text leading-tight">
                {item.productName}
              </div>
              <div className="flex items-center gap-2 mt-1.5 mb-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full border border-line-2"
                  style={{ background: item.variantHex }}
                />
                <span className="text-[11px] font-mono text-muted tracking-wider uppercase">
                  {item.variantColor}
                </span>
                <span className="text-[11px] font-mono text-quiet">
                  · QTY {item.qty}
                </span>
              </div>
            </div>
            <div className="text-[13px] font-mono text-text shrink-0 text-right">
              {formatPrice(item.unitPrice * item.qty)}
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-line-2 pt-5 space-y-2 text-[13px]">
        <div className="flex justify-between text-body">
          <span>Subtotal</span>
          <span className="font-mono text-text">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-accent">
            <span className="flex items-center gap-2">
              Discount
              {couponCode && (
                <span className="font-mono text-[11px] tracking-wider opacity-80">
                  ({couponCode})
                </span>
              )}
            </span>
            <span className="font-mono">−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-body">
          <span>Shipping</span>
          <span className="font-mono text-text">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-body">
          <span>Payment</span>
          <span className="font-mono text-text">Cash on delivery</span>
        </div>
        <div className="flex justify-between pt-4 mt-2 border-t border-line-2 text-text font-medium text-[15px]">
          <span>Total</span>
          <span className="font-mono">{formatPrice(total)}</span>
        </div>
      </div>
    </aside>
  );
}
