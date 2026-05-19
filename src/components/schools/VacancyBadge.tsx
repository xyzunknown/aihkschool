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
      <div className="flex justify-center">
        <span
          aria-label={`${grade} ${VACANCY_STATUS_LABELS.no_information}`}
          className="inline-flex min-h-9 min-w-[78px] items-center justify-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-400 transition-colors duration-200"
        >
          <span className="text-[10px] font-bold text-slate-500">{grade}</span>
          <span>{VACANCY_STATUS_LABELS.no_information}</span>
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
    <div className="flex justify-center">
      <span
        aria-label={`${grade} ${VACANCY_STATUS_LABELS[normalizedStatus]}`}
        className={`inline-flex min-h-9 min-w-[78px] items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${styles[normalizedStatus]}`}
      >
        <span className="text-[10px] font-bold opacity-75">{grade}</span>
        {VACANCY_STATUS_LABELS[normalizedStatus]}
      </span>
    </div>
  );
}
