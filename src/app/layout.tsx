import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: {
    default: "HKSchoolPlace — 香港幼稚園搜尋平台",
    template: "%s | HKSchoolPlace",
  },
  description: "幫助香港家長搵到合適嘅幼稚園，追蹤申請截止日期，分享面試心得。",
  metadataBase: new URL("https://aihkschool.vercel.app"),
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
      <body className="antialiased min-h-screen flex flex-col bg-slate-50">
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
