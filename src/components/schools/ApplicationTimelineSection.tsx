import { GlassCard } from "@/components/ui/GlassCard";
import { TIMELINE_EVENT_CONFIG, MONTH_LABELS } from "@/lib/utils";
import type { SocialSummary } from "@/types/database";

interface ApplicationTimelineSectionProps {
  socialSummary: SocialSummary;
}

export function ApplicationTimelineSection({
  socialSummary,
}: ApplicationTimelineSectionProps) {
  const { timeline_summary } = socialSummary;

  // 阈值：至少 3 个事件类型有数据
  const entries = Object.entries(timeline_summary ?? {}).filter(
    ([, v]) => v && v.count > 0,
  );
  if (entries.length < 3) return null;

  // 按月份排序
  entries.sort((a, b) => a[1].typical_month - b[1].typical_month);

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-slate-950 mb-4">
        往年申請時間線
      </h2>

      <GlassCard>
        <div className="space-y-0">
          {entries.map(([eventType, { typical_month, count }], idx) => {
            const config = TIMELINE_EVENT_CONFIG[eventType];
            const label = config?.label ?? eventType;
            const icon = config?.icon ?? "📌";
            const monthLabel = MONTH_LABELS[typical_month] ?? `${typical_month}月`;
            const isLast = idx === entries.length - 1;

            return (
              <div key={eventType} className="flex items-start gap-4">
                {/* 左侧时间线 */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-slate-950" />
                  {!isLast && <div className="w-0.5 h-8 bg-slate-200" />}
                </div>

                {/* 右侧内容 */}
                <div className="pb-4 -mt-0.5">
                  <span className="text-sm font-medium text-slate-950">
                    {monthLabel}
                  </span>
                  <span className="text-xs text-slate-500 ml-2">
                    {icon} {label}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">
                    ({count}位家長回報)
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部警告 */}
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
          <p className="text-xs text-amber-600">
            ⚠️ 以上為往年數據整理，{currentYear}/{nextYear.toString().slice(2)}{" "}
            年度以學校公佈為準
          </p>
          <p className="text-xs text-slate-400">
            數據來源：網絡公開內容整理，僅供參考
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
