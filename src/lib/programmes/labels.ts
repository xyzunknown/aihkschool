import type { ProgrammeCategory, EnrolmentStatus } from "@/lib/db/programmes";

// ============================================================
// Programme labels (Traditional Chinese)
// ============================================================

export const PROGRAMME_CATEGORY_LABELS: Record<ProgrammeCategory, string> = {
  swimming: "游泳",
  music: "音樂",
  dance: "舞蹈",
  art: "美術",
  sport: "運動",
  parent_child: "親子",
  other: "其他",
};

export const PROGRAMME_CATEGORY_ORDER: ProgrammeCategory[] = [
  "swimming",
  "parent_child",
  "dance",
  "music",
  "art",
  "sport",
  "other",
];

export const PROGRAMME_DISTRICT_LABELS: Record<string, string> = {
  central_and_western: "中西區",
  eastern: "東區",
  southern: "南區",
  wan_chai: "灣仔區",
  kowloon_city: "九龍城區",
  kwun_tong: "觀塘區",
  sham_shui_po: "深水埗區",
  wong_tai_sin: "黃大仙區",
  yau_tsim_mong: "油尖旺區",
  islands: "離島區",
  kwai_tsing: "葵青區",
  north: "北區",
  sai_kung: "西貢區",
  sha_tin: "沙田區",
  tai_po: "大埔區",
  tsuen_wan: "荃灣區",
  tuen_mun: "屯門區",
  yuen_long: "元朗區",
};

export const ENROLMENT_STATUS_LABELS: Record<string, string> = {
  pre_open: "未開放報名",
  open: "可報名",
  closed: "已截止",
  full: "已滿額",
};

export const ENROLMENT_STATUS_COLORS: Record<string, string> = {
  pre_open: "bg-amber-50 text-amber-700",
  open: "bg-forest-50 text-forest-700",
  closed: "bg-cream-100 text-ink-500",
  full: "bg-red-50 text-red-700",
};

// ============================================================
// Formatting helpers
// ============================================================

export function formatProgrammeFee(feeHkd: number | null): {
  label: string;
  isFree: boolean;
} {
  if (feeHkd === 0) return { label: "免費", isFree: true };
  if (feeHkd === null || feeHkd === undefined) return { label: "費用待定", isFree: false };
  return { label: `HK$${Number(feeHkd).toLocaleString()}`, isFree: false };
}

export function formatEnrolmentTime(enrolmentOpenAt: string | null): string {
  if (!enrolmentOpenAt) return "時間待定";
  const d = new Date(enrolmentOpenAt);
  return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export function formatProgrammeDateRange(
  startDate: string | null,
  endDate: string | null,
): string {
  if (!startDate && !endDate) return "日期待定";
  const currentYear = new Date().getFullYear();
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  const shouldShowYear =
    !!(
      (start && start.getFullYear() !== currentYear) ||
      (end && end.getFullYear() !== currentYear) ||
      (start && end && start.getFullYear() !== end.getFullYear())
    );
  const fmt = (s: string) => {
    const d = new Date(s);
    if (shouldShowYear) {
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  };
  if (startDate && !endDate) return `${fmt(startDate)} 起`;
  if (!startDate && endDate) return `至 ${fmt(endDate)}`;
  if (startDate && endDate) {
    if (startDate === endDate) return fmt(startDate);
    return `${fmt(startDate)} - ${fmt(endDate)}`;
  }
  return "日期待定";
}

export function formatAgeRange(
  ageMin: number | null,
  ageMax: number | null,
): string | null {
  if (ageMin === null && ageMax === null) return null;
  const cappedMax = ageMax !== null && ageMax >= 99 ? 99 : ageMax;
  if (ageMin !== null && cappedMax !== null && ageMin === cappedMax) return `${ageMin}歲`;
  if (ageMin !== null && cappedMax !== null) {
    if (cappedMax >= 99) return `${ageMin}歲以上`;
    return `${ageMin}-${cappedMax}歲`;
  }
  if (ageMin !== null) return `${ageMin}歲以上`;
  if (cappedMax !== null) return `${cappedMax}歲以下`;
  return null;
}

export function computeEnrolmentStatus(
  enrolmentOpenAt: string | null,
  enrolmentCloseAt: string | null,
  dbStatus: EnrolmentStatus | null,
): EnrolmentStatus {
  const now = new Date();
  const openAt = enrolmentOpenAt ? new Date(enrolmentOpenAt) : null;
  const closeAt = enrolmentCloseAt ? new Date(enrolmentCloseAt) : null;

  if (openAt && openAt > now) return "pre_open";
  if (closeAt && closeAt <= now) return "closed";
  if (openAt && openAt <= now) return "open";

  return dbStatus || "pre_open";
}

export function getEnrolmentCountdown(enrolmentOpenAt: string | null): string | null {
  if (!enrolmentOpenAt) return null;
  const openAt = new Date(enrolmentOpenAt);
  const now = new Date();
  const diff = openAt.getTime() - now.getTime();

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 7) return `${days} 天後開放`;
  if (days > 0) return `${days} 天 ${hours} 小時後開放`;
  if (hours > 0) {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} 小時 ${minutes} 分鐘後開放`;
  }
  const minutes = Math.floor(diff / (1000 * 60));
  return `${minutes} 分鐘後開放`;
}
