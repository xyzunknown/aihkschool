import { Hero } from "@/components/home/Hero";
import { HeroSearchBar } from "@/components/home/HeroSearchBar";
import { NewsFeed } from "@/components/home/NewsFeed";
import { FeaturedSchools } from "@/components/home/FeaturedSchools";
import { ActivitiesPreview } from "@/components/home/ActivitiesPreview";
import { getHomepageLiveData } from "@/lib/homepage/liveData";

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
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {authErrorMessage ? (
          <section className="pt-6">
            <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 md:px-5">
              {authErrorMessage}
            </div>
          </section>
        ) : null}
      </div>

      <Hero />

      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Hero Search */}
        <section className="pb-10 md:pb-14">
          <HeroSearchBar />
        </section>

        {/* 精選名校 */}
        <FeaturedSchools schools={liveData.featuredSchools} />

        {/* 課外活動精選 */}
        <ActivitiesPreview />

        {/* 消息動態 */}
        <NewsFeed items={liveData.newsItems} />
      </div>
    </>
  );
}
