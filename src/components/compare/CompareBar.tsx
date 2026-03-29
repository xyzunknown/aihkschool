"use client";

import Link from "next/link";
import type { CompareItem } from "@/lib/hooks/useCompare";

interface CompareBarProps {
  items: CompareItem[];
  compareUrl: string | null;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CompareBar({ items, compareUrl, onRemove, onClear }: CompareBarProps) {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg px-5 py-3 animate-slide-up">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        {/* Selected school avatars */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center gap-1.5 bg-slate-100 rounded-full pl-2 pr-1 py-1"
            >
              <span className="text-xs font-medium text-slate-700 truncate max-w-[100px]">
                {item.nameTc}
              </span>
              <button
                onClick={() => onRemove(item.id)}
                className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={`移除 ${item.nameTc}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
          {items.length < 3 && (
            <span className="text-xs text-slate-400 flex-shrink-0">
              {items.length < 2 ? "再選 1 所可對比" : "+ 可加 1 所"}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            清除
          </button>
          {compareUrl ? (
            <Link
              href={compareUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-950 text-white rounded-xl text-sm font-medium hover:scale-[1.02] transition-transform"
            >
              對比（{items.length}）
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-300 text-white rounded-xl text-sm font-medium cursor-not-allowed"
            >
              對比（{items.length}）
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
