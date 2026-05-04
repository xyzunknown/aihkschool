#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { createClient } from "@supabase/supabase-js";

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

const { values: args } = parseArgs({
  options: {
    queue: { type: "string", default: "data/xhs/internal_priority_school_top100.json" },
    report: { type: "string", default: "docs/school-website-report.priority-top100-2026-05-04.json" },
    output: { type: "string", default: "data/xhs/internal_priority_school_top100_results.json" },
  },
});

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required");
  }
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

function loadJson(path) {
  return JSON.parse(readFileSync(resolve(process.cwd(), path), "utf-8"));
}

function chunk(items, size) {
  const output = [];
  for (let index = 0; index < items.length; index += size) {
    output.push(items.slice(index, index + size));
  }
  return output;
}

function hasUsefulExtraction(row) {
  return Boolean(
    row.application_url ||
    row.open_day_date ||
    row.open_day_details ||
    row.application_process ||
    row.vacancy_k1 ||
    row.vacancy_k2 ||
    row.vacancy_k3
  );
}

async function fetchSchools(supabase, codes) {
  const rows = [];
  for (const codeChunk of chunk(codes, 100)) {
    const { data, error } = await supabase
      .from("schools")
      .select("id, school_code, name_tc, name_en, website, school_type")
      .in("school_code", codeChunk);
    if (error) throw error;
    rows.push(...(data || []));
  }
  return rows;
}

async function fetchEnrichments(supabase, schoolIds) {
  const rows = [];
  for (const idChunk of chunk(schoolIds, 100)) {
    const { data, error } = await supabase
      .from("school_enrichments")
      .select(
        "school_id, application_url, open_day_date, open_day_details, application_process, admission_hours, vacancy_k1, vacancy_k2, vacancy_k3, scrape_confidence, last_crawled_at"
      )
      .in("school_id", idChunk);
    if (error) throw error;
    rows.push(...(data || []));
  }
  return rows;
}

async function main() {
  const queue = loadJson(args.queue);
  const queueRows = queue.schools || [];
  const report = existsSync(resolve(process.cwd(), args.report)) ? loadJson(args.report) : null;
  const codes = queueRows.map((item) => item.school_code);

  const supabase = getSupabase();
  const schools = await fetchSchools(supabase, codes);
  const schoolsByCode = new Map(schools.map((row) => [row.school_code, row]));
  const enrichments = await fetchEnrichments(supabase, schools.map((row) => row.id));
  const enrichmentsById = new Map(enrichments.map((row) => [row.school_id, row]));
  const reportByCode = new Map();
  for (const detail of report?.details || []) {
    if (detail.school_code) reportByCode.set(detail.school_code, detail);
  }

  const rows = queueRows.map((item) => {
    const school = schoolsByCode.get(item.school_code) || null;
    const enrichment = school ? enrichmentsById.get(school.id) || null : null;
    const reportDetail = reportByCode.get(item.school_code) || null;
    return {
      rank: item.rank,
      school_code: item.school_code,
      queue_name_tc: item.name_tc,
      db_name_tc: school?.name_tc || null,
      name_en: school?.name_en || item.name_en || null,
      website: school?.website || item.website || null,
      school_type: school?.school_type || item.school_type || null,
      crawl_status: reportDetail?.status || null,
      crawl_url: reportDetail?.crawl_url || school?.website || item.website || null,
      crawl_notes: reportDetail?.notes || [],
      application_url: enrichment?.application_url || null,
      open_day_date: enrichment?.open_day_date || null,
      open_day_details: enrichment?.open_day_details || null,
      application_process: enrichment?.application_process || null,
      admission_hours: enrichment?.admission_hours || null,
      vacancy_k1: enrichment?.vacancy_k1 || null,
      vacancy_k2: enrichment?.vacancy_k2 || null,
      vacancy_k3: enrichment?.vacancy_k3 || null,
      scrape_confidence: enrichment?.scrape_confidence || null,
      last_crawled_at: enrichment?.last_crawled_at || null,
      useful_extraction: hasUsefulExtraction(enrichment || {}),
      queue_sources: item.sources || [],
      queue_reasons: item.reasons || [],
    };
  });

  const acceptance = {
    total_targets: queueRows.length,
    report_rows: report?.details?.length || 0,
    mapped_school_rows: rows.filter((row) => row.db_name_tc).length,
    crawled_rows: rows.filter((row) => row.crawl_status).length,
    useful_extraction_rows: rows.filter((row) => row.useful_extraction).length,
    application_signal_rows: rows.filter((row) => row.application_url || row.application_process).length,
    open_day_signal_rows: rows.filter((row) => row.open_day_date || row.open_day_details).length,
    vacancy_signal_rows: rows.filter((row) => row.vacancy_k1 || row.vacancy_k2 || row.vacancy_k3).length,
    status_breakdown: report?.stats || {},
  };

  const payload = {
    generated_at: new Date().toISOString(),
    queue_file: args.queue,
    report_file: args.report,
    acceptance,
    rows,
  };

  writeFileSync(resolve(process.cwd(), args.output), JSON.stringify(payload, null, 2), "utf-8");
  console.log(`[export-priority-school-results] wrote ${args.output}`);
  console.log(JSON.stringify(acceptance, null, 2));
}

main().catch((error) => {
  console.error("[export-priority-school-results] fatal:", error);
  process.exit(1);
});