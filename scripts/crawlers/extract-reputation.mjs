#!/usr/bin/env node
/**
 * Reputation aggregator (v2 — minimal AI)
 *
 * Pipeline:
 *   Stage 1 (pure JS, 0 AI):
 *     - Keyword-frequency based pros/cons tagging
 *     - Sentiment ratio from positive/negative context words
 *     - Quote highlights from top-engagement posts (sanitized)
 *   Stage 2 (optional Haiku):
 *     - 50-150 char reputation_summary from Stage 1 outputs
 *     - Only runs if ANTHROPIC_API_KEY set + --skip-summary not passed
 *
 * Usage:
 *   node scripts/crawlers/extract-reputation.mjs [--dry-run] [--limit N] [--school-id UUID] [--skip-summary]
 *
 * Env vars (non-dry-run):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ANTHROPIC_API_KEY (optional — Stage 2 only)
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Auto-load .env.local
const envPath = resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

import { createClient } from "@supabase/supabase-js";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    limit: { type: "string", default: "0" },
    "school-id": { type: "string", default: "" },
    "min-posts": { type: "string", default: "3" },
    "max-posts-per-school": { type: "string", default: "30" },
    "skip-summary": { type: "boolean", default: false },
  },
});

const DRY_RUN = args["dry-run"];
const LIMIT = parseInt(args.limit, 10) || 0;
const SCHOOL_ID = args["school-id"] || null;
const MIN_POSTS = parseInt(args["min-posts"], 10) || 3;
const MAX_POSTS = parseInt(args["max-posts-per-school"], 10) || 30;
const SKIP_SUMMARY = args["skip-summary"];

// ─── Keyword dictionaries ─────────────────────────────────────────────────

const KEYWORD_DICT = {
  pros: {
    "師資強": ["師資", "老師好", "老師親切", "teacher nice", "有愛心", "教師專業", "老師有耐心", "老師用心"],
    "環境佳": ["環境好", "校舍新", "乾淨", "寬敞", "環境靚", "設施好", "空間大", "playground"],
    "活動多": ["活動多", "興趣班", "課外", "活動豐富", "戶外活動", "多元化", "遊戲學習"],
    "功課適中": ["功課少", "功課適中", "壓力小", "唔催谷", "happy school", "愉快學習"],
    "面試友好": ["面試輕鬆", "面試友善", "唔恐怖", "面試氣氛好", "小朋友唔驚"],
    "語言好": ["英文好", "普通話好", "兩文三語", "語境好", "英語環境"],
    "口碑好": ["口碑好", "多人推薦", "好評", "值得推薦", "滿意"],
    "小班教學": ["小班", "師生比例", "人數少", "小班教學"],
    "銜接好": ["升小好", "銜接", "直升", "派位好", "升學"],
    "交通方便": ["交通方便", "近地鐵", "校車", "接送方便", "方便"],
    "伙食好": ["伙食好", "午餐好", "飲食健康", "餐單好"],
    "課程好": ["課程好", "教學好", "curriculum good", "教學質素"],
    "校長好": ["校長好", "校長親切", "校長用心"],
    "家校溝通": ["溝通好", "家長會", "透明", "通知及時"],
    "管理好": ["管理好", "有規矩", "紀律好"],
  },
  cons: {
    "功課多": ["功課多", "壓力大", "焗書", "催谷", "太多功課", "好多功課"],
    "學費貴": ["學費貴", "太貴", "負擔重", "貴", "收費高"],
    "面試難": ["面試難", "考得深", "篩選嚴", "面試嚴格", "唔易入"],
    "接送不便": ["遠", "交通差", "接送麻煩", "交通不便", "泊車難"],
    "環境差": ["環境差", "校舍舊", "空間小", "殘舊", "窄"],
    "老師流動": ["老師走", "轉老師", "流失", "老師轉"],
    "名額少": ["名額少", "難入", "額滿", "競爭大"],
    "溝通差": ["溝通差", "唔通知", "不透明", "投訴"],
    "膳食差": ["伙食差", "午餐差", "飲食一般"],
    "態度差": ["態度差", "唔友善", "冷淡"],
  },
};

const POSITIVE_CONTEXT = ["鍾意", "讚", "推", "好好", "開心", "滿意", "推薦", "值得", "正", "like", "happy", "excellent", "amazing", "recommend"];
const NEGATIVE_CONTEXT = ["差", "唔recommend", "失望", "後悔", "投訴", "唔好", "不滿", "reject", "bad", "disappointed", "horrible"];

const INTERVIEW_KEYWORDS = ["面試", "interview", "見面", "考試", "group play", "小組遊戲", "個別面見"];

// ─── PII sanitization ─────────────────────────────────────────────────────

function sanitizeText(text) {
  return text
    .replace(/\d{4}\s?\d{4}/g, "[電話]")
    .replace(/[A-Za-z\u4e00-\u9fff]+(路|街|道|大廈|花園|村)\d*[號樓室層]/g, "[地址]")
    .replace(/[\w.]+@[\w.]+\.\w+/g, "[email]");
}

// ─── Stage 1: Pure JS keyword frequency aggregation ───────────────────────

function analyzePostsStage1(posts) {
  const prosCounts = {};
  const consCounts = {};
  let positiveCount = 0;
  let negativeCount = 0;
  let interviewTexts = [];

  for (const post of posts) {
    const text = (post.raw_text || "").toLowerCase();
    const likes = post.raw_metadata?.likes ?? 0;
    const collects = post.raw_metadata?.collects ?? 0;
    post._engagement = likes + collects * 2;

    // Check sentiment context
    const isPositive = POSITIVE_CONTEXT.some((w) => text.includes(w.toLowerCase()));
    const isNegative = NEGATIVE_CONTEXT.some((w) => text.includes(w.toLowerCase()));
    if (isPositive) positiveCount++;
    if (isNegative) negativeCount++;

    // Pros tagging
    for (const [tag, keywords] of Object.entries(KEYWORD_DICT.pros)) {
      const hasKeyword = keywords.some((k) => text.includes(k.toLowerCase()));
      if (hasKeyword && isPositive) {
        prosCounts[tag] = (prosCounts[tag] || 0) + 1;
      }
    }

    // Cons tagging
    for (const [tag, keywords] of Object.entries(KEYWORD_DICT.cons)) {
      const hasKeyword = keywords.some((k) => text.includes(k.toLowerCase()));
      if (hasKeyword) {
        consCounts[tag] = (consCounts[tag] || 0) + 1;
      }
    }

    // Interview mentions
    if (INTERVIEW_KEYWORDS.some((k) => text.includes(k.toLowerCase()))) {
      interviewTexts.push(post.raw_text || "");
    }
  }

  // Sort and limit tags
  const prosTagsSorted = Object.entries(prosCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({ tag, count }));

  const consTagsSorted = Object.entries(consCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({ tag, count }));

  // Sentiment ratio
  const totalSentiment = positiveCount + negativeCount;
  const sentimentPositiveRatio = totalSentiment > 0
    ? Math.round((positiveCount / totalSentiment) * 1000) / 1000
    : 0.5;

  // Quote highlights — top 3 by engagement, sanitized, truncated to 40 chars
  const sortedByEngagement = [...posts]
    .filter((p) => (p.raw_text || "").length > 10)
    .sort((a, b) => (b._engagement || 0) - (a._engagement || 0));

  const quoteHighlights = sortedByEngagement.slice(0, 3).map((p) => {
    let text = sanitizeText(p.raw_text || "");
    if (text.length > 40) text = text.slice(0, 37) + "...";
    return {
      text,
      source_platform: p.platform,
      posted_at: p.posted_at || null,
    };
  });

  // Interview style
  let interviewStyle = null;
  if (interviewTexts.length >= 2) {
    const hasGroup = interviewTexts.some((t) => /小組|group/i.test(t));
    const hasIndividual = interviewTexts.some((t) => /個別|individual|一對一/i.test(t));
    const hasPlay = interviewTexts.some((t) => /遊戲|play/i.test(t));
    const parts = [];
    if (hasGroup) parts.push("設有小組活動");
    if (hasIndividual) parts.push("設有個別面見");
    if (hasPlay) parts.push("以遊戲形式進行");
    if (parts.length > 0) {
      interviewStyle = `面試形式：${parts.join("，")}。（基於 ${interviewTexts.length} 條家長分享）`;
    }
  }

  // Scrape confidence
  const scrapeConfidence = posts.length >= 15 ? "high" : posts.length >= 5 ? "medium" : "low";

  return {
    pros_tags: prosTagsSorted,
    cons_tags: consTagsSorted,
    sentiment_positive_ratio: sentimentPositiveRatio,
    quote_highlights: quoteHighlights,
    interview_style: interviewStyle,
    scrape_confidence: scrapeConfidence,
    _postCount: posts.length,
    _prosTagsSorted: prosTagsSorted,
    _consTagsSorted: consTagsSorted,
  };
}

// ─── Stage 2: Optional Haiku summary ──────────────────────────────────────

async function generateSummaryWithHaiku(schoolName, stage1Result) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const inputText = `學校：${schoolName}
帖文數：${stage1Result._postCount}
優點標籤：${stage1Result.pros_tags.map((t) => `${t.tag}(${t.count})`).join("、") || "無"}
缺點標籤：${stage1Result.cons_tags.map((t) => `${t.tag}(${t.count})`).join("、") || "無"}
正面情緒比：${stage1Result.sentiment_positive_ratio}
面試風格：${stage1Result.interview_style || "未知"}
代表引文：${stage1Result.quote_highlights.map((q) => q.text).join("；") || "無"}`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 300,
        system: "你是幼稚園口碑摘要助手。根據提供的統計數據，寫出 50-150 字的繁體中文口碑摘要。中立客觀，不做商業包裝，不用 emoji。直接輸出摘要文字，不要加標題或前綴。",
        messages: [{ role: "user", content: inputText }],
      }),
    });

    if (!resp.ok) {
      console.warn(`[reputation] Haiku API ${resp.status}, skipping summary`);
      return null;
    }

    const json = await resp.json();
    const text = json.content?.[0]?.text?.trim();
    if (text && text.length >= 20 && text.length <= 300) {
      return text;
    }
    return null;
  } catch (err) {
    console.warn(`[reputation] Haiku error: ${err.message}`);
    return null;
  }
}

// ─── DB ───────────────────────────────────────────────────────────────────

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required");
  }
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

async function loadSchoolsWithPosts(supabase) {
  const { data, error } = await supabase
    .from("social_posts_raw")
    .select("school_matches")
    .limit(10000);

  if (error) throw error;

  const counts = new Map();
  for (const row of data || []) {
    const matches = row.school_matches || [];
    for (const m of matches) {
      if (!m.school_id) continue;
      counts.set(m.school_id, (counts.get(m.school_id) || 0) + 1);
    }
  }

  const eligible = Array.from(counts.entries())
    .filter(([, count]) => count >= MIN_POSTS)
    .sort((a, b) => b[1] - a[1])
    .map(([school_id, count]) => ({ school_id, post_count: count }));

  if (SCHOOL_ID) return eligible.filter((e) => e.school_id === SCHOOL_ID);
  return LIMIT > 0 ? eligible.slice(0, LIMIT) : eligible;
}

async function loadPostsForSchool(supabase, schoolId) {
  const { data, error } = await supabase
    .from("social_posts_raw")
    .select("platform, url, posted_at, raw_text, raw_metadata, school_matches")
    .filter("school_matches", "cs", `[{"school_id":"${schoolId}"}]`)
    .order("posted_at", { ascending: false, nullsFirst: false })
    .limit(MAX_POSTS);

  if (error) throw error;

  return data || [];
}

async function loadSchoolName(supabase, schoolId) {
  const { data, error } = await supabase
    .from("schools")
    .select("name_tc, name_en")
    .eq("id", schoolId)
    .single();

  if (error) return null;
  return data;
}

async function upsertReputation(supabase, schoolId, result, postCountByPlatform) {
  const payload = {
    school_id: schoolId,
    reputation_summary: result.reputation_summary ?? null,
    pros_tags: result.pros_tags ?? [],
    cons_tags: result.cons_tags ?? [],
    interview_style: result.interview_style ?? null,
    quote_highlights: result.quote_highlights ?? [],
    sentiment_positive_ratio: result.sentiment_positive_ratio ?? null,
    source_count_by_platform: postCountByPlatform,
    scrape_confidence: result.scrape_confidence ?? "low",
    reputation_last_updated: new Date().toISOString().split("T")[0],
    last_crawled_at: new Date().toISOString(),
  };

  const { data: existing } = await supabase
    .from("school_enrichments")
    .select("school_id")
    .eq("school_id", schoolId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("school_enrichments")
      .update(payload)
      .eq("school_id", schoolId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("school_enrichments").insert(payload);
    if (error) throw error;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function processSchool(supabase, entry) {
  const { school_id } = entry;
  const schoolMeta = await loadSchoolName(supabase, school_id);
  if (!schoolMeta) {
    console.log(`[reputation] skip ${school_id}: school not found`);
    return { status: "skipped" };
  }

  const posts = await loadPostsForSchool(supabase, school_id);
  if (posts.length < MIN_POSTS) {
    console.log(`[reputation] skip ${schoolMeta.name_tc}: only ${posts.length} posts`);
    return { status: "skipped", reason: "too_few_posts" };
  }

  const countByPlatform = {};
  for (const p of posts) {
    countByPlatform[p.platform] = (countByPlatform[p.platform] || 0) + 1;
  }

  console.log(
    `[reputation] processing: ${schoolMeta.name_tc} (${posts.length} posts, ${JSON.stringify(countByPlatform)})`
  );

  try {
    // Stage 1: Pure JS aggregation
    const stage1 = analyzePostsStage1(posts);

    // Stage 2: Optional Haiku summary
    let reputationSummary = null;
    if (!SKIP_SUMMARY && process.env.ANTHROPIC_API_KEY) {
      reputationSummary = await generateSummaryWithHaiku(schoolMeta.name_tc, stage1);
      if (reputationSummary) {
        console.log(`[reputation]   Haiku summary generated (${reputationSummary.length} chars)`);
      }
    }

    const result = {
      ...stage1,
      reputation_summary: reputationSummary,
    };

    if (DRY_RUN) {
      console.log(`[reputation]   dry-run output:`);
      console.log(JSON.stringify({
        reputation_summary: result.reputation_summary,
        pros_tags: result.pros_tags,
        cons_tags: result.cons_tags,
        interview_style: result.interview_style,
        sentiment_positive_ratio: result.sentiment_positive_ratio,
        scrape_confidence: result.scrape_confidence,
        quote_highlights: result.quote_highlights,
      }, null, 2));
      return { status: "dry_run", result };
    }

    await upsertReputation(supabase, school_id, result, countByPlatform);
    console.log(`[reputation]   upserted (confidence=${result.scrape_confidence})`);
    return { status: "ok", result };
  } catch (err) {
    console.error(`[reputation]   error:`, err.message);
    return { status: "error", error: err.message };
  }
}

async function main() {
  console.log(
    `[reputation] starting — dry-run=${DRY_RUN} limit=${LIMIT || "∞"} min-posts=${MIN_POSTS} skip-summary=${SKIP_SUMMARY}`
  );

  const supabase = getSupabase();
  const eligible = await loadSchoolsWithPosts(supabase);
  console.log(`[reputation] eligible schools (>=${MIN_POSTS} posts): ${eligible.length}`);

  const results = [];
  for (const entry of eligible) {
    results.push(await processSchool(supabase, entry));
  }

  const stats = {
    ok: results.filter((r) => r.status === "ok").length,
    dry_run: results.filter((r) => r.status === "dry_run").length,
    skipped: results.filter((r) => r.status === "skipped").length,
    error: results.filter((r) => r.status === "error").length,
  };
  console.log(`[reputation] done:`, stats);
}

main().catch((err) => {
  console.error("[reputation] fatal:", err);
  process.exit(1);
});
