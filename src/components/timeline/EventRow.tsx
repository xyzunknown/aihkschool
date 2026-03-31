"use client";

import Link from "next/link";
import { SCHOOL_TYPE_LABELS, DISTRICT_LABELS } from "@/lib/utils";
import type { SchoolEventItem, EventType } from "@/types/homepage";

const EVENT_ICONS: Record<EventType, string> = {
  open_day: "🏫",
  interview: "🎤",
  briefing: "📢",
  deadline: "📋",
  trial: "🎯",
  talk: "💬",
};

const EVENT_PILL_STYLES: Record<EventType, string> = {
  open_day: "bg-emerald-50 text-emerald-700",
  interview: "bg-amber-50 text-amber-700",
  briefing: "bg-sky-50 text-sky-700",
  deadline: "bg-red-50 text-red-700",
  trial: "bg-violet-50 text-violet-700",
  talk: "bg-slate-100 text-slate-600",
};

const SCHOOL_TYPE_PILL_STYLES: Record<string, string> = {
  non_profit: "bg-emerald-50 text-emerald-700",
  private_independent: "bg-amber-50 text-amber-700",
  international: "bg-violet-50 text-violet-700",
};

function CountdownBadge({ daysUntil, isPast }: { daysUntil: number; isPast?: boolean }) {
  if (isPast) {
    return <span className="text-xs text-slate-400">已結束</span>;
  }
  if (daysUntil === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
        <span className="w-2 h-2 rounded-full bg-red-500" />今天
      </span>
    );
  }
  if (daysUntil <= 7) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
        <span className="w-2 h-2 rounded-full bg-red-500" />還有 {daysUntil} 天
      </span>
    );
  }
  if (daysUntil <= 14) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
        <span className="w-2 h-2 rounded-full bg-amber-500" />還有 {daysUntil} 天
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
      <span className="w-2 h-2 rounded-full bg-emerald-500" />還有 {daysUntil} 天
    </span>
  );
}

interface EventRowProps {
  event: SchoolEventItem;
}

export function EventRow({ event }: EventRowProps) {
  const icon = EVENT_ICONS[event.event_type] || "📅";
  const pillStyle = event.is_past
    ? "bg-slate-100 text-slate-400"
    : EVENT_PILL_STYLES[event.event_type];
  const districtLabel = event.district
    ? DISTRICT_LABELS[event.district as keyof typeof DISTRICT_LABELS]
    : null;

  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-sm ${
        event.is_past ? "opacity-50" : ""
      }`}
    >
      {/* Left: Icon + Date */}
      <div className="flex-shrink-0 text-center w-12">
        <span className="text-2xl">{icon}</span>
      </div>

      {/* Middle: Details */}
      <div className="flex-1 min-w-0">
        {/* Event type + school type pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillStyle}`}>
            {event.is_past ? "已結束" : event.event_label}
          </span>
          {event.school_type && (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                SCHOOL_TYPE_PILL_STYLES[event.school_type] ?? "bg-slate-100 text-slate-500"
              }`}
            >
              {SCHOOL_TYPE_LABELS[event.school_type] ?? event.school_type}
            </span>
          )}
          {districtLabel && (
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-500">
              {districtLabel}
            </span>
          )}
        </div>

        {/* School name */}
        <Link
          href={event.detail_href}
          className="text-sm font-semibold text-slate-950 leading-snug line-clamp-2 hover:underline"
        >
          {event.school_name}
        </Link>

        {/* Date display */}
        <p className="mt-1 text-xs text-slate-500">{event.date}</p>

        {/* Link */}
        <Link
          href={event.href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center text-xs font-medium text-slate-400 transition-colors hover:text-slate-700"
        >
          查看詳情 →
        </Link>
      </div>

      {/* Right: Countdown */}
      <div className="flex-shrink-0 text-right">
        <CountdownBadge daysUntil={event.days_until ?? 0} isPast={event.is_past} />
      </div>
    </div>
  );
}
