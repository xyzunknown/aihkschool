"use client";

import { Button } from "@/components/ui/Button";
import type { School } from "@/types/database";

interface DetailBottomCTAProps {
  school: School;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export function DetailBottomCTA({ school, isFavorited, onToggleFavorite }: DetailBottomCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/30 px-5 py-4 z-40">
      <div className="max-w-3xl mx-auto flex gap-3">
        {school.website ? (
          <a
            href={school.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="primary" className="w-full">
              前往官网申请
            </Button>
          </a>
        ) : school.phone ? (
          <a href={`tel:${school.phone}`} className="flex-1">
            <Button variant="primary" className="w-full">
              致电学校
            </Button>
          </a>
        ) : (
          <Button variant="primary" className="flex-1" disabled>
            暂无联系方式
          </Button>
        )}

        <Button
          variant={isFavorited ? "primary" : "secondary"}
          onClick={onToggleFavorite}
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
