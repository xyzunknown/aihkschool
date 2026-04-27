"use client";

import Image from "next/image";
import Link from "next/link";
import { SCHOOL_TYPE_LABELS, DISTRICT_LABELS } from "@/lib/utils";
import type { SchoolEventItem, EventType } from "@/types/homepage";

const EVENT_IMAGE: Record<EventType, string | null> = {
  open_day: "/brand/timeline/school.png",
  interview: "/brand/timeline/microphone.png",
  briefing: null,
  deadline: "/brand/timeline/calendar.png",
  trial: null,
  talk: null,
};

const EVENT_ICONS: Record<EventType, string> = {
  open_day: "🏫",
  interview: "🎤",
  briefing: "📢",
  deadline: "📋",
  trial: "🎯",
  talk: "💬",
};

const EVENT_PILL_STYLES: Record<EventType, string> = {
  open_day: "bg-leaf-100 text-forest-700",
  interview: "bg-sand-100 text-sand-700",
  briefing: "bg-leaf-50 text-forest-600",
  deadline: "bg-rust-500/10 text-rust-600",
  trial: "bg-sand-50 text-sand-600",
  talk: "bg-cream-200 text-ink-700",
};

const SCHOOL_TYPE_PILL_STYLES: Record<string, string> = {
  non_profit: "bg-leaf-100 text-forest-700",
  private_independent: "bg-sand-100 text-sand-700",
  international: "bg-rust-500/10 text-rust-600",
};

function CountdownBadge({ daysUntil, isPast }: { daysUntil: number; isPast?: boolean }) {
  if (isPast) {
    return <span className="text-xs text-ink-400">已結束</span>;
  }
  if (daysUntil === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rust-600">
        <span className="w-2 h-2 rounded-full bg-rust-500" />今天
      </span>
    );
  }
  if (daysUntil <= 7) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rust-600">
        <span className="w-2 h-2 rounded-full bg-rust-500" />還有 {daysUntil} 天
      </span>
    );
  }
  if (daysUntil <= 14) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-sand-700">
        <span className="w-2 h-2 rounded-full bg-sand-200" />還有 {daysUntil} 天
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-forest-600">
      <span className="w-2 h-2 rounded-full bg-forest-500" />還有 {daysUntil} 天
    </span>
  );
}

interface EventRowProps {
  event: SchoolEventItem;
}

export function EventRow({ event }: EventRowProps) {
  const icon = EVENT_ICONS[event.event_type] || "📅";
  const pillStyle = event.is_past
    ? "bg-cream-200 text-ink-400"
    : EVENT_PILL_STYLES[event.event_type];
  const districtLabel = event.district
    ? DISTRICT_LABELS[event.district as keyof typeof DISTRICT_LABELS]
    : null;

  return (
    <div
      className={`flex items-start gap-4 rounded-card border border-cream-200 bg-white p-5 shadow-soft transition hover:shadow-card ${
        event.is_past ? "opacity-60" : ""
      }`}
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-leaf-50 flex items-center justify-center overflow-hidden">
        {EVENT_IMAGE[event.event_type] ? (
          <Image
            src={EVENT_IMAGE[event.event_type] as string}
            alt=""
            width={64}
            height={64}
            className="w-12 h-12 object-contain"
          />
        ) : (
          <span className="text-2xl">{icon}</span>
        )}
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
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-cream-200 text-ink-700">
              {districtLabel}
            </span>
          )}
        </div>

        <Link
          href={event.detail_href}
          className="text-base font-semibold text-ink-900 leading-snug line-clamp-2 hover:text-forest-700"
        >
          {event.school_name}
        </Link>

        <p className="mt-1 text-xs text-ink-500">{event.date} {event.event_label}</p>

        <Link
          href={event.href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center text-xs font-medium text-forest-600 transition hover:text-forest-700"
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
