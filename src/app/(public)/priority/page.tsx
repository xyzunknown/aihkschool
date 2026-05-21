import type { Metadata } from "next";
import { PrioritySchoolsSection } from "@/components/priority/PrioritySchoolsSection";
import { getPrioritySchools } from "@/lib/prioritySchools";

export const metadata: Metadata = {
  title: "熱點學校 100 — HKSchoolPlace",
  description: "根據家長討論熱度與招生資料整理出的 100 所熱門幼稚園清單。",
};

export default async function PriorityPage() {
  const schools = await getPrioritySchools();

  return (
    <div className="pb-14 pt-8">
      <PrioritySchoolsSection
        schools={schools}
        title="熱點學校 100"
        description="這份名單整理了家長討論度高、平台已匹配到資料的 100 所熱門幼稚園。你可以先在平台內定位，再跳到官方招生頁。"
        ctaHref="/kg"
        ctaLabel="返回幼稚園列表"
      />
    </div>
  );
}
