-- ============================================================
-- Migration 016: Create social_posts_raw table
-- ============================================================
-- 從社交平台爬取的原文 raw layer。供 re-extraction 與追溯。
-- 設計原則：
--   1. 只存脫敏後的派生結論（author_hash，不存原始用戶名）
--   2. raw_text 限制引用長度，takedown 時可快速刪
--   3. school_matches 允許一貼文關聯多校 + 置信度
--   4. 內部表，不對 public 開放（僅 service_role 讀寫）
-- ============================================================

CREATE TABLE IF NOT EXISTS social_posts_raw (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    -- 平台與源站標識
    platform        text NOT NULL CHECK (platform IN (
                        'xhs', 'bkmilk', 'babykingdom',
                        'threads', 'facebook', 'other'
                    )),
    external_id     text NOT NULL,              -- 源站貼文 id
    url             text,

    -- 脫敏作者識別（sha256(platform || user_id) 截前 16 字）
    author_hash     text,
    posted_at       timestamptz,

    -- 原文與提取結果
    raw_text        text,                        -- 原文，限長 2000 字
    raw_metadata    jsonb DEFAULT '{}',
    school_matches  jsonb DEFAULT '[]',          -- [{school_id, confidence}]
    sentiment       text CHECK (sentiment IN ('positive', 'neutral', 'negative', 'mixed')),
    topics          jsonb DEFAULT '[]',          -- ["interview", "fees", "teacher"]

    fetched_at      timestamptz NOT NULL DEFAULT now(),

    UNIQUE (platform, external_id)
);

CREATE INDEX IF NOT EXISTS idx_social_posts_platform    ON social_posts_raw(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_fetched     ON social_posts_raw(fetched_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_posted      ON social_posts_raw(posted_at DESC);
-- GIN index for school_matches lookups
CREATE INDEX IF NOT EXISTS idx_social_posts_schools     ON social_posts_raw USING GIN (school_matches);

-- ============================================================
-- RLS：純 service_role 表（anon/authenticated 無權限）
-- ============================================================
ALTER TABLE social_posts_raw ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "social_posts_write_service" ON social_posts_raw;
CREATE POLICY "social_posts_write_service"
    ON social_posts_raw FOR ALL
    WITH CHECK (true);

-- 不授予 anon/authenticated
GRANT ALL ON social_posts_raw TO service_role;
