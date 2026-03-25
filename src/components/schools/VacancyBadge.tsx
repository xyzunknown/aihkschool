import type { VacancyStatus } from "@/types/database";
import { normalizeVacancyStatus, VACANCY_STATUS_LABELS } from "@/lib/utils";

interface VacancyBadgeProps {
  grade: string;
  status: VacancyStatus;
  isStale?: boolean;
}

export function VacancyBadge({ grade, status, isStale = false }: VacancyBadgeProps) {
  if (isStale) {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-slate-400 font-medium">{grade}</span>
        <span className="inline-flex items-center justify-center min-w-[72px] px-4 py-1.5 rounded-full text-xs font-medium border border-slate-200 text-slate-400 bg-slate-50">
          {VACANCY_STATUS_LABELS.no_information}
        </span>
      </div>
    );
  }

  const normalizedStatus = normalizeVacancyStatus(status);

  const styles = {
    has_vacancy: "border-emerald-300 text-emerald-600 bg-emerald-50",
    no_vacancy: "border-red-300 text-red-600 bg-red-50",
    waiting_list: "border-amber-300 text-amber-600 bg-amber-50",
    no_information: "border-slate-200 text-slate-400 bg-slate-50",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-slate-400 font-medium">{grade}</span>
      <span className={`inline-flex items-center justify-center min-w-[72px] px-4 py-1.5 rounded-full text-xs font-medium border ${styles[normalizedStatus]}`}>
        {VACANCY_STATUS_LABELS[normalizedStatus]}
      </span>
    </div>
  );
}
