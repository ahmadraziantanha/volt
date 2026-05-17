import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Server-only client. Uses anon key for reads — switch to service-role for writes
// in admin actions and order inserts.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function getSupabaseServer() {
  return createClient<Database>(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Bypasses RLS. Use only in trusted server contexts (admin actions, order
 * insertion in /order-confirmed). Never import from a client component.
 */
export function getSupabaseAdmin() {
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
  }
  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
