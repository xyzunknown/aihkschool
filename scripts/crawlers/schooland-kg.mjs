#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import * as cheerio from "cheerio";
import robotsParser from "robots-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..", "..");

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    limit: { type: "string", default: "0" },
    "detail-limit": { type: "string", default: "0" },
    output: { type: "string", default: "data/schooland_kg_snapshot.json" },
    report: { type: "string", default: "docs/schooland-kg-report.json" },
    input: { type: "string", default: "" },
  },
});

const DRY_RUN = args["dry-run"];
const LIMIT = Math.max(0, parseInt(args.limit, 10) || 0);
const DETAIL_LIMIT = Math.max(0, parseInt(args["detail-limit"], 10) || 0);
const OUTPUT_PATH = resolve(PROJECT_ROOT, args.output);
const REPORT_PATH = resolve(PROJECT_ROOT, args.report);
const INPUT_PATH = args.input ? resolve(PROJECT_ROOT, args.input) : "";

const BASE_URL = "https://www.schooland.hk";
const LIST_URL = `${BASE_URL}/kg/`;
const DISTRICT_SLUGS = [
  "central-west",
  "eastern",
  "wan-chai",
  "southern",
  "islands",
  "kowloon-city",
  "wong-tai-sin",
  "kwun-tong",
  "yau-tsim-mong",
  "sham-shui-po",
  "kwai-tsing",
  "tsuen-wan",
  "sha-tin",
  "tai-po",
  "sai-kung",
  "tuen-mun",
  "yuen-long",
  "north",
];
const UA = "HKSchoolPlaceBot/1.0 (+https://aihkschool.vercel.app)";
const FETCH_TIMEOUT = 15000;
const REQUEST_GAP_MS = 1200;
const MATCH_SAMPLE_LIMIT = 25;

let requestQueue = Promise.resolve();
let lastRequestAt = 0;
let robotsCache = null;

function sleep(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}

async function acquireSlot() {
  let release = () => {};
  const next = new Promise((resolveNext) => {
    release = resolveNext;
  });
  const previous = requestQueue;
  requestQueue = next;
  await previous;
  const wait = Math.max(0, REQUEST_GAP_MS - (Date.now() - lastRequestAt));
  if (wait > 0) await sleep(wait);
  lastRequestAt = Date.now();
  release();
}

async function getRobots() {
  if (robotsCache !== null) return robotsCache;
  try {
    const response = await fetch(`${BASE_URL}/robots.txt`, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(5000),
    });
    const text = response.ok ? await response.text() : "";
    robotsCache = robotsParser(`${BASE_URL}/robots.txt`, text);
  } catch {
    robotsCache = null;
  }
  return robotsCache;
}

async function isAllowed(url) {
  const robots = await getRobots();
  if (!robots) return true;
  return robots.isAllowed(url, UA) !== false;
}

