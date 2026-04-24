interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}

export function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
          {description}
        </p>
        <p className="mt-4 text-xs text-slate-400">最後更新：{updatedAt}</p>
      </div>

      <div className="space-y-5">
        {sections.map((section) => (
          <section key={section.heading} className="rounded-3xl border border-slate-200 bg-white p-7 md:p-8">
            <h2 className="text-lg font-semibold text-slate-950">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-slate-600 md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}