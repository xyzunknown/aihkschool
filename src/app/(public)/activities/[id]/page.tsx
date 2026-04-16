import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchActivityById,
  fetchRelatedActivities,
} from "@/lib/db/activities";
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

export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const activity = await fetchActivityById(params.id);
  if (!activity) return { title: "活動 | HKSchoolPlace" };
  return {
    title: `${activity.title} | 課外活動 | HKSchoolPlace`,
    description:
      activity.description?.slice(0, 120) ??
      `${activity.organizer ?? ""} 主辦的幼稚園課外活動`,
  };
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const activity = await fetchActivityById(params.id);
  if (!activity) notFound();

  const related = await fetchRelatedActivities(activity, 4);

  const fee = formatFee(activity);
  const dateRange = formatDateRange(activity.start_date, activity.end_date);
  const ageRange = formatAgeRange(activity.age_min, activity.age_max);
  const expired = isExpired(activity.end_date);

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
      <Link
        href="/activities"
        className="mb-6 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-950"
      >
        ← 返回課外活動
      </Link>

      {/* Hero */}
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {CATEGORY_LABELS[activity.category]}
          </span>
          {fee.isFree && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              免費
            </span>
          )}
          {expired && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              已結束
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          {activity.title}
        </h1>
        {activity.organizer && (
          <p className="mt-2 text-sm text-slate-500">
            主辦：{activity.organizer}
          </p>
        )}
      </div>

      {/* 核心信息卡片 */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-slate-950">活動資訊</h2>
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
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-950">活動介紹</h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">
            {activity.description}
          </p>
        </div>
      )}

      {/* CTA */}
      {!expired && (
        <div className="mb-10 flex flex-wrap items-center gap-4">
          {(activity.source_url || activity.contact_url) && (
            <a
              href={activity.source_url || activity.contact_url || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-base font-medium text-white transition-transform hover:scale-[1.02]"
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
          {activity.contact_url &&
            activity.source_url &&
            activity.contact_url !== activity.source_url && (
              <a
                href={activity.contact_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-slate-950 hover:decoration-slate-950"
              >
                主辦方官網
              </a>
            )}
        </div>
      )}

      {/* 相關活動 */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-xl font-semibold text-slate-950">
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
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-base text-slate-900">
        {href ? (
          <a
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex items-center gap-1 text-slate-950 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-950"
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
                className="flex-shrink-0 text-slate-400"
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
