import type { SupabaseClient } from '@supabase/supabase-js';

export type PageSlug = 'home' | 'about' | 'gallery' | 'explore' | 'booking' | 'contact';
export type Lang = 'en' | 'he';
export type Status = 'draft' | 'published';

export interface PageContentRow {
  id: string;
  page_id: string;
  lang: Lang;
  status: Status;
  data: any;
  updated_at: string | null;
}

const PAGE_SLUGS: PageSlug[] = ['home','about','gallery','explore','booking','contact'];

export async function ensurePagesSeeded(supabase: SupabaseClient) {
  const { data: pages } = await supabase.from('pages').select('slug');
  const existing = new Set((pages ?? []).map((p: any) => p.slug));
  const toInsert = PAGE_SLUGS.filter((s) => !existing.has(s)).map((slug) => ({ slug }));
  if (toInsert.length) {
    await supabase.from('pages').insert(toInsert).select();
  }
}

export async function getPageId(supabase: SupabaseClient, slug: PageSlug): Promise<string | null> {
  const { data, error } = await supabase.from('pages').select('id').eq('slug', slug).maybeSingle();
  if (error) return null;
  return data?.id ?? null;
}

export async function getPageContent(
  supabase: SupabaseClient,
  slug: PageSlug,
  lang: Lang,
  status: Status
): Promise<any | null> {
  const { data, error } = await supabase
    .from('page_content')
    .select('data, updated_at, pages!inner(slug)')
    .eq('pages.slug', slug)
    .eq('lang', lang)
    .eq('status', status)
    .order('updated_at', { ascending: false })
    .limit(1);

  if (error) return null;
  return data?.[0]?.data ?? null;
}

export async function saveDraft(
  supabase: SupabaseClient,
  slug: PageSlug,
  lang: Lang,
  data: any
) {
  let pageId = await getPageId(supabase, slug);
  if (!pageId) {
    await ensurePagesSeeded(supabase);
    pageId = await getPageId(supabase, slug);
  }
  if (!pageId) throw new Error('Page not found');

  const payload = { page_id: pageId, lang, status: 'draft' as Status, data };
  const { error } = await supabase.from('page_content').insert(payload);
  if (error) throw error;
}

export async function publish(
  supabase: SupabaseClient,
  slug: PageSlug,
  lang: Lang
) {
  const pageId = await getPageId(supabase, slug);
  if (!pageId) throw new Error('Page not found');

  // Demote existing published rows
  await supabase
    .from('page_content')
    .update({ status: 'draft' as Status })
    .eq('page_id', pageId)
    .eq('lang', lang)
    .eq('status', 'published');

  // Promote latest draft
  const { data: drafts } = await supabase
    .from('page_content')
    .select('id')
    .eq('page_id', pageId)
    .eq('lang', lang)
    .eq('status', 'draft')
    .order('updated_at', { ascending: false })
    .limit(1);

  if (drafts && drafts[0]) {
    await supabase
      .from('page_content')
      .update({ status: 'published' as Status })
      .eq('id', drafts[0].id);
  }
}

export interface UploadResult { path: string; url: string; }

export async function uploadImage(
  supabase: SupabaseClient,
  slug: PageSlug,
  file: File
): Promise<UploadResult> {
  const bucket = 'public-assets';
  const path = `${slug}/${Date.now()}-${file.name}`.replace(/\s+/g, '-');

  const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (upErr) throw upErr;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { path, url: data.publicUrl };
}

export async function listImages(
  supabase: SupabaseClient,
  slug: PageSlug
): Promise<UploadResult[]> {
  const bucket = 'public-assets';
  const { data, error } = await supabase.storage.from(bucket).list(slug);
  if (error || !data) return [];
  return data
    .filter((f) => f.name)
    .map((f) => {
      const fullPath = `${slug}/${f.name}`;
      const { data } = supabase.storage.from(bucket).getPublicUrl(fullPath);
      return { path: fullPath, url: data.publicUrl };
    });
}

export async function deleteImage(
  supabase: SupabaseClient,
  path: string
): Promise<void> {
  const bucket = 'public-assets';
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}
