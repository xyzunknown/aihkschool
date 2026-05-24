import { Suspense } from "react";
import type { Metadata } from "next";
import { Bell, Clock, MapTrifold } from "@phosphor-icons/react/dist/ssr";
import { ProgrammesClient } from "./ProgrammesClient";
import { ProgrammeCardSkeleton } from "@/components/programmes/ProgrammeCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "SmartPLAY 開報前追蹤",
  description:
    "康文署 SmartPLAY 幼兒課程開報前追蹤，整理游泳、律動、美術和親子活動的報名時間、地點和費用。",
  path: "/programmes",
});

export default function ProgrammesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "SmartPLAY 開報前追蹤", path: "/programmes" },
        ])}
      />
      <div id="programme-list" className="mx-auto max-w-7xl px-5 py-6 pb-28 md:px-8">
        <section className="mb-7 rounded-[24px] border border-surface-border bg-white px-5 py-6 shadow-soft md:px-8 md:py-7">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <span className="inline-flex h-8 items-center rounded-pill bg-forest-50 px-3 text-small font-bold text-forest-700">
                康文署 SmartPLAY
              </span>
              <h1 className="mt-4 text-h1 font-bold text-ink-900">開報前追蹤</h1>
              <p className="mt-2 max-w-3xl text-body leading-7 text-ink-700">
                按報名時間、地區和年齡整理可追蹤場次。展開課程後可以直接查看地點、日期和提醒狀態。
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 md:w-[360px]">
              <PageSignal icon={Clock} title="開報" desc="時間排序" />
              <PageSignal icon={Bell} title="提醒" desc="一鍵追蹤" />
              <PageSignal icon={MapTrifold} title="地區" desc="快速篩選" />
            </div>
          </div>
        </section>
        <Suspense fallback={<ProgrammesListSkeleton />}>
          <ProgrammesClient />
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
  icon: typeof Clock;
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

function ProgrammesListSkeleton() {
  return (
    <div>
      <div className="mb-6 h-10 animate-pulse rounded-pill bg-cream-100" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProgrammeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
