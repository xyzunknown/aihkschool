import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
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
    <>
      <section className="relative overflow-hidden bg-cream-50 border-b border-cream-200">
        <span className="leaf-decor leaf-decor-tl pointer-events-none" />
        <span className="leaf-decor leaf-decor-tr pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-ink-900 leading-tight">
              SmartPLAY 開報前追蹤
            </h1>
            <p className="mt-3 text-sm text-ink-500">
              康文署 SmartPLAY 課程｜全年齡｜收藏心儀課程，開報前提早提醒
            </p>
            <div className="mt-5 rounded-card bg-sand-50 border border-sand-100 px-4 py-3 max-w-lg">
              <p className="text-xs text-sand-700 leading-relaxed">
                <span className="text-base mr-1">🔔</span>
                <strong>提示：</strong>加入開報前追蹤後，系統會在報名開放前的特定時段就向你提醒，
                發送相關班位的最新狀況及通知給你的帳戶或 SmartPLAY 訂閱帳戶。
              </p>
            </div>
          </div>
          <div className="relative h-32 md:h-48 hidden md:flex items-end justify-center">
            <Image
              src="/images/activity-scenes/pool-outdoor.webp"
              alt=""
              width={600}
              height={400}
              priority
              sizes="320px"
              className="relative z-10 h-full w-full rounded-[20px] object-cover opacity-95 shadow-[0_16px_40px_rgba(30,82,56,0.10)]"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10">
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
