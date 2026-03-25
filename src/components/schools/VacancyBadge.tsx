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
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
        {grade} {VACANCY_STATUS_LABELS.no_information}
      </span>
    );
  }

  const normalizedStatus = normalizeVacancyStatus(status);

  const styles = {
    has_vacancy: "bg-emerald-50 text-emerald-700",
    no_vacancy: "bg-red-50 text-red-700",
    waiting_list: "bg-amber-50 text-amber-700",
    no_information: "bg-slate-100 text-slate-500",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[normalizedStatus]}`}>
      {grade} {VACANCY_STATUS_LABELS[normalizedStatus]}
    </span>
  );
}
