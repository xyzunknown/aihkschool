import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "資訊消息",
  description: "掌握最新教育資訊、學校活動、升學政策。",
  openGraph: {
    title: "資訊消息",
    description: "掌握最新教育資訊、學校活動、升學政策。",
    images: ["/brand/Web Logo/Logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/Web Logo/Logo.png"],
  },
};

export default function NewsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
