import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "私隱政策",
  description: "HKSchoolPlace 如何收集、使用及保護你的個人資料。",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="私隱政策"
      description="HKSchoolPlace 只會收集提供服務所需的最少資料，並以保障帳戶、提醒及查詢處理為目的使用。"
      updatedAt="2026-04-23"
      sections={[
        {
          heading: "我們會收集什麼資料",
          paragraphs: [
            "當你註冊或登入時，我們可能會處理你的電郵地址、帳戶識別資料及你主動提供的偏好設定。",
            "當你使用收藏、提醒或課程追蹤功能時，我們會保存相關操作紀錄，以便提供提醒、追蹤狀態及排查錯誤。",
          ],
        },
        {
          heading: "資料會如何使用",
          paragraphs: [
            "我們會用你的資料提供登入驗證、收藏、截止提醒、開報前追蹤、系統通知及客服支援。",
            "我們亦可能使用去識別化的技術紀錄來診斷錯誤、改善產品體驗及監察服務穩定性。",
          ],
        },
        {
          heading: "第三方服務",
          paragraphs: [
            "HKSchoolPlace 可能使用第三方基礎設施提供登入、資料庫、郵件發送及部署服務。這些服務只會在提供平台功能所需範圍內處理資料。",
            "我們不會出售你的個人資料，也不會把你的聯絡方式用於與服務無關的廣告用途。",
          ],
        },
        {
          heading: "你的權利",
          paragraphs: [
            "如你想更正、查閱或刪除與你帳戶相關的資料，可電郵至 support@hkschoolplace.com 提出要求。",
            "如你不想再收到提醒郵件，可在帳戶頁關閉相關提醒或聯絡我們協助處理。",
          ],
        },
      ]}
    />
  );
}