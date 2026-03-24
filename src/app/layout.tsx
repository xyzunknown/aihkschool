import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: {
    default: "HKSchoolPlace — 香港幼稚园搜索平台",
    template: "%s",
  },
  description: "帮助香港家长找到合适的幼稚园，追踪申请截止日期，分享面试情报。",
  metadataBase: new URL("https://aihkschool.vercel.app"),
  openGraph: {
    title: "HKSchoolPlace — 香港幼稚园搜索平台",
    description: "一站式查看香港 713 间幼稚园空缺、截止日期和家长面试情报。",
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
      <body className="antialiased min-h-screen flex flex-col bg-ambient">
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
