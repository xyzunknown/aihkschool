import { createHash } from "node:crypto";
import * as cheerio from "cheerio";

export const BASE_URL = "https://www.edu-kingdom.com";
export const UA = "HKSchoolPlaceBot/1.0 (+https://aihkschool.vercel.app)";
export const FETCH_TIMEOUT = 12000;
export const MAX_RESULTS_PER_SEARCH = 5;
export const RAW_TEXT_LIMIT = 2000;

export function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function collapseWhitespace(value) {
  return (value || "").replace(/\s+/g, " ").trim();
}

export function normalizeSchoolName(value) {
  return collapseWhitespace(value || "")
    .replace(/[()（）]/g, "")
    .replace(/[\-–—]/g, "")
    .toLowerCase();
}

export function sanitizePII(text) {
  return (text || "")
    .replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, "[email]")
    .replace(/\b\d{4}[\s-]?\d{4}\b/g, "[電話]");
}

export function toRawText(text) {
  return sanitizePII(collapseWhitespace(text)).slice(0, RAW_TEXT_LIMIT);
}

export function extractTrailingNumericId(url) {
  if (!url) return null;
  const tid = new URL(url, `${BASE_URL}/`).searchParams.get("tid");
  if (tid) return tid;
  const matched = url.match(/-(\d+)(?:$|[/?#])/);
  return matched?.[1] || null;
}

export function buildSearchQueries(school, aliases = []) {
  const queries = [];

  if (school.name_tc) {
    queries.push(school.name_tc);
    queries.push(
      collapseWhitespace(
        school.name_tc.replace(/（[^）]+）/g, "").replace(/\([^)]*\)/g, ""),
      ),
    );
  }
  if (school.name_en) queries.push(school.name_en);

  for (const alias of aliases) {
    if (alias?.alias) queries.push(alias.alias);
  }

  return [...new Set(queries.filter(Boolean))];
}

export function parseSearchResults(html, school) {
  const $ = cheerio.load(html);
  const seen = new Set();
  const targetNames = [school.name_tc, school.name_en]
    .filter(Boolean)
    .map((name) => normalizeSchoolName(name));

  const candidates = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;

    const url = new URL(href.replace(/&amp;/g, "&"), `${BASE_URL}/`).toString();
    if (!url.includes("/學校/") && !url.includes("/%E5%AD%B8%E6%A0%A1/")) return;
    if (seen.has(url)) return;
    seen.add(url);

    const text = collapseWhitespace($(el).text());
    const normalized = normalizeSchoolName(text);
    const exactMatch = targetNames.some((name) => name && normalized.includes(name));
    const partialMatch = targetNames.some(
      (name) => name && (normalized.includes(name) || name.includes(normalized)),
    );

    candidates.push({
      url,
      label: text,
      score: exactMatch ? 2 : partialMatch ? 1 : 0,
    });
  });

  return candidates
    .sort((a, b) => b.score - a.score || a.label.length - b.label.length)
    .filter((candidate) => candidate.score > 0)
    .slice(0, MAX_RESULTS_PER_SEARCH);
}

export function extractIntro($, school) {
  const pageText = collapseWhitespace($.root().text());
  const nameTc = school.name_tc ? escapeRegExp(school.name_tc) : null;
  const nameEn = school.name_en ? escapeRegExp(school.name_en) : null;
  const namesPattern = [nameTc, nameEn].filter(Boolean).join("|");

  if (!namesPattern) return "";

  const introRegex = new RegExp(
    `(?:${namesPattern})\\s*簡介\\s*([\\s\\S]{80,1200}?)(?:校長|學校類別|地區|電話|地址|學費|網站|更多資料)`,
    "i",
  );
  const matched = pageText.match(introRegex);
  if (matched?.[1]) {
    return collapseWhitespace(matched[1]).slice(0, 600);
  }

  const headings = $("h1, h2, h3, strong, b")
    .map((_, el) => collapseWhitespace($(el).text()))
    .get();
  if (!headings.some((text) => text.includes("簡介"))) return "";

  return collapseWhitespace(pageText.split("簡介").slice(1).join("簡介")).slice(0, 600);
}

function dedupeLinks(items, limit) {
  return [...new Map(items.map((item) => [item.url, item])).values()].slice(0, limit);
}

export function parseSchoolDetail(html, school, detailUrl, { maxArticles = 10, maxThreads = 10 } = {}) {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();

  const title = collapseWhitespace($("title").text());
  const intro = extractIntro($, school);

  const articleLinks = [];
  const threadLinks = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;

    const url = new URL(href.replace(/&amp;/g, "&"), `${BASE_URL}/`).toString();
    const label = collapseWhitespace($(el).text());

    if (url.includes("/a/")) articleLinks.push({ url, label });
    if (url.includes("forum.php?mod=viewthread")) threadLinks.push({ url, label });
  });

  return {
    detail_url: detailUrl,
    title,
    intro,
    intro_length: intro.length,
    article_links: dedupeLinks(articleLinks, maxArticles),
    thread_links: dedupeLinks(threadLinks, maxThreads),
  };
}

function parseDateToIso(text) {
  if (!text) return null;
  const matched = collapseWhitespace(text).match(/(20\d{2})[-/.年](\d{1,2})[-/.月](\d{1,2})/);
  if (!matched) return null;

  const [, year, month, day] = matched;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00+08:00`;
}

export function parseArticleContent(html, articleUrl) {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();

  const title = collapseWhitespace($("article h1, h1").first().text()) || collapseWhitespace($("title").text());
  const articleText = collapseWhitespace($("article, .article, .article-content").first().text());
  const category = collapseWhitespace($(".breadcrumb a, .crumb a").first().text()) || null;
  const postedAt = parseDateToIso(
    collapseWhitespace($("time, .date, .article time, article time").first().text()) || articleText,
  );

  return {
    url: articleUrl,
    title,
    category,
    posted_at: postedAt,
    raw_text: toRawText(articleText || `${title}`),
  };
}

export function hashAuthor(platform, author) {
  if (!author) return null;
  return createHash("sha256")
    .update(`${platform}:${author}`)
    .digest("hex")
    .slice(0, 16);
}

export function parseForumThread(html, threadUrl, maxReplies = 5) {
  const $ = cheerio.load(html);
  $("script, style, noscript, nav, footer, .ad").remove();

  const title = collapseWhitespace(
    $("#thread_subject, h1#thread_subject, h1.ph").first().text() || $("title").text(),
  ).replace(/\s+-\s+[^-]+?\s+[－-]\s+教育王國.*$/u, "");

  const posts = $(".t_f, .postmessage, .message, td.t_f")
    .map((_, el) => collapseWhitespace($(el).text()))
    .get()
    .filter(Boolean)
    .slice(0, maxReplies + 1);

  const firstPost = posts[0] || "";
  const replies = posts.slice(1, maxReplies + 1);
  const author = collapseWhitespace($(".authi .xw1, .authi a.xw1, a.xw1").first().text()) || null;
  const postedAt = parseDateToIso(
    collapseWhitespace($("em[id^='authorposton'], .authi em, .postinfo .date").first().text()),
  );

  return {
    url: threadUrl,
    title,
    posted_at: postedAt,
    author_hash: hashAuthor("edu_kingdom", author),
    reply_count_sampled: replies.length,
    raw_text: toRawText([title, firstPost, ...replies].filter(Boolean).join("\n---\n")),
  };
}
