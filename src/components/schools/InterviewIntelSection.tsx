import { GlassCard } from "@/components/ui/GlassCard";
import {
  INTERVIEW_FORMAT_LABELS,
  SENTIMENT_CONFIG,
} from "@/lib/utils";
import type { SocialSummary } from "@/types/database";

interface InterviewIntelSectionProps {
  socialSummary: SocialSummary;
}

function getMostCommonFormat(dist: Record<string, number>): { label: string; pct: number } | null {
  const entries = Object.entries(dist);
  if (entries.length === 0) return null;
  entries.sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  if (total === 0) return null;
  const [key, count] = entries[0];
  const label = INTERVIEW_FORMAT_LABELS[key] ?? key;
  return { label: `${label}為主`, pct: Math.round((count / total) * 100) };
}

export function InterviewIntelSection({ socialSummary }: InterviewIntelSectionProps) {
  const {
    interview_posts,
    interview_contributor_count,
    interview_format_distribution,
    avg_interview_duration,
    parent_interview_pct,
    top_interview_keywords,
    sentiment_distribution,
    positive_keywords,
    negative_keywords,
    total_posts,
  } = socialSummary;

  // 阈值：interview_posts >= 3
  if (interview_posts < 3) return null;

  const format = getMostCommonFormat(interview_format_distribution ?? {});

  // 5a 概况卡片数据
  const overviewItems = [
    {
      label: "面試形式",
      value: format?.label ?? "暫無資料",
      sub: format ? `(${format.pct}%)` : null,
    },
    {
      label: "平均時長",
      value: avg_interview_duration ? `約${avg_interview_duration}分鐘` : "暫無資料",
      sub: null,
    },
    {
      label: "家長面談",
      value:
        parent_interview_pct != null && parent_interview_pct > 50
          ? "有"
          : "視情況",
      sub: parent_interview_pct != null ? `(${parent_interview_pct}%)` : null,
    },
  ];

  // 5b 关键词 — 至少 3 个关键词，每个频次 ≥ 2
  const validKeywords = (top_interview_keywords ?? []).filter(
    ([, freq]) => freq >= 2,
  );
  const showKeywords = validKeywords.length >= 3;

  // 5c 情感分布 — total_posts >= 5
  const showSentiment = total_posts >= 5 && sentiment_distribution;
  const sentimentTotal = showSentiment
    ? sentiment_distribution.positive +
      sentiment_distribution.neutral +
      sentiment_distribution.negative
    : 0;

  // 负面关键词频次 >= 3 的才显示
  const filteredNegativeKw = Object.entries(negative_keywords ?? {}).filter(
    ([, freq]) => freq >= 3,
  );
  const filteredPositiveKw = Object.entries(positive_keywords ?? {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-950">面試資訊</h2>
        <span className="text-sm text-slate-500">
          {interview_contributor_count} 位家長分享
        </span>
      </div>

      <GlassCard>
        {/* 5a 概况卡片 */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {overviewItems.map((item) => (
            <div
              key={item.label}
              className="bg-slate-50 rounded-xl p-4 text-center"
            >
              <div className="text-xs text-slate-400 mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-slate-950">
                {item.value}
              </div>
              {item.sub && (
                <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
              )}
            </div>
          ))}
        </div>

        {/* 5b 面试内容关键词 */}
        {showKeywords && (
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-950 mb-3">
              考察內容
            </h3>
            <div className="flex flex-wrap gap-2">
              {validKeywords.slice(0, 8).map(([keyword, freq]) => (
                <span
                  key={keyword}
                  className="inline-flex items-center bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {keyword}
                  <span className="text-slate-400 ml-1">×{freq}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 5c 情感分布 */}
        {showSentiment && sentimentTotal > 0 && (
          <>
            <div className="border-t border-dashed border-slate-200 my-4" />
            <div>
              <h3 className="text-sm font-semibold text-slate-950 mb-3">
                家長評價
              </h3>
              <div className="space-y-2.5 mb-3">
                {SENTIMENT_CONFIG.map(({ key, label, barColor, textColor }) => {
                  const value = sentiment_distribution[key] ?? 0;
                  const pct =
                    sentimentTotal > 0
                      ? Math.round((value / sentimentTotal) * 100)
                      : 0;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span
                        className={`text-xs w-[52px] flex-shrink-0 ${textColor}`}
                      >
                        {label}
                      </span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className={`${barColor} rounded-full h-2`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 w-[36px] text-right">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* 关键词列表 */}
              <div className="space-y-1">
                {filteredPositiveKw.length > 0 && (
                  <p className="text-xs text-emerald-600">
                    正面常見：
                    {filteredPositiveKw
                      .map(([kw, freq]) => `${kw}(${freq})`)
                      .join(" · ")}
                  </p>
                )}
                {filteredNegativeKw.length > 0 && (
                  <p className="text-xs text-amber-600">
                    需留意：
                    {filteredNegativeKw
                      .map(([kw, freq]) => `${kw}(${freq})`)
                      .join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* 来源标注 */}
        <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
          數據來源：網絡公開內容整理，僅供參考
        </p>
      </GlassCard>
    </section>
  );
}
