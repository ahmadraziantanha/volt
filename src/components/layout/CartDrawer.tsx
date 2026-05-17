"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart/CartProvider";
import { cn, formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    close,
    updateQty,
    remove,
    subtotal,
    shipping,
    discount,
    coupon,
    total,
    count,
    freeShippingThreshold,
    amountToFreeShipping,
  } = useCart();

  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const empty = count === 0;

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent
        side="right"
        hideCloseButton
        className="flex flex-col p-0 sm:max-w-md w-full bg-bg"
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-line shrink-0">
          <div className="flex items-baseline gap-3">
            <span className="text-[15px] font-medium text-text">Cart</span>
            <span className="text-[11px] font-mono text-muted">
              ({count.toString().padStart(2, "0")})
            </span>
          </div>
          <button
            onClick={close}
            aria-label="Close cart"
            className="inline-flex w-10 h-10 items-center justify-center rounded-full text-text hover:bg-surface transition-colors"
          >
            <X strokeWidth={1.5} className="h-5 w-5" />
          </button>
        </div>

        {empty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="text-[40px] font-medium tracking-tighter text-text mb-3">
              Cart is empty.
            </div>
            <p className="text-sm text-muted mb-8 max-w-[260px]">
              Nothing here yet. Find your next instrument in the catalogue.
            </p>
            <Link
              href="/shop"
              onClick={close}
              className="inline-flex items-center gap-3 text-sm font-medium text-text border-b border-text pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              Browse the catalogue
              <span aria-hidden>→</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="px-5 py-4 border-b border-line-2 shrink-0 bg-surface-2">
              {subtotal < freeShippingThreshold ? (
                <>
                  <p className="text-[11px] font-mono text-body mb-2 tracking-wider">
                    <span className="text-accent">{formatPrice(amountToFreeShipping)}</span> TO FREE SHIPPING
                  </p>
                  <div className="h-[3px] bg-[#1F1F1F] w-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-700 ease-smooth"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-[11px] font-mono text-accent tracking-wider">
                  FREE SHIPPING UNLOCKED
                </p>
              )}
            </div>

            <ul className="flex-1 overflow-y-auto divide-y divide-line-2">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4 p-5 hover:bg-surface transition-colors">
                  <Link
                    href={`/product/${item.productSlug}`}
                    onClick={close}
                    className="w-20 h-20 shrink-0 bg-surface-2 border border-line-2 overflow-hidden block"
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-3 mb-1">
                      <Link
                        href={`/product/${item.productSlug}`}
                        onClick={close}
                        className="text-sm font-medium text-text leading-tight"
                      >
                        {item.productName}
                      </Link>
                      <button
                        onClick={() => remove(item.variantId)}
                        aria-label={`Remove ${item.productName}`}
                        className="text-quiet hover:text-text transition-colors -mt-1 -mr-1 p-1"
                      >
                        <X strokeWidth={1.5} className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-block w-3 h-3 rounded-full border border-line-2"
                        style={{ background: item.variantHex }}
                      />
                      <span className="text-[11px] font-mono text-muted tracking-wider uppercase">
                        {item.variantColor}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="inline-flex items-center border border-line-2 bg-surface-2">
                        <button
                          onClick={() => updateQty(item.variantId, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 inline-flex items-center justify-center text-body hover:text-accent transition-colors"
                        >
                          <Minus strokeWidth={1.5} className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-[12px] font-mono text-text">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.variantId, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 inline-flex items-center justify-center text-body hover:text-accent transition-colors"
                        >
                          <Plus strokeWidth={1.5} className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-[13px] font-mono text-text">
                        {formatPrice(item.unitPrice * item.qty)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line-2 p-5 shrink-0 bg-surface-2">
              <div className="space-y-2 mb-5 text-[13px]">
                <div className="flex justify-between text-body">
                  <span>Subtotal</span>
                  <span className="font-mono text-text">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span className="flex items-center gap-2">
                      Discount
                      {coupon && (
                        <span className="font-mono text-[11px] tracking-wider opacity-80">
                          ({coupon.code})
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
                <div className="flex justify-between pt-3 mt-3 border-t border-line-2 text-text font-medium">
                  <span>Total</span>
                  <span className="font-mono">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={close}
                className={cn(
                  "block w-full text-center py-4 text-sm font-medium",
                  "bg-accent text-bg hover:bg-text transition-colors duration-300"
                )}
              >
                Checkout — Cash on Delivery
              </Link>
              <button
                onClick={close}
                className="block w-full text-center pt-4 text-[13px] text-muted hover:text-text transition-colors"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
