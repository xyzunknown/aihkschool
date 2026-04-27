"use client";

import { useState, useMemo } from "react";
import { TimelineFilters } from "@/components/timeline/TimelineFilters";
import { TimelineList } from "@/components/timeline/TimelineList";
import type { SchoolEventItem } from "@/types/homepage";

interface TimelineClientProps {
  events: SchoolEventItem[];
}

export function TimelineClient({ events }: TimelineClientProps) {
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [selectedSchoolType, setSelectedSchoolType] = useState("all");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (selectedEventType !== "all" && event.event_type !== selectedEventType) {
        return false;
      }
      if (selectedSchoolType !== "all" && event.school_type !== selectedSchoolType) {
        return false;
      }
      return true;
    });
  }, [events, selectedEventType, selectedSchoolType]);

  const futureCount = filteredEvents.filter((e) => !e.is_past).length;

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50 border-b border-cream-200">
        <span className="leaf-decor leaf-decor-tl pointer-events-none" />
        <span className="leaf-decor leaf-decor-tr pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-ink-900 leading-tight">
            學校活動時間線
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink-700 max-w-xl">
            未來 90 天內的開放日、面試、簡介會及報名截止日期
            {futureCount > 0 && (
              <span className="ml-2 text-forest-700 font-semibold">
                · {futureCount} 個即將到來
              </span>
            )}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-5 md:px-8 py-10">
        <TimelineFilters
          selectedEventType={selectedEventType}
          selectedSchoolType={selectedSchoolType}
          onEventTypeChange={setSelectedEventType}
          onSchoolTypeChange={setSelectedSchoolType}
        />

        <TimelineList events={filteredEvents} />
      </div>
    </>
  );
}
