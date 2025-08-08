import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;
  if (typeof window === 'undefined') return null;

  const w = window as any;
  const url = w.__SUPABASE_URL__ || w.SUPABASE_URL || w.lovableSupabaseUrl;
  const anon = w.__SUPABASE_ANON_KEY__ || w.SUPABASE_ANON_KEY || w.lovableSupabaseAnonKey;

  if (url && anon) {
    client = createClient(url, anon);
    return client;
  }

  console.warn(
    '[CMS] Supabase is not configured. Please connect your Lovable project to Supabase using the green Supabase button in the top-right.'
  );
  return null;
}

export async function getCurrentUser() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}
