import { Suspense } from "react";
import type { Metadata } from "next";
import { ProgrammesClient } from "./ProgrammesClient";
import { ProgrammeCardSkeleton } from "@/components/programmes/ProgrammeCard";
import { FeatureBanner } from "@/components/feature/FeatureBanner";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SmartPLAY 開報前追蹤 | HKSchoolPlace",
  description:
    "康文署 SmartPLAY 幼兒課程開報前追蹤 — 游泳、律動、美術、親子活動。收藏心儀課程，提早收到開報提醒。",
  openGraph: {
    title: "SmartPLAY 開報前追蹤 | HKSchoolPlace",
    description: "康文署幼兒課程開報前追蹤，提早掌握開報時間。",
  },
};

export default function ProgrammesPage() {
  return (
    <>
      <FeatureBanner
        eyebrow="康文署 SmartPLAY"
        title="SmartPLAY 開報前追蹤"
        description="按報名時間整理仍可追蹤的課程，已截止場次會自動收起。"
        imageSrc="/images/feature-banners/smartplay-tracking.webp"
        imageAlt="SmartPLAY 開報提醒插畫"
        imagePosition="74% center"
        stats={[]}
        actions={[
          { label: "瀏覽課程", href: "#programme-list" },
          { label: "查看提醒", href: "/account/alerts", variant: "secondary" },
        ]}
      />

      <div id="programme-list" className="mx-auto max-w-7xl px-5 pt-10 pb-28 md:px-8 md:py-10">
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
