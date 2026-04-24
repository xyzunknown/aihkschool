import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "免責聲明",
  description: "HKSchoolPlace 資料與提醒功能的使用限制及免責範圍。",
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Disclaimer"
      title="免責聲明"
      description="HKSchoolPlace 致力整理公開教育資料並提供提醒工具，但本網站內容不構成法律、教育、財務或升學保證。"
      updatedAt="2026-04-23"
      sections={[
        {
          heading: "資料來源",
          paragraphs: [
            "本網站內容可能來自學校官方網站、政府資料、公開公告、用戶回報及其他第三方來源。這些來源可能隨時更新、撤回或更正。",
            "我們會盡力核對與更新，但不能保證所有顯示資料在你查看當刻仍然完全準確。",
          ],
        },
        {
          heading: "提醒功能限制",
          paragraphs: [
            "截止提醒、開報前追蹤及其他通知功能只屬輔助安排工具，不應取代你對官方截止日、報名安排及學校要求的自行核實。",
            "即使你已開啟提醒，也應定期查看學校官方公告、申請入口及教育局資訊。",
          ],
        },
        {
          heading: "決策責任",
          paragraphs: [
            "你應按自己家庭情況、子女需要及官方資訊作最終判斷與決策。任何因依賴本站資料或提醒而產生的申請延誤、錯失或後續損失，均由用戶自行承擔。",
          ],
        },
      ]}
    />
  );
}