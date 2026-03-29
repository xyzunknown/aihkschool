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

/** Event types displayed in "近期家長必知" horizontal scroll cards */
export type EventType =
  | "open_day"
  | "interview"
  | "briefing"
  | "deadline"
  | "trial"
  | "talk";

/** A time-sensitive school event (open day, interview, briefing, etc.) */
export interface SchoolEventItem {
  id: string;
  school_name: string;
  /** school_type: non_profit | private_independent | international */
  school_type?: string;
  /** Display date, e.g. "4月15日（六）" */
  date: string;
  /** ISO date for sorting/filtering, e.g. "2026-04-15" */
  date_iso: string;
  event_type: EventType;
  /** Display label, e.g. "開放日" | "面試" | "簡介會" */
  event_label: string;
  href: string;
  /** Link to school detail/search page on HKSchoolPlace */
  detail_href: string;
  /** Auto-computed: true if date_iso < today */
  is_past?: boolean;
}

export interface NewsItem {
  id: string;
  /** Specific source identifier */
  source: string;
  /** Category for filtering: 政府信息 / 媒体信息 / 学校信息 */
  source_category: "government" | "media" | "school";
  /** Display label, e.g. "教育局" | "HK01" */
  source_label: string;
  title: string;
  summary: string;
  /** Display date, e.g. "3月20日" */
  date: string;
  /** ISO date for sorting */
  published_at: string;
  href: string;
  /** true = opens external link; false = has local /news/[id] page */
  is_external: boolean;
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
  vacancyStatus?: { k1: string; k2: string; k3: string };
}
