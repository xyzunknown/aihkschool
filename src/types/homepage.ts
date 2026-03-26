export type BannerLayout = "classic" | "event" | "minimal";

export interface BannerCTA {
  label: string;
  url: string;
}

export interface HomeBanner {
  id: string;
  layout: BannerLayout;
  source_label: string;
  title_tc: string;
  subtitle_en?: string;
  tags: string[];
  cta_primary: BannerCTA;
  cta_secondary?: BannerCTA;
  footer_note?: string;
  image_src: string;
  image_alt: string;
  is_ad?: boolean;
}

export interface OpenDayItem {
  id: string;
  school_name: string;
  date: string;
  href: string;
  source_label?: string;
}

export interface DeadlineItem {
  id: string;
  school_name: string;
  deadline: string;
  href: string;
  badge?: string;
}

export interface InsightItem {
  id: string;
  title: string;
  author: string;
  date: string;
  href: string;
}

export interface NewsItem {
  id: string;
  source: "edb" | "govhk" | "school";
  source_label: string;
  title: string;
  summary: string;
  date: string;
  href: string;
}

export interface OfficialLinkItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface FeaturedSchool {
  id: string;
  schoolCode?: string;
  name_tc: string;
  name_en: string;
  district: string;
  sessionTags: string[];
  hasN: boolean;
  href: string;
}
