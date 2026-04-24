# 個人化教育日曆（Education Calendar）— 開發規劃 v1.0

> 本文件是給開發 Agent 的實施規劃。讀完此文檔應能開始編碼，不需要回讀上下文。
> 關聯項目：HKSchoolPlace（Next.js 14 + Supabase + Vercel）。請遵守 `CLAUDE.md` 中的所有項目規約（繁體中文粵語風格 UI、數據護城河、反爬規約、RLS 強制）。

## Changelog

- **v1.0**（2026-04-21）：初版。N-K3 範圍、"關懷感"文案基調、V0.5 ICS-only → V1 email digest → V2 決策引擎 C 三階段、核心 KPI = 第 4 週 digest 打開率 ≥ 40%

---

## 1. 產品目標與定位

為 HKSchoolPlace 現有 K1-K3 家長用戶提供 **"每週一份、該做什麼我來提醒"的個人化教育日曆**。

- **場景**：家長在升學資訊碎片化環境下需要有一個主動的、集成式的、有決策上下文的日程助理
- **範圍（V1）**：N-K3 幼稚園段（與 HKSchoolPlace V1 scope 一致），P1-P6 視用戶需求 V3+ 擴展
- **文案基調**：**關懷感**（"下週 3 件事 + 建議準備"），不是工具感（"你的日程管家"），不是焦慮感（"不錯過任何日子"）
- **核心差異化**：不只聚合，是 **"學校上下文 × 時間"的決策工具** — 融合 B（智能助理：週推 digest）+ C（決策引擎：衝突檢測、通勤疊加）兩個方向
- **不做**：通用 Google Calendar 替代品；不做 P1+ 小學內部日程（考試、測驗）；不做私教補習班排程工具

### 1.1 定位在 HKSchoolPlace 的角色

D 是 **主動觸達層**，作為 A（面試陪練）/ B（叩門信）/ SmartPLAY 的流量入口：

```
D 日曆（週推 digest / push）
    ├── "週四面試" → 跳 A 面試陪練（該校 persona）
    ├── "週五截止叩門" → 跳 B 叩門信生成
    ├── "週六開放日" → SmartPLAY 相關家庭日課程
    └── "下月疫苗" → 本地衛生署預約連結
```

D 自身也產生留存：每週主動出現在家長收件箱，比被動 retention 強 10 倍。

### 1.2 目標 KPI

- **核心（唯一）**：第 4 週 digest 打開率 ≥ **40%**（行業 newsletter 均值 22%，我們因個人化 + 強動機應高於）
- **次要**：
  - V0.5 ICS 訂閱率（favorites 用戶的 30% 訂閱）
  - V1 發 digest 的 click-through 率 ≥ 15%
  - V1 跳轉到 A/B/SmartPLAY 的跨功能點擊率 ≥ 8%
- **不衡量**：DAU / MAU（D 不靠 app 內停留產生價值）

### 1.3 競品掃描（上線前 30 分鐘必做）

Spec 寫就後、實施前，開發 Agent 必須跑：

- Google 搜：`Hong Kong kindergarten calendar app`、`香港升學日程提醒`
- 小紅書搜：`香港升學日曆`、`K1 報名提醒`
- TG 搜：`HK school reminder bot`

若發現強競品，將競品短板寫入 §1.4 並調整差異化策略。若為空白市場，在 §1.4 注明。

### 1.4 （留空，等實施前競品掃描後填）

---

## 2. 技術選型（已鎖定）

| 層 | 選型 | 備註 |
|---|---|---|
| 前端 | Next.js 14 App Router + Tailwind | 項目既有棧 |
| 數據庫 | Supabase Postgres + RLS | 項目既有棧 |
| Cron | Vercel Cron Jobs | 復用 `src/app/api/cron/reminders/route.ts` 鑑權 pattern |
| Email | Resend | 復用 `src/lib/email/resend.ts` + `src/lib/email/templates/*` |
| Digest LLM | **Claude Sonnet 4.6**（`claude-sonnet-4-6`） | Anthropic SDK |
| 學校日程爬取 | Playwright + LLM 結構化 | 復用 `docs/xiaohongshu_scraping_spec.md` pattern |
| EDB PDF 解析 | Claude Sonnet 4.6（年度 1-2 次，一次性） | 跑腳本不做定時 |
| 天氣/停課 | **HKO Open Data API**（免費） | https://data.weather.gov.hk/ |
| 嵌入（事件去重 + 語義匹配） | OpenAI `text-embedding-3-small` API | 與 B rubric 一致，$0.02 / 1M tokens |
| ICS 生成 | Node 原生字符串拼接（RFC 5545） | 不引入依賴 |
| PWA / Web Push | Next.js PWA + Web Push API | V2+ |
| 推送 TG/WhatsApp（可選 V3） | Twilio / WhatsApp Business API | 暫不接 |

**環境變量新增**：
```
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...  # 若 A 已啟用則復用
HKO_API_BASE=https://data.weather.gov.hk
CALENDAR_ICS_SIGNING_SECRET=...  # 用於生成不可猜測 token
CALENDAR_DIGEST_CRON_SECRET=...  # 復用 CRON_SECRET 或獨立
EDUCATION_CALENDAR_FREE_TIER_CHILDREN=1
EDUCATION_CALENDAR_FREE_TIER_SCHOOLS=3
```

---

## 3. 架構總覽

