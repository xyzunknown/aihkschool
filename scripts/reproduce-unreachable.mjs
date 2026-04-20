#!/usr/bin/env node
/**
 * 精确复现 school-website.mjs 的 rateLimitedFetch 逻辑，
 * 但添加详细错误日志来找出真正的失败原因。
 */
import { readFileSync } from "node:fs";

const UA = "HKSchoolPlaceBot/1.0 (+https://aihkschool.vercel.app)";
const FETCH_TIMEOUT = 12000;

const report = JSON.parse(readFileSync("docs/school-website-report.json", "utf-8"));
const unreachable = report.details.filter(d => d.status === "unreachable");

// 按域名去重，取前30个不同域名
const byDomain = {};
for (const s of unreachable) {
  try {
    const h = new URL(s.website).hostname;
    if (!byDomain[h]) byDomain[h] = { ...s, count: 0 };
    byDomain[h].count++;
  } catch {}
}

// 按学校数排序，取top30
const top30 = Object.values(byDomain)
  .sort((a,b) => b.count - a.count)
  .slice(0, 30);

console.log("=== 复现 rateLimitedFetch 逻辑（含详细错误） ===");
console.log(`测试 ${top30.length} 个域名\n`);

const results = { ok: 0, ssl: 0, non2xx: 0, badType: 0, timeout: 0, dns: 0, conn: 0, other: 0 };

for (const s of top30) {
  const url = s.website;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT);
  
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8",
      },
      signal: ctrl.signal,
      redirect: "follow",
    });
    
    if (!resp.ok) {
      console.log(`NON-2XX ${resp.status}  (${s.count}校)  ${url}`);
      results.non2xx++;
      continue;
    }
    
    const contentType = resp.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
      console.log(`BAD-TYPE "${contentType.slice(0,30)}"  (${s.count}校)  ${url}`);
      results.badType++;
      continue;
    }
    
    const text = await resp.text();
    const bodyText = text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    console.log(`OK 200  textLen=${bodyText.length}  (${s.count}校)  ${url}`);
    results.ok++;
  } catch (e) {
    const code = e.cause?.code || "";
    const msg = e.message || "";
    
    if (code === "ENOTFOUND") {
      console.log(`DNS-FAIL  (${s.count}校)  ${url}`);
      results.dns++;
    } else if (code.includes("CERT") || code.includes("UNABLE_TO_VERIFY") || msg.includes("UNABLE_TO_VERIFY") || (e.cause && String(e.cause).includes("UNABLE_TO_VERIFY"))) {
      console.log(`SSL-ERR ${code || msg.slice(0,40)}  (${s.count}校)  ${url}`);
      results.ssl++;
    } else if (code === "ECONNREFUSED" || code === "ECONNRESET") {
      console.log(`CONN-ERR ${code}  (${s.count}校)  ${url}`);
      results.conn++;
    } else if (msg.includes("abort") || code === "ABORT_ERR") {
      console.log(`TIMEOUT  (${s.count}校)  ${url}`);
      results.timeout++;
    } else {
      console.log(`OTHER ${code || msg.slice(0,60)}  (${s.count}校)  ${url}`);
      // 打印完整错误信息以便调试
      if (e.cause) console.log(`  cause: ${JSON.stringify({code: e.cause.code, msg: e.cause.message?.slice(0,80)})}`);
      results.other++;
    }
  } finally {
    clearTimeout(timer);
  }
}

console.log(`\n=== 汇总 (top30域名) ===`);
console.log(`  OK (200+html):     ${results.ok}`);
console.log(`  SSL证书错误:       ${results.ssl}`);
console.log(`  非2xx状态:         ${results.non2xx}`);
console.log(`  非HTML类型:        ${results.badType}`);
console.log(`  超时(${FETCH_TIMEOUT}ms):   ${results.timeout}`);
console.log(`  DNS失败:           ${results.dns}`);
console.log(`  连接拒绝/重置:     ${results.conn}`);
console.log(`  其他:              ${results.other}`);

// 计算受影响学校数
const totalSchools = Object.values(results).reduce((a,b) => a+b, 0);
const okSchools = top30.filter((_,i) => {
  // 不精确，但可以估算
  return true;
}).reduce((a,b) => a + b.count, 0);
console.log(`\n这 ${top30.length} 个域名共影响 ${okSchools} 所学校 (占 unreachable 总数 ${unreachable.length} 的 ${(okSchools/unreachable.length*100).toFixed(0)}%)`);
