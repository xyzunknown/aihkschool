import type { Metadata } from "next";
import { PrioritySchoolsSection } from "@/components/priority/PrioritySchoolsSection";
import { getPrioritySchools } from "@/lib/prioritySchools";

export const metadata: Metadata = {
  title: "內部優先 65 校 — HKSchoolPlace",
  description: "根據內部 OCR 熱度與官網招生抓取整理出的 65 所優先幼稚園名單。",
};

export default async function PriorityPage() {
  const schools = await getPrioritySchools();

  return (
    <div className="pb-14 pt-8">
      <PrioritySchoolsSection
        schools={schools}
        title="內部優先 65 校"
        description="這份名單來自 OCR 熱度排序與官網招生抓取結果的交集，只保留目前前端可直接使用的有效欄位。你可以先在平台內定位，再跳到官方招生頁。"
        ctaHref="/kg"
        ctaLabel="返回幼稚園列表"
      />
    </div>
  );
}
