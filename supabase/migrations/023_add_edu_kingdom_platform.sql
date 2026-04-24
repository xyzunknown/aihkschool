-- ============================================================
-- Migration 023: Add edu_kingdom platform to social_posts_raw
-- ============================================================

ALTER TABLE social_posts_raw DROP CONSTRAINT IF EXISTS social_posts_raw_platform_check;

ALTER TABLE social_posts_raw ADD CONSTRAINT social_posts_raw_platform_check
  CHECK (platform IN (
    'xhs', 'bkmilk', 'babykingdom', 'edu_kingdom',
    'threads', 'facebook', 'other'
  ));
