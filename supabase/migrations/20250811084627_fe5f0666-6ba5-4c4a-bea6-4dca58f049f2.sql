-- Create tax_seasons table for government/municipal tourist tax by season
CREATE TABLE IF NOT EXISTS public.tax_seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  tax_per_guest_per_night NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tax_seasons ENABLE ROW LEVEL SECURITY;

-- Policies: public can read published only; authenticated can manage
DROP POLICY IF EXISTS tax_seasons_public_read ON public.tax_seasons;
CREATE POLICY tax_seasons_public_read
ON public.tax_seasons
FOR SELECT
USING (status = 'published');

DROP POLICY IF EXISTS tax_seasons_manage_authenticated ON public.tax_seasons;
CREATE POLICY tax_seasons_manage_authenticated
ON public.tax_seasons
FOR ALL
USING (true)
WITH CHECK (true);

-- Trigger to keep updated_at fresh
DROP TRIGGER IF EXISTS update_tax_seasons_updated_at ON public.tax_seasons;
CREATE TRIGGER update_tax_seasons_updated_at
BEFORE UPDATE ON public.tax_seasons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_tax_seasons_date_range ON public.tax_seasons (start_date, end_date);
