import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { SCHOOL_TYPE_LABELS } from "@/lib/utils";
import type { SchoolEventItem, EventType } from "@/types/homepage";

const EVENT_PILL_STYLES: Record<EventType, string> = {
  open_day: "bg-forest-50 text-forest-700",
  interview: "bg-amber-50 text-amber-700",
  briefing: "bg-sky-50 text-sky-700",
  deadline: "bg-red-50 text-red-700",
  trial: "bg-violet-50 text-violet-700",
  talk: "bg-cream-100 text-ink-500",
};

const SCHOOL_TYPE_PILL_STYLES: Record<string, string> = {
  non_profit: "bg-forest-50 text-forest-700",
  private_independent: "bg-amber-50 text-amber-700",
  international: "bg-violet-50 text-violet-700",
};

function EventCard({ event }: { event: SchoolEventItem }) {
  const pillStyle = event.is_past
    ? "bg-cream-100 text-ink-500"
    : EVENT_PILL_STYLES[event.event_type];

  return (
    <div
      className={`min-w-[220px] snap-start flex-shrink-0 rounded-card border border-surface-border bg-white p-6 ${
        event.is_past ? "opacity-50" : ""
      }`}
    >
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillStyle}`}
      >
        {event.is_past ? "已結束" : event.event_label}
      </span>
      {event.school_type && (
        <span
          className={`ml-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${SCHOOL_TYPE_PILL_STYLES[event.school_type] ?? "bg-cream-100 text-ink-500"}`}
        >
          {SCHOOL_TYPE_LABELS[event.school_type] ?? event.school_type}
        </span>
      )}
      <Link
        href={event.detail_href}
        className="mt-3 block text-sm font-semibold text-ink-900 leading-snug line-clamp-2 hover:underline"
      >
        {event.school_name}
      </Link>
      <p className="mt-1 text-xs text-ink-500">{event.date}</p>
      <Link
        href={event.href}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-ink-500 transition-colors hover:text-ink-700"
      >
        查看
        <CaretRight size={13} weight="bold" aria-hidden="true" />
      </Link>
    </div>
  );
}

interface ParentMustKnowProps {
  events: SchoolEventItem[];
}

export function ParentMustKnow({ events }: ParentMustKnowProps) {
  const hasEvents = events.length > 0;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-ink-900">近期家長必知</h2>
        <Link
          href="/timeline"
          className="text-sm font-medium text-ink-500 hover:text-ink-700 transition-colors"
        >
          <span className="inline-flex items-center gap-1">
            查看完整時間線
            <CaretRight size={14} weight="bold" aria-hidden="true" />
          </span>
        </Link>
      </div>

      {hasEvents ? (
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 hide-scrollbar">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-card border border-surface-border bg-white p-6 text-center">
          <p className="text-sm text-ink-500">目前暫無近期學校活動資訊</p>
        </div>
      )}
    </section>
  );
}
