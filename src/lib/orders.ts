import "server-only";
import { getSupabaseAdmin } from "./supabase/server";
import type { OrderRow } from "./supabase/types";

export async function getOrderById(id: string): Promise<OrderRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[getOrderById] failed:", error);
    return null;
  }
  return data as OrderRow | null;
}
