import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "服務條款",
  description: "使用 HKSchoolPlace 前適用的基本服務條款。",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="服務條款"
      description="你使用 HKSchoolPlace，即表示你同意按照以下條款使用本網站及其相關功能。"
      updatedAt="2026-04-23"
      sections={[
        {
          heading: "服務範圍",
          paragraphs: [
            "HKSchoolPlace 提供學校搜尋、資料整理、收藏、截止提醒、課程追蹤及相關資訊展示功能。",
            "我們會盡力維持資料準確及服務穩定，但不保證所有資料在任何時間都完整、即時或適合你的個別決策需要。",
          ],
        },
        {
          heading: "用戶責任",
          paragraphs: [
            "你應確保帳戶資料真確，並自行保管登入方式及裝置安全。",
            "你不得利用本服務作非法用途、濫發內容、干擾系統、未經授權抓取資料或損害其他用戶權益。",
          ],
        },
        {
          heading: "提醒與通知",
          paragraphs: [
            "提醒、追蹤及通知功能屬輔助工具，最終申請安排、截止時間及報名要求仍應以學校、教育局或官方平台公布為準。",
            "如因第三方服務、資料源更新延遲或系統故障導致通知延誤，我們會盡力修復，但不對間接損失承擔責任。",
          ],
        },
        {
          heading: "條款更新",
          paragraphs: [
            "我們可按產品發展、法規要求或服務需要更新本條款。更新後的版本會發布於本頁，並自發布日起生效。",
          ],
        },
      ]}
    />
  );
}