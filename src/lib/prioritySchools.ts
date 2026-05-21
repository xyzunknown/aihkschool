import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

export interface PrioritySchoolItem {
  school_code: string;
  rank: number;
  name_tc: string;
  name_en: string | null;
  website: string | null;
  school_type: string;
  application_url: string | null;
  application_process_summary: string | null;
  open_day_date: string | null;
  open_day_details: string | null;
  has_application_signal: boolean;
  has_open_day_signal: boolean;
  has_validated_open_day: boolean;
  open_day_review_status: string | null;
  open_day_signal_tier: string | null;
  scrape_confidence: string | null;
  queue_sources: string[];
}

interface PrioritySchoolFeed {
  generated_at?: string;
  source_file?: string;
  total_rows?: number;
  raw_open_day_rows?: number;
  validated_open_day_rows?: number;
  rows?: PrioritySchoolItem[];
}

const PRIORITY_SCHOOL_FILE = path.join(
  process.cwd(),
  "data",
  "xhs",
  "internal_priority_school_top100_results.json"
);

type PrioritySchoolRawRow = Partial<PrioritySchoolItem> & {
  db_name_tc?: string;
  queue_name_tc?: string;
  application_process?: string | null;
};

function summarize(text?: string | null) {
  if (!text) return null;
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return null;
  return normalized.length > 210 ? `${normalized.slice(0, 210).trim()}…` : normalized;
}

function toPrioritySchool(row: PrioritySchoolRawRow): PrioritySchoolItem | null {
  const nameTc = row.name_tc || row.db_name_tc || row.queue_name_tc;
  if (!row.school_code || !nameTc || typeof row.rank !== "number") return null;

  return {
    school_code: row.school_code,
    rank: row.rank,
    name_tc: nameTc,
    name_en: row.name_en ?? null,
    website: row.website ?? null,
    school_type: row.school_type ?? "unknown",
    application_url: row.application_url ?? null,
    application_process_summary: row.application_process_summary ?? summarize(row.application_process),
    open_day_date: row.open_day_date ?? null,
    open_day_details: row.open_day_details ?? null,
    has_application_signal: row.has_application_signal ?? Boolean(row.application_url || row.application_process),
    has_open_day_signal: row.has_open_day_signal ?? Boolean(row.open_day_date || row.open_day_details),
    has_validated_open_day: row.has_validated_open_day ?? false,
    open_day_review_status: row.open_day_review_status ?? null,
    open_day_signal_tier: row.open_day_signal_tier ?? null,
    scrape_confidence: row.scrape_confidence ?? null,
    queue_sources: Array.isArray(row.queue_sources) ? row.queue_sources : [],
  };
}

export async function getPrioritySchools(): Promise<PrioritySchoolItem[]> {
  try {
    const raw = await fs.readFile(PRIORITY_SCHOOL_FILE, "utf8");
    const parsed = JSON.parse(raw) as PrioritySchoolFeed;
    return Array.isArray(parsed.rows)
      ? parsed.rows
        .map((row) => toPrioritySchool(row as PrioritySchoolRawRow))
        .filter((row): row is PrioritySchoolItem => row !== null)
        .sort((a, b) => a.rank - b.rank)
      : [];
  } catch {
    return [];
  }
}
