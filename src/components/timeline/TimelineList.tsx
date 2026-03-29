"use client";

import { useMemo } from "react";
import { EventRow } from "./EventRow";
import type { SchoolEventItem } from "@/types/homepage";

interface TimelineListProps {
  events: SchoolEventItem[];
}

function getMonthKey(dateIso: string): string {
  const d = new Date(dateIso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthHeader(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  return `${year} 年 ${parseInt(month, 10)} 月`;
}

export function TimelineList({ events }: TimelineListProps) {
  const grouped = useMemo(() => {
    const groups = new Map<string, SchoolEventItem[]>();
    for (const event of events) {
      const key = getMonthKey(event.date_iso);
      const group = groups.get(key);
      if (group) {
        group.push(event);
      } else {
        groups.set(key, [event]);
      }
    }
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [events]);

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-semibold text-slate-950 mb-2">暫無活動</p>
        <p className="text-base text-slate-500">
          調整篩選條件或稍後再來查看
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {grouped.map(([monthKey, monthEvents]) => (
        <section key={monthKey}>
          {/* Month divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-slate-200" />
            <h3 className="text-sm font-semibold text-slate-500 whitespace-nowrap">
              {formatMonthHeader(monthKey)}
            </h3>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Events */}
          <div className="space-y-3">
            {monthEvents.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
