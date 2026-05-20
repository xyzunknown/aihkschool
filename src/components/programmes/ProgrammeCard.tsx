import Image from "next/image";
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
import { getProgrammeSceneImage } from "@/lib/media/activity-scenes";

interface ProgrammeCardProps {
  programme: ProgrammeWithStatus;
  priority?: boolean;
}

export function ProgrammeCard({ programme, priority = false }: ProgrammeCardProps) {
  const fee = formatProgrammeFee(programme.fee_hkd);
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const ageRange = formatAgeRange(programme.age_min, programme.age_max);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const countdown = getEnrolmentCountdown(programme.enrolment_open_at);
  const status = programme.lcsd_programme_status;
  const enrolmentStatus = status?.enrolment_status || "pre_open";
  const sceneImage = getProgrammeSceneImage(programme);

  return (
    <Link href={`/programmes/${programme.id}`} className="block h-full">
      <div className="flex h-full gap-4 overflow-hidden rounded-card border border-cream-200 bg-white p-4 shadow-soft transition hover:shadow-card">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-cream-100 sm:h-28 sm:w-28">
          <Image
            src={sceneImage}
            alt=""
            fill
            priority={priority}
            sizes="112px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-pill bg-leaf-50 px-2.5 py-1 text-[11px] font-semibold text-forest-700">
            {PROGRAMME_CATEGORY_LABELS[programme.category || "other"]}
          </span>
          <span
            className={`inline-flex items-center rounded-pill px-2.5 py-1 text-[11px] font-semibold ${
              ENROLMENT_STATUS_COLORS[enrolmentStatus]
            }`}
          >
            {ENROLMENT_STATUS_LABELS[enrolmentStatus]}
          </span>
        </div>

        <h3 className="mb-1 text-base font-semibold leading-snug text-ink-900 line-clamp-2">
          {programme.name_zh || programme.name_en || "未知課程"}
        </h3>

        <div className="mb-2 flex items-center gap-2">
          {fee.isFree ? (
            <span className="inline-flex items-center rounded-pill bg-leaf-100 px-2.5 py-1 text-[11px] font-bold text-forest-700">
              免費
            </span>
          ) : (
            <span className="text-sm font-semibold text-forest-700">{fee.label}</span>
          )}
          {programme.sessions_count && (
            <span className="text-xs text-ink-500">
              有{programme.sessions_count}堂
            </span>
          )}
        </div>

        <div className="mt-auto space-y-1 text-sm text-ink-700">
          {/* 報名時間 */}
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-forest-500">
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-rust-500">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="text-rust-600 font-medium text-xs">{countdown}</span>
            </div>
          )}

          {/* 場地 */}
          {programme.venue && (
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-forest-500">
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-forest-500">
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-forest-500">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>適合 {ageRange}</span>
            </div>
          )}
        </div>
        </div>
      </div>
    </Link>
  );
}

export function ProgrammeCardSkeleton() {
  return (
    <div className="h-36 animate-pulse rounded-card border border-cream-200 bg-cream-100" />
  );
}
