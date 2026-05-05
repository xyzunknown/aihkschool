"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { NewsItem } from "@/types/homepage";

const CATEGORIES = [
  { key: "all", label: "全部" },
  { key: "latest", label: "最新" },
  { key: "activity", label: "活動" },
  { key: "policy", label: "升學" },
  { key: "edu_policy", label: "教育政策" },
] as const;

const SOURCE_STYLES: Record<string, string> = {
  edb: "bg-leaf-100 text-forest-700",
  govhk: "bg-leaf-50 text-forest-600",
  hk01: "bg-sand-100 text-sand-700",
  ohpama: "bg-rust-500/10 text-rust-600",
  sundaykiss: "bg-sand-50 text-sand-700",
  parentingheadline: "bg-leaf-100 text-forest-600",
};

function sourceStyle(source: string): string {
  return SOURCE_STYLES[source] ?? "bg-cream-200 text-ink-700";
}

type CategoryKey = (typeof CATEGORIES)[number]["key"];

function buildShareUrl(href: string) {
  if (typeof window === "undefined") return href;
  return new URL(href, window.location.origin).toString();
}

async function copyTextToClipboard(text: string) {
  if (typeof window === "undefined") return false;

  const clipboard = window.navigator.clipboard;
  if (clipboard?.writeText) {
    await clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }

  return copied;
}

export default function NewsPage() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [isLoading, setIsLoading] = useState(true);
  const requestedTab = searchParams.get("tab");

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/news");
      if (response.ok) {
        const data = (await response.json()) as { data: NewsItem[] };
        setItems(data.data);
      }
    } catch {
      // Fallback: empty list
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    const nextCategory = CATEGORIES.some((cat) => cat.key === requestedTab)
      ? (requestedTab as CategoryKey)
      : "all";
    setActiveCategory(nextCategory);
  }, [requestedTab]);

  const filtered = items.filter((item) => {
    if (activeCategory === "all" || activeCategory === "latest") return true;
    if (activeCategory === "activity") return item.content_type === "school_event";
    if (activeCategory === "policy") return item.content_type === "admission";
    if (activeCategory === "edu_policy") return item.content_type === "policy";
    return true;
  });

  async function handleShare(item: NewsItem, href: string) {
    const shareUrl = buildShareUrl(href);
    const shareData = {
      title: item.title,
      text: item.summary || item.title,
      url: shareUrl,
    };

    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await navigator.share(shareData);
        return;
      }

      if (await copyTextToClipboard(shareUrl)) {
        window.alert("連結已複製");
        return;
      }
    } catch {
      // Fall through to a simple, non-blocking message.
    }

    window.alert(`請手動複製這個連結：${shareUrl}`);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50 border-b border-cream-200">
        <span className="leaf-decor leaf-decor-tl pointer-events-none" />
        <span className="leaf-decor leaf-decor-tr pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
          <Link href="/" className="text-xs text-forest-600 hover:underline mb-3 inline-block">
            首頁 / 資訊動態
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-ink-900 leading-tight">資訊消息</h1>
          <p className="mt-3 text-sm md:text-base text-ink-700 max-w-xl">
            掌握最新教育資訊、學校活動、升學政策
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-8">
        <div className="mb-6 flex gap-2 overflow-x-auto hide-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-shrink-0 rounded-pill px-4 h-10 text-sm font-medium transition ${
                activeCategory === cat.key
                  ? "bg-forest-600 text-white shadow-soft"
                  : "bg-white text-ink-700 border border-cream-200 hover:bg-leaf-50 hover:border-forest-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-card bg-cream-100" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-card border border-cream-200 bg-white p-10 text-center">
            <p className="text-sm text-ink-500">暫無相關消息</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => {
              const isExternal = item.is_external;
              const href = isExternal ? item.href : `/news/${encodeURIComponent(item.id)}`;

              return (
                <article
                  key={item.id}
                  className="rounded-card border border-cream-200 bg-white px-5 py-4 transition hover:shadow-card hover:border-forest-200"
                >
                  <div className="flex items-start gap-3">
                    <Link
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="flex min-w-0 flex-1 items-start gap-3 group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-leaf-50 flex items-center justify-center text-base">
                        📰
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold ${sourceStyle(item.source)}`}
                          >
                            {item.source_label}
                          </span>
                          {item.content_type_label && (
                            <span className="inline-flex items-center rounded-md bg-cream-200 px-2 py-0.5 text-[11px] font-medium text-ink-700">
                              {item.content_type_label}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold leading-snug text-ink-900 line-clamp-2 group-hover:text-forest-700 transition">
                          {item.title}
                        </h3>
                        {item.summary && (
                          <p className="mt-1 text-xs text-ink-500 line-clamp-2 leading-relaxed">
                            {item.summary}
                          </p>
                        )}
                      </div>
                    </Link>
                    <div className="flex-shrink-0 flex flex-col items-end gap-2">
                      <span className="text-[11px] text-ink-500">{item.date}</span>
                      <div className="flex items-center gap-1.5 text-ink-400">
                        <button
                          type="button"
                          aria-label="分享"
                          className="hover:text-forest-600"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            void handleShare(item, href);
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-forest-600 text-white shadow-card hover:bg-forest-700 transition flex items-center justify-center"
        aria-label="返回頂部"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>
    </>
  );
}
