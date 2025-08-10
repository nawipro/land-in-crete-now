-- Deduplicate availability by date, keeping the lowest id per date
DELETE FROM public.availability a
USING public.availability b
WHERE a.date = b.date AND a.id > b.id;

-- Add a unique constraint to allow upsert on date
ALTER TABLE public.availability
ADD CONSTRAINT availability_date_unique UNIQUE (date);