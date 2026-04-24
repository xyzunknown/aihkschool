#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import {
  BASE_URL,
  UA,
  FETCH_TIMEOUT,
  buildSearchQueries,
  parseSchoolDetail,
  parseSearchResults,
} from "./edu-kingdom-utils.mjs";

const { values: args } = parseArgs({
  options: {
    limit: { type: "string", default: "10" },
    "school-type": { type: "string" },
    "json-report": { type: "string", default: "docs/edu-kingdom-school-probe.json" },
  },
});

const LIMIT = Math.max(1, parseInt(args.limit, 10) || 10);
const SCHOOL_TYPE = args["school-type"] || null;
const JSON_REPORT = args["json-report"];
const schoolsPath = resolve(process.cwd(), "data/schools_merged.json");
const schools = JSON.parse(readFileSync(schoolsPath, "utf-8"));

function pickProbeSchools(rows, limit, schoolType) {
  return rows
    .filter((row) => !schoolType || row.school_type === schoolType)
    .filter((row) => row.name_tc || row.name_en)
    .slice(0, limit);
}

async function fetchHtml(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT);
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8",
      },
      redirect: "follow",
      signal: ctrl.signal,
    });

    if (!resp.ok) {
      return { ok: false, status: resp.status, html: "" };
    }

    return { ok: true, status: resp.status, html: await resp.text() };
  } catch (error) {
    return { ok: false, status: null, html: "", error: error.message };
  } finally {
    clearTimeout(timer);
  }
}

async function probeSchool(school, index) {
  const searchQueries = buildSearchQueries(school);
  const searchAttempts = [];

  for (const query of searchQueries) {
    const searchUrl = `${BASE_URL}/搜尋?q=${encodeURIComponent(query)}&types=schools`;
    const searchResponse = await fetchHtml(searchUrl);
    if (!searchResponse.ok) {
      searchAttempts.push({ query, ok: false, status: searchResponse.status, error: searchResponse.error || null, candidates: [] });
      continue;
    }

    const candidates = parseSearchResults(searchResponse.html, school);
    searchAttempts.push({ query, ok: true, status: searchResponse.status, candidates });

    if (candidates.length === 0) continue;

    const best = candidates[0];
    const detailResponse = await fetchHtml(best.url);
    if (!detailResponse.ok) {
      return {
        index,
        school_name: school.name_tc || school.name_en,
        school_type: school.school_type || null,
        search_attempts: searchAttempts,
        matched_detail: false,
        error: detailResponse.error || `detail_status_${detailResponse.status}`,
      };
    }

    const detail = parseSchoolDetail(detailResponse.html, school, best.url);
    return {
      index,
      school_name: school.name_tc || school.name_en,
      school_type: school.school_type || null,
      search_attempts: searchAttempts,
      matched_detail: true,
      detail,
    };
  }

  return {
    index,
    school_name: school.name_tc || school.name_en,
    school_type: school.school_type || null,
    search_attempts: searchAttempts,
    matched_detail: false,
    error: "no_school_result",
  };
}

function buildSummary(results) {
  const matched = results.filter((item) => item.matched_detail);
  const withIntro = matched.filter((item) => item.detail.intro_length >= 80);
  const withArticles = matched.filter((item) => item.detail.article_links.length > 0);
  const withThreads = matched.filter((item) => item.detail.thread_links.length > 0);

  return {
    sampled: results.length,
    matched_detail_count: matched.length,
    intro_count: withIntro.length,
    article_link_count: withArticles.length,
    thread_link_count: withThreads.length,
    intro_hit_rate: results.length ? Number((withIntro.length / results.length).toFixed(2)) : 0,
    detail_hit_rate: results.length ? Number((matched.length / results.length).toFixed(2)) : 0,
  };
}

async function main() {
  const targets = pickProbeSchools(schools, LIMIT, SCHOOL_TYPE);
  console.log(`[edu-kingdom-school-probe] sampled ${targets.length} schools`);

  const results = [];
  for (const [index, school] of targets.entries()) {
    console.log(`[edu-kingdom-school-probe] [${index + 1}/${targets.length}] ${school.name_tc || school.name_en}`);
    results.push(await probeSchool(school, index + 1));
  }

  const report = {
    generated_at: new Date().toISOString(),
    summary: buildSummary(results),
    results,
  };

  writeFileSync(resolve(process.cwd(), JSON_REPORT), `${JSON.stringify(report, null, 2)}\n`, "utf-8");
  console.log(`[edu-kingdom-school-probe] JSON report written to: ${JSON_REPORT}`);
  console.log(JSON.stringify(report.summary, null, 2));
}

main().catch((error) => {
  console.error("[edu-kingdom-school-probe] fatal:", error);
  process.exitCode = 1;
});