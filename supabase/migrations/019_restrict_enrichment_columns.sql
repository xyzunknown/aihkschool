-- ============================================================
-- Migration 019: 列級 GRANT — 限制 anon 讀取敏感欄位
-- ============================================================
-- anon 只能 SELECT 聚合欄位（摘要 + 標籤 + 情緒比）
-- raw_extracted 和 quote_highlights 只授予 authenticated + service_role
-- ============================================================

-- 先撤銷 anon 的表級 SELECT（015 曾授予）
REVOKE SELECT ON school_enrichments FROM anon;

-- anon：只能讀聚合欄位
GRANT SELECT (
    school_id,
    reputation_summary,
    pros_tags,
    cons_tags,
    interview_style,
    sentiment_positive_ratio,
    source_count_by_platform,
    scrape_confidence,
    application_url,
    open_day_date,
    open_day_details,
    admission_hours,
    application_process,
    vacancy_k1,
    vacancy_k2,
    vacancy_k3,
    last_updated_at,
    reputation_last_updated
) ON school_enrichments TO anon;

-- authenticated + service_role：完整讀取（含 raw_extracted / quote_highlights）
GRANT SELECT ON school_enrichments TO authenticated;
-- service_role 已有 ALL，無需重複
