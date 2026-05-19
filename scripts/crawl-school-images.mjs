#!/usr/bin/env node
/**
 * Crawl official school images and generate app-ready fallbacks.
 *
 * Outputs:
 * - public/images/schools/<school_code>.webp
 * - data/school_images_manifest.json
 */

import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import * as cheerio from "cheerio";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const root = process.cwd();

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const rawLine of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(path.join(root, ".env.local"));

const { values: args } = parseArgs({
  options: {
    concurrency: { type: "string", default: "4" },
    limit: { type: "string", default: "0" },
    "school-codes": { type: "string", default: "" },
    "generate-missing": { type: "boolean", default: false },
    "fallback-samples": { type: "boolean", default: false },
    "generate-limit": { type: "string", default: "0" },
    "force": { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
});

const CONCURRENCY = Math.max(1, parseInt(args.concurrency, 10) || 4);
const LIMIT = Math.max(0, parseInt(args.limit, 10) || 0);
const GENERATE_LIMIT = Math.max(0, parseInt(args["generate-limit"], 10) || 0);
const SCHOOL_CODES = args["school-codes"]
  ? new Set(args["school-codes"].split(",").map((code) => code.trim()).filter(Boolean))
  : null;
const GENERATE_MISSING = Boolean(args["generate-missing"]);
const FALLBACK_SAMPLES = Boolean(args["fallback-samples"]);
const FORCE = Boolean(args.force);
const DRY_RUN = Boolean(args["dry-run"]);

const outputDir = path.join(root, "public", "images", "schools");
const manifestPath = path.join(root, "data", "school_images_manifest.json");
const schoolandSnapshotPath = path.join(root, "data", "schooland_kg_snapshot.rematched.json");
const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const htmlTimeoutMs = 16000;
const imageTimeoutMs = 18000;

function normalizeWebsite(website) {
  const trimmed = String(website || "").trim();
  if (!trimmed || trimmed.toUpperCase() === "N.A.") return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function scoreImageUrl(url) {
  const value = url.toLowerCase();
  let score = 0;
  if (/\.(jpe?g|png|webp)(\?|#|$)/.test(value)) score += 20;
  if (/banner|hero|campus|school|kindergarten|classroom|environment|about|facility|gallery|cover/.test(value)) score += 18;
  if (/logo|icon|favicon|sprite|wechat|whatsapp|facebook|instagram|youtube|qr|qrcode|emoji|loading|avatar/.test(value)) score -= 60;
  if (/thumbnail|thumb|small|150x|100x|80x|50x/.test(value)) score -= 12;
  if (/1920|1600|1536|1280|1200|1024|large|full/.test(value)) score += 10;
  return score;
}

function parseSrcset(srcset) {
  return String(srcset || "")
    .split(",")
    .map((part) => part.trim().split(/\s+/)[0])
    .filter(Boolean);
}

function collectImageCandidates(html, baseUrl) {
  const $ = cheerio.load(html);
  const urls = [];
  const add = (value) => {
    const raw = String(value || "").trim();
    if (!raw || raw.startsWith("data:") || raw.startsWith("blob:")) return;
    try {
      urls.push(new URL(raw, baseUrl).toString());
    } catch {
      // Ignore malformed image references.
    }
  };

  add($("meta[property='og:image']").attr("content"));
  add($("meta[name='twitter:image']").attr("content"));
  $("img").each((_, el) => {
    add($(el).attr("src"));
    add($(el).attr("data-src"));
    add($(el).attr("data-lazy-src"));
    for (const src of parseSrcset($(el).attr("srcset"))) add(src);
    for (const src of parseSrcset($(el).attr("data-srcset"))) add(src);
  });

  const backgroundRegex = /background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/gi;
  for (const match of html.matchAll(backgroundRegex)) add(match[1]);

  const seen = new Set();
  return urls
    .filter((url) => {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol);
    })
    .filter((url) => {
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    })
    .sort((a, b) => scoreImageUrl(b) - scoreImageUrl(a))
    .slice(0, 10);
}

async function fetchWithTimeout(url, timeoutMs, accept) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": userAgent,
        "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8",
        Accept: accept,
      },
      redirect: "follow",
      signal: ctrl.signal,
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchHtml(url) {
  const response = await fetchWithTimeout(
    url,
    htmlTimeoutMs,
    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  );
  const type = response.headers.get("content-type") || "";
  if (!response.ok || !/text\/html|text\/plain|application\/xhtml\+xml/i.test(type)) {
    throw new Error(`home page unavailable (${response.status})`);
  }
  return { html: await response.text(), finalUrl: response.url };
}

async function fetchImage(url) {
  const response = await fetchWithTimeout(url, imageTimeoutMs, "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8");
  const type = response.headers.get("content-type") || "";
  if (!response.ok || !/image\//i.test(type)) {
    throw new Error(`not an image (${response.status})`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 4000) throw new Error("image too small");
  return bytes;
}

async function optimizeImage(buffer, outputPath) {
  const image = sharp(buffer, { limitInputPixels: 60_000_000 });
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height || metadata.width < 320 || metadata.height < 220) {
    throw new Error("image dimensions too small");
  }

  await image
    .resize(1200, 675, { fit: "cover", position: "attention" })
    .modulate({ brightness: 1.02, saturation: 1.04 })
    .sharpen({ sigma: 0.5 })
    .webp({ quality: 84 })
    .toFile(outputPath);
}

async function writeSampleFallback(school, outputPath) {
  const samples = [
    path.join(root, "public", "brand", "schools", "sample-1.jpg"),
    path.join(root, "public", "brand", "schools", "sample-2.jpg"),
    path.join(root, "public", "brand", "schools", "sample-3.jpg"),
    path.join(root, "public", "brand", "schools", "sample-4.jpg"),
  ].filter((file) => existsSync(file));
  if (samples.length === 0) throw new Error("fallback samples missing");
  const numeric = Number(String(school.school_code).replace(/\D/g, "")) || 0;
  const sample = samples[numeric % samples.length];
  await optimizeImage(await readFile(sample), outputPath);
  return sample;
}

function generatedPrompt(school) {
  const name = school.name_en || school.name_tc;
  const district = String(school.district || "Hong Kong").replaceAll("_", " ");
  return [
    "Create a polished app-ready image for a Hong Kong kindergarten school card.",
    `A welcoming kindergarten entrance or classroom atmosphere inspired by ${name} in ${district}.`,
    "Bright realistic editorial photography style, warm daylight, clean and premium but believable.",
    "No readable text, no logos, no people, no watermark. 16:9 composition.",
  ].join(" ");
}

async function generateImage(school, outputPath) {
  const baseUrl = process.env.OPENAI_IMAGE_BASE_URL ?? process.env.OPENAI_BASE_URL;
  const apiKey = process.env.OPENAI_IMAGE_API_KEY ?? process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2";
  if (!baseUrl || !apiKey) throw new Error("image generation env missing");

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt: generatedPrompt(school),
      size: "1536x1024",
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error?.message ?? payload?.error ?? `${response.status} ${response.statusText}`;
    throw new Error(`generation failed: ${message}`);
  }
  const b64 = payload?.data?.[0]?.b64_json;
  if (!b64) throw new Error("generation response missing image");
  await optimizeImage(Buffer.from(b64, "base64"), outputPath);
}

async function loadSchoolsFromSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env missing");
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("schools")
    .select("id, school_code, name_tc, name_en, district, website, is_active")
    .eq("is_active", true)
    .order("school_code", { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

async function loadSchoolsFromSeed() {
  const sql = await readFile(path.join(root, "supabase", "seed", "001_schools.sql"), "utf8");
  const rows = [];
  const regex = /VALUES\s*\(([\s\S]*?)\)\s*ON CONFLICT/g;
  for (const match of sql.matchAll(regex)) {
    const values = match[1];
    const fields = [];
    let current = "";
    let quote = false;
    for (let i = 0; i < values.length; i += 1) {
      const char = values[i];
      if (char === "'" && values[i + 1] === "'") {
        current += "'";
        i += 1;
        continue;
      }
      if (char === "'") {
        quote = !quote;
        continue;
      }
      if (char === "," && !quote) {
        fields.push(current.trim());
        current = "";
        continue;
      }
      current += char;
    }
    fields.push(current.trim());
    rows.push({
      id: null,
      school_code: fields[0],
      name_tc: fields[1],
      name_en: fields[2],
      district: fields[3],
      website: fields[8] === "NULL" ? null : fields[8],
      is_active: fields[17] === "true",
    });
  }
  return rows.filter((row) => row.is_active);
}

async function loadSchools() {
  try {
    return await loadSchoolsFromSupabase();
  } catch (error) {
    console.warn(`[schools] Supabase load failed, falling back to seed: ${error.message}`);
    return loadSchoolsFromSeed();
  }
}

async function readExistingManifest() {
  try {
    const text = await readFile(manifestPath, "utf8");
    return JSON.parse(text);
  } catch {
    return { generated_at: null, items: [] };
  }
}

async function loadSchoolandPhotos() {
  try {
    const rows = JSON.parse(await readFile(schoolandSnapshotPath, "utf8"));
    const byCode = new Map();
    for (const row of rows) {
      if (!row?.matched_school_code || !row?.photo_url) continue;
      byCode.set(String(row.matched_school_code), {
        photo_url: row.photo_url,
        detail_url: row.detail_url || row.canonical_url || null,
      });
    }
    return byCode;
  } catch {
    return new Map();
  }
}

async function processSchool(school, index, total, generateState, schoolandPhotos) {
  const outputPath = path.join(outputDir, `${school.school_code}.webp`);
  const publicUrl = `/images/schools/${school.school_code}.webp`;
  if (!FORCE && existsSync(outputPath)) {
    return { school_code: school.school_code, name_tc: school.name_tc, image_url: publicUrl, status: "skipped_existing" };
  }

  const website = normalizeWebsite(school.website);
  const baseResult = {
    school_code: school.school_code,
    name_tc: school.name_tc,
    name_en: school.name_en,
    website,
    image_url: null,
    source_url: null,
    status: "failed",
    error: null,
  };

  if (DRY_RUN) {
    return { ...baseResult, status: website ? "dry_run_ready" : "dry_run_no_website" };
  }

  if (website) {
    try {
      const { html, finalUrl } = await fetchHtml(website);
      const candidates = collectImageCandidates(html, finalUrl);
      for (const candidate of candidates) {
        try {
          const buffer = await fetchImage(candidate);
          await optimizeImage(buffer, outputPath);
          console.log(`[${index + 1}/${total}] crawled ${school.school_code} ${school.name_tc}`);
          return { ...baseResult, image_url: publicUrl, source_url: candidate, status: "crawled" };
        } catch {
          // Try the next image candidate.
        }
      }
      baseResult.error = "no usable website image";
    } catch (error) {
      baseResult.error = error.message;
    }
  } else {
    baseResult.error = "no website";
  }

  const schoolandPhoto = schoolandPhotos.get(String(school.school_code));
  if (schoolandPhoto?.photo_url) {
    try {
      const buffer = await fetchImage(schoolandPhoto.photo_url);
      await optimizeImage(buffer, outputPath);
      console.log(`[${index + 1}/${total}] schooland ${school.school_code} ${school.name_tc}`);
      return {
        ...baseResult,
        image_url: publicUrl,
        source_url: schoolandPhoto.photo_url,
        status: "schooland",
        error: baseResult.error,
      };
    } catch (error) {
      baseResult.error = `${baseResult.error}; schooland photo failed: ${error.message}`;
    }
  }

  const canGenerate =
    GENERATE_MISSING &&
    (GENERATE_LIMIT === 0 || generateState.count < GENERATE_LIMIT);
  if (canGenerate) {
    try {
      await generateImage(school, outputPath);
      generateState.count += 1;
      console.log(`[${index + 1}/${total}] generated ${school.school_code} ${school.name_tc}`);
      return { ...baseResult, image_url: publicUrl, status: "generated" };
    } catch (error) {
      return { ...baseResult, status: "failed", error: `${baseResult.error}; ${error.message}` };
    }
  }

  if (FALLBACK_SAMPLES) {
    try {
      const sample = await writeSampleFallback(school, outputPath);
      console.log(`[${index + 1}/${total}] fallback ${school.school_code} ${school.name_tc}`);
      return {
        ...baseResult,
        image_url: publicUrl,
        source_url: path.relative(root, sample),
        status: "fallback_sample",
        error: baseResult.error,
      };
    } catch (error) {
      baseResult.error = `${baseResult.error}; fallback failed: ${error.message}`;
    }
  }

  console.log(`[${index + 1}/${total}] failed ${school.school_code} ${school.name_tc}: ${baseResult.error}`);
  return baseResult;
}

async function runPool(items, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (cursor < items.length) {
      const current = cursor;
      cursor += 1;
      results[current] = await worker(items[current], current);
    }
  });
  await Promise.all(workers);
  return results;
}

function summarize(items) {
  const counts = {};
  for (const item of items) counts[item.status] = (counts[item.status] || 0) + 1;
  return counts;
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await mkdir(path.dirname(manifestPath), { recursive: true });

  let schools = await loadSchools();
  if (SCHOOL_CODES) schools = schools.filter((school) => SCHOOL_CODES.has(String(school.school_code)));
  if (LIMIT) schools = schools.slice(0, LIMIT);

  console.log(
    `[school-images] schools=${schools.length} concurrency=${CONCURRENCY} generate_missing=${GENERATE_MISSING} fallback_samples=${FALLBACK_SAMPLES} dry_run=${DRY_RUN}`,
  );

  const existing = await readExistingManifest();
  const schoolandPhotos = await loadSchoolandPhotos();
  const generatedState = { count: 0 };
  const batch = await runPool(schools, (school, index) =>
    processSchool(school, index, schools.length, generatedState, schoolandPhotos),
  );
  const byCode = new Map((existing.items || []).map((item) => [item.school_code, item]));
  for (const item of batch) byCode.set(item.school_code, item);
  const items = Array.from(byCode.values()).sort((a, b) => String(a.school_code).localeCompare(String(b.school_code)));
  const payload = {
    generated_at: new Date().toISOString(),
    output_dir: "public/images/schools",
    summary: summarize(items),
    batch_summary: summarize(batch),
    items,
  };
  await writeFile(manifestPath, JSON.stringify(payload, null, 2) + "\n");
  console.log(`[school-images] done ${JSON.stringify(payload.batch_summary)}`);
  console.log(`[school-images] manifest=${manifestPath}`);
}

main().catch((error) => {
  console.error(`[school-images] fatal: ${error.stack || error.message}`);
  process.exit(1);
});
