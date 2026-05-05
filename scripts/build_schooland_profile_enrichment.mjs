#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const { values: args } = parseArgs({
  options: {
    input: { type: "string", default: "data/schooland_kg_snapshot.json" },
    output: { type: "string", default: "data/schooland_profile_enrichment.json" },
    sql: { type: "string", default: "supabase/seed/009_schooland_profile_enrichment.sql" },
    report: { type: "string", default: "docs/schooland-profile-enrichment-report.json" },
  },
});

const INPUT_PATH = path.resolve(ROOT, args.input);
const OUTPUT_PATH = path.resolve(ROOT, args.output);
const SQL_PATH = path.resolve(ROOT, args.sql);
const REPORT_PATH = path.resolve(ROOT, args.report);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function collapseWhitespace(value) {
  return (value || "").replace(/\s+/g, " ").trim();
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeOperatorName(value) {
  const text = collapseWhitespace(value)
    .replace(/^辦學團體[:：]\s*/, "")
    .replace(/[()（）\s]+$/g, "")
    .replace(/\s+/g, "");
  if (!text) return null;

  const aliases = [
    [/^仁濟醫院/, "仁濟醫院"],
    [/^保良局/, "保良局"],
    [/^東華三院/, "東華三院"],
    [/^明愛/, "明愛"],
    [/^香港保護兒童會/, "香港保護兒童會"],
    [/^香港基督教服務處/, "香港基督教服務處"],
    [/^香港基督教女青年會|^香港YWCA/i, "香港基督教女青年會"],
    [/^救世軍/, "救世軍"],
    [/^基督教香港信義會/, "基督教香港信義會"],
    [/^基督教香港崇真會/, "基督教香港崇真會"],
    [/^循道衛理|^循道衞理/, "循道衛理聯合教會"],
    [/^香港聖公會|^聖公會/, "香港聖公會"],
    [/^路德會/, "路德會"],
    [/^宣道會|^基督教宣道會/, "基督教宣道會"],
    [/^禮賢會/, "禮賢會"],
    [/^迦南/, "迦南"],
    [/^維多利亞/, "維多利亞"],
    [/^明慧/, "明慧"],
    [/^啓思|^啟思/, "啟思"],
    [/^德寶/, "德寶"],
    [/^英藝/, "英藝"],
    [/^學之園/, "學之園"],
    [/^約克|^York/i, "約克"],
    [/^TutorTime/i, "Tutor Time"],
    [/^Guidepost/i, "Guidepost"],
    [/^蒙特梭利|Montessori/i, "蒙特梭利"],
  ];

  for (const [pattern, canonical] of aliases) {
    if (pattern.test(text)) return canonical;
  }

  return text;
}

function extractOperatorName(row) {
  const history = collapseWhitespace(row.history_summary);
  const match = history.match(/辦學團體[:：]\s*([^，。|]+)/);
  return normalizeOperatorName(match?.[1] ?? null);
}

function inferGroupTag(row, operatorName) {
  const haystack = [
    operatorName,
    row.name_tc,
    row.name_en,
    row.title,
    row.history_summary,
  ].filter(Boolean).join(" ");

  const knownGroups = [
    ["維多利亞", /維多利亞|Victoria/i],
    ["迦南", /迦南|Cannan|Canaan/i],
    ["明慧", /明慧|Ming Wai/i],
    ["啟思", /啓思|啟思|Creative/i],
    ["學之園", /學之園|Learning Habitat/i],
    ["約克", /約克|York/i],
    ["德寶", /德寶|Deborah/i],
    ["英藝", /英藝|Zenith/i],
    ["Tutor Time", /Tutor\s*Time/i],
    ["Guidepost", /Guidepost/i],
    ["蒙特梭利", /蒙特梭利|Montessori/i],
    ["保良局", /保良局/],
    ["東華三院", /東華三院/],
    ["明愛", /明愛/],
    ["仁濟醫院", /仁濟醫院/],
    ["救世軍", /救世軍/],
    ["香港保護兒童會", /香港保護兒童會/],
    ["香港基督教服務處", /香港基督教服務處/],
    ["香港基督教女青年會", /香港基督教女青年會|YWCA/i],
    ["香港聖公會", /香港聖公會|聖公會/],
    ["靈糧堂", /靈糧堂/],
    ["真光", /真光/],
    ["崇真", /崇真/],
    ["民生", /民生/],
  ];

  const found = knownGroups.find(([, pattern]) => pattern.test(haystack));
  return found?.[0] ?? null;
}

function inferFreeScheme(row) {
  const text = `${row.school_category_summary ?? ""} ${row.school_category_text ?? ""} ${row.fee_note ?? ""}`;
  if (/未參加免費幼稚園計劃|沒有參加免費幼稚園計劃|未參加「幼稚園教育計劃」/.test(text)) return false;
  if (/參加免費幼稚園計劃|有參加「幼稚園教育計劃」|參加「幼稚園教育計劃」/.test(text)) return true;
  return null;
}

function inferNurseryService(row) {
  const text = `${row.teaching_text ?? ""} ${row.teaching_summary ?? ""}`;
  if (/幼兒服務[:：][^。]*(沒有|未有|不提供)|沒有提供\s*2-3\s*歲幼兒服務/.test(text)) return "no";
  if (/幼兒服務[:：][^。]*(有提供|提供)|收錄兒童約\s*\d+\s*人|2-3\s*歲幼兒服務/.test(text)) return "yes";
  return "unknown";
}

function inferSizeLabel(row) {
  const capacity = toNumber(row.capacity);
  if (capacity === null) return null;
  if (capacity < 60) return "small";
  if (capacity <= 120) return "medium";
  return "large";
}

function inferSessionLabel(row) {
  const rows = Array.isArray(row.fee_rows) ? row.fee_rows.map((item) => collapseWhitespace(item)) : [];
  const hasValue = (label) => {
    const index = rows.findIndex((item) => item === label);
    if (index < 0) return false;
    return rows.slice(index + 1, index + 4).some((item) => item && item !== "-");
  };
  const hasAm = hasValue("上午班");
  const hasPm = hasValue("下午班");
  const hasWholeDay = hasValue("全日班");

  const count = [hasAm, hasPm, hasWholeDay].filter(Boolean).length;
  if (count > 1) return "mixed";
  if (hasAm) return "am";
  if (hasPm) return "pm";
  if (hasWholeDay) return "whole_day";

  const text = `${row.teaching_text ?? ""} ${row.fee_note ?? ""}`;
  if (/上午班/.test(text) && /下午班/.test(text)) return "mixed";
  if (/全日班/.test(text) && (/上午班/.test(text) || /下午班/.test(text))) return "mixed";
  if (/只設有全日班|全日班/.test(text)) return "whole_day";
  if (/只設有上午班|上午班/.test(text)) return "am";
  if (/只設有下午班|下午班/.test(text)) return "pm";
  return null;
}

function buildSourceFields(record) {
  const keys = [
    "schooland_operator_name",
    "schooland_group_tag",
    "schooland_free_scheme",
    "schooland_nursery_service",
    "schooland_size_label",
    "schooland_session_label",
    "schooland_url",
    "schooland_intro",
    "schooland_teaching_summary",
    "schooland_facilities_summary",
    "schooland_founded_year",
    "schooland_staff_count",
    "schooland_teacher_student_ratio",
  ];
  return keys.reduce((acc, key) => {
    if (record[key] !== null && record[key] !== undefined && record[key] !== "") {
      acc[key] = "schooland.hk/kg";
    }
    return acc;
  }, {});
}

function sqlString(value) {
  if (value === null || value === undefined || value === "") return "NULL";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlNumber(value) {
  if (value === null || value === undefined || value === "") return "NULL";
  return String(value);
}

function sqlBoolean(value) {
  if (value === null || value === undefined) return "NULL";
  return value ? "TRUE" : "FALSE";
}

function sqlJson(value) {
  return `'${JSON.stringify(value ?? {}).replace(/'/g, "''")}'::jsonb`;
}

function buildFeeNotes(row) {
  const parts = [];
  if (row.fee_summary) parts.push(collapseWhitespace(row.fee_summary));
  if (row.fee_note && row.fee_note !== row.fee_summary) parts.push(collapseWhitespace(row.fee_note));
  const text = parts.filter(Boolean).join(" | ");
  return text || null;
}

function buildOtherFees(row) {
  const rows = Array.isArray(row.fee_rows) ? row.fee_rows : [];
  const compact = rows
    .map((cells) => {
      const normalizedCells = Array.isArray(cells) ? cells : [cells];
      return normalizedCells.map((cell) => collapseWhitespace(cell)).filter(Boolean).join(" | ");
    })
    .filter(Boolean)
    .join(" || ");
  return compact || null;
}

function toInt(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = parseInt(String(value).replace(/[^\d]/g, ""), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function toRecord(row) {
  const operatorName = extractOperatorName(row);
  const groupTag = inferGroupTag(row, operatorName);
  return {
    school_code: row.matched_school_code,
    name_tc: row.matched_school_name_tc || row.name_tc || null,
    name_en: row.matched_school_name_en || row.name_en || null,
    website: row.website || null,
    fee_annual_hkd: toNumber(row.annual_fee_hkd),
    fee_notes: buildFeeNotes(row),
    other_fees_note: buildOtherFees(row),
    schooland_name_tc: row.name_tc || null,
    schooland_name_en: row.name_en || null,
    schooland_url: row.detail_url || row.canonical_url || null,
    schooland_match_method: row.matched_school_method || null,
    schooland_district_label: row.district_label || null,
    schooland_address_tc: row.address_tc || null,
    schooland_phone: row.phone || null,
    schooland_operator_name: operatorName,
    schooland_group_tag: groupTag,
    schooland_free_scheme: inferFreeScheme(row),
    schooland_nursery_service: inferNurseryService(row),
    schooland_size_label: inferSizeLabel(row),
    schooland_session_label: inferSessionLabel(row),
    schooland_intro: collapseWhitespace(row.intro) || null,
    schooland_teaching_summary: collapseWhitespace(row.teaching_summary) || null,
    schooland_facilities_summary: collapseWhitespace(row.facilities_summary) || null,
    schooland_founded_year: toInt(row.founded_year),
    schooland_staff_count: toInt(row.staff_count),
    schooland_teacher_student_ratio: collapseWhitespace(row.teacher_student_ratio) || null,
    source: "schooland.hk/kg",
  };
}

function writeSql(records) {
  const lines = [
    "-- Schooland kindergarten profile enrichment",
    "-- Generated from matched Schooland rows",
  ];

  for (const item of records) {
    const assignments = [
      `name_tc = COALESCE(${sqlString(item.name_tc)}, name_tc)`,
      `name_en = COALESCE(${sqlString(item.name_en)}, name_en)`,
      `website = COALESCE(${sqlString(item.website)}, website)`,
      `fee_annual_hkd = COALESCE(${sqlNumber(item.fee_annual_hkd)}, fee_annual_hkd)`,
      `fee_notes = COALESCE(${sqlString(item.fee_notes)}, fee_notes)`,
      `other_fees_note = COALESCE(${sqlString(item.other_fees_note)}, other_fees_note)`,
      `schooland_operator_name = ${sqlString(item.schooland_operator_name)}`,
      `schooland_group_tag = ${sqlString(item.schooland_group_tag)}`,
      `schooland_free_scheme = ${sqlBoolean(item.schooland_free_scheme)}`,
      `schooland_nursery_service = ${sqlString(item.schooland_nursery_service)}`,
      `schooland_size_label = ${sqlString(item.schooland_size_label)}`,
      `schooland_session_label = ${sqlString(item.schooland_session_label)}`,
      `schooland_url = ${sqlString(item.schooland_url)}`,
      `schooland_source_url = ${sqlString(item.schooland_url)}`,
      `schooland_source_updated_at = now()`,
      `schooland_source_fields = ${sqlJson(buildSourceFields(item))}`,
      `schooland_secondary_flags = jsonb_strip_nulls(jsonb_build_object('name_tc', CASE WHEN name_tc IS NULL AND ${sqlString(item.name_tc)} IS NOT NULL THEN 'schooland.hk/kg' ELSE NULL END, 'name_en', CASE WHEN name_en IS NULL AND ${sqlString(item.name_en)} IS NOT NULL THEN 'schooland.hk/kg' ELSE NULL END, 'website', CASE WHEN website IS NULL AND ${sqlString(item.website)} IS NOT NULL THEN 'schooland.hk/kg' ELSE NULL END, 'fee_annual_hkd', CASE WHEN fee_annual_hkd IS NULL AND ${sqlNumber(item.fee_annual_hkd)} IS NOT NULL THEN 'schooland.hk/kg' ELSE NULL END))`,
      `schooland_intro = COALESCE(${sqlString(item.schooland_intro)}, schooland_intro)`,
      `schooland_teaching_summary = COALESCE(${sqlString(item.schooland_teaching_summary)}, schooland_teaching_summary)`,
      `schooland_facilities_summary = COALESCE(${sqlString(item.schooland_facilities_summary)}, schooland_facilities_summary)`,
      `schooland_founded_year = COALESCE(${sqlNumber(item.schooland_founded_year)}, schooland_founded_year)`,
      `schooland_staff_count = COALESCE(${sqlNumber(item.schooland_staff_count)}, schooland_staff_count)`,
      `schooland_teacher_student_ratio = COALESCE(${sqlString(item.schooland_teacher_student_ratio)}, schooland_teacher_student_ratio)`,
      "last_profile_scraped_at = now()",
    ];
    lines.push(
      "UPDATE schools SET\n  " + assignments.join(",\n  ") + `\nWHERE school_code = '${item.school_code}';`,
    );
  }

  ensureParentDir(SQL_PATH);
  fs.writeFileSync(SQL_PATH, `${lines.join("\n")}\n`, "utf8");
}

function main() {
  const rows = readJson(INPUT_PATH);
  const matchedRows = rows.filter((row) => row.matched_school_code && row.matched_school_method !== "unmatched");
  const records = matchedRows.map(toRecord);
  const withAnnualFee = records.filter((row) => row.fee_annual_hkd !== null).length;
  const withWebsite = records.filter((row) => row.website).length;
  const withOperator = records.filter((row) => row.schooland_operator_name).length;
  const withGroupTag = records.filter((row) => row.schooland_group_tag).length;
  const withFreeScheme = records.filter((row) => row.schooland_free_scheme !== null).length;
  const withNurseryService = records.filter((row) => row.schooland_nursery_service !== "unknown").length;
  const withSizeLabel = records.filter((row) => row.schooland_size_label).length;
  const withSessionLabel = records.filter((row) => row.schooland_session_label).length;
  const withIntro = records.filter((row) => row.schooland_intro).length;
  const withTeachingSummary = records.filter((row) => row.schooland_teaching_summary).length;
  const withFacilitiesSummary = records.filter((row) => row.schooland_facilities_summary).length;
  const withFoundedYear = records.filter((row) => row.schooland_founded_year).length;
  const withStaffCount = records.filter((row) => row.schooland_staff_count).length;
  const withTSR = records.filter((row) => row.schooland_teacher_student_ratio).length;

  ensureParentDir(OUTPUT_PATH);
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(records, null, 2)}\n`, "utf8");
  writeSql(records);

  const report = {
    generated_at: new Date().toISOString(),
    source_snapshot: path.relative(ROOT, INPUT_PATH),
    total_rows: rows.length,
    matched_rows: matchedRows.length,
    exported_rows: records.length,
    with_annual_fee: withAnnualFee,
    with_website: withWebsite,
    with_operator: withOperator,
    with_group_tag: withGroupTag,
    with_free_scheme: withFreeScheme,
    with_nursery_service: withNurseryService,
    with_size_label: withSizeLabel,
    with_session_label: withSessionLabel,
    with_intro: withIntro,
    with_teaching_summary: withTeachingSummary,
    with_facilities_summary: withFacilitiesSummary,
    with_founded_year: withFoundedYear,
    with_staff_count: withStaffCount,
    with_teacher_student_ratio: withTSR,
    match_methods: matchedRows.reduce((acc, row) => {
      acc[row.matched_school_method] = (acc[row.matched_school_method] || 0) + 1;
      return acc;
    }, {}),
  };

  ensureParentDir(REPORT_PATH);
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));
}

main();
