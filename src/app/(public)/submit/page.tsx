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
        <div className="text-display mb-4">🎉</div>
        <h1 className="text-h1 text-slate-950 mb-3">感谢您的投稿！</h1>
        <p className="text-body text-slate-500 mb-8">
          您提交的面试情报已收到，审核通过后将展示在学校详情页面。
          确认邮件已发送到您的邮箱。
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={() => router.push("/kg")}>
            浏览学校
          </Button>
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            继续投稿
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-8">
      <h1 className="text-h1 text-slate-950 mb-2">分享面试经验</h1>
      <p className="text-body text-slate-500 mb-8">
        您的经验可以帮助其他家长了解面试情况。投稿经审核后展示。
      </p>
      <IntelSubmitForm onSuccess={() => setSubmitted(true)} />
    </div>
  );
}
