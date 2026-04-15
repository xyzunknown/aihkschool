import Link from "next/link";
import type { Activity } from "@/lib/db/activities";
import {
  CATEGORY_LABELS,
  DISTRICT_LABELS,
  formatFee,
  formatDateRange,
  formatAgeRange,
  isExpired,
} from "@/lib/activities/labels";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const fee = formatFee(activity);
  const dateRange = formatDateRange(activity.start_date, activity.end_date);
  const ageRange = formatAgeRange(activity.age_min, activity.age_max);
  const expired = isExpired(activity.end_date);

  return (
    <Link href={`/activities/${activity.id}`} className="block h-full">
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow duration-200 hover:shadow-sm">
        {/* 類別 + 費用 */}
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {CATEGORY_LABELS[activity.category]}
          </span>
          {fee.isFree ? (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              免費
            </span>
          ) : (
            <span className="text-xs font-medium text-slate-500">
              {fee.label}
            </span>
          )}
        </div>

        {/* 標題 */}
        <h3 className="mb-2 text-lg font-semibold leading-snug text-slate-900 line-clamp-2">
          {activity.title}
        </h3>

        {/* 主辦機構 */}
        {activity.organizer && (
          <p className="mb-3 text-sm text-slate-500 line-clamp-1">
            {activity.organizer}
          </p>
        )}

        {/* 信息條 */}
        <div className="mt-auto space-y-1.5 text-sm text-slate-600">
          {activity.district && (
            <div className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 text-slate-400"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="truncate">
                {DISTRICT_LABELS[activity.district]}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 text-slate-400"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span
              className={`truncate ${expired ? "text-slate-400 line-through" : ""}`}
            >
              {dateRange}
            </span>
          </div>
          {ageRange && (
            <div className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 text-slate-400"
              >
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

export function ActivityCardSkeleton() {
  return (
    <div className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
  );
}
