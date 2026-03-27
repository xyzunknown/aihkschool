import Link from "next/link";
import type { SchoolEventItem, InsightItem, EventType } from "@/types/homepage";

const EVENT_PILL_STYLES: Record<EventType, string> = {
  open_day: "bg-emerald-50 text-emerald-700",
  interview: "bg-amber-50 text-amber-700",
  briefing: "bg-sky-50 text-sky-700",
  deadline: "bg-red-50 text-red-700",
  trial: "bg-violet-50 text-violet-700",
  talk: "bg-slate-100 text-slate-500",
};

function EventCard({ event }: { event: SchoolEventItem }) {
  const pillStyle = event.is_past
    ? "bg-slate-100 text-slate-400"
    : EVENT_PILL_STYLES[event.event_type];

  return (
    <Link
      href={event.href}
      target="_blank"
      rel="noreferrer"
      className="snap-start flex-shrink-0 block"
    >
      <div
        className={`min-w-[220px] rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm ${
          event.is_past ? "opacity-50" : ""
        }`}
      >
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillStyle}`}
        >
          {event.is_past ? "已結束" : event.event_label}
        </span>
        <p className="mt-3 text-sm font-semibold text-slate-950 leading-snug line-clamp-2">
          {event.school_name}
        </p>
        <p className="mt-1 text-xs text-slate-500">{event.date}</p>
        <p className="mt-3 text-xs font-medium text-slate-400">
          查看 →
        </p>
      </div>
    </Link>
  );
}

interface ParentMustKnowProps {
  events: SchoolEventItem[];
  insights: InsightItem[];
}

export function ParentMustKnow({ events, insights }: ParentMustKnowProps) {
  const hasEvents = events.length > 0;

  return (
    <section className="mb-10">
      <h2 className="mb-6 text-xl font-semibold text-slate-950">近期家長必知</h2>

      {/* Horizontal scroll event cards */}
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

      {/* Parent insights dark card */}
      <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-white">
        <h3 className="mb-4 text-lg font-semibold">近期家長心得</h3>
        <div className="space-y-3">
          {insights.map((item) => (
            <Link key={item.id} href={item.href} className="block">
              <div className="border-b border-slate-700 pb-3 transition-opacity last:border-0 hover:opacity-80">
                <p className="text-sm font-medium leading-snug">
                  &ldquo;{item.title}&rdquo;
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {item.author} · {item.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/submit"
          className="mt-4 block text-center text-sm text-slate-400 transition-colors hover:text-white"
        >
          分享你的心得 →
        </Link>
      </div>
    </section>
  );
}
