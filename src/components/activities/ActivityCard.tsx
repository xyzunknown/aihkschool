"use client";

import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/lib/db/activities";
import {
  CATEGORY_LABELS,
  DISTRICT_LABELS,
  formatFee,
  formatDateRange,
} from "@/lib/activities/labels";
import {
  getActivitySceneImage,
} from "@/lib/media/activity-scenes";

interface ActivityCardProps {
  activity: Activity;
  priority?: boolean;
}

export function ActivityCard({ activity, priority = false }: ActivityCardProps) {
  const fee = formatFee(activity);
  const dateRange = formatDateRange(activity.start_date, activity.end_date);
  const districtLabel = activity.district ? DISTRICT_LABELS[activity.district] : null;
  const imageSrc = getActivitySceneImage(activity);
  const detailHref = `/activities/${activity.id}`;
  const venueSummary = getDisplayVenue(activity, districtLabel);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#EADFCB] bg-white p-4 shadow-[0_8px_24px_rgba(16,24,40,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(30,82,56,0.09)] md:min-h-[184px] md:flex-row md:items-stretch md:p-5">
      <Link href={detailHref} className="relative h-[180px] w-full flex-shrink-0 overflow-hidden rounded-2xl bg-[#F3F4F6] md:h-[160px] md:w-[160px] lg:h-[148px] lg:w-[148px] xl:h-[160px] xl:w-[160px]">
          <Image
            src={imageSrc}
            alt={activity.title}
            fill
            priority={priority}
            sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1279px) 148px, 160px"
            className="object-cover object-center"
          />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col pt-4 md:grid md:grid-cols-[1fr_auto] md:grid-rows-[auto_auto_auto_1fr] md:gap-x-5 md:pl-6 md:pt-0">
          <div className="flex items-center gap-2.5 md:col-span-1 md:mb-3.5">
            <span className="inline-flex h-[30px] items-center justify-center whitespace-nowrap rounded-pill bg-[#EAF6EE] px-[13px] text-sm font-bold text-[#247A4D] ring-1 ring-forest-700/10">
              {CATEGORY_LABELS[activity.category]}
            </span>
            <span className="inline-flex h-[30px] shrink-0 items-center justify-center whitespace-nowrap rounded-pill bg-[#EAF6EE] px-[13px] text-sm font-bold text-[#247A4D] ring-1 ring-forest-700/10">
              {fee.shortLabel}
            </span>
          </div>

          <Link href={detailHref} className="mt-3 block md:col-span-2 md:mt-0">
            <h3 className="text-lg font-bold leading-[1.35] text-[#10231C] line-clamp-2 md:text-[20px]">
              {activity.title}
            </h3>
          </Link>

          <p className="mt-3 text-base leading-[1.4] text-[#4B5563] md:col-span-2 md:mt-[18px] md:truncate">{dateRange}</p>

          <div className="mt-3 flex min-w-0 items-center gap-2 text-[15px] text-[#4B5563] md:col-span-1 md:self-end md:truncate">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-[#247A4D]">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{venueSummary}</span>
          </div>

          <Link
            href={detailHref}
            className="mt-[18px] inline-flex h-11 w-full items-center justify-center rounded-[14px] border border-[#9FCEB4] bg-white px-5 text-[15px] font-bold text-[#247A4D] transition hover:border-[#247A4D] hover:bg-[#F2FAF5] md:col-span-1 md:col-start-2 md:row-start-4 md:mt-0 md:min-w-[132px] md:self-end"
          >
            查看詳情 →
          </Link>
      </div>
    </article>
  );
}

function getDisplayVenue(activity: Activity, districtLabel: string | null) {
  const text = [activity.title, activity.address, activity.organizer].filter(Boolean).join(" ");
  const venue = KNOWN_VENUES.find(({ pattern }) => pattern.test(text))?.name;
  if (venue && districtLabel) return `${venue}（${districtLabel}）`;
  if (venue) return venue;
  if (districtLabel) return districtLabel;
  return "香港";
}

const KNOWN_VENUES = [
  { pattern: /平凡.*不平凡|李小龍|李小龙|香港多面體|香港多面体|香港文化博物館|香港文化博物馆/i, name: "香港文化博物館" },
  { pattern: /我和城市的二三事|中環街市|中环街市/i, name: "中環街市" },
  { pattern: /等候亭/i, name: "中環街市" },
  { pattern: /香港文化博物館|香港文化博物馆/i, name: "香港文化博物館" },
  { pattern: /香港科學館|香港科学馆|科學館道|科学馆道/i, name: "香港科學館" },
  { pattern: /九龍城寨|九龙城寨/i, name: "九龍城寨展覽館" },
  { pattern: /香港藝術館|香港艺术馆/i, name: "香港藝術館" },
  { pattern: /香港美術館|香港美术馆/i, name: "香港美術館" },
  { pattern: /香港博物館|香港博物馆/i, name: "香港博物館" },
  { pattern: /PMQ|元創方|元创方|鴨巴甸街35號|鸭巴甸街35号/i, name: "PMQ 元創方" },
  { pattern: /長洲北帝廟|长洲北帝庙/i, name: "長洲北帝廟" },
  { pattern: /尖沙咀梳士巴利道10號|尖沙咀梳士巴利道10号/i, name: "香港文化中心" },
];

export function ActivityCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[22px] border border-[#EADFCB] bg-white p-4 shadow-[0_8px_24px_rgba(16,24,40,0.06)] md:min-h-[184px] md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <div className="h-[180px] w-full rounded-2xl bg-cream-100 md:h-[160px] md:w-[160px] lg:h-[148px] lg:w-[148px] xl:h-[160px] xl:w-[160px]" />
        <div className="flex-1 space-y-4">
          <div className="flex gap-2.5">
            <div className="h-[30px] w-16 rounded-pill bg-cream-100" />
            <div className="h-[30px] w-16 rounded-pill bg-cream-100" />
          </div>
          <div className="h-6 w-4/5 rounded bg-cream-100" />
          <div className="h-5 w-3/5 rounded bg-cream-100" />
          <div className="flex items-end justify-between gap-4 pt-6">
            <div className="h-5 w-44 rounded bg-cream-100" />
            <div className="h-11 w-32 rounded-[14px] bg-cream-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
