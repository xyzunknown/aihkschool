import { VacancyBadge } from "@/components/schools/VacancyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDateCN, COMPETITION_CONFIG } from "@/lib/utils";
import type { Vacancy } from "@/types/database";

interface VacancySectionProps {
  vacancy: Vacancy | null;
  isStale: boolean;
  deadlineStatus: "safe" | "warn" | "urgent" | "past" | null;
  competitionLevel?: "high" | "medium" | "low" | null;
}

export function VacancySection({ vacancy, isStale, deadlineStatus: dlStatus, competitionLevel }: VacancySectionProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-950">即時學額狀態</h2>
        <a href="#report" className="text-sm text-slate-500 hover:text-slate-900 underline">
          回報更新
        </a>
      </div>
      {vacancy ? (
        <GlassCard>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(["N", "K1", "K2", "K3"] as const).map((grade) => {
              const status =
                grade === "N"
                  ? vacancy.n_vacancy
                  : grade === "K1"
                    ? vacancy.k1_vacancy
                    : grade === "K2"
                      ? vacancy.k2_vacancy
                      : vacancy.k3_vacancy;
              return (
                <div key={grade} className="text-center">
                  <h3 className="text-sm font-semibold text-slate-950 mb-2">{grade}</h3>
                  <VacancyBadge grade={grade} status={status} isStale={isStale} />
                </div>
              );
            })}
          </div>

          {/* Competition level reference */}
          {competitionLevel && COMPETITION_CONFIG[competitionLevel] && (
            <div className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
              📊 競爭參考：
              <span className={COMPETITION_CONFIG[competitionLevel].color}>
                {COMPETITION_CONFIG[competitionLevel].label}
              </span>
              {" — "}
              {COMPETITION_CONFIG[competitionLevel].description}
            </div>
          )}

          {/* Stale warning + deadline — only once at bottom */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
            {isStale && (
              <p className="text-sm text-slate-500">
                數據更新超過 30 天，建議直接聯絡學校確認。
              </p>
            )}
            {vacancy.application_deadline && dlStatus && dlStatus !== "past" && (
              <p className="text-sm text-slate-600">
                申請截止：{formatDateCN(vacancy.application_deadline)}
              </p>
            )}
            {vacancy.edb_published_date && (
              <p className="text-sm text-slate-400">
                最後更新：{formatDateCN(vacancy.edb_published_date)}
              </p>
            )}
          </div>
        </GlassCard>
      ) : (
        <GlassCard>
          <p className="text-base text-slate-900">
            暫無空缺數據，建議直接聯絡學校。
          </p>
        </GlassCard>
      )}
    </section>
  );
}
