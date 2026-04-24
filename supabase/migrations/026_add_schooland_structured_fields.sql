-- ============================================================
-- Migration 026: Schooland structured supplement fields
-- ============================================================
-- Schooland is a secondary supplement layer. These columns keep
-- normalized Schooland-only values separate from EDB / official fields.
-- ============================================================

ALTER TABLE schools
  ADD COLUMN IF NOT EXISTS schooland_operator_name text,
  ADD COLUMN IF NOT EXISTS schooland_group_tag text,
  ADD COLUMN IF NOT EXISTS schooland_free_scheme boolean,
  ADD COLUMN IF NOT EXISTS schooland_nursery_service text
    CHECK (schooland_nursery_service IN ('yes', 'no', 'unknown')),
  ADD COLUMN IF NOT EXISTS schooland_size_label text
    CHECK (schooland_size_label IN ('small', 'medium', 'large')),
  ADD COLUMN IF NOT EXISTS schooland_session_label text
    CHECK (schooland_session_label IN ('am', 'pm', 'whole_day', 'mixed')),
  ADD COLUMN IF NOT EXISTS schooland_url text,
  ADD COLUMN IF NOT EXISTS schooland_source_url text,
  ADD COLUMN IF NOT EXISTS schooland_source_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS schooland_source_fields jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS schooland_secondary_flags jsonb NOT NULL DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_schools_schooland_group
  ON schools(schooland_group_tag)
  WHERE schooland_group_tag IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_schools_schooland_free_scheme
  ON schools(schooland_free_scheme)
  WHERE schooland_free_scheme IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_schools_schooland_nursery
  ON schools(schooland_nursery_service)
  WHERE schooland_nursery_service IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_schools_schooland_size
  ON schools(schooland_size_label)
  WHERE schooland_size_label IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_schools_schooland_session
  ON schools(schooland_session_label)
  WHERE schooland_session_label IS NOT NULL;

COMMENT ON COLUMN schools.schooland_operator_name IS
  'Normalized operating body name from Schooland. Secondary source only.';
COMMENT ON COLUMN schools.schooland_group_tag IS
  'Normalized chain / group tag from Schooland. Secondary source only.';
COMMENT ON COLUMN schools.schooland_free_scheme IS
  'Schooland free kindergarten scheme signal. Does not overwrite official kep_participant.';
COMMENT ON COLUMN schools.schooland_nursery_service IS
  'Schooland nursery service tag: yes / no / unknown.';
COMMENT ON COLUMN schools.schooland_size_label IS
  'Schooland capacity-derived size tag: small / medium / large.';
COMMENT ON COLUMN schools.schooland_session_label IS
  'Schooland class session tag: am / pm / whole_day / mixed.';
COMMENT ON COLUMN schools.schooland_source_fields IS
  'Field-level source marker for Schooland structured supplement values.';
COMMENT ON COLUMN schools.schooland_secondary_flags IS
  'Flags for official-field values that were only filled from Schooland when missing.';
