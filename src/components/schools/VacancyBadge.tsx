import type { VacancyStatus } from "@/types/database";
import { VACANCY_STATUS_LABELS } from "@/lib/utils";

interface VacancyBadgeProps {
  grade: string;
  status: VacancyStatus;
  isStale?: boolean;
}

export function VacancyBadge({ grade, status, isStale = false }: VacancyBadgeProps) {
  if (isStale) {
    return (
      <span className="inline-flex items-center px-3.5 py-1.5 rounded-pill text-xs font-semibold bg-slate-100/80 text-slate-500 border border-slate-200/30">
        {grade} 请查官网
      </span>
    );
  }

  const styles: Record<VacancyStatus, string> = {
    has_vacancy: "bg-green-100/80 text-green-800 border-green-300/30",
    no_vacancy: "bg-red-100/80 text-red-800 border-red-300/30",
    not_offered: "bg-slate-100/80 text-slate-500 border-slate-200/30",
    check_school: "bg-slate-100/80 text-slate-500 border-slate-200/30",
  };

  return (
    <span
      className={`inline-flex items-center px-3.5 py-1.5 rounded-pill text-xs font-semibold border ${styles[status]}`}
    >
      {grade} {VACANCY_STATUS_LABELS[status]}
    </span>
  );
}
