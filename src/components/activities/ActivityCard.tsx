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
  const districtLabel = activity.district
    ? DISTRICT_LABELS[activity.district]
    : null;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow duration-200 hover:shadow-sm">
      {/* 類別 + 免費標籤 */}
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {CATEGORY_LABELS[activity.category]}
        </span>
        {fee.isFree ? (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            免費
          </span>
        ) : fee.shortLabel !== "費用待定" ? (
          <span className="text-xs font-medium text-slate-500">{fee.shortLabel}</span>
        ) : null}
      </div>

      {/* 標題 */}
      <h3 className="mb-1 text-lg font-semibold leading-snug text-slate-950 line-clamp-2">
        {activity.title}
      </h3>

      {/* 主辦機構 */}
      {activity.organizer && (
        <p className="mb-3 text-sm text-slate-500 line-clamp-1">
          {activity.organizer}
          {districtLabel && ` · ${districtLabel}`}
        </p>
      )}

      {/* 日期 + 已結束標籤 */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm text-slate-600">{dateRange}</span>
        {expired && (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
            已結束
          </span>
        )}
      </div>

      {/* 信息條 */}
      <div className="mt-auto space-y-1.5 text-sm text-slate-600">
        {/* 時間 */}
        {activity.schedule && (
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-slate-400">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="truncate">{activity.schedule}</span>
          </div>
        )}

        {/* 地點 */}
        {activity.address && (
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-slate-400">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{activity.address}</span>
          </div>
        )}

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

        {/* 聯繫 */}
        {activity.contact_phone && (
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-slate-400">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{activity.contact_phone}</span>
          </div>
        )}
      </div>

      {/* 報名連結 */}
      {activity.contact_url && !expired && (
        <a
          href={activity.contact_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          onClick={(e) => e.stopPropagation()}
        >
          查看詳情 / 報名
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      )}
    </div>
  );
}

export function ActivityCardSkeleton() {
  return (
    <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
  );
}
