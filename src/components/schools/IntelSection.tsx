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
      <h2 className="text-label text-slate-400 uppercase mb-4">
        申请情报 {intelCount > 0 && `(${intelCount})`}
      </h2>
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
              查看全部 {intelCount} 条情报
            </button>
          )}
        </div>
      ) : (
        <GlassCard>
          <p className="text-body text-slate-400 text-center">
            暂无面试情报，成为第一个分享经验的家长吧！
          </p>
          <div className="text-center mt-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/submit")}>
              分享经验
            </Button>
          </div>
        </GlassCard>
      )}
    </section>
  );
}
