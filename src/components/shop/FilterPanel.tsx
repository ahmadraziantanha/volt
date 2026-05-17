"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn, formatPrice } from "@/lib/utils";
import type { Category } from "@/lib/supabase/types";

export interface ShopFilters {
  categories: Category[];
  colors: string[];
  price: [number, number]; // cents
}

interface ColorOption {
  name: string;
  hex: string;
}

interface Props {
  filters: ShopFilters;
  setFilters: (f: ShopFilters) => void;
  colors: ColorOption[];
  priceBounds: [number, number]; // cents
  resultCount: number;
}

const CATEGORIES: Array<{ key: Category; label: string; count?: string }> = [
  { key: "headphones", label: "Headphones" },
  { key: "earbuds", label: "Earbuds" },
  { key: "speakers", label: "Speakers" },
];

export function FilterPanel({
  filters,
  setFilters,
  colors,
  priceBounds,
  resultCount,
}: Props) {
  const toggleCategory = (c: Category) => {
    const next = filters.categories.includes(c)
      ? filters.categories.filter((x) => x !== c)
      : [...filters.categories, c];
    setFilters({ ...filters, categories: next });
  };

  const toggleColor = (name: string) => {
    const next = filters.colors.includes(name)
      ? filters.colors.filter((x) => x !== name)
      : [...filters.colors, name];
    setFilters({ ...filters, colors: next });
  };

  const setPrice = (v: number[]) => {
    setFilters({ ...filters, price: [v[0], v[1]] });
  };

  const clear = () =>
    setFilters({ categories: [], colors: [], price: priceBounds });

  const hasFilters =
    filters.categories.length > 0 ||
    filters.colors.length > 0 ||
    filters.price[0] !== priceBounds[0] ||
    filters.price[1] !== priceBounds[1];

  return (
    <div className="space-y-10">
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <div className="text-[11px] font-mono text-accent tracking-wider">FILTERS</div>
        <div className="text-[11px] font-mono text-muted">
          {String(resultCount).padStart(2, "0")} RESULTS
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <div className="text-[11px] font-mono text-muted tracking-wider mb-5">
          CATEGORY
        </div>
        <ul className="space-y-3.5">
          {CATEGORIES.map((c) => {
            const checked = filters.categories.includes(c.key);
            return (
              <li key={c.key}>
                <label className="flex items-center gap-3 cursor-pointer group/cb">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleCategory(c.key)}
                  />
                  <span
                    className={cn(
                      "text-[13.5px] transition-colors",
                      checked ? "text-text" : "text-body group-hover/cb:text-text"
                    )}
                  >
                    {c.label}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* PRICE */}
      <div>
        <div className="flex items-baseline justify-between mb-5">
          <div className="text-[11px] font-mono text-muted tracking-wider">PRICE</div>
          <div className="text-[11px] font-mono text-text">
            {formatPrice(filters.price[0])} — {formatPrice(filters.price[1])}
          </div>
        </div>
        <Slider
          value={filters.price}
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={1000}
          onValueChange={setPrice}
          minStepsBetweenThumbs={1}
        />
      </div>

      {/* COLOUR */}
      <div>
        <div className="text-[11px] font-mono text-muted tracking-wider mb-5">
          COLOUR
        </div>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => {
            const isActive = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 text-[12px] transition-colors",
                  "border",
                  isActive
                    ? "border-accent text-text"
                    : "border-line text-body hover:border-line-2 hover:text-text"
                )}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-line-2 shrink-0"
                  style={{ background: c.hex }}
                />
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clear}
          className="text-[12px] font-mono text-accent tracking-wider hover:text-text transition-colors"
        >
          CLEAR ALL →
        </button>
      )}
    </div>
  );
}
