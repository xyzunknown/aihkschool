-- ============================================================
-- Migration 025: Close official school master-data chain
-- ============================================================
-- Official bottom layer:
--   KGP / EDB own school identity and official attributes.
--   EDB owns vacancy, fee, official notices and inspection / quality-review links.
--   School websites only enrich admissions, open days and school-provided notes.
-- ============================================================

ALTER TABLE schools
  ADD COLUMN IF NOT EXISTS official_profile_url text,
  ADD COLUMN IF NOT EXISTS fee_certificate_url text,
  ADD COLUMN IF NOT EXISTS fee_certificate_updated_at date,
  ADD COLUMN IF NOT EXISTS official_notice_url text,
  ADD COLUMN IF NOT EXISTS official_notice_updated_at date,
  ADD COLUMN IF NOT EXISTS inspection_report_url text,
  ADD COLUMN IF NOT EXISTS inspection_report_updated_at date,
  ADD COLUMN IF NOT EXISTS master_data_notes text;

COMMENT ON COLUMN schools.official_profile_url IS
  'Official KGP / EDB school profile URL. Owned by KGP / EDB.';
COMMENT ON COLUMN schools.fee_certificate_url IS
  'Official EDB fee certificate PDF URL, if available.';
COMMENT ON COLUMN schools.official_notice_url IS
  'Latest accepted official notice URL. Only EDB, GovHK or school website announcements are allowed.';
COMMENT ON COLUMN schools.inspection_report_url IS
  'Official inspection / quality review report URL or PDF. Media and forum URLs are not allowed.';
COMMENT ON COLUMN schools.master_data_notes IS
  'Manual notes for official-chain exceptions, e.g. school website unavailable or identity override confirmed.';