async function fetchText(url, options = {}) {
  if (!(await isAllowed(url))) {
    throw new Error(`robots_disallowed:${url}`);
  }

  await acquireSlot();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "User-Agent": UA,
        "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8",
        ...(options.headers || {}),
      },
      body: options.body,
      signal: controller.signal,
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`http_${response.status}:${url}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function decodeHtmlEntities(text) {
  return cheerio.load(`<span>${text || ""}</span>`)("span").text();
}

function collapseWhitespace(value) {
  return (value || "").replace(/\s+/g, " ").trim();
}

function normalizeName(value) {
  return collapseWhitespace(
    (value || "")
      .normalize("NFKC")
      .replace(/[（）()\[\]{}]/g, "")
      .replace(/[．・·.,'"“”‘’:：;；!?！？]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase(),
  );
}

function normalizeAddress(value) {
  return collapseWhitespace(
    (value || "")
      .normalize("NFKC")
      .replace(/[，,。\.]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase(),
  );
}

function normalizeDistrictLabel(value) {
  return collapseWhitespace((value || "").replace(/\s+/g, ""));
}

function normalizeHost(value) {
  if (!value) return "";
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.host.replace(/^www\./, "").toLowerCase();
  } catch {
    return value.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].toLowerCase();
  }
}

function normalizeWebsiteKey(value) {
  if (!value) return "";
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    const host = url.host.replace(/^www\./, "").toLowerCase();
    let pathname = (url.pathname || "/").replace(/\/+$/g, "");
    if (!pathname) pathname = "/";
    return `${host}${pathname.toLowerCase()}`;
  } catch {
    return "";
  }
}

function stripSchoolTerms(value) {
  return collapseWhitespace(
    (value || "")
      .replace(/guidepost\s*/gi, "")
      .replace(/montessori/gi, "")
      .replace(/international/gi, "")
      .replace(/pre[\s-]?school/gi, "")
      .replace(/kindergarten/gi, "")
      .replace(/nursery/gi, "")
      .replace(/school/gi, "")
      .replace(/幼兒園|幼稚園|幼兒學校|學前教育中心|國際|英文|蒙特梭利|學校暨|暨|學校/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function splitNameAndBranch(value) {
  const text = collapseWhitespace(value || "");
  const match = text.match(/^(.*?)\s*[（(]([^）)]+)[）)]\s*$/);
  if (!match) return { main: text, branch: "" };
  return {
    main: collapseWhitespace(match[1]),
    branch: collapseWhitespace(match[2]),
  };
}

function extractCoreName(value) {
  return collapseWhitespace(
    (value || "")
      .replace(/附屬.*$/g, "")
      .replace(/國際幼稚園.*$/g, "")
      .replace(/國際幼兒園.*$/g, "")
      .replace(/英文幼稚園.*$/g, "")
      .replace(/幼兒園.*$/g, "")
      .replace(/幼稚園.*$/g, "")
      .replace(/學校.*$/g, "")
      .trim(),
  );
}

function generateNameAliases(nameTc, nameEn) {
  const aliases = [];
  const push = (value) => {
    const normalized = normalizeName(value);
    if (normalized) aliases.push(normalized);
  };

  const { main, branch } = splitNameAndBranch(nameTc || "");
  const core = extractCoreName(main);
  const stripped = stripSchoolTerms(main);

  push(nameTc);
  push(main);
  push(core);
  push(stripped);
  if (core) {
    push(`${core}幼稚園`);
    push(`${core}幼兒園`);
  }
  if (branch) {
    push(`${main}${branch}`);
    push(`${core}${branch}`);
    push(`${stripped}${branch}`);
  }
  if (main.includes("英文")) {
    push(main.replace(/英文/g, ""));
  }

  const english = collapseWhitespace(nameEn || "");
  push(english);
  push(stripSchoolTerms(english));
  const englishBranch = splitNameAndBranch(english);
  if (englishBranch.main !== english) {
    push(englishBranch.main);
    push(stripSchoolTerms(englishBranch.main));
  }

  return [...new Set(aliases)];
}

function parseManualAliases(sqlText, schoolByCode) {
  const aliasMap = new Map();
  const pattern = /SELECT id, '((?:[^']|'')+)',\s*'[^']+',\s*[0-9.]+,\s*'[^']+' FROM schools WHERE school_code = '([^']+)'/g;
  let match;
  while ((match = pattern.exec(sqlText)) !== null) {
    const alias = match[1].replace(/''/g, "'");
    const schoolCode = match[2];
    const school = schoolByCode.get(schoolCode);
    if (!school) continue;
    const normalizedAlias = normalizeName(alias);
    if (!normalizedAlias) continue;
    if (!aliasMap.has(normalizedAlias)) aliasMap.set(normalizedAlias, []);
    aliasMap.get(normalizedAlias).push(school);
  }
  return aliasMap;
}

function parseListAnchor(anchorHtml) {
  const $ = cheerio.load(anchorHtml || "");
  const anchor = $("a").first();
  const href = anchor.attr("href") || "";
  const slug = href.replace(/^\//, "").replace(/^kg\//, "").trim();
  return {
    slug,
    detail_url: slug ? `${BASE_URL}/kg/${slug}` : null,
    name_tc: collapseWhitespace(anchor.text()),
  };
}

function parseNurseryFlag(value) {
  return decodeHtmlEntities(value).includes("10003");
}

function parseListRowFromDistrictPage(slug, districtSlug, nameTc) {
  return {
    slug,
    detail_url: `${BASE_URL}/kg/${slug}`,
    source_district_slug: districtSlug,
    name_tc: collapseWhitespace((nameTc || "").replace(/✨/g, "")),
  };
}

function pickFieldByHeading($, headingText) {
  const row = $("div.row")
    .filter((_, el) => collapseWhitespace($(el).find("h3").first().text()) === headingText)
    .first();
  if (!row.length) return { summary: "", blockText: "", html: "" };
  const html = row.html() || "";
  const rowScope = cheerio.load(`<div>${html}</div>`);
  const summary = collapseWhitespace(rowScope("h4").first().text());
  const blockText = collapseWhitespace(rowScope.text());
  return { summary, blockText, html };
}

function parseContactBlock(text) {
  const compact = collapseWhitespace(text);
  const addressMatch = compact.match(/地址[:：]\s*(.+?)\s*(地圖[:：]|電話[:：]|傳真[:：]|網址[:：]|校監[:：]|校長[:：]|$)/);
  const phoneMatch = compact.match(/電話[:：]\s*([0-9\s]{8,})/);
  const faxMatch = compact.match(/傳真[:：]\s*([0-9\s]{8,})/);
  const websiteMatch = compact.match(/網址[:：]\s*(https?:\/\/[^\s]+)/i);
  const supervisorMatch = compact.match(/校監[:：]\s*([^校長]+?)(校長[:：]|$)/);
  const principalMatch = compact.match(/校長[:：]\s*(.+?)$/);

  return {
    address_tc: addressMatch ? collapseWhitespace(addressMatch[1]) : "",
    phone: phoneMatch ? collapseWhitespace(phoneMatch[1]) : "",
    fax: faxMatch ? collapseWhitespace(faxMatch[1]) : "",
    website: websiteMatch ? websiteMatch[1] : "",
    supervisor: supervisorMatch ? collapseWhitespace(supervisorMatch[1]) : "",
    principal: principalMatch ? collapseWhitespace(principalMatch[1]) : "",
  };
}

function parseFees(html, summary, blockText) {
  const $ = cheerio.load(`<div>${html}</div>`);
  const rows = $("tr")
    .map((_, tr) =>
      $(tr)
        .find("th,td")
        .map((__, cell) => collapseWhitespace($(cell).text()))
        .get()
        .filter(Boolean),
    )
    .get()
    .filter((row) => row.length > 0);

  const annualFeeMatch = summary.match(/全年學費\s*\$?([\d,]+)/);
  return {
    annual_fee_hkd: annualFeeMatch ? annualFeeMatch[1] : "",
    fee_summary: summary,
    fee_rows: rows,
    fee_note: blockText,
  };
}

function extractEnglishName(titleText) {
  const parts = (titleText || "").match(/[A-Za-z][A-Za-z'\-().,&\s]+$/);
  return parts ? collapseWhitespace(parts[0]) : "";
}

function parseDetailPage(html, listRow) {
  const $ = cheerio.load(html);
  const title = collapseWhitespace($("h2").first().text()) || collapseWhitespace($("title").text());
  const titleWithoutEnglish = collapseWhitespace(title.replace(/[A-Za-z][A-Za-z'\-().,&\s]+$/g, ""));
  const englishName = extractEnglishName(title);
  const intro = collapseWhitespace($("h2").first().nextAll("p").first().text());
  const category = pickFieldByHeading($, "學校類別");
  const history = pickFieldByHeading($, "創校歷史");
  const facilities = pickFieldByHeading($, "學校設施");
  const teaching = pickFieldByHeading($, "教學情況");
  const fees = pickFieldByHeading($, "學校收費");
  const contact = pickFieldByHeading($, "聯絡資料");
  const relatedNews = pickFieldByHeading($, "相關新聞");
  const specialReports = pickFieldByHeading($, "專題報導");
  const relatedVideos = pickFieldByHeading($, "相關影片");
  const contactFields = parseContactBlock(contact.blockText);
  const feeFields = parseFees(fees.html, fees.summary, fees.blockText);
  const foundedMatch = history.summary.match(/(\d{4})\s*年/);
  const capacityMatch = facilities.summary.match(/可容納約\s*([\d,]+)\s*個學生/);
  const classroomMatch = facilities.summary.match(/註冊課室\s*([\d,]+)\s*個/);
  const staffMatch = teaching.summary.match(/教職員約\s*([\d,]+)\s*位/);
  const ratioMatch = teaching.summary.match(/1\s*位教師對\s*([\d,]+)\s*名學生/);
  const photo = $("meta[property='og:image']").attr("content") || "";
  const description = $("meta[name='description']").attr("content") || "";
  const canonical = $("link[rel='canonical']").attr("href") || listRow.detail_url || "";
  const kgpLink = $("a[href*='kgp2025.azurewebsites.net/edb/schoolinfo.php']").attr("href") || "";
  const edbLinks = $("a[href*='applications.edb.gov.hk/schoolsearch/schoolinfo.aspx']")
    .map((_, el) => $(el).attr("href"))
    .get()
    .filter(Boolean);

  return {
    ...listRow,
    title,
    name_tc: titleWithoutEnglish || listRow.name_tc,
    name_en: englishName,
    intro,
    school_category_summary: category.summary,
    school_category_text: category.blockText,
    founded_year: foundedMatch ? foundedMatch[1] : "",
    history_summary: history.summary,
    facilities_summary: facilities.summary,
    facilities_text: facilities.blockText,
    capacity: capacityMatch ? capacityMatch[1] : listRow.capacity_label,
    classroom_count: classroomMatch ? classroomMatch[1] : "",
    staff_count: staffMatch ? staffMatch[1] : "",
    teacher_student_ratio: ratioMatch ? ratioMatch[1] : "",
    teaching_summary: teaching.summary,
    teaching_text: teaching.blockText,
    ...feeFields,
    ...contactFields,
    related_news_text: relatedNews.blockText,
    special_reports_text: specialReports.blockText,
    related_videos_text: relatedVideos.blockText,
    photo_url: photo,
    meta_description: description,
    canonical_url: canonical,
    kgp_link: kgpLink,
    edb_links: edbLinks,
  };
}

function isSchoolDetailRow(row) {
  return Boolean(
    row.name_tc &&
    row.title &&
    row.contactFields !== false &&
    row.school_category_summary &&
    row.contactFields !== null,
  );
}

function mapDistrictToCanonical(value) {
  const mapping = {
    中西區: "central_and_western",
    港島中西區: "central_and_western",
    東區: "eastern",
    港島東區: "eastern",
    南區: "southern",
    港島南區: "southern",
    灣仔區: "wan_chai",
    灣仔: "wan_chai",
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
  return mapping[normalizeDistrictLabel(value)] || "";
}

function buildMergedIndexes(mergedSchools) {
  const byName = new Map();
  const byHost = new Map();
  const byWebsiteKey = new Map();
  const byAlias = new Map();
  const byCode = new Map();

  for (const school of mergedSchools) {
    byCode.set(school.code, school);
    const tc = normalizeName(school.name_tc);
    const en = normalizeName(school.name_en);
    if (tc) {
      if (!byName.has(tc)) byName.set(tc, []);
      byName.get(tc).push(school);
    }
    if (en) {
      if (!byName.has(en)) byName.set(en, []);
      byName.get(en).push(school);
    }
    const host = normalizeHost(school.website);
    if (host) {
      if (!byHost.has(host)) byHost.set(host, []);
      byHost.get(host).push(school);
    }

    const websiteKey = normalizeWebsiteKey(school.website);
    if (websiteKey) {
      if (!byWebsiteKey.has(websiteKey)) byWebsiteKey.set(websiteKey, []);
      byWebsiteKey.get(websiteKey).push(school);
    }

    for (const alias of generateNameAliases(school.name_tc, school.name_en)) {
      if (!byAlias.has(alias)) byAlias.set(alias, []);
      byAlias.get(alias).push(school);
    }
  }

  const manualAliasPath = resolve(PROJECT_ROOT, "supabase/seed/008_school_aliases.sql");
  const manualAliasMap = parseManualAliases(readFileSync(manualAliasPath, "utf-8"), byCode);
  for (const [alias, schools] of manualAliasMap.entries()) {
    if (!byAlias.has(alias)) byAlias.set(alias, []);
    byAlias.get(alias).push(...schools);
  }

  return { byName, byHost, byWebsiteKey, byAlias };
}

function chooseUniqueCandidate(candidates, schoolandRow) {
  if (!candidates || candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];

  const district = mapDistrictToCanonical(schoolandRow.district_label);
  const byDistrict = district ? candidates.filter((school) => school.district === district) : candidates;
  if (byDistrict.length === 1) return byDistrict[0];

  const normalizedAddress = normalizeAddress(schoolandRow.address_tc);
  if (normalizedAddress) {
    const byAddress = byDistrict.filter((school) => {
      const candidateAddress = normalizeAddress(school.address_tc);
      return candidateAddress && (candidateAddress.includes(normalizedAddress) || normalizedAddress.includes(candidateAddress));
    });
    if (byAddress.length === 1) return byAddress[0];
  }

  return null;
}

function matchByAliases(row, indexes) {
  const aliases = generateNameAliases(row.name_tc, row.name_en);
  for (const alias of aliases) {
    const candidate = chooseUniqueCandidate(indexes.byAlias.get(alias), row);
    if (candidate) {
      return candidate;
    }
  }
  return null;
}

function matchRowToMerged(row, indexes) {
  const normalizedTc = normalizeName(row.name_tc);
  const normalizedEn = normalizeName(row.name_en);
  const host = normalizeHost(row.website);
  const websiteKey = normalizeWebsiteKey(row.website);

  if (websiteKey) {
    const websiteCandidate = chooseUniqueCandidate(indexes.byWebsiteKey.get(websiteKey), row);
    if (websiteCandidate) {
      return { method: "website_exact", school: websiteCandidate };
    }
  }

  if (host) {
    const hostCandidate = chooseUniqueCandidate(indexes.byHost.get(host), row);
    if (hostCandidate) {
      return { method: "website_host", school: hostCandidate };
    }
  }

  if (normalizedTc) {
    const tcCandidate = chooseUniqueCandidate(indexes.byName.get(normalizedTc), row);
    if (tcCandidate) {
      return { method: "name_tc", school: tcCandidate };
    }
  }

  if (normalizedEn) {
    const enCandidate = chooseUniqueCandidate(indexes.byName.get(normalizedEn), row);
    if (enCandidate) {
      return { method: "name_en", school: enCandidate };
    }
  }

  const aliasCandidate = matchByAliases(row, indexes);
  if (aliasCandidate) {
    return { method: "alias", school: aliasCandidate };
  }

  return { method: "unmatched", school: null };
}

function ensureParentDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

async function loadAllRows() {
  const rows = [];
  const seen = new Set();

  for (const districtSlug of DISTRICT_SLUGS) {
    const districtUrl = `${BASE_URL}/kg/${districtSlug}`;
    const html = await fetchText(districtUrl);
    const $ = cheerio.load(html);
    const anchors = $("a[href]")
      .map((_, el) => ({
        href: ($(el).attr("href") || "").trim(),
        text: collapseWhitespace($(el).text()),
      }))
      .get()
      .filter((item) => item.href);

    const candidates = anchors
      .filter((item) => !item.href.startsWith("http"))
      .map((item) => ({
        slug: item.href.replace(/^\//, "").replace(/^kg\//, ""),
        text: item.text,
      }))
      .filter((item) => item.slug && !item.slug.includes("/") && item.text)
      .filter((item) => item.slug !== "admission-2026")
      .filter((item) => !DISTRICT_SLUGS.includes(item.slug))
      .filter((item) => !/區幼稚園$/.test(item.text))
      .filter((item) => item.text !== "收生安排");

    for (const candidate of candidates) {
      const { slug } = candidate;
      if (seen.has(slug)) continue;
      seen.add(slug);
      rows.push(parseListRowFromDistrictPage(slug, districtSlug, candidate.text));
    }
  }

  return { total: rows.length, rows: LIMIT ? rows.slice(0, LIMIT) : rows };
}

async function main() {
  console.log(`[schooland-kg] starting dry-run=${DRY_RUN} limit=${LIMIT || "∞"} detail-limit=${DETAIL_LIMIT || "∞"} input=${INPUT_PATH || "remote"}`);

  let total = 0;
  let detailRows = [];
  let errors = [];

  if (INPUT_PATH) {
    detailRows = JSON.parse(readFileSync(INPUT_PATH, "utf-8"));
    total = detailRows.length;
    if (LIMIT) detailRows = detailRows.slice(0, LIMIT);
    if (DETAIL_LIMIT) detailRows = detailRows.slice(0, DETAIL_LIMIT);
    console.log(`[schooland-kg] loaded cached detail rows=${detailRows.length} total=${total}`);
  } else {
    const listProbe = await fetchText(LIST_URL);
    if (!listProbe.includes("全香港幼稚園及幼兒學校")) {
      throw new Error("Schooland kindergarten root page no longer matches expected content");
    }

    const { total: fetchedTotal, rows } = await loadAllRows();
    total = fetchedTotal;
    console.log(`[schooland-kg] list rows fetched=${rows.length} total=${total}`);

    const detailTarget = DETAIL_LIMIT ? rows.slice(0, DETAIL_LIMIT) : rows;
    for (const [index, row] of detailTarget.entries()) {
      if (!row.detail_url || !row.slug) {
        errors.push({ slug: row.slug || null, error: "missing_detail_url" });
        detailRows.push(row);
        continue;
      }

      try {
        const html = await fetchText(row.detail_url);
        const parsed = parseDetailPage(html, row);
        if (!parsed.school_category_summary || !parsed.title) {
          continue;
        }
        detailRows.push(parsed);
        if ((index + 1) % 50 === 0 || index === detailTarget.length - 1) {
          console.log(`[schooland-kg] detail progress ${index + 1}/${detailTarget.length}`);
        }
      } catch (error) {
        errors.push({ slug: row.slug, error: error.message });
        detailRows.push(row);
      }
    }
  }

  const mergedSchools = JSON.parse(readFileSync(resolve(PROJECT_ROOT, "data/schools_merged.json"), "utf-8"));
  const indexes = buildMergedIndexes(mergedSchools);
  const enrichedRows = detailRows.map((row) => {
    const match = matchRowToMerged(row, indexes);
    return {
      ...row,
      matched_school_code: match.school?.code || "",
      matched_school_name_tc: match.school?.name_tc || "",
      matched_school_name_en: match.school?.name_en || "",
      matched_school_method: match.method,
    };
  });

  const matchedRows = enrichedRows.filter((row) => row.matched_school_method !== "unmatched");
  const unmatchedRows = enrichedRows.filter((row) => row.matched_school_method === "unmatched");
  const matchMethodCounts = matchedRows.reduce((acc, row) => {
    acc[row.matched_school_method] = (acc[row.matched_school_method] || 0) + 1;
    return acc;
  }, {});

  const report = {
    generated_at: new Date().toISOString(),
    source: "schooland.hk/kg",
    total_listed: total,
    crawled_list_rows: INPUT_PATH ? detailRows.length : (LIMIT ? Math.min(total, LIMIT) : total),
    crawled_detail_rows: detailRows.length,
    matched_rows: matchedRows.length,
    unmatched_rows: unmatchedRows.length,
    detail_errors: errors.length,
    match_rate: detailRows.length ? Number((matchedRows.length / detailRows.length).toFixed(4)) : 0,
    match_methods: matchMethodCounts,
    sample_matches: matchedRows.slice(0, MATCH_SAMPLE_LIMIT).map((row) => ({
      slug: row.slug,
      schooland_name_tc: row.name_tc,
      matched_school_code: row.matched_school_code,
      matched_school_name_tc: row.matched_school_name_tc,
      matched_school_method: row.matched_school_method,
    })),
    sample_unmatched: unmatchedRows.slice(0, MATCH_SAMPLE_LIMIT).map((row) => ({
      slug: row.slug,
      schooland_name_tc: row.name_tc,
      district_label: row.district_label,
      website: row.website || "",
    })),
    errors: errors.slice(0, 100),
  };

  console.log(`[schooland-kg] matched=${matchedRows.length}/${detailRows.length} unmatched=${unmatchedRows.length} errors=${errors.length}`);

  if (!DRY_RUN) {
    ensureParentDir(OUTPUT_PATH);
    ensureParentDir(REPORT_PATH);
    writeFileSync(OUTPUT_PATH, `${JSON.stringify(enrichedRows, null, 2)}\n`, "utf-8");
    writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf-8");
    console.log(`[schooland-kg] wrote snapshot: ${OUTPUT_PATH}`);
    console.log(`[schooland-kg] wrote report: ${REPORT_PATH}`);
  }

  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error("[schooland-kg] fatal:", error);
  process.exit(1);
});