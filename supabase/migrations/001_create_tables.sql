-- ============================================================
-- HKSchoolPlace — Migration 001: Create all tables
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. schools
-- ============================================================
CREATE TABLE schools (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_code   text UNIQUE,
  name_tc       text NOT NULL,
  name_en       text,
  district      text NOT NULL CHECK (district IN (
    'central_and_western','eastern','southern','wan_chai',
    'kowloon_city','kwun_tong','sham_shui_po','wong_tai_sin','yau_tsim_mong',
    'islands','kwai_tsing','north','sai_kung','sha_tin','tai_po','tsuen_wan','tuen_mun','yuen_long'
  )),
  address_tc    text,
  address_en    text,
  phone         text,
  fax           text,
  email         text,
  website       text,
  logo_url      text,
  school_type   text NOT NULL CHECK (school_type IN ('non_profit','private_independent','international')),
  kep_participant boolean NOT NULL DEFAULT false,
  session_type  text CHECK (session_type IN ('am','pm','whole_day','am_pm','am_whole_day','pm_whole_day','am_pm_whole_day')),
  language_primary   text,
  language_secondary text,
  fee_monthly_hkd numeric(10,2),
  fee_annual_hkd  numeric(10,2),
  grades_offered  text[] NOT NULL DEFAULT '{}',
  data_source   text NOT NULL CHECK (data_source IN ('edb','school','parent','inferred')),
  last_verified_at timestamptz,
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. vacancies
-- ============================================================
CREATE TABLE vacancies (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id     uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  academic_year text NOT NULL,
  n_vacancy     text NOT NULL DEFAULT 'no_information' CHECK (n_vacancy IN ('has_vacancy','no_vacancy','waiting_list','no_information','not_offered','check_school')),
  k1_vacancy    text NOT NULL DEFAULT 'no_information' CHECK (k1_vacancy IN ('has_vacancy','no_vacancy','waiting_list','no_information','not_offered','check_school')),
  k2_vacancy    text NOT NULL DEFAULT 'no_information' CHECK (k2_vacancy IN ('has_vacancy','no_vacancy','waiting_list','no_information','not_offered','check_school')),
  k3_vacancy    text NOT NULL DEFAULT 'no_information' CHECK (k3_vacancy IN ('has_vacancy','no_vacancy','waiting_list','no_information','not_offered','check_school')),
  application_deadline date,
  edb_source_url text,
  edb_published_date date,
  is_current    boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. users (extends Supabase Auth)
-- ============================================================
CREATE TABLE users (
  id                uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email             text NOT NULL,
  display_name      text,
  preferred_districts text[] NOT NULL DEFAULT '{}',
  child_birth_year  integer,
  notification_email text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. admission_intel
-- ============================================================
CREATE TABLE admission_intel (
  id                   uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id            uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id              uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  academic_year        text NOT NULL,
  grade_applied        text NOT NULL,
  interview_type       text NOT NULL CHECK (interview_type IN ('parent_child','child_only','none','unknown')),
  interview_language   text,
  queue_time           text,
  has_second_interview boolean,
  offer_month          text,
  application_result   text NOT NULL CHECK (application_result IN ('accepted','waitlisted','rejected','pending')),
  fee_registration_hkd numeric(10,2),
  fee_interview_hkd    numeric(10,2),
  notes                text CHECK (char_length(notes) <= 500),
  status               text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  helpful_count        integer NOT NULL DEFAULT 0,
  rejection_reason     text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. favorites
-- ============================================================
CREATE TABLE favorites (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id         uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  reminder_enabled  boolean NOT NULL DEFAULT false,
  reminder_days_before integer[] NOT NULL DEFAULT '{}',
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, school_id)
);

-- ============================================================
-- 6. reminders
-- ============================================================
CREATE TABLE reminders (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  favorite_id      uuid NOT NULL REFERENCES favorites(id) ON DELETE CASCADE,
  user_id          uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id        uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  reminder_type    text NOT NULL CHECK (reminder_type IN ('deadline_7d','deadline_3d','deadline_1d')),
  reminder_status  text NOT NULL DEFAULT 'pending' CHECK (reminder_status IN ('pending','sent','failed','cancelled')),
  scheduled_date   date NOT NULL,
  sent_at          timestamptz,
  retry_count      integer NOT NULL DEFAULT 0,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 7. Indexes
-- ============================================================
CREATE INDEX idx_schools_district ON schools(district);
CREATE INDEX idx_schools_type ON schools(school_type);
CREATE INDEX idx_schools_active ON schools(is_active);
CREATE INDEX idx_schools_name_search ON schools USING gin(to_tsvector('simple', name_tc || ' ' || coalesce(name_en, '')));

CREATE INDEX idx_vacancies_school_current ON vacancies(school_id, is_current);
CREATE INDEX idx_intel_school_status ON admission_intel(school_id, status);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_reminders_scheduled ON reminders(scheduled_date, reminder_status);

-- ============================================================
-- 8. Updated_at trigger function
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_schools BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_vacancies BEFORE UPDATE ON vacancies FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_intel BEFORE UPDATE ON admission_intel FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_favorites BEFORE UPDATE ON favorites FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 9. Auto-create user record on auth signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
