import { FeatureBanner } from "@/components/feature/FeatureBanner";
import { NewsClient } from "./NewsClient";

export default function NewsPage() {
  return (
    <>
      <FeatureBanner
        eyebrow="資訊動態"
        title="資訊消息"
        description="集中整理最新教育資訊、學校活動和升學政策，幫家長更快掌握值得留意的更新。"
        imageSrc="/images/feature-banners/news-updates.png"
        imageAlt="教育資訊消息整理插畫"
        imagePosition="72% center"
        actions={[
          { label: "瀏覽消息", href: "#news-list" },
          { label: "返回首頁", href: "/", variant: "secondary" },
        ]}
      />
      <NewsClient />
    </>
  );
}
