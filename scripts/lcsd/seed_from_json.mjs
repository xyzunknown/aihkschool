#!/usr/bin/env node
/**
 * One-shot seed script: load data/lcsd/programmes.json into lcsd_programmes.
 *
 * Idempotent: uses upsert on (lcsd_programme_id) unique key.
 * Bypasses the cron endpoint and SmartPLAY feature gate.
 *
 * Usage:
 *   node scripts/lcsd/seed_from_json.mjs
 *   node scripts/lcsd/seed_from_json.mjs --dry-run
 *
 * Env required:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

// Load .env.local manually (node doesn't auto-load it outside Next.js)
const envPath = path.join(ROOT, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      let val = m[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      process.env[m[1]] = val;
    }
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const dryRun = process.argv.includes("--dry-run");
const JSON_PATH = path.join(ROOT, "data", "lcsd", "programmes.json");
if (!fs.existsSync(JSON_PATH)) {
  console.error(`Not found: ${JSON_PATH}`);
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
console.log(`Loaded ${raw.length} programmes from ${JSON_PATH}`);

// Field whitelist must match migration 021 schema
const ALLOWED_CATEGORIES = new Set([
  "swimming", "music", "dance", "art", "sport", "parent_child", "other",
]);
const ALLOWED_DISTRICTS = new Set([
  "central_and_western", "eastern", "southern", "wan_chai",
  "kowloon_city", "kwun_tong", "sham_shui_po", "wong_tai_sin", "yau_tsim_mong",
  "islands", "kwai_tsing", "north", "sai_kung", "sha_tin",
  "tai_po", "tsuen_wan", "tuen_mun", "yuen_long",
]);

let skippedBadCategory = 0;
let skippedBadDistrict = 0;
const rows = raw.map((p) => {
  const category = ALLOWED_CATEGORIES.has(p.category) ? p.category : null;
  if (p.category && !category) skippedBadCategory++;
  const district = ALLOWED_DISTRICTS.has(p.district) ? p.district : null;
  if (p.district && !district) skippedBadDistrict++;
  return {
    lcsd_programme_id: p.lcsd_programme_id,
    name_zh: p.name_zh ?? null,
    name_en: p.name_en ?? null,
    category,
    age_min: typeof p.age_min === "number" ? p.age_min : null,
    age_max: typeof p.age_max === "number" ? p.age_max : null,
    venue: p.venue ?? null,
    district,
    fee_hkd: typeof p.fee_hkd === "number" ? p.fee_hkd : null,
    sessions_count: typeof p.sessions_count === "number" ? p.sessions_count : null,
    start_date: p.start_date ?? null,
    end_date: p.end_date ?? null,
    enrolment_open_at: p.enrolment_open_at ?? null,
    enrolment_close_at: p.enrolment_close_at ?? null,
    raw_url: p.raw_url ?? null,
    is_active: true,
    last_scraped_at: p.last_scraped_at ?? new Date().toISOString(),
  };
}).filter((r) => r.lcsd_programme_id);

console.log(`Prepared ${rows.length} rows  (skipped: ${raw.length - rows.length})`);
if (skippedBadCategory) console.log(`  ↪ category set to null on ${skippedBadCategory} rows (not in CHECK list)`);
if (skippedBadDistrict) console.log(`  ↪ district set to null on ${skippedBadDistrict} rows (not in CHECK list)`);

if (dryRun) {
  console.log("DRY RUN — first 3 rows:");
  console.log(JSON.stringify(rows.slice(0, 3), null, 2));
  process.exit(0);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// chunk upserts to avoid request-body limits
const CHUNK_SIZE = 200;
let upserted = 0;
let failed = 0;
for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
  const chunk = rows.slice(i, i + CHUNK_SIZE);
  const { error } = await supabase
    .from("lcsd_programmes")
    .upsert(chunk, { onConflict: "lcsd_programme_id" });
  if (error) {
    failed += chunk.length;
    console.error(`Chunk ${i}-${i + chunk.length} failed:`, error.message);
  } else {
    upserted += chunk.length;
    process.stdout.write(`  upserted ${upserted}/${rows.length}\r`);
  }
}
console.log(`\nDone: ${upserted} upserted, ${failed} failed`);

// Sanity query
const { count, error: countErr } = await supabase
  .from("lcsd_programmes")
  .select("*", { count: "exact", head: true });
if (countErr) {
  console.error("Count check failed:", countErr.message);
} else {
  console.log(`lcsd_programmes total rows in DB: ${count}`);
}

const { data: futureSample } = await supabase
  .from("lcsd_programmes")
  .select("lcsd_programme_id, name_zh, enrolment_open_at, district")
  .gte("enrolment_open_at", new Date().toISOString())
  .order("enrolment_open_at", { ascending: true })
  .limit(5);
console.log("Next 5 upcoming enrolments:");
console.table(futureSample ?? []);
