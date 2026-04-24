#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    sample: { type: "string", default: "50" },
    output: { type: "string", default: "docs/chsc-master-chain-decision.json" },
  },
});

const sampleSize = Number.parseInt(values.sample, 10);
const kgpRows = readFileSync("data/KGP_2025_tc.csv", "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .slice(1, sampleSize + 1);

const sample = kgpRows.map((line) => {
  const cols = line.split("^");
  return {
    school_code: cols[0],
    name_tc: cols[2],
    district: cols[3],
    website: cols[27] || null,
    chsc_profile_surface: `https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=${cols[0]}`,
  };
});

const output = {
  generated_at: new Date().toISOString(),
  sample_size: sample.length,
  checked_questions: [
    "Does CHSC provide stable fields missing from the current KGP / EDB master chain?",
    "Can CHSC identity map stably to existing school_code records?",
  ],
  conclusion: "chsc_not_enter_master_chain",
  conclusion_sentence:
    "CHSC does not enter the separate master chain because the kindergarten CHSC surface is the KGP/EDB profile already represented by data/KGP_2025_tc.csv; no independent stable identifier or clearly missing stable field is available in the repository.",
  future_rule:
    "If a separate stable CHSC dataset is added later, it may enter only as official_supplement and must not replace KGP / EDB identity fields.",
  sample,
};

writeFileSync(values.output, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  sample_size: output.sample_size,
  conclusion: output.conclusion,
  conclusion_sentence: output.conclusion_sentence,
}, null, 2));
