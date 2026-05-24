import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchActivityById,
  fetchRelatedActivities,
} from "@/lib/db/activities";
import Image from "next/image";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { AddToCalendarButton } from "@/components/activities/AddToCalendarButton";
import {
  CATEGORY_LABELS,
  DISTRICT_LABELS,
  formatFee,
  formatDateRange,
  formatAgeRange,
  isExpired,
} from "@/lib/activities/labels";
import {
  getActivityPlaceholder,
  hasRealActivityImage,
} from "@/lib/media/activity-scenes";
import {
  getActivityOrganizerHref,
  getActivityRegistrationHref,
} from "@/lib/activities/links";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const activity = await fetchActivityById(params.id);
  if (!activity) return { title: "活動 | HKSchoolPlace" };
  return pageMetadata({
    title: `${activity.title}｜香港親子活動`,
    description:
      activity.description?.slice(0, 150) ??
      `${activity.organizer ?? ""} 主辦的香港幼稚園階段親子活動，查看日期、地區、年齡和費用。`,
    path: `/activities/${params.id}`,
    image: activity.image_url || undefined,
  });
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const activity = await fetchActivityById(params.id);
  if (!activity) notFound();

  const related = await fetchRelatedActivities(activity, 4);

  const fee = formatFee(activity);
  const dateRange = formatDateRange(activity.start_date, activity.end_date);
  const ageRange = formatAgeRange(activity.age_min, activity.age_max);
  const expired = isExpired(activity.end_date);
  const hasImage = hasRealActivityImage(activity);
  const placeholder = getActivityPlaceholder(activity);
  const organizer = getDisplayOrganizer(activity.organizer);
  const registrationHref = getActivityRegistrationHref(activity);
  const organizerHref = getActivityOrganizerHref(activity);
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: activity.title,
    description: activity.description ?? `${organizer ?? "主辦方"} 的親子活動`,
    url: absoluteUrl(`/activities/${activity.id}`),
    image: activity.image_url ? [absoluteUrl(activity.image_url)] : undefined,
    startDate: activity.start_date ?? undefined,
    endDate: activity.end_date ?? undefined,
    eventStatus: expired ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: organizer ? { "@type": "Organization", name: organizer, url: organizerHref ?? undefined } : undefined,
    location: activity.address || activity.district
      ? {
          "@type": "Place",
          name: activity.address ?? DISTRICT_LABELS[activity.district!] ?? activity.district,
          address: activity.address ?? DISTRICT_LABELS[activity.district!] ?? activity.district,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      url: registrationHref ?? absoluteUrl(`/activities/${activity.id}`),
      price: fee.isFree ? 0 : undefined,
      priceCurrency: "HKD",
      availability: expired ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "課外活動", path: "/activities" },
            { name: activity.title, path: `/activities/${activity.id}` },
          ]),
          eventJsonLd,
        ]}
      />
      <Link
        href="/activities"
        className="mb-6 inline-flex items-center text-sm text-ink-500 transition-colors hover:text-ink-900"
      >
        ← 返回課外活動
      </Link>

      {/* Hero */}
      <div className="mb-8">
        <div className="flex gap-4 rounded-card border border-surface-border bg-white p-5">
          {hasImage ? (
            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-button bg-cream-100 sm:h-36 sm:w-36">
              <Image
                src={activity.image_url!}
                alt=""
                fill
                priority
                sizes="144px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className={`flex h-28 w-28 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-button sm:h-36 sm:w-36 ${placeholder.className}`}>
              <span className="text-4xl font-semibold leading-none">{placeholder.emoji}</span>
              <span className="rounded-full bg-white/55 px-3 py-1 text-xs font-semibold">
                {placeholder.label}
              </span>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-ink-700">
                {CATEGORY_LABELS[activity.category]}
              </span>
              {fee.isFree && (
                <span className="inline-flex items-center rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700">
                  免費
                </span>
              )}
              {expired && (
                <span className="inline-flex items-center rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-ink-500">
                  已結束
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
              {activity.title}
            </h1>
            {organizer && (
              <p className="mt-2 text-sm text-ink-500">
                主辦：{organizer}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 核心信息卡片 */}
      <div className="mb-8 rounded-card border border-surface-border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-ink-900">活動資訊</h2>
        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoRow label="日期" value={dateRange} />
          {activity.schedule && (
            <InfoRow label="時間" value={activity.schedule} />
          )}
          {activity.district && (
            <InfoRow
              label="地區"
              value={DISTRICT_LABELS[activity.district]}
            />
          )}
          {activity.address && (
            <InfoRow
              label="地址"
              value={activity.address}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address)}`}
              external
            />
          )}
          {ageRange && <InfoRow label="適合年齡" value={ageRange} />}
          <InfoRow label="費用" value={fee.fullLabel} />
          {activity.contact_phone && (
            <InfoRow
              label="聯繫電話"
              value={activity.contact_phone}
              href={`tel:${activity.contact_phone}`}
            />
          )}
        </dl>
      </div>

      {/* 描述 */}
      {activity.description && (
        <div className="mb-8 rounded-card border border-surface-border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-ink-900">活動介紹</h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-ink-700">
            {activity.description}
          </p>
        </div>
      )}

      {/* CTA */}
      {!expired && (
        <div className="mb-10 flex flex-wrap items-center gap-4">
          {registrationHref && (
            <a
              href={registrationHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-button bg-ink-900 px-6 py-3 text-base font-medium text-white transition-transform "
            >
              立即了解 / 報名
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
          {activity.start_date && (
            <AddToCalendarButton activity={activity} />
          )}
          {organizerHref && (
            <a
              href={organizerHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-ink-500 underline decoration-slate-300 underline-offset-2 hover:text-ink-900 hover:decoration-slate-950"
            >
              主辦方官網
            </a>
          )}
        </div>
      )}

      {/* 相關活動 */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-xl font-semibold text-ink-900">
            相關活動
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {related.map((a) => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function getDisplayOrganizer(organizer: string | null) {
  if (!organizer) return null;
  const value = organizer.trim();
  if (!value) return null;
  if (/膠紙座|canva/i.test(value)) return null;
  return value;
}

function InfoRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">
        {label}
      </dt>
      <dd className="mt-1 text-base text-ink-900">
        {href ? (
          <a
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex items-center gap-1 text-ink-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-950"
          >
            {value}
            {external && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 text-ink-500"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            )}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
