-- ============================================================
-- Migration 020: 爬蟲診斷欄位 — scrape_status / scrape_notes / pages_fetched
-- ============================================================
-- 每次爬取都記錄狀態，方便 debug 和覆蓋率分析。
-- anon 不需讀取這些診斷欄位，保持列級 GRANT 不變。
-- ============================================================

ALTER TABLE school_enrichments
  ADD COLUMN IF NOT EXISTS scrape_status text
    CHECK (scrape_status IN (
      'ok','unchanged','content_insufficient','unreachable',
      'robots_blocked','pdf_only','spa_detected','error','no_website'
    )),
  ADD COLUMN IF NOT EXISTS scrape_notes text,
  ADD COLUMN IF NOT EXISTS pages_fetched int DEFAULT 0;
