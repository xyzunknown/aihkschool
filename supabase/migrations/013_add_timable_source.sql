-- ============================================================
-- Migration 013: Add 'timable' to activities source CHECK
-- ============================================================
-- Timable.com 是香港最大的活動聚合平台，提供公開 GraphQL API
-- 取代已停更的 LCSD JSON open data（2023-11 停更）
-- ============================================================

-- 先刪舊 CHECK，再加新的（PostgreSQL 無法 ALTER CHECK）
ALTER TABLE activities DROP CONSTRAINT IF EXISTS activities_source_check;
ALTER TABLE activities ADD CONSTRAINT activities_source_check
    CHECK (source IN (
        'lcsd', 'ymca', 'polok', 'tungwah',
        'timable', 'eventbrite',
        'manual', 'other'
    ));

-- 修復 012 遺漏的 GRANT：anon 需要 SELECT 權限配合 RLS
GRANT SELECT ON activities TO anon;
GRANT SELECT ON activities TO authenticated;
GRANT ALL ON activities TO service_role;
