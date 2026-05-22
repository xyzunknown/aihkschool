import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { CompareBar } from "@/components/compare/CompareBar";
import { ToastProvider } from "@/components/ui/Toast";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ProductAnalytics } from "@/components/analytics/ProductAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_OG_IMAGE,
  IOS_BUNDLE_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  canonical,
  getSiteUrl,
  mobileAppJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

function HeaderFallback() {
  return <div className="h-[73px] border-b border-[rgba(32,85,59,0.08)] bg-[#fffef9]" />;
}

function getMetadataBase() {
  return new URL(getSiteUrl());
}

export const metadata: Metadata = {
  applicationName: SITE_NAME,
  title: {
    default: "HKSchoolPlace — 香港幼稚園搜尋平台",
    template: "%s | HKSchoolPlace",
  },
  description: SITE_DESCRIPTION,
  metadataBase: getMetadataBase(),
  alternates: canonical("/"),
  keywords: [
    "香港幼稚園",
    "幼稚園學額",
    "K1 申請",
    "N 班",
    "SmartPLAY",
    "親子活動",
    "國際幼稚園",
    "幼稚園比較",
  ],
  authors: [{ name: SITE_NAME, url: absoluteUrl("/") }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  appLinks: {
    web: {
      url: absoluteUrl("/"),
      should_fallback: true,
    },
  },
  other: {
    "al:ios:app_name": SITE_NAME,
    "al:ios:bundle_id": IOS_BUNDLE_ID,
  },
  openGraph: {
    title: "HKSchoolPlace — 香港幼稚園搜尋平台",
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "zh_HK",
    siteName: SITE_NAME,
    url: absoluteUrl("/"),
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HKSchoolPlace — 香港幼稚園搜尋平台",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <head>
        <GoogleAnalytics />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-surface-page text-ink-900 font-sans">
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={null}>
              <ProductAnalytics />
            </Suspense>
            <JsonLd data={[organizationJsonLd(), websiteJsonLd(), mobileAppJsonLd()]} />
            <Suspense fallback={<HeaderFallback />}>
              <Header />
            </Suspense>
            <main className="flex-1 pb-20 lg:pb-0">{children}</main>
            <Footer />
            <CompareBar />
            <MobileBottomNav />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
