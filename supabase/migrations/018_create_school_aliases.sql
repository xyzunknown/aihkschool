-- ============================================================
-- Migration 018: Create school_aliases table
-- ============================================================
-- 學校別名對照表，用於爬蟲將非官方名稱匹配到正式學校 ID。
-- 支援精確匹配、暱稱、縮寫、分校名等四種類型。
-- ============================================================

CREATE TABLE IF NOT EXISTS school_aliases (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    alias           text NOT NULL,
    alias_type      text NOT NULL CHECK (alias_type IN ('exact', 'nickname', 'abbreviation', 'branch')),
    confidence      numeric(3,2) NOT NULL DEFAULT 1.0,
    source          text NOT NULL DEFAULT 'manual',  -- 'manual' / 'crawler_learned'
    created_at      timestamptz NOT NULL DEFAULT now(),
    UNIQUE (school_id, alias)
);

CREATE INDEX IF NOT EXISTS idx_school_aliases_alias ON school_aliases(alias);

ALTER TABLE school_aliases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read aliases" ON school_aliases;
CREATE POLICY "public read aliases"
    ON school_aliases FOR SELECT
    USING (true);

GRANT SELECT ON school_aliases TO anon, authenticated;
GRANT ALL ON school_aliases TO service_role;
