#!/usr/bin/env node
// Re-crawl real logos for famous schools (priority top-100 + Victoria branches)
// that currently lack one. Quality-gated: 宁缺毋滥 — only keeps an image that
// passes the validation checks; otherwise the school falls back to the
// letter avatar.
//
// Run: node scripts/recrawl_priority_logos.mjs

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOGOS_DIR = path.join(ROOT, "public", "logos");
const PRIORITY = path.join(ROOT, "data", "xhs", "internal_priority_school_top100_results.json");
const TRIAGE = path.join(ROOT, "data", "logo-cache", "triage-report.json");
const SEEDS = ["001_schools.sql", "002_private_international_schools.sql"].map((f) =>
  path.join(ROOT, "supabase", "seed", f)
);
const RESULT = path.join(ROOT, "data", "logo-cache", "recrawl-result.json");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const VICTORIA_CODES = [
  "216194", "325481", "542164", "566900", "566934",
  "566942", "569828", "574708", "618039", "619850",
];

function loadWebsites() {
  const map = new Map();
  for (const seed of SEEDS) {
    const text = fs.readFileSync(seed, "utf8");
    for (const line of text.split("\n")) {
      const code = line.match(/VALUES \('(\d+)'/)?.[1];
      const site = line.match(/'(https?:\/\/[^']+)'/)?.[1];
      if (code && site && !map.has(code)) map.set(code, site);
    }
  }
  return map;
}

async function fetchText(url, timeout = 15000) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9,zh-HK;q=0.8" },
      signal: AbortSignal.timeout(timeout),
      redirect: "follow",
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function fetchBytes(url, timeout = 15000) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(timeout),
      redirect: "follow",
    });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

// Exclude: social-media / chat / QR-code icons that sit in <img ... logo> tags
// (e.g. "wechat_logo.png"), and dark-mode logo variants (white-on-transparent,
// invisible on the white avatar card).
const EXCLUDE_RE = /wechat|weixin|\bwx\b|whatsapp|facebook|\bfb\b|instagram|\big\b|youtube|qrcode|qr-code|\bqq\b|weibo|line[-_]|dark[-_]?mode|darkmode/i;

function candidateUrls(html, base) {
  const urls = [];
  const push = (u) => {
    if (!u || EXCLUDE_RE.test(u)) return;
    try {
      urls.push(new URL(u, base).href);
    } catch {
      /* skip */
    }
  };
  // Note: og:image is deliberately NOT used — on school sites it is almost
  // always a hero photo, not the logo.
  for (const m of html.matchAll(/<link[^>]+>/gi)) {
    const tag = m[0];
    const rel = tag.match(/rel=["']([^"']+)["']/i)?.[1]?.toLowerCase() ?? "";
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (rel.includes("icon") || /logo/i.test(href ?? "")) push(href);
  }
  for (const m of html.matchAll(/<img[^>]+>/gi)) {
    const tag = m[0];
    if (/logo|brand/i.test(tag)) push(tag.match(/src=["']([^"']+)["']/i)?.[1]);
  }
  push("/apple-touch-icon.png");
  return [...new Set(urls)];
}

// 宁缺毋滥 quality gate: real, non-blank, reasonably-shaped raster image.
async function validate(buf) {
  try {
    const img = sharp(buf);
    const meta = await img.metadata();
    if (!meta.width || !meta.height) return null;
    if (meta.width < 64 || meta.height < 64) return null;
    const ratio = meta.width / meta.height;
    if (ratio > 4 || ratio < 0.25) return null;
    const stats = await img.stats();
    const maxStdev = Math.max(...stats.channels.map((c) => c.stdev));
    if (maxStdev < 12) return null; // near-uniform → blank/solid
    const png = await img.resize(256, 256, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    // The avatar card has a white background. Composite over white and reject
    // if the result is near-uniform — i.e. a white/transparent logo invisible
    // on a white card.
    const onWhite = await sharp(png)
      .flatten({ background: "#ffffff" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const whiteStats = await sharp(onWhite.data, { raw: onWhite.info }).stats();
    if (Math.max(...whiteStats.channels.map((c) => c.stdev)) < 10) return null;
    // Prefer square-ish marks (ideal for the square avatar slot); area as tiebreak.
    const squareness = 1 / (1 + Math.abs(Math.log(ratio)));
    return { png, score: squareness * 1e6 + Math.min(meta.width * meta.height, 5e5) };
  } catch {
    return null;
  }
}

async function crawlOne(code, website) {
  const html = await fetchText(website);
  const base = website;
  const cands = html ? candidateUrls(html, base) : ["/apple-touch-icon.png"].map((u) => {
    try { return new URL(u, base).href; } catch { return null; }
  }).filter(Boolean);

  let best = null;
  for (const url of cands) {
    const bytes = await fetchBytes(url);
    if (!bytes || bytes.length < 300) continue;
    const ok = await validate(bytes);
    if (ok && (!best || ok.score > best.score)) best = { ...ok, source: url };
  }
  return best;
}

async function main() {
  const websites = loadWebsites();
  const triage = JSON.parse(fs.readFileSync(TRIAGE, "utf8"));
  const haveReal = new Set(triage.codes_real);
  const priority = JSON.parse(fs.readFileSync(PRIORITY, "utf8"));
  const priorityCodes = (priority.rows ?? [])
    .map((r) => r.school_code)
    .filter(Boolean);

  const targets = [...new Set([...priorityCodes, ...VICTORIA_CODES])].filter(
    (code) => !haveReal.has(code)
  );

  const results = [];
  for (const code of targets) {
    const site = websites.get(code);
    if (!site) {
      results.push({ code, status: "no_website" });
      continue;
    }
    const best = await crawlOne(code, site);
    if (best) {
      fs.writeFileSync(path.join(LOGOS_DIR, `${code}.png`), best.png);
      results.push({ code, status: "downloaded", source: best.source });
      console.log(`OK   ${code}  <- ${best.source}`);
    } else {
      results.push({ code, status: "rejected", website: site });
      console.log(`SKIP ${code}  (no logo passed quality gate)`);
    }
  }

  // Victoria branches share one brand logo: backfill from any branch that succeeded.
  const victoriaHit = results.find(
    (r) => VICTORIA_CODES.includes(r.code) && r.status === "downloaded"
  );
  if (victoriaHit) {
    const src = path.join(LOGOS_DIR, `${victoriaHit.code}.png`);
    for (const code of VICTORIA_CODES) {
      const dest = path.join(LOGOS_DIR, `${code}.png`);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
        results.push({ code, status: "copied_from_branch", source: victoriaHit.code });
        console.log(`COPY ${code}  <- Victoria branch ${victoriaHit.code}`);
      }
    }
  }

  fs.writeFileSync(RESULT, JSON.stringify({ generated_at: new Date().toISOString(), results }, null, 2));
  const ok = results.filter((r) => r.status === "downloaded" || r.status === "copied_from_branch").length;
  console.log(`\ndone: ${ok} logos saved, ${results.length - ok} skipped. Report: ${path.relative(ROOT, RESULT)}`);
}

main();
