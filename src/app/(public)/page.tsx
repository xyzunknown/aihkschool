import { Hero } from "@/components/home/Hero";
import { MegaSearch } from "@/components/home/MegaSearch";
import { ProgressBoard } from "@/components/home/ProgressBoard";
import { ActivitiesPreview } from "@/components/home/ActivitiesPreview";
import { FeaturedSchoolsRow } from "@/components/home/FeaturedSchoolsRow";
import { ArticleGrid } from "@/components/home/ArticleGrid";
import { StatsBanner } from "@/components/home/StatsBanner";
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
      {authErrorMessage ? (
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6">
          <div className="rounded-card border border-status-limited-bg bg-status-limited-bg/40 px-4 py-3 text-sm text-status-limited-fg">
            {authErrorMessage}
          </div>
        </div>
      ) : null}

      <Hero />
      <MegaSearch />
      <ProgressBoard events={liveData.events} schools={liveData.featuredSchools} />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-10">
        <ActivitiesPreview />
      </div>
      <FeaturedSchoolsRow schools={liveData.featuredSchools} />
      <ArticleGrid items={liveData.newsItems} />
      <StatsBanner />
    </>
  );
}
