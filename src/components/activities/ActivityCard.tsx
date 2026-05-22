"use client";

import Image from "next/image";
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
import {
  getActivitySceneImage,
} from "@/lib/media/activity-scenes";
import { getActivityRegistrationHref } from "@/lib/activities/links";

interface ActivityCardProps {
  activity: Activity;
  priority?: boolean;
}

export function ActivityCard({ activity, priority = false }: ActivityCardProps) {
  const fee = formatFee(activity);
  const dateRange = formatDateRange(activity.start_date, activity.end_date);
  const ageRange = formatAgeRange(activity.age_min, activity.age_max);
  const expired = isExpired(activity.end_date);
  const districtLabel = activity.district ? DISTRICT_LABELS[activity.district] : null;
  const organizer = getDisplayOrganizer(activity.organizer);
  const imageSrc = getActivitySceneImage(activity);
  const detailHref = `/activities/${activity.id}`;
  const registrationHref = getActivityRegistrationHref(activity);

  return (
    <article className="flex h-full min-h-[380px] flex-col overflow-hidden rounded-[24px] border border-[#E4ECE4] bg-white shadow-[0_8px_24px_rgba(30,82,56,0.055)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(30,82,56,0.09)]">
      <Link href={detailHref} className="flex flex-1 flex-col gap-5 p-5 md:flex-row md:items-start md:gap-6 md:p-6">
        <div className="relative h-[200px] w-full flex-shrink-0 overflow-hidden rounded-[18px] bg-[#F6F8F5] md:h-[220px] md:w-[160px] xl:h-[240px] xl:w-[180px]">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1279px) 160px, 180px"
            className="object-cover object-center"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex h-[34px] items-center justify-between gap-3">
            <span className="inline-flex h-[34px] items-center justify-center whitespace-nowrap rounded-pill bg-[#EAF4EA] px-3.5 text-[15px] font-bold text-[#246B45] ring-1 ring-forest-700/10">
              {CATEGORY_LABELS[activity.category]}
            </span>
            {expired ? (
              <span className="inline-flex h-[34px] shrink-0 items-center justify-center whitespace-nowrap rounded-pill bg-cream-200 px-3.5 text-[15px] font-bold text-ink-500">
                已結束
              </span>
            ) : fee.isFree ? (
              <span className="inline-flex h-[34px] shrink-0 items-center justify-center whitespace-nowrap rounded-pill bg-[#EAF4EA] px-3.5 text-[15px] font-bold text-[#246B45] ring-1 ring-forest-700/10">
                免費
              </span>
            ) : fee.shortLabel !== "費用待定" ? (
              <span className="inline-flex h-[34px] shrink-0 items-center justify-center whitespace-nowrap rounded-pill bg-[#FFF6E8] px-3.5 text-[15px] font-bold text-[#8A5A16] ring-1 ring-sand-700/10">
                {fee.shortLabel}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3.5 text-[20px] font-bold leading-[1.35] text-[#1F2A24] line-clamp-2 xl:text-[22px]">
            {activity.title}
          </h3>

          {(organizer || districtLabel) && (
            <p className="mt-2 text-base leading-6 text-[#6A746B] line-clamp-1">
              {[organizer, districtLabel].filter(Boolean).join(" · ")}
            </p>
          )}

          <p className="mt-2.5 text-[17px] font-medium leading-7 text-[#344238] xl:text-lg">{dateRange}</p>

          <div className="mt-1.5 space-y-1.5 text-[#5E6B63]">
            {activity.schedule && <Row icon="time">{activity.schedule}</Row>}
            {activity.address && <Row icon="pin">{activity.address}</Row>}
            {ageRange && <Row icon="user">適合 {ageRange}</Row>}
            {activity.contact_phone && <Row icon="phone">{activity.contact_phone}</Row>}
          </div>
        </div>
      </Link>

      <div className="mt-auto grid grid-cols-2 gap-3 border-t border-[#EEF1EA] px-5 py-4 md:px-6">
        <Link
          href={detailHref}
          className="inline-flex h-12 items-center justify-center rounded-pill border border-[#E8DCC6] bg-white px-3 text-[17px] font-bold text-[#246B45] transition hover:bg-leaf-50"
        >
          查看詳情
        </Link>

        {!expired && registrationHref ? (
          <a
            href={registrationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-pill bg-[#2D7448] px-3 text-[17px] font-bold text-white shadow-[0_10px_24px_rgba(30,82,56,0.12)] transition hover:bg-forest-700"
          >
            報名
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ) : (
          <span className="inline-flex h-12 items-center justify-center rounded-pill bg-cream-100 px-3 text-[15px] font-bold text-ink-500">
            {expired ? "已結束" : "暫無報名入口"}
          </span>
        )}
      </div>
    </article>
  );
}

function getDisplayOrganizer(organizer: string | null) {
  if (!organizer) return null;
  const value = organizer.trim();
  if (!value) return null;
  if (/膠紙座|canva/i.test(value)) return null;
  return value;
}

function Row({ icon, children }: { icon: "time" | "pin" | "user" | "phone"; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[15px] leading-5">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-[#2F8A5D]">
        {icon === "time" && (
          <>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </>
        )}
        {icon === "pin" && (
          <>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </>
        )}
        {icon === "user" && (
          <>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </>
        )}
        {icon === "phone" && (
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        )}
      </svg>
      <span className="truncate">{children}</span>
    </div>
  );
}

export function ActivityCardSkeleton() {
  return (
    <div className="min-h-[380px] animate-pulse overflow-hidden rounded-[24px] border border-surface-border bg-white shadow-[0_8px_24px_rgba(30,82,56,0.05)]">
      <div className="flex flex-col gap-5 p-5 md:flex-row md:gap-6 md:p-6">
        <div className="h-[200px] w-full rounded-[18px] bg-cream-100 md:h-[220px] md:w-[160px] xl:h-[240px] xl:w-[180px]" />
        <div className="flex-1 space-y-3">
          <div className="flex justify-between">
            <div className="h-[34px] w-20 rounded-pill bg-cream-100" />
            <div className="h-[34px] w-20 rounded-pill bg-cream-100" />
          </div>
          <div className="h-6 w-4/5 rounded bg-cream-100" />
          <div className="h-6 w-3/5 rounded bg-cream-100" />
          <div className="h-4 w-32 rounded bg-cream-100" />
          <div className="h-4 w-full rounded bg-cream-100" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-cream-100 px-5 py-4 md:px-6">
        <div className="h-12 rounded-pill bg-cream-100" />
        <div className="h-12 rounded-pill bg-cream-100" />
      </div>
    </div>
  );
}
