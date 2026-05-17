import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutShell } from "@/components/checkout/CheckoutShell";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Place your order — cash on delivery.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="px-5 md:px-8 pt-24 md:pt-32 pb-20">
      <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end pb-10 md:pb-16 border-b border-line mb-12 md:mb-16">
        <div>
          <div className="text-[11px] font-mono text-accent tracking-wider mb-5">
            CHECKOUT · COD
          </div>
          <h1 className="text-display-md font-medium text-text">
            Place your order<span className="text-quiet">.</span>
          </h1>
        </div>
        <Link
          href="/shop"
          className="text-[12px] font-mono text-muted hover:text-text tracking-wider transition-colors"
        >
          ← BACK TO SHOP
        </Link>
      </header>

      <CheckoutShell />
    </div>
  );
}
