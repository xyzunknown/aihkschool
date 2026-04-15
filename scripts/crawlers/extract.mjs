#!/usr/bin/env node
/**
 * AI-driven structured extraction for activities.
 *
 * Reads raw_activities.json (produced by any crawler — lcsd, ymca, etc.)
 * and uses Claude Haiku 4.5 with tool-use to extract structured fields
 * matching the `activities` table schema.
 *
 * Why tool-use: guarantees valid JSON output, no regex parsing.
 * Why Haiku: cheap + fast; extraction is classification, not reasoning.
 * Prompt caching: system prompt + schema are cached; only per-record input
 * is uncached. Keeps cost under $0.001 per record.
 *
 * Usage:
 *   node scripts/crawlers/extract.mjs [--input path] [--output path]
 *
 * Dependencies: @anthropic-ai/sdk
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    input: { type: "string", default: "tmp/raw_activities.json" },
    output: { type: "string", default: "tmp/extracted_activities.json" },
    model: { type: "string", default: "claude-haiku-4-5" },
  },
});

const INPUT = resolve(process.cwd(), args.input);
const OUTPUT = resolve(process.cwd(), args.output);

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY not set");
  process.exit(1);
}

const client = new Anthropic();

// ============================================================
// Tool schema (matches activities table columns)
// ============================================================
const EXTRACT_TOOL = {
  name: "extract_activity",
  description:
    "Extract structured data for a Hong Kong kindergarten-age (3-6) extracurricular activity.",
  input_schema: {
    type: "object",
    properties: {
      is_kindergarten_activity: {
        type: "boolean",
        description:
          "True only if this activity is suitable for kindergarten-age children (3-6). False for adult, teen, or generic programmes.",
      },
      title: { type: "string", description: "Activity title in Traditional Chinese" },
      category: {
        type: "string",
        enum: [
          "music",
          "sports",
          "art",
          "dance",
          "stem",
          "language",
          "drama",
          "other",
        ],
      },
      organizer: { type: ["string", "null"] },
      district: {
        type: ["string", "null"],
        enum: [
          null,
          "central_and_western",
          "eastern",
          "southern",
          "wan_chai",
          "kowloon_city",
          "kwun_tong",
          "sham_shui_po",
          "wong_tai_sin",
          "yau_tsim_mong",
          "islands",
          "kwai_tsing",
          "north",
          "sai_kung",
          "sha_tin",
          "tai_po",
          "tsuen_wan",
          "tuen_mun",
          "yuen_long",
        ],
      },
      address: { type: ["string", "null"] },
      description: { type: ["string", "null"] },
      age_min: { type: ["integer", "null"] },
      age_max: { type: ["integer", "null"] },
      fee: {
        type: ["number", "null"],
        description: "HKD amount. Use 0 for free activities. Null if unknown.",
      },
      fee_note: { type: ["string", "null"] },
      start_date: {
        type: ["string", "null"],
        description: "ISO date YYYY-MM-DD",
      },
      end_date: { type: ["string", "null"] },
      schedule: { type: ["string", "null"] },
      contact_phone: { type: ["string", "null"] },
      contact_url: { type: ["string", "null"] },
      match_confidence: {
        type: "string",
        enum: ["high", "medium", "low"],
        description:
          "high = all core fields confidently extracted; medium = some guessing; low = significant uncertainty.",
      },
    },
    required: [
      "is_kindergarten_activity",
      "title",
      "category",
      "match_confidence",
    ],
  },
};

const SYSTEM_PROMPT = `You are extracting Hong Kong kindergarten-age (3-6) extracurricular activity data from scraped Traditional Chinese text.

Rules:
- All user-facing text must be Traditional Chinese (繁體中文).
- district must be one of the 18 official HK districts, mapped from the activity venue.
- If the activity is clearly for adults, teens, or not age-appropriate for 3-6, set is_kindergarten_activity=false.
- Use match_confidence=low when critical fields like date or venue are missing or ambiguous.
- fee: 0 for free, null for unknown, otherwise HKD numeric amount.
- Always call the extract_activity tool exactly once.`;

// ============================================================
// Main
// ============================================================

async function extractOne(record) {
  const response = await client.messages.create({
    model: args.model,
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    tools: [EXTRACT_TOOL],
    tool_choice: { type: "tool", name: "extract_activity" },
    messages: [
      {
        role: "user",
        content: `Source: ${record.source}\nURL: ${record.source_url}\n\nRaw text:\n${record.raw_text}`,
      },
    ],
  });

  const toolUse = response.content.find((c) => c.type === "tool_use");
  if (!toolUse) return null;
  return toolUse.input;
}

async function main() {
  const raw = JSON.parse(await readFile(INPUT, "utf8"));
  console.log(`[extract] processing ${raw.length} records with ${args.model}`);

  const extracted = [];
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < raw.length; i++) {
    const record = raw[i];
    try {
      const data = await extractOne(record);
      if (!data) {
        failed++;
        continue;
      }
      if (!data.is_kindergarten_activity) {
        skipped++;
        continue;
      }
      extracted.push({
        ...data,
        source: record.source,
        source_url: record.source_url,
        raw_extracted: data,
      });
      if ((i + 1) % 10 === 0) {
        console.log(`[extract] progress ${i + 1}/${raw.length}`);
      }
    } catch (err) {
      console.error(`[extract] record ${i} failed:`, err.message);
      failed++;
    }
  }

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, JSON.stringify(extracted, null, 2), "utf8");
  console.log(
    `[extract] done — kept ${extracted.length}, skipped ${skipped} (not KG age), failed ${failed}`,
  );
  console.log(`[extract] wrote → ${OUTPUT}`);
}

main().catch((err) => {
  console.error("[extract] fatal:", err);
  process.exit(1);
});
