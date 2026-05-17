"use client";

import { ArrowRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart/CartProvider";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductWithVariants, VariantRow } from "@/lib/supabase/types";

interface Props {
  product: ProductWithVariants;
  variant: VariantRow | undefined;
}

export function AddToCartBar({ product, variant }: Props) {
  const { add, open } = useCart();
  const [qty, setQty] = useState(1);

  const isOOS = !variant || variant.stock <= 0;
  const max = variant ? Math.min(10, variant.stock) : 0;

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
      qty,
    });
    toast.success(`Added — ${product.name} (${variant.color_name})`, {
      description: `${qty} × ${formatPrice(product.base_price)}`,
      action: { label: "View cart", onClick: open },
    });
  };

  return (
    <div className="flex gap-3">
      <div className="inline-flex items-center border border-line h-12 px-2">
        <button
          aria-label="Decrease quantity"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1 || isOOS}
          className="w-9 h-9 inline-flex items-center justify-center text-body hover:text-text disabled:opacity-40 disabled:hover:text-body transition-colors"
        >
          <Minus strokeWidth={1.5} className="h-3.5 w-3.5" />
        </button>
        <span className="w-7 text-center text-[13px] font-mono text-text">{qty}</span>
        <button
          aria-label="Increase quantity"
          onClick={() => setQty((q) => Math.min(max, q + 1))}
          disabled={qty >= max || isOOS}
          className="w-9 h-9 inline-flex items-center justify-center text-body hover:text-text disabled:opacity-40 disabled:hover:text-body transition-colors"
        >
          <Plus strokeWidth={1.5} className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={isOOS}
        className={cn(
          "flex-1 group inline-flex items-center justify-center gap-3 h-12 px-6 text-[13px] font-medium tracking-tight transition-all duration-300 ease-smooth",
          isOOS
            ? "bg-surface text-quiet border border-line cursor-not-allowed"
            : "bg-accent text-bg hover:bg-text hover:gap-5"
        )}
      >
        {isOOS ? "Sold out" : "Add to Cart"}
        {!isOOS && <ArrowRight strokeWidth={1.75} className="h-4 w-4" />}
      </button>
    </div>
  );
}
