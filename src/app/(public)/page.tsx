import { Hero } from "@/components/home/Hero";
import { NewsFeed } from "@/components/home/NewsFeed";
import { FeaturedSchools } from "@/components/home/FeaturedSchools";
import { ActivitiesPreview } from "@/components/home/ActivitiesPreview";
import { ProgrammesPreview } from "@/components/home/ProgrammesPreview";
import { getHomepageLiveData } from "@/lib/homepage/liveData";
import { JsonLd } from "@/components/seo/JsonLd";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "香港幼稚園搜尋、學額空缺與親子活動",
  description:
    "搜尋香港幼稚園、比較 K1-K3 學額空缺與學費，追蹤 SmartPLAY 開報和親子活動。",
  path: "/",
});

const AUTH_ERROR_COPY: Record<string, string> = {
  auth: "登入未完成。請再試一次；如果你是在 preview 或本地環境操作，請確認 Supabase Auth 的 Redirect URLs 已包含目前站點。",
  auth_config: "登入設定未完成。請檢查 Supabase Auth 的 Site URL 和 Redirect URLs。",
  auth_origin: "目前站點未被 Supabase Auth 允許登入回跳。請把本地或 preview 網址加入 Redirect URLs allowlist。",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const liveData = await getHomepageLiveData();
  const resolvedSearchParams = await searchParams;
  const authError = resolvedSearchParams?.error;
  const authErrorMessage = authError ? AUTH_ERROR_COPY[authError] : null;

  return (
    <>
      <JsonLd
        data={itemListJsonLd({
          name: "HKSchoolPlace 核心服務",
          description: "香港幼稚園搜尋、學額追蹤、SmartPLAY 課程和親子活動整理。",
          items: [
            { name: "香港幼稚園搜尋", path: "/kg", description: "按地區、班別、學額和學費搜尋幼稚園。" },
            { name: "SmartPLAY 開報前追蹤", path: "/programmes", description: "整理康文署幼兒課程開報時間。" },
            { name: "親子課外活動", path: "/activities", description: "搜尋香港幼稚園階段適合的活動。" },
          ],
        })}
      />
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        {authErrorMessage ? (
          <section className="pt-6">
            <div className="rounded-card border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 md:px-5">
              {authErrorMessage}
            </div>
          </section>
        ) : null}
      </div>

      <Hero banners={liveData.banners} />

      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        {/* 熱點學校 */}
        <FeaturedSchools schools={liveData.featuredSchools} />

        {/* 康體通開報倒數 */}
        <ProgrammesPreview />

        {/* 課外活動精選 */}
        <ActivitiesPreview />

        {/* 消息動態 */}
        <NewsFeed items={liveData.newsItems} />
      </div>
    </>
  );
}
