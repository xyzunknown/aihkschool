import { VacancyBadge } from "@/components/schools/VacancyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDateCN } from "@/lib/utils";
import type { Vacancy } from "@/types/database";

interface VacancySectionProps {
  vacancy: Vacancy | null;
  isStale: boolean;
}

export function VacancySection({ vacancy, isStale }: VacancySectionProps) {
  return (
    <section>
      {vacancy ? (
        <GlassCard className="h-full p-5 md:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-ink-900">學額狀態</h2>
              {vacancy.edb_published_date && (
                <p className="mt-1 text-sm text-ink-500">
                  最近更新：{formatDateCN(vacancy.edb_published_date)}
                </p>
              )}
            </div>
            <a href="#report" className="shrink-0 text-sm text-ink-500 underline underline-offset-2 hover:text-ink-900">
              回報更新
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {(["K1", "K2", "K3"] as const).map((grade) => {
              const status =
                grade === "K1"
                    ? vacancy.k1_vacancy
                    : grade === "K2"
                      ? vacancy.k2_vacancy
                      : vacancy.k3_vacancy;
              return (
                <div key={grade} className="text-center">
                  <h3 className="mb-2 text-sm font-semibold text-ink-900">{grade}</h3>
                  <VacancyBadge grade={grade} status={status} isStale={isStale} />
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t border-surface-border pt-3">
            {isStale && (
              <p className="text-sm text-ink-500">
                資料更新超過 30 天，建議直接向學校確認。
              </p>
            )}
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="h-full p-5 md:p-6">
          <h2 className="text-xl font-semibold text-ink-900">學額狀態</h2>
          <p className="mt-3 text-base text-ink-900">
            暫無空缺數據，建議直接聯絡學校。
          </p>
        </GlassCard>
      )}
    </section>
  );
}
