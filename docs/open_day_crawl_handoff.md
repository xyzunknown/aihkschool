# Internal Open Day Crawl Handoff

## Goal

Build an internal-only crawl queue for the most discussed kindergarten brands / branches, then prioritize official school-site open day and admissions data collection.

## Ranking Image Inputs

- Ranking images directory: `/Users/xyz/Documents/新学校选择/newhkschoolplace/data/xhs/ranking_images`
- OCR analysis outputs:
  - `/Users/xyz/Documents/新学校选择/newhkschoolplace/data/xhs/ranking_image_analysis.json`
  - `/Users/xyz/Documents/新学校选择/newhkschoolplace/data/xhs/ranking_brand_top100.json`
  - `/Users/xyz/Documents/新学校选择/newhkschoolplace/data/xhs/ranking_branch_top100.json`
- Curated internal priority seed:
  - `/Users/xyz/Documents/新学校选择/newhkschoolplace/data/xhs/internal_priority_brands.json`

## How To Re-run Ranking Extraction

```bash
cd /Users/xyz/Documents/新学校选择/newhkschoolplace
/Users/xyz/Documents/新学校选择/.venv/bin/python -m scripts.xhs.analyze_ranking_images
```

Quick sample run:

```bash
cd /Users/xyz/Documents/新学校选择/newhkschoolplace
/Users/xyz/Documents/新学校选择/.venv/bin/python -m scripts.xhs.analyze_ranking_images --limit 5
```

## Crawl Strategy

1. Use `internal_priority_brands.json` as the first queue.
2. Crawl official websites for top brands first, then expand to branch-level Top50 / Top100.
3. Prefer official admissions pages, official news pages, and official PDFs.
4. Treat social-image rankings as demand signals only, not factual proof.

## Data To Prioritize

Priority 1:

- `open_day_url`
- `open_day_title`
- `open_day_date`
- `info_session_date`
- `application_open_date`
- `application_deadline`
- `application_url`
- `campus_name`
- `address`
- `phone`
- `email`

Priority 2:

- `has_nursery` / `pn_flag` / `n_class_flag`
- `k1_flag`
- `tuition`
- `kep`
- `session_type`
- `teaching_language`
- `admissions_pdf_url`

Priority 3:

- `curriculum_tags`
- `interview_notes`
- `primary_pathway_notes`
- `faq_url`
- `calendar_url`

## Suggested Output Files

- `data/open_day_priority_brand_top30.json`
- `data/open_day_priority_branch_top50.json`
- `data/open_day_priority_branch_top100.json`

## Prompt For Another AI

```text
Work in /Users/xyz/Documents/新学校选择/newhkschoolplace.

Goal:
1. Read ranking-image derived demand signals from:
   - data/xhs/internal_priority_brands.json
   - data/xhs/ranking_brand_top100.json
   - data/xhs/ranking_branch_top100.json
2. Build an official-site crawl queue for the highest-priority kindergarten brands and branches.
3. Crawl official websites and official PDFs only.

Focus first on these fields:
- open_day_url
- open_day_title
- open_day_date
- info_session_date
- application_open_date
- application_deadline
- application_url
- campus_name
- address
- phone
- email
- has_nursery
- k1_flag
- tuition
- kep
- session_type
- teaching_language
- admissions_pdf_url

Rules:
- Do not invent missing values.
- Mark missing values explicitly as null or missing.
- Prefer official admissions pages, school news pages, and official PDF notices.
- If the brand has multiple branches, keep branch-level rows separate.

Deliverables:
1. data/open_day_priority_brand_top30.json
2. data/open_day_priority_branch_top50.json
3. data/open_day_priority_branch_top100.json
4. A short markdown summary of what was found and what is still missing.
```

## Caveats

- OCR-derived Top100 lists contain noise and should be treated as queue builders, not canonical rankings.
- The curated `internal_priority_brands.json` is the safer first-pass crawl seed.
- Many ranking images mention brands and branches inconsistently; branch-level crawl should always verify the exact campus name from the official site.

---

## ⏸️ PAUSE — May 2026

