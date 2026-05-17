import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { ProductWithVariants } from "@/lib/supabase/types";

interface Props {
  product: ProductWithVariants;
}

export function FeatureDrop({ product }: Props) {
  const variant = product.variants[0];
  const heroImg = variant?.image_urls?.[0];
  const sku = variant?.sku?.split("-").slice(0, 2).join("-") ?? "VOL-002";
  const specs = Object.entries(product.specs).slice(0, 5);

  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 border-b border-line">
      <div className="relative aspect-[4/3] lg:aspect-[4/5] bg-[#050505] overflow-hidden border-b lg:border-b-0 lg:border-r border-line group">
        {heroImg && (
          <Image
            src={heroImg}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.05]"
            priority
          />
        )}
        {/* Inner vignette for cinematic weight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)",
          }}
          aria-hidden
        />
        <span className="absolute top-6 left-6 text-[10.5px] font-mono text-text tracking-[0.22em] z-[2]">
          {sku} / PRO
        </span>
        <span className="absolute top-6 right-6 text-[10.5px] font-mono text-text tracking-[0.22em] z-[2]">
          MMXXVI
        </span>
      </div>

      <div className="flex flex-col justify-between gap-9 lg:gap-14 p-6 md:p-12 lg:p-16">
        <div>
          <div className="text-[11px] font-mono text-muted tracking-wider mb-8">
            {product.name.toUpperCase()} &nbsp;·&nbsp; REFERENCE
          </div>
          <h3 className="text-display-lg font-medium text-text mb-6">
            {product.name}.
          </h3>
          <p className="text-[16px] text-body leading-relaxed max-w-[440px]">
            {product.description}
          </p>
        </div>

        <div>
          {specs.map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[1fr_auto] gap-4 items-baseline py-4 border-t border-line last:border-b"
            >
              <div className="text-[12px] text-muted capitalize">{k}</div>
              <div className="text-[14px] text-text text-right">{v}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-end gap-6 flex-wrap">
          <div className="text-[14px] text-muted">
            From
            <b className="block text-text text-[28px] font-medium tracking-tight mt-1">
              {formatPrice(product.base_price)}
            </b>
          </div>
          <Link
            href={`/product/${product.slug}`}
            className="group inline-flex items-center gap-3 text-sm font-medium text-text border-b border-text pb-1 hover:text-accent hover:border-accent hover:gap-5 transition-all duration-300 ease-smooth"
          >
            Configure
            <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
