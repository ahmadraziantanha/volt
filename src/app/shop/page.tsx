import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/shop/ShopClient";
import { getAllProducts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Shop",
  description: "Headphones, earbuds, and speakers. The full VOLT catalogue.",
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <>
      <header className="pt-36 md:pt-52 pb-16 md:pb-24 px-5 md:px-8 border-b border-line">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <div className="text-[10.5px] font-mono text-accent tracking-[0.24em] mb-6">
              SHOP · MMXXVI
            </div>
            <h1 className="text-[clamp(56px,10vw,140px)] font-medium text-text tracking-[-0.06em] leading-[0.88]">
              Everything<span className="text-quiet">.</span>
            </h1>
          </div>
          <div className="text-[13px] text-body md:text-right max-w-[320px] leading-[1.65]">
            {products.length} instruments across headphones, earbuds, and speakers.
            Shipped from Porto, Mon–Fri.
          </div>
        </div>
      </header>

      <div className="pt-10 md:pt-14">
        <Suspense
          fallback={
            <div className="px-5 md:px-8 py-20 text-center">
              <div className="text-[11px] font-mono text-muted tracking-wider">
                LOADING CATALOGUE…
              </div>
            </div>
          }
        >
          <ShopClient products={products} />
        </Suspense>
      </div>
    </>
  );
}
