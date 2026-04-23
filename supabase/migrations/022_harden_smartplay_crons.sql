-- ============================================================
-- Migration 022: Harden SmartPLAY cron reliability
-- ============================================================

ALTER TABLE programme_subscriptions
  ALTER COLUMN notify_before_open_minutes SET DEFAULT 1440;

UPDATE programme_subscriptions
SET notify_before_open_minutes = 1440
WHERE notify_before_open_minutes IS NULL OR notify_before_open_minutes = 60;

CREATE UNIQUE INDEX IF NOT EXISTS idx_programme_reminders_unique_schedule
  ON programme_reminders (subscription_id, reminder_type, scheduled_at);

CREATE TABLE IF NOT EXISTS app_feature_flags (
  flag_key text PRIMARY KEY,
  enabled boolean NOT NULL DEFAULT true,
  description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO app_feature_flags (flag_key, enabled, description)
VALUES (
  'smartplay_enabled',
  true,
  'Global SmartPLAY kill switch for sync and reminder crons'
)
ON CONFLICT (flag_key) DO NOTHING;

CREATE TABLE IF NOT EXISTS cron_run_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_name text NOT NULL,
  status text NOT NULL CHECK (status IN ('running', 'success', 'failed', 'skipped')),
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  processed_count int NOT NULL DEFAULT 0,
  sent_count int NOT NULL DEFAULT 0,
  failed_count int NOT NULL DEFAULT 0,
  reminders_created int NOT NULL DEFAULT 0,
  status_updated int NOT NULL DEFAULT 0,
  error_message text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_cron_run_logs_job_started_at
  ON cron_run_logs (job_name, started_at DESC);

ALTER TABLE app_feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE cron_run_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "app_feature_flags_service_all"
  ON app_feature_flags FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "cron_run_logs_service_all"
  ON cron_run_logs FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');