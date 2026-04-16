"use client";

import { downloadICS } from "@/lib/activities/calendar";
import type { Activity } from "@/lib/db/activities";

interface AddToCalendarButtonProps {
  activity: Activity;
}

export function AddToCalendarButton({ activity }: AddToCalendarButtonProps) {
  return (
    <button
      onClick={() => downloadICS(activity)}
      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-medium text-slate-900 transition-transform hover:scale-[1.02]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="12" y1="14" x2="12" y2="20" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
      加入日曆
    </button>
  );
}
