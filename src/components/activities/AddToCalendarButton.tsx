"use client";

import { downloadICS } from "@/lib/activities/calendar";
import type { Activity } from "@/lib/db/activities";
import { CalendarPlus } from "lucide-react";

interface AddToCalendarButtonProps {
  activity: Activity;
}

export function AddToCalendarButton({ activity }: AddToCalendarButtonProps) {
  return (
    <button
      onClick={() => downloadICS(activity)}
      className="inline-flex min-h-12 items-center justify-center rounded-button border border-forest-200 bg-white px-6 text-base font-semibold text-ink-900 transition hover:border-forest-400 hover:bg-forest-50"
    >
      <CalendarPlus aria-hidden="true" size={17} strokeWidth={2} className="mr-2 text-forest-600" />
      加入日曆
    </button>
  );
}
