import type {
  Activity,
  ActivityCategory,
  ActivityDistrict,
} from "@/lib/db/activities";

// ============================================================
// Activity labels (Traditional Chinese)
// ============================================================

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  music: "音樂",
  sports: "運動",
  art: "美術",
  dance: "舞蹈",
  stem: "科學",
  language: "語言",
  drama: "戲劇",
  other: "其他",
};

export const CATEGORY_ORDER: ActivityCategory[] = [
  "music",
  "sports",
  "art",
  "dance",
  "stem",
  "language",
  "drama",
  "other",
];

export const DISTRICT_LABELS: Record<ActivityDistrict, string> = {
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

export const DISTRICT_ORDER: ActivityDistrict[] = [
  "central_and_western",
  "eastern",
  "southern",
  "wan_chai",
  "kowloon_city",
  "kwun_tong",
  "sham_shui_po",
  "wong_tai_sin",
  "yau_tsim_mong",
  "sha_tin",
  "tsuen_wan",
  "kwai_tsing",
  "tai_po",
  "north",
  "sai_kung",
  "tuen_mun",
  "yuen_long",
  "islands",
];

// ============================================================
// Formatting helpers
// ============================================================

export function formatFee(activity: Pick<Activity, "fee" | "fee_note">): {
  label: string;
  isFree: boolean;
} {
  if (activity.fee === 0) return { label: "免費", isFree: true };
  if (activity.fee === null || activity.fee === undefined) {
    return { label: "費用待定", isFree: false };
  }
  return {
    label: `HK$${Number(activity.fee).toLocaleString()}${activity.fee_note ? ` · ${activity.fee_note}` : ""}`,
    isFree: false,
  };
}

export function formatDateRange(
  start: string | null,
  end: string | null,
): string {
  if (!start && !end) return "日期待定";
  const fmt = (s: string) => {
    const d = new Date(s);
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  };
  if (start && !end) return `${fmt(start)} 起`;
  if (!start && end) return `至 ${fmt(end)}`;
  if (start && end) {
    if (start === end) return fmt(start);
    return `${fmt(start)} - ${fmt(end)}`;
  }
  return "日期待定";
}

export function formatAgeRange(
  ageMin: number | null,
  ageMax: number | null,
): string | null {
  if (ageMin === null && ageMax === null) return null;
  if (ageMin !== null && ageMax !== null) return `${ageMin}-${ageMax}歲`;
  if (ageMin !== null) return `${ageMin}歲以上`;
  if (ageMax !== null) return `${ageMax}歲以下`;
  return null;
}

export function isExpired(endDate: string | null): boolean {
  if (!endDate) return false;
  return new Date(endDate).getTime() < Date.now();
}
