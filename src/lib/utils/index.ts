import type { District } from "@/types/database";

export const DISTRICT_LABELS: Record<District, string> = {
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

export const SCHOOL_TYPE_LABELS: Record<string, string> = {
  non_profit: "非牟利",
  private_independent: "私立獨立",
  international: "國際",
};

export const VACANCY_STATUS_LABELS: Record<string, string> = {
  has_vacancy: "尚有學額",
  no_vacancy: "名額已滿",
  not_offered: "未開放",
  check_school: "請查閱官網",
};

export const INTERVIEW_TYPE_LABELS: Record<string, string> = {
  parent_child: "親子面試",
  child_only: "幼兒面試",
  none: "無面試",
  unknown: "未知",
};

export const APPLICATION_RESULT_LABELS: Record<string, string> = {
  accepted: "錄取",
  waitlisted: "候補",
  rejected: "未錄取",
  pending: "等待中",
};

export const SESSION_TYPE_LABELS: Record<string, string> = {
  am: "上午班",
  pm: "下午班",
  whole_day: "全日班",
  am_pm: "上午及下午班",
  am_whole_day: "上午及全日班",
  pm_whole_day: "下午及全日班",
  am_pm_whole_day: "上午、下午及全日班",
};

export const LANGUAGE_OPTIONS: Record<string, string> = {
  chinese: "中文",
  english: "英文",
  bilingual: "雙語",
};

export const MAX_FAVORITES = 10;
export const REMINDER_DAYS = [7, 3, 1] as const;
export const DEFAULT_PAGE_LIMIT = 20;
export const MAX_PAGE_LIMIT = 100;
export const NOTES_MAX_LENGTH = 500;

/**
 * 根據 school_id 確定性地選擇頭像背景色
 */
const AVATAR_COLORS = [
  { bg: "bg-slate-200", text: "text-slate-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
] as const;

export function getAvatarColor(schoolId: string): { bg: string; text: string } {
  let hash = 0;
  for (let i = 0; i < schoolId.length; i++) {
    hash = ((hash << 5) - hash + schoolId.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

/**
 * 判斷空缺數據是否過期（>30天）
 */
export function isVacancyStale(edbPublishedDate: string | null): boolean {
  if (!edbPublishedDate) return true;
  const published = new Date(edbPublishedDate);
  const now = new Date();
  const diffDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > 30;
}

/**
 * 計算距離截止日期還有多少天
 */
export function daysUntilDeadline(deadline: string | null): number | null {
  if (!deadline) return null;
  const d = new Date(deadline);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * 截止日期狀態：safe(>14), warn(7-14), urgent(<7), past(<0)
 */
export function deadlineStatus(deadline: string | null): "safe" | "warn" | "urgent" | "past" | null {
  const days = daysUntilDeadline(deadline);
  if (days === null) return null;
  if (days < 0) return "past";
  if (days < 7) return "urgent";
  if (days <= 14) return "warn";
  return "safe";
}

/**
 * 格式化日期為中文
 */
export function formatDateCN(dateStr: string | null): string {
  if (!dateStr) return "暫無";
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

/**
 * 相對時間描述（粵語）
 */
export function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "暫無更新";
  const now = new Date();
  const d = new Date(dateStr);
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "剛剛更新";
  if (diffMins < 60) return `${diffMins}分鐘前更新`;
  if (diffHours < 24) return `${diffHours}小時前更新`;
  if (diffDays < 30) return `${diffDays}天前更新`;
  return formatDateCN(dateStr);
}
