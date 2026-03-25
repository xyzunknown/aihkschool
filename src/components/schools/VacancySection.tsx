import { VacancyBadge } from "@/components/schools/VacancyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDateCN, GRADE_LABELS } from "@/lib/utils";
import type { Vacancy } from "@/types/database";

interface VacancySectionProps {
  vacancy: Vacancy | null;
  isStale: boolean;
  deadlineStatus: "safe" | "warn" | "urgent" | "past" | null;
}

export function VacancySection({ vacancy, isStale, deadlineStatus: dlStatus }: VacancySectionProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-950">即時學額狀態</h2>
        <a href="#report" className="text-sm text-slate-500 hover:text-slate-900 underline">
          回報更新
        </a>
      </div>
      {vacancy ? (
        <div className="space-y-4">
          {["N", "K1", "K2", "K3"].map((grade) => (
            <GlassCard key={grade}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-slate-950 mb-3">
                    {`${GRADE_LABELS[grade]} (${grade})`}
                  </h3>
                  <div className="mb-3">
                    <VacancyBadge
                      grade={grade}
                      status={
                        grade === "N"
                          ? vacancy.n_vacancy
                          : grade === "K1"
                            ? vacancy.k1_vacancy
                            : grade === "K2"
                              ? vacancy.k2_vacancy
                              : vacancy.k3_vacancy
                      }
                      isStale={isStale}
                    />
                  </div>
                  {isStale && (
                    <p className="text-sm text-slate-500 mb-2">
                      數據更新超過 30 天，建議直接聯絡學校確認。
                    </p>
                  )}
                  {vacancy.application_deadline && dlStatus && dlStatus !== "past" && (
                    <p className="text-sm text-slate-600">
                      申請截止：{formatDateCN(vacancy.application_deadline)}
                    </p>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
          {vacancy.edb_published_date && (
            <p className="text-sm text-slate-500">
              最後更新：{formatDateCN(vacancy.edb_published_date)}
            </p>
          )}
        </div>
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
