-- ============================================================
-- Migration 015: Create school_enrichments table
-- ============================================================
-- 由 AI 爬蟲 pipeline 填充的動態字段，與 schools 主表解耦。
-- 兩層數據：
--   1. 官方層：爬學校官網提取的結構化數據（招生時段、空缺等）
--   2. 社群口碑層：爬小紅書/BK Milk/Threads 彙總的家長評價畫像
-- ============================================================

CREATE TABLE IF NOT EXISTS school_enrichments (
    school_id                   uuid PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE,

    -- 官方層（來自學校官網）
    admission_hours             text,
    application_process         text,
    application_url             text,
    open_day_date               date,
    open_day_details            text,
    vacancy_k1                  text,
    vacancy_k2                  text,
    vacancy_k3                  text,
    vacancy_last_checked        date,
    official_website            text,

    -- 社群口碑層（來自社交平台聚合）
    reputation_summary          text,                   -- AI 濃縮段落 50-150 字
    pros_tags                   jsonb DEFAULT '[]',     -- [{tag, count}]
    cons_tags                   jsonb DEFAULT '[]',     -- [{tag, count}]
    interview_style             text,                   -- AI 抽取的面試風格
    quote_highlights            jsonb DEFAULT '[]',     -- [{text, source_platform, posted_at}]
    sentiment_positive_ratio    numeric(4,3),           -- 0.000 ~ 1.000
    source_count_by_platform    jsonb DEFAULT '{}',     -- {xhs: 12, bkmilk: 8, threads: 3}

    -- 元數據
    scrape_confidence           text CHECK (scrape_confidence IN ('high', 'medium', 'low')),
    raw_extracted               jsonb DEFAULT '{}',
    last_crawled_at             timestamptz NOT NULL DEFAULT now(),
    last_updated_at             timestamptz NOT NULL DEFAULT now()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_enrichments_open_day_date    ON school_enrichments(open_day_date) WHERE open_day_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_enrichments_last_crawled     ON school_enrichments(last_crawled_at DESC);
CREATE INDEX IF NOT EXISTS idx_enrichments_confidence       ON school_enrichments(scrape_confidence);

-- updated_at 觸發器（對齊 001 的函數名）
CREATE OR REPLACE FUNCTION update_enrichments_last_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_last_updated_enrichments ON school_enrichments;
CREATE TRIGGER set_last_updated_enrichments
    BEFORE UPDATE ON school_enrichments
    FOR EACH ROW
    EXECUTE FUNCTION update_enrichments_last_updated();

-- ============================================================
-- RLS：公開讀取，service_role 才能寫
-- ============================================================
ALTER TABLE school_enrichments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "enrichments_read_public" ON school_enrichments;
CREATE POLICY "enrichments_read_public"
    ON school_enrichments FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "enrichments_write_service" ON school_enrichments;
CREATE POLICY "enrichments_write_service"
    ON school_enrichments FOR ALL
    WITH CHECK (true);

GRANT SELECT ON school_enrichments TO anon;
GRANT SELECT ON school_enrichments TO authenticated;
GRANT ALL ON school_enrichments TO service_role;
