-- ============================================================
-- Migration 036: Cross-platform publishing channels
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'app_publish_channel'
  ) THEN
    CREATE TYPE app_publish_channel AS ENUM ('web', 'ios', 'android');
  END IF;
END $$;

ALTER TYPE app_publish_channel ADD VALUE IF NOT EXISTS 'android';

ALTER TABLE schools
  ADD COLUMN IF NOT EXISTS publish_channels app_publish_channel[] NOT NULL DEFAULT ARRAY['web', 'ios', 'android']::app_publish_channel[];

ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS publish_channels app_publish_channel[] NOT NULL DEFAULT ARRAY['web', 'ios', 'android']::app_publish_channel[];

ALTER TABLE lcsd_programmes
  ADD COLUMN IF NOT EXISTS publish_channels app_publish_channel[] NOT NULL DEFAULT ARRAY['web', 'ios', 'android']::app_publish_channel[];

ALTER TABLE media_articles
  ADD COLUMN IF NOT EXISTS publish_channels app_publish_channel[] NOT NULL DEFAULT ARRAY['web', 'ios', 'android']::app_publish_channel[];

ALTER TABLE homepage_banners
  ADD COLUMN IF NOT EXISTS publish_channels app_publish_channel[] NOT NULL DEFAULT ARRAY['web', 'ios', 'android']::app_publish_channel[];

ALTER TABLE homepage_featured_schools
  ADD COLUMN IF NOT EXISTS publish_channels app_publish_channel[] NOT NULL DEFAULT ARRAY['web', 'ios', 'android']::app_publish_channel[];

ALTER TABLE homepage_news_items
  ADD COLUMN IF NOT EXISTS publish_channels app_publish_channel[] NOT NULL DEFAULT ARRAY['web', 'ios', 'android']::app_publish_channel[];

ALTER TABLE schools
  DROP CONSTRAINT IF EXISTS schools_publish_channels_not_empty,
  ADD CONSTRAINT schools_publish_channels_not_empty CHECK (array_length(publish_channels, 1) >= 1);

ALTER TABLE activities
  DROP CONSTRAINT IF EXISTS activities_publish_channels_not_empty,
  ADD CONSTRAINT activities_publish_channels_not_empty CHECK (array_length(publish_channels, 1) >= 1);

ALTER TABLE lcsd_programmes
  DROP CONSTRAINT IF EXISTS lcsd_programmes_publish_channels_not_empty,
  ADD CONSTRAINT lcsd_programmes_publish_channels_not_empty CHECK (array_length(publish_channels, 1) >= 1);

ALTER TABLE media_articles
  DROP CONSTRAINT IF EXISTS media_articles_publish_channels_not_empty,
  ADD CONSTRAINT media_articles_publish_channels_not_empty CHECK (array_length(publish_channels, 1) >= 1);

ALTER TABLE homepage_banners
  DROP CONSTRAINT IF EXISTS homepage_banners_publish_channels_not_empty,
  ADD CONSTRAINT homepage_banners_publish_channels_not_empty CHECK (array_length(publish_channels, 1) >= 1);

ALTER TABLE homepage_featured_schools
  DROP CONSTRAINT IF EXISTS homepage_featured_schools_publish_channels_not_empty,
  ADD CONSTRAINT homepage_featured_schools_publish_channels_not_empty CHECK (array_length(publish_channels, 1) >= 1);

ALTER TABLE homepage_news_items
  DROP CONSTRAINT IF EXISTS homepage_news_items_publish_channels_not_empty,
  ADD CONSTRAINT homepage_news_items_publish_channels_not_empty CHECK (array_length(publish_channels, 1) >= 1);

CREATE INDEX IF NOT EXISTS idx_schools_publish_channels
  ON schools USING gin (publish_channels);

CREATE INDEX IF NOT EXISTS idx_activities_publish_channels
  ON activities USING gin (publish_channels);

CREATE INDEX IF NOT EXISTS idx_lcsd_programmes_publish_channels
  ON lcsd_programmes USING gin (publish_channels);

CREATE INDEX IF NOT EXISTS idx_media_articles_publish_channels
  ON media_articles USING gin (publish_channels);

CREATE INDEX IF NOT EXISTS idx_homepage_banners_publish_channels
  ON homepage_banners USING gin (publish_channels);

CREATE INDEX IF NOT EXISTS idx_homepage_featured_schools_publish_channels
  ON homepage_featured_schools USING gin (publish_channels);

CREATE INDEX IF NOT EXISTS idx_homepage_news_items_publish_channels
  ON homepage_news_items USING gin (publish_channels);

DROP POLICY IF EXISTS "schools_public_read_active" ON schools;
DROP POLICY IF EXISTS "Anyone can read active schools" ON schools;
CREATE POLICY "schools_public_read_active"
  ON schools FOR SELECT
  USING (is_active = true AND publish_channels @> ARRAY['web']::app_publish_channel[]);

DROP POLICY IF EXISTS "activities_public_read_active" ON activities;
DROP POLICY IF EXISTS "activities_read_public" ON activities;
CREATE POLICY "activities_public_read_active"
  ON activities FOR SELECT
  USING (is_active = true AND publish_channels @> ARRAY['web']::app_publish_channel[]);

DROP POLICY IF EXISTS "lcsd_programmes_public_read_active" ON lcsd_programmes;
DROP POLICY IF EXISTS "lcsd_programmes_anon_select" ON lcsd_programmes;
CREATE POLICY "lcsd_programmes_public_read_active"
  ON lcsd_programmes FOR SELECT
  USING (is_active = true AND publish_channels @> ARRAY['web']::app_publish_channel[]);

DROP POLICY IF EXISTS "media_articles_read_all" ON media_articles;
DROP POLICY IF EXISTS "media_articles_public_read_web" ON media_articles;
CREATE POLICY "media_articles_public_read_web"
  ON media_articles FOR SELECT
  USING (publish_channels @> ARRAY['web']::app_publish_channel[]);

DROP POLICY IF EXISTS "homepage_banners_public_read" ON homepage_banners;
CREATE POLICY "homepage_banners_public_read"
  ON homepage_banners FOR SELECT
  USING (is_visible = true AND publish_channels @> ARRAY['web']::app_publish_channel[]);

DROP POLICY IF EXISTS "homepage_featured_schools_public_read" ON homepage_featured_schools;
CREATE POLICY "homepage_featured_schools_public_read"
  ON homepage_featured_schools FOR SELECT
  USING (is_visible = true AND publish_channels @> ARRAY['web']::app_publish_channel[]);

DROP POLICY IF EXISTS "homepage_news_items_public_read" ON homepage_news_items;
CREATE POLICY "homepage_news_items_public_read"
  ON homepage_news_items FOR SELECT
  USING (is_visible = true AND publish_channels @> ARRAY['web']::app_publish_channel[]);
