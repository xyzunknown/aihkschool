-- ============================================================
-- Migration 017: Add content_hash + reputation_last_updated
-- ============================================================
-- content_hash：用於判斷爬取內容是否變化（skip 不必要 upsert）
-- reputation_last_updated：追蹤口碑層最後更新日期
-- ============================================================

ALTER TABLE social_posts_raw ADD COLUMN IF NOT EXISTS content_hash text;
ALTER TABLE school_enrichments ADD COLUMN IF NOT EXISTS content_hash text;
ALTER TABLE school_enrichments ADD COLUMN IF NOT EXISTS reputation_last_updated date;

CREATE INDEX IF NOT EXISTS idx_social_posts_raw_content_hash ON social_posts_raw(content_hash);
