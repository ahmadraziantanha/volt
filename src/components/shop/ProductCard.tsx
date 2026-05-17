"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart/CartProvider";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductWithVariants } from "@/lib/supabase/types";

interface Props {
  product: ProductWithVariants;
}

const CATEGORY_LABEL: Record<string, string> = {
  headphones: "OVER-EAR",
  earbuds: "IN-EAR",
  speakers: "SPEAKER",
};

export function ProductCard({ product }: Props) {
  const { add, open } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants.find((v) => v.stock > 0)?.id ?? product.variants[0]?.id
  );

  const selected = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
  const images = selected?.image_urls ?? [];
  const heroImg = images[0];
  const secondImg = images[1] ?? images[0];
  const isOOS = !selected || selected.stock <= 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selected || isOOS) return;
    add({
      productId: product.id,
      variantId: selected.id,
      productSlug: product.slug,
      productName: product.name,
      variantColor: selected.color_name,
      variantHex: selected.color_hex,
      unitPrice: product.base_price,
      imageUrl: heroImg ?? "",
      qty: 1,
    });
    toast.success(`Added — ${product.name} (${selected.color_name})`, {
      action: { label: "View cart", onClick: open },
    });
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      style={{ perspective: "1200px" }}
      className="group block bg-surface border border-line hover:border-line-2 hover:shadow-cinema transition-[border-color,box-shadow,transform] duration-500 ease-smooth hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Inner stage that tilts and scales */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-smooth group-hover:scale-[1.06] [transform-style:preserve-3d] group-hover:[transform:scale(1.06)_rotateY(-2.5deg)_rotateX(1.5deg)]"
          style={{ transformOrigin: "center center" }}
        >
          {heroImg && (
            <Image
              src={heroImg}
              alt={`${product.name} — ${selected?.color_name}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-opacity duration-500 ease-smooth group-hover:opacity-0"
              loading="lazy"
            />
          )}
          {secondImg && secondImg !== heroImg && (
            <Image
              src={secondImg}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100"
              loading="lazy"
            />
          )}
        </div>

        {/* Vignette overlay — adds cinematic depth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
          }}
          aria-hidden
        />

        {/* Quick-add — desktop hover only */}
        <button
          onClick={handleQuickAdd}
          disabled={isOOS}
          className={cn(
            "absolute bottom-4 left-4 right-4 hidden md:inline-flex items-center justify-center gap-2",
            "h-11 px-4 text-[13px] font-medium tracking-tight",
            "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
            "transition-all duration-300 ease-smooth",
            isOOS
              ? "bg-surface text-quiet border border-line cursor-not-allowed"
              : "bg-accent text-bg hover:bg-text"
          )}
        >
          {isOOS ? "Sold out" : "Quick add"}
          {!isOOS && <ArrowRight strokeWidth={1.75} className="h-4 w-4" />}
        </button>

        {isOOS && (
          <span className="absolute top-4 left-4 text-[10px] font-mono text-text bg-bg/80 backdrop-blur-sm px-2 py-1 tracking-wider">
            SOLD OUT
          </span>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="text-[11px] font-mono text-muted tracking-wider mb-1">
              {CATEGORY_LABEL[product.category]}
            </div>
            <div className="text-[18px] md:text-[20px] font-medium text-text tracking-tight leading-tight transition-colors duration-300 ease-smooth group-hover:text-accent">
              {product.name}
            </div>
          </div>
          <div className="text-[14px] md:text-[15px] font-medium text-text shrink-0">
            {formatPrice(product.base_price)}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.variants.map((v) => {
            const isActive = v.id === selectedVariantId;
            return (
              <button
                key={v.id}
                type="button"
                aria-label={v.color_name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedVariantId(v.id);
                }}
                className={cn(
                  "relative w-3.5 h-3.5 rounded-full transition-all duration-200",
                  "before:absolute before:inset-0 before:rounded-full before:transition-all",
                  isActive
                    ? "before:ring-2 before:ring-text before:ring-offset-[2px] before:ring-offset-surface"
                    : "before:ring-1 before:ring-line hover:before:ring-muted"
                )}
              >
                <span
                  className="block w-full h-full rounded-full"
                  style={{ background: v.color_hex }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
