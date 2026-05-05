-- ============================================================
-- Migration 032: Remove manual bootstrap activities
-- ============================================================
-- Manual bootstrap rows were only for early UI development. Public activity
-- pages should only show records with a traceable source page from a crawler
-- or trusted import.
-- ============================================================

DELETE FROM activities
WHERE source = 'manual';
