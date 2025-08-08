import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getPageContent, type PageSlug } from '@/lib/cms';

export function useCms<T = any>(slug: PageSlug, lang: 'en' | 'he') {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const content = await getPageContent(supabase, slug, lang, 'published');
        if (active) setData(content as T);
      } catch (e: any) {
        if (active) setError(e?.message || 'Failed to load content');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [slug, lang]);

  return { data, loading, error } as const;
}
