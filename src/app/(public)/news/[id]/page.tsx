import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as cheerio from "cheerio";
import { ArrowSquareOut, CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { getAllNewsItems, getNewsItemById } from "@/lib/homepage/liveData";
import type { NewsItem } from "@/types/homepage";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { normalizeNewsHref } from "@/lib/news/links";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const decodedId = decodeURIComponent(params.id);
  const article = await getNewsItemById(decodedId);

  if (!article || article.is_external) {
    return {
      title: "資訊消息",
      description: "掌握最新教育資訊、學校活動、升學政策。",
    };
  }

  const description = article.summary || article.title;

  return {
    ...pageMetadata({
      title: article.title,
      description,
      path: `/news/${encodeURIComponent(article.id)}`,
      type: "article",
    }),
    title: article.title,
  };
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 21600 },
      headers: {
        "user-agent": "Mozilla/5.0 HKSchoolPlace/1.0",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error(`[ArticlePage] fetch failed: ${url} (${response.status})`);
      return null;
    }
    return await response.text();
  } catch (err) {
    console.error(`[ArticlePage] fetch error: ${url} — ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

/**
 * Fetch article content, auto-switching GovHK English pages to Traditional Chinese.
 * GovHK English pages contain a link to the TC version: <a href="..."><img id="hdrTCLnk">
 */
async function fetchArticleContent(url: string): Promise<string | null> {
  const html = await fetchHtml(normalizeNewsHref(url));
  if (!html) return null;

  // If this is a GovHK English page, find and fetch the Chinese version instead
  if (url.includes("info.gov.hk")) {
    const tcLinkMatch = html.match(
      /<a\s+href=["']([^"']+)["'][^>]*>\s*<img[^>]*id=["']hdrTCLnk["']/i
    );
    if (tcLinkMatch?.[1]) {
      const tcUrl = new URL(tcLinkMatch[1], url).href;
      const tcHtml = await fetchHtml(tcUrl);
      if (tcHtml) return tcHtml;
    }
  }

  return html;
}

function extractMainContent(html: string): string {
  const $ = cheerio.load(html);
  const candidates = [
    "#pressrelease",
    ".acontent",
    ".inner_page_content_container",
    "#mainContent",
    "#content",
    ".edb-content",
    ".edb_content",
    ".page-content",
    "article",
    "main",
    ".content-body",
    "[role='main']",
    "body",
  ];
  const content = candidates
    .map((selector) => $(selector).first())
    .find((element) => element.length && element.text().replace(/\s+/g, "").length > 20);

  content
    ?.find(
      "script, style, nav, header, footer, form, img, iframe, noscript, .controlDisplay, .mobile_all_over_content, .mobile_all_over_content_menu_lv2, .mobile_all_over_content_menu_lv3"
    )
    .remove();
  content?.find("a[href^='#']").remove();
  content?.find("a").each((_, element) => {
    $(element).replaceWith($(element).html() ?? "");
  });

  const raw = content?.html() ?? "";
  if (!raw) return "";

  const allowedTags = new Set([
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "br",
    "blockquote",
    "table",
    "thead",
    "tbody",
    "tr",
    "td",
    "th",
    "strong",
    "em",
    "b",
    "i",
    "u",
    "sub",
    "sup",
    "hr",
    "pre",
    "code",
  ]);

  return raw
    // GovHK / EDB boilerplate cleanup
    .replace(/\bNNNN\b/g, "")
    .replace(/Ends\/\w+,\s+\w+\s+\d{1,2},\s+\d{4}/gi, "")
    .replace(/完\s*\/\s*\S{2,3}\s*，\s*\d{1,2}月\d{1,2}日/g, "")
    .replace(/Issued at HKT \d{2}:\d{2}/gi, "")
    .replace(/於HKT \d{2}:\d{2}發出/g, "")
    // Text-level accessibility boilerplate
    .replace(/跳至主要內容/g, "")
    .replace(/跳至主內容/g, "")
    .replace(/跳至內容/g, "")
    .replace(/跳到主要內容/g, "")
    .replace(/Skip to main content/gi, "")
    // Preserve structural + formatting tags; strip the rest
    .replace(/<[^>]+>/g, (tag) => {
      const match = tag.match(/^<\s*(\/?)\s*([a-z0-9]+)(?:\s[^>]*)?(\/?)\s*>$/i);
      if (!match) return "";
      const [, closing, name, selfClosing] = match;
      const tagName = name.toLowerCase();
      if (!allowedTags.has(tagName)) return "";
      if (tagName === "br" || tagName === "hr" || selfClosing) return `<${tagName}>`;
      return closing ? `</${tagName}>` : `<${tagName}>`;
    })
    .replace(/\son[a-z-]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function RelatedNewsCard({ item }: { item: NewsItem }) {
  const href = item.is_external
    ? item.href
    : `/news/${encodeURIComponent(item.id)}`;

  return (
    <Link
      href={href}
      target={item.is_external ? "_blank" : undefined}
      rel={item.is_external ? "noreferrer" : undefined}
      className="block"
    >
      <div className="rounded-card border border-surface-border bg-white p-5 transition-all duration-200  hover:shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-full bg-forest-50 px-2 py-0.5 text-xs font-medium text-forest-700">
            {item.source_label}
          </span>
          <span className="text-xs text-ink-500">{item.date}</span>
        </div>
        <h3 className="text-sm font-semibold leading-snug text-ink-900 line-clamp-2">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

interface PageProps {
  params: { id: string };
}

export default async function ArticlePage({ params }: PageProps) {
  const decodedId = decodeURIComponent(params.id);
  const article = await getNewsItemById(decodedId);

  if (!article) notFound();

  if (article.is_external) {
    notFound();
  }

  const articleHref = normalizeNewsHref(article.href);
  const html = await fetchArticleContent(articleHref);
  const mainContent = html ? extractMainContent(html) : "";
  const hasContent = mainContent.length > 20;

  if (!html) {
    console.error(`[ArticlePage] fetchArticleContent returned null for: ${articleHref}`);
  } else if (!hasContent) {
    console.warn(`[ArticlePage] extractMainContent produced no usable content for: ${articleHref} (html length: ${html.length})`);
  }
  const hostname = extractHostname(articleHref);
  const allNews = await getAllNewsItems();

  const relatedNews = allNews
    .filter(
      (item) =>
        item.id !== article.id &&
        item.source_category === article.source_category
    )
    .slice(0, 3);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary || article.title,
    url: absoluteUrl(`/news/${encodeURIComponent(article.id)}`),
    datePublished: article.published_at ?? undefined,
    dateModified: article.published_at ?? undefined,
    inLanguage: "zh-HK",
    author: { "@type": "Organization", name: article.source_label },
    publisher: { "@type": "Organization", name: "HKSchoolPlace" },
    isBasedOn: articleHref,
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "消息資訊", path: "/news" },
            { name: article.title, path: `/news/${encodeURIComponent(article.id)}` },
          ]),
          articleJsonLd,
        ]}
      />
      <Link
        href="/news"
        className="mb-6 inline-flex items-center gap-1 text-sm text-ink-500 transition-colors hover:text-ink-900"
      >
        <CaretLeft size={16} weight="bold" aria-hidden="true" />
        返回消息動態
      </Link>

      <div className="mb-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-medium text-forest-700">
            {article.source_label}
          </span>
          <span className="text-xs text-ink-500">{article.date}</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-ink-900">
          {article.title}
        </h1>
        {article.summary && (
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {article.summary}
          </p>
        )}
      </div>

      {hasContent ? (
        <div className="mb-8 rounded-card border border-surface-border bg-white p-6 md:p-8">
          <div
            className="prose prose-slate max-w-none [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-ink-700 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_li]:text-ink-700"
            dangerouslySetInnerHTML={{ __html: mainContent }}
          />
        </div>
      ) : (
        <div className="mb-8 rounded-card border border-surface-border bg-white p-10 text-center">
          <p className="mb-3 text-sm text-ink-500">
            {html ? "無法解析文章內容" : "無法載入原始網頁"}
            ，請前往原始來源查看。
          </p>
          <p className="mb-5 text-xs text-ink-500">{hostname}</p>
          <Link
            href={articleHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-button bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-transform "
          >
            閱讀全文
            <ArrowSquareOut size={14} weight="regular" aria-hidden="true" />
          </Link>
        </div>
      )}

      <div className="mb-10 flex justify-center">
        <Link
          href={articleHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-button border border-surface-border bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-cream-50"
        >
          來源：{article.source_label}
          <ArrowSquareOut size={14} weight="regular" className="text-ink-500" aria-hidden="true" />
        </Link>
      </div>

      {relatedNews.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-ink-900">
            相關消息
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedNews.map((item) => (
              <RelatedNewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
