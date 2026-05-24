"use client";

import { SchoolActionIcon } from "@/components/ui/SchoolActionIcon";
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
    "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform ";

  const primaryButtonClass =
    "bg-forest-600 text-white shadow-soft hover:bg-forest-700";
  const secondaryButtonClass =
    "bg-surface-soft text-forest-700 border border-forest-200 hover:bg-forest-50";

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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-surface-border px-5 py-4 z-40 shadow-soft">
      <div className="max-w-3xl mx-auto flex gap-3">
        {getPrimaryAction()}

        {onToggleCompare && (
          <button
            type="button"
            onClick={onToggleCompare}
            className={`${buttonBase} flex-none ${isInCompare ? primaryButtonClass : secondaryButtonClass}`}
          >
            <SchoolActionIcon kind="compare" active={isInCompare} size="sm" />
            {isInCompare ? "已加入對比" : "加入對比"}
          </button>
        )}

        <button
          type="button"
          onClick={onToggleFavorite}
          className={`${buttonBase} flex-none ${isFavorited ? primaryButtonClass : secondaryButtonClass}`}
        >
          <SchoolActionIcon kind="favorite" active={isFavorited} size="sm" />
          {isFavorited ? "已收藏" : "收藏"}
        </button>
      </div>
    </div>
  );
}
