import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const featuredSchools = [
    {
      href: "/kg?search=%E8%81%96%E4%BF%9D%E7%BE%85%E5%A0%82%E5%B9%BC%E7%A8%9A%E5%9C%92",
      name_tc: "聖保羅堂幼稚園",
      name_en: "ST PAUL'S CHURCH KINDERGARTEN",
      district: "中西區",
      description: "教學中英並用，着重兒童德智體群美五育發展。"
    },
    {
      href: "/kg?search=%E5%98%89%E8%AB%BE%E6%92%92%E8%81%96%E5%BF%83%E5%B9%BC%E7%A8%9A%E5%9C%92",
      name_tc: "嘉諾撒聖心幼稚園",
      name_en: "SACRED HEART CANOSSIAN KINDERGARTEN",
      district: "中西區",
      description: "重視品德與全人發展，提供幼兒基礎學習與校園生活體驗。"
    },
    {
      href: "/kg?search=%E7%9B%88%E6%80%9D%E5%B9%BC%E7%A8%9A%E5%9C%92",
      name_tc: "盈思幼稚園",
      name_en: "WITTY KINDERGARTEN",
      district: "中西區",
      description: "提供幼稚園課程與校本活動，方便家長先了解學校基本資訊。"
    }
  ];

  const vacancyUpdates = [
    { href: "/kg?search=%E8%BF%A6%E5%8D%97%E5%B9%BC%E7%A8%9A%E5%9C%92%EF%BC%88%E4%B8%AD%E7%92%B0%E5%A0%85%E9%81%93%EF%BC%89", school: "迦南幼稚園（中環堅道）", status: "空缺", grade: "細班" },
    { href: "/kg?search=%E6%98%8E%E6%84%9B%E5%A0%85%E5%B0%BC%E5%9C%B0%E5%9F%8E%E5%B9%BC%E5%85%92%E5%AD%B8%E6%A0%A1", school: "明愛堅尼地城幼兒學校", status: "滿額", grade: "細班" },
    { href: "/kg?search=%E7%9B%88%E6%80%9D%E5%B9%BC%E7%A8%9A%E5%9C%92", school: "盈思幼稚園", status: "暫無資訊", grade: "細班" }
  ];

  const communityInsights = [
    { title: "細班面試流程分享", author: "家長A", date: "3週前" },
    { title: "2026年報名截止日期整理", author: "家長B", date: "2週前" },
    { title: "各區學費比較表", author: "家長C", date: "1週前" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8">
      {/* a) Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 mb-4">
          為您的孩子，探索全港優質教育資源。
        </h1>
        <p className="text-lg text-slate-600 mt-4 mb-8 max-w-2xl">
          一站式查看香港幼稚園空缺、截止日期和家長面試心得，幫助您作出最適合的選擇。
        </p>

        {/* Search bar with inline button */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="搜尋學校名稱、地區…"
            className="flex-1 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 placeholder-slate-400 focus:outline-none focus:border-slate-400"
          />
          <Link href="/kg">
            <Button variant="primary" className="px-8 py-3">立即搜索</Button>
          </Link>
        </div>

        {/* Quick filter pills */}
        <div className="flex flex-wrap gap-2">
          <Link href="/kg?district=central-western" className="inline-block">
            <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm transition">
              中西區
            </button>
          </Link>
          <Link href="/kg?district=kowloon-city" className="inline-block">
            <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm transition">
              九龍城區
            </button>
          </Link>
          <Link href="/kg?type=international" className="inline-block">
            <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm transition">
              國際學校
            </button>
          </Link>
        </div>

        {/* Right side stat card */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 w-fit">
          <div className="text-3xl font-bold text-slate-950">1,240+</div>
          <p className="text-sm text-slate-500 mt-1">已收錄學校</p>
        </div>
      </section>

      {/* b) 精選教育機構 */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-950">精選教育機構</h2>
          <Link href="/kg" className="text-slate-600 hover:text-slate-950 text-sm font-medium">
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSchools.map((school) => (
            <Link key={school.name_tc} href={school.href}>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-sm transition-shadow">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                  <span className="text-lg font-semibold text-slate-700">
                    {school.name_tc.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-950 mb-1">{school.name_tc}</h3>
                <p className="text-sm text-slate-500 mb-2">{school.name_en}</p>
                <p className="text-sm text-slate-600 mb-3">{school.description}</p>
                <p className="text-xs text-slate-400">📍 {school.district}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* c) 最新學額狀況 */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-950 mb-6">最新學額狀況</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: 3 vacancy items */}
          <div className="md:col-span-2 space-y-3">
            {vacancyUpdates.map((item, idx) => (
              <Link key={idx} href={item.href} className="block">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                  <div>
                    <p className="font-medium text-slate-950">{item.school}</p>
                    <p className="text-sm text-slate-500">{item.grade}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "空缺"
                        ? "bg-emerald-50 text-emerald-700"
                        : item.status === "候補"
                          ? "bg-amber-50 text-amber-700"
                          : item.status === "暫無資訊"
                          ? "bg-slate-100 text-slate-500"
                          : "bg-red-50 text-red-700"
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-slate-400">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right: Featured dark card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">家長心得與洞察</h3>
            <div className="space-y-3">
              {communityInsights.map((insight, idx) => (
                <div key={idx} className="pb-3 border-b border-slate-700 last:border-0">
                  <p className="text-sm font-medium mb-1">{insight.title}</p>
                  <p className="text-xs text-slate-400">{insight.author} · {insight.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* d) Newsletter CTA */}
      <section className="mb-16 bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-950 mb-4">緊貼最新入學資訊。</h2>
        <p className="text-slate-600 mb-6">訂閱我們的電子報，每週接收最新學額更新及家長心得。</p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="您的電郵地址"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-950 placeholder-slate-400 focus:outline-none focus:border-slate-400"
          />
          <Button variant="primary" className="px-6 py-3">訂閱資訊</Button>
        </div>
      </section>
    </div>
  );
}
