import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllNewsItems } from "@/lib/homepage/liveData";
import { NEWS_ITEMS } from "@/data/homepage";
import type { NewsItem } from "@/types/homepage";

export const revalidate = 3600;

export function generateStaticParams() {
  return NEWS_ITEMS
    .filter((item) => !item.is_external)
    .map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const decodedId = decodeURIComponent(params.id);
  const allNews = await getAllNewsItems();
  const article = allNews.find((item) => item.id === decodedId);

  if (!article || article.is_external) {
    return {
      title: "資訊消息",
      description: "掌握最新教育資訊、學校活動、升學政策。",
    };
  }

  const description = article.summary || article.title;

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url: `/news/${encodeURIComponent(article.id)}`,
      images: ["/brand/Web Logo/Logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: ["/brand/Web Logo/Logo.png"],
    },
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
  const html = await fetchHtml(url);
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
  // Try site-specific selectors first, then generic fallbacks
  // GovHK uses <span id="pressrelease">, not <div>
  const contentMatch =
    // GovHK press releases — uses <span> or <div>
    html.match(/<(?:div|span)[^>]*id=["']pressrelease["'][^>]*>([\s\S]*?)<\/(?:div|span)>/i) ??
    html.match(/<(?:div|span)[^>]*class=["']acontent["'][^>]*>([\s\S]*?)<\/(?:div|span)>/i) ??
    // EDB content areas (order by specificity)
    html.match(/<(?:div|td|section)[^>]*id=["']mainContent["'][^>]*>([\s\S]*?)<\/(?:div|td|section)>/i) ??
    html.match(/<(?:div|td|section)[^>]*id=["']content["'][^>]*>([\s\S]*?)<\/(?:div|td|section)>/i) ??
    html.match(/<div[^>]*class=["'][^"]*edb-content[^"]*["'][^>]*>([\s\S]*?)<\/div>/i) ??
    html.match(/<div[^>]*class=["'][^"]*edb_content[^"]*["'][^>]*>([\s\S]*?)<\/div>/i) ??
    html.match(/<div[^>]*class=["'][^"]*content\s[^"]*["'][^>]*>([\s\S]*?)<\/div>/i) ??
    html.match(/<div[^>]*class=["'][^"]*page-content[^"]*["'][^>]*>([\s\S]*?)<\/div>/i) ??
    // Generic patterns
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ??
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ??
    html.match(/<div[^>]*class=["'][^"]*content-body[^"]*["'][^>]*>([\s\S]*?)<\/div>/i) ??
    html.match(/<div[^>]*role=["']main["'][^>]*>([\s\S]*?)<\/div>/i) ??
    // Last resort: extract body content
    html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  const raw = contentMatch?.[1] ?? "";
  if (!raw) return "";

  // Strip scripts, styles, nav, forms, images
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    // Remove skip-nav / anchor-only links entirely (before generic <a> cleanup)
    .replace(/<a\s[^>]*href=["']#[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, "")
    // Strip remaining <a> tags, keep text
    .replace(/<a\s[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    // GovHK / EDB boilerplate cleanup
    .replace(/<div[^>]*class=["'][^"]*controlDisplay[^"]*["'][^>]*>[\s\S]*?<\/div>/gi, "")
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
      if (/^<\/?(p|h[1-6]|ul|ol|li|br|blockquote|table|thead|tbody|tr|t[dh]|strong|em|b|i|u|sub|sup|hr|pre|code)\s*\/?>/i.test(tag)) return tag;
      return "";
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
      <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            {item.source_label}
          </span>
          <span className="text-xs text-slate-400">{item.date}</span>
        </div>
        <h3 className="text-sm font-semibold leading-snug text-slate-900 line-clamp-2">
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
  const allNews = await getAllNewsItems();
  const article = allNews.find((item) => item.id === decodedId);

  if (!article) notFound();

  if (article.is_external) {
    notFound();
  }

  const html = await fetchArticleContent(article.href);
  const mainContent = html ? extractMainContent(html) : "";
  const hasContent = mainContent.length > 20;

  if (!html) {
    console.error(`[ArticlePage] fetchArticleContent returned null for: ${article.href}`);
  } else if (!hasContent) {
    console.warn(`[ArticlePage] extractMainContent produced no usable content for: ${article.href} (html length: ${html.length})`);
  }
  const hostname = extractHostname(article.href);

  const relatedNews = allNews
    .filter(
      (item) =>
        item.id !== article.id &&
        item.source_category === article.source_category
    )
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
      <Link
        href="/news"
        className="mb-6 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-950"
      >
        ← 返回消息動態
      </Link>

      <div className="mb-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            {article.source_label}
          </span>
          <span className="text-xs text-slate-400">{article.date}</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-950">
          {article.title}
        </h1>
        {article.summary && (
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {article.summary}
          </p>
        )}
      </div>

      {hasContent ? (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <div
            className="prose prose-slate max-w-none [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-slate-700 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_li]:text-slate-700"
            dangerouslySetInnerHTML={{ __html: mainContent }}
          />
        </div>
      ) : (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="mb-3 text-sm text-slate-500">
            {html ? "無法解析文章內容" : "無法載入原始網頁"}
            ，請前往原始來源查看。
          </p>
          <p className="mb-5 text-xs text-slate-400">{hostname}</p>
          <Link
            href={article.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            閱讀全文
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      )}

      <div className="mb-10 flex justify-center">
        <Link
          href={article.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          來源：{article.source_label}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </Link>
      </div>

      {relatedNews.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
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
