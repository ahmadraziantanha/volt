import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { ProductWithVariants } from "@/lib/supabase/types";

interface Props {
  products: ProductWithVariants[];
}

export function RelatedProducts({ products }: Props) {
  if (!products?.length) return null;

  return (
    <section className="border-t border-line">
      <div className="flex items-end justify-between gap-6 px-5 md:px-8 pt-20 md:pt-28 pb-10 md:pb-14 border-b border-line">
        <h2 className="text-display-md font-medium text-text">
          More from <span className="text-quiet">the catalogue.</span>
        </h2>
        <Link
          href="/shop"
          className="text-[12px] font-mono text-accent tracking-wider hover:opacity-80 transition-opacity"
        >
          ALL EDITIONS →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {products.map((p, i) => {
          const firstVariant = p.variants[0];
          const heroImg = firstVariant?.image_urls?.[0];

          return (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className={
                "group block " +
                (i < products.length - 1 ? "border-b md:border-b-0 border-line md:border-r" : "")
              }
            >
              <div className="relative aspect-square bg-surface overflow-hidden">
                {heroImg && (
                  <Image
                    src={heroImg}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-smooth group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="px-5 md:px-8 py-6 md:py-8 flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono text-muted tracking-wider mb-1">
                    {p.category.toUpperCase()}
                  </div>
                  <div className="text-[20px] md:text-[22px] font-medium text-text tracking-tight transition-colors duration-300 ease-smooth group-hover:text-accent">
                    {p.name}
                  </div>
                </div>
                <div className="text-[14px] font-medium text-text">
                  {formatPrice(p.base_price)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
