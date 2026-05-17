"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn, formatPrice, pad } from "@/lib/utils";
import type { ProductWithVariants } from "@/lib/supabase/types";

interface Props {
  products: ProductWithVariants[];
}

const CATEGORY_LABEL: Record<string, string> = {
  headphones: "OVER-EAR",
  earbuds: "IN-EAR",
  speakers: "SPEAKER",
};

export function CatalogueIndex({ products }: Props) {
  const [hoverImg, setHoverImg] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isCoarse = useRef(false);

  useEffect(() => {
    isCoarse.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  return (
    <div className="relative">
      <ul>
        {products.map((p, i) => {
          const firstVariant = p.variants[0];
          const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
          const lowStock = totalStock <= 10;
          const dotClass = totalStock === 0
            ? "bg-quiet"
            : lowStock
              ? "bg-accent"
              : "bg-[#6ABF4B]";
          const statusLabel = totalStock === 0
            ? "SOLD OUT"
            : lowStock
              ? "LOW STOCK"
              : "IN STOCK";
          const heroImg = firstVariant?.image_urls?.[0] ?? "";

          return (
            <li key={p.id}>
              <Link
                href={`/product/${p.slug}`}
                onMouseEnter={() => !isCoarse.current && setHoverImg(heroImg)}
                onMouseLeave={() => !isCoarse.current && setHoverImg(null)}
                onMouseMove={(e) => !isCoarse.current && setPos({ x: e.clientX, y: e.clientY })}
                className={cn(
                  "group block border-b border-line",
                  "transition-[background,padding] duration-300 ease-smooth",
                  "hover:bg-surface lg:hover:pl-3"
                )}
              >
                <div
                  className={cn(
                    "grid items-center gap-4 px-5 md:px-8 py-5",
                    "grid-cols-[72px_1fr_auto] md:grid-cols-[80px_1.2fr_1fr_1fr_120px_100px] md:py-7"
                  )}
                >
                  {/* Thumbnail — mobile only */}
                  <div className="md:hidden w-[72px] h-[72px] bg-surface overflow-hidden">
                    {heroImg && (
                      <Image
                        src={heroImg}
                        alt=""
                        width={144}
                        height={144}
                        className="w-full h-full object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                        priority={i === 0}
                      />
                    )}
                  </div>

                  {/* Index number — desktop only */}
                  <div className="hidden md:block text-[11px] font-mono text-quiet">
                    {pad(i + 1)}
                  </div>

                  {/* Name + mobile sub-label */}
                  <div className="text-[18px] md:text-[22px] font-medium text-text tracking-tight leading-tight transition-colors duration-300 ease-smooth group-hover:text-accent">
                    {p.name}
                    <span className="block md:hidden font-mono font-normal text-[10px] text-muted tracking-wider mt-1">
                      {firstVariant?.sku?.split("-").slice(0, 2).join("-")} ·{" "}
                      {CATEGORY_LABEL[p.category]}
                    </span>
                  </div>

                  <div className="hidden md:block text-[13px] font-mono text-muted">
                    {CATEGORY_LABEL[p.category]} / {p.category.toUpperCase()}
                  </div>
                  <div className="hidden md:block text-[13px] font-mono text-muted">
                    {firstVariant?.sku?.split("-").slice(0, 2).join("-")}
                  </div>
                  <div className="hidden md:block text-[13px] font-mono text-muted">
                    <span className={cn("inline-block w-[5px] h-[5px] rounded-full mr-2 align-middle", dotClass)} />
                    {statusLabel}
                  </div>

                  <div className="text-[14px] md:text-[16px] font-medium text-text text-right">
                    {formatPrice(p.base_price)}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Cursor-following preview (desktop only) */}
      {hoverImg && (
        <div
          className="hidden md:block fixed pointer-events-none z-[5] w-[280px] h-[340px] bg-surface border border-line-2 overflow-hidden transition-opacity duration-200"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(20px, -50%)",
          }}
        >
          <Image
            src={hoverImg}
            alt=""
            width={560}
            height={680}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
