"use client";

import type { School } from "@/types/database";

interface DetailBottomCTAProps {
  school: School;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  isInCompare?: boolean;
  onToggleCompare?: () => void;
}

export function DetailBottomCTA({ school, isFavorited, onToggleFavorite, isInCompare = false, onToggleCompare }: DetailBottomCTAProps) {
  const getAcademicYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 1-indexed
    // ≥ 9 月 → 下学年 (year+1)/(year+2)；否则 → 当年/(year+1)
    const startYear = month >= 9 ? year + 1 : year;
    return `${startYear}/${String(startYear + 1).slice(-2)}`;
  };

  const getApplyButtonText = () => {
    return `申請 ${getAcademicYear()} 入學`;
  };

  const buttonBase =
    "inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02]";

  const primaryButtonClass =
    "bg-slate-950 text-white";
  const secondaryButtonClass =
    "bg-white text-slate-900 border border-slate-200";

  const getPrimaryAction = () => {
    if (school.website) {
      return (
        <a
          href={school.website}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBase} ${primaryButtonClass}`}
        >
          {getApplyButtonText()}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="ml-2"
          >
            <polyline points="5 12 19 12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      );
    }

    if (school.phone) {
      return (
        <a href={`tel:${school.phone}`} className={`${buttonBase} ${primaryButtonClass}`}>
          致電學校
        </a>
      );
    }

    return (
      <button type="button" className={`${buttonBase} ${primaryButtonClass} cursor-not-allowed opacity-50`} disabled>
        暫無聯絡方式
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-5 py-4 z-40">
      <div className="max-w-3xl mx-auto flex gap-3">
        {getPrimaryAction()}

        {onToggleCompare && (
          <button
            type="button"
            onClick={onToggleCompare}
            className={`${buttonBase} flex-none ${isInCompare ? primaryButtonClass : secondaryButtonClass}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="8" height="18" rx="1.5" fill={isInCompare ? "currentColor" : "none"} />
              <rect x="13" y="3" width="8" height="18" rx="1.5" fill={isInCompare ? "currentColor" : "none"} />
            </svg>
            {isInCompare ? "已加入對比" : "加入對比"}
          </button>
        )}

        <button
          type="button"
          onClick={onToggleFavorite}
          className={`${buttonBase} flex-none ${isFavorited ? primaryButtonClass : secondaryButtonClass}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorited ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {isFavorited ? "已收藏" : "收藏"}
        </button>
      </div>
    </div>
  );
}
