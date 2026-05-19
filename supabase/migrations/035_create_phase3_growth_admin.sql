-- ============================================================
-- Migration 035: Phase 3 growth and commercial admin
-- ============================================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  page_path text,
  target_type text,
  target_id text,
  target_label text,
  search_term text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events (event_name, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_target ON analytics_events (target_type, target_id);

CREATE TABLE IF NOT EXISTS recommendation_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_type text NOT NULL CHECK (slot_type IN ('home', 'school_list', 'activity', 'programme')),
  title text NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('school', 'activity', 'programme', 'topic', 'external')),
  target_id text,
  target_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_visible boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 100,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recommendation_slots_type ON recommendation_slots (slot_type, is_visible, sort_order);

CREATE TABLE IF NOT EXISTS school_partnerships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE SET NULL,
  partner_name text NOT NULL,
  contact_name text,
  contact_email text,
  contact_phone text,
  status text NOT NULL DEFAULT 'lead' CHECK (status IN ('lead', 'contacted', 'negotiating', 'active', 'paused', 'ended')),
  starts_at date,
  ends_at date,
  placement text,
  notes text,
  follow_up_log jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_school_partnerships_status ON school_partnerships (status);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  interest_tags text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source text NOT NULL DEFAULT 'footer',
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  unsubscribed_at timestamptz,
  last_opened_at timestamptz,
  last_clicked_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers (status);

CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  audience_filter text,
  subject text NOT NULL,
  body_summary text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'paused')),
  scheduled_at timestamptz,
  sent_at timestamptz,
  open_count int NOT NULL DEFAULT 0,
  click_count int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_status ON newsletter_campaigns (status, scheduled_at);

CREATE TABLE IF NOT EXISTS content_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'guide' CHECK (category IN ('district', 'nursery', 'international', 'admission', 'open_day', 'guide')),
  hero_image_url text,
  body_md text NOT NULL DEFAULT '',
  related_school_ids uuid[] NOT NULL DEFAULT '{}',
  is_visible boolean NOT NULL DEFAULT false,
  is_featured boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_content_topics_visible ON content_topics (is_visible, published_at DESC);

CREATE TABLE IF NOT EXISTS ai_ops_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  suggestion_type text NOT NULL CHECK (suggestion_type IN ('school_update', 'summary', 'open_day', 'application_date', 'homepage_news')),
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  target_type text,
  target_id text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'accepted', 'dismissed', 'done')),
  source_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_ops_suggestions_status ON ai_ops_suggestions (status, created_at DESC);

DROP TRIGGER IF EXISTS set_updated_at_recommendation_slots ON recommendation_slots;
CREATE TRIGGER set_updated_at_recommendation_slots
  BEFORE UPDATE ON recommendation_slots
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_school_partnerships ON school_partnerships;
CREATE TRIGGER set_updated_at_school_partnerships
  BEFORE UPDATE ON school_partnerships
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_newsletter_campaigns ON newsletter_campaigns;
CREATE TRIGGER set_updated_at_newsletter_campaigns
  BEFORE UPDATE ON newsletter_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_content_topics ON content_topics;
CREATE TRIGGER set_updated_at_content_topics
  BEFORE UPDATE ON content_topics
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_ai_ops_suggestions ON ai_ops_suggestions;
CREATE TRIGGER set_updated_at_ai_ops_suggestions
  BEFORE UPDATE ON ai_ops_suggestions
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendation_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_ops_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "analytics_events_service_all" ON analytics_events FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "recommendation_slots_public_read" ON recommendation_slots FOR SELECT USING (is_visible = true);
CREATE POLICY "recommendation_slots_service_all" ON recommendation_slots FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "school_partnerships_service_all" ON school_partnerships FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "newsletter_subscribers_service_all" ON newsletter_subscribers FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "newsletter_campaigns_service_all" ON newsletter_campaigns FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "content_topics_public_read" ON content_topics FOR SELECT USING (is_visible = true);
CREATE POLICY "content_topics_service_all" ON content_topics FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "ai_ops_suggestions_service_all" ON ai_ops_suggestions FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

GRANT SELECT ON recommendation_slots, content_topics TO anon, authenticated;
GRANT ALL ON analytics_events, recommendation_slots, school_partnerships, newsletter_subscribers, newsletter_campaigns, content_topics, ai_ops_suggestions TO service_role;
