import type { SchoolEnrichment } from "@/lib/db/schools";

interface ReputationSectionProps {
  enrichment: SchoolEnrichment | null;
}

const PLATFORM_LABELS: Record<string, string> = {
  xhs: "小紅書",
  bkmilk: "BK Milk",
  babykingdom: "親子王國",
  threads: "Threads",
  facebook: "Facebook",
};

/**
 * 家長口碑區塊 — 顯示從社交平台聚合的學校真實評價。
 *
 * 規則：
 *  - 只要存在任一有效口碑數據就顯示（摘要、標籤、情緒、面試風格、原話等）
 *  - 若資料量低（scrape_confidence = 'low'）→ 顯示警示條
 *  - 所有數據基於公開社交平台貼文，已脫敏
 */
export function ReputationSection({ enrichment }: ReputationSectionProps) {
  if (!enrichment) return null;

  const {
    reputation_summary,
    pros_tags,
    cons_tags,
    interview_style,
    quote_highlights,
    sentiment_positive_ratio,
    source_count_by_platform,
    scrape_confidence,
  } = enrichment;

  // Check if there is ANY valid reputation data
  const hasAnyData =
    reputation_summary ||
    (pros_tags && pros_tags.length > 0) ||
    (cons_tags && cons_tags.length > 0) ||
    interview_style ||
    (quote_highlights && quote_highlights.length > 0) ||
    typeof sentiment_positive_ratio === "number" ||
    (source_count_by_platform && Object.values(source_count_by_platform).some((n) => typeof n === "number" && n > 0));

  if (!hasAnyData) return null;

  const totalPosts = Object.values(source_count_by_platform || {}).reduce(
    (sum, n) => sum + (typeof n === "number" ? n : 0),
    0,
  );

  const platformList = Object.entries(source_count_by_platform || {})
    .filter(([, count]) => typeof count === "number" && count > 0)
    .map(
      ([platform, count]) =>
        `${PLATFORM_LABELS[platform] ?? platform} ${count}`,
    );

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-950">家長口碑</h2>
        {totalPosts > 0 && (
          <span className="text-xs text-slate-500">
            基於 {totalPosts} 條公開貼文（{platformList.join(" · ")}）
          </span>
        )}
      </div>

      {scrape_confidence === "low" && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
          資料量較少，以下內容僅供參考。
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        {/* Summary + sentiment */}
        {(reputation_summary || typeof sentiment_positive_ratio === "number") && (
          <div>
            {reputation_summary && (
              <p className="text-base leading-relaxed text-slate-700">
                {reputation_summary}
              </p>
            )}
            {typeof sentiment_positive_ratio === "number" && (
              <div className={`${reputation_summary ? "mt-3" : ""} flex items-center gap-2 text-xs text-slate-500`}>
                <span>家長正面評價佔比</span>
                <span className="font-medium text-slate-950">
                  {Math.round(sentiment_positive_ratio * 100)}%
                </span>
              </div>
            )}
          </div>
        )}

        {/* Pros / Cons tags */}
        {(pros_tags.length > 0 || cons_tags.length > 0) && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {pros_tags.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  家長讚賞
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pros_tags.map((t) => (
                    <span
                      key={t.tag}
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                    >
                      {t.tag}
                      <span className="text-emerald-500">·{t.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {cons_tags.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  家長關注點
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cons_tags.map((t) => (
                    <span
                      key={t.tag}
                      className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
                    >
                      {t.tag}
                      <span className="text-amber-500">·{t.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interview style */}
        {interview_style && (
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              面試風格
            </h3>
            <p className="text-sm leading-relaxed text-slate-700">
              {interview_style}
            </p>
          </div>
        )}

        {/* Quote highlights */}
        {quote_highlights && quote_highlights.length > 0 && (
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
              家長原話
            </h3>
            <ul className="space-y-2">
              {quote_highlights.map((q, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  「{q.text}」
                  <span className="ml-2 text-xs text-slate-400">
                    — {PLATFORM_LABELS[q.source_platform] ?? q.source_platform}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-slate-400">
          以上內容由 AI 聚合自公開社交媒體貼文，並非學校官方聲明。
        </p>
      </div>
    </section>
  );
}
