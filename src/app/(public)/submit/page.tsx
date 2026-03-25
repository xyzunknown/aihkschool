"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { IntelSubmitForm } from "@/components/schools/IntelSubmitForm";

export default function SubmitPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-5 md:px-8 py-16 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-slate-950 mb-3">多謝您嘅分享！</h1>
        <p className="text-base text-slate-600 mb-8">
          您提交嘅面試心得已收到，審核通過後將展示喺學校詳情頁面。
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={() => router.push("/kg")}>
            瀏覽學校
          </Button>
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            繼續分享
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-950 mb-2">分享面試心得</h1>
      <p className="text-base text-slate-600 mb-8">
        您嘅經驗可以幫助其他家長了解面試情況。心得經審核後展示。
      </p>
      <IntelSubmitForm onSuccess={() => setSubmitted(true)} />
    </div>
  );
}
