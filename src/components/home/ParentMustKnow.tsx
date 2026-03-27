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
  insights: InsightItem[];
}

export function ParentMustKnow({ events, insights }: ParentMustKnowProps) {
  const hasEvents = events.length > 0;

  return (
    <section className="mb-10">
      <h2 className="mb-6 text-xl font-semibold text-slate-950">近期家長必知</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left: horizontal scroll event cards */}
        <div className="md:col-span-2">
          {hasEvents ? (
            <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 hide-scrollbar">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center h-full flex items-center justify-center">
              <p className="text-sm text-slate-500">目前暫無近期學校活動資訊</p>
            </div>
          )}
        </div>

        {/* Right: parent insights dark card */}
        <div className="md:col-span-1 rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="mb-4 text-lg font-semibold">家長心得</h3>
          <div className="space-y-3">
            {insights.map((item) => (
              <Link key={item.id} href={item.href} className="block">
                <div className="border-b border-slate-700 pb-3 transition-opacity last:border-0 hover:opacity-80">
                  <p className="text-sm font-medium leading-snug">
                    &ldquo;{item.title}&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.author}
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
      </div>
    </section>
  );
}
