-- ============================================================
-- Migration 024: Grant favorites table access to app roles
-- ============================================================

-- Note:
-- In environments where remote migration history has drifted from the local
-- supabase/migrations folder, this statement can also be run safely in the
-- Supabase SQL Editor as a one-off fix before history is reconciled.

-- RLS policies already scope favorites rows to auth.uid() = user_id, but
-- the table also needs role-level privileges or Postgres rejects the query
-- before RLS is evaluated.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.favorites TO authenticated;
