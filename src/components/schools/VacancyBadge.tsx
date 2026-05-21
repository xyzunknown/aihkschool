import type { VacancyStatus } from "@/types/database";
import { normalizeVacancyStatus, VACANCY_STATUS_LABELS } from "@/lib/utils";

interface VacancyBadgeProps {
  grade: string;
  status: VacancyStatus;
  isStale?: boolean;
}

export function VacancyBadge({ grade, status, isStale = false }: VacancyBadgeProps) {
  const normalizedStatus = normalizeVacancyStatus(status);
  const staleClass = isStale ? "opacity-85" : "";

  const styles = {
    has_vacancy: "border-status-available-bg text-status-available-fg bg-status-available-bg",
    no_vacancy: "border-status-full-bg text-status-full-fg bg-status-full-bg",
    waiting_list: "border-status-limited-bg text-status-limited-fg bg-status-limited-bg",
    no_information: "border-surface-border text-status-pending-fg bg-status-pending-bg",
  };

  return (
    <div className="flex justify-center">
      <span
        aria-label={`${grade} ${VACANCY_STATUS_LABELS[normalizedStatus]}`}
        className={`inline-flex min-h-9 min-w-[78px] items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${styles[normalizedStatus]} ${staleClass}`}
      >
        <span className="text-[10px] font-bold opacity-75">{grade}</span>
        {VACANCY_STATUS_LABELS[normalizedStatus]}
      </span>
    </div>
  );
}
