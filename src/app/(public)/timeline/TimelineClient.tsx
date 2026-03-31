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
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 mb-2">
          學校活動時間線
        </h1>
        <p className="text-slate-600">
          未來 90 天內的開放日、面試、簡介會及報名截止日期
          {futureCount > 0 && (
            <span className="ml-2 text-sm text-slate-700 font-medium">
              · {futureCount} 個即將到來
            </span>
          )}
        </p>
      </div>

      {/* Filters */}
      <TimelineFilters
        selectedEventType={selectedEventType}
        selectedSchoolType={selectedSchoolType}
        onEventTypeChange={setSelectedEventType}
        onSchoolTypeChange={setSelectedSchoolType}
      />

      {/* Event list */}
      <TimelineList events={filteredEvents} />
    </div>
  );
}
