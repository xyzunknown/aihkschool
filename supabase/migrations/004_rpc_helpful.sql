-- ============================================================
-- HKSchoolPlace — Migration 004: RPC functions for helpful count
-- ============================================================

CREATE OR REPLACE FUNCTION increment_helpful_count(p_intel_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE admission_intel
  SET helpful_count = helpful_count + 1
  WHERE id = p_intel_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_helpful_count(p_intel_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE admission_intel
  SET helpful_count = GREATEST(helpful_count - 1, 0)
  WHERE id = p_intel_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
