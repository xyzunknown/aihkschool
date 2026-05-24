import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  ExternalLink,
  Info,
  Map,
  MapPin,
  Tag,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { fetchProgrammeById } from "@/lib/db/programmes";
import {
  PROGRAMME_CATEGORY_LABELS,
  PROGRAMME_DISTRICT_LABELS,
  ENROLMENT_STATUS_LABELS,
  ENROLMENT_STATUS_COLORS,
  formatProgrammeFee,
  formatEnrolmentTime,
  formatProgrammeDateRange,
  formatAgeRange,
} from "@/lib/programmes/labels";
import { getProgrammeSceneImage } from "@/lib/media/activity-scenes";
import { SubscribeButton } from "@/components/programmes/SubscribeButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 600;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const programme = await fetchProgrammeById(params.id);
  if (!programme) return { title: "課程未找到" };

  const name = programme.name_zh || programme.name_en || "課程";
  return pageMetadata({
    title: `${name}｜SmartPLAY 開報前追蹤`,
    description: `${name}，${programme.venue || "香港康文署場地"}，${formatProgrammeFee(programme.fee_hkd).label}，查看報名時間、適合年齡和課程日期。`,
    path: `/programmes/${params.id}`,
  });
}

export default async function ProgrammeDetailPage({ params }: PageProps) {
  const programme = await fetchProgrammeById(params.id);
  if (!programme) notFound();

  const fee = formatProgrammeFee(programme.fee_hkd);
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const ageRange = formatAgeRange(programme.age_min, programme.age_max);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const status = programme.lcsd_programme_status;
  const enrolmentStatus = status?.enrolment_status || "pre_open";
  const heroImage = getProgrammeSceneImage(programme);
  const programmeHref = programme.raw_url ?? "https://www.smartplay.lcsd.gov.hk/";
  const mapHref = programme.venue
    ? `https://maps.google.com/?q=${encodeURIComponent(
        `${programme.venue}${programme.district ? ` ${PROGRAMME_DISTRICT_LABELS[programme.district] || programme.district}` : ""} Hong Kong`,
      )}`
    : null;
  const infoItems = [
    { label: "報名開放", value: enrolmentTime, icon: Clock3 },
    { label: "課程日期", value: dateRange, icon: CalendarDays },
    { label: "場地", value: programme.venue || "未知", icon: MapPin, href: mapHref ?? undefined },
    {
      label: "地區",
      value: programme.district ? PROGRAMME_DISTRICT_LABELS[programme.district] || programme.district : "未知",
      icon: Map,
    },
    { label: "費用", value: fee.label, icon: Tag, highlight: fee.isFree },
    { label: "堂數", value: programme.sessions_count ? `${programme.sessions_count} 堂` : "未知", icon: BookOpen },
    { label: "適合年齡", value: ageRange || "未知", icon: UserRound },
  ];
  const programmeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: programme.name_zh || programme.name_en || "SmartPLAY 課程",
    alternateName: programme.name_en || undefined,
    description: `${programme.name_zh || programme.name_en || "SmartPLAY 課程"} 的報名時間、地點、費用和適合年齡整理。`,
    url: absoluteUrl(`/programmes/${programme.id}`),
    provider: {
      "@type": "Organization",
      name: "康樂及文化事務署 SmartPLAY",
      url: "https://www.smartplay.lcsd.gov.hk/",
    },
    offers: {
      "@type": "Offer",
      price: programme.fee_hkd ?? 0,
      priceCurrency: "HKD",
      availability: enrolmentStatus === "closed" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: programme.raw_url ?? absoluteUrl(`/programmes/${programme.id}`),
    },
  };

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-9 md:px-8 md:py-12">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "SmartPLAY 開報前追蹤", path: "/programmes" },
            { name: programme.name_zh || programme.name_en || "課程", path: `/programmes/${programme.id}` },
          ]),
          programmeJsonLd,
        ]}
      />

      <a
        href="/programmes"
        className="mb-8 inline-flex items-center gap-1 text-small font-medium text-ink-500 transition hover:text-forest-700"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        返回課程列表
      </a>

      <section className="grid items-center gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] md:gap-11">
        <div className="relative h-[300px] overflow-hidden rounded-[24px] bg-cream-100 shadow-card md:h-[370px]">
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="(min-width: 768px) 520px, 100vw"
            className="object-cover object-center saturate-[0.86] brightness-[1.04]"
            priority
          />
        </div>

        <div className="max-w-[520px]">
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex h-8 items-center rounded-pill bg-[#EAF6FB] px-3.5 text-small font-semibold text-[#166A8F]">
              {PROGRAMME_CATEGORY_LABELS[programme.category || "other"]}
            </span>
            <span
              className={`inline-flex h-8 items-center rounded-pill px-3.5 text-small font-semibold ${
                ENROLMENT_STATUS_COLORS[enrolmentStatus]
              }`}
            >
              {ENROLMENT_STATUS_LABELS[enrolmentStatus]}
            </span>
          </div>

          <h1 className="text-[32px] font-bold leading-tight tracking-normal text-ink-900 md:text-[40px]">
            {programme.name_zh || programme.name_en || "未知課程"}
          </h1>
          {programme.name_en && programme.name_zh && (
            <p className="mt-3 text-[17px] leading-relaxed text-ink-500">{programme.name_en}</p>
          )}

          <p className="mt-7 max-w-[500px] text-body leading-8 text-ink-700">
            透過遊戲及專業指導，讓幼兒在安全有趣的水中環境中建立自信，
            學習基本水上安全知識與技巧，培養良好親水習慣。
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <SubscribeButton programmeId={programme.id} size="lg" />
            <a
              href={programmeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 min-w-[250px] items-center justify-center gap-2 rounded-pill border border-forest-700 bg-forest-700 px-6 text-body font-bold text-white shadow-soft transition hover:border-forest-800 hover:bg-forest-800"
            >
              <ExternalLink aria-hidden="true" size={18} strokeWidth={2} />
              前往 SmartPLAY 報名
            </a>
          </div>
        </div>
      </section>

      <section className="mt-11 rounded-[24px] border border-surface-border bg-white p-6 shadow-card md:p-9">
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {infoItems.map((item) => (
            <InfoCell key={item.label} {...item} />
          ))}
        </div>
      </section>

      <div className="mt-6 flex gap-3 rounded-[18px] border border-surface-border bg-[#F7FBF3] px-5 py-4 text-ink-600">
        <Info aria-hidden="true" className="mt-0.5 shrink-0 text-forest-700" size={18} strokeWidth={2} />
        <p className="text-small leading-relaxed">
          課程資料來自康文署 SmartPLAY，僅供參考。實際安排以官方為準。
          HKSchoolPlace 不提供代報名服務，請自行前往官網操作。
        </p>
      </div>
    </div>
  );
}

function InfoCell({
  label,
  value,
  highlight,
  href,
  icon: Icon,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  href?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex min-h-[92px] gap-4 rounded-[16px] border border-[#E8ECE3] bg-[#FFFDF8] px-5 py-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-forest-50 text-forest-700">
        <Icon aria-hidden="true" size={21} strokeWidth={1.9} />
      </div>
      <div className="min-w-0">
        <p className="mb-1.5 text-small font-semibold text-ink-500">{label}</p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-w-0 items-center gap-1 text-body font-bold hover:text-forest-700 ${
              highlight ? "text-forest-700" : "text-ink-900"
            }`}
          >
            <span className="truncate">{value}</span>
            <ExternalLink className="shrink-0" size={15} strokeWidth={2} aria-hidden="true" />
          </a>
        ) : (
          <p className={`text-body font-bold ${highlight ? "text-forest-700" : "text-ink-900"}`}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
