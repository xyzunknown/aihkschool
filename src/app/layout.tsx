import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";

function HeaderFallback() {
  return <div className="h-[73px] border-b border-[rgba(32,85,59,0.08)] bg-[#fffef9]" />;
}

function getMetadataBase() {
  let baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "https://aihkschool.vercel.app";

  if (!baseUrl.startsWith("http")) {
    baseUrl = `https://${baseUrl}`;
  }

  return new URL(baseUrl);
}

export const metadata: Metadata = {
  title: {
    default: "HKSchoolPlace — 香港幼稚園搜尋平台",
    template: "%s | HKSchoolPlace",
  },
  description: "幫助香港家長搵到合適嘅幼稚園，追蹤申請截止日期，分享面試心得。",
  metadataBase: getMetadataBase(),
  openGraph: {
    title: "HKSchoolPlace — 香港幼稚園搜尋平台",
    description: "一站式查看全港幼稚園學額空缺、截止日期同家長面試心得。",
    type: "website",
    locale: "zh_HK",
    siteName: "HKSchoolPlace",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <body className="antialiased min-h-screen flex flex-col bg-white text-ink-900 font-sans">
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={<HeaderFallback />}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