**Decision date:** 2026-05-04
**Resume target:** ~2026-08-01 (or when schools start announcing 2026/27 open days)

### Why paused

Two independent reasons converged:

**1. Seasonal lull (primary)**
- Hong Kong kindergarten open days concentrate in **Sep-Nov** for the following year's admission cycle
- Schools typically announce dates starting **Jul-Aug**
- May is the deepest dead zone — even the "verified" open days found on 2026-05-04 were from 2025:

| School | Date Found | Status |
|--------|-----------|--------|
| 香港五常法幼稚園 | 2025-09-27 | Past event |
| 加州天地幼稚園 | 2025-10-25 | Past event |
| 啟思幼稚園 ×4 branches | No date | CTA only, no schedule |

- 0 of 100 schools had a 2026 open day date in current crawl

**2. Anti-bot attrition (compounding)**
- 32/100 schools unreachable (32%) — 78% blocked by WAF/anti-bot
- 2/100 blocked by robots.txt
- Even after Phase 1-2 countermeasures (below), stronger WAFs still defeat Playwright stealth

### Anti-bot improvements made (May 2026)

These were implemented before the pause decision — they'll be immediately useful when resuming:

| Phase | What | Impact |
|-------|------|--------|
| Phase 1 | +16 domain policies → Playwright whitelist 23→39 | ~10-14 more schools can now trigger browser fallback |
| Phase 2 | `playwright-extra` + `puppeteer-extra-plugin-stealth` | Evasion for `navigator.webdriver`, WebGL fingerprint, plugin list |
| Phase 2 | Randomised viewport/locale/timezone/scroll | Harder bot fingerprinting |
| Phase 3 | DNS connectivity diagnosis | 6 dead domains confirmed (Kons/HaSuiWan/TungChung SKH cluster offline) |
| Phase 4 | Edge case patches (gigamind, dominicsaviokg) | 2 more schools covered |

### 6 confirmed dead domains

All resolve DNS but HTTP servers don't respond. Not a crawler bug:

| School | Domain | Note |
|--------|--------|------|
| 佳寶幼稚園（屯門分校） | guideposts.edu.hk | Connection refused |
| 大埔浸信會幼稚園 | hkbkec.edu.hk | Connection timeout |
| 銅鑼灣維多利亞（海峰園） | cbvictoria.edu.hk | Connection refused |
| 香港聖公會基愛幼兒學校 | kons.edu.hk | Same IP 202.69.67.36 — cluster down |
| 香港聖公會夏瑞芸幼兒學校 | hswns.edu.hk | Same IP 202.69.67.36 — cluster down |
| 香港聖公會東涌幼兒學校 | tcns.edu.hk | Same IP 202.69.67.36 — cluster down |

### Resume checklist

When resuming (~2026-08-01):

1. **Re-enable cron** in `.github/workflows/crawl-school-website.yml` — uncomment the `schedule` block
2. **Re-verify dead domains** — run `node scripts/diag/dns_check_school_websites.mjs` to see if the 6 dead domains have recovered
3. **Run Top100 crawler** — `node scripts/xhs/build_internal_priority_school_top100.py` then crawl
4. **Evaluate Phase 2 stealth** — if strong 403 schools (anchors.edu.hk, stcatherines.edu.hk, etc.) still fail, consider `@rebrowser/playwright` or manual capture
5. **Run retry queue** — `node scripts/xhs/retry_priority_top100_queue.mjs` on the 36-school retry pool

### Key files changed

| File | Change |
|------|--------|
| `scripts/crawlers/school-website-domain-policies.mjs` | +18 domain policies (Phase 1+4) |
| `scripts/crawlers/school-website.mjs` | `loadPlaywright` + `fetchHtmlWithPlaywright` rewritten for stealth |
| `.github/workflows/crawl-school-website.yml` | Cron paused; deps changed to `npm install` + playwright browser |
| `scripts/diag/dns_check_school_websites.mjs` | New diagnostic tool |
| `package.json` | +`playwright-extra`, +`puppeteer-extra-plugin-stealth` (devDeps) |