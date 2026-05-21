import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, mobileAppJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "HKSchoolPlace iOS App",
  description:
    "HKSchoolPlace iOS App 幫香港家長用手機搜尋幼稚園、比較學額和學費、追蹤 SmartPLAY 與親子活動。",
  path: "/ios-app",
});

const FEATURES = [
  "搜尋香港幼稚園、N 班、K1-K3 學額和地區資料",
  "比較學費、班制、語言、校舍設施和申請資訊",
  "追蹤 SmartPLAY 開報時間與幼兒親子活動",
  "收藏心儀學校，集中管理申請和提醒",
];

export default function IOSAppLandingPage() {
  return (
    <div className="bg-white">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "HKSchoolPlace iOS App", path: "/ios-app" },
          ]),
          mobileAppJsonLd(),
        ]}
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-16">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-forest-700">HKSchoolPlace iOS</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-ink-900 md:text-5xl">
            手機上完成香港幼稚園搜尋、比較和提醒
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink-700">
            給正在準備 N 班、K1 或轉校的家長，把學校資料、學額空缺、SmartPLAY
            課程和親子活動放在同一個清晰入口。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/kg"
              className="inline-flex h-11 items-center rounded-pill bg-forest-600 px-6 text-sm font-semibold text-white transition hover:bg-forest-700"
            >
              先用網頁搜尋
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-pill border border-surface-border bg-white px-6 text-sm font-semibold text-ink-800 transition hover:bg-leaf-50"
            >
              查詢 App 版本
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-surface-border bg-leaf-50 p-4 shadow-card">
          <div className="rounded-[26px] bg-white p-5 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-forest-700">今日重點</p>
                <p className="mt-1 text-lg font-bold text-ink-900">K1 學額與開報提醒</p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-forest-600" />
            </div>
            <div className="space-y-3">
              {FEATURES.map((feature) => (
                <div key={feature} className="rounded-2xl border border-surface-border bg-surface-soft px-4 py-3 text-sm font-medium text-ink-800">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
