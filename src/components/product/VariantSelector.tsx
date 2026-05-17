"use client";

import { cn } from "@/lib/utils";
import type { VariantRow } from "@/lib/supabase/types";

interface Props {
  variants: VariantRow[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function VariantSelector({ variants, selectedId, onSelect }: Props) {
  const selected = variants.find((v) => v.id === selectedId);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] font-mono text-muted tracking-wider">
          COLOUR
        </div>
        <div className="text-[12px] text-body">{selected?.color_name}</div>
      </div>

      <div className="flex flex-wrap gap-3">
        {variants.map((v) => {
          const isSelected = v.id === selectedId;
          const isOOS = v.stock <= 0;

          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              aria-label={v.color_name}
              aria-pressed={isSelected}
              disabled={isOOS}
              title={isOOS ? `${v.color_name} — sold out` : v.color_name}
              className={cn(
                "relative w-10 h-10 rounded-full transition-all duration-300 ease-smooth",
                "before:absolute before:inset-0 before:rounded-full before:transition-all",
                isSelected
                  ? "before:ring-2 before:ring-accent before:ring-offset-2 before:ring-offset-bg"
                  : "before:ring-1 before:ring-line hover:before:ring-muted",
                isOOS && "opacity-40 cursor-not-allowed"
              )}
            >
              <span
                className="block w-full h-full rounded-full"
                style={{ background: v.color_hex }}
                aria-hidden
              />
              {isOOS && (
                <span
                  className="absolute inset-1/2 w-[140%] h-[1px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-text"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
