"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { NewsItem } from "@/types/homepage";

const CATEGORIES = [
  { key: "all", label: "全部" },
  { key: "government", label: "政府信息" },
  { key: "media", label: "媒體信息" },
  { key: "school", label: "學校信息" },
] as const;

const MEDIA_TYPES = [
  { key: "all", label: "全部類型" },
  { key: "open_day", label: "開放日" },
  { key: "admission", label: "招生" },
  { key: "interview", label: "面試" },
  { key: "policy", label: "升學政策" },
  { key: "feature", label: "專題整理" },
  { key: "school_event", label: "學校事件" },
] as const;

const SOURCE_STYLES: Record<string, string> = {
  edb: "bg-emerald-50 text-emerald-700",
  govhk: "bg-sky-50 text-sky-700",
  hk01: "bg-amber-50 text-amber-700",
  ohpama: "bg-rose-50 text-rose-700",
  sundaykiss: "bg-violet-50 text-violet-700",
  parentingheadline: "bg-cyan-50 text-cyan-700",
};

function sourceStyle(source: string): string {
  return SOURCE_STYLES[source] ?? "bg-blue-50 text-blue-700";
}

type CategoryKey = (typeof CATEGORIES)[number]["key"];
type MediaTypeKey = (typeof MEDIA_TYPES)[number]["key"];

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [activeMediaType, setActiveMediaType] = useState<MediaTypeKey>("all");
  const [isLoading, setIsLoading] = useState(true);

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

  const filtered =
    items.filter((item) => {
      const categoryMatched = activeCategory === "all" || item.source_category === activeCategory;
      const mediaTypeMatched =
        activeMediaType === "all" ||
        (item.source_category === "media" && item.content_type === activeMediaType);
      return categoryMatched && mediaTypeMatched;
    });

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-950"
        >
          ← 返回首頁
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">
          消息動態
        </h1>
      </div>

      {/* Filter pills */}
      <div className="mb-6 flex gap-2 overflow-x-auto hide-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              if (cat.key !== "media") setActiveMediaType("all");
            }}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? "bg-slate-950 text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {(activeCategory === "all" || activeCategory === "media") && (
        <div className="mb-6 flex gap-2 overflow-x-auto hide-scrollbar">
          {MEDIA_TYPES.map((type) => (
            <button
              key={type.key}
              onClick={() => {
                setActiveMediaType(type.key);
                if (type.key !== "all") setActiveCategory("media");
              }}
              className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeMediaType === type.key
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      )}

      {/* News list */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">暫無相關消息</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const isExternal = item.is_external;
            const href = isExternal
              ? item.href
              : `/news/${encodeURIComponent(item.id)}`;

            return (
              <Link
                key={item.id}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="block"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex flex-shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sourceStyle(item.source)}`}
                    >
                      {item.source_label}
                    </span>
                    {item.content_type_label && (
                      <span className="mt-0.5 inline-flex flex-shrink-0 items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {item.content_type_label}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold leading-snug text-slate-900 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-1.5 mt-1">
                      <span className="text-xs text-slate-400">
                        {item.date}
                      </span>
                      {isExternal && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-slate-300"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
