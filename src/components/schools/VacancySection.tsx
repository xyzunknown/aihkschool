import { VacancyBadge } from "@/components/schools/VacancyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDateCN } from "@/lib/utils";
import type { Vacancy } from "@/types/database";

interface VacancySectionProps {
  vacancy: Vacancy | null;
  isStale: boolean;
  deadlineStatus: "safe" | "warn" | "urgent" | "past" | null;
}

export function VacancySection({ vacancy, isStale, deadlineStatus: dlStatus }: VacancySectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-label text-slate-400 uppercase mb-4">学位空缺</h2>
      {vacancy ? (
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-900">
              {vacancy.academic_year} 学年
            </span>
            {vacancy.edb_published_date && (
              <span className="text-small text-slate-400">
                更新于 {formatDateCN(vacancy.edb_published_date)}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <VacancyBadge grade="N" status={vacancy.n_vacancy} isStale={isStale} />
            <VacancyBadge grade="K1" status={vacancy.k1_vacancy} isStale={isStale} />
            <VacancyBadge grade="K2" status={vacancy.k2_vacancy} isStale={isStale} />
            <VacancyBadge grade="K3" status={vacancy.k3_vacancy} isStale={isStale} />
          </div>
          {isStale && (
            <p className="mt-3 text-small text-slate-400">
              数据更新超过 30 天，建议直接联系学校确认。
            </p>
          )}
          {vacancy.application_deadline && dlStatus && dlStatus !== "past" && (
            <div className="mt-3 pt-3 border-t border-slate-200/20">
              <span className="text-sm text-slate-600">
                申请截止：{formatDateCN(vacancy.application_deadline)}
              </span>
            </div>
          )}
        </GlassCard>
      ) : (
        <GlassCard>
          <p className="text-body text-slate-400">暂无空缺数据，建议直接联系学校。</p>
        </GlassCard>
      )}
    </section>
  );
}