```
┌─────────────────────────────────────────────────────────────────────┐
│  數據源層（Data Sources）                                            │
│  ├── 學校官網 calendar 頁（爬蟲）                                    │
│  ├── 學校 FB Page / 校訊 PDF（輔助驗證）                             │
│  ├── EDB 官方日程 PDF（年度 curate）                                 │
│  ├── HKO Open Data API（即時天氣 + 停課預警）                        │
│  └── 用戶 input（children birthday, favorites, 自添事件）            │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  數據整合層（Event Aggregation Pipeline）                            │
│  ├── scripts/crawl_school_calendars.py（週 cron）                    │
│  ├── scripts/parse_edb_calendar.py（年度手動觸發）                   │
│  ├── src/app/api/cron/sync-weather-alerts/route.ts（每小時）         │
│  ├── LLM 去重 + 結構化（Claude 4.6）                                 │
│  └── 雙源驗證 → confirmed / pending 標記                             │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  個性化引擎（Personalization Engine）                                │
│  ├── L3 聚合：user × favorites → 該用戶關心的 events                 │
│  ├── L4 推算：child.birthday → milestone events                      │
│  ├── L5 注入：weather / holiday / 公共假期                          │
│  ├── 衝突檢測（V2）                                                  │
│  ├── 通勤疊加（V2）                                                  │
│  └── Claude 生成 weekly digest 文案（週日 18:00 cron）               │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  觸點（Touchpoints）                                                 │
│  ├── ICS Feed（V0.5）   /api/calendar/feed/[token]                   │
│  ├── Email Digest（V1） Resend 週日 20:00 發送                       │
│  ├── In-app Calendar View（V1） /calendar 月/週/時間線 三視圖        │
│  └── Web Push（V2+）    高危事件即時推（台風 + 次日面試等）          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. 數據層級（L1-L6，按自動化程度分層）

核心設計哲學：**先做 100% 自動化的 L3+L4+L5（佔 90% 價值），L2 並行爬，L1 年度 curate，L6 放最後**。

| 層 | 內容 | 數據源 | 自動化程度 | V0.5 啟動優先級 |
|---|---|---|---|---|
| **L1** 官方硬日程 | EDB 派位日程、K1 統一申請期、JUPAS、DSE | EDB 官網 PDF / GovHK 開放數據 | 年度手動 + Claude 解析 | 中（每年 1-2 次跑） |
| **L2** 學校事件 | 面試日、開放日、簡介會、考試日、家長日 | 學校官網 / FB / 校訊 | 爬蟲 + LLM 結構化 | 高（V0.5 先人工 5 校 + 爬蟲後台並行） |
| **L3** 用戶收藏觸發 | 收藏學校的 L2 事件 + 截止日、報名窗口 | 已有 `favorites` 表聯動 | 100% 自動 | **最高** |
| **L4** 孩子年齡觸發 | 按 birthday 推算的 N→K1→P1 報名窗口、疫苗接種月份、發展里程碑 | `children.birthday` + 固定規則表 | 100% 自動 | **最高** |
| **L5** 外部干擾 | 台風停課、黑雨停課、公共假期 | HKO API + 政府假期 JSON | 100% 自動 | 高 |
| **L6** 用戶自添 + Google Calendar 雙向同步 | 補習班、興趣班、生日會 | 用戶 input + Google Cal OAuth | 用戶手動 | 低（V3+） |

### 4.1 冷啟動設計（關鍵！）

新用戶註冊後第一眼看到什麼？**絕不能是空日曆**。Day 1 必須有內容：

1. **自動從 `children.birthday` 推 L4 里程碑**（即使沒有收藏學校）：
   - "你孩子 2 歲 8 個月，N 班報名黃金窗口還剩 7 個月（2026-11 → 2027-01）"
   - "距離 K1 統一派位報名還有 14 個月"
   - "3 歲半建議做發展評估"
2. **從 `favorites` 表拉收藏學校的 L2 事件**（即使只有 1 間，只有 1 條事件也要顯示）
3. **注入 L5 當週天氣/節假日**
4. **配一句 AI 文案**："歡迎！本週你需要關注的 1 件事是 ⋯⋯"（哪怕空窗也要有話術）

### 4.2 L4 Birthday 推算規則表

固定規則，不 AI 生成（穩定、可審計）。存 `calendar_milestone_rules.json`：

```json
[
  { "type": "n_class_application_window_opens", "offset_months_from_birth": 24, "title": "N 班報名黃金窗口開始", "priority": "high" },
  { "type": "k1_registration_prep", "offset_months_from_birth": 33, "title": "K1 統一申請期將至（2 個月後）", "priority": "high" },
  { "type": "k1_registration_deadline", "offset_months_from_birth": 36, "title": "K1 統一申請截止", "priority": "critical" },
  { "type": "p1_poa_central_allocation", "offset_months_from_birth": 67, "title": "P1 自行分配學位結果公佈", "priority": "critical" },
  { "type": "dev_assessment_18m", "offset_months_from_birth": 18, "title": "衛生署 18 個月發展評估", "priority": "medium" },
  { "type": "dev_assessment_36m", "offset_months_from_birth": 36, "title": "衛生署 3 歲發展評估", "priority": "medium" },
  { "type": "vaccination_mmr_12m", "offset_months_from_birth": 12, "title": "麻疹疫苗 MMR 接種", "priority": "medium" },
  { "type": "vaccination_dtap_18m", "offset_months_from_birth": 18, "title": "白喉百日咳疫苗加強劑", "priority": "medium" }
]
```

規則表每年 review 一次（HK 政策可能變）。

---

## 5. 數據庫 Schema

> 全部啟用 RLS。`children` 表若已存在則擴展；`favorites` 表沿用。新增 6 張表。

```sql
-- ==========================================
-- 5.1 孩子檔案（擴展既有表，如果已存在）
-- ==========================================
alter table if exists children
  add column if not exists birthday date,
  add column if not exists gender text check (gender in ('M', 'F', 'other', 'prefer_not_to_say'));

