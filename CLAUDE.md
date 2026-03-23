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
4. Frontend: if `edb_published_date` > 30 days ago → show grey "请查官网" for all grades

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

- If data exists → display with source tag (`EDB Official` / `School-published` / `Parent-submitted` / `Inferred`) and timestamp
- If data missing → show `[暫無]` and link to school website
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
- No `<img>` — always use Next.js `<Image>`
- No external fonts in V1 — system font stack: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif`

## Design System

### Core Principle

> Color is information, not decoration. Only status gets color. Everything else is black/white/grey. Saturation under 20%.

### Palette (Tailwind)

| Use | Color |
|-----|-------|
| Base background | `slate-50` (#f8fafc) |
| Primary text | `slate-950` (#020617) |
| Muted text | `slate-500` (#64748b) |
| Border | `slate-200/50` |
| Glass surface | `white/60` + `backdrop-blur(20px)` |
| Has vacancy / safe (>14d) | Low-sat green: `rgba(220,252,231,.8)` |
| Deadline warning (7-14d) | Low-sat orange: `rgba(255,237,213,.8)` |
| Full / urgent (<7d) | Low-sat red: `rgba(254,226,226,.8)` |

### Glass Card

```
bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-[2rem] p-7
hover: scale(1.02) over 200ms — no color change, no deep shadows
```

### Buttons (Two Types Only)

- **Primary** (max one per page): `bg-slate-950 text-white rounded-xl`
- **Secondary**: `bg-white/70 backdrop-blur text-slate-900 border border-slate-200/50`
- Hover: `scale(1.02)` — no color change
- Disabled: `opacity-50 cursor-not-allowed`

### Spacing

- Card padding: min `p-7` (28px)
- Card gap: min `gap-4` (16px)
- Page margin: `px-5` mobile / `px-8` desktop
- Section spacing: min `mb-8` (32px)

### Border Radii

Tags/pills: `99px` · Buttons: `14px` / `rounded-xl` · Cards: `2rem` / `rounded-[2rem]`

### Typography

| Level | Size/Weight | Use |
|-------|------------|-----|
| Display | 36px / 600 / tight | Hero text |
| H1 | 24px / 600 / tight | Page titles |
| H2 | 18px / 600 / tight | Section headers |
| Body | 15px / 400 / 1.6 | Main content |
| Small | 13px / 400 | Timestamps, sources |
| Label | 10px / 600 / uppercase 0.1em | Field labels |

## Key UX Flows

### Favourite & Reminder

1. Click favourite → optimistic UI (heart fills instantly)
2. Toast: "已收藏，要開啟截止提醒嗎？" with [開啟] and [暫不]
3. [開啟] → Bottom Sheet: choose days (7d/3d/1d, all default checked)
4. Save → `reminder_enabled = true`, create `reminders` rows
5. Cancel favourite → confirm dialog → delete cascades reminders
6. Max favourites per user: **10**

### Cron Job (01:00 daily)

- Find reminders where `scheduled_date = today` AND `status = pending`
- Send via Resend; success → `status = sent`; failure → retry up to 3 times, then `status = failed`
- Verify `CRON_SECRET` header — reject all other callers

### List Page Sorting

Default: has vacancy → nearest deadline → most recently updated. Search: 300ms debounce on `name_tc` + `name_en`. Filter state persisted in URL query string.

### Detail Page

4 sections in order: Vacancy → Basic Info → Fees → Admission Intel. Fixed bottom CTA bar. Intel shows max 3 entries, "View all" expands.

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
