-- ============================================================
-- Migration 034: Phase 2 operations admin backend
-- ============================================================

ALTER TABLE lcsd_programmes
  ADD COLUMN IF NOT EXISTS admin_status text NOT NULL DEFAULT 'visible'
    CHECK (admin_status IN ('visible', 'hidden', 'ended')),
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS admin_updated_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_lcsd_programmes_admin_status
  ON lcsd_programmes (admin_status);

ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS admin_status text NOT NULL DEFAULT 'visible'
    CHECK (admin_status IN ('visible', 'hidden', 'low_quality')),
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS admin_updated_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_activities_admin_status
  ON activities (admin_status);

ALTER TABLE homepage_news_items
  ADD COLUMN IF NOT EXISTS is_pinned boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_homepage_news_items_pinned
  ON homepage_news_items (is_pinned DESC, published_at DESC);

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS admin_disabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS admin_disabled_reason text,
  ADD COLUMN IF NOT EXISTS admin_disabled_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_users_admin_disabled
  ON users (admin_disabled);

CREATE TABLE IF NOT EXISTS timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE SET NULL,
  school_name text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('open_day', 'interview', 'briefing', 'deadline', 'trial', 'talk')),
  event_label text NOT NULL,
  event_date date NOT NULL,
  event_time text,
  href text NOT NULL DEFAULT '/',
  detail_href text,
  source_label text NOT NULL DEFAULT 'HKSchoolPlace',
  is_visible boolean NOT NULL DEFAULT true,
  is_pinned boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_timeline_events_date
  ON timeline_events (event_date);

CREATE INDEX IF NOT EXISTS idx_timeline_events_visible
  ON timeline_events (is_visible, event_date);

DROP TRIGGER IF EXISTS set_updated_at_timeline_events ON timeline_events;
CREATE TRIGGER set_updated_at_timeline_events
  BEFORE UPDATE ON timeline_events
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "timeline_events_public_read"
  ON timeline_events FOR SELECT
  USING (is_visible = true);

CREATE POLICY "timeline_events_service_all"
  ON timeline_events FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

GRANT SELECT ON timeline_events TO anon, authenticated;
GRANT ALL ON timeline_events TO service_role;
