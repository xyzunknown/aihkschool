"use client";

import { Button } from "@/components/ui/Button";
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

  const getPrimaryAction = () => {
    if (school.website) {
      return (
        <a
          href={school.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="primary" className="w-full">
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
          </Button>
        </a>
      );
    }

    if (school.phone) {
      return (
        <a href={`tel:${school.phone}`} className="flex-1">
          <Button variant="primary" className="w-full">
            致電學校
          </Button>
        </a>
      );
    }

    return (
      <Button variant="primary" className="flex-1" disabled>
        暫無聯絡方式
      </Button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-5 py-4 z-40">
      <div className="max-w-3xl mx-auto flex gap-3">
        {getPrimaryAction()}

        {onToggleCompare && (
          <Button
            variant={isInCompare ? "primary" : "secondary"}
            onClick={onToggleCompare}
            className="flex-none"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="8" height="18" rx="1.5" fill={isInCompare ? "currentColor" : "none"} />
              <rect x="13" y="3" width="8" height="18" rx="1.5" fill={isInCompare ? "currentColor" : "none"} />
            </svg>
            {isInCompare ? "已加入對比" : "加入對比"}
          </Button>
        )}

        <Button
          variant={isFavorited ? "primary" : "secondary"}
          onClick={onToggleFavorite}
          className="flex-none"
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
        </Button>
      </div>
    </div>
  );
}
