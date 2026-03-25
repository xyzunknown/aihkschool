"use client";

import { useRouter } from "next/navigation";
import { VacancyBadge } from "./VacancyBadge";
import { SchoolAvatar } from "./SchoolAvatar";
import { DISTRICT_LABELS, formatEnglishSchoolName, isVacancyStale, timeAgo } from "@/lib/utils";
import type { VacancyStatus } from "@/types/database";

interface SchoolCardProps {
  id: string;
  nameTc: string;
  nameEn?: string;
  logoUrl?: string | null;
  district: string;
  vacancy?: {
    k1_vacancy: VacancyStatus;
    k2_vacancy: VacancyStatus;
    k3_vacancy: VacancyStatus;
    edb_published_date: string | null;
  } | null;
}

export function SchoolCard({
  id,
  nameTc,
  nameEn,
  logoUrl,
  district,
  vacancy,
}: SchoolCardProps) {
  const router = useRouter();
  const stale = vacancy ? isVacancyStale(vacancy.edb_published_date) : true;
  const hasChineseName = /[\u3400-\u9fff]/.test(nameTc);
  const displayNameEn = formatEnglishSchoolName(nameEn?.trim() || nameTc);
  const primaryName = hasChineseName ? nameTc : displayNameEn;
  const secondaryName = hasChineseName && displayNameEn !== nameTc ? displayNameEn : null;

  return (
    <div
      className="relative bg-white rounded-2xl border border-slate-200 p-6 cursor-pointer hover:shadow-sm transition-shadow duration-200"
      onClick={() => router.push(`/kg/${id}`)}
    >
      {/* Avatar and badges row */}
      <div className="flex items-start justify-between mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <SchoolAvatar schoolId={id} schoolName={primaryName} logoUrl={logoUrl} />
        </div>

        {/* Badges - stacked top-right */}
        {vacancy && (
          <div className="flex flex-col gap-2">
            <VacancyBadge grade="K1" status={vacancy.k1_vacancy} isStale={stale} />
            <VacancyBadge grade="K2" status={vacancy.k2_vacancy} isStale={stale} />
            <VacancyBadge grade="K3" status={vacancy.k3_vacancy} isStale={stale} />
          </div>
        )}
      </div>

      {/* School name (Traditional Chinese) */}
      <h3 className="text-lg font-semibold text-slate-950 mb-1">{primaryName}</h3>

      {/* School name (English) if available */}
      {secondaryName && <p className="text-sm text-slate-500 mb-3">{secondaryName}</p>}

      {/* District */}
      <div className="flex items-center gap-1 text-sm text-slate-700 mb-4">
        <span>📍</span>
        <span>{DISTRICT_LABELS[district as keyof typeof DISTRICT_LABELS] ?? district}</span>
      </div>

      {/* Footer - time and link */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-xs text-slate-500">
        <span>{timeAgo(vacancy?.edb_published_date ?? null)}</span>
        <span className="text-slate-600">查看詳情 →</span>
      </div>
    </div>
  );
}
