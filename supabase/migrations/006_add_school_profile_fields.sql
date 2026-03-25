ALTER TABLE schools
  ADD COLUMN application_fee_hkd numeric(10,2),
  ADD COLUMN registration_fee_hkd numeric(10,2),
  ADD COLUMN other_fees_note text,
  ADD COLUMN fee_notes text,
  ADD COLUMN application_status text,
  ADD COLUMN application_details text,
  ADD COLUMN application_url text,
  ADD COLUMN open_day_details text,
  ADD COLUMN open_day_url text,
  ADD COLUMN last_profile_scraped_at timestamptz;
