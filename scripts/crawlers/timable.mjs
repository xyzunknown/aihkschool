#!/usr/bin/env node
/**
 * Timable.com kids activities pipeline
 *
 * Data source: Timable public GraphQL API (POST https://timable.com/api/GraphQL)
 * 香港最大活動聚合平台，涵蓋康文署、社福機構、私人主辦方的活動
 * 公開 GraphQL，introspection 開放，無需 API key
 *
 * Pipeline:
 *   1. 分頁查詢「親子」類別的未來活動
 *   2. 映射 Timable 字段 → activities 表 schema
 *   3. Upsert 到 Supabase（軟刪舊 timable 條目，插入新批次）
 *
 * Usage:
 *   node scripts/crawlers/timable.mjs [--dry-run] [--limit N]
 *
 * Env vars (non-dry-run):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    limit: { type: "string", default: "200" },
  },
});

const DRY_RUN = args["dry-run"];
const LIMIT = parseInt(args.limit, 10) || 200;

const GRAPHQL_URL = "https://timable.com/api/GraphQL";
const TIMABLE_BASE = "https://timable.com/hk/event";

// ─── Timable 親子 category ID ──────────────────────────────────────────────
const KIDS_CATEGORY_ID = "63ad67db21d85bceb5e95458";

// ─── GraphQL query ─────────────────────────────────────────────────────────
const EVENTS_QUERY = `
query GetKidsEvents($limit: Int!, $page: Int!, $after: DateTime!) {
  Events(
    limit: $limit
    page: $page
    locale: zh
    where: {
      region: { equals: hk }
      status: { equals: "published" }
      latestEndDate: { greater_than_equal: $after }
      criteria__categories: { in: [$kidsId] }
    }
    sort: "earliestStartDate"
  ) {
    totalDocs
    totalPages
    docs {
      id
      name
      permalink
      free
      earliestStartDate
      latestEndDate
      thumbnail { url }
      creator { name }
      contact { phone page email }
      fees { fee remark }
      criteria {
        categories { id name }
        audiences { name }
        tags { name }
      }
      sections {
        startDatetime
        endDatetime
        address
        district { name }
        location {
          name
          address
          district { name }
        }
      }
    }
  }
}
`.replace("$kidsId", `"${KIDS_CATEGORY_ID}"`);

// ─── District mapping: Timable Chinese → our 18-district enum ──────────────
const DISTRICT_MAP = {
  中區: "central_and_western",
  中西區: "central_and_western",
  上環: "central_and_western",
  中環: "central_and_western",
  西營盤: "central_and_western",
  東區: "eastern",
  北角: "eastern",
  鰂魚涌: "eastern",
  柴灣: "eastern",
  筲箕灣: "eastern",
  南區: "southern",
  香港仔: "southern",
  赤柱: "southern",
  薄扶林: "southern",
  灣仔: "wan_chai",
  灣仔區: "wan_chai",
  銅鑼灣: "wan_chai",
  九龍城: "kowloon_city",
  九龍城區: "kowloon_city",
  紅磡: "kowloon_city",
  何文田: "kowloon_city",
  九龍塘: "kowloon_city",
  土瓜灣: "kowloon_city",
  觀塘: "kwun_tong",
  觀塘區: "kwun_tong",
  藍田: "kwun_tong",
  深水埗: "sham_shui_po",
  深水埗區: "sham_shui_po",
  長沙灣: "sham_shui_po",
  黃大仙: "wong_tai_sin",
  黃大仙區: "wong_tai_sin",
  鑽石山: "wong_tai_sin",
  慈雲山: "wong_tai_sin",
  油尖旺: "yau_tsim_mong",
  油尖旺區: "yau_tsim_mong",
  尖沙咀: "yau_tsim_mong",
  旺角: "yau_tsim_mong",
  佐敦: "yau_tsim_mong",
  油麻地: "yau_tsim_mong",
  離島: "islands",
  離島區: "islands",
  大嶼山: "islands",
  東涌: "islands",
  葵青: "kwai_tsing",
  葵青區: "kwai_tsing",
  葵涌: "kwai_tsing",
  青衣: "kwai_tsing",
  荃灣: "tsuen_wan",
  荃灣區: "tsuen_wan",
  北區: "north",
  上水: "north",
  粉嶺: "north",
  西貢: "sai_kung",
  西貢區: "sai_kung",
  將軍澳: "sai_kung",
  沙田: "sha_tin",
  沙田區: "sha_tin",
  馬鞍山: "sha_tin",
  大埔: "tai_po",
  大埔區: "tai_po",
  屯門: "tuen_mun",
  屯門區: "tuen_mun",
  元朗: "yuen_long",
  元朗區: "yuen_long",
  天水圍: "yuen_long",
};

// ─── Category mapping: Timable categories → our enum ───────────────────────
const CATEGORY_MAP = {
  音樂: "music",
  劇場: "drama",
  親子: "other", // fallback — will be overridden if a more specific cat exists
  運動: "sports",
  展覽: "art",
  體驗: "other",
  電影: "other",
  飲食: "other",
  節日: "other",
  盛事: "other",
  優惠: "other",
  慈善: "other",
  環保: "other",
  網上: "other",
  增值: "language", // 增值 often means courses/workshops
  市集: "other",
  商場: "other",
  旅遊: "other",
  寵物友善: "other",
  次文化: "other",
  賽馬娛樂: "other",
  文化節: "other",
};

function mapCategory(categories) {
  if (!categories || categories.length === 0) return "other";
  // Prefer specific category over 親子
  for (const c of categories) {
    if (c.name !== "親子" && CATEGORY_MAP[c.name]) {
      return CATEGORY_MAP[c.name];
    }
  }
  return "other";
}

function mapDistrict(districtName) {
  if (!districtName) return null;
  return DISTRICT_MAP[districtName] || DISTRICT_MAP[districtName.replace("區", "")] || null;
}

function extractDistrict(doc) {
  // Try section-level district first, then location-level
  const s = doc.sections?.[0];
  if (!s) return null;
  const name = s.district?.name || s.location?.district?.name || null;
  if (name) return mapDistrict(name);

  // Fallback: try to infer district from address text
  const addr = s.address || s.location?.address || "";
  for (const [keyword, district] of Object.entries(DISTRICT_MAP)) {
    if (addr.includes(keyword)) return district;
  }
  return null;
}

function extractAddress(doc) {
  const s = doc.sections?.[0];
  if (!s) return null;
  return s.address || s.location?.address || s.location?.name || null;
}

function extractFee(doc) {
  if (doc.free) return 0;
  if (!doc.fees || doc.fees.length === 0) return null;
  // Take the lowest fee
  const valid = doc.fees.filter((f) => f.fee !== null && f.fee !== undefined);
  if (valid.length === 0) return null;
  return Math.min(...valid.map((f) => f.fee));
}

function extractFeeNote(doc) {
  if (doc.free) return null;
  if (!doc.fees || doc.fees.length === 0) return null;
  // If multiple price tiers, show range
  const valid = doc.fees.filter((f) => f.fee !== null);
  if (valid.length <= 1) return valid[0]?.remark || null;
  const prices = valid.map((f) => f.fee).sort((a, b) => a - b);
  const remarks = [...new Set(valid.map((f) => f.remark).filter(Boolean))];
  const range = prices[0] === prices[prices.length - 1]
    ? null
    : `$${prices[0]}-$${prices[prices.length - 1]}`;
  return [range, ...remarks].filter(Boolean).join(" · ") || null;
}

function parseDate(isoStr) {
  if (!isoStr) return null;
  return isoStr.split("T")[0];
}

function toHKT(date) {
  // HKT = UTC+8
  return new Date(date.getTime() + 8 * 60 * 60 * 1000);
}

function buildSchedule(doc) {
  if (!doc.sections || doc.sections.length === 0) return null;
  const s = doc.sections[0];
  if (!s.startDatetime) return null;
  const start = toHKT(new Date(s.startDatetime));
  const end = s.endDatetime ? toHKT(new Date(s.endDatetime)) : null;
  const timeStr = `${start.getUTCHours().toString().padStart(2, "0")}:${start.getUTCMinutes().toString().padStart(2, "0")}`;
  if (end) {
    const endStr = `${end.getUTCHours().toString().padStart(2, "0")}:${end.getUTCMinutes().toString().padStart(2, "0")}`;
    return `${timeStr}-${endStr}`;
  }
  return timeStr;
}

function transformEvent(doc) {
  const timableUrl = `${TIMABLE_BASE}/${doc.permalink}`;

  return {
    title: doc.name || "Timable 活動",
    category: mapCategory(doc.criteria?.categories),
    organizer: doc.creator?.name || null,
    district: extractDistrict(doc),
    address: extractAddress(doc),
    description: doc.criteria?.tags?.map((t) => t.name).join("、") || null,
    age_min: null, // Timable doesn't expose age range — all are 親子 filtered
    age_max: null,
    fee: extractFee(doc),
    fee_note: extractFeeNote(doc),
    start_date: parseDate(doc.earliestStartDate),
    end_date: parseDate(doc.latestEndDate),
    schedule: buildSchedule(doc),
    contact_phone: doc.contact?.phone || null,
    contact_url: doc.contact?.page || timableUrl,
    image_url: doc.thumbnail?.url || null,
    source: "timable",
    source_url: timableUrl,
    raw_extracted: {
      timable_id: doc.id,
      permalink: doc.permalink,
      categories: doc.criteria?.categories?.map((c) => c.name) || [],
      audiences: doc.criteria?.audiences?.map((a) => a.name) || [],
      tags: doc.criteria?.tags?.map((t) => t.name) || [],
      fees: doc.fees || [],
      sections_count: doc.sections?.length || 0,
    },
    match_confidence: "high",
    is_active: true,
  };
}

// ─── GraphQL fetch with pagination ─────────────────────────────────────────
async function fetchAllEvents() {
  const today = new Date().toISOString();
  const PER_PAGE = 50;
  const allDocs = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    console.log(`[timable] fetching page ${page}/${totalPages}`);
    const resp = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "HKSchoolPlace/1.0 (open data consumer)",
      },
      body: JSON.stringify({
        query: EVENTS_QUERY,
        variables: {
          limit: PER_PAGE,
          page,
          after: today,
        },
      }),
    });

    if (!resp.ok) {
      throw new Error(`GraphQL HTTP ${resp.status}: ${await resp.text()}`);
    }

    const json = await resp.json();
    if (json.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    const events = json.data.Events;
    totalPages = events.totalPages || 1;
    allDocs.push(...events.docs);

    if (LIMIT > 0 && allDocs.length >= LIMIT) {
      allDocs.length = LIMIT;
      break;
    }

    page++;
  }

  return allDocs;
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log(`[timable] starting — limit=${LIMIT} dry-run=${DRY_RUN}`);

  const docs = await fetchAllEvents();
  console.log(`[timable] fetched ${docs.length} events from Timable`);

  const batch = docs.map(transformEvent);
  console.log(`[timable] transformed ${batch.length} records`);

  if (DRY_RUN) {
    console.log("[timable] DRY-RUN — sample output (first 3):");
    console.log(JSON.stringify(batch.slice(0, 3), null, 2));
    console.log(`[timable] would upsert ${batch.length} records`);
    return;
  }

  // ─── Upsert to Supabase ────────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error("[timable] NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  // Soft-delete all existing timable rows
  const { error: deactivateErr } = await supabase
    .from("activities")
    .update({ is_active: false })
    .eq("source", "timable");

  if (deactivateErr) {
    console.error("[timable] deactivate failed:", deactivateErr.message);
    process.exit(1);
  }
  console.log("[timable] soft-deleted old timable rows");

  // Insert fresh batch in chunks
  const CHUNK = 50;
  let inserted = 0;
  for (let i = 0; i < batch.length; i += CHUNK) {
    const slice = batch.slice(i, i + CHUNK);
    const { error: insertErr } = await supabase.from("activities").insert(slice);
    if (insertErr) {
      console.error(`[timable] insert chunk ${i} failed:`, insertErr.message);
    } else {
      inserted += slice.length;
    }
  }

  console.log(`[timable] done — inserted=${inserted} / ${batch.length}`);
}

main().catch((err) => {
  console.error("[timable] fatal:", err);
  process.exit(1);
});
