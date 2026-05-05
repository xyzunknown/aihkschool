-- ============================================================
-- Migration 031: Deduplicate activities + unique constraint
-- ============================================================
-- 問題：activities 表缺少組合唯一約束，seed 重複執行或爬蟲
-- 重入會產生 (title, organizer, start_date) 完全相同的重複行。
-- 修正：
--   1. 刪除重複行，保留最早建立的記錄
--   2. 新增 UNIQUE 約束防止未來重複
-- ============================================================

-- 刪除重複行：保留 created_at 最早的，刪除其餘
DELETE FROM activities a
USING activities b
WHERE a.created_at > b.created_at
  AND a.title = b.title
  AND a.organizer IS NOT DISTINCT FROM b.organizer
  AND a.start_date IS NOT DISTINCT FROM b.start_date;

-- 新增組合唯一約束
ALTER TABLE activities
  ADD CONSTRAINT uq_activities_title_organizer_date
  UNIQUE NULLS NOT DISTINCT (title, organizer, start_date);
