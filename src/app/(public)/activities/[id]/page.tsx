import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ElementType } from "react";
import { fetchActivityById } from "@/lib/db/activities";
import Image from "next/image";
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
import { ArrowSquareOut, Calendar, CaretLeft, Clock, Confetti, MapPin, MapTrifold, Phone, Tag, UserCircle } from "@phosphor-icons/react/dist/ssr";

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

  const fee = formatFee(activity);
  const dateRange = formatDateRange(activity.start_date, activity.end_date);
  const ageRange = formatAgeRange(activity.age_min, activity.age_max);
  const expired = isExpired(activity.end_date);
  const hasImage = hasRealActivityImage(activity);
  const placeholder = getActivityPlaceholder(activity);
  const organizer = getDisplayOrganizer(activity.organizer);
  const registrationHref = getActivityRegistrationHref(activity);
  const organizerHref = getActivityOrganizerHref(activity);
  const infoItems = [
    { label: "日期", value: dateRange, icon: Calendar },
    ...(activity.schedule ? [{ label: "時間", value: activity.schedule, icon: Clock }] : []),
    ...(activity.district ? [{ label: "地區", value: DISTRICT_LABELS[activity.district], icon: MapTrifold }] : []),
    ...(activity.address
      ? [{
          label: "地址",
          value: activity.address,
          icon: MapPin,
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address)}`,
          external: true,
        }]
      : []),
    ...(ageRange ? [{ label: "適合年齡", value: ageRange, icon: UserCircle }] : []),
    { label: "費用", value: fee.fullLabel, icon: Tag },
    ...(activity.contact_phone ? [{ label: "聯繫電話", value: activity.contact_phone, icon: Phone, href: `tel:${activity.contact_phone}` }] : []),
  ];
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
    <div className="mx-auto max-w-[1120px] px-5 py-8 md:px-8 md:py-12">
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
        <CaretLeft aria-hidden="true" size={16} weight="bold" />
        返回課外活動
      </Link>

      {/* Hero */}
      <div className="mb-8">
        <div className="grid gap-7 rounded-card border border-surface-border bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-[360px_1fr] lg:gap-10">
          {hasImage ? (
            <div className="relative aspect-square w-full overflow-hidden rounded-card border border-surface-border bg-cream-100">
              <Image
                src={activity.image_url!}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 360px, calc(100vw - 64px)"
                className="object-cover"
              />
            </div>
          ) : (
            <div className={`flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-card border border-surface-border ${placeholder.className}`}>
              <span className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/70 text-forest-700 shadow-soft">
                <Confetti aria-hidden="true" size={34} weight="regular" />
              </span>
              <span className="rounded-full bg-white/55 px-3 py-1 text-xs font-semibold">
                {placeholder.label}
              </span>
            </div>
          )}
          <div className="flex min-w-0 flex-col justify-center py-1 lg:py-4">
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
            {!expired && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {registrationHref && (
                  <a
                    href={registrationHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-button bg-forest-600 px-7 text-base font-semibold text-white shadow-sm transition hover:bg-forest-700"
                  >
                    立即了解 / 報名
                    <ArrowSquareOut aria-hidden="true" size={18} weight="regular" className="ml-2" />
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
                    className="inline-flex min-h-12 items-center gap-1 text-sm font-medium text-ink-500 underline decoration-slate-300 underline-offset-2 hover:text-ink-900 hover:decoration-slate-950"
                  >
                    主辦方官網
                    <ArrowSquareOut aria-hidden="true" size={15} weight="regular" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 核心信息卡片 */}
      <div className="mb-8 rounded-card border border-surface-border bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-xl font-semibold text-ink-900">活動資訊</h2>
        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {infoItems.map((item) => <InfoRow key={item.label} {...item} />)}
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
  icon: Icon,
  href,
  external,
}: {
  label: string;
  value: string;
  icon: ElementType;
  href?: string;
  external?: boolean;
}) {
  return (
    <div className="flex min-h-[88px] gap-4 rounded-button border border-[#E8ECE3] bg-[#FFFDF8] px-4 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-forest-50 text-forest-700">
        <Icon aria-hidden="true" size={20} weight="regular" />
      </div>
      <div className="min-w-0">
        <dt className="text-xs font-semibold text-ink-500">{label}</dt>
        <dd className="mt-1 text-base font-bold text-ink-900">
        {href ? (
          <a
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex min-w-0 items-center gap-1 hover:text-forest-700"
          >
            <span className="truncate">{value}</span>
            {external && (
              <ArrowSquareOut aria-hidden="true" size={15} weight="regular" className="flex-shrink-0 text-ink-500" />
            )}
          </a>
        ) : (
          value
        )}
      </dd>
      </div>
    </div>
  );
}
