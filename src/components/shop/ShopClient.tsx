"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilterPanel, type ShopFilters } from "./FilterPanel";
import { SortDropdown, type SortKey } from "./SortDropdown";
import { ProductCard } from "./ProductCard";
import type { Category, ProductWithVariants } from "@/lib/supabase/types";

interface Props {
  products: ProductWithVariants[];
}

const ALL_CATEGORIES: Category[] = ["headphones", "earbuds", "speakers"];

function parseCategoryParam(value: string | null): Category[] {
  if (!value) return [];
  return value
    .split(",")
    .filter((v): v is Category => ALL_CATEGORIES.includes(v as Category));
}

export function ShopClient({ products }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Compute price bounds + color options from product list once
  const { priceBounds, colors } = useMemo(() => {
    const prices = products.map((p) => p.base_price);
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 100000;
    // Round bounds to nearest 100 dollars (10000 cents) for nicer slider steps
    const lower = Math.floor(min / 10000) * 10000;
    const upper = Math.ceil(max / 10000) * 10000;

    const colorMap = new Map<string, string>();
    products.forEach((p) =>
      p.variants.forEach((v) => {
        if (!colorMap.has(v.color_name)) colorMap.set(v.color_name, v.color_hex);
      })
    );
    const colors = Array.from(colorMap.entries()).map(([name, hex]) => ({
      name,
      hex,
    }));

    return {
      priceBounds: [lower, upper] as [number, number],
      colors,
    };
  }, [products]);

  // Initial filter + sort state from URL params
  const [filters, setFilters] = useState<ShopFilters>(() => ({
    categories: parseCategoryParam(searchParams.get("category")),
    colors: searchParams.get("color")?.split(",").filter(Boolean) ?? [],
    price: [
      Number(searchParams.get("min")) || priceBounds[0],
      Number(searchParams.get("max")) || priceBounds[1],
    ],
  }));
  const [sort, setSort] = useState<SortKey>(
    (searchParams.get("sort") as SortKey) || "newest"
  );

  // Sync state → URL (replace, no scroll)
  const sync = (next: { filters?: ShopFilters; sort?: SortKey }) => {
    const f = next.filters ?? filters;
    const s = next.sort ?? sort;
    const params = new URLSearchParams();
    if (f.categories.length) params.set("category", f.categories.join(","));
    if (f.colors.length) params.set("color", f.colors.join(","));
    if (f.price[0] !== priceBounds[0]) params.set("min", String(f.price[0]));
    if (f.price[1] !== priceBounds[1]) params.set("max", String(f.price[1]));
    if (s !== "newest") params.set("sort", s);
    const qs = params.toString();
    router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  };

  const applyFilters = (next: ShopFilters) => {
    setFilters(next);
    sync({ filters: next });
  };
  const applySort = (next: SortKey) => {
    setSort(next);
    sync({ sort: next });
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category))
        return false;
      if (
        p.base_price < filters.price[0] ||
        p.base_price > filters.price[1]
      )
        return false;
      if (
        filters.colors.length &&
        !p.variants.some((v) => filters.colors.includes(v.color_name))
      )
        return false;
      return true;
    });

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.base_price - b.base_price);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.base_price - a.base_price);
    }

    return result;
  }, [products, filters, sort]);

  const filterPanel = (
    <FilterPanel
      filters={filters}
      setFilters={applyFilters}
      colors={colors}
      priceBounds={priceBounds}
      resultCount={filtered.length}
    />
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 px-5 md:px-8 pb-20">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
        {filterPanel}
      </aside>

      {/* Mobile filter drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" hideCloseButton className="p-0 w-[88vw] sm:max-w-sm">
          <div className="flex items-center justify-between h-16 px-5 border-b border-line">
            <SheetTitle className="text-[13px] font-medium">Filters</SheetTitle>
            <button
              onClick={() => setDrawerOpen(false)}
              className="inline-flex w-10 h-10 items-center justify-center rounded-full text-text hover:bg-surface transition-colors"
              aria-label="Close filters"
            >
              <X strokeWidth={1.5} className="h-5 w-5" />
            </button>
          </div>
          <div className="px-5 py-8 overflow-y-auto h-[calc(100%-4rem)]">
            {filterPanel}
          </div>
        </SheetContent>
      </Sheet>

      <main>
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 pb-6 mb-8 border-b border-line">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 h-11 px-4 border border-line text-[13px] text-text hover:border-line-2 transition-colors"
          >
            <SlidersHorizontal strokeWidth={1.5} className="h-4 w-4" />
            Filters
            {(filters.categories.length + filters.colors.length) > 0 && (
              <span className="text-[10px] font-mono text-accent">
                ({filters.categories.length + filters.colors.length})
              </span>
            )}
          </button>
          <div className="hidden lg:block text-[11px] font-mono text-muted tracking-wider">
            SHOWING {String(filtered.length).padStart(2, "0")} OF{" "}
            {String(products.length).padStart(2, "0")}
          </div>
          <SortDropdown value={sort} onChange={applySort} />
        </div>

        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <div className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-text mb-3">
              Nothing matches.
            </div>
            <p className="text-sm text-muted mb-6 max-w-sm mx-auto">
              No products match the current filter set. Try clearing or widening.
            </p>
            <button
              onClick={() =>
                applyFilters({ categories: [], colors: [], price: priceBounds })
              }
              className="text-[12px] font-mono text-accent tracking-wider hover:text-text transition-colors"
            >
              CLEAR FILTERS →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
