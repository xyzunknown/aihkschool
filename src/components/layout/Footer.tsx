export function Footer() {
  return (
    <footer className="border-t border-slate-200/30 mt-16">
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-950">HKSchoolPlace</p>
            <p className="text-small text-slate-400 mt-1">
              帮助香港家长找到合适的幼稚园
            </p>
          </div>
          <div className="text-small text-slate-400">
            <p>数据来源：教育局 (EDB)、学校官网、家长投稿</p>
            <p className="mt-1">© 2026 HKSchoolPlace. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