-- 如果 children 表不存在（從 A spec 還沒建），走下面 create：
create table if not exists children (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  birthday date not null,
  gender text check (gender in ('M', 'F', 'other', 'prefer_not_to_say')),
  current_school text,
  current_class text,  -- 'N' | 'K1' | 'K2' | 'K3'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_children_user on children(user_id);

-- ==========================================
-- 5.2 事件主表（L1-L6 統一存這裡）
-- ==========================================
create table calendar_events (
  id uuid primary key default gen_random_uuid(),

  -- 來源分類
  layer text not null check (layer in ('L1_official', 'L2_school', 'L3_favorite', 'L4_age', 'L5_external', 'L6_user')),
  source text not null,  -- 'edb_pdf_2026' | 'school_website_scrape' | 'hko_api' | 'milestone_rule' | 'user_manual'
  source_url text,

  -- 關聯
  school_id uuid references schools(id) on delete cascade,
  child_id uuid references children(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,  -- L6 / L4 個人化事件

  -- 事件內容
  event_type text not null,  -- 'interview' | 'open_day' | 'briefing' | 'deadline' | 'exam' | 'holiday' | 'weather_alert' | 'milestone' | 'vaccination' | 'custom'
  title_tc text not null,
  title_en text,
  description_tc text,
  description_en text,

  -- 時間
  starts_at timestamptz not null,
  ends_at timestamptz,
  is_all_day boolean default false,
  timezone text default 'Asia/Hong_Kong',

  -- 位置
  location_name_tc text,
  location_address_tc text,
  location_lat numeric(9,6),
  location_lng numeric(9,6),

  -- 驗證狀態（核心！見 §7）
  verification_status text default 'pending' check (verification_status in ('confirmed', 'pending', 'rejected')),
  verification_sources jsonb default '[]'::jsonb,  -- [{url, scraped_at, extracted_value}, ...]
  confidence_score numeric(3,2),  -- 0.00-1.00

  -- 優先級（決定 digest / push 是否挑中）
  priority text default 'medium' check (priority in ('critical', 'high', 'medium', 'low')),

  -- Action link（跳 A/B/SmartPLAY）
  action_type text,  -- 'open_interview_coach' | 'open_letter_writer' | 'open_school_detail' | 'external'
  action_payload jsonb,

  -- 元數據
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_events_starts_active on calendar_events(starts_at) where is_active = true;
create index idx_events_school on calendar_events(school_id) where school_id is not null;
create index idx_events_user on calendar_events(user_id) where user_id is not null;
create index idx_events_layer_status on calendar_events(layer, verification_status);

-- ==========================================
-- 5.3 用戶訂閱偏好
-- ==========================================
create table user_calendar_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  -- ICS token（§11 安全：不可猜測）
  ics_token text unique not null,  -- 32-char random, not derived from user_id
  ics_revoked_at timestamptz,

  -- Email digest 配置
  digest_enabled boolean default true,
  digest_day_of_week int default 0 check (digest_day_of_week between 0 and 6),  -- 0 = Sun
  digest_hour_hkt int default 20 check (digest_hour_hkt between 6 and 23),
  digest_language text default 'zh-HK' check (digest_language in ('zh-HK', 'zh-CN', 'en')),

  -- 通知偏好
  push_enabled boolean default false,
  push_endpoint text,  -- Web Push endpoint (V2+)
  push_keys jsonb,

  -- 過濾：只訂閱哪些 layer
  enabled_layers text[] default array['L3_favorite', 'L4_age', 'L5_external'],

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_subs_user on user_calendar_subscriptions(user_id);
create unique index uq_subs_token on user_calendar_subscriptions(ics_token) where ics_revoked_at is null;

-- ==========================================
-- 5.4 Digest 發送歷史（用於 KPI 追蹤）
-- ==========================================
create table calendar_digest_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  -- 內容
  digest_date date not null,  -- 該 digest 所涵蓋的週一
  events_included_ids uuid[],  -- 該次 digest 包含了哪些 event
  subject text,
  body_html text,
  llm_model text,
  llm_cost_usd numeric(8,5),

  -- 狀態
  status text default 'pending' check (status in ('pending', 'sent', 'opened', 'clicked', 'bounced', 'failed')),
  sent_at timestamptz,
  opened_at timestamptz,  -- 用 Resend webhook 回填
  clicked_at timestamptz,
  clicked_event_ids uuid[],  -- 哪些 event 的 CTA 被點

  error_message text,
  created_at timestamptz default now()
);

create index idx_digest_user_date on calendar_digest_history(user_id, digest_date desc);
create index idx_digest_kpi on calendar_digest_history(status, sent_at) where sent_at is not null;

-- ==========================================
-- 5.5 事件驗證來源（用於雙源驗證審計）
-- ==========================================
create table calendar_event_verification_logs (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references calendar_events(id) on delete cascade,

  source_type text not null,  -- 'school_website' | 'school_fb' | 'school_newsletter' | 'edb' | 'user_report'
  source_url text,
  scraped_at timestamptz default now(),

  extracted_raw text,  -- 原文片段
  extracted_value jsonb,  -- {date, event_type, location, ...}
  llm_confidence numeric(3,2),

  is_primary boolean default false,  -- true = 該 event 的主源；其他是驗證源

  created_at timestamptz default now()
);

create index idx_verify_event on calendar_event_verification_logs(event_id);

-- ==========================================
-- 5.6 用戶手動添加事件（V3，留 schema 不實現）
-- ==========================================
create table user_custom_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  child_id uuid references children(id),

  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  notes text,

  external_sync_id text,  -- Google Cal event id（V3 雙向同步）
  external_sync_source text,  -- 'google' | 'apple' | null

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==========================================
-- RLS 策略
-- ==========================================
alter table calendar_events enable row level security;
alter table user_calendar_subscriptions enable row level security;
alter table calendar_digest_history enable row level security;
alter table calendar_event_verification_logs enable row level security;
alter table user_custom_events enable row level security;

-- L1/L2/L5 系統級 event（user_id is null）任何人可讀
-- L3/L4/L6 個人事件只有 owner 可讀
create policy events_public_read on calendar_events
  for select using (
    (user_id is null and verification_status = 'confirmed')
    or user_id = auth.uid()
  );

-- 寫入全部由 service_role 完成（cron / 爬蟲 / API route 內部）
-- L6 自添事件允許用戶 insert 自己的
create policy events_user_insert_own on calendar_events
  for insert with check (user_id = auth.uid() and layer = 'L6_user');
create policy events_user_update_own on calendar_events
  for update using (user_id = auth.uid() and layer = 'L6_user');
create policy events_user_delete_own on calendar_events
  for delete using (user_id = auth.uid() and layer = 'L6_user');

create policy subs_owner on user_calendar_subscriptions for all using (auth.uid() = user_id);
create policy digest_owner on calendar_digest_history for select using (auth.uid() = user_id);
create policy custom_events_owner on user_custom_events for all using (auth.uid() = user_id);

-- verification_logs 僅 service_role，anon/authenticated 都不可見（護城河）
-- 不 create policy = 默認拒絕
```

---

## 6. 數據源與爬取管道

### 6.1 L1 EDB 官方日程（年度手動）

EDB 每年 9 月 / 11 月更新 N→K1→P1 年度日程 PDF。流程：

```
scripts/parse_edb_calendar.py
├── 手工下載 EDB 最新年度 PDF（每年 1-2 次）
├── 餵給 Claude Sonnet 4.6：
│   prompt: "下列是香港 EDB 幼稚園 K1 統一申請年度日程 PDF 全文，請抽取所有日期 +
│            事件類型 + 影響對象，輸出 JSON array。schema: {date, event_type,
│            title_tc, title_en, description_tc, applies_to: ['N'|'K1'|'K2'|'K3']}"
├── 人工 review 10 分鐘（5-10 個日期）
└── upsert into calendar_events (layer='L1_official', source='edb_pdf_2026')
```

成本：Claude ~$0.50/次，一年跑 2 次。

### 6.2 L2 學校事件爬取（週 cron）

**兩階段啟動**：
- **V0.5**：先人工 curate 5 間首批名校（與 A spec 同名單：DBS / 喇沙 / 瑪利曼 / SPCC / 民生）的年度事件，直接寫 SQL migration 種入表。2 小時搞定
- **V1**：啟動爬蟲 pipeline，目標擴到 200-300 間自有公開 calendar 的學校

爬蟲遵守 `docs/xiaohongshu_scraping_spec.md` 同款 pattern：

```python
# scripts/crawl_school_calendars.py
# 每週日凌晨 02:00 跑（Vercel Cron 不適合長任務，放獨立 VPS 或 Railway）

for school in schools_with_website:
    if should_skip(school):  # 上週爬過且無 update hint
        continue

    html = playwright_fetch(school.website_calendar_url, ua_rotation=True)
    events_raw = claude_extract(
        prompt=f"""
        從下列 HTML 中提取該校所有公開事件（面試、開放日、簡介會、家長日、考試等）。
        學校名：{school.name_tc}
        當前日期：{today}
        只返回未來 180 天內的事件。

        輸出 JSON array，schema:
        {{
          "event_type": "interview|open_day|briefing|exam|parent_day|deadline|other",
          "title_tc": "...",
          "starts_at": "ISO 8601",
          "ends_at": "ISO 8601|null",
          "location_name": "...",
          "description": "...",
          "source_snippet": "原文片段（用於驗證）"
        }}
        """,
        html=html
    )

    for event in events_raw:
        # 6.4 雙源驗證（見下）
        verified = dual_source_verify(school, event)
        upsert_event(school, event, verified)

    sleep_random(1.5, 3.0)  # 抗封
```

爬蟲遵守 `CLAUDE.md` 反爬規約 — 我們是訪客，不是 GPTBot。User-Agent 用真實瀏覽器字串，不偽造來源。

### 6.3 L5 天氣 / 停課（每小時 cron）

```typescript
// src/app/api/cron/sync-weather-alerts/route.ts
// Vercel cron schedule: '0 * * * *'（每小時）

import { createServiceClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Forbidden', { status: 403 });
  }

  // HKO Open Data API — 天氣警告
  const warnings = await fetch(`${process.env.HKO_API_BASE}/weatherAPI/opendata/weather.php?dataType=warnsum&lang=tc`)
    .then(r => r.json());

  // 關注：TC8+（八號風球）、WRAINR（紅雨）、WRAINB（黑雨）
  const closureWarnings = Object.values(warnings)
    .filter((w: any) => ['TC8', 'TC9', 'TC10', 'WRAINR', 'WRAINB'].includes(w.code));

  const supabase = createServiceClient();

  for (const w of closureWarnings) {
    await supabase.from('calendar_events').upsert({
      layer: 'L5_external',
      source: 'hko_api',
      source_url: 'https://data.weather.gov.hk/',
      event_type: 'weather_alert',
      title_tc: `${w.name} 警告生效 — 學校或停課`,
      starts_at: w.updateTime,
      ends_at: null,
      is_all_day: false,
      verification_status: 'confirmed',  // 來源權威
      confidence_score: 1.0,
      priority: 'critical',
      action_type: 'external',
      action_payload: { url: 'https://www.edb.gov.hk/tc/about-edb/press/notices/' },
    }, { onConflict: 'source,starts_at,event_type' });
  }

  return Response.json({ success: true, alerts_synced: closureWarnings.length });
}
```

### 6.4 事件去重

新爬到的 event 和現有 event 用以下規則去重：

1. 相同 `school_id + event_type + starts_at(同一天)` → 合併，保留 verification_sources 並集
2. 標題相似度（OpenAI embedding cosine > 0.9）+ 日期差 ≤ 1 天 → 合併
3. 其他 → 插入新 event

---

## 7. 雙源驗證機制（硬要求）

> **這是護城河**。錯一個日期家長信任瞬間歸零。V1 上線前必須實現。

### 7.1 規則

關鍵事件（`event_type in ('interview', 'deadline', 'open_day')`）必須：

- 至少 **2 個獨立來源** 命中（官網 + FB / 官網 + 校訊 / 官網 + EDB PDF）
- 日期一致（容差 ±1 天 within same source cluster）
- 才標 `verification_status = 'confirmed'`

否則標 `verification_status = 'pending'`，UI 顯示 "待校方確認"，且**不進 digest**。

### 7.2 實現

```typescript
// src/lib/calendar/dual-source-verify.ts
export async function dualSourceVerify(
  schoolId: string,
  candidateEvent: ExtractedEvent
): Promise<{ status: 'confirmed' | 'pending', confidence: number }> {

  // 拉該校已有的其他來源（FB / newsletter）
  const otherSources = await fetchOtherSourcesFor(schoolId, candidateEvent.event_type);

  let matchCount = 1;  // 主源已算 1
  const matchedSources = [candidateEvent.source_url];

  for (const other of otherSources) {
    if (sameEvent(candidateEvent, other, { dateTolerance: 1 })) {
      matchCount++;
      matchedSources.push(other.source_url);
    }
  }

  if (matchCount >= 2) {
    return { status: 'confirmed', confidence: 0.90 + 0.05 * (matchCount - 2) };
  }

  // 若只有 1 源但來源本身高權威（官網），降級 pending 但可顯示
  if (isHighAuthoritySource(candidateEvent.source_url)) {
    return { status: 'pending', confidence: 0.75 };
  }

  return { status: 'pending', confidence: 0.50 };
}
```

### 7.3 UI 約定

- `confirmed` 事件：正常顯示（黑色字）
- `pending` 事件：淺灰字 + "待校方確認" tag + 只在 in-app view 顯示，**不進 digest email**
- `rejected` 事件：不顯示，保留審計

### 7.4 用戶報錯迴路

In-app 每個事件右側小按鈕 "日期不對？" → POST `/api/calendar/events/[id]/report` → 自動 demote 到 `pending`，等下週爬蟲再驗。

---

## 8. 個性化引擎（Digest 生成）

### 8.1 Cron 觸發

```
Schedule: 每週日 18:00 HKT（cron: '0 18 * * 0' in HKT = '0 10 * * 0' UTC）
Path: src/app/api/cron/weekly-digest/route.ts
```

### 8.2 流程

```typescript
// src/app/api/cron/weekly-digest/route.ts
import { createServiceClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/resend';
import { buildDigestPrompt } from '@/lib/calendar/digest-prompt';
import Anthropic from '@anthropic-ai/sdk';

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Forbidden', { status: 403 });
  }

  const supabase = createServiceClient();
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // 1. 取所有 digest_enabled 的用戶
  const { data: subs } = await supabase
    .from('user_calendar_subscriptions')
    .select('*, users(email, display_name)')
    .eq('digest_enabled', true)
    .eq('digest_day_of_week', 0);

  let sent = 0, failed = 0;

  for (const sub of subs ?? []) {
    try {
      // 2. 聚合未來 7 天相關 events（L3 + L4 + L5，僅 confirmed）
      const events = await fetchUserEventsForWeek(sub.user_id, sub.enabled_layers);

      if (events.length === 0) {
        // 冷啟動 fallback：用 L4 milestone 填空
        events.push(await fetchColdStartMilestones(sub.user_id));
      }

      // 3. 構建 prompt
      const [children, favorites] = await Promise.all([
        supabase.from('children').select('*').eq('user_id', sub.user_id),
        supabase.from('favorites').select('*, schools(*)').eq('user_id', sub.user_id),
      ]);

      const prompt = buildDigestPrompt({
        children: children.data,
        favorites: favorites.data,
        events,
        language: sub.digest_language,
      });

      // 4. Claude 生成文案
      const resp = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      });

      const { subject, body_html } = parseClaudeOutput(resp.content[0].text);

      // 5. 發送
      await sendEmail({ to: sub.users.email, subject, html: body_html });

      // 6. 寫歷史
      await supabase.from('calendar_digest_history').insert({
        user_id: sub.user_id,
        digest_date: thisMonday(),
        events_included_ids: events.map(e => e.id),
        subject,
        body_html,
        llm_model: 'claude-sonnet-4-6',
        status: 'sent',
        sent_at: new Date().toISOString(),
      });

      sent++;
    } catch (err) {
      failed++;
      console.error(`digest failed for ${sub.user_id}`, err);
    }
  }

  return Response.json({ success: true, sent, failed });
}
```

### 8.3 buildDigestPrompt 函數

```typescript
// src/lib/calendar/digest-prompt.ts
export function buildDigestPrompt({ children, favorites, events, language }): string {
  const primaryChild = children[0];  // MVP 只處理第一個孩子，V1+ 多孩子
  const ageMonths = monthsBetween(new Date(primaryChild.birthday), new Date());

  return `
你是 HK 家長的專屬升學助理。語氣：**關懷、具體、可行動，絕不製造焦慮**。
輸出繁體中文（粵語書面語風格，避免"您"用"你"）。

# 家長上下文
- 孩子：${primaryChild.name}，${Math.floor(ageMonths/12)} 歲 ${ageMonths%12} 個月，${primaryChild.current_class || '未入學'}
- 收藏學校：${favorites.map(f => f.schools.name_tc).join('、') || '（還沒收藏）'}

# 本週（${thisMonday().toISOString().slice(0,10)} 至 ${nextSunday().toISOString().slice(0,10)}）需要關注的事件
${events.map((e, i) => `
${i+1}. [${e.priority}] ${e.title_tc}
   - 時間：${formatDateCN(e.starts_at)} ${e.is_all_day ? '全日' : formatTime(e.starts_at)}
   - 位置：${e.location_name_tc || '—'}
   - 來源：${e.source}
   - 相關學校：${e.school_id ? lookupSchoolName(e.school_id) : '—'}
   - 可用動作：${e.action_type || '—'}
`).join('\n')}

# 輸出格式（嚴格 JSON）
{
  "subject": "郵件標題（不超過 30 字，帶具體內容，不要標題黨）",
  "body_html": "<完整 HTML email body>"
}

# body_html 要求
- 開頭 1-2 句：**溫暖問候 + 本週主旨**（例："今週你最重要嘅 3 件事係 ⋯⋯"）
- 然後每個事件一個 block，包含：
  - 事件名 + 日期 + 距今天數
  - **1 句"為什麼這件事對你重要"**（個人化，結合孩子年齡 / 收藏 / 進度）
  - **1 個明確 CTA 按鈕**（跳對應 action，如 "開始面試練習" / "撰寫叩門信" / "查看學校詳情"）
  - 若有衝突 / 天氣風險：用溫和措辭提示
- 結尾：**1 句展望**（例："下週之後，你嘅 N 班報名窗口會⋯⋯"）
- 禁用：驚嘆號連用、"不能錯過"、"最後機會"、"立刻行動"等焦慮語

# 規則（必守）
- 若事件 ≤ 1 個 → 主打一件事深入講，加 L4 里程碑展望
- 若事件 ≥ 5 個 → 只挑 top 3（按 priority），其餘歸納一句
- 絕不編造事件（只用上面給的）
- 絕不用簡體字
- 絕不問封面問題 / 開放式問題
`.trim();
}
```

### 8.4 Digest 樣板（HTML email）

走 `src/lib/email/templates/` 新增 `calendar_digest.ts`，用 Resend 既有 pattern。樣式復用項目 design system（slate palette、rounded-2xl、狀態色）。

### 8.5 打開率追蹤

Resend webhook → `/api/webhooks/resend` → update `calendar_digest_history.status / opened_at / clicked_at`。

---

## 9. 觸點產品（3 個，各自有獨立 acceptance）

### 9.1 ICS Feed（V0.5，1-2 週內上線）

**唯一 V0.5 交付物**。極簡，零 UI 零通知。

**路由**：`GET /api/calendar/feed/[token]`

**返回**：`Content-Type: text/calendar; charset=utf-8`，RFC 5545 格式

```typescript
// src/app/api/calendar/feed/[token]/route.ts
import { createServiceClient } from '@/lib/supabase/server';
import { generateIcsFeed } from '@/lib/calendar/ics-feed';

