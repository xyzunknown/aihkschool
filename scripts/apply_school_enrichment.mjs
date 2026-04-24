#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const EDB_JSON_PATH = path.join(ROOT, "data", "edb_fee_enrichment.json");
const PRIVATE_JSON_PATH = path.join(ROOT, "data", "private_international_profile_enrichment.json");
const PRIVATE_VACANCY_JSON_PATH = path.join(ROOT, "data", "private_international_vacancy_enrichment.json");
const SCHOOLAND_JSON_PATH = path.join(ROOT, "data", "schooland_profile_enrichment.json");

const DRY_RUN = process.argv.includes("--dry-run");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

async function detectAvailableColumns(supabase, candidateColumns) {
  const available = new Set(candidateColumns);

  while (true) {
    const columns = ["id", ...available].join(", ");
    const { error } = await supabase.from("schools").select(columns).limit(1);

    if (!error) {
      return available;
    }

    const message = `${error.message ?? ""} ${error.details ?? ""}`;
    const match =
      message.match(/schools\.([a-zA-Z0-9_]+)/) ||
      message.match(/'([a-zA-Z0-9_]+)' column/);

    if (!match) {
      throw new Error(`Unable to detect schema columns: ${message}`);
    }

    const missingColumn = match[1];
    if (!available.has(missingColumn)) {
      throw new Error(`Schema detection failed on unexpected column: ${missingColumn}`);
    }

    available.delete(missingColumn);
  }
}

function pickPayload(source, allowedColumns) {
  const payload = {};
  for (const [key, value] of Object.entries(source)) {
    if (value === undefined || value === null) continue;
    if (allowedColumns.has(key)) {
      payload[key] = value;
    }
  }
  return payload;
}

async function applyDataset({ supabase, rows, allowedColumns, label }) {
  let updated = 0;
  const secondaryOnly = label === "Schooland";
  const protectedColumns = new Set([
    "name_tc",
    "name_en",
    "website",
    "fee_monthly_hkd",
    "fee_annual_hkd",
    "application_fee_hkd",
    "registration_fee_hkd",
    "fee_notes",
    "other_fees_note",
    "application_status",
    "application_details",
    "application_url",
    "open_day_details",
    "open_day_url",
  ]);

  for (const row of rows) {
    if (!row.school_code) continue;

    const payload = pickPayload(
      {
        name_tc: row.name_tc,
        name_en: row.name_en,
        website: row.website,
        logo_url: row.logo_url,
        kep_participant: row.kep_participant,
        fee_monthly_hkd: row.fee_monthly_hkd,
        fee_annual_hkd: row.fee_annual_hkd,
        application_fee_hkd: row.application_fee_hkd,
        registration_fee_hkd: row.registration_fee_hkd,
        fee_notes: row.fee_notes,
        other_fees_note: row.other_fees_note,
        application_status: row.application_status,
        application_details: row.application_details,
        application_url: row.application_url,
        open_day_details: row.open_day_details,
        open_day_url: row.open_day_url,
        schooland_operator_name: row.schooland_operator_name,
        schooland_group_tag: row.schooland_group_tag,
        schooland_free_scheme: row.schooland_free_scheme,
        schooland_nursery_service: row.schooland_nursery_service,
        schooland_size_label: row.schooland_size_label,
        schooland_session_label: row.schooland_session_label,
        schooland_url: row.schooland_url,
        schooland_source_url: row.schooland_url,
        schooland_source_updated_at: row.source === "schooland.hk/kg" ? new Date().toISOString() : undefined,
        schooland_source_fields:
          row.source === "schooland.hk/kg"
            ? {
                ...(row.schooland_operator_name ? { schooland_operator_name: row.source } : {}),
                ...(row.schooland_group_tag ? { schooland_group_tag: row.source } : {}),
                ...(row.schooland_free_scheme !== null && row.schooland_free_scheme !== undefined
                  ? { schooland_free_scheme: row.source }
                  : {}),
                ...(row.schooland_nursery_service ? { schooland_nursery_service: row.source } : {}),
                ...(row.schooland_size_label ? { schooland_size_label: row.source } : {}),
                ...(row.schooland_session_label ? { schooland_session_label: row.source } : {}),
                ...(row.schooland_url ? { schooland_url: row.source } : {}),
              }
            : undefined,
        last_profile_scraped_at: new Date().toISOString(),
      },
      allowedColumns
    );

    if (Object.keys(payload).length === 0) {
      continue;
    }

    if (secondaryOnly) {
      const protectedSelect = Array.from(protectedColumns)
        .filter((column) => allowedColumns.has(column))
        .join(", ");

      if (protectedSelect) {
        const { data: existing, error: selectError } = await supabase
          .from("schools")
          .select(protectedSelect)
          .eq("school_code", row.school_code)
          .maybeSingle();

        if (selectError) {
          throw new Error(`${label} select failed for ${row.school_code}: ${selectError.message}`);
        }

        const secondaryFlags = {};
        for (const column of protectedColumns) {
          if (!(column in payload)) continue;
          const existingValue = existing?.[column];
          const hasOfficialValue =
            existingValue !== null &&
            existingValue !== undefined &&
            existingValue !== "";
          if (hasOfficialValue) {
            delete payload[column];
          } else {
            secondaryFlags[column] = "schooland.hk/kg";
          }
        }

        if (allowedColumns.has("schooland_secondary_flags")) {
          payload.schooland_secondary_flags = secondaryFlags;
        }
      }
    }

    const { error } = await supabase
      .from("schools")
      .update(payload)
      .eq("school_code", row.school_code);

    if (error) {
      throw new Error(`${label} update failed for ${row.school_code}: ${error.message}`);
    }

    updated += 1;
  }

  return updated;
}

