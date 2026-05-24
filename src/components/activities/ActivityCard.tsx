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
import { getActivityRegistrationHref } from "@/lib/activities/links";

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
  const registrationHref = getActivityRegistrationHref(activity);

  return (
    <article className="overflow-hidden rounded-[22px] border border-cream-200 bg-white shadow-soft transition hover:shadow-card">
      <div className="flex h-full flex-col md:min-h-[250px] md:flex-row">
        <Link
          href={detailHref}
          className="relative block h-[180px] overflow-hidden bg-cream-100 md:h-auto md:w-[38%] md:shrink-0"
          aria-label={`${activity.title} 活動詳情`}
        >
          <Image
            src={imageSrc}
            alt={activity.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 38vw, 100vw"
            className="object-cover object-center"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6 md:px-7 md:py-6">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-7 items-center justify-center whitespace-nowrap rounded-full bg-leaf-50 px-3 text-[13px] font-bold text-forest-700">
              {CATEGORY_LABELS[activity.category]}
            </span>
            <span className="inline-flex h-7 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-leaf-50 px-3 text-[13px] font-bold text-forest-700">
              {fee.shortLabel}
            </span>
          </div>

          <Link href={detailHref} className="block">
            <h3 className="mt-3 line-clamp-2 text-[20px] font-bold leading-[1.28] text-[#101828] hover:text-brand-700 lg:text-[22px]">
              {activity.title}
            </h3>
          </Link>

          <p className="mt-3 line-clamp-1 text-base leading-[1.4] text-ink-700">{dateRange}</p>

          <div className="mt-3 flex min-w-0 items-center gap-2 text-base text-ink-700 md:truncate">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-forest-500" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{venueSummary}</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-auto">
            <Link
              href={detailHref}
              className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-brand-200 bg-white px-4 text-[14px] font-bold text-brand-700 transition hover:bg-brand-50"
            >
              查看詳情
            </Link>
            {registrationHref ? (
              <a
                href={registrationHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-brand-700 bg-brand-700 px-4 text-[14px] font-bold text-white transition hover:border-brand-800 hover:bg-brand-800"
              >
                報名
                <ExternalIcon />
              </a>
            ) : null}
          </div>
        </div>
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
    <div className="animate-pulse overflow-hidden rounded-[22px] border border-cream-200 bg-white shadow-soft">
      <div className="flex flex-col md:min-h-[250px] md:flex-row">
        <div className="h-[180px] w-full bg-cream-100 md:h-auto md:w-[38%]" />
        <div className="flex-1 space-y-4 p-5 sm:p-6 md:px-7 md:py-6">
          <div className="flex gap-2.5">
            <div className="h-7 w-16 rounded-pill bg-cream-100" />
            <div className="h-7 w-16 rounded-pill bg-cream-100" />
          </div>
          <div className="h-6 w-4/5 rounded bg-cream-100" />
          <div className="h-5 w-3/5 rounded bg-cream-100" />
          <div className="flex gap-3 pt-4">
            <div className="h-11 flex-1 rounded-xl bg-cream-100" />
            <div className="h-11 flex-1 rounded-xl bg-cream-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