export async function GET(req: Request, { params }: { params: { token: string }}) {
  const supabase = createServiceClient();

  const { data: sub } = await supabase
    .from('user_calendar_subscriptions')
    .select('*')
    .eq('ics_token', params.token)
    .is('ics_revoked_at', null)
    .single();

  if (!sub) return new Response('Not found', { status: 404 });

  const events = await fetchUserEventsForRange(sub.user_id, sub.enabled_layers, {
    from: new Date(Date.now() - 30 * 86400_000),  // 過去 30 天
    to: new Date(Date.now() + 365 * 86400_000),   // 未來 1 年
    onlyConfirmed: true,
  });

  const ics = generateIcsFeed(events, {
    calendarName: 'HKSchoolPlace 升學日曆',
    timezone: 'Asia/Hong_Kong',
  });

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Cache-Control': 'private, max-age=300',  // 5 min
    },
  });
}
```

**ICS generator**（RFC 5545）：

```typescript
// src/lib/calendar/ics-feed.ts
export function generateIcsFeed(events: CalendarEvent[], opts: IcsOpts): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HKSchoolPlace//Education Calendar//EN',
    `X-WR-CALNAME:${opts.calendarName}`,
    `X-WR-TIMEZONE:${opts.timezone}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const e of events) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.id}@hkschoolplace.app`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART${e.is_all_day ? ';VALUE=DATE' : ''}:${toIcsDate(e.starts_at, e.is_all_day)}`,
      e.ends_at ? `DTEND${e.is_all_day ? ';VALUE=DATE' : ''}:${toIcsDate(e.ends_at, e.is_all_day)}` : '',
      `SUMMARY:${escapeIcs(e.title_tc)}`,
      e.description_tc ? `DESCRIPTION:${escapeIcs(e.description_tc)}` : '',
      e.location_name_tc ? `LOCATION:${escapeIcs(e.location_name_tc)}` : '',
      e.source_url ? `URL:${e.source_url}` : '',
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  return lines.filter(Boolean).join('\r\n');  // RFC 要求 CRLF
}

function toIcsDate(d: Date | string, dateOnly = false): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  if (dateOnly) {
    return date.toISOString().slice(0, 10).replace(/-/g, '');
  }
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeIcs(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}
```

