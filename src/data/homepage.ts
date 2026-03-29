import type {
  HomeBanner,
  SchoolEventItem,
  InsightItem,
  NewsItem,
  FeaturedSchool,
} from "@/types/homepage";

export const BANNERS: HomeBanner[] = [
  {
    id: "banner-st-pauls",
    layout: "classic",
    source_label: "學校官方",
    title_tc: "聖保羅堂幼稚園",
    subtitle_en: "St Paul's Church Kindergarten",
    tags: ["中西區", "全日班", "非牟利"],
    cta_primary: {
      label: "查看詳情",
      url: "/kg?search=%E8%81%96%E4%BF%9D%E7%BE%85%E5%A0%82%E5%B9%BC%E7%A8%9A%E5%9C%92",
    },
    cta_secondary: {
      label: "加入收藏",
      url: "/kg?search=%E8%81%96%E4%BF%9D%E7%BE%85%E5%A0%82%E5%B9%BC%E7%A8%9A%E5%9C%92",
    },
    image_src: "/images/banners/暖金色晨光-Banner-01.png",
    image_alt: "溫暖明亮的幼稚園教室",
  },
];

/** Fallback school events for "近期家長必知" horizontal scroll */
export const SCHOOL_EVENTS: SchoolEventItem[] = [
  {
    id: "evt-1",
    school_name: "聖保羅堂幼稚園",
    date: "4月12日（六）",
    date_iso: "2026-04-12",
    event_type: "open_day",
    event_label: "開放日",
    href: "/kg?search=%E8%81%96%E4%BF%9D%E7%BE%85%E5%A0%82%E5%B9%BC%E7%A8%9A%E5%9C%92",
    detail_href: "/kg?search=%E8%81%96%E4%BF%9D%E7%BE%85%E5%A0%82%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
  {
    id: "evt-2",
    school_name: "嘉諾撒聖心幼稚園",
    date: "4月19日（六）",
    date_iso: "2026-04-19",
    event_type: "open_day",
    event_label: "開放日",
    href: "/kg?search=%E5%98%89%E8%AB%BE%E6%92%92%E8%81%96%E5%BF%83%E5%B9%BC%E7%A8%9A%E5%9C%92",
    detail_href: "/kg?search=%E5%98%89%E8%AB%BE%E6%92%92%E8%81%96%E5%BF%83%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
  {
    id: "evt-3",
    school_name: "京斯敦國際幼稚園",
    date: "4月25日（五）",
    date_iso: "2026-04-25",
    event_type: "briefing",
    event_label: "簡介會",
    href: "/kg?search=%E4%BA%AC%E6%96%AF%E6%95%A6%E5%9C%8B%E9%9A%9B%E5%B9%BC%E7%A8%9A%E5%9C%92",
    detail_href: "/kg?search=%E4%BA%AC%E6%96%AF%E6%95%A6%E5%9C%8B%E9%9A%9B%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
];

/** Fallback parent insights for dark card */
export const INSIGHTS: InsightItem[] = [
  {
    id: "ins-1",
    title: "K1 面試只考小朋友，家長在等候室",
    author: "家長A",
    date: "3天前",
    href: "#",
  },
  {
    id: "ins-2",
    title: "報名表要親身遞交，唔接受郵寄",
    author: "家長B",
    date: "1週前",
    href: "#",
  },
  {
    id: "ins-3",
    title: "面試當日要帶出世紙正本",
    author: "家長C",
    date: "2週前",
    href: "#",
  },
];

/** Fallback news items for "消息動態" */
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    source: "edb",
    source_category: "government",
    source_label: "教育局",
    title: "2026/27 學年幼稚園幼兒班（K1）收生安排",
    summary: "教育局整合新學年 K1 收生安排、申請表格及學位空缺入口。",
    date: "1月6日",
    published_at: "2026-01-06T00:00:00+08:00",
    href: "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/overview/k1-admission-arrangements.html",
    is_external: false,
  },
  {
    id: "news-2",
    source: "govhk",
    source_category: "government",
    source_label: "政府公報",
    title: "支援幼稚園措施",
    summary: "教育局回應業界經營壓力，說明幼稚園教育計劃與支援措施。",
    date: "3月18日",
    published_at: "2026-03-18T00:00:00+08:00",
    href: "https://www.info.gov.hk/gia/general/202603/18/P2026031800552.htm",
    is_external: false,
  },
];

export const FEATURED_SCHOOLS: FeaturedSchool[] = [
  {
    id: "st-pauls-church-kg",
    name_tc: "聖保羅堂幼稚園",
    name_en: "St Paul's Church Kindergarten",
    district: "中西區",
    sessionTags: ["全日班"],
    hasN: false,
    href: "/kg?search=%E8%81%96%E4%BF%9D%E7%BE%85%E5%A0%82%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
  {
    id: "sacred-heart-canossian-kg",
    name_tc: "嘉諾撒聖心幼稚園",
    name_en: "Sacred Heart Canossian Kindergarten",
    district: "中西區",
    sessionTags: ["半日班"],
    hasN: false,
    href: "/kg?search=%E5%98%89%E8%AB%BE%E6%92%92%E8%81%96%E5%BF%83%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
  {
    id: "witty-kg",
    schoolCode: "157716",
    name_tc: "盈思幼稚園",
    name_en: "Witty Kindergarten",
    district: "中西區",
    sessionTags: ["半日班", "全日班"],
    hasN: true,
    href: "/kg?search=%E7%9B%88%E6%80%9D%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
];
