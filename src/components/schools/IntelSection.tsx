"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IntelCard } from "@/components/schools/IntelCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import type { AdmissionIntel, InterviewType, ApplicationResult } from "@/types/database";

interface IntelSectionProps {
  schoolId: string;
  initialIntel: AdmissionIntel[];
  intelCount: number;
}

export function IntelSection({ schoolId, initialIntel, intelCount }: IntelSectionProps) {
  const router = useRouter();
  const { requireAuth } = useAuth();
  const { showToast } = useToast();
  const [allIntel, setAllIntel] = useState(initialIntel);
  const [showAllIntel, setShowAllIntel] = useState(false);

  const handleHelpful = async (intelId: string) => {
    requireAuth(async () => {
      try {
        await fetch(`/api/intel/${intelId}/helpful`, { method: "POST" });
        setAllIntel((prev) =>
          prev.map((item) =>
            item.id === intelId
              ? { ...item, helpful_count: item.helpful_count + 1 }
              : item
          )
        );
      } catch {
        showToast({ message: "操作失败" });
      }
    });
  };

  const loadAllIntel = async () => {
    try {
      const res = await fetch(`/api/intel/school/${schoolId}?limit=100`);
      const json = await res.json();
      if (json.data) {
        setAllIntel(json.data);
        setShowAllIntel(true);
      }
    } catch {
      showToast({ message: "加载失败" });
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-950">
          家長心得與評價 {intelCount > 0 && `(${intelCount})`}
        </h2>
        <button
          onClick={() => requireAuth(() => router.push("/submit"))}
          className="text-sm text-slate-500 hover:text-slate-900 underline"
        >
          撰寫評論
        </button>
      </div>
      {allIntel.length > 0 ? (
        <div className="space-y-4">
          {allIntel.map((intel) => (
            <IntelCard
              key={intel.id}
              academicYear={intel.academic_year}
              gradeApplied={intel.grade_applied}
              interviewType={intel.interview_type as InterviewType}
              interviewLanguage={intel.interview_language}
              queueTime={intel.queue_time}
              hasSecondInterview={intel.has_second_interview}
              offerMonth={intel.offer_month}
              applicationResult={intel.application_result as ApplicationResult}
              notes={intel.notes}
              helpfulCount={intel.helpful_count}
              onHelpful={() => handleHelpful(intel.id)}
            />
          ))}
          {!showAllIntel && intelCount > 3 && (
            <button
              onClick={loadAllIntel}
              className="w-full text-center text-sm text-slate-500 hover:text-slate-700 py-3"
            >
              查看全部 {intelCount} 條心得
            </button>
          )}
        </div>
      ) : (
        <GlassCard>
          <p className="text-base text-slate-900 text-center">
            暫無面試心得，成為第一個分享經驗嘅家長！
          </p>
          <div className="text-center mt-4">
            <Button variant="secondary" size="sm" onClick={() => requireAuth(() => router.push("/submit"))}>
              分享經驗
            </Button>
          </div>
        </GlassCard>
      )}
    </section>
  );
}
