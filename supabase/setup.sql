-- Run this in Supabase SQL Editor (once) to setup the CMS schema, RLS and storage

-- 1) Tables
create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.page_content (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  lang text not null default 'en',
  status text not null default 'draft' check (status in ('draft','published')),
  data jsonb not null default '{}',
  updated_at timestamp with time zone default now()
);

-- 2) Seed pages
insert into public.pages (slug)
  values ('home'),('about'),('gallery'),('explore'),('booking'),('contact')
on conflict (slug) do nothing;

-- 3) Storage bucket
select storage.create_bucket('public-assets', public := true);

-- 4) RLS
alter table public.page_content enable row level security;

-- Allow read of published content to everyone
create policy if not exists "read_published_content" on public.page_content
  for select using (status = 'published');

-- Allow authenticated users to read/write drafts and publish
create policy if not exists "write_authenticated" on public.page_content
  for all to authenticated using (true) with check (true);

-- Allow authenticated users to read pages
alter table public.pages enable row level security;
create policy if not exists "read_pages_all" on public.pages for select using (true);
create policy if not exists "write_pages_auth" on public.pages for all to authenticated using (true) with check (true);

-- 5) Storage policies (public read, auth write)
create policy if not exists "Public read" on storage.objects for select using ( bucket_id = 'public-assets' );
create policy if not exists "Auth write" on storage.objects for insert to authenticated with check ( bucket_id = 'public-assets' );
create policy if not exists "Auth update" on storage.objects for update to authenticated using ( bucket_id = 'public-assets' );
create policy if not exists "Auth delete" on storage.objects for delete to authenticated using ( bucket_id = 'public-assets' );
