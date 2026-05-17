import "server-only";
import { cache } from "react";
import { getSupabaseServer } from "./supabase/server";
import type { ShippingSettings } from "./supabase/types";

const SHIPPING_DEFAULT: ShippingSettings = {
  flat_fee_cents: 1500,
  free_threshold_cents: 20000,
  enabled: true,
};

/**
 * Reads shipping settings from public.settings. Cached per-request via React's
 * `cache()` so multiple components on a single render don't re-query.
 */
export const getShippingSettings = cache(async (): Promise<ShippingSettings> => {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "shipping")
      .maybeSingle();

    if (error || !data) return SHIPPING_DEFAULT;

    const value = (data as { value: Partial<ShippingSettings> }).value ?? {};
    return {
      flat_fee_cents:
        typeof value.flat_fee_cents === "number"
          ? value.flat_fee_cents
          : SHIPPING_DEFAULT.flat_fee_cents,
      free_threshold_cents:
        typeof value.free_threshold_cents === "number"
          ? value.free_threshold_cents
          : SHIPPING_DEFAULT.free_threshold_cents,
      enabled:
        typeof value.enabled === "boolean"
          ? value.enabled
          : SHIPPING_DEFAULT.enabled,
    };
  } catch {
    return SHIPPING_DEFAULT;
  }
});

export function calculateShipping(
  subtotalCents: number,
  settings: ShippingSettings
): number {
  if (!settings.enabled) return 0;
  if (subtotalCents <= 0) return 0;
  if (subtotalCents >= settings.free_threshold_cents) return 0;
  return settings.flat_fee_cents;
}
