-- ============================================================
-- HKSchoolPlace — Migration 002: Row Level Security
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_intel ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- schools: everyone reads active, only service_role writes
-- ============================================================
CREATE POLICY "Anyone can read active schools"
  ON schools FOR SELECT
  USING (is_active = true);

-- ============================================================
-- vacancies: everyone reads, only service_role writes
-- ============================================================
CREATE POLICY "Anyone can read vacancies"
  ON vacancies FOR SELECT
  USING (true);

-- ============================================================
-- users: own row only
-- ============================================================
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- admission_intel: everyone reads approved, logged-in can insert
-- ============================================================
CREATE POLICY "Anyone can read approved intel"
  ON admission_intel FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Logged-in users can submit intel"
  ON admission_intel FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- favorites: own rows only
-- ============================================================
CREATE POLICY "Users can read own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own favorites"
  ON favorites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- reminders: own rows read, service_role writes
-- ============================================================
CREATE POLICY "Users can read own reminders"
  ON reminders FOR SELECT
  USING (auth.uid() = user_id);
