"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/CartProvider";
import { CheckoutForm } from "./CheckoutForm";

export function CheckoutShell() {
  const { items, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <div className="text-center py-20 text-[11px] font-mono text-muted tracking-wider">
        LOADING CART…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24 md:py-32">
        <div className="text-[clamp(32px,4.5vw,52px)] font-medium tracking-tight text-text mb-4">
          Cart is empty.
        </div>
        <p className="text-sm text-muted max-w-sm mx-auto mb-8 leading-relaxed">
          Nothing to check out. Browse the catalogue and add something to your cart first.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 bg-accent text-bg px-6 py-3.5 text-[13px] font-medium tracking-tight hover:bg-text transition-colors"
        >
          Browse the catalogue →
        </Link>
      </div>
    );
  }

  return <CheckoutForm />;
}
