import Link from "next/link";
import type { ProgrammeWithStatus } from "@/lib/db/programmes";
import {
  PROGRAMME_CATEGORY_LABELS,
  PROGRAMME_DISTRICT_LABELS,
  ENROLMENT_STATUS_LABELS,
  ENROLMENT_STATUS_COLORS,
  formatProgrammeFee,
  formatEnrolmentTime,
  formatProgrammeDateRange,
  formatAgeRange,
  getEnrolmentCountdown,
} from "@/lib/programmes/labels";

interface ProgrammeCardProps {
  programme: ProgrammeWithStatus;
}

export function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const fee = formatProgrammeFee(programme.fee_hkd);
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const ageRange = formatAgeRange(programme.age_min, programme.age_max);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const countdown = getEnrolmentCountdown(programme.enrolment_open_at);
  const status = programme.lcsd_programme_status;
  const enrolmentStatus = status?.enrolment_status || "pre_open";

  return (
    <Link href={`/programmes/${programme.id}`} className="block h-full">
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow duration-200 hover:shadow-sm">
        {/* 類別 + 狀態 */}
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {PROGRAMME_CATEGORY_LABELS[programme.category || "other"]}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              ENROLMENT_STATUS_COLORS[enrolmentStatus]
            }`}
          >
            {ENROLMENT_STATUS_LABELS[enrolmentStatus]}
          </span>
        </div>

        {/* 標題 */}
        <h3 className="mb-2 text-lg font-semibold leading-snug text-slate-900 line-clamp-2">
          {programme.name_zh || programme.name_en || "未知課程"}
        </h3>

        {/* 費用 */}
        <div className="mb-3">
          {fee.isFree ? (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              免費
            </span>
          ) : (
            <span className="text-sm font-medium text-slate-600">{fee.label}</span>
          )}
          {programme.sessions_count && (
            <span className="ml-2 text-xs text-slate-400">
              共{programme.sessions_count}堂
            </span>
          )}
        </div>

        {/* 信息條 */}
        <div className="mt-auto space-y-1.5 text-sm text-slate-600">
          {/* 報名時間 */}
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-slate-400">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="truncate">
              報名：{enrolmentTime}
            </span>
          </div>

          {/* 倒計時 */}
          {countdown && (
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-amber-500">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="text-amber-600 font-medium text-xs">{countdown}</span>
            </div>
          )}

          {/* 場地 */}
          {programme.venue && (
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-slate-400">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="truncate">
                {programme.venue}
                {programme.district && ` · ${PROGRAMME_DISTRICT_LABELS[programme.district] || ""}`}
              </span>
            </div>
          )}

          {/* 課程日期 */}
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-slate-400">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="truncate">{dateRange}</span>
          </div>

          {/* 年齡 */}
          {ageRange && (
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-slate-400">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>適合 {ageRange}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProgrammeCardSkeleton() {
  return (
    <div className="h-60 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
  );
}
