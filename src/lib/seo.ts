import type { Metadata } from "next";

export const SITE_NAME = "HKSchoolPlace";
export const SITE_DEFAULT_URL = "https://aihkschool.vercel.app";
export const SITE_DESCRIPTION =
  "HKSchoolPlace 幫香港家長搜尋幼稚園、比較學額空缺與學費、追蹤 SmartPLAY 課程和親子活動。";
export const IOS_BUNDLE_ID = "asia.hkschoolplace.app";
export const IOS_APP_NAME = "HKSchoolPlace";
export const DEFAULT_OG_IMAGE = "/brand/Web Logo/Logo.png";

export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    SITE_DEFAULT_URL;
  return raw.startsWith("http") ? raw.replace(/\/$/, "") : `https://${raw.replace(/\/$/, "")}`;
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function canonical(path = "/"): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(path),
    languages: {
      "zh-HK": absoluteUrl(path),
      "x-default": absoluteUrl(path),
    },
  };
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: canonical(path),
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: SITE_NAME,
      locale: "zh_HK",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": 180,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}/#organization`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    description: SITE_DESCRIPTION,
    areaServed: "Hong Kong",
    sameAs: [absoluteUrl("/contact")],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}/#website`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    inLanguage: "zh-HK",
    publisher: { "@id": `${absoluteUrl("/")}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/kg")}?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function mobileAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: IOS_APP_NAME,
    operatingSystem: "iOS",
    applicationCategory: "EducationApplication",
    url: absoluteUrl("/ios-app"),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "HKD",
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd({
  name,
  description,
  items,
}: {
  name: string;
  description: string;
  items: Array<{ name: string; path: string; description?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name,
      description: item.description,
    })),
  };
}
