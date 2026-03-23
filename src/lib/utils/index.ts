import type { District } from "@/types/database";

export const DISTRICT_LABELS: Record<District, string> = {
  central_and_western: "中西区",
  eastern: "东区",
  southern: "南区",
  wan_chai: "湾仔区",
  kowloon_city: "九龙城区",
  kwun_tong: "观塘区",
  sham_shui_po: "深水埗区",
  wong_tai_sin: "黄大仙区",
  yau_tsim_mong: "油尖旺区",
  islands: "离岛区",
  kwai_tsing: "葵青区",
  north: "北区",
  sai_kung: "西贡区",
  sha_tin: "沙田区",
  tai_po: "大埔区",
  tsuen_wan: "荃湾区",
  tuen_mun: "屯门区",
  yuen_long: "元朗区",
};

export const SCHOOL_TYPE_LABELS: Record<string, string> = {
  non_profit: "非牟利",
  private_independent: "私立独立",
  international: "国际",
};

export const VACANCY_STATUS_LABELS: Record<string, string> = {
  has_vacancy: "有空缺",
  no_vacancy: "已满",
  not_offered: "不开设",
  check_school: "请查官网",
};

export const INTERVIEW_TYPE_LABELS: Record<string, string> = {
  parent_child: "亲子面试",
  child_only: "幼儿面试",
  none: "无面试",
  unknown: "未知",
};

export const APPLICATION_RESULT_LABELS: Record<string, string> = {
  accepted: "录取",
  waitlisted: "候补",
  rejected: "未录取",
  pending: "等待中",
};

export const MAX_FAVORITES = 10;
export const REMINDER_DAYS = [7, 3, 1] as const;
export const DEFAULT_PAGE_LIMIT = 20;
export const MAX_PAGE_LIMIT = 100;
export const NOTES_MAX_LENGTH = 500;

/**
 * 判断空缺数据是否过期（>30天）
 */
export function isVacancyStale(edbPublishedDate: string | null): boolean {
  if (!edbPublishedDate) return true;
  const published = new Date(edbPublishedDate);
  const now = new Date();
  const diffDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > 30;
}

/**
 * 计算距离截止日期还有多少天
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
 * 截止日期状态：safe(>14), warn(7-14), urgent(<7), past(<0)
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
 * 格式化日期为中文
 */
export function formatDateCN(dateStr: string | null): string {
  if (!dateStr) return "暂无";
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}
