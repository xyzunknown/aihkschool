-- Add geographic coordinates and nursery class indicator
ALTER TABLE schools
  ADD COLUMN IF NOT EXISTS latitude numeric(10,7),
  ADD COLUMN IF NOT EXISTS longitude numeric(11,7),
  ADD COLUMN IF NOT EXISTS has_nursery boolean NOT NULL DEFAULT false;
