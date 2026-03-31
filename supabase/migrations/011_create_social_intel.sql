-- ============================================================
-- Migration 011: Create social intelligence tables
-- ============================================================

-- ============================================================
-- 社交平台信息表（单条提取记录）
-- ============================================================

CREATE TABLE IF NOT EXISTS social_intel (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    school_code     text NOT NULL,

    -- 来源信息
    source_url      text NOT NULL,
    source_date     date,
    source_type     text NOT NULL CHECK (source_type IN ('post', 'comment')),
    engagement_score integer DEFAULT 0,

    -- 匹配信息
    branch_identified boolean DEFAULT false,
    match_confidence  text NOT NULL CHECK (match_confidence IN ('high', 'medium', 'low')),

    -- 内容分类
    content_type    text NOT NULL CHECK (content_type IN ('interview', 'fee', 'timeline', 'general')),
    sentiment       text CHECK (sentiment IN ('positive', 'neutral', 'negative')),

    -- 结构化数据（不同 content_type 有不同字段）
    structured_data jsonb NOT NULL DEFAULT '{}',

    -- 关键词
    positive_keywords text[] DEFAULT '{}',
    negative_keywords text[] DEFAULT '{}',

    -- 竞争度信号
    competition_signals jsonb DEFAULT '{}',

    created_at      timestamptz DEFAULT now()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_social_intel_school_id ON social_intel(school_id);
CREATE INDEX IF NOT EXISTS idx_social_intel_school_code ON social_intel(school_code);
CREATE INDEX IF NOT EXISTS idx_social_intel_content_type ON social_intel(content_type);
CREATE INDEX IF NOT EXISTS idx_social_intel_confidence ON social_intel(match_confidence);

-- RLS：所有人可读 high/medium confidence，只有 service_role 可写
ALTER TABLE social_intel ENABLE ROW LEVEL SECURITY;

CREATE POLICY "social_intel_read_all"
    ON social_intel FOR SELECT
    USING (match_confidence IN ('high', 'medium'));

CREATE POLICY "social_intel_insert_service"
    ON social_intel FOR INSERT
    WITH CHECK (true);  -- service_role only (no anon insert)


-- ============================================================
-- 学校社交平台聚合统计表
-- ============================================================

CREATE TABLE IF NOT EXISTS social_summary (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    school_code     text NOT NULL UNIQUE,

    -- 热度数据
    total_posts     integer DEFAULT 0,
    total_engagement integer DEFAULT 0,
    heat_rank_overall integer,
    heat_rank_district integer,

    -- 面试统计
    interview_posts integer DEFAULT 0,
    top_interview_keywords jsonb DEFAULT '[]',
    interview_format_distribution jsonb DEFAULT '{}',
    avg_interview_duration integer,      -- 分钟
    parent_interview_pct integer,        -- 百分比 0-100
    interview_contributor_count integer DEFAULT 0,

    -- 情感分布
    sentiment_distribution jsonb DEFAULT '{}',
    positive_keywords jsonb DEFAULT '{}',
    negative_keywords jsonb DEFAULT '{}',

    -- 费用估算
    fee_estimates jsonb DEFAULT '{}',

    -- 时间线
    timeline_summary jsonb DEFAULT '{}',

    -- 竞争度
    competition_level text CHECK (competition_level IN ('high', 'medium', 'low')),

    -- 数据范围
    data_year_range text,

    -- 元数据
    last_updated    timestamptz DEFAULT now(),
    created_at      timestamptz DEFAULT now()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_social_summary_school_id ON social_summary(school_id);
CREATE INDEX IF NOT EXISTS idx_social_summary_heat_rank ON social_summary(heat_rank_overall);
CREATE INDEX IF NOT EXISTS idx_social_summary_competition ON social_summary(competition_level);

-- RLS：所有人可读
ALTER TABLE social_summary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "social_summary_read_all"
    ON social_summary FOR SELECT
    USING (true);

CREATE POLICY "social_summary_write_service"
    ON social_summary FOR ALL
    WITH CHECK (true);  -- service_role only
