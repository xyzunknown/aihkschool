import type {
  HomeBanner,
  OpenDayItem,
  DeadlineItem,
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
    school_name: "迦南幼稚園（中環堅道）",
    deadline: "4月30日",
    days_left: 5,
    href: "/kg?search=%E8%BF%A6%E5%8D%97%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
  {
    id: "dl-2",
    school_name: "盈思幼稚園",
    deadline: "5月15日",
    days_left: 20,
    href: "/kg?search=%E7%9B%88%E6%80%9D%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
];

export const INSIGHTS: InsightItem[] = [
  {
    id: "ins-1",
    title: "K1 面試只考小朋友，家長在等候室",
    author: "家長A",
    date: "3天前",
    href: "/submit",
  },
  {
    id: "ins-2",
    title: "報名表要親身遞交，唔接受郵寄",
    author: "家長B",
    date: "1週前",
    href: "/submit",
  },
  {
    id: "ins-3",
    title: "面試當日要帶出世紙正本",
    author: "家長C",
    date: "2週前",
    href: "/submit",
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    source: "edb",
    source_label: "教育局",
    title: "2026/27 學年幼稚園幼兒班(K1)收生安排",
    summary: "教育局公佈新學年K1統一收生日程及注意事項。",
    date: "3月20日",
    href: "/kg",
  },
  {
    id: "news-2",
    source: "school",
    source_label: "學校公佈",
    title: "聖保羅堂幼稚園 2026/27 年度招生簡介會",
    summary: "學校將於四月舉辦招生簡介會，歡迎有興趣家長報名參加。",
    date: "3月18日",
    href: "/kg?search=%E8%81%96%E4%BF%9D%E7%BE%85%E5%A0%82%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
  {
    id: "news-3",
    source: "edb",
    source_label: "教育局",
    title: "幼稚園教育計劃學費調整通告",
    summary: "部分參加幼稚園教育計劃的學校學費將有所調整。",
    date: "3月15日",
    href: "/kg",
  },
  {
    id: "news-4",
    source: "school",
    source_label: "學校公佈",
    title: "嘉諾撒聖心幼稚園開放日安排",
    summary: "學校公佈四月份開放日詳情，需提前網上預約。",
    date: "3月12日",
    href: "/kg?search=%E5%98%89%E8%AB%BE%E6%92%92%E8%81%96%E5%BF%83%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
];

export const FEATURED_SCHOOLS: FeaturedSchool[] = [
  {
    id: "st-pauls-church-kg",
    schoolCode: "131466",
    name_tc: "聖保羅堂幼稚園",
    name_en: "St Paul's Church Kindergarten",
    district: "中西區",
    sessionTags: ["全日班"],
    hasN: false,
    href: "/kg?search=%E8%81%96%E4%BF%9D%E7%BE%85%E5%A0%82%E5%B9%BC%E7%A8%9A%E5%9C%92",
  },
  {
    id: "sacred-heart-canossian-kg",
    schoolCode: "131440",
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
