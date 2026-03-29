"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RankingCard } from "@/components/schools/RankingCard";
import { Button } from "@/components/ui/Button";
import { DISTRICT_LABELS } from "@/lib/utils";
import type { HeatRankingItem } from "@/types/database";

const PAGE_SIZE = 20;

interface RankingClientProps {
  initialData: HeatRankingItem[];
  initialCount: number;
}

export default function RankingClient({ initialData, initialCount }: RankingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDistrict = searchParams.get("district") ?? null;
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const totalPages = Math.ceil(initialCount / PAGE_SIZE);

  const pillBase = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors";
  const pillActive = "bg-slate-950 text-white";
  const pillInactive = "bg-white text-slate-600 border border-slate-200";

  const handleDistrictChange = (district: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (district) {
      params.set("district", district);
    } else {
      params.delete("district");
    }
    params.delete("page");
    router.push(`/kg/ranking?${params.toString()}`);
  };

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/kg/ranking?${params.toString()}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/kg")}
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          ← 返回
        </button>
        <h1 className="text-xl font-bold text-slate-950">社交平台熱度排行</h1>
      </div>

      {/* District pills */}
      <div className="overflow-x-auto flex gap-2 pb-3 mb-6 hide-scrollbar">
        <button
          onClick={() => handleDistrictChange(null)}
          className={`${pillBase} whitespace-nowrap ${!selectedDistrict ? pillActive : pillInactive}`}
        >
          全港
        </button>
        {Object.entries(DISTRICT_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleDistrictChange(key)}
            className={`${pillBase} whitespace-nowrap ${selectedDistrict === key ? pillActive : pillInactive}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Ranking list */}
      {initialData.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl font-semibold text-slate-950 mb-2">暫無排行數據</p>
          <p className="text-base text-slate-500">社交平台數據尚未就緒</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {initialData.map((item, index) => (
              <RankingCard
                key={item.school_id}
                item={item}
                rank={(page - 1) * PAGE_SIZE + index + 1}
              />
            ))}
          </div>

          <p className="text-xs text-slate-400 mt-6">數據來源：網絡公開內容整理，僅供參考</p>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
                上一頁
              </Button>
              <span className="flex items-center text-sm text-slate-400 px-3">
                第 {page} 頁 / 共 {totalPages} 頁
              </span>
              <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>
                下一頁
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
