import Image from "next/image";
import { notFound } from "next/navigation";
import { getVisibleTopic } from "@/lib/growth/topics";

export const dynamic = "force-dynamic";

function paragraphs(body: string) {
  return body.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
}

export default async function TopicDetailPage({ params }: { params: { slug: string } }) {
  const topic = await getVisibleTopic(params.slug);
  if (!topic) notFound();

  return (
    <main className="min-h-screen bg-white">
      <article>
        <header className="border-b border-surface-border bg-cream-50">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-teal-700">選校專題</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-900">{topic.title}</h1>
            {topic.summary ? <p className="mt-4 text-base leading-7 text-ink-700">{topic.summary}</p> : null}
          </div>
          {topic.hero_image_url ? <div className="relative h-72 w-full"><Image src={topic.hero_image_url} alt="" fill unoptimized className="object-cover" /></div> : null}
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          {paragraphs(topic.body_md).length ? (
            <div className="space-y-5 text-base leading-8 text-ink-700">
              {paragraphs(topic.body_md).map((paragraph, index) => paragraph.startsWith("## ") ? (
                <h2 key={index} className="pt-4 text-xl font-bold text-ink-900">{paragraph.replace(/^##\s+/, "")}</h2>
              ) : paragraph.startsWith("- ") ? (
                <ul key={index} className="list-disc space-y-2 pl-5">{paragraph.split("\n").map((line) => <li key={line}>{line.replace(/^-\s+/, "")}</li>)}</ul>
              ) : (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-dashed border-surface-border bg-cream-50 px-6 py-10 text-center text-sm text-ink-500">內容整理中。</div>
          )}
        </div>
      </article>
    </main>
  );
}
