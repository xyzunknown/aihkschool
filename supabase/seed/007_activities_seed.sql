-- ============================================================
-- Seed 007: Activities
-- ============================================================
-- No bootstrap sample activities are inserted here.
-- Public activity listings must be populated only by traceable crawler/import
-- sources that provide source_url, such as Timable or LCSD.
--
-- Keep this file as a cleanup guard for environments that previously ran the
-- old sample seed.
-- ============================================================

DELETE FROM activities
WHERE source = 'manual';
