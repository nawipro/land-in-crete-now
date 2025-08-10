-- 1) Extend price_seasons with tourist_tax_per_guest
ALTER TABLE public.price_seasons
  ADD COLUMN IF NOT EXISTS tourist_tax_per_guest numeric NOT NULL DEFAULT 0;

-- 2) availability: enforce allowed statuses and defaults, and ensure upsert works on date
ALTER TABLE public.availability
  ALTER COLUMN status SET DEFAULT 'available';

-- Add CHECK constraint for allowed statuses (only if not already present)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'availability' AND c.conname = 'availability_status_check'
  ) THEN
    ALTER TABLE public.availability
      ADD CONSTRAINT availability_status_check CHECK (status IN ('available','blocked','booked'));
  END IF;
END $$;

-- Unique index on date so upsert(onConflict: 'date') works reliably
CREATE UNIQUE INDEX IF NOT EXISTS availability_date_unique ON public.availability (date);

-- 3) Create settings key/value table with RLS
CREATE TABLE IF NOT EXISTS public.settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Policies: public read, authenticated manage
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'settings' AND policyname = 'settings_public_read'
  ) THEN
    CREATE POLICY "settings_public_read" ON public.settings
    FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'settings' AND policyname = 'settings_manage_authenticated'
  ) THEN
    CREATE POLICY "settings_manage_authenticated" ON public.settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Trigger to keep updated_at fresh
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_settings_updated_at'
  ) THEN
    CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON public.settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- 4) Seed default rows
INSERT INTO public.settings (key, value) VALUES
  ('cleaning_free_nights','5'),
  ('cleaning_fee','80'),
  ('tax_high_season_rate','15'),
  ('tax_off_season_rate','8'),
  ('currency','EUR'),
  ('tax_high_season_start','2025-04-01'),
  ('tax_high_season_end','2025-10-31')
ON CONFLICT (key) DO NOTHING;