"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowSquareOut,
  ArrowUp,
  CalendarBlank,
  Check,
  Copy,
  FacebookLogo,
  Funnel,
  LinkSimple,
  NewspaperClipping,
  PaperPlaneTilt,
  ShareNetwork,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import type { NewsItem } from "@/types/homepage";
import { normalizeNewsHref } from "@/lib/news/links";

const CATEGORIES = [
  { key: "all", label: "全部" },
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

type CategoryKey = (typeof CATEGORIES)[number]["key"];

type ShareTarget = {
  title: string;
  summary?: string | null;
  url: string;
};

function sourceStyle(source: string): string {
  return SOURCE_STYLES[source] ?? "bg-cream-200 text-ink-700";
}

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

export function NewsClient() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [shareTarget, setShareTarget] = useState<ShareTarget | null>(null);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [canUseNativeShare, setCanUseNativeShare] = useState(false);
  const requestedTab = searchParams?.get("tab") ?? null;

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
    setCanUseNativeShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  useEffect(() => {
    if (!shareTarget) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShareTarget(null);
        setShareStatus("idle");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shareTarget]);

  useEffect(() => {
    const normalizedTab = requestedTab === "latest" ? "all" : requestedTab;
    const nextCategory = CATEGORIES.some((cat) => cat.key === normalizedTab)
      ? (normalizedTab as CategoryKey)
      : "all";
    setActiveCategory(nextCategory);
  }, [requestedTab]);

  const filtered = items.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "activity") return item.content_type === "school_event";
    if (activeCategory === "policy") return item.content_type === "admission";
    if (activeCategory === "edu_policy") return item.content_type === "policy";
    return true;
  });
  const [leadItem, ...restItems] = filtered;
  const stats = [
    { label: "全部消息", value: items.length },
    { label: "學校活動", value: items.filter((item) => item.content_type === "school_event").length },
    { label: "升學安排", value: items.filter((item) => item.content_type === "admission").length },
    { label: "教育政策", value: items.filter((item) => item.content_type === "policy").length },
  ];

  async function handleShare(item: NewsItem, href: string) {
    const shareUrl = buildShareUrl(href);

    setShareTarget({
      title: item.title,
      summary: item.summary,
      url: shareUrl,
    });
    setShareStatus("idle");
  }

  async function copyShareLink() {
    if (!shareTarget) return;
    try {
      setShareStatus((await copyTextToClipboard(shareTarget.url)) ? "copied" : "failed");
    } catch {
      setShareStatus("failed");
    }
  }

  async function nativeShare() {
    if (!shareTarget || typeof navigator === "undefined" || !("share" in navigator)) return;

    try {
      await navigator.share({
        title: shareTarget.title,
        text: shareTarget.summary || shareTarget.title,
        url: shareTarget.url,
      });
      setShareTarget(null);
      setShareStatus("idle");
    } catch {
      // User cancellation should keep the share sheet available.
    }
  }

  const shareText = shareTarget ? `${shareTarget.title}\n${shareTarget.url}` : "";
  const encodedShareText = encodeURIComponent(shareText);
  const encodedShareUrl = encodeURIComponent(shareTarget?.url ?? "");

  return (
    <>
      <div id="news-list" className="mx-auto max-w-[1280px] px-5 py-8 md:px-10 md:py-10">
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-card border border-surface-border bg-white px-4 py-3 shadow-soft">
              <p className="text-label text-ink-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-ink-900">{isLoading ? "—" : stat.value}</p>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-card border border-surface-border bg-white" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <>
            <div className="mb-6 flex flex-col gap-3 rounded-card border border-surface-border bg-white px-4 py-4 shadow-soft md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink-800">
                <Funnel aria-hidden="true" size={18} weight="regular" className="text-forest-700" />
                按主題查看
              </div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    className={`h-10 flex-shrink-0 rounded-pill px-4 text-sm font-medium transition ${
                      activeCategory === cat.key
                        ? "bg-forest-700 text-white shadow-soft"
                        : "border border-surface-border bg-white text-ink-700 hover:border-forest-200 hover:bg-forest-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-card border border-surface-border bg-white p-10 text-center shadow-soft">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                <NewspaperClipping aria-hidden="true" size={26} weight="regular" />
              </div>
              <p className="text-sm text-ink-500">暫無相關消息</p>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-3 rounded-card border border-surface-border bg-white px-4 py-4 shadow-soft md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink-800">
                <Funnel aria-hidden="true" size={18} weight="regular" className="text-forest-700" />
                按主題查看
              </div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    className={`h-10 flex-shrink-0 rounded-pill px-4 text-sm font-medium transition ${
                      activeCategory === cat.key
                        ? "bg-forest-700 text-white shadow-soft"
                        : "border border-surface-border bg-white text-ink-700 hover:border-forest-200 hover:bg-forest-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {leadItem ? (() => {
              const isExternal = leadItem.is_external;
              const sourceHref = normalizeNewsHref(leadItem.href);
              const href = isExternal ? sourceHref : `/news/${encodeURIComponent(leadItem.id)}`;

              return (
                <article className="mb-4 overflow-hidden rounded-card border border-surface-border bg-white shadow-card">
                  <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <Link
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="group block min-w-0 px-5 py-5 md:px-6 md:py-6"
                    >
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-md px-2.5 py-1 text-label font-semibold ${sourceStyle(leadItem.source)}`}
                        >
                          {leadItem.source_label}
                        </span>
                        {leadItem.content_type_label && (
                          <span className="inline-flex items-center rounded-md bg-cream-100 px-2.5 py-1 text-label font-semibold text-ink-700">
                            {leadItem.content_type_label}
                          </span>
                        )}
                      </div>
                      <h2 className="max-w-3xl text-xl font-bold leading-snug text-ink-900 transition group-hover:text-forest-700 md:text-2xl">
                        {leadItem.title}
                      </h2>
                      {leadItem.summary ? (
                        <p className="mt-3 max-w-3xl text-body text-ink-700 line-clamp-3">
                          {leadItem.summary}
                        </p>
                      ) : null}
                    </Link>
                    <div className="border-t border-surface-border bg-cream-50 px-5 py-5 lg:border-l lg:border-t-0">
                      <div className="mb-4 flex items-center gap-2 text-sm text-ink-600">
                        <CalendarBlank aria-hidden="true" size={18} weight="regular" className="text-forest-700" />
                        {leadItem.date}
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                        <Link
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-forest-700 px-4 text-sm font-semibold text-white transition hover:bg-forest-800"
                        >
                          閱讀全文
                          {isExternal ? <ArrowSquareOut aria-hidden="true" size={16} weight="regular" /> : null}
                        </Link>
                        <button
                          type="button"
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-surface-border bg-white px-4 text-sm font-semibold text-ink-700 transition hover:bg-forest-50"
                          onClick={() => void handleShare(leadItem, href)}
                        >
                          <ShareNetwork aria-hidden="true" size={16} weight="regular" />
                          分享
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })() : null}

            <div className="space-y-3">
              {restItems.map((item) => {
                const isExternal = item.is_external;
                const sourceHref = normalizeNewsHref(item.href);
                const href = isExternal ? sourceHref : `/news/${encodeURIComponent(item.id)}`;

                return (
                  <article
                    key={item.id}
                    className="rounded-card border border-surface-border bg-white px-4 py-4 shadow-soft transition hover:border-forest-200 hover:shadow-card md:px-5"
                  >
                    <div className="flex items-start gap-3">
                      <Link
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                        className="group flex min-w-0 flex-1 items-start gap-3"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                          <NewspaperClipping aria-hidden="true" size={20} weight="regular" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-label font-semibold ${sourceStyle(item.source)}`}
                          >
                            {item.source_label}
                          </span>
                          {item.content_type_label && (
                            <span className="inline-flex items-center rounded-md bg-cream-100 px-2 py-0.5 text-label font-semibold text-ink-700">
                              {item.content_type_label}
                            </span>
                          )}
                          </div>
                          <h3 className="text-sm font-semibold leading-snug text-ink-900 line-clamp-2 transition group-hover:text-forest-700 md:text-base">
                            {item.title}
                          </h3>
                          {item.summary ? (
                            <p className="mt-1 text-small text-ink-500 line-clamp-2">
                              {item.summary}
                            </p>
                          ) : null}
                        </div>
                      </Link>
                      <div className="flex flex-shrink-0 flex-col items-end gap-2">
                        <span className="text-label text-ink-500">{item.date}</span>
                        <button
                          type="button"
                          aria-label="分享"
                          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition hover:bg-forest-50 hover:text-forest-700"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            void handleShare(item, href);
                          }}
                        >
                          <ShareNetwork aria-hidden="true" size={15} weight="regular" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-forest-600 text-white shadow-card hover:bg-forest-700 transition flex items-center justify-center"
        aria-label="返回頂部"
      >
        <ArrowUp aria-hidden="true" size={18} weight="bold" />
      </button>

      {shareTarget ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/45 px-4 py-4 backdrop-blur-sm md:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-share-title"
          onClick={() => {
            setShareTarget(null);
            setShareStatus("idle");
          }}
        >
          <div
            className="w-full max-w-md animate-slide-up rounded-card border border-cream-200 bg-white p-5 shadow-card md:animate-fade-in"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-leaf-50 text-forest-700">
                <ShareNetwork aria-hidden="true" size={18} weight="regular" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="news-share-title" className="text-base font-semibold text-ink-900">
                  分享這則消息
                </h2>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-600">{shareTarget.title}</p>
              </div>
              <button
                type="button"
                aria-label="關閉分享"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-ink-500 transition hover:bg-cream-100 hover:text-ink-900"
                onClick={() => {
                  setShareTarget(null);
                  setShareStatus("idle");
                }}
              >
                <X aria-hidden="true" size={18} weight="regular" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <a
                href={`https://wa.me/?text=${encodedShareText}`}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[76px] flex-col items-center justify-center rounded-card border border-cream-200 bg-white px-2 text-center text-xs font-medium text-ink-700 transition hover:border-forest-200 hover:bg-leaf-50"
              >
                <WhatsappLogo aria-hidden="true" className="mb-2 text-[#128C7E]" size={22} weight="regular" />
                WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodedShareUrl}&text=${encodeURIComponent(shareTarget.title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[76px] flex-col items-center justify-center rounded-card border border-cream-200 bg-white px-2 text-center text-xs font-medium text-ink-700 transition hover:border-forest-200 hover:bg-leaf-50"
              >
                <PaperPlaneTilt aria-hidden="true" className="mb-2 text-[#229ED9]" size={22} weight="regular" />
                Telegram
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[76px] flex-col items-center justify-center rounded-card border border-cream-200 bg-white px-2 text-center text-xs font-medium text-ink-700 transition hover:border-forest-200 hover:bg-leaf-50"
              >
                <FacebookLogo aria-hidden="true" className="mb-2 text-[#1877F2]" size={22} weight="regular" />
                Facebook
              </a>
              <button
                type="button"
                className="flex min-h-[76px] flex-col items-center justify-center rounded-card border border-cream-200 bg-white px-2 text-center text-xs font-medium text-ink-700 transition hover:border-forest-200 hover:bg-leaf-50"
                onClick={copyShareLink}
              >
                {shareStatus === "copied" ? (
                  <Check aria-hidden="true" className="mb-2 text-forest-600" size={22} weight="bold" />
                ) : (
                  <Copy aria-hidden="true" className="mb-2 text-forest-700" size={22} weight="regular" />
                )}
                複製連結
              </button>
            </div>

            <div className="mt-4 rounded-card bg-cream-100 px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-ink-600">
                <LinkSimple aria-hidden="true" size={14} weight="regular" className="flex-shrink-0 text-forest-600" />
                <span className="min-w-0 truncate">{shareTarget.url}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              {canUseNativeShare ? (
                <button
                  type="button"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-forest-600 px-4 text-sm font-semibold text-white transition hover:bg-forest-700"
                  onClick={nativeShare}
                >
                  <ShareNetwork aria-hidden="true" size={16} weight="regular" />
                  更多分享方式
                </button>
              ) : null}
              <a
                href={shareTarget.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-cream-200 px-4 text-sm font-semibold text-ink-700 transition hover:bg-cream-100"
              >
                <ArrowSquareOut aria-hidden="true" size={16} weight="regular" />
                打開原文
              </a>
            </div>

            <div className="mt-3 min-h-5 text-center text-xs text-ink-500">
              {shareStatus === "copied" ? "連結已複製，可以直接貼到訊息裡。" : null}
              {shareStatus === "failed" ? "未能自動複製，請長按上方連結手動複製。" : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
