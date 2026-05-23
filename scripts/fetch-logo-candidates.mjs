import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const MISSING_PATH = path.join(ROOT, "HKSchoolPlaceiOS", "tools", "school-logo-autofetch", "out", "missing.json");
const CANDIDATES_PATH = path.join(ROOT, "HKSchoolPlaceiOS", "tools", "school-logo-autofetch", "out", "candidates.jsonl");
const CACHE_DIR = path.join(ROOT, "newhkschoolplace", "data", "logo-cache");

const args = new Map(
  process.argv.slice(2).map((arg, index, all) => {
    if (!arg.startsWith("--")) return [arg, true];
    const [key, value] = arg.includes("=") ? arg.split("=", 2) : [arg, all[index + 1]];
    return [key.replace(/^--/, ""), value ?? true];
  }),
);

const offset = Number(args.get("offset") ?? 0);
const limit = Number(args.get("limit") ?? 25);

function now() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
}

function extFrom(url, contentType = "") {
  const ct = contentType.split(";")[0].toLowerCase();
  if (ct.includes("png")) return "png";
  if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("svg")) return "svg";
  if (ct.includes("gif")) return "gif";
  const match = new URL(url).pathname.match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase().replace("jpeg", "jpg") : "bin";
}

async function appendRecord(record) {
  await fs.appendFile(CANDIDATES_PATH, `${JSON.stringify(record)}\n`);
}

function relative(filePath) {
  return path.relative(ROOT, filePath);
}

const schools = JSON.parse(await fs.readFile(MISSING_PATH, "utf8")).slice(offset, offset + limit);
await fs.mkdir(CACHE_DIR, { recursive: true });

const badUrl = /(eclass|errors\.aliyun|browser-bar|no-screenshot|cloudflare|favicon|apple-touch-icon|qrcode|qr-code|banner|slide|carousel|album|gallery|poster|advert|facebook|instagram|youtube)/i;
const positive = /(logo|schoollogo|sch_logo|brand|crest|emblem|badge|校徽|校標)/i;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1366, height: 900 },
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
});

await context.route("**/*", (route) => {
  const type = route.request().resourceType();
  if (type === "media" || type === "font") route.abort();
  else route.continue();
});

const page = await context.newPage();

