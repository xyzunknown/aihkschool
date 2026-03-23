-- ============================================================
-- HKSchoolPlace — Migration 003: Helpful votes table
-- ============================================================

CREATE TABLE intel_helpful_votes (
  id        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  intel_id  uuid NOT NULL REFERENCES admission_intel(id) ON DELETE CASCADE,
  user_id   uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (intel_id, user_id)
);

ALTER TABLE intel_helpful_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone logged in can read helpful votes"
  ON intel_helpful_votes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Logged-in users can insert helpful votes"
  ON intel_helpful_votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own helpful votes"
  ON intel_helpful_votes FOR DELETE
  USING (auth.uid() = user_id);