**V0.5 acceptance**：
- [ ] 用戶進 `/account` 能一鍵生成 ICS URL
- [ ] URL 含 32-char 不可猜測 token（crypto.randomBytes(16).toString('hex')）
- [ ] Apple Calendar / Google Calendar / Outlook 三端訂閱成功並顯示中文標題
- [ ] Token 支持 revoke（`POST /api/calendar/subscriptions/revoke`）→ 舊 URL 返回 404
- [ ] 事件含冷啟動內容（即使新用戶也有 birthday milestone）

### 9.2 Email Digest（V1，+4 週）

見 §8。**V1 acceptance**：
- [ ] 週日 20:00 HKT 準時發送
- [ ] 主題行不超過 30 字且帶具體事件
- [ ] body 含 1-5 個事件 block，每個有 CTA
- [ ] Resend webhook 回填 opened_at / clicked_at
- [ ] Dashboard 顯示當週打開率 / 點擊率
- [ ] 無事件情況下有溫和的 cold start fallback（不發空郵件或直接 skip）

### 9.3 In-app Calendar View（V1）

**路由**：`/calendar`

**3 個視圖**：
- **月視圖**：標準 grid，事件用小圓點 + 截斷標題
- **週視圖**：7 天時間軸，時段顯示
- **時間線視圖**（差異化）：垂直時間軸，結合家長 context（"距離 K1 報名還有 14 個月，以下是你需要做的"），穿插 L4 milestone + L3 事件 + L1 硬日程

