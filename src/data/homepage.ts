import type {
  HomeBanner,
  OpenDayItem,
  DeadlineItem,
  OfficialLinkItem,
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

export const OPEN_DAYS: OpenDayItem[] = [
  {
    id: "od-1",
    school_name: "聖保羅堂幼稚園",
    date: "4月12日（六）",
    href: "/kg?search=%E8%81%96%E4%BF%9D%E7%BE%85%E5%A0%82%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
  {
    id: "od-2",
    school_name: "嘉諾撒聖心幼稚園",
    date: "4月19日（六）",
    href: "/kg?search=%E5%98%89%E8%AB%BE%E6%92%92%E8%81%96%E5%BF%83%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
];

export const DEADLINES: DeadlineItem[] = [
  {
    id: "dl-1",
    school_name: "維多利亞（寶翠園）幼稚園",
    deadline: "2026/27 招生中",
    badge: "官方招生頁",
    href: "https://www.victoria.edu.hk/application-procedure/?tab=PN_K1",
  },
  {
    id: "dl-2",
    school_name: "伽利利國際幼稚園",
    deadline: "2025/26 及 2026/27 可申請",
    badge: "入學申請開放",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSf8U_m4qwPUCdYmoyj_Y11w6EZYB-81IVeIySgkH0N9toYEsA/viewform?usp=send_form",
  },
];

export const OFFICIAL_LINKS: OfficialLinkItem[] = [
  {
    id: "official-1",
    title: "K1 收生安排",
    subtitle: "教育局 2026/27 學年官方安排",
    href: "https://www.edb.gov.hk/k1-admission_tc",
  },
  {
    id: "official-2",
    title: "家長講座",
    subtitle: "查看教育局最新家長講座安排",
    href: "https://www.edb.gov.hk/parentstalks",
  },
  {
    id: "official-3",
    title: "幼稚園概覽",
    subtitle: "查看學校資料與官方更新",
    href: "https://kgp2025.chsc.hk/",
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    source: "edb",
    source_label: "教育局",
    title: "2026/27 學年幼稚園幼兒班（K1）收生安排",
    summary: "教育局整合新學年 K1 收生安排、申請表格及學位空缺入口。",
    date: "1月6日",
    published_at: "2026-01-06T00:00:00+08:00",
    href: "https://www.edb.gov.hk/k1-admission_tc",
  },
  {
    id: "news-2",
    source: "govhk",
    source_label: "政府公報",
    title: "Measures to support kindergartens",
    summary: "教育局回應業界經營壓力，說明幼稚園教育計劃與支援措施。",
    date: "3月18日",
    published_at: "2026-03-18T00:00:00+08:00",
    href: "https://www.info.gov.hk/gia/general/202603/18/P2026031800557.htm",
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
