import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "IP 品牌视觉实验",
  description: "以 HKSchoolPlace 猫头鹰 IP 延展移动端品牌视觉、活动页和海报方向。",
};

const mascotBase = "/brand/mascot";

const brandTokens = [
  { name: "Forest", value: "#20553B", text: "信任、教育、长期陪伴" },
  { name: "Sunrise", value: "#F3B64A", text: "提醒、机会、行动感" },
  { name: "Coral", value: "#E86F51", text: "活动、重点、情绪温度" },
  { name: "Sky", value: "#7CB7D8", text: "搜索、信息、轻松感" },
  { name: "Ink", value: "#23332D", text: "正文、清晰、专业" },
];

const phoneScreens = [
  {
    title: "版本 A｜择校雷达",
    subtitle: "主页面 / 搜索入口",
    mascot: `${mascotBase}/02_owl_magnifying_glass.png`,
    theme: "bg-[#F7FBF8]",
    accent: "bg-[#20553B]",
    soft: "bg-[#E9F3ED]",
    screen: "radar",
  },
  {
    title: "版本 B｜申请管家",
    subtitle: "任务页 / 截止提醒",
    mascot: `${mascotBase}/01_owl_calendar.png`,
    theme: "bg-[#FFF8EA]",
    accent: "bg-[#D97935]",
    soft: "bg-[#FFE9B8]",
    screen: "planner",
  },
  {
    title: "版本 C｜开放日活动",
    subtitle: "运营活动页 / 报名转化",
    mascot: `${mascotBase}/03_owl_star.png`,
    theme: "bg-[#F4F8FF]",
    accent: "bg-[#2F6E9E]",
    soft: "bg-[#DDEEFF]",
    screen: "campaign",
  },
  {
    title: "版本 D｜分享海报",
    subtitle: "社交传播 / 家长转发",
    mascot: `${mascotBase}/05_owl_pointing_button.png`,
    theme: "bg-[#FFF4F0]",
    accent: "bg-[#B84D39]",
    soft: "bg-[#FFD9CD]",
    screen: "poster",
  },
];

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/brand/Web Logo/Logo.png"
        alt="HKSchoolPlace"
        width={36}
        height={36}
        className="h-9 w-9 rounded-[8px] object-contain"
      />
      <div>
        <p className="text-sm font-semibold leading-tight text-[#1F2A24]">HKSchoolPlace</p>
        <p className="text-[11px] font-medium text-[#6B766F]">小梟陪你揀學校</p>
      </div>
    </div>
  );
}

