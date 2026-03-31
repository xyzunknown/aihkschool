"use client";

import type { EventType } from "@/types/homepage";

const EVENT_TYPE_OPTIONS: Array<{ value: EventType | "all"; label: string }> = [
  { value: "all", label: "全部" },
  { value: "open_day", label: "開放日" },
  { value: "interview", label: "面試" },
  { value: "briefing", label: "簡介會" },
  { value: "deadline", label: "報名截止" },
  { value: "trial", label: "試堂" },
  { value: "talk", label: "座談" },
];

const SCHOOL_TYPE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "全部" },
  { value: "non_profit", label: "非牟利" },
  { value: "private_independent", label: "私立獨立" },
  { value: "international", label: "國際" },
];

interface TimelineFiltersProps {
  selectedEventType: string;
  selectedSchoolType: string;
  onEventTypeChange: (value: string) => void;
  onSchoolTypeChange: (value: string) => void;
}

export function TimelineFilters({
  selectedEventType,
  selectedSchoolType,
  onEventTypeChange,
  onSchoolTypeChange,
}: TimelineFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Event type filter */}
      <div className="flex flex-wrap gap-1.5">
        {EVENT_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onEventTypeChange(opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedEventType === opt.value
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px bg-slate-200 self-stretch" />

      {/* School type filter */}
      <div className="flex flex-wrap gap-1.5">
        {SCHOOL_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSchoolTypeChange(opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedSchoolType === opt.value
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
