#!/usr/bin/env node
/**
 * LCSD (康樂及文化事務署) activities pipeline
 *
 * Data source: https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json
 * Official open data — no scraping, no Playwright, no Claude API needed.
 * Updated on the 15th of each month with activities ~1.5 months ahead.
 *
 * Pipeline:
 *   1. Fetch JSON from LCSD open data URL
 *   2. Filter for kid-friendly activities (MIN_AGE <= 8)
 *   3. Map LCSD fields → activities table schema
 *   4. Upsert to Supabase (soft-delete stale, insert fresh)
 *
 * Usage:
 *   node scripts/crawlers/lcsd.mjs [--dry-run] [--limit N]
 *
 * Env vars:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    limit: { type: "string", default: "0" }, // 0 = no limit
  },
});

const DRY_RUN = args["dry-run"];
const LIMIT = parseInt(args.limit, 10) || 0;

const LCSD_JSON_URL =
  "https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json";

// ─── District mapping: LCSD Chinese name → our enum ────────────────────────
const DISTRICT_MAP = {
  中西區: "central_and_western",
  東區: "eastern",
  南區: "southern",
  灣仔: "wan_chai",
  灣仔區: "wan_chai",
  九龍城: "kowloon_city",
  九龍城區: "kowloon_city",
  觀塘: "kwun_tong",
  觀塘區: "kwun_tong",
  深水埗: "sham_shui_po",
  深水埗區: "sham_shui_po",
  黃大仙: "wong_tai_sin",
  黃大仙區: "wong_tai_sin",
  油尖旺: "yau_tsim_mong",
  油尖旺區: "yau_tsim_mong",
  離島: "islands",
  離島區: "islands",
  葵青: "kwai_tsing",
  葵青區: "kwai_tsing",
  北區: "north",
  西貢: "sai_kung",
  西貢區: "sai_kung",
  沙田: "sha_tin",
  沙田區: "sha_tin",
  大埔: "tai_po",
  大埔區: "tai_po",
  荃灣: "tsuen_wan",
  荃灣區: "tsuen_wan",
  屯門: "tuen_mun",
  屯門區: "tuen_mun",
  元朗: "yuen_long",
  元朗區: "yuen_long",
};

// ─── Category mapping: LCSD activity type → our enum ───────────────────────
const CATEGORY_MAP = {
  // Music
  音樂: "music",
  鋼琴: "music",
  小提琴: "music",
  結他: "music",
  長笛: "music",
  // Dance
  舞蹈: "dance",
  芭蕾舞: "dance",
  中國舞: "dance",
  跳舞: "dance",
  多項舞蹈: "dance",
  舞蹈比賽: "dance",
  // Art
  美術: "art",
  繪畫: "art",
  陶藝: "art",
  工藝: "art",
  // Drama
  戲劇: "drama",
  話劇: "drama",
  // Language
  英語: "language",
  普通話: "language",
  // STEM
  科學: "stem",
  STEM: "stem",
  機械人: "stem",
  // Sports (most LCSD activities)
  足球: "sports",
  籃球: "sports",
  排球: "sports",
  羽毛球: "sports",
  乒乓球: "sports",
  網球: "sports",
  游泳: "sports",
  田徑: "sports",
  體操: "sports",
  跆拳道: "sports",
  武術: "sports",
  太極: "sports",
  柔道: "sports",
  瑜伽: "sports",
  壁球: "sports",
  划艇: "sports",
  皮划艇: "sports",
  獨木舟: "sports",
  滾軸溜冰: "sports",
  劍擊: "sports",
  箭藝: "sports",
  射箭: "sports",
  保齡球: "sports",
  桌球: "sports",
  高爾夫: "sports",
  欖球: "sports",
  手球: "sports",
  曲棍球: "sports",
  冰球: "sports",
  棒球: "sports",
  壘球: "sports",
  木球: "sports",
  沙灘排球: "sports",
  健身: "sports",
  攀石: "sports",
  滑浪風帆: "sports",
  龍舟: "sports",
  堆沙: "sports",
};

function mapCategory(actTypeName) {
  if (!actTypeName) return "other";
  // Exact match first
  if (CATEGORY_MAP[actTypeName]) return CATEGORY_MAP[actTypeName];
  // Partial match
  for (const [key, val] of Object.entries(CATEGORY_MAP)) {
    if (actTypeName.includes(key)) return val;
  }
  return "sports"; // LCSD is mostly sports; fallback
}

function mapDistrict(tcDistrict) {
  if (!tcDistrict) return null;
  return DISTRICT_MAP[tcDistrict] || DISTRICT_MAP[tcDistrict.replace("區", "")] || null;
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  // Format: "2024-01-07 00:00:00"
  return dateStr.split(" ")[0] || null;
}

function parseAge(val) {
  if (val === null || val === undefined || val === "") return null;
  const n = parseInt(String(val), 10);
  return isNaN(n) ? null : n;
}

function parseFee(val) {
  if (val === null || val === undefined || val === "") return null;
  const n = parseFloat(String(val));
  return isNaN(n) ? null : n;
}

function buildSchedule(record) {
  const parts = [];
  if (record.TC_DAY) parts.push(record.TC_DAY);
  if (record.PGM_START_TIME && record.PGM_END_TIME) {
    parts.push(`${record.PGM_START_TIME}-${record.PGM_END_TIME}`);
  }
  return parts.join(" ") || null;
}

function transformRecord(r) {
  const minAge = parseAge(r.MIN_AGE);
  const maxAge = parseAge(r.MAX_AGE);
  const startDate = parseDate(r.PGM_START_DATE);
  const endDate = parseDate(r.PGM_END_DATE);

  // Build description from notes
  const notes = [r.TC_NOTES_1, r.TC_NOTES_2].filter(Boolean).join("。");

  return {
    title: r.TC_PGM_NAME || r.EN_PGM_NAME || "康文署活動",
    category: mapCategory(r.TC_ACT_TYPE_NAME),
    organizer: "康樂及文化事務署",
    district: mapDistrict(r.TC_DISTRICT),
    address: r.TC_VENUE || null,
    description: notes || null,
    age_min: minAge === 0 ? null : minAge, // 0 typically means "no lower limit"
    age_max: maxAge === 99 ? null : maxAge, // 99 typically means "no upper limit"
    fee: parseFee(r.FEE),
    fee_note: null,
    start_date: startDate,
    end_date: endDate && endDate !== startDate ? endDate : null,
    schedule: buildSchedule(r),
    contact_phone: null,
    contact_url: r.TC_URL || null,
    source: "lcsd",
    source_url: r.TC_URL || null,
    raw_extracted: r,
    match_confidence: "high",
    is_active: true,
  };
}

async function main() {
  console.log(`[lcsd] fetching ${LCSD_JSON_URL}`);
  const resp = await fetch(LCSD_JSON_URL, {
    headers: {
      "User-Agent":
        "HKSchoolPlace/1.0 (https://hkschoolplace.com; open data consumer)",
      Accept: "application/json",
    },
  });

  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} from LCSD JSON endpoint`);
  }

  const raw = await resp.json();
  console.log(`[lcsd] downloaded ${raw.length} total records`);

  // Filter: kid-friendly = MIN_AGE <= 8 (generous upper bound to catch "3-8", "0-6", etc.)
  // We keep MAX_AGE >= 3 so we don't include adult-only programmes
  const kidRecords = raw.filter((r) => {
    const minAge = parseAge(r.MIN_AGE);
    const maxAge = parseAge(r.MAX_AGE);
    // Must have age data
    if (minAge === null && maxAge === null) return true; // no restriction = include
    // Exclude clearly adult-only (MIN_AGE >= 12)
    if (minAge !== null && minAge >= 12) return false;
    // Include if MAX_AGE >= 3 (overlaps with kids)
    if (maxAge !== null && maxAge < 3) return false;
    return true;
  });

  console.log(`[lcsd] ${kidRecords.length} kid-friendly records (age filter)`);

  // Filter: only upcoming activities (start_date >= today or null)
  const today = new Date().toISOString().split("T")[0];
  const upcoming = kidRecords.filter((r) => {
    const end = parseDate(r.PGM_END_DATE);
    if (!end) return true;
    return end >= today;
  });

  console.log(`[lcsd] ${upcoming.length} upcoming records`);

  let batch = upcoming.map(transformRecord);
  if (LIMIT > 0) batch = batch.slice(0, LIMIT);

  if (DRY_RUN) {
    console.log(`[lcsd] DRY-RUN — sample output (first 3):`);
    console.log(JSON.stringify(batch.slice(0, 3), null, 2));
    console.log(`[lcsd] would upsert ${batch.length} records`);
    return;
  }

  // ─── Upsert to Supabase ──────────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error(
      "[lcsd] NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required",
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  // Soft-delete all existing LCSD rows (exclude manual seed)
  const { error: deactivateErr } = await supabase
    .from("activities")
    .update({ is_active: false })
    .eq("source", "lcsd");

  if (deactivateErr) {
    console.error("[lcsd] deactivate failed:", deactivateErr.message);
    process.exit(1);
  }
  console.log("[lcsd] soft-deleted old LCSD rows");

  // Insert fresh batch in chunks
  const CHUNK = 50;
  let inserted = 0;
  for (let i = 0; i < batch.length; i += CHUNK) {
    const slice = batch.slice(i, i + CHUNK);
    const { error: insertErr } = await supabase.from("activities").insert(slice);
    if (insertErr) {
      console.error(`[lcsd] insert chunk ${i} failed:`, insertErr.message);
      // Continue — don't abort the whole batch on a partial failure
    } else {
      inserted += slice.length;
    }
  }

  console.log(`[lcsd] done — inserted=${inserted} / ${batch.length}`);
}

main().catch((err) => {
  console.error("[lcsd] fatal:", err);
  process.exit(1);
});
