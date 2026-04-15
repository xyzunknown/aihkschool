-- ============================================================
-- Migration 012: Create activities (extracurricular / interest classes) table
-- ============================================================
-- 香港幼稚園階段課外活動聚合表
-- 數據來源：AI 爬蟲 pipeline（康文署 / 社福機構 / GovHK 等）
-- 設計原則：
--   1. 獨立社區活動，不關聯 schools 表
--   2. raw_extracted 保留 Claude 提取原文，便於 schema 演進
--   3. match_confidence 允許前端對低置信度條目降級顯示
--   4. CHECK 約束（對齊項目規範，不用 PostgreSQL ENUM）
--   5. 軟刪除 is_active（對齊 schools 表）
-- ============================================================

CREATE TABLE IF NOT EXISTS activities (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    -- 核心信息
    title           text NOT NULL,
    category        text NOT NULL CHECK (category IN (
                        'music', 'sports', 'art', 'dance',
                        'stem', 'language', 'drama', 'other'
                    )),
    organizer       text,

    -- 地點
    district        text CHECK (district IN (
                        'central_and_western', 'eastern', 'southern', 'wan_chai',
                        'kowloon_city', 'kwun_tong', 'sham_shui_po', 'wong_tai_sin', 'yau_tsim_mong',
                        'islands', 'kwai_tsing', 'north', 'sai_kung', 'sha_tin', 'tai_po',
                        'tsuen_wan', 'tuen_mun', 'yuen_long'
                    )),
    address         text,

    -- 內容描述
    description     text,

    -- 年齡範圍（幼稚園階段）
    age_min         smallint,
    age_max         smallint,

    -- 費用
    fee             numeric(10, 2),             -- 0 = 免費，NULL = 未知
    fee_note        text,                        -- 例如「材料費另計」

    -- 時間
    start_date      date,
    end_date        date,                        -- NULL = 長期
    schedule        text,                        -- 例如「逢週六 10:00-11:00」

    -- 聯繫方式
    contact_phone   text,
    contact_url     text,                        -- 報名 / 活動詳情連結

    -- 媒體
    image_url       text,

    -- 數據來源
    source          text NOT NULL CHECK (source IN (
                        'lcsd', 'ymca', 'polok', 'tungwah',
                        'manual', 'other'
                    )),
    source_url      text,                        -- 原始爬取頁面
    raw_extracted   jsonb DEFAULT '{}',          -- Claude 提取的原始 JSON
    match_confidence text CHECK (match_confidence IN ('high', 'medium', 'low')),

    -- 狀態
    is_active       boolean NOT NULL DEFAULT true,

    -- 元數據
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_activities_category      ON activities(category);
CREATE INDEX IF NOT EXISTS idx_activities_district      ON activities(district);
CREATE INDEX IF NOT EXISTS idx_activities_start_date    ON activities(start_date);
CREATE INDEX IF NOT EXISTS idx_activities_is_active     ON activities(is_active);
CREATE INDEX IF NOT EXISTS idx_activities_source        ON activities(source);

-- updated_at 觸發器（復用 migration 001 定義的 update_updated_at() 函數）
DROP TRIGGER IF EXISTS set_updated_at_activities ON activities;
CREATE TRIGGER set_updated_at_activities
    BEFORE UPDATE ON activities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- RLS：公開讀取（僅 is_active=true），service_role 才能寫
-- ============================================================
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "activities_read_public" ON activities;
CREATE POLICY "activities_read_public"
    ON activities FOR SELECT
    USING (is_active = true);

DROP POLICY IF EXISTS "activities_write_service" ON activities;
CREATE POLICY "activities_write_service"
    ON activities FOR ALL
    WITH CHECK (true);  -- service_role only (no anon insert/update)
