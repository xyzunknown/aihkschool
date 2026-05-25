"use client";

import Image from "next/image";
import Link from "next/link";
import { CaretRight, MapPin } from "@phosphor-icons/react/dist/ssr";
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
    <Link
      href={detailHref}
      className="activity-card group block h-full overflow-hidden rounded-card border border-surface-border bg-white p-3.5 shadow-soft transition hover:-translate-y-0.5 hover:border-forest-200 hover:shadow-card md:p-4"
      aria-label={`${activity.title} 活動詳情`}
    >
      <div className="activity-card__body">
        <div className="activity-card__image relative block overflow-hidden rounded-button bg-cream-100">
          <Image
            src={imageSrc}
            alt={activity.title}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
            className="object-cover object-center saturate-[0.82] brightness-[1.06] transition duration-300 group-hover:scale-[1.025]"
          />
        </div>

        <div className="activity-card__content flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 items-center justify-center whitespace-nowrap rounded-pill bg-leaf-50 px-2.5 text-label font-medium text-forest-700">
              {CATEGORY_LABELS[activity.category]}
            </span>
            <span className="inline-flex h-6 shrink-0 items-center justify-center whitespace-nowrap rounded-pill bg-cream-100 px-2.5 text-label font-medium text-ink-700">
              {fee.shortLabel}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 min-h-[3.1rem] text-[18px] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-forest-700">
            {activity.title}
          </h3>

          <p className="mt-2.5 line-clamp-1 text-small font-medium text-ink-500">{dateRange}</p>

          <div className="mt-2.5 flex min-w-0 items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 text-small font-medium text-ink-500 md:truncate">
              <MapPin aria-hidden="true" size={16} weight="regular" className="shrink-0 text-forest-500" />
              <span className="truncate">{venueSummary}</span>
            </div>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-forest-100 text-forest-600 transition-colors group-hover:border-forest-200 group-hover:bg-forest-50">
              <CaretRight aria-hidden="true" size={16} weight="bold" />
            </span>
          </div>
        </div>
      </div>
    </Link>
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
    <div className="activity-card h-full animate-pulse overflow-hidden rounded-card border border-surface-border bg-white p-3.5 shadow-soft md:p-4">
      <div className="activity-card__body">
        <div className="activity-card__image rounded-button bg-cream-100" />
        <div className="activity-card__content flex-1 space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-pill bg-cream-100" />
            <div className="h-6 w-16 rounded-pill bg-cream-100" />
          </div>
          <div className="h-6 w-4/5 rounded bg-cream-100" />
          <div className="h-5 w-3/5 rounded bg-cream-100" />
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="h-5 w-2/5 rounded bg-cream-100" />
            <div className="h-8 w-8 rounded-full bg-cream-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
