-- ============================================================
-- Migration 021: LCSD SmartPLAY 課程模組
-- ============================================================
-- 課程目錄、實時狀態緩存、用戶訂閱、提醒隊列
-- ============================================================

-- ── 課程目錄（cron 維護） ──
CREATE TABLE lcsd_programmes (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lcsd_programme_id text UNIQUE NOT NULL,
  name_zh       text,
  name_en       text,
  category      text CHECK (category IN (
    'swimming', 'music', 'dance', 'art', 'sport', 'parent_child', 'other'
  )),
  age_min       int,
  age_max       int,
  venue         text,
  district      text CHECK (district IN (
    'central_and_western', 'eastern', 'southern', 'wan_chai',
    'kowloon_city', 'kwun_tong', 'sham_shui_po', 'wong_tai_sin', 'yau_tsim_mong',
    'islands', 'kwai_tsing', 'north', 'sai_kung', 'sha_tin',
    'tai_po', 'tsuen_wan', 'tuen_mun', 'yuen_long'
  )),
  fee_hkd       numeric,
  sessions_count int,
  start_date    date,
  end_date      date,
  enrolment_open_at  timestamptz,
  enrolment_close_at timestamptz,
  raw_url       text,
  is_active     boolean DEFAULT true,
  last_scraped_at timestamptz,
  created_at    timestamptz DEFAULT now()
);

CREATE INDEX idx_lcsd_programmes_category ON lcsd_programmes (category);
CREATE INDEX idx_lcsd_programmes_district ON lcsd_programmes (district);
CREATE INDEX idx_lcsd_programmes_age ON lcsd_programmes (age_min, age_max);
CREATE INDEX idx_lcsd_programmes_enrolment ON lcsd_programmes (enrolment_open_at);
CREATE INDEX idx_lcsd_programmes_active ON lcsd_programmes (is_active) WHERE is_active = true;

-- ── 實時位數緩存（C 路徑寫入） ──
CREATE TABLE lcsd_programme_status (
  programme_id     uuid REFERENCES lcsd_programmes(id) ON DELETE CASCADE PRIMARY KEY,
  seats_available  int,
  is_full          boolean DEFAULT false,
  enrolment_status text CHECK (enrolment_status IN (
    'pre_open', 'open', 'closed', 'full'
  )) DEFAULT 'pre_open',
  last_checked_at  timestamptz
);

-- ── 用戶訂閱 ──
CREATE TABLE programme_subscriptions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  programme_id uuid REFERENCES lcsd_programmes(id) ON DELETE CASCADE NOT NULL,
  notify_before_open_minutes int DEFAULT 60,
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now(),
  UNIQUE (user_id, programme_id)
);

CREATE INDEX idx_programme_subs_user ON programme_subscriptions (user_id) WHERE is_active = true;
CREATE INDEX idx_programme_subs_programme ON programme_subscriptions (programme_id) WHERE is_active = true;

-- ── 提醒隊列 ──
CREATE TABLE programme_reminders (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid REFERENCES programme_subscriptions(id) ON DELETE CASCADE NOT NULL,
  reminder_type   text CHECK (reminder_type IN (
    'day_before', 'open_imminent', 'now_open'
  )) NOT NULL,
  scheduled_at    timestamptz NOT NULL,
  status          text CHECK (status IN (
    'pending', 'sent', 'failed'
  )) DEFAULT 'pending',
  retry_count     int DEFAULT 0,
  sent_at         timestamptz,
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX idx_programme_reminders_pending ON programme_reminders (scheduled_at)
  WHERE status = 'pending';

-- ============================================================
-- RLS 策略
-- ============================================================

ALTER TABLE lcsd_programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lcsd_programme_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE programme_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE programme_reminders ENABLE ROW LEVEL SECURITY;

-- lcsd_programmes: 公開讀取（課程 meta 是公開信息）
CREATE POLICY "lcsd_programmes_anon_select"
  ON lcsd_programmes FOR SELECT
  USING (is_active = true);

-- lcsd_programme_status: 公開讀取
CREATE POLICY "lcsd_programme_status_anon_select"
  ON lcsd_programme_status FOR SELECT
  USING (true);

-- programme_subscriptions: 只有本人可讀寫
CREATE POLICY "programme_subs_select_own"
  ON programme_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "programme_subs_insert_own"
  ON programme_subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "programme_subs_update_own"
  ON programme_subscriptions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "programme_subs_delete_own"
  ON programme_subscriptions FOR DELETE
  USING (auth.uid() = user_id);

-- programme_reminders: 只有本人可讀（通過 subscription join）
CREATE POLICY "programme_reminders_select_own"
  ON programme_reminders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM programme_subscriptions ps
      WHERE ps.id = subscription_id AND ps.user_id = auth.uid()
    )
  );

-- service_role 完全訪問（cron 操作需要）
CREATE POLICY "lcsd_programmes_service_all"
  ON lcsd_programmes FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "lcsd_programme_status_service_all"
  ON lcsd_programme_status FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "programme_subs_service_all"
  ON programme_subscriptions FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "programme_reminders_service_all"
  ON programme_reminders FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
