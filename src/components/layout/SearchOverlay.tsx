"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";

interface SearchProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  image_urls: string[];
  product_variants: { price: number }[];
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<SearchProduct[]>([]);
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchedRef = useRef(false);

  const fetchProducts = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("id, name, slug, category, image_urls, product_variants(price)")
      .eq("is_active", true);
    setAllProducts((data as unknown as SearchProduct[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 50);
    fetchProducts();
  }, [open, fetchProducts]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults([]); return; }
    setResults(
      allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    );
  }, [query, allProducts]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const minPrice = (p: SearchProduct) =>
    p.product_variants?.length
      ? Math.min(...p.product_variants.map((v) => v.price))
      : 0;

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel — slides down from top */}
      <div className="relative z-10 bg-bg border-b border-line shadow-2xl">
        {/* Input row */}
        <div className="px-5 md:px-8 h-16 flex items-center gap-4 border-b border-line">
          <Search strokeWidth={1.5} className="h-5 w-5 text-body shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="flex-1 bg-transparent text-[16px] text-text placeholder:text-muted outline-none"
          />
          <button
            onClick={handleClose}
            aria-label="Close search"
            className="shrink-0 w-9 h-9 flex items-center justify-center text-body hover:text-text transition-colors"
          >
            <X strokeWidth={1.5} className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="max-h-[55vh] overflow-y-auto">
            {loading && (
              <div className="px-8 py-8 text-[13px] text-body">
                Loading…
              </div>
            )}

            {!loading && results.length === 0 && (
              <div className="px-8 py-8 text-[13px] text-body">
                No products found for &ldquo;{query}&rdquo;
              </div>
            )}

            {results.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                onClick={handleClose}
                className="flex items-center gap-5 px-5 md:px-8 py-4 hover:bg-surface transition-colors border-b border-line last:border-0 group"
              >
                {/* Thumbnail */}
                <div className="relative w-14 h-14 bg-surface-2 shrink-0 overflow-hidden">
                  {p.image_urls?.[0] && (
                    <Image
                      src={p.image_urls[0]}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-text truncate">
                    {p.name}
                  </div>
                  <div className="text-[11px] font-mono text-body capitalize mt-0.5 tracking-wider">
                    {p.category}
                  </div>
                </div>

                {/* Price + arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[13px] font-mono text-text">
                    {formatPrice(minPrice(p))}
                  </span>
                  <ArrowRight
                    strokeWidth={1.5}
                    className="h-4 w-4 text-body group-hover:text-text group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state (before typing) */}
        {!query.trim() && (
          <div className="px-8 py-6 text-[12px] font-mono text-muted tracking-wider">
            TYPE TO SEARCH PRODUCTS
          </div>
        )}
      </div>
    </div>
  );
}