function BrandBoard() {
  return (
    <section className="border-b border-[#E6ECE5] bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[0.85fr_1.15fr] md:px-8">
        <div className="space-y-6">
          <LogoMark />
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2F7D55]">
              Lovart brand route
            </p>
            <h1 className="max-w-xl text-3xl font-semibold leading-tight text-[#1F2A24] md:text-5xl">
              把一只猫头鹰 IP 延展成完整移动端视觉系统
            </h1>
            <p className="max-w-xl text-base leading-8 text-[#506158]">
              方向是“可靠的升学陪伴者”：保留教育平台的可信感，同时让猫头鹰角色承担搜索、
              提醒、鼓励和行动引导四种情绪。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {["IP 角色", "品牌规范", "APP 页面", "活动海报"].map((item) => (
              <div key={item} className="rounded-[8px] border border-[#E6ECE5] bg-[#F8FAF7] px-4 py-3">
                <p className="font-semibold text-[#20553B]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 rounded-[8px] bg-[#F8FAF7] p-4 md:grid-cols-[0.95fr_1.05fr]">
          <div className="flex min-h-[300px] items-end justify-center rounded-[8px] bg-[#E9F3ED] p-6">
            <Image
              src={`${mascotBase}/00_original_owl.png`}
              alt="猫头鹰 IP"
              width={280}
              height={280}
              className="max-h-[280px] w-full max-w-[280px] object-contain drop-shadow-[0_18px_28px_rgba(32,85,59,0.18)]"
            />
          </div>
          <div className="space-y-3">
            {brandTokens.map((token) => (
              <div key={token.name} className="flex items-center gap-3 rounded-[8px] bg-white p-3 shadow-soft">
                <div className="h-11 w-11 rounded-[8px]" style={{ backgroundColor: token.value }} />
                <div>
                  <p className="text-sm font-semibold text-[#1F2A24]">{token.name}</p>
                  <p className="text-xs leading-5 text-[#6B766F]">{token.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AppShell({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
}) {
  return (
    <div className="rounded-[30px] bg-[#202822] p-2 shadow-[0_24px_50px_rgba(31,42,36,0.20)]">
      <div className={`h-[690px] w-[318px] overflow-hidden rounded-[24px] ${theme}`}>
        <div className="mx-auto mt-3 h-1.5 w-20 rounded-full bg-black/15" />
        {children}
      </div>
    </div>
  );
}

function RadarScreen({ mascot, accent, soft }: { mascot: string; accent: string; soft: string }) {
  return (
    <div className="px-5 pb-5 pt-4">
      <div className="flex items-center justify-between">
        <LogoMark />
        <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-bold text-[#20553B]">
          3
        </div>
      </div>
      <div className="mt-6 rounded-[8px] bg-white p-4 shadow-card">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#2F7D55]">今日推薦</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#1F2A24]">
              幫你搵到
              <br />
              合適幼稚園
            </h2>
          </div>
          <Image src={mascot} alt="" width={96} height={96} className="h-24 w-24 object-contain" />
        </div>
        <div className="mt-4 rounded-[8px] bg-[#F2F7EE] px-3 py-3 text-sm font-medium text-[#506158]">
          地區、學費、課程特色一次篩選
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {["K1 空缺", "開放日", "學費比較", "家長心得"].map((item, index) => (
          <div key={item} className={`rounded-[8px] p-3 ${index === 0 ? accent : "bg-white"} shadow-soft`}>
            <p className={`text-sm font-semibold ${index === 0 ? "text-white" : "text-[#1F2A24]"}`}>{item}</p>
            <p className={`mt-2 text-2xl font-bold ${index === 0 ? "text-white" : "text-[#20553B]"}`}>
              {["128", "42", "6", "89"][index]}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-[8px] bg-white p-4 shadow-soft">
        <p className="text-sm font-semibold text-[#1F2A24]">附近熱門</p>
        {["維多利亞幼兒園", "聖保羅堂幼稚園", "迦南幼稚園"].map((school, index) => (
          <div key={school} className="mt-3 flex items-center justify-between rounded-[8px] bg-[#F8FAF7] px-3 py-2">
            <span className="text-xs font-medium text-[#3F4B44]">{school}</span>
            <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${index === 0 ? soft : "bg-white"}`}>
              {index === 0 ? "有位" : "比較"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannerScreen({ mascot, accent, soft }: { mascot: string; accent: string; soft: string }) {
  const steps = ["填寫心水學校", "預約開放日", "準備面試檔案", "提交申請"];
  return (
    <div className="px-5 pb-5 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-[#A46612]">2026 入學時間線</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#1F2A24]">申請不再漏</h2>
        </div>
        <Image src={mascot} alt="" width={80} height={80} className="h-20 w-20 object-contain" />
      </div>
      <div className={`mt-5 rounded-[8px] ${accent} p-4 text-white shadow-card`}>
        <p className="text-sm font-semibold">下個截止日</p>
        <p className="mt-2 text-3xl font-bold">12 月 18 日</p>
        <p className="mt-2 text-xs text-white/80">灣仔區 4 間學校即將截止</p>
      </div>
      <div className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 rounded-[8px] bg-white p-3 shadow-soft">
            <div className={`grid h-9 w-9 place-items-center rounded-[8px] text-sm font-bold ${index < 2 ? accent : soft}`}>
              <span className={index < 2 ? "text-white" : "text-[#8E5F1E]"}>{index + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1F2A24]">{step}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F4ECD8]">
                <div className={`h-full rounded-full ${index < 2 ? accent : "bg-[#EADFC1]"}`} style={{ width: `${index < 2 ? 78 : 24}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 w-full rounded-[8px] bg-[#20553B] py-3 text-center text-sm font-bold text-white shadow-soft">
        生成本週任務
      </div>
    </div>
  );
}

function CampaignScreen({ mascot, accent, soft }: { mascot: string; accent: string; soft: string }) {
  return (
    <div className="px-5 pb-5 pt-4">
      <div className={`rounded-[8px] ${accent} px-4 pb-3 pt-4 text-white shadow-card`}>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Open Day Week</p>
        <h2 className="mt-2 text-[28px] font-semibold leading-tight">名幼開放日<br />快速配對</h2>
        <div className="mt-3 flex items-end justify-between">
          <p className="max-w-[145px] text-sm leading-6 text-white/85">小梟根據地區、學費和課程幫你排序。</p>
          <Image src={mascot} alt="" width={96} height={96} className="h-24 w-24 object-contain" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["港島", "九龍", "新界"].map((area, index) => (
          <div key={area} className={`rounded-[8px] px-3 py-2.5 text-center text-sm font-bold ${index === 1 ? accent : "bg-white text-[#2F6E9E]"}`}>
            <span className={index === 1 ? "text-white" : ""}>{area}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {["上午 10:00｜校園導賞", "下午 2:30｜課程簡介", "晚上 8:00｜家長 Q&A"].map((item, index) => (
          <div key={item} className="rounded-[8px] bg-white p-3 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#1F2A24]">{item}</p>
              <span className={`rounded-full px-2 py-1 text-[10px] font-bold text-[#2F6E9E] ${index === 0 ? soft : "bg-[#F4F8FF]"}`}>
                可報名
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#6B766F]">已為你標記交通、學費和面試重點。</p>
          </div>
        ))}
      </div>
      <div className="mt-3 w-full rounded-[8px] bg-[#F3B64A] py-3 text-center text-sm font-bold text-[#23332D] shadow-soft">
        一鍵加入行程
      </div>
    </div>
  );
}

function PosterScreen({ mascot, accent, soft }: { mascot: string; accent: string; soft: string }) {
  return (
    <div className="flex h-full flex-col px-5 pb-5 pt-4">
      <LogoMark />
      <div className="mt-4 flex-1 rounded-[8px] bg-white p-5 shadow-card">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B84D39]">Parent Share Card</p>
        <h2 className="mt-3 text-[34px] font-bold leading-tight text-[#23332D]">
          3 分鐘
          <br />
          找出心水
          <br />
          幼稚園
        </h2>
        <div className="mt-4 flex justify-center">
          <div className={`rounded-full ${soft} p-4`}>
            <Image src={mascot} alt="" width={152} height={152} className="h-[152px] w-[152px] object-contain" />
          </div>
        </div>
        <div className={`mt-4 rounded-[8px] ${accent} p-3 text-white`}>
          <p className="text-sm font-semibold">今日完成</p>
          <p className="mt-1 text-3xl font-bold">18 間比較</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["學費", "距離", "空缺", "口碑"].map((item) => (
            <div key={item} className="rounded-[8px] bg-[#FFF4F0] px-3 py-2 text-center text-xs font-bold text-[#B84D39]">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 w-full rounded-[8px] bg-[#20553B] py-3 text-center text-sm font-bold text-white">
        分享給另一位家長
      </div>
    </div>
  );
}

function PhonePreview({ item }: { item: (typeof phoneScreens)[number] }) {
  return (
    <article className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h3 className="text-base font-semibold text-[#1F2A24]">{item.title}</h3>
        <p className="mt-1 text-xs font-medium text-[#6B766F]">{item.subtitle}</p>
      </div>
      <AppShell theme={item.theme}>
        {item.screen === "radar" && <RadarScreen mascot={item.mascot} accent={item.accent} soft={item.soft} />}
        {item.screen === "planner" && <PlannerScreen mascot={item.mascot} accent={item.accent} soft={item.soft} />}
        {item.screen === "campaign" && <CampaignScreen mascot={item.mascot} accent={item.accent} soft={item.soft} />}
        {item.screen === "poster" && <PosterScreen mascot={item.mascot} accent={item.accent} soft={item.soft} />}
      </AppShell>
    </article>
  );
}

export default function MascotLabPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF5]">
      <BrandBoard />
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2F7D55]">mobile concepts</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#1F2A24]">4 个可继续落地的移动端方向</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#6B766F]">
            这组画面按 Lovart 完整链路整理：先定 IP 和 LOGO，再扩展为视觉规范，最后落到 APP、任务页、活动页和传播海报。
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 2xl:grid-cols-4">
          {phoneScreens.map((item) => (
            <PhonePreview key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
