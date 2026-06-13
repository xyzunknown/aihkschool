"use client";

import { useMemo, useState } from "react";
import type { ProgrammeWithStatus } from "@/lib/db/programmes";
import { ProgrammeCourseCard } from "@/components/programmes/ProgrammeCard";

interface ProgrammesPreviewClientProps {
  programmes: ProgrammeWithStatus[];
}

interface ProgrammeCourseGroup {
  key: string;
  title: string;
  programmes: ProgrammeWithStatus[];
  representative: ProgrammeWithStatus;
}

function groupProgrammes(programmes: ProgrammeWithStatus[]): ProgrammeCourseGroup[] {
  const map = new Map<string, ProgrammeWithStatus[]>();

  for (const programme of programmes) {
    const title = programme.name_zh || programme.name_en || "未知課程";
    const key = [
      title,
      programme.category || "other",
      programme.fee_hkd ?? "fee_pending",
      programme.sessions_count ?? "sessions_pending",
      programme.age_min ?? "age_min_pending",
      programme.age_max ?? "age_max_pending",
    ].join("|");
    map.set(key, [...(map.get(key) ?? []), programme]);
  }

  return Array.from(map.entries()).map(([key, items]) => ({
    key,
    title: items[0].name_zh || items[0].name_en || "未知課程",
    programmes: items,
    representative: items[0],
  }));
}

export function ProgrammesPreviewClient({ programmes }: ProgrammesPreviewClientProps) {
  const groups = useMemo(() => groupProgrammes(programmes).slice(0, 2), [programmes]);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  return (
    <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-2">
      {groups.map((group) => (
        <ProgrammeCourseCard
          key={group.key}
          group={group}
          expanded={expandedGroups.has(group.key)}
          compactMobileImage
          onToggle={() => {
            setExpandedGroups((prev) => {
              const next = new Set(prev);
              if (next.has(group.key)) next.delete(group.key);
              else next.add(group.key);
              return next;
            });
          }}
        />
      ))}
    </div>
  );
}
