import { BannerCarousel } from "@/components/home/BannerCarousel";
import { HeroSearchBar } from "@/components/home/HeroSearchBar";
import { ParentMustKnow } from "@/components/home/ParentMustKnow";
import { NewsFeed } from "@/components/home/NewsFeed";
import { FeaturedSchools } from "@/components/home/FeaturedSchools";
import { BANNERS } from "@/data/homepage";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8">
      {/* Hero: Banner + Search */}
      <section className="pt-8 pb-10 md:pt-12 md:pb-14">
        <BannerCarousel banners={BANNERS} />
        <HeroSearchBar />
      </section>

      {/* 本週家長必知 */}
      <ParentMustKnow />

      {/* 消息動態 */}
      <NewsFeed />

      {/* 精選名校 */}
      <FeaturedSchools />
    </div>
  );
}