**V1 acceptance**：
- [ ] Mobile（iPhone Safari）能用（mobile-first）
- [ ] 月/週/時間線三視圖切換順暢
- [ ] 事件點擊展開詳情 + 所有 CTA（跳 A/B/SmartPLAY）
- [ ] `pending` 事件以 "待校方確認" 標識，不混淆用戶

### 9.4 Web Push（V2+）

PWA + Web Push API。**只推高危場景**（避免打擾）：
- 台風 8 號 + 次日有已訂閱的面試 → 推 "明早面試可能改期，請留意"
- deadline 前 12 小時未完成某事 → 推 "XX 截止還剩 12 小時"

**V2 acceptance**：
- [ ] PWA 可安裝到 iOS home screen
- [ ] 推送需用戶明示 opt-in
- [ ] 每用戶每日最多 1 條 push（反濫用）

---

## 10. 配額與計費

| Tier | 價格 | 權益 |
|---|---|---|
| **Free** | ¥0 | 1 個孩子、≤3 間收藏學校事件、L3+L4+L5 基礎層、ICS feed、每週 1 封 digest |
| **Standard** | HK$68/月 | 多孩子（≤3）、無限學校、L2 全量、高級 digest（衝突檢測 + 天氣 overlay）、CTA 跳 A/B |
| **Pro** | HK$128/月 | Standard + 夫妻共享日曆、每日 digest（vs 每週）、交通整合（"面試那天預測暴雨，提前 30 min 出門"）、Web Push |

**Stripe 集成與 A 共用 `plan` 欄位**（如 A 未來重啟，用戶 Standard 同時覆蓋 D）。

---

## 11. 安全與隱私

> 孩子 birthday 是高敏感 PII，必須鎖死。

### 11.1 必做

- **RLS 全表啟用**（見 §5）
- `children` / `calendar_events`（user_id != null 的行）/ `user_custom_events` 只能 owner 讀寫
- `calendar_digest_history` 只能 owner 讀
- `calendar_event_verification_logs` 只有 service_role（配合 `CLAUDE.md` 數據護城河）
- 所有含孩子數據的頁面加 `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />`
- `robots.txt` 明確 `Disallow: /calendar` + `Disallow: /api/calendar/feed/`
- ICS token **32-char crypto.randomBytes**，不從 user_id 推導，不在 URL 中暗示身份
- Token 可 revoke + regenerate
- ICS feed route 不設公共緩存（`Cache-Control: private`）
- Resend webhook 驗簽（防偽造點擊事件）
- 不把孩子 birthday 完整日期放進 Claude prompt（只算出年齡月齡，Claude 只需要年齡），最小化外傳

### 11.2 絕不做

- ❌ 不提供 "導出全部孩子事件為 CSV" 功能（防對手整抓）
- ❌ 不在公開 sitemap 放 `/calendar/*` 任何路徑
- ❌ 不允許匿名訂閱 ICS（必須 authenticated 才生成 token）
- ❌ 不在日曆事件標題中包含孩子姓名（用 `[孩子] 18 個月發展評估` 不用 `[小明] 18 個月發展評估`，因為 ICS 訂閱後顯示在其他設備上，家庭成員可能看到）

### 11.3 父母同意

孩子首次新增時顯示：
> "你正在為 [孩子名字] 建立個人化日曆。我們會根據出生日期自動推算發展里程碑與升學日程。此資料僅用於你的提醒，不會分享予第三方。"
> [明白] [取消]

---

## 12. 分階段交付

### Phase V0.5：ICS Feed MVP（1-2 週）

**唯一交付**：訂閱後自動同步到系統日曆。零 digest、零 UI。

- [ ] DB schema 全部建（§5）
- [ ] L4 birthday rule 表 + trigger（用戶新增 child 時自動填 milestone events）
- [ ] L3 favorites trigger（用戶加收藏時，將該校已有 L2 events 聯動到用戶視圖）
- [ ] L5 HKO sync cron（§6.3）
- [ ] 5 間首批名校手工 curate L2 events 種入 SQL
- [ ] ICS feed route + generator（§9.1）
- [ ] `/account` 加 "訂閱日曆" 按鈕 + 生成 URL + revoke 按鈕
- [ ] Apple / Google / Outlook 三端訂閱冒煙測試
- [ ] 邀 5-10 位現有收藏用戶內測
- **成功線**：≥ 50% 內測者成功訂閱並報告一週內看到至少 1 條有用事件

### Phase V1：Email Digest + In-app（+4 週）

- [ ] L2 爬蟲 pipeline 上線（§6.2），擴到 200 間
- [ ] 雙源驗證機制（§7）
- [ ] Digest prompt + cron（§8）
- [ ] Resend template + webhook（§8.5）
- [ ] In-app `/calendar` 3 視圖（§9.3）
- [ ] 多孩子支援（schema 已支持，UI 加孩子切換）
- [ ] KPI dashboard（管理員內部用）：digest 打開率 / 點擊率 / 不同 layer 事件貢獻度
- [ ] Stripe 配額集成
- **成功線**：第 4 週 digest 打開率 ≥ 40%（新用戶 cohort）

### Phase V2：決策引擎 C（+6 週）

- [ ] 衝突檢測：同日兩個事件（孩子 A 面試 = 孩子 B 開放日）自動標記
- [ ] 通勤疊加：若事件有 lat/lng，結合 Google Maps API 估算通勤時間 + 天氣
- [ ] 橫斷面視圖："距離截止還有 X 天 / 你的 5 間校中 3 間已過，2 間未完成"
- [ ] "決策視角" digest：每 2 週一次，幫家長做 trade-off（vs 每週純提醒）
- [ ] Web Push 接入（§9.4）
- **成功線**：跨 A/B 跳轉率 ≥ 8%（證明 D 是入口）

### Phase V3：家庭共享 + Google Cal 雙向同步（按數據）

- [ ] Pro tier 夫妻綁定同一日曆
- [ ] Google Cal OAuth + 雙向 sync（用戶自添事件推回 D）
- [ ] WhatsApp 推送（HK 家長習慣 > email）
- [ ] P1-P6 小學段擴展

---

## 13. 驗證清單

### V0.5 acceptance
- [ ] 10 位內測用戶中 ≥ 5 位成功訂閱並在自家日曆中看到事件
- [ ] ICS token revoke 後 2 分鐘內舊 URL 返回 404
- [ ] 新用戶註冊後，即使未收藏學校也有 ≥ 3 條 L4 milestone 事件
- [ ] RLS 測試：用戶 A 用戶 B token 無法取到對方事件
- [ ] Mobile Safari（iPhone）能用

### V1 acceptance
- [ ] **第 4 週 digest 打開率 ≥ 40%**（核心 KPI）
- [ ] 爬蟲每週完成 200 間學校掃描，L2 事件 confirmed 率 ≥ 70%
- [ ] 雙源驗證：隨機抽 20 條 confirmed 事件，人工 verify 錯誤率 ≤ 5%
- [ ] Digest email 送達率 ≥ 95%（Resend）
- [ ] In-app /calendar 在 iPhone 13 Safari 渲染 ≤ 2s
- [ ] 用戶報錯迴路（§7.4）可用

### V2 acceptance
- [ ] 衝突檢測對 10 個已知衝突案例 recall ≥ 90%
- [ ] Web Push opt-in 率 ≥ 20%
- [ ] A/B/SmartPLAY 跨功能點擊率 ≥ 8%

---

## 14. 待決問題（開發前需要產品確認）

1. **多孩子 UI 設計**：橫向 tab 切換 vs 單一合併視圖？建議 tab + 合併兩個選項  → ?
2. **Pro tier 夫妻綁定機制**：邀請碼 vs 共享 email 登入？建議邀請碼 → ?
3. **WhatsApp 推送**：走 Twilio 付費 vs 不做？取決於 V1 email 打開率 → ?
4. **Google Calendar 雙向同步是否必做**：V3 範圍內，但用戶反饋若強烈可提前 → ?
5. **爬蟲託管位置**：Vercel Cron 函數 10s timeout 跑不完 200 校爬取。放 Railway / Fly.io 獨立 VPS？還是 GitHub Actions 定時 workflow？建議 Railway $5/月 → ?
6. **冷啟動里程碑規則**：§4.2 表目前 8 條，是否全部啟用？有些（如疫苗）可能家長已在衛生署系統看到，重複會煩。建議 V0.5 只上 5 條升學相關，vaccine 延後 → ?
7. **L1 EDB PDF 年度 curate 責任人**：每年誰負責跑腳本 + review 結果？建議發者本人（你）每年 9 月花 1 小時 → ?
8. **Free tier 學校數限制**：3 間是否太少？多數活躍家長收藏 5-10 間。建議免費 5 間 → ?

---

## 15. 文件清單（開發 checklist）

### 新增文件

**Database / migrations**
- [ ] `supabase/migrations/0XX_calendar_events.sql`（§5.2）
- [ ] `supabase/migrations/0XX_calendar_subscriptions.sql`（§5.3）
- [ ] `supabase/migrations/0XX_calendar_digest_history.sql`（§5.4）
- [ ] `supabase/migrations/0XX_calendar_verification_logs.sql`（§5.5）
- [ ] `supabase/migrations/0XX_calendar_user_custom_events.sql`（§5.6）
- [ ] `supabase/migrations/0XX_extend_children_birthday.sql`（§5.1，如 A spec 還沒建 children 表）

**Seed / static data**
- [ ] `supabase/seed/0XX_top5_schools_calendar.sql`（5 首批名校手工 curate L2）
- [ ] `data/calendar_milestone_rules.json`（§4.2）

**Library**
- [ ] `src/lib/calendar/ics-feed.ts`（§9.1 generator）
- [ ] `src/lib/calendar/digest-prompt.ts`（§8.3）
- [ ] `src/lib/calendar/dual-source-verify.ts`（§7.2）
- [ ] `src/lib/calendar/event-dedup.ts`（§6.4）
- [ ] `src/lib/calendar/fetch-user-events.ts`（digest + ICS 共用的聚合函數）
- [ ] `src/lib/calendar/cold-start.ts`（§4.1 新用戶預填邏輯）
- [ ] `src/lib/calendar/conflict-detection.ts`（V2）
- [ ] `src/lib/calendar/commute-overlay.ts`（V2）

**API routes**
- [ ] `src/app/api/calendar/feed/[token]/route.ts`（§9.1）
- [ ] `src/app/api/calendar/subscriptions/route.ts`（GET / POST 生成 / revoke）
- [ ] `src/app/api/calendar/events/[id]/report/route.ts`（§7.4 用戶報錯）
- [ ] `src/app/api/cron/weekly-digest/route.ts`（§8.2）
- [ ] `src/app/api/cron/sync-weather-alerts/route.ts`（§6.3）
- [ ] `src/app/api/cron/scan-school-calendars/route.ts`（觸發 §6.2 爬蟲，若放本 Vercel）
- [ ] `src/app/api/webhooks/resend/route.ts`（§8.5 opened/clicked 回填）

**Pages / components**
- [ ] `src/app/(auth)/calendar/page.tsx`（§9.3 in-app view，V1）
- [ ] `src/app/(auth)/calendar/MonthView.tsx`
- [ ] `src/app/(auth)/calendar/WeekView.tsx`
- [ ] `src/app/(auth)/calendar/TimelineView.tsx`
- [ ] `src/app/(auth)/account/CalendarSubscribeSection.tsx`（V0.5，生成/revoke ICS URL + 顯示說明）

**Email templates**
- [ ] `src/lib/email/templates/calendar_digest.ts`（§8.4）

**Scripts**
- [ ] `scripts/parse_edb_calendar.py`（§6.1 年度手動）
- [ ] `scripts/crawl_school_calendars.py`（§6.2 若放 VPS/Railway）

### 修改文件

- [ ] `vercel.json`（加 cron: weekly-digest / sync-weather-alerts）
- [ ] `src/app/layout.tsx` 或 navbar 組件（加 "日曆" tab，在 "資訊" 右邊）
- [ ] `src/app/robots.txt`（加 `Disallow: /calendar` + `Disallow: /api/calendar/feed/`）
- [ ] `package.json`（依賴：`@anthropic-ai/sdk`，如尚未安裝）
- [ ] 若 A 未啟用 `children` 表則本 spec 負責建；若 A 未來啟用，`children` 表結構需雙方兼容（本 spec §5.1 用 `alter table if exists` 容錯）

---

## 16. 參考既有 infra

本 spec 明確引用項目既有設施，開發 Agent 不要重造輪子：

| 功能 | 既有路徑 | 本 spec 用法 |
|---|---|---|
| Cron 鑑權 pattern | `src/app/api/cron/reminders/route.ts` | 所有新 cron route 復用 `Authorization: Bearer CRON_SECRET` 格式 |
| Supabase server client | `src/lib/supabase/server.ts` | `createClient()` / `createServiceClient()` |
| Resend wrapper | `src/lib/email/resend.ts` | `sendEmail({to, subject, html})` |
| Email template pattern | `src/lib/email/templates/index.ts` | 新增 `calendar_digest.ts` 跟進相同 BEM 風格 |
| Homepage events 提取 | `src/lib/homepage/liveData.ts:590-662` (`getSchoolEvents`) | 可作 L2 爬蟲冷啟動種子（既有 `school_enrichments.open_day_details` / `application_details` 正則抽取） |
| Schools / enrichments schema | `supabase/migrations/001_create_tables.sql` + `015_create_school_enrichments.sql` | D 的 events 通過 `school_id` FK 關聯；不重複存學校基礎資料 |
| Favorites 聯動 | `supabase/migrations/001_create_tables.sql` (`favorites` 表) | L3 觸發讀此表 |
| 反爬護城河規約 | `CLAUDE.md` § "數據護城河" | 嚴格遵守，不暴露 bulk events API；ICS feed 走 per-user token |

---

## 17. 參考文檔

- RFC 5545（ICS format）: https://datatracker.ietf.org/doc/html/rfc5545
- HKO Open Data: https://data.weather.gov.hk/
- Resend Node SDK: https://resend.com/docs
- Anthropic Node SDK: https://github.com/anthropics/anthropic-sdk-typescript
- Anthropic Prompt Caching: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
- Web Push API: https://developer.mozilla.org/en-US/docs/Web/API/Push_API
- A spec (Interview Coach, 暫緩): `docs/ai_interview_coach_spec.md` v1.1（D 的 CTA 跳 A 時需保持 schema 兼容）
- B spec (Knock Door Letter eval, 暫緩): `docs/knock_door_letter_eval_rubric.md` v1.1
- XHS 爬蟲 pattern: `docs/xiaohongshu_scraping_spec.md`

---

**結束**。本文檔完成後，另一 AI 應能從本 spec 直接開始 **Phase V0.5 實施**（ICS feed，1-2 週 ship），V1 按時間線繼續。Phase V0.5 上線前必做：30 分鐘競品掃描（§1.3）回填 §1.4。如需調整 scope，請編輯本文件並更新 changelog。
