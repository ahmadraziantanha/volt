"use client";

import { ArrowRight } from "lucide-react";
import { type RefObject, useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart/CartProvider";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductWithVariants, VariantRow } from "@/lib/supabase/types";

interface Props {
  product: ProductWithVariants;
  variant: VariantRow | undefined;
  triggerRef: RefObject<HTMLElement>;
}

/**
 * Mobile-only sticky bar that appears once the main add-to-cart block scrolls
 * out of view. On desktop it never renders.
 */
export function StickyMobileAddToCart({ product, variant, triggerRef }: Props) {
  const { add, open } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = triggerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [triggerRef]);

  const isOOS = !variant || variant.stock <= 0;

  const handleAdd = () => {
    if (!variant || isOOS) return;
    add({
      productId: product.id,
      variantId: variant.id,
      productSlug: product.slug,
      productName: product.name,
      variantColor: variant.color_name,
      variantHex: variant.color_hex,
      unitPrice: product.base_price,
      imageUrl: variant.image_urls?.[0] ?? "",
      qty: 1,
    });
    toast.success(`Added — ${product.name}`, {
      action: { label: "View cart", onClick: open },
    });
  };

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-[80]",
        "bg-bg/90 backdrop-blur-xl border-t border-line-2",
        "transition-transform duration-500 ease-smooth",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-text truncate">{product.name}</div>
          <div className="text-[11px] font-mono text-muted">
            {variant?.color_name} · {formatPrice(product.base_price)}
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={isOOS}
          className={cn(
            "inline-flex items-center gap-2 h-11 px-5 text-[13px] font-medium tracking-tight",
            isOOS
              ? "bg-surface text-quiet border border-line"
              : "bg-accent text-bg hover:bg-text transition-colors"
          )}
        >
          {isOOS ? "Sold out" : "Add"}
          {!isOOS && <ArrowRight strokeWidth={1.75} className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
