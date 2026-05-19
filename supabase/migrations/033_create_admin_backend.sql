-- ============================================================
-- Migration 033: Phase 1 admin backend
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_email text,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id text,
  before_summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  after_summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at
  ON admin_audit_logs (created_at DESC);

CREATE TABLE IF NOT EXISTS homepage_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  layout text NOT NULL DEFAULT 'classic' CHECK (layout IN ('classic', 'event', 'minimal')),
  source_label text NOT NULL DEFAULT 'HKSchoolPlace',
  title_tc text NOT NULL,
  subtitle_en text,
  tags text[] NOT NULL DEFAULT '{}',
  cta_primary_label text NOT NULL DEFAULT '查看詳情',
  cta_primary_url text NOT NULL DEFAULT '/',
  cta_secondary_label text,
  cta_secondary_url text,
  footer_note text,
  image_src text NOT NULL DEFAULT '/brand/Web Logo/Logo.png',
  image_alt text NOT NULL DEFAULT '',
  is_visible boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS homepage_featured_schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE SET NULL,
  custom_title text,
  custom_name_en text,
  custom_tags text[] NOT NULL DEFAULT '{}',
  is_visible boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS homepage_news_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'hkschoolplace',
  source_category text NOT NULL DEFAULT 'school' CHECK (source_category IN ('government', 'media', 'school')),
  source_label text NOT NULL DEFAULT 'HKSchoolPlace',
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  display_date text NOT NULL DEFAULT '',
  published_at timestamptz NOT NULL DEFAULT now(),
  href text NOT NULL DEFAULT '/',
  is_external boolean NOT NULL DEFAULT false,
  content_type text CHECK (content_type IN ('open_day', 'admission', 'interview', 'policy', 'feature', 'school_event')),
  content_type_label text,
  is_visible boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admission_intel
  ADD COLUMN IF NOT EXISTS is_hidden boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION update_admin_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_homepage_banners ON homepage_banners;
CREATE TRIGGER set_updated_at_homepage_banners
  BEFORE UPDATE ON homepage_banners
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_homepage_featured_schools ON homepage_featured_schools;
CREATE TRIGGER set_updated_at_homepage_featured_schools
  BEFORE UPDATE ON homepage_featured_schools
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_homepage_news_items ON homepage_news_items;
CREATE TRIGGER set_updated_at_homepage_news_items
  BEFORE UPDATE ON homepage_news_items
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_featured_schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_news_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_audit_logs_service_all"
  ON admin_audit_logs FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "homepage_banners_public_read"
  ON homepage_banners FOR SELECT
  USING (is_visible = true);

CREATE POLICY "homepage_featured_schools_public_read"
  ON homepage_featured_schools FOR SELECT
  USING (is_visible = true);

CREATE POLICY "homepage_news_items_public_read"
  ON homepage_news_items FOR SELECT
  USING (is_visible = true);

CREATE POLICY "homepage_banners_service_all"
  ON homepage_banners FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "homepage_featured_schools_service_all"
  ON homepage_featured_schools FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "homepage_news_items_service_all"
  ON homepage_news_items FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

INSERT INTO storage.buckets (id, name, public)
VALUES ('school-logos', 'school-logos', true)
ON CONFLICT (id) DO NOTHING;
