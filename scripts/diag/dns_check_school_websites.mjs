#!/usr/bin/env node
/**
 * DNS + HTTP connectivity check for "base page unreachable" schools.
 *
 * Usage:
 *   node scripts/diag/dns_check_school_websites.mjs
 *
 * Checks whether domains resolve in DNS and whether a basic HTTP GET returns
 * anything. Outputs a JSON report.
 */

import { resolve } from "node:dns/promises";
import { writeFileSync } from "node:fs";

const DNS_TIMEOUT = 5000;
const HTTP_TIMEOUT = 8000;

// Schools flagged as "base page unreachable" in priority-top100 2026-05-04
const TARGETS = [
  { code: "156930", name: "佳寶幼稚園（屯門分校）", url: "http://www.guideposts.edu.hk" },
  { code: "151157", name: "大埔浸信會幼稚園", url: "http://www.hkbkec.edu.hk/taipobc/" },
  { code: "566942", name: "銅鑼灣維多利亞（海峰園）幼兒園", url: "http://www.cbvictoria.edu.hk" },
  { code: "564729", name: "香港聖公會基愛幼兒學校", url: "http://www.kons.edu.hk" },
  { code: "564702", name: "香港聖公會夏瑞芸幼兒學校", url: "http://www.hswns.edu.hk" },
  { code: "566926", name: "香港聖公會東涌幼兒學校", url: "http://www.tcns.edu.hk" },
];

const UA = "HKSchoolPlaceBot/1.0 (+https://aihkschool.vercel.app)";

async function checkDns(hostname) {
  try {
    const records = await Promise.race([
      resolve(hostname, "A"),
      new Promise((_, reject) => setTimeout(() => reject(new Error("DNS_TIMEOUT")), DNS_TIMEOUT)),
    ]);
    return { status: "ok", records };
  } catch (e) {
    return { status: "failed", error: e.code || e.message };
  }
}

async function checkHttp(url) {
  const hostname = new URL(url).hostname;
  for (const protocol of ["https", "http"]) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), HTTP_TIMEOUT);
    try {
      const resp = await fetch(`${protocol}://${hostname}`, {
        method: "HEAD",
        headers: { "User-Agent": UA },
        signal: ctrl.signal,
        redirect: "follow",
      });
      clearTimeout(timer);
      return {
        status: "reachable",
        finalUrl: resp.url,
        httpStatus: resp.status,
        protocol,
      };
    } catch (e) {
      clearTimeout(timer);
      if (protocol === "http") {
        return {
          status: "unreachable",
          error: e.cause?.code || e.message?.slice(0, 120),
        };
      }
    }
  }
  return { status: "unreachable", error: "unknown" };
}

async function main() {
  const results = [];

  for (const target of TARGETS) {
    const hostname = new URL(target.url).hostname;
    console.log(`[dns-check] checking: ${target.name} (${hostname})`);

    const dns = await checkDns(hostname);
    const http = dns.status === "ok" ? await checkHttp(target.url) : null;

    const result = {
      school_code: target.code,
      name_tc: target.name,
      hostname,
      dns,
      http: http || { status: "skipped", reason: "dns_failed" },
      verdict: null,
    };

    if (dns.status !== "ok") {
      result.verdict = "dns_dead";
      console.log(`  -> DNS dead: ${dns.error}`);
    } else if (http?.status === "reachable") {
      result.verdict = "reachable_via_browser_needed";
      console.log(`  -> Reachable (${http.protocol}, status ${http.httpStatus})`);
    } else {
      result.verdict = "http_unreachable";
      console.log(`  -> DNS OK but HTTP unreachable: ${http?.error}`);
    }

    results.push(result);
  }

  const report = {
    generated_at: new Date().toISOString(),
    total: results.length,
    dns_dead: results.filter((r) => r.verdict === "dns_dead").length,
    reachable: results.filter((r) => r.verdict?.startsWith("reachable")).length,
    http_unreachable: results.filter((r) => r.verdict === "http_unreachable").length,
    results,
  };

  const outPath = "docs/school-website-dns-check.json";
  writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`\nReport written to ${outPath}`);
  console.log(JSON.stringify(report, null, 2));
}

main().catch(console.error);
