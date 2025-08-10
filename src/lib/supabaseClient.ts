import { supabase } from '@/integrations/supabase/client';

export function getSupabaseClient() {
  return supabase;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}
