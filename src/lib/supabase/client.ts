import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Browser client — uses anon key. RLS on products/variants allows public read.
// Don't use this in route handlers that need to insert orders; use server.ts there.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
