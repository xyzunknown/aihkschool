"use client";

import { SchoolActionIcon } from "@/components/ui/SchoolActionIcon";
import { DISTRICT_LABELS } from "@/lib/utils";

interface FavoriteCardProps {
  schoolId: string;
  nameTc: string;
  nameEn: string;
  district: string;
  reminderEnabled: boolean;
  daysUntilDeadline?: number;
  onNavigate: () => void;
  onToggleReminder: () => void;
  onUnfavorite: () => void;
}

export function FavoriteCard({
  nameTc, nameEn, district, reminderEnabled, daysUntilDeadline,
  onNavigate, onToggleReminder, onUnfavorite,
}: FavoriteCardProps) {
  return (
    <div className="bg-white rounded-card border border-surface-border p-6 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1 cursor-pointer" onClick={onNavigate}>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {DISTRICT_LABELS[district as keyof typeof DISTRICT_LABELS]}
          </p>
          <p className="text-base font-semibold text-slate-900 mt-0.5">{nameTc}</p>
          <p className="text-sm text-slate-500 mt-1">{nameEn}</p>
          {daysUntilDeadline !== undefined && daysUntilDeadline < 7 && (
            <p className={`text-sm font-medium mt-2 ${daysUntilDeadline >= 0 ? "text-status-full-fg" : "text-ink-400"}`}>
              {daysUntilDeadline >= 0 ? `截止日期：${daysUntilDeadline} 天` : "已逾期"}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-200">
        <button
          onClick={onToggleReminder}
          className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-all duration-200 ${
            reminderEnabled
              ? "border-brand-200 bg-brand-600 text-white shadow-soft"
              : "border-surface-border bg-surface-soft text-ink-500 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          }`}
        >
          <SchoolActionIcon kind="reminder" active={reminderEnabled} size="sm" />
          {reminderEnabled ? "提醒已開啟" : "開啟提醒"}
        </button>
        <button onClick={onUnfavorite} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-surface-border bg-surface-soft px-3 text-xs font-semibold text-ink-500 transition-colors duration-200 hover:border-status-full-fg/20 hover:bg-status-full-bg hover:text-status-full-fg">
          <SchoolActionIcon kind="favorite" size="sm" />
          取消收藏
        </button>
      </div>
    </div>
  );
}
