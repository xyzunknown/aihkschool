#!/usr/bin/env node
import { readFileSync } from "node:fs";
const r = JSON.parse(readFileSync("docs/school-website-report.json", "utf-8"));
const unreach = r.details.filter(d => d.status === "unreachable");

// Pick one per domain
const byDomain = {};
unreach.forEach(s => {
  try {
    const h = new URL(s.website).hostname;
    if (!byDomain[h]) byDomain[h] = s;
  } catch {}
});
const sample = Object.values(byDomain).sort(() => Math.random()-0.5).slice(0,20);

async function test(url) {
  try {
    const resp = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SchoolBot/1.0)" },
      signal: AbortSignal.timeout(8000),
      redirect: "follow"
    });
    return resp.status + " " + (resp.headers.get("content-type")||"").slice(0,25);
  } catch(e) {
    return "ERR:" + (e.cause?.code || e.message?.slice(0,40));
  }
}

let ok = 0, sslErr = 0, connErr = 0, dnsErr = 0, otherErr = 0, forbidden = 0;
console.log("=== 随机抽样 20 个不同域名 ===");
for (const s of sample) {
  const result = await test(s.website);
  console.log(result.padEnd(45) + s.website);
  if (result.startsWith("200")) ok++;
  else if (result.includes("UNABLE_TO_VERIFY")) sslErr++;
  else if (result.includes("CERT_")) sslErr++;
  else if (result.includes("ECONNREFUSED") || result.includes("ECONNRESET")) connErr++;
  else if (result.includes("ENOTFOUND")) dnsErr++;
  else if (result.startsWith("403")) forbidden++;
  else otherErr++;
}
console.log(`\n汇总: OK=${ok} SSL错误=${sslErr} 连接拒绝=${connErr} DNS失败=${dnsErr} 403=${forbidden} 其他=${otherErr}`);

// 全量域名分类（每个域名只测1次）
console.log(`\n=== 全量域名诊断 (${Object.keys(byDomain).length} 个不同域名) ===`);
const allDomains = Object.values(byDomain);
let stats = { ok: 0, ssl: 0, conn: 0, dns: 0, forbidden: 0, timeout: 0, other: 0 };
for (let i = 0; i < allDomains.length; i++) {
  const result = await test(allDomains[i].website);
  if (result.startsWith("200") || result.startsWith("301") || result.startsWith("302")) stats.ok++;
  else if (result.includes("UNABLE_TO_VERIFY") || result.includes("CERT_") || result.includes("ERR_TLS")) stats.ssl++;
  else if (result.includes("ECONNREFUSED") || result.includes("ECONNRESET")) stats.conn++;
  else if (result.includes("ENOTFOUND")) stats.dns++;
  else if (result.startsWith("403")) stats.forbidden++;
  else if (result.includes("abort") || result.includes("timeout") || result.includes("ETIMEDOUT")) stats.timeout++;
  else stats.other++;
  if ((i+1) % 50 === 0) console.log(`  进度: ${i+1}/${allDomains.length}`);
}
console.log(`\n全量诊断结果:`);
console.log(`  可达 (2xx/3xx): ${stats.ok}`);
console.log(`  SSL证书错误:    ${stats.ssl}`);
console.log(`  连接拒绝:       ${stats.conn}`);
console.log(`  DNS失败:        ${stats.dns}`);
console.log(`  403禁止:        ${stats.forbidden}`);
console.log(`  超时:           ${stats.timeout}`);
console.log(`  其他错误:       ${stats.other}`);
