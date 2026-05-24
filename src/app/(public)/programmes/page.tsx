import { Suspense } from "react";
import type { Metadata } from "next";
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
        <h1 className="mb-2 text-h1 font-bold text-ink-900">SmartPLAY 開報前追蹤</h1>
        <p className="mb-8 max-w-3xl text-body text-ink-700">
          按報名時間整理仍可追蹤的康文署課程，已截止場次會自動收起。
        </p>
        <Suspense fallback={<ProgrammesListSkeleton />}>
          <ProgrammesClient />
        </Suspense>
      </div>
    </>
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
