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
  "internal_priority_school_frontend65.json"
);

export async function getPrioritySchools(): Promise<PrioritySchoolItem[]> {
  try {
    const raw = await fs.readFile(PRIORITY_SCHOOL_FILE, "utf8");
    const parsed = JSON.parse(raw) as PrioritySchoolFeed;
    return Array.isArray(parsed.rows) ? parsed.rows : [];
  } catch {
    return [];
  }
}
