# Activities Crawler Pipeline

AI-driven data pipeline for the `activities` table. **No manual data entry.**

## Architecture

```
GitHub Actions (weekly cron)
    ↓
lcsd.mjs        → raw_activities.json   (Playwright scrape)
    ↓
extract.mjs     → extracted_activities.json   (Claude Haiku structured extraction)
    ↓
upsert.mjs      → writes to Supabase activities table (service_role)
```

## Why this split

- **Separation of concerns**: scraping failures don't waste API credits; extraction failures don't re-hit the source.
- **Resumable**: each stage writes JSON to `tmp/` so you can rerun any stage alone.
- **Portable**: adding YMCA / 保良局 / 東華三院 only requires a new scraper; extract + upsert are reused.

## Local development

```bash
# One-time
npm install --save-dev playwright @anthropic-ai/sdk tsx dotenv
npx playwright install chromium

# Run the pipeline
export ANTHROPIC_API_KEY=...
export NEXT_PUBLIC_SUPABASE_URL=...
export SUPABASE_SERVICE_ROLE_KEY=...

node scripts/crawlers/lcsd.mjs --limit 10
node scripts/crawlers/extract.mjs --input tmp/raw_activities.json
node scripts/crawlers/upsert.mjs --input tmp/extracted_activities.json --dry-run
```

## Data sources

| Source | Script | Cadence | Notes |
|---|---|---|---|
| 康樂及文化事務署 (LCSD) | `lcsd.mjs` | Weekly | Best structured source, age 3-6 children classes |
| YMCA | _planned_ | Weekly | Static HTML, use Cheerio |
| 保良局 | _planned_ | Weekly | Static HTML |
| 東華三院 | _planned_ | Monthly | Static HTML |

## Prompt caching

The Claude Haiku extractor caches the system prompt + JSON schema (they never change). Only the raw activity text is uncached. This keeps per-record cost under $0.001.
