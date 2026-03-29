import Link from "next/link";
import { SCHOOL_TYPE_LABELS } from "@/lib/utils";
import type { SchoolEventItem, EventType } from "@/types/homepage";

const EVENT_PILL_STYLES: Record<EventType, string> = {
  open_day: "bg-emerald-50 text-emerald-700",
  interview: "bg-amber-50 text-amber-700",
  briefing: "bg-sky-50 text-sky-700",
  deadline: "bg-red-50 text-red-700",
  trial: "bg-violet-50 text-violet-700",
  talk: "bg-slate-100 text-slate-500",
};

const SCHOOL_TYPE_PILL_STYLES: Record<string, string> = {
  non_profit: "bg-emerald-50 text-emerald-700",
  private_independent: "bg-amber-50 text-amber-700",
  international: "bg-violet-50 text-violet-700",
};

function EventCard({ event }: { event: SchoolEventItem }) {
  const pillStyle = event.is_past
    ? "bg-slate-100 text-slate-400"
    : EVENT_PILL_STYLES[event.event_type];

  return (
    <div
      className={`min-w-[220px] snap-start flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-5 ${
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
          className={`ml-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${SCHOOL_TYPE_PILL_STYLES[event.school_type] ?? "bg-slate-100 text-slate-500"}`}
        >
          {SCHOOL_TYPE_LABELS[event.school_type] ?? event.school_type}
        </span>
      )}
      <Link
        href={event.detail_href}
        className="mt-3 block text-sm font-semibold text-slate-950 leading-snug line-clamp-2 hover:underline"
      >
        {event.school_name}
      </Link>
      <p className="mt-1 text-xs text-slate-500">{event.date}</p>
      <Link
        href={event.href}
        target="_blank"
        rel="noreferrer"
        className="mt-3 block text-xs font-medium text-slate-400 transition-colors hover:text-slate-700"
      >
        查看 →
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
        <h2 className="text-xl font-semibold text-slate-950">近期家長必知</h2>
        <Link
          href="/timeline"
          className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          查看完整時間線 →
        </Link>
      </div>

      {hasEvents ? (
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 hide-scrollbar">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-sm text-slate-500">目前暫無近期學校活動資訊</p>
        </div>
      )}
    </section>
  );
}
