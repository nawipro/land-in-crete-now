-- Create update timestamp trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Seasons table
CREATE TABLE IF NOT EXISTS public.price_seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  price_per_night numeric(10,2) NOT NULL,
  min_stay_nights integer NOT NULL DEFAULT 4,
  currency_symbol text NOT NULL DEFAULT '€',
  status text NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT season_date_range_valid CHECK (start_date <= end_date)
);

ALTER TABLE public.price_seasons ENABLE ROW LEVEL SECURITY;

-- Public can read only published seasons
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'price_seasons' AND policyname = 'read_published_seasons'
  ) THEN
    CREATE POLICY "read_published_seasons"
      ON public.price_seasons
      FOR SELECT
      USING (status = 'published');
  END IF;
END $$;

-- Authenticated users can manage seasons
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'price_seasons' AND policyname = 'manage_seasons_authenticated'
  ) THEN
    CREATE POLICY "manage_seasons_authenticated"
      ON public.price_seasons
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Trigger for seasons
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_price_seasons_updated_at'
  ) THEN
    CREATE TRIGGER update_price_seasons_updated_at
    BEFORE UPDATE ON public.price_seasons
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_price_seasons_dates ON public.price_seasons (start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_price_seasons_status ON public.price_seasons (status);

-- Availability table
CREATE TABLE IF NOT EXISTS public.availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  status text NOT NULL CHECK (status IN ('blocked', 'booked')),
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;

-- Public can read availability
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'availability' AND policyname = 'availability_public_read'
  ) THEN
    CREATE POLICY "availability_public_read"
      ON public.availability
      FOR SELECT
      USING (true);
  END IF;
END $$;

-- Authenticated manage availability
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'availability' AND policyname = 'availability_manage_authenticated'
  ) THEN
    CREATE POLICY "availability_manage_authenticated"
      ON public.availability
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Trigger for availability
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_availability_updated_at'
  ) THEN
    CREATE TRIGGER update_availability_updated_at
    BEFORE UPDATE ON public.availability
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_availability_date ON public.availability (date);
CREATE INDEX IF NOT EXISTS idx_availability_status ON public.availability (status);

-- Booking settings (singleton via partial unique index)
CREATE TABLE IF NOT EXISTS public.booking_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cleaning_fee numeric(10,2) NOT NULL DEFAULT 0,
  service_fee numeric(10,2) NOT NULL DEFAULT 0,
  inquiry_email text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'published',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.booking_settings ENABLE ROW LEVEL SECURITY;

-- Public can read active + published settings
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'booking_settings' AND policyname = 'read_active_published_settings'
  ) THEN
    CREATE POLICY "read_active_published_settings"
      ON public.booking_settings
      FOR SELECT
      USING (is_active AND status = 'published');
  END IF;
END $$;

-- Authenticated manage settings
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'booking_settings' AND policyname = 'manage_settings_authenticated'
  ) THEN
    CREATE POLICY "manage_settings_authenticated"
      ON public.booking_settings
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Trigger for settings
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_booking_settings_updated_at'
  ) THEN
    CREATE TRIGGER update_booking_settings_updated_at
    BEFORE UPDATE ON public.booking_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Ensure only one active settings row
CREATE UNIQUE INDEX IF NOT EXISTS uniq_booking_settings_active ON public.booking_settings (is_active) WHERE (is_active);

-- Seed seasons if empty
INSERT INTO public.price_seasons (season_name, start_date, end_date, price_per_night, min_stay_nights, currency_symbol, status)
SELECT * FROM (
  VALUES
    ('Low Season', (date_trunc('year', now()))::date, (date_trunc('year', now())::date + INTERVAL '4 months' - INTERVAL '1 day')::date, 250.00, 4, '€', 'published'),
    ('High Season', (date_trunc('year', now())::date + INTERVAL '6 months')::date, (date_trunc('year', now())::date + INTERVAL '8 months' - INTERVAL '1 day')::date, 320.00, 5, '€', 'published')
) AS v(season_name, start_date, end_date, price_per_night, min_stay_nights, currency_symbol, status)
WHERE NOT EXISTS (SELECT 1 FROM public.price_seasons);

-- Seed booking settings if none active
INSERT INTO public.booking_settings (cleaning_fee, service_fee, inquiry_email, status, is_active)
SELECT 80.00, 0.00, 'bookings@nowweland.com', 'published', true
WHERE NOT EXISTS (SELECT 1 FROM public.booking_settings WHERE is_active);
