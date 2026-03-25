"use client";

import { DISTRICT_LABELS } from "@/lib/utils";

interface FavoriteCardProps {
  schoolId: string;
  nameTc: string;
  district: string;
  reminderEnabled: boolean;
  daysUntilDeadline?: number;
  onNavigate: () => void;
  onToggleReminder: () => void;
  onUnfavorite: () => void;
}

export function FavoriteCard({
  nameTc, district, reminderEnabled, daysUntilDeadline,
  onNavigate, onToggleReminder, onUnfavorite,
}: FavoriteCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1 cursor-pointer" onClick={onNavigate}>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {DISTRICT_LABELS[district as keyof typeof DISTRICT_LABELS]}
          </p>
          <p className="text-base font-semibold text-slate-900 mt-0.5">{nameTc}</p>
          {daysUntilDeadline !== undefined && daysUntilDeadline < 7 && (
            <p className={`text-sm font-medium mt-2 ${daysUntilDeadline >= 0 ? "text-red-700" : "text-slate-400"}`}>
              {daysUntilDeadline >= 0 ? `截止日期：${daysUntilDeadline} 天` : "已逾期"}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-200">
        <button
          onClick={onToggleReminder}
          className={`text-xs font-medium flex items-center gap-1 ${
            reminderEnabled ? "text-emerald-700" : "text-slate-500"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {reminderEnabled ? "提醒已開啟" : "開啟提醒"}
        </button>
        <button onClick={onUnfavorite} className="text-xs text-red-600 hover:text-red-700">
          取消收藏
        </button>
      </div>
    </div>
  );
}
