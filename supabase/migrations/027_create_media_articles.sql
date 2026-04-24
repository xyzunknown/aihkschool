-- ============================================================
-- Migration 027: Media article layer
-- ============================================================
-- Public education/media articles used as an auxiliary awareness layer.
-- These rows are intentionally separate from school factual master data.
-- ============================================================

CREATE TABLE IF NOT EXISTS media_articles (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source              text NOT NULL CHECK (source IN ('ohpama', 'sundaykiss', 'parentingheadline')),
    external_id         text NOT NULL,
    title               text NOT NULL,
    summary             text,
    published_at        timestamptz,
    category            text,
    url                 text NOT NULL,
    body_excerpt        text,
    content_type        text NOT NULL CHECK (content_type IN (
                            'open_day',
                            'admission',
                            'interview',
                            'policy',
                            'feature',
                            'school_event'
                        )),
    school_match_status text NOT NULL CHECK (school_match_status IN (
                            'matched',
                            'uncertain',
                            'none'
                        )),
    school_matches      jsonb NOT NULL DEFAULT '[]',
    raw_metadata        jsonb NOT NULL DEFAULT '{}',
    fetched_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now(),

    UNIQUE (source, external_id)
);

CREATE INDEX IF NOT EXISTS idx_media_articles_source ON media_articles(source);
CREATE INDEX IF NOT EXISTS idx_media_articles_published ON media_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_articles_content_type ON media_articles(content_type);
CREATE INDEX IF NOT EXISTS idx_media_articles_match_status ON media_articles(school_match_status);
CREATE INDEX IF NOT EXISTS idx_media_articles_school_matches ON media_articles USING GIN (school_matches);

ALTER TABLE media_articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "media_articles_read_all" ON media_articles;
CREATE POLICY "media_articles_read_all"
    ON media_articles FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "media_articles_write_service" ON media_articles;
CREATE POLICY "media_articles_write_service"
    ON media_articles FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

GRANT SELECT ON media_articles TO anon, authenticated;
GRANT ALL ON media_articles TO service_role;

CREATE OR REPLACE FUNCTION set_media_articles_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_media_articles ON media_articles;
CREATE TRIGGER set_updated_at_media_articles
  BEFORE UPDATE ON media_articles
  FOR EACH ROW
  EXECUTE FUNCTION set_media_articles_updated_at();