async function loadSchoolIdMap(supabase, schoolCodes) {
  const map = new Map();
  const uniqueCodes = Array.from(new Set(schoolCodes.filter(Boolean)));

  for (let index = 0; index < uniqueCodes.length; index += 100) {
    const chunk = uniqueCodes.slice(index, index + 100);
    const { data, error } = await supabase
      .from("schools")
      .select("id, school_code")
      .in("school_code", chunk);

    if (error) {
      throw new Error(`Failed to load school ids: ${error.message}`);
    }

    for (const row of data ?? []) {
      map.set(row.school_code, row.id);
    }
  }

  return map;
}

async function applyVacancyDataset({ supabase, rows, label }) {
  let updated = 0;
  const schoolIdMap = await loadSchoolIdMap(
    supabase,
    rows.map((row) => row.school_code)
  );

  for (const row of rows) {
    if (!row.school_code) continue;
    const schoolId = schoolIdMap.get(row.school_code);
    if (!schoolId) continue;

    const payload = {
      school_id: schoolId,
      academic_year: row.academic_year,
      n_vacancy: row.n_vacancy,
      k1_vacancy: row.k1_vacancy,
      k2_vacancy: row.k2_vacancy,
      k3_vacancy: row.k3_vacancy,
      edb_source_url: row.source_url ?? null,
      is_current: true,
    };

    const { data: existing, error: selectError } = await supabase
      .from("vacancies")
      .select("id")
      .eq("school_id", schoolId)
      .eq("academic_year", row.academic_year)
      .eq("is_current", true)
      .limit(1)
      .maybeSingle();

    if (selectError) {
      throw new Error(`${label} select failed for ${row.school_code}: ${selectError.message}`);
    }

    if (existing?.id) {
      const { error } = await supabase
        .from("vacancies")
        .update({
          n_vacancy: payload.n_vacancy,
          k1_vacancy: payload.k1_vacancy,
          k2_vacancy: payload.k2_vacancy,
          k3_vacancy: payload.k3_vacancy,
          edb_source_url: payload.edb_source_url,
        })
        .eq("id", existing.id);

      if (error) {
        throw new Error(`${label} update failed for ${row.school_code}: ${error.message}`);
      }
    } else {
      const { error } = await supabase.from("vacancies").insert(payload);
      if (error) {
        throw new Error(`${label} insert failed for ${row.school_code}: ${error.message}`);
      }
    }

    updated += 1;
  }

  return updated;
}

async function main() {
  const edbRows = readJson(EDB_JSON_PATH);
  const privateRows = readJson(PRIVATE_JSON_PATH);
  const privateVacancyRows = readJson(PRIVATE_VACANCY_JSON_PATH);
  const schoolandRows = fs.existsSync(SCHOOLAND_JSON_PATH) ? readJson(SCHOOLAND_JSON_PATH) : [];

  console.log(`EDB rows: ${edbRows.length}`);
  console.log(`Private/international rows: ${privateRows.length}`);
  console.log(`Private/international vacancy rows: ${privateVacancyRows.length}`);
  console.log(`Schooland rows: ${schoolandRows.length}`);

  if (DRY_RUN) {
    console.log("Dry run only. No database updates performed.");
    return;
  }

  const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const allowedColumns = await detectAvailableColumns(supabase, [
    "name_tc",
    "name_en",
    "website",
    "logo_url",
    "kep_participant",
    "fee_monthly_hkd",
    "fee_annual_hkd",
    "application_fee_hkd",
    "registration_fee_hkd",
    "fee_notes",
    "other_fees_note",
    "application_status",
    "application_details",
    "application_url",
    "open_day_details",
    "open_day_url",
    "schooland_operator_name",
    "schooland_group_tag",
    "schooland_free_scheme",
    "schooland_nursery_service",
    "schooland_size_label",
    "schooland_session_label",
    "schooland_url",
    "schooland_source_url",
    "schooland_source_updated_at",
    "schooland_source_fields",
    "schooland_secondary_flags",
    "last_profile_scraped_at",
  ]);

  console.log(`Available columns: ${Array.from(allowedColumns).sort().join(", ")}`);

  const edbUpdated = await applyDataset({
    supabase,
    rows: edbRows,
    allowedColumns,
    label: "EDB",
  });

  const privateUpdated = await applyDataset({
    supabase,
    rows: privateRows,
    allowedColumns,
    label: "Private/international",
  });

  const schoolandUpdated = await applyDataset({
    supabase,
    rows: schoolandRows,
    allowedColumns,
    label: "Schooland",
  });

  const privateVacancyUpdated = await applyVacancyDataset({
    supabase,
    rows: privateVacancyRows,
    label: "Private/international vacancies",
  });

  console.log(`Updated from EDB dataset: ${edbUpdated}`);
  console.log(`Updated from private/international dataset: ${privateUpdated}`);
  console.log(`Updated from Schooland dataset: ${schoolandUpdated}`);
  console.log(`Updated from private/international vacancy dataset: ${privateVacancyUpdated}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
