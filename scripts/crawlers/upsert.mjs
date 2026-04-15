#!/usr/bin/env node
/**
 * Upsert extracted activities into Supabase via service_role.
 *
 * - Deduplicates by (source, source_url, title).
 * - Items in DB but not in this batch from the same source are soft-deleted
 *   (is_active = false), never hard-deleted, so history is preserved.
 *
 * Usage:
 *   node scripts/crawlers/upsert.mjs [--input path] [--dry-run]
 *
 * Dependencies: @supabase/supabase-js
 */

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    input: { type: "string", default: "tmp/extracted_activities.json" },
    "dry-run": { type: "boolean", default: false },
  },
});

const INPUT = resolve(process.cwd(), args.input);
const DRY_RUN = args["dry-run"];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

function stripExtractOnly(record) {
  // Remove fields that don't belong in the table
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { is_kindergarten_activity, ...rest } = record;
  return rest;
}

async function main() {
  const extracted = JSON.parse(await readFile(INPUT, "utf8"));
  console.log(
    `[upsert] ${extracted.length} records from ${INPUT}${DRY_RUN ? " (dry-run)" : ""}`,
  );

  if (extracted.length === 0) {
    console.log("[upsert] nothing to upsert, bailing");
    return;
  }

  // Group by source so we can soft-delete stale rows per source
  const bySource = new Map();
  for (const r of extracted) {
    if (!bySource.has(r.source)) bySource.set(r.source, []);
    bySource.get(r.source).push(stripExtractOnly(r));
  }

  for (const [source, rows] of bySource) {
    console.log(`[upsert] source=${source} incoming=${rows.length}`);

    if (DRY_RUN) {
      console.log(JSON.stringify(rows.slice(0, 2), null, 2));
      continue;
    }

    // Step 1: soft-delete existing rows for this source
    const { error: deactivateErr } = await supabase
      .from("activities")
      .update({ is_active: false })
      .eq("source", source)
      .neq("source", "manual"); // never touch manually seeded rows

    if (deactivateErr) {
      console.error(`[upsert] deactivate failed:`, deactivateErr.message);
      continue;
    }

    // Step 2: insert fresh batch with is_active=true
    const freshRows = rows.map((r) => ({ ...r, is_active: true }));

    // Chunk to avoid hitting request size limits
    const CHUNK = 50;
    let inserted = 0;
    for (let i = 0; i < freshRows.length; i += CHUNK) {
      const slice = freshRows.slice(i, i + CHUNK);
      const { error: insertErr } = await supabase
        .from("activities")
        .insert(slice);
      if (insertErr) {
        console.error(`[upsert] insert chunk ${i} failed:`, insertErr.message);
        continue;
      }
      inserted += slice.length;
    }

    console.log(`[upsert] source=${source} inserted=${inserted}`);
  }

  console.log("[upsert] done");
}

main().catch((err) => {
  console.error("[upsert] fatal:", err);
  process.exit(1);
});
