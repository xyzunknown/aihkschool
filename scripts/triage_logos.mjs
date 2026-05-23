#!/usr/bin/env node
// One-off triage of public/logos. Classifies every file as:
//   - placeholder-svg : fake "grey circle + first letter" SVG (the source of the
//                       inconsistent circles on the school list)
//   - junk-png        : stock photos / CMS favicons / blank / corrupted images,
//                       identified by md5 against a manually-reviewed deny list
//   - real            : keep
// Writes data/logo-cache/triage-report.json and prints a summary.
// Run: node scripts/triage_logos.mjs            (report only)
//      node scripts/triage_logos.mjs --apply    (also delete flagged files)

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOGOS_DIR = path.join(ROOT, "public", "logos");
const REPORT = path.join(ROOT, "data", "logo-cache", "triage-report.json");

// md5 of PNG content groups manually reviewed and confirmed NOT real logos
// (stock classroom photos, promo posters, CMS/template favicons, blank or
// corrupted images, wrong-content images). See plan for the per-group review.
const JUNK_PNG_MD5 = new Set([
  "c0e2d7deb762e16c6c7588e1052da17a", // generic blue gears icon
  "6024fb6b7c8711741d656e5486adba3b", // generic colourful swoosh (template)
  "4fbb6a20f3cb1a3263c3221653b8a72e", // blurry yellow blob
  "ea88168cffb0ee4a87572c4701e0afbd", // "SIAM188" gambling-site watermark
  "2f2344d5cd2fc0006fbde4de904729cc", // stock classroom photo (Victoria etc.)
  "138bfe855e088171be9eefbfb4b80abf", // generic blue globe icon
  "ca0fa6e1aa5e6cd65e2da937f4745550", // generic blue "g" favicon
  "7385d53865f98ae864c7bd3a0e76d70d", // stock royal heraldic crest
  "daf840f0f03a17c1273b8afe813f6c70", // cropped / cut-off logo fragment
  "3ae6fa05486209ecf6743db0958bd280", // generic geometric cubes
  "06a5bf79d103b68279eccc7b48f72fa9", // blank white image
  "e8e884b11c8cf75b17fbfda5db9d650c", // WordPress CMS logo
  "a38d404e0d1563413de1151242b64a7f", // stock photo of children
  "a3542ff0293f5d3e2c17216a2b4a050f", // generic purple gear icon
  "67b1db086181c779c95e6e1f5702059b", // blank white image
  "f0fee97c9bf1c8467592d515795a6123", // pixelated green tree
  "ef3d841dba3df9111a85544e8e67a79a", // blurry corrupted green shield
  "d715220ee8b5339432fa4bfb36c7a6b7", // promotional event poster
  "d32c83e330541284b3b79a6d29438e01", // stock photo of children
  "ccedee2fe160f2f1127e5c3f0382721a", // generic orange swoosh
  "c06010a806c2b6d8db439d685df8c058", // pixelated orange tree
  "b2b24ca878710d7f55e64a1668977aa8", // Cyrillic crest (wrong school)
  "8a57cfe14a6bfc1dd8c63f686f71caa1", // pixelated green blob
  "710eeec8a75793c318730eb29cc06a62", // corrupted red/black fragment
  "172e544e28c5526b010225dd9e702821", // generic navy anchor icon
  "0a7406bacf4f7d39410ec8f5b327a1c6", // generic pink smile shape
  "82b1635122313c3fe181e4110e96d00e", // eClass vendor logo, not a school logo
  "7c8d3a421545d8c34f014a0cafa7e206", // tiny website toolbar sprite, not a school logo
  "02ecfefc128873ce79e47433fbbe3d4f", // Wikipedia globe placeholder, not a school logo
]);

function isPlaceholderSvg(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size > 1000) return false;
  const text = fs.readFileSync(filePath, "utf8");
  return text.includes("<circle") && text.includes("<text");
}

function md5(filePath) {
  return crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("hex");
}

function main() {
  const apply = process.argv.includes("--apply");
  const files = fs.readdirSync(LOGOS_DIR).filter((f) => /\.(png|svg|webp)$/i.test(f));

  const report = { generated_at: new Date().toISOString(), keep: [], remove: [] };

  for (const file of files) {
    const full = path.join(LOGOS_DIR, file);
    const ext = path.extname(file).toLowerCase();
    let verdict = "real";
    let reason = "kept";

    if (ext === ".svg" && isPlaceholderSvg(full)) {
      verdict = "remove";
      reason = "placeholder-svg";
    } else if (ext === ".png" && JUNK_PNG_MD5.has(md5(full))) {
      verdict = "remove";
      reason = "junk-png";
    }

    (verdict === "remove" ? report.remove : report.keep).push({ file, reason });
  }

  // Per-code status: a code is "real" if any kept file exists for it.
  const keptCodes = new Set(report.keep.map((e) => e.file.replace(/\.[^.]+$/, "")));
  const removedCodes = new Set(report.remove.map((e) => e.file.replace(/\.[^.]+$/, "")));
  report.codes_real = [...keptCodes].sort();
  report.codes_placeholder_only = [...removedCodes].filter((c) => !keptCodes.has(c)).sort();
  report.summary = {
    total_files: files.length,
    keep: report.keep.length,
    remove: report.remove.length,
    remove_placeholder_svg: report.remove.filter((e) => e.reason === "placeholder-svg").length,
    remove_junk_png: report.remove.filter((e) => e.reason === "junk-png").length,
    codes_with_real_logo: report.codes_real.length,
    codes_losing_logo: report.codes_placeholder_only.length,
  };

  fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report.summary, null, 2));
  console.log(`Report written to ${path.relative(ROOT, REPORT)}`);

  if (apply) {
    for (const { file } of report.remove) fs.rmSync(path.join(LOGOS_DIR, file));
    console.log(`Deleted ${report.remove.length} files.`);
  } else {
    console.log("Dry run. Re-run with --apply to delete flagged files.");
  }
}

main();
