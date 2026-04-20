#!/usr/bin/env node
/**
 * Compare V1 and V2 school-website crawler reports.
 * Usage: node scripts/compare-reports.mjs
 */
import { readFileSync } from "fs";

const v1 = JSON.parse(readFileSync("docs/school-website-report.json", "utf8"));
const v2 = JSON.parse(readFileSync("docs/school-website-report-v2.json", "utf8"));

console.log("=== V1 vs V2 对比 ===\n");

// Stats comparison
console.log("状态分布对比:");
console.log("状态".padEnd(22), "V1".padStart(6), "V2".padStart(6), "变化".padStart(8));
console.log("-".repeat(44));
const allStatuses = new Set([...Object.keys(v1.stats), ...Object.keys(v2.stats)]);
for (const s of allStatuses) {
  if (s === "total") continue;
  const a = v1.stats[s] || 0;
  const b = v2.stats[s] || 0;
  const diff = b - a;
  const sign = diff > 0 ? "+" : "";
  console.log(s.padEnd(22), String(a).padStart(6), String(b).padStart(6), `${sign}${diff}`.padStart(8));
}
console.log("-".repeat(44));
console.log("total".padEnd(22), String(v1.stats.total).padStart(6), String(v2.stats.total).padStart(6));

// Build lookup maps
const v1Map = new Map(v1.details.map((d) => [d.school_id, d]));
const v2Map = new Map(v2.details.map((d) => [d.school_id, d]));

// Schools that improved (unreachable/error → ok/unchanged/upserted)
const improved = [];
const regressed = [];
const stillUnreachable = [];

for (const [id, d2] of v2Map) {
  const d1 = v1Map.get(id);
  if (!d1) continue;
  const goodStatuses = new Set(["ok", "unchanged"]);
  const badStatuses = new Set(["unreachable", "error"]);

  if (badStatuses.has(d1.status) && !badStatuses.has(d2.status)) {
    improved.push({ id, name: d2.name_tc || d2.name_en, website: d2.website, from: d1.status, to: d2.status });
  }
  if (!badStatuses.has(d1.status) && badStatuses.has(d2.status)) {
    regressed.push({ id, name: d2.name_tc || d2.name_en, website: d2.website, from: d1.status, to: d2.status });
  }
  if (d2.status === "unreachable") {
    stillUnreachable.push({ id, name: d2.name_tc || d2.name_en, website: d2.website, error: d2.error });
  }
}

console.log(`\n=== 改善的学校 (${improved.length} 所) ===`);
if (improved.length <= 50) {
  for (const s of improved) {
    console.log(`  ${s.name} — ${s.from} → ${s.to} (${s.website})`);
  }
} else {
  console.log(`  (太多，仅显示前 50)`);
  for (const s of improved.slice(0, 50)) {
    console.log(`  ${s.name} — ${s.from} → ${s.to} (${s.website})`);
  }
}

console.log(`\n=== 退步的学校 (${regressed.length} 所) ===`);
for (const s of regressed) {
  console.log(`  ${s.name} — ${s.from} → ${s.to} (${s.website})`);
}

// Analyze still-unreachable by domain
console.log(`\n=== 仍然无法访问的学校 (${stillUnreachable.length} 所) ===`);
const domainCount = new Map();
for (const s of stillUnreachable) {
  try {
    const domain = new URL(s.website).hostname;
    if (!domainCount.has(domain)) domainCount.set(domain, []);
    domainCount.get(domain).push(s.name);
  } catch {}
}
const sortedDomains = [...domainCount.entries()].sort((a, b) => b[1].length - a[1].length);
console.log("\n按域名分组 (top 30):");
for (const [domain, schools] of sortedDomains.slice(0, 30)) {
  console.log(`  ${domain} — ${schools.length} 所`);
}

// Error distribution for still-unreachable
const errorDist = new Map();
for (const s of stillUnreachable) {
  const err = s.error || "unknown";
  errorDist.set(err, (errorDist.get(err) || 0) + 1);
}
console.log("\n错误类型分布:");
for (const [err, count] of [...errorDist.entries()].sort((a, b) => b - a)) {
  console.log(`  ${err}: ${count}`);
}

console.log("\n=== 覆盖率 ===");
const v1coverage = ((v1.stats.ok + v1.stats.unchanged) / v1.stats.total * 100).toFixed(1);
const v2ok = (v2.stats.ok || 0) + (v2.stats.unchanged || 0);
const v2coverage = (v2ok / v2.stats.total * 100).toFixed(1);
console.log(`V1: ${v1coverage}%  (${v1.stats.ok + v1.stats.unchanged}/${v1.stats.total})`);
console.log(`V2: ${v2coverage}%  (${v2ok}/${v2.stats.total})`);
console.log(`提升: +${(v2coverage - v1coverage).toFixed(1)}pp`);