for (let index = 0; index < schools.length; index += 1) {
  const school = schools[index];
  let website = (school.website || "").trim();
  let ok = 0;

  if (!website) {
    console.log(`[${offset + index + 1}] ${school.school_code} no website`);
    continue;
  }

  if (!/^https?:\/\//i.test(website)) website = `http://${website}`;

  try {
    await page.goto(website, { waitUntil: "domcontentloaded", timeout: 18000 });
    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
    await page.evaluate(() => window.scrollTo(0, 200)).catch(() => {});
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
    await page.waitForTimeout(400);

    const images = await page.evaluate(() => {
      const result = [];
      const seen = new Set();
      const add = (kind, rawSrc, element) => {
        if (!rawSrc) return;
        let src = rawSrc;
        try {
          src = new URL(rawSrc, document.baseURI).href;
        } catch {}
        if (!src || seen.has(src)) return;
        seen.add(src);

        const rect = element?.getBoundingClientRect?.() || { top: 9999, left: 9999, width: 0, height: 0 };
        const style = element ? getComputedStyle(element) : null;
        const width = element?.naturalWidth || Math.round(rect.width) || 0;
        const height = element?.naturalHeight || Math.round(rect.height) || 0;
        const blob = [kind, src, element?.alt, element?.className, element?.id, element?.parentElement?.className]
          .join(" ")
          .toLowerCase();

        let score = 0;
        for (const word of ["logo", "schoollogo", "sch_logo", "brand", "crest", "emblem", "badge", "校徽", "校標"]) {
          if (blob.includes(word)) score += 45;
        }
        for (const word of ["banner", "hero", "slide", "slider", "carousel", "advert", "poster", "album", "photo", "gallery", "background", "wechat", "qrcode", "qr-code", "facebook", "instagram", "youtube", "eclass", "powered", "loading", "browser-bar", "no-screenshot", "errors.aliyun", "cloudflare"]) {
          if (blob.includes(word)) score -= 90;
        }
        if (element?.closest?.("header,.header,.navbar,.nav,.top,.topbar,#header,#top,.site-header,.masthead,.logo,#logo")) score += 30;
        if (rect.top >= -80 && rect.top < 420) score += 25;
        else if (rect.top >= 420 && rect.top < 1100) score += 5;
        else score -= 20;
        if (rect.left >= -20 && rect.left < 600) score += 10;
        if (style && (style.display === "none" || style.visibility === "hidden" || Number(style.opacity || 1) === 0)) score -= 60;
        if (width && height) {
          const ratio = width / height;
          if (ratio >= 0.35 && ratio <= 5) score += 12;
          if (ratio >= 0.5 && ratio <= 2.6) score += 12;
          if (width >= 48 && height >= 48 && width <= 1800 && height <= 1800) score += 16;
          if (width < 32 || height < 32) score -= 80;
          if (width > 2200 || height > 2200) score -= 40;
        }

        result.push({
          kind,
          src,
          alt: element?.alt || "",
          cls: element?.className?.toString?.() || "",
          id: element?.id || "",
          width,
          height,
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          score,
        });
      };

      for (const img of Array.from(document.images)) {
        add("img", img.currentSrc || img.src || img.getAttribute("data-src") || img.getAttribute("data-original") || img.getAttribute("data-lazy-src"), img);
        for (const attr of ["srcset", "data-srcset"]) {
          const value = img.getAttribute(attr);
          if (!value) continue;
          for (const part of value.split(",")) add("srcset", part.trim().split(/\s+/)[0], img);
        }
      }
      for (const element of Array.from(document.querySelectorAll("[style],.logo,#logo,header *, .header *"))) {
        const bg = getComputedStyle(element).backgroundImage || "";
        for (const match of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)) add("background", match[1], element);
      }
      for (const entry of performance.getEntriesByType("resource")) {
        if (/\.(png|jpe?g|webp|gif|svg)(\?|#|$)/i.test(entry.name)) add("resource", entry.name, null);
      }
      return result
        .sort((a, b) => b.score - a.score || a.top - b.top)
        .filter((item) => item.score >= 30)
        .slice(0, 6);
    });

    for (let imageIndex = 0; imageIndex < images.length; imageIndex += 1) {
      const image = images[imageIndex];
      if (badUrl.test(image.src) && !positive.test(`${image.src} ${image.alt} ${image.cls} ${image.id}`)) continue;

      try {
        const response = await context.request.get(image.src, { timeout: 12000 });
        if (response.status() !== 200) continue;
        const contentType = (response.headers()["content-type"] || "").toLowerCase();
        if (!contentType.startsWith("image/")) continue;
        const body = Buffer.from(await response.body());
        if (body.length < 400 || body.length > 8 * 1024 * 1024) continue;
        const ext = extFrom(image.src, contentType);
        if (!["png", "jpg", "webp", "svg", "gif"].includes(ext)) continue;

        const filePath = path.join(CACHE_DIR, `${school.school_code}-ia_page-${imageIndex}.${ext}`);
        await fs.writeFile(filePath, body);
        await appendRecord({
          school_code: school.school_code,
          source: "ia_page",
          page_url: website,
          image_url: image.src,
          local_path: relative(filePath),
          bytes: body.length,
          fetched_at: now(),
          status: "ok",
          alt: image.alt,
          natural: [image.width, image.height],
          kw_score: image.score,
          extract_kind: image.kind,
        });
        ok += 1;
      } catch {}
    }

    if (!ok) {
      await appendRecord({
        school_code: school.school_code,
        source: "ia_page",
        page_url: website,
        image_url: "",
        local_path: null,
        bytes: 0,
        fetched_at: now(),
        status: "no_result",
      });
    }
  } catch (error) {
    await appendRecord({
      school_code: school.school_code,
      source: "ia_page",
      page_url: website,
      image_url: "",
      local_path: null,
      bytes: 0,
      fetched_at: now(),
      status: "error",
      error: String(error).slice(0, 160),
    });
  }

  console.log(`[${offset + index + 1}] ${school.school_code} ${school.name_tc || ""} ok=${ok}`);
}

await browser.close();
