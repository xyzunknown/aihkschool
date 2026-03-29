import { normalizeVacancyStatus } from "@/lib/utils";
import type { VacancyStatus } from "@/types/database";

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  open: "正在招生",
  year_round: "全年接受申請",
  closed: "本輪未開放",
  website: "請查看官網",
  unknown: "暫未確認",
};

export const APPLICATION_STATUS_SHORT_LABELS: Record<string, string> = {
  open: "接受申請中",
  year_round: "全年接受申請",
  closed: "本輪未開放",
  website: "官網招生",
  unknown: "請查看官網",
};

type VacancySnapshot = {
  n_vacancy: VacancyStatus;
  k1_vacancy: VacancyStatus;
  k2_vacancy: VacancyStatus;
  k3_vacancy: VacancyStatus;
} | null;

type AdmissionSummaryInput = {
  schoolType?: string | null;
  applicationStatus?: string | null;
  applicationDetails?: string | null;
  applicationUrl?: string | null;
  vacancy?: VacancySnapshot;
};

export function getApplicationStatusLabel(
  status: string | null | undefined,
  variant: "full" | "short" = "full"
): string {
  if (!status) {
    return variant === "short" ? "請聯繫學校查詢" : "暫未確認";
  }

  const labels =
    variant === "short" ? APPLICATION_STATUS_SHORT_LABELS : APPLICATION_STATUS_LABELS;

  return labels[status] ?? status;
}

export function hasAdmissionInfo(input: {
  application_status?: string | null;
  application_details?: string | null;
  application_url?: string | null;
  open_day_details?: string | null;
  open_day_url?: string | null;
}): boolean {
  return Boolean(
    input.application_status ||
      input.application_details ||
      input.application_url ||
      input.open_day_details ||
      input.open_day_url
  );
}

export function hasReliableVacancy(vacancy: VacancySnapshot): boolean {
  if (!vacancy) return false;

  return [
    vacancy.n_vacancy,
    vacancy.k1_vacancy,
    vacancy.k2_vacancy,
    vacancy.k3_vacancy,
  ].some((status) => normalizeVacancyStatus(status) !== "no_information");
}

export function shouldShowAdmissionSummary(input: AdmissionSummaryInput): boolean {
  const isPrivateOrInternational =
    input.schoolType === "international" || input.schoolType === "private_independent";
  return isPrivateOrInternational && Boolean(input.applicationStatus || input.applicationDetails || input.applicationUrl);
}

export function getAdmissionSummary(input: AdmissionSummaryInput): string {
  if (input.applicationStatus) {
    return getApplicationStatusLabel(input.applicationStatus, "short");
  }

  if (input.applicationUrl || input.applicationDetails) {
    return "官網招生";
  }

  return "請聯繫學校查詢";
}
