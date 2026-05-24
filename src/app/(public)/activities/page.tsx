import { Suspense } from "react";
import type { Metadata } from "next";
import { Calendar, Confetti, MapPin } from "@phosphor-icons/react/dist/ssr";
import { ActivitiesClient } from "./ActivitiesClient";
import { ActivityCardSkeleton } from "@/components/activities/ActivityCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "香港幼稚園階段親子活動",
  description:
    "搜尋香港幼稚園階段親子活動、展覽演出、學習體驗和節慶活動，按地區、年齡和費用篩選。",
  path: "/activities",
});

export default function ActivitiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "課外活動", path: "/activities" },
        ])}
      />
      <div id="activity-list" className="mx-auto max-w-[1440px] px-5 py-6 pb-28 md:px-8">
        <section className="mb-7 rounded-[24px] border border-surface-border bg-white px-5 py-6 shadow-soft md:px-8 md:py-7">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <span className="inline-flex h-8 items-center rounded-pill bg-forest-50 px-3 text-small font-bold text-forest-700">
                親子活動資料庫
              </span>
              <h1 className="mt-4 text-h1 font-bold text-ink-900">課外活動</h1>
              <p className="mt-2 max-w-3xl text-body leading-7 text-ink-700">
                按類別、地區和費用篩選，幫小朋友找到合適的親子玩樂、展覽演出和學習體驗。
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 md:w-[360px]">
              <PageSignal icon={Confetti} title="活動" desc="親子精選" />
              <PageSignal icon={MapPin} title="地區" desc="就近搜尋" />
              <PageSignal icon={Calendar} title="日期" desc="即將開始" />
            </div>
          </div>
        </section>
        <Suspense fallback={<ActivitiesListSkeleton />}>
          <ActivitiesClient />
        </Suspense>
      </div>
    </>
  );
}

function PageSignal({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Calendar;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[14px] border border-surface-border bg-[#FBFDF8] p-3">
      <Icon aria-hidden="true" size={18} weight="regular" className="text-forest-700" />
      <p className="mt-2 text-small font-bold text-ink-900">{title}</p>
      <p className="mt-0.5 text-label font-semibold text-ink-500">{desc}</p>
    </div>
  );
}

function ActivitiesListSkeleton() {
  return (
    <div>
      <div className="mb-6 h-10 animate-pulse rounded-pill bg-cream-100" />
      <div className="mb-6 h-10 animate-pulse rounded-pill bg-cream-100" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
