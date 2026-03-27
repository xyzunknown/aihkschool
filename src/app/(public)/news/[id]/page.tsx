import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNewsItems } from "@/lib/homepage/liveData";

async function fetchArticleContent(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 21600 },
      headers: {
        "user-agent": "Mozilla/5.0 HKSchoolPlace/1.0",
      },
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

function extractMainContent(html: string): string {
  // Try site-specific selectors first, then generic fallbacks
  const contentMatch =
    // GovHK press releases
    html.match(/<div[^>]*id=["']pressrelease["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>/i) ??
    html.match(/<div[^>]*class=["']acontent["'][^>]*>([\s\S]*?)<\/div>/i) ??
    // EDB content area
    html.match(/<div[^>]*class=["'][^"]*edb-content[^"]*["'][^>]*>([\s\S]*?)<\/div>/i) ??
    // Generic patterns
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ??
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ??
    html.match(/<div[^>]*class=["'][^"]*content-body[^"]*["'][^>]*>([\s\S]*?)<\/div>/i) ??
    html.match(/<div[^>]*role=["']main["'][^>]*>([\s\S]*?)<\/div>/i);

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
    .replace(/<a\s[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    .replace(/<[^>]+>/g, (tag) => {
      if (/^<\/?(p|h[1-6]|ul|ol|li|br|blockquote)\s*\/?>/i.test(tag)) return tag;
      return "";
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12">
      <Link
        href="/news"
        className="mb-6 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-950"
      >
        ← 返回消息動態
      </Link>

      <div className="mb-8">
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
        <div
          className="prose prose-slate max-w-none mb-8 [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-slate-700 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_li]:text-slate-700"
          dangerouslySetInnerHTML={{ __html: mainContent }}
        />
      ) : (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            無法載入完整內容，請前往原始來源查看。
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Link
          href={article.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
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
    </div>
  );
}
