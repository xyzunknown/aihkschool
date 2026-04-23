import { Suspense } from "react";
import type { Metadata } from "next";
import { ProgrammesClient } from "./ProgrammesClient";
import { ProgrammeCardSkeleton } from "@/components/programmes/ProgrammeCard";

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
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">
          SmartPLAY 開報前追蹤
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          康文署幼兒課程（2-6 歲）· 收藏課程 · 開報前電郵提醒
        </p>
        <div className="mt-3 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
          <p className="text-xs text-amber-700">
            <strong>提示：</strong>加入開報前追蹤後，系統會在報名開放前向你發送提醒郵件。
            我哋唔會代你報名，收到通知後請自行前往
            <a
              href="https://www.smartplay.lcsd.gov.hk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-amber-900"
            >
              SmartPLAY
            </a>
            官網操作。
          </p>
        </div>
      </div>

      <Suspense fallback={<ProgrammesListSkeleton />}>
        <ProgrammesClient />
      </Suspense>
    </div>
  );
}

function ProgrammesListSkeleton() {
  return (
    <div>
      <div className="mb-6 h-10 animate-pulse rounded-full bg-slate-100" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProgrammeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
