import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format cents → display string. 34900 → "$349"
 * Falls back to "$X.XX" when there are non-zero cents.
 */
export function formatPrice(cents: number, currency = "USD"): string {
  const dollars = cents / 100;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(dollars);
}

/**
 * "headphones" → "Headphones"
 */
export function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/**
 * Pad number with leading zeros. (3, 2) → "03"
 */
export function pad(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

/**
 * Convert an integer 1..3999 to a Roman numeral.
 * Used for design accents: MMXXVI, ED. IV, etc.
 */
export function toRoman(n: number): string {
  const map: Array<[number, string]> = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  let rest = n;
  for (const [v, s] of map) {
    while (rest >= v) { out += s; rest -= v; }
  }
  return out;
}
