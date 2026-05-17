"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  productName: string;
  sku?: string;
  drop?: string;
}

export function ProductGallery({ images, productName, sku, drop }: Props) {
  const [active, setActive] = useState(0);

  // Reset to first image when variant changes
  useEffect(() => {
    setActive(0);
  }, [images]);

  const hero = images[active] ?? images[0];

  return (
    <div className="grid gap-3">
      <div className="relative aspect-square bg-surface overflow-hidden border border-line">
        {hero && (
          <Image
            src={hero}
            alt={`${productName} — view ${active + 1}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={active === 0}
          />
        )}
        {sku && (
          <span className="absolute top-5 left-5 text-[11px] font-mono text-text tracking-wider">
            {sku}
          </span>
        )}
        {drop && (
          <span className="absolute top-5 right-5 text-[11px] font-mono text-text tracking-wider">
            {drop}
          </span>
        )}
        <span className="absolute bottom-5 right-5 text-[11px] font-mono text-muted tracking-wider">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative aspect-square bg-surface overflow-hidden border transition-colors duration-300 ease-smooth",
                i === active ? "border-accent" : "border-line hover:border-muted"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                className={cn(
                  "object-cover transition-opacity duration-300",
                  i === active ? "opacity-100" : "opacity-70 hover:opacity-90"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
