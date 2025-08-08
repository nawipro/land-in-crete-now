import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;
  if (typeof window === 'undefined') return null;

  const w = window as any;
  const url = w.__SUPABASE_URL__ || w.SUPABASE_URL || w.lovableSupabaseUrl;
  const anon = w.__SUPABASE_ANON_KEY__ || w.SUPABASE_ANON_KEY || w.lovableSupabaseAnonKey;

  // Fallback to project defaults if runtime variables are not present
  const fallbackUrl = "https://hscafycmozoismieksqc.supabase.co";
  const fallbackAnon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzY2FmeWNtb3pvaXNtaWVrc3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzU1MzAsImV4cCI6MjA3MDI1MTUzMH0.Lpy8ypP8wh0dhYLmbv5q_uglohPPozfINGxb_7NS0tc";

  const finalUrl = url || fallbackUrl;
  const finalAnon = anon || fallbackAnon;

  client = createClient(finalUrl, finalAnon);
  return client;
}


export async function getCurrentUser() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}
