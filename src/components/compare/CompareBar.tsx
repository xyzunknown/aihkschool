"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompare } from "@/lib/hooks/useCompare";

export function CompareBar() {
  const pathname = usePathname();
  const { compareItems: items, compareUrl, maxCompare, removeFromCompare, clearCompare } = useCompare();
  const isSchoolDetail = /^\/kg\/[^/]+/.test(pathname ?? "");

  if (items.length === 0 || isSchoolDetail) return null;

  return (
    <aside
      className="fixed inset-x-3 bottom-[82px] z-[55] animate-slide-up sm:inset-x-6 lg:bottom-6"
      aria-label="已選學校比較"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-card border border-surface-border bg-white/96 p-3 shadow-dock  md:flex-row md:items-center md:gap-4 md:rounded-full md:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-forest-700 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6.5 5.75h2.4c.55 0 1 .45 1 1v10.5c0 .55-.45 1-1 1H6.5c-.55 0-1-.45-1-1V6.75c0-.55.45-1 1-1Z" />
              <path d="M15.1 5.75h2.4c.55 0 1 .45 1 1v10.5c0 .55-.45 1-1 1h-2.4c-.55 0-1-.45-1-1V6.75c0-.55.45-1 1-1Z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight text-ink-900">我的比較</p>
            <p className="text-xs font-medium text-ink-500">
              已選 {items.length} / {maxCompare} 所
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto hide-scrollbar">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex min-w-0 flex-none items-center gap-1.5 rounded-full border border-forest-100 bg-forest-50 py-1 pl-3 pr-1"
            >
              <span className="max-w-[128px] truncate text-xs font-semibold text-forest-700">
                {item.nameTc}
              </span>
              <button
                type="button"
                onClick={() => removeFromCompare(item.id)}
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-forest-100 hover:text-forest-700"
                aria-label={`移除 ${item.nameTc}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
          {items.length < 3 && (
            <span className="flex-shrink-0 text-xs font-medium text-ink-400">
              {items.length < 2 ? "再選 1 所可對比" : "+ 可加 1 所"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-[auto_1fr] items-center gap-2 md:flex md:flex-shrink-0">
          <button
            type="button"
            onClick={clearCompare}
            className="h-10 rounded-full px-3 text-xs font-semibold text-ink-500 transition-colors hover:bg-surface-soft hover:text-forest-700"
          >
            清除
          </button>
          {compareUrl ? (
            <Link
              href={compareUrl}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-forest-700 px-5 text-sm font-bold text-white shadow-soft transition hover:bg-forest-900"
            >
              對比（{items.length}）
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex h-10 cursor-not-allowed items-center justify-center gap-1.5 rounded-full bg-forest-700 px-5 text-sm font-bold text-white opacity-50"
            >
              對比（{items.length}）
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
