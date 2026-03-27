import { BannerCarousel } from "@/components/home/BannerCarousel";
import { HeroSearchBar } from "@/components/home/HeroSearchBar";
import { ParentMustKnow } from "@/components/home/ParentMustKnow";
import { NewsFeed } from "@/components/home/NewsFeed";
import { FeaturedSchools } from "@/components/home/FeaturedSchools";
import { getHomepageLiveData } from "@/lib/homepage/liveData";

export default async function HomePage() {
  const liveData = await getHomepageLiveData();

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8">
      {/* Hero: Banner + Search */}
      <section className="pt-8 pb-10 md:pt-12 md:pb-14">
        <BannerCarousel banners={liveData.banners} />
        <HeroSearchBar />
      </section>

      {/* 近期家長必知 */}
      <ParentMustKnow
        events={liveData.events}
        insights={liveData.insights}
      />

      {/* 消息動態 */}
      <NewsFeed items={liveData.newsItems} />

      {/* 精選名校 */}
      <FeaturedSchools />
    </div>
  );
}
