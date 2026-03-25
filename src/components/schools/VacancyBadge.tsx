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
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
        {grade} 請查閱官網
      </span>
    );
  }

  const styles: Record<VacancyStatus, string> = {
    has_vacancy: "bg-emerald-50 text-emerald-700",
    no_vacancy: "bg-red-50 text-red-700",
    not_offered: "bg-slate-100 text-slate-500",
    check_school: "bg-slate-100 text-slate-500",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {grade} {VACANCY_STATUS_LABELS[status]}
    </span>
  );
}
