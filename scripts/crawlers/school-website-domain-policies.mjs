const DOMAIN_POLICY_ENTRIES = [
  ["www.salvationarmy.org.hk", {
    affectedSchools: 27,
    canonicalOrigin: "https://www.salvationarmy.org.hk",
    note: "Shared Salvation Army nursery paths; keep canonical https even though the host is often down.",
  }],
  ["salvationarmy.org.hk", {
    affectedSchools: 27,
    canonicalOrigin: "https://salvationarmy.org.hk",
    note: "Shared Salvation Army nursery paths on the apex host; keep branch paths intact.",
  }],
  ["www.creative.edu.hk", {
    affectedSchools: 10,
    canonicalOrigin: "https://creative.edu.hk",
    usePlaywright: true,
    unstable: true,
    note: "Creative switched to apex host; shared site is also prone to transient socket closures.",
  }],
  ["www.yuenyuenkg.edu.hk", {
    affectedSchools: 5,
    canonicalOrigin: "https://www.yuenyuenkg.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both root and branch pages.",
  }],
  ["www.joyfulenglish.edu.hk", {
    affectedSchools: 5,
    canonicalOrigin: "http://www.joyfulenglish.edu.hk",
    unstable: true,
    note: "HTTP homepage is reachable while HTTPS often fails; keep retries serialized.",
  }],
  ["www.tutortime.com.hk", {
    affectedSchools: 4,
    canonicalOrigin: "https://www.tutortime.com.hk",
    usePlaywright: true,
    playwrightTimeoutMs: 45000,
    note: "Tutor Time returns 403 to direct fetch and needs a browser fallback.",
  }],
  ["www.good-health.edu.hk", {
    affectedSchools: 4,
    canonicalOrigin: "https://www.good-health.edu.hk",
    unstable: true,
    note: "HTTP upgrades cleanly to HTTPS but the shared site benefits from a second low-concurrency pass.",
  }],
  ["www.ymcahk.org.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.ymcahk.org.hk",
    usePlaywright: true,
    forcePlaywright: true,
    note: "YMCA branch pages expose admission and school info after browser rendering.",
  }],
  ["ymcahk.org.hk", {
    affectedSchools: 1,
    canonicalOrigin: "https://ymcahk.org.hk",
    usePlaywright: true,
    forcePlaywright: true,
    note: "YMCA branch pages expose admission and school info after browser rendering.",
  }],
  ["www.newklnwa.edu.hk", {
    affectedSchools: 4,
    canonicalOrigin: "https://www.newklnwa.edu.hk",
    unstable: true,
    note: "HTTP origin is dead; force HTTPS and retry serially for the shared host.",
  }],
  ["nursery.bgca.org.hk", {
    affectedSchools: 4,
    canonicalOrigin: "https://nursery.bgca.org.hk",
    unstable: true,
    note: "HTTP origin is dead; HTTPS is reachable but slow.",
  }],
  ["www.wfb.edu.hk", {
    affectedSchools: 3,
    canonicalOrigin: "https://www.wfb.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on the base site and branch pages.",
  }],
  ["www.boxhill.edu.hk", {
    affectedSchools: 3,
    canonicalOrigin: "https://www.boxhill.edu.hk",
    usePlaywright: true,
    unstable: true,
    note: "202/JS gate on fetch; allow browser fallback and serialize retries.",
  }],
  ["www.anchors.edu.hk", {
    affectedSchools: 3,
    canonicalOrigin: "https://www.anchors.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both HTTP and HTTPS.",
  }],
  ["www.elementiedu.org", {
    affectedSchools: 3,
    canonicalOrigin: "https://www.elementiedu.org",
    unstable: true,
    note: "Reachable but inconsistent when many branch schools hit the same site.",
  }],
  ["www.maynga.edu.hk", {
    affectedSchools: 3,
    canonicalOrigin: "https://www.maynga.edu.hk",
    usePlaywright: true,
    unstable: true,
    note: "Shared Angular site should crawl over HTTPS, prefer browser rendering, and be retried serially when needed.",
  }],
  ["hkcschild.edu.hk", {
    affectedSchools: 3,
    canonicalOrigin: "https://hkcschild.edu.hk",
    usePlaywright: true,
    unstable: true,
    note: "Path-based shared site works over HTTPS; preserve path during normalization.",
  }],
  ["mulberryhousekg.com", {
    affectedSchools: 2,
    canonicalOrigin: "https://mulberryhousekg.com",
    usePlaywright: true,
    unstable: true,
    note: "202/JS shell; prefer Playwright when fetch returns thin HTML.",
  }],
  ["www.stcatherines.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.stcatherines.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both protocols.",
  }],
  ["www.kllck.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.kllck.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both protocols.",
  }],
  ["www.wisely.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.wisely.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both protocols.",
  }],
  ["www.cyckg.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.cyckg.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both protocols.",
  }],
  ["www.christianadrianne.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.christianadrianne.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both protocols.",
  }],
  ["www.lingnankn.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.lingnankn.edu.hk",
    unstable: true,
    note: "Shared Lingnan site currently returns 502 intermittently; keep retries serialized.",
  }],
  ["www.dominicsaviokg.org", {
    affectedSchools: 2,
    canonicalOrigin: "http://www.dominicsaviokg.org",
    unstable: true,
    note: "HTTP homepage is reachable while HTTPS fails; keep the shared site on HTTP and retry serially.",
  }],
  ["www.mink.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.mink.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both protocols.",
  }],
  ["www.karlam.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.karlam.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both protocols.",
  }],
  ["www.tbcas.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.tbcas.edu.hk",
    note: "Branch paths upgrade to HTTPS but currently redirect to Cloudflare-protected branch hosts (tbcww.edu.hk / tbcgn.edu.hk) that block both fetch and browser fallback.",
  }],
  ["www.melody.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.melody.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both protocols.",
  }],
  ["www.gciedu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.gciedu.hk",
    unstable: true,
    note: "Shared GCI site upgrades to HTTPS and should be retried serially.",
  }],
  ["www.sharonlutheran.edu.hk", {
    affectedSchools: 2,
    canonicalOrigin: "https://www.sharonlutheran.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both root and branch pages.",
  }],
  ["www.abcpathways.edu.hk", {
    affectedSchools: 1,
    canonicalOrigin: "https://www.abcpathways.edu.hk",
    usePlaywright: true,
    note: "403 anti-bot on both protocols.",
  }],
  ["www.invictusschool.hk", {
    affectedSchools: 1,
    canonicalOrigin: "https://www.invictus.edu.hk",
    usePlaywright: true,
    unstable: true,
    note: "Legacy host redirects to Invictus and returns 429 under fetch; prefer browser fallback and serialized retries.",
  }],
  ["www.invictus.edu.hk", {
    affectedSchools: 1,
    canonicalOrigin: "https://www.invictus.edu.hk",
    usePlaywright: true,
    unstable: true,
    note: "Invictus campus pages still reset fetch sessions intermittently; prefer browser fallback and serialized retries.",
  }],

  // ── Phase 1: anti-bot domains missing Playwright policy (16 schools) ──
  // Shared: SKH St. Simon's (3 schools)
  ["www.ssth.edu.hk",       { affectedSchools: 1, canonicalOrigin: "https://www.ssth.edu.hk",       usePlaywright: true, note: "Anti-bot challenge on fetch; shared SKH St. Simon's host." }],
  ["www.sslk.edu.hk",       { affectedSchools: 1, canonicalOrigin: "https://www.sslk.edu.hk",       usePlaywright: true, note: "Anti-bot challenge on fetch; shared SKH St. Simon's host." }],
  ["www.sssk.edu.hk",       { affectedSchools: 1, canonicalOrigin: "https://www.sssk.edu.hk",       usePlaywright: true, note: "Anti-bot challenge on fetch; shared SKH St. Simon's host." }],
  // Shared: SKH St. Christopher's (2 schools)
  ["www.skhwcn.edu.hk",     { affectedSchools: 1, canonicalOrigin: "https://www.skhwcn.edu.hk",     usePlaywright: true, note: "Anti-bot challenge on fetch; shared SKH St. Christopher's host." }],
  ["www.skhkckg.edu.hk",    { affectedSchools: 1, canonicalOrigin: "https://www.skhkckg.edu.hk",    usePlaywright: true, note: "Anti-bot challenge on fetch; shared SKH St. Christopher's host." }],
  // Shared: St. Monica's (2 schools)
  ["www.stmonicakg.edu.hk",  { affectedSchools: 1, canonicalOrigin: "https://www.stmonicakg.edu.hk",  usePlaywright: true, note: "Anti-bot challenge on fetch; shared St. Monica's host." }],
  ["www.stmonicawk.edu.hk",  { affectedSchools: 1, canonicalOrigin: "https://www.stmonicawk.edu.hk",  usePlaywright: true, note: "Anti-bot challenge on fetch; shared St. Monica's host." }],
  // Shared: Precious Blood (2 schools)
  ["www.pbk.edu.hk",         { affectedSchools: 1, canonicalOrigin: "https://www.pbk.edu.hk",         usePlaywright: true, note: "Anti-bot challenge on fetch; shared Precious Blood host." }],
  ["www.pbn.edu.hk",         { affectedSchools: 1, canonicalOrigin: "https://www.pbn.edu.hk",         usePlaywright: true, note: "Anti-bot challenge on fetch; shared Precious Blood host." }],
  // Individual domains
  ["cslkg.edu.hk",           { affectedSchools: 1, canonicalOrigin: "https://cslkg.edu.hk",           usePlaywright: true, note: "Anti-bot challenge on fetch." }],
  ["www.aoguck.edu.hk",      { affectedSchools: 1, canonicalOrigin: "https://www.aoguck.edu.hk",      usePlaywright: true, note: "Anti-bot challenge on fetch." }],
  ["www.ylsyk.edu.hk",       { affectedSchools: 1, canonicalOrigin: "https://www.ylsyk.edu.hk",       usePlaywright: true, note: "Anti-bot challenge on fetch." }],
  ["www.choicekinder.edu.hk",{ affectedSchools: 1, canonicalOrigin: "https://www.choicekinder.edu.hk",usePlaywright: true, note: "Anti-bot challenge on fetch." }],
  ["www.smcns.edu.hk",       { affectedSchools: 1, canonicalOrigin: "https://www.smcns.edu.hk",       usePlaywright: true, note: "Anti-bot challenge on fetch." }],
  ["www.skhhsckg.edu.hk",   { affectedSchools: 1, canonicalOrigin: "https://www.skhhsckg.edu.hk",    usePlaywright: true, note: "Anti-bot challenge on fetch." }],
  ["www.rlk.edu.hk",         { affectedSchools: 1, canonicalOrigin: "https://www.rlk.edu.hk",         usePlaywright: true, note: "Anti-bot challenge on fetch." }],
  // ── Phase 4: edge cases ──
  ["www.gigamind.edu.hk",       { affectedSchools: 1, canonicalOrigin: "https://www.gigamind.edu.hk",       usePlaywright: true, note: "SPA-shell only, 39 chars on fetch." }],
  ["www.dominicsaviokg.edu.hk", { affectedSchools: 1, canonicalOrigin: "https://www.dominicsaviokg.edu.hk", usePlaywright: true, note: "Meta-refresh target from dominicsaviokg.org; anti-bot on fetch." }],
];

