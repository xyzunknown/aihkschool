import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: "聯絡 HKSchoolPlace，回報資料問題、合作查詢或產品建議。",
};

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Contact"
      title="聯絡我們"
      description="如果你發現學校資料有誤、提醒內容不準確，或想和 HKSchoolPlace 合作，請用以下方式聯絡我們。我們會盡量在 3 個工作天內回覆。"
      updatedAt="2026-04-23"
      sections={[
        {
          heading: "一般查詢",
          paragraphs: [
            "電郵：support@hkschoolplace.com",
            "適用於帳戶問題、資料更正、提醒異常、功能建議及合作查詢。",
          ],
        },
        {
          heading: "資料回報",
          paragraphs: [
            "如你發現學校截止日、學額狀態、聯絡方式或申請連結有誤，請在電郵中附上學校名稱、相關頁面連結及你看到的最新資料來源。",
            "如方便，請一併提供官方截圖或學校公告網址，方便我們更快核對。",
          ],
        },
        {
          heading: "合作與媒體",
          paragraphs: [
            "如你是學校、教育機構、數據供應方或媒體，歡迎來信說明合作方向，我們會按產品定位評估是否合適。",
          ],
        },
      ]}
    />
  );
}