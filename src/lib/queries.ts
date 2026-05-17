import "server-only";
import { getSupabaseServer } from "./supabase/server";
import type { ProductWithVariants, Category } from "./supabase/types";

export async function getAllProducts(): Promise<ProductWithVariants[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as ProductWithVariants[];
}

export async function getProductsByCategory(category: Category): Promise<ProductWithVariants[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("category", category)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as ProductWithVariants[];
}

export async function getProductBySlug(slug: string): Promise<ProductWithVariants | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data as ProductWithVariants | null;
}

export async function getRelatedProducts(
  category: Category,
  excludeId: string,
  limit = 3
): Promise<ProductWithVariants[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("category", category)
    .neq("id", excludeId)
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as ProductWithVariants[];
}
