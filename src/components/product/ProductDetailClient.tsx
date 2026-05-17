"use client";

import { useMemo, useRef, useState } from "react";
import { Truck } from "lucide-react";
import { ProductGallery } from "./ProductGallery";
import { VariantSelector } from "./VariantSelector";
import { StockBadge } from "./StockBadge";
import { AddToCartBar } from "./AddToCartBar";
import { StickyMobileAddToCart } from "./StickyMobileAddToCart";
import { ProductAccordion } from "./ProductAccordion";
import { cn, formatPrice, toRoman } from "@/lib/utils";
import type { ProductWithVariants } from "@/lib/supabase/types";

interface Props {
  product: ProductWithVariants;
}

export function ProductDetailClient({ product }: Props) {
  const [selectedId, setSelectedId] = useState(
    () => product.variants.find((v) => v.stock > 0)?.id ?? product.variants[0]?.id ?? ""
  );

  const selected = useMemo(
    () => product.variants.find((v) => v.id === selectedId) ?? product.variants[0],
    [product.variants, selectedId]
  );

  const heroRef = useRef<HTMLDivElement>(null);

  const sku = selected?.sku ?? "";
  const drop = `MMXXVI · ${toRoman(product.variants.findIndex((v) => v.id === selected?.id) + 1 || 1)}`;
  const images = selected?.image_urls ?? [];

  return (
    <>
      <div
        ref={heroRef}
        className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 px-5 md:px-8 pt-24 md:pt-32 pb-14 md:pb-20"
      >
        <ProductGallery
          images={images}
          productName={product.name}
          sku={sku.split("-").slice(0, 2).join("-")}
          drop={drop}
        />

        <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-5 text-[11px] font-mono text-muted tracking-wider">
              <span className="inline-block w-[5px] h-[5px] rounded-full bg-accent" />
              {sku.split("-").slice(0, 2).join("-")} · {product.category.toUpperCase()}
            </div>
            <h1 className="text-display-md font-medium text-text mb-3">
              {product.name}.
            </h1>
            <p className="text-[16px] text-body leading-relaxed max-w-prose">
              {product.tagline}
            </p>
          </div>

          <div className="flex items-baseline justify-between pt-6 border-t border-line">
            <div className="text-[28px] font-medium text-text tracking-tight">
              {formatPrice(product.base_price)}
            </div>
            <StockBadge stock={selected?.stock ?? 0} />
          </div>

          {product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          )}

          <AddToCartBar product={product} variant={selected} />

          <div
            className={cn(
              "flex items-start gap-3 pt-6 border-t border-line",
              "text-[12px] text-muted"
            )}
          >
            <Truck strokeWidth={1.5} className="h-4 w-4 mt-[1px] shrink-0" />
            <span className="leading-relaxed">
              Free shipping over $200. Pay in cash on delivery. 30-day home trial — we cover the return.
            </span>
          </div>

          <ProductAccordion product={product} />
        </div>
      </div>

      <StickyMobileAddToCart product={product} variant={selected} triggerRef={heroRef} />
    </>
  );
}
