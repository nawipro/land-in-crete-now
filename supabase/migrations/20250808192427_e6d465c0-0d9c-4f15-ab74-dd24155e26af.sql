-- CMS schema, RLS, and storage setup
-- 1) Tables
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  lang TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Helpful index for lookups
CREATE INDEX IF NOT EXISTS idx_page_content_page_lang_status ON public.page_content(page_id, lang, status, updated_at DESC);

-- 2) Seed pages
INSERT INTO public.pages (slug)
  VALUES ('home'),('about'),('gallery'),('explore'),('booking'),('contact')
ON CONFLICT (slug) DO NOTHING;

-- 3) Storage bucket for public assets
DO $$
BEGIN
  -- create_bucket returns error if exists, so guard it
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'public-assets'
  ) THEN
    INSERT INTO storage.buckets (id, name, public) VALUES ('public-assets', 'public-assets', true);
  END IF;
END $$;

-- 4) Enable RLS and policies
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Allow read of published content to everyone
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'page_content' AND policyname = 'read_published_content'
  ) THEN
    CREATE POLICY "read_published_content" ON public.page_content
      FOR SELECT USING (status = 'published');
  END IF;
END $$;

-- Allow authenticated users to read/write drafts and publish
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'page_content' AND policyname = 'write_authenticated'
  ) THEN
    CREATE POLICY "write_authenticated" ON public.page_content
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Pages table policies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'pages' AND policyname = 'read_pages_all'
  ) THEN
    CREATE POLICY "read_pages_all" ON public.pages FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'pages' AND policyname = 'write_pages_auth'
  ) THEN
    CREATE POLICY "write_pages_auth" ON public.pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- 5) Storage policies for bucket
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read public-assets'
  ) THEN
    CREATE POLICY "Public read public-assets" ON storage.objects FOR SELECT USING (bucket_id = 'public-assets');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Auth insert public-assets'
  ) THEN
    CREATE POLICY "Auth insert public-assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'public-assets');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Auth update public-assets'
  ) THEN
    CREATE POLICY "Auth update public-assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'public-assets');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Auth delete public-assets'
  ) THEN
    CREATE POLICY "Auth delete public-assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'public-assets');
  END IF;
END $$;