-- Add tourist tax fields to booking_settings for seasonal per-person-per-night rates
ALTER TABLE public.booking_settings
  ADD COLUMN IF NOT EXISTS tourist_tax_high numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tourist_tax_low numeric NOT NULL DEFAULT 0;

-- Optional: comments for clarity
COMMENT ON COLUMN public.booking_settings.tourist_tax_high IS 'Tourist tax per person per night when in season (any defined season)';
COMMENT ON COLUMN public.booking_settings.tourist_tax_low IS 'Tourist tax per person per night when off-season (dates not covered by any season)';