# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**HKSchoolPlace** is a mobile-first web app helping Hong Kong parents find, compare, and track kindergarten (幼稚園) applications. It aggregates EDB vacancy data, school basics, and parent-submitted interview intel into one place, with Google login, school favouriting, and email deadline reminders.

**Status:** Pre-build specification phase. All specs are complete in the .docx files; no application code exists yet.

**V1 scope:** Kindergartens only (N/K1/K2/K3). Solo developer project.

## Tech Stack (Locked — Do Not Change)

- **Framework:** Next.js 14 (App Router), Server Components by default
- **Styling:** Tailwind CSS (no CSS-in-JS)
- **Database:** Supabase (PostgreSQL) with Row Level Security
- **Auth:** Supabase Auth + Google OAuth
- **Deployment:** Vercel (free tier)
- **Email:** Resend (free tier: 3,000/month)
- **Cron:** Vercel Cron Jobs (daily at 01:00)
- **Types:** TypeScript strict mode, no `any`

### Explicitly Banned

Redux/Zustand, Prisma/Drizzle ORM, GraphQL, Docker, Redis, automated scrapers, React Native.

## Build & Development Commands

```bash
# Setup
npx create-next-app@14 --typescript --tailwind --app --src-dir
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs resend zod

# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # ESLint

# Supabase
supabase gen types typescript --project-id ordaiibaaqkdsiqparqe > src/types/database.ts
supabase db push         # Push migrations
supabase migration new <name>  # Create new migration
```

## Directory Structure (Mandatory)

```
src/
  app/
    (public)/               # No-auth routes
      page.tsx              # / — Homepage (static)
      kg/
        page.tsx            # /kg — KG list (ISR 3600s)
        [id]/page.tsx       # /kg/[id] — Detail (ISR 3600s)
      submit/page.tsx       # /submit — Submit intel (static)
    (auth)/                 # Auth-required routes
      account/page.tsx      # /account — User account (dynamic)
    api/
      schools/route.ts
      vacancies/route.ts
      favorites/route.ts
      intel/route.ts
      cron/reminders/route.ts
  components/
    ui/                     # Base: Button, Card, Toast, Skeleton, BottomSheet
    schools/                # Domain: SchoolCard, VacancyBadge
    home/                   # Homepage: BannerCarousel, BannerSlide, ParentMustKnow, NewsFeed, FeaturedSchools, HeroSearchBar
    layout/                 # Header, Footer
  lib/
    supabase/
      client.ts             # Browser Supabase client
      server.ts             # Server Supabase client
      middleware.ts          # Auth middleware
    db/                     # All DB query functions (never write SQL in route handlers)
      schools.ts
      vacancies.ts
      intel.ts
      favorites.ts
    email/
      resend.ts             # Resend wrapper
      templates/            # Email templates
    utils/
  types/
    database.ts             # Supabase-generated (never hand-edit)
    api.ts                  # Request/response types
    homepage.ts             # Banner, OpenDay, Deadline, News, FeaturedSchool types
  data/
    homepage.ts             # Static homepage content (banners, news, featured schools)

supabase/
  migrations/               # Numbered: 001_create_schools.sql, 002_...
  seed/
```

## Database Architecture

6 tables: `schools` (~1,000), `vacancies` (~1,000/year), `admission_intel`, `users`, `favorites`, `reminders`.

### Key Rules

- RLS enabled on ALL tables
- All tables must have `created_at timestamptz default now()`
- Use `CHECK` constraints, NOT PostgreSQL ENUM types
- Foreign keys must declare `ON DELETE CASCADE` or `ON DELETE SET NULL`
- `(user_id, school_id)` in `favorites` has a unique constraint
- `schools` uses soft delete (`is_active = false`); all other tables use physical delete
- Migrations numbered sequentially; never modify an already-run migration
- Never use `SELECT *` — always name columns
- No JOINs spanning more than 3 tables

### Vacancy Update Protocol

1. Before inserting: `UPDATE vacancies SET is_current = false WHERE school_id = $1`
2. Insert new record with `is_current = true`
3. If data fetch fails: do NOT update — preserve old `is_current = true` record
4. Frontend: if `edb_published_date` > 30 days ago → show grey "請查閱官網" for all grades

### RLS Summary

| Table | Read | Write |
|-------|------|-------|
| schools | Everyone (`is_active = true`) | `service_role` only |
| vacancies | Everyone | `service_role` only |
| admission_intel | Everyone (`status = approved`) | Insert: logged-in; Update: `service_role` |
| users | Own row only | Supabase Auth trigger |
| favorites | Own rows only | Own rows only |
| reminders | Own rows only | `service_role` only |

## API Design

### Response Format (all endpoints must follow)

```ts
// List:    { "data": [...], "count": 247, "page": 1, "limit": 20 }
// Single:  { "data": { ...school } }
// Mutation: { "success": true }
// Error:   { "error": { "code": "NOT_FOUND", "message": "School not found" } }
```

### Critical API Rules

1. Auth check must be the **first line** of any protected route
2. All POST/PATCH bodies validated with **Zod** — never trust raw input
3. Pagination required on all list endpoints: default `limit = 20`, max `limit = 100`
4. Cron endpoint must verify `Authorization: Bearer CRON_SECRET` header
5. HTTP status: 200, 201, 400, 401, 403, 404, 409, 500 (never expose internals on 500)

## Architecture Principles

### Data Philosophy

> The product is not a data source. It is an information aggregation + uncertainty-handling system.

- If data exists → display with source tag (`教育局官方` / `學校公佈` / `家長提交` / `推算`) and timestamp
- If data missing → show `[暫無資料]` and link to school website
- Never display uncertain data
- Private/international schools: never show EDB vacancy (they don't participate in KEP) — show `check_school` with phone number

### Auth Flow

- **Browsing never requires login** — only actions (favourite, reminder, submit) trigger login
- Login modal triggers on action, not page load
- After login: auto-complete the action that triggered login
- First-time login: silently create `users` record
- `/account` without session: redirect to `/` + toast

### Component Rules

- Default to Server Components; `"use client"` only for `useState`/`useEffect`/event handlers
- `"use client"` on the smallest possible component, never a whole page
- Max 200 lines per component file
- No `<img>` — always use Next.js `<Image>` (except for initial-letter avatars which use `<div>`)
- No external fonts in V1 — system font stack: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif`
- School cards must always render the initial-letter avatar; never show a broken image or empty space
- All user-facing strings in Traditional Chinese (粵語); no hardcoded English UI text except brand name and school `name_en`

## UI Language & Navigation

All user-facing text must be **Traditional Chinese (粵語風格)**. Use conversational Cantonese-flavoured wording where appropriate (e.g. 「搵學校」not「查找學校」). English is only used for school English names, technical labels, and the brand name "HKSchoolPlace".

### Navigation Bar

```
┌─────────────────────────────────────────────────────────────┐
│  HKSchoolPlace     搵學校  ·  分享心得  ·  我的收藏    🔍  登入  │
└─────────────────────────────────────────────────────────────┘
```

- **Logo** (left): "HKSchoolPlace" text, links to `/`
- **Nav items** (center): `搵學校` → `/kg` · `分享心得` → `/submit` · `我的收藏` → `/account`
- **Right**: Search icon (magnifier) + `登入` button (dark pill `bg-slate-950 text-white rounded-full px-4 py-2 text-sm`)
- Logged-in state: `登入` replaced by user avatar circle, click → `/account`
- Active nav item: underline indicator (2px `slate-950`)
- Mobile: nav items collapse to hamburger menu; search icon remains visible

### Footer

4 columns: brand + tagline | 網站導覽 (sitemap links) | 支援服務 (聯絡我們, 服務條款, 私隱政策) | 訂閱電子報 (email input + 訂閱 button). Copyright: `© 2026 HKSchoolPlace`.

## Design System

### Core Principle

> Color is information, not decoration. Only status gets color. Everything else is black/white/grey. Saturation under 20%.

### Palette (Tailwind)

| Use | Color |
|-----|-------|
| Base background | `slate-50` (#f8fafc) |
| Card / surface | `white` (#ffffff) solid, no blur |
| Primary text | `slate-950` (#020617) |
| Secondary text | `slate-700` (#334155) |
| Muted text | `slate-500` (#64748b) |
| Border | `slate-200` (#e2e8f0) |
| Divider (light) | `slate-100` (#f1f5f9) |
| Featured surface (dark card) | `slate-900` (#0f172a) with `text-white` |

#### Status Colors (vacancy badges & deadline indicators only)

| Status | Background | Text | Use |
|--------|-----------|------|-----|
| 尚有學額 / safe (>14d) | `emerald-50` (#ecfdf5) | `emerald-700` (#047857) | Has vacancy |
| 學額緊張 / warning (7–14d) | `amber-50` (#fffbeb) | `amber-700` (#b45309) | Running low / deadline approaching |
| 名額已滿 / urgent (<7d) | `red-50` (#fef2f2) | `red-700` (#b91c1c) | Full / deadline imminent |
| 未開放 / not applicable | `slate-100` (#f1f5f9) | `slate-500` (#64748b) | Not offered / check school |

### Cards

Two card variants:

**Content Card** (default — school list, detail sections, stats):
```
bg-white rounded-2xl border border-slate-200 p-6
hover: shadow-sm transition-shadow duration-200 — no scale, no color change
```

**Featured Card** (homepage highlights, promotional — max 1 per page section):
```
bg-slate-900 text-white rounded-2xl p-6
```

No glass/blur effect in V1. All cards use solid backgrounds.

### Buttons (Two Types Only)

- **Primary** (max one per page): `bg-slate-950 text-white rounded-xl px-6 py-3`
- **Secondary**: `bg-white text-slate-900 border border-slate-200 rounded-xl px-6 py-3`
- Hover: `scale(1.02)` over 200ms — no color change
- Disabled: `opacity-50 cursor-not-allowed`

### Vacancy Status Badges

Pill-shaped badges positioned **top-right** of school cards:
```
inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
```

- 尚有學額: `bg-emerald-50 text-emerald-700`
- 學額緊張: `bg-amber-50 text-amber-700`
- 名額已滿: `bg-red-50 text-red-700`
- 未開放: `bg-slate-100 text-slate-500`

Each grade (N/K1/K2/K3) gets its own badge. Show grade prefix: `K1 尚有學額`, `K2 學額緊張`.

### School Images & Fallback

V1 does not use real school photos. All school cards display an **initial-letter avatar**:

```
Avatar circle: w-12 h-12 rounded-full flex items-center justify-center
Background: deterministic from school_id — cycle through:
  slate-200, emerald-100, amber-100, sky-100, violet-100
Text: first character of name_tc, text-lg font-semibold, color matching bg shade-700
```

Detail page hero area: show a **generic placeholder** illustration (classroom vector or solid color block with school name overlay). Reserve the image container dimensions (`aspect-[16/9] rounded-2xl bg-slate-100`) for future real photos.

### Spacing

- Card padding: `p-6` (24px)
- Card gap: `gap-5` (20px)
- Page margin: `px-5` mobile / `px-8` desktop
- Section spacing: `mb-10` (40px)
- Inner section gap: `space-y-4`

### Border Radii

Tags/pills: `rounded-full` (99px) · Buttons: `rounded-xl` (14px) · Cards: `rounded-2xl` (16px) · Avatar: `rounded-full`

### Typography

| Level | Tailwind | Size/Weight | Use |
|-------|----------|------------|-----|
| Display | `text-4xl font-bold tracking-tight` | 40px / 700 / tight | Homepage hero |
| H1 | `text-2xl font-bold tracking-tight` | 28px / 700 / tight | Page titles (e.g. 「策劃香港卓越教育藍圖」) |
| H2 | `text-xl font-semibold` | 20px / 600 | Section headers (e.g. 「即時學額狀態」) |
| H3 | `text-lg font-semibold` | 18px / 600 | Card titles, school names |
| Body | `text-base font-normal leading-relaxed` | 16px / 400 / 1.625 | Main content |
| Small | `text-sm text-slate-500` | 14px / 400 | Timestamps, sources, update hints |
| Label | `text-xs font-medium uppercase tracking-wide` | 12px / 500 | Field labels, grade prefix |

## Page Layouts

### Homepage (`/`)

Top-to-bottom sections:

1. **Hero Banner** — 1-3 slide carousel with Ken Burns animation on background images. Each slide uses one of 3 text layout templates (`classic` / `event` / `minimal`) defined in `src/types/homepage.ts`. Auto-rotates every 8s, pauses on hover. Images stored in `public/images/banners/`. Below banner: search bar + quick-filter pills.
2. **本週家長必知** — 2-column layout. Left: upcoming open days + approaching deadlines (time-sensitive, auto-expire). Right: dark card with recent parent intel from `admission_intel`.
3. **消息動態** — EDB circulars + school official announcements (news articles, not actionable dates). Distinct from 本週家長必知 to avoid content overlap.
4. **精選名校** — 3-col grid of curated/ranked schools. Supports future ad slot.
5. **Footer** (unchanged).

#### Banner Carousel Rules

- Content defined in `src/data/homepage.ts` → `BANNERS` array
- 0 banners → should not happen; always have at least 1
- 1 banner → static display, no dots/controls
- 2 banners → dot navigation, auto-rotate
- 3 banners → if 3rd is ad, show "推廣" pill; ad always in last slot
- 3 text layout templates:
  - `classic`: source pill → title → subtitle → tag pills → 2 buttons → footer note (default)
  - `event`: large event type badge → title + date → 1 button
  - `minimal`: large title only → 1 button
- Images: 16:7 aspect (desktop), 4:3 (mobile). Warm educational space, no people, no text. Subject right-weighted, left 40% clear for text overlay.
- Ken Burns: `animation: ken-burns 20s ease-in-out infinite alternate` (scale 1→1.08 + translate)

### Account Page (`/account`) — V1 Scope

No sidebar navigation. Single-page layout:

1. **Welcome header** — 「你好，[display_name]」
2. **收藏中的學校** — Grid of favourite school cards (same card component as list page, plus deadline countdown text in red if < 7 days). Empty state: 「未有收藏學校，去搵學校睇下？」 with link to `/kg`.
3. **提醒設定** — Per-school toggle: reminder on/off, selected days (7d/3d/1d). Inline edit, no separate page.

## Key UX Flows

### 收藏與提醒

1. Click favourite → optimistic UI (heart fills instantly)
2. Toast: 「已收藏，要開啟截止提醒嗎？」 with [開啟] and [暫不]
3. [開啟] → Bottom Sheet: choose days (7日前 / 3日前 / 1日前, all default checked)
4. Save → `reminder_enabled = true`, create `reminders` rows
5. Cancel favourite → confirm dialog 「確定取消收藏？相關提醒將一併刪除。」 → delete cascades reminders
6. Max favourites per user: **10** — hitting limit shows toast 「已達收藏上限（10間），請先移除其他學校。」

### Cron Job (01:00 daily)

- Find reminders where `scheduled_date = today` AND `status = pending`
- Send via Resend; success → `status = sent`; failure → retry up to 3 times, then `status = failed`
- Verify `CRON_SECRET` header — reject all other callers

### List Page (`/kg`)

**Layout**: Left filter sidebar (desktop) / top filter bar (mobile) + right 2-column card grid.

**Filter sidebar** (3 groups):
- 地區位置: checkbox list of 18 districts, max 3 selected at once
- 學位狀態: pill toggles — 尚有學額 / 學額緊張 / 學位已滿 (multi-select)
- 學校類別: radio buttons — 全部 / 非牟利 / 私立獨立 / 國際

**School card layout** (in grid):
```
┌──────────────────────────────┐
│  [Avatar]        [K1 badge]  │
│                  [K2 badge]  │
│  學校中文名                    │
│  School English Name         │
│  📍 地區                      │
│                              │
│  2小時前更新      查看詳情 →    │
└──────────────────────────────┘
```

**Sorting**: default → has vacancy → nearest deadline → most recently updated. Search: 300ms debounce on `name_tc` + `name_en`. Filter state persisted in URL query string.

### Detail Page

4 sections in order:

1. **即時學額狀態** — One card per grade (N/K1/K2/K3), each showing vacancy status icon + status text + supplementary note (e.g. 「預計輪候等同：12 個月」). Include 「回報更新」 link for community corrections. If `edb_published_date` present, show 「最後更新：[date]」.
2. **學校概況** — Address, website link, phone. Stats pills: 師生比例, 校舍面積 (if available, otherwise omit — never show `[暫無資料]` for stats pills). Reserve map placeholder (`aspect-[4/3] rounded-2xl bg-slate-100` with 「在 Google 地圖中開啟」 link).
3. **學費及各項收費** — Comparison table with columns: 項目 / 半日制 / 全日制. Rows: 每月學費, 報名費, 年度教材費, 茶點費, etc. Footer note: 「註：校園及其他學費詳情內容以官方公佈為準。」If school only offers one session type, single-column layout.
4. **家長心得與評價** — Max 3 intel entries. Each card: star rating (1–5), quoted text (truncate at 80 chars), author display name, date. 「撰寫評論」 link triggers login if needed. 「查看全部」 expands remaining entries.

Fixed bottom CTA bar with primary action: 「申請 [year] 入學」 + secondary: 「下載學校簡介」(links to school website).

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase | `SchoolCard`, `VacancyBadge` |
| Functions/variables | camelCase | `getSchools`, `isLoading` |
| DB query functions | camelCase verb-first | `fetchSchools`, `insertFavorite` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FAVORITES`, `REMINDER_DAYS` |
| DB columns | snake_case | `school_id`, `created_at` |
| CSS | Tailwind utility only | No custom class names |

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — safe for client
- `SUPABASE_SERVICE_ROLE_KEY` — **NEVER** prefix with `NEXT_PUBLIC_`, never use in `"use client"` components
- `RESEND_API_KEY` — server only
- `CRON_SECRET` — server only, verified in cron route handler

## Platform Limits (Free Tier)

- Vercel: 10s function timeout, 1 daily cron job
- Supabase: 500MB database, 50K MAU, 2GB bandwidth
- Resend: 3,000 emails/month

## Specification Files

| File | Purpose |
|------|---------|
| `HKSchoolPlace_PRD_V1.docx` | Full product requirements |
| `HKSchoolPlace_DataDictionary_V1.docx` | Complete DB schema with field definitions and enums |
| `HKSchoolPlace_EngineeringConstraints_V1.docx` | Technical constraints and code rules |
| `HKSchoolPlace_UXFlows_V1.docx` | Interaction flows, edge cases, error states |
| `hkschoolplace_design_system_2026.html` | Visual design system (open in browser) |
| `hkschoolplace_ia.svg` | Information architecture diagram |
| `TODO.md` | Ordered 12-phase build checklist |
