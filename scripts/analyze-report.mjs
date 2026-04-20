#!/usr/bin/env node
import { readFileSync } from "node:fs";
const r = JSON.parse(readFileSync("docs/school-website-report.json", "utf-8"));
const unreach = r.details.filter(d => d.status === "unreachable");

// 域名分布
const domainMap = {};
unreach.forEach(s => {
  try {
    const u = new URL(s.website);
    const host = u.hostname;
    if (!domainMap[host]) domainMap[host] = [];
    domainMap[host].push(s.name_tc || s.name_en);
  } catch {}
});
const sorted = Object.entries(domainMap).sort((a,b) => b[1].length - a[1].length);

console.log("=== unreachable 域名分布 (Top 30) ===");
sorted.slice(0, 30).forEach(([host, names]) => {
  console.log(`  ${host} (${names.length}所)`);
});

// http vs https
let httpCount = 0, httpsCount = 0;
unreach.forEach(s => {
  if (s.website.startsWith("https://")) httpsCount++;
  else httpCount++;
});
console.log("\n=== HTTP vs HTTPS ===");
console.log(`  http://  ${httpCount}`);
console.log(`  https:// ${httpsCount}`);

// 域名类型
let eduHk = 0, orgHk = 0, comHk = 0, other = 0;
unreach.forEach(s => {
  if (s.website.includes(".edu.hk")) eduHk++;
  else if (s.website.includes(".org.hk")) orgHk++;
  else if (s.website.includes(".com.hk")) comHk++;
  else other++;
});
console.log("\n=== 域名类型 ===");
console.log(`  .edu.hk: ${eduHk}`);
console.log(`  .org.hk: ${orgHk}`);
console.log(`  .com.hk: ${comHk}`);
console.log(`  其他:     ${other}`);

// 同域名多校
const multiSchoolDomains = sorted.filter(([h, n]) => n.length >= 3);
console.log(`\n=== 同域名3校以上（共${multiSchoolDomains.length}个域名）===`);
multiSchoolDomains.forEach(([host, names]) => {
  console.log(`  ${host} (${names.length}所): ${names.slice(0,3).join(", ")}${names.length > 3 ? "..." : ""}`);
});

// 随机抽样10个 unreachable，检测是否真的不可达
console.log("\n=== 抽样 unreachable 学校 ===");
const sample = unreach.sort(() => Math.random() - 0.5).slice(0, 10);
for (const s of sample) {
  console.log(`  ${s.name_tc || s.name_en} | ${s.website}`);
}

// OK 学校的域名模式
const ok = r.details.filter(d => d.status === "ok");
const okDomains = {};
ok.forEach(s => {
  try {
    const host = new URL(s.website).hostname;
    if (!okDomains[host]) okDomains[host] = 0;
    okDomains[host]++;
  } catch {}
});
const okSorted = Object.entries(okDomains).sort((a,b) => b[1] - a[1]);
console.log("\n=== 成功学校的域名分布 ===");
okSorted.forEach(([host, count]) => {
  console.log(`  ${host} (${count}所)`);
});