export const DOMAIN_POLICIES = new Map(DOMAIN_POLICY_ENTRIES);

export const PLAYWRIGHT_WHITELIST = new Set(
  DOMAIN_POLICY_ENTRIES.filter(([, policy]) => policy.usePlaywright).map(([host]) => host)
);

export const UNSTABLE_RETRY_DOMAINS = new Set(
  DOMAIN_POLICY_ENTRIES.filter(([, policy]) => policy.unstable).map(([host]) => host)
);

function getHost(value) {
  if (!value) return null;
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return String(value).trim().toLowerCase() || null;
  }
}

export function getDomainPolicy(value) {
  const host = getHost(value);
  return host ? DOMAIN_POLICIES.get(host) ?? null : null;
}

export function normalizeWebsiteWithPolicy(website) {
  try {
    const url = new URL(website);
    const policy = getDomainPolicy(url.href);
    if (!policy?.canonicalOrigin) return website;

    const canonical = new URL(policy.canonicalOrigin);
    url.protocol = canonical.protocol;
    url.host = canonical.host;
    return url.toString();
  } catch {
    return website;
  }
}

export function shouldUsePlaywrightForUrl(value) {
  const host = getHost(value);
  return host ? PLAYWRIGHT_WHITELIST.has(host) : false;
}

export function isUnstableRetryDomain(value) {
  const host = getHost(value);
  return host ? UNSTABLE_RETRY_DOMAINS.has(host) : false;
}