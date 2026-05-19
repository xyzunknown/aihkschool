import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "移动端 UI 设计要求",
  description: "HKSchoolPlace 小象 IP 品牌视觉与三套移动端模板。",
};

const mascot = "/brand/mascot";

const sets = [
  {
    id: "set-a",
    name: "模板 A｜清爽搜索型",
    note: "适合主站首页和日常找学校流程，重点是搜索、筛选和收藏转化。",
    bg: "from-[#F7FBF8] to-[#EEF6F1]",
    ink: "#17392B",
    brand: "#245B3E",
    soft: "#E8F3EC",
    warm: "#F4B84D",
    coral: "#E36F58",
  },
  {
    id: "set-b",
    name: "模板 B｜天空陪伴型",
    note: "适合新用户引导和亲子感更强的入口，信息更轻、更像智能助手。",
    bg: "from-[#F5FAFF] to-[#E7F2FB]",
    ink: "#1C3442",
    brand: "#2E6E91",
    soft: "#DDEFFC",
    warm: "#F3C45E",
    coral: "#EB765D",
  },
  {
    id: "set-c",
    name: "模板 C｜高级任务型",
    note: "适合强调专业度、申请节奏和高价值服务，视觉更稳重。",
    bg: "from-[#F8F3EA] to-[#EFE7D8]",
    ink: "#253226",
    brand: "#1F4F37",
    soft: "#EAE2D0",
    warm: "#DDA84A",
    coral: "#BF5946",
  },
];

const schoolImages = [
  "/brand/schools/sample-1.jpg",
  "/brand/schools/sample-2.jpg",
  "/brand/schools/sample-3.jpg",
];

function MiniLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/brand/Web Logo/Logo.png" alt="HKSchoolPlace" width={34} height={34} className="h-8 w-8 object-contain" />
      <div>
        <p className="text-[13px] font-bold leading-none text-[#1D382B]">HKSchoolPlace</p>
        <p className="mt-1 text-[10px] font-medium text-[#6B7A70]">小象申請助手</p>
      </div>
    </div>
  );
}

function BottomNav({ active, brand }: { active: string; brand: string }) {
  const items = ["找幼稚園", "康體通", "活動", "資訊", "我的"];
  return (
    <div className="absolute bottom-0 left-0 right-0 grid h-[58px] grid-cols-5 border-t border-black/5 bg-white/92 px-2 backdrop-blur">
      {items.map((item) => (
        <div key={item} className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold" style={{ color: item === active ? brand : "#8A958E" }}>
          <span className="h-4 w-4 rounded-full" style={{ background: item === active ? brand : "#DDE5DE" }} />
          {item}
        </div>
      ))}
    </div>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[30px] bg-[#171D1A] p-2 shadow-[0_24px_44px_rgba(25,35,30,.22)]">
      <div className="relative h-[660px] w-[310px] overflow-hidden rounded-[24px] bg-white">
        <div className="absolute left-1/2 top-3 z-10 h-1.5 w-20 -translate-x-1/2 rounded-full bg-black/14" />
        {children}
      </div>
    </div>
  );
}

function HomeScreen({ s }: { s: (typeof sets)[number] }) {
  return (
    <Phone>
      <div className={`h-full bg-gradient-to-b ${s.bg} px-5 pb-[70px] pt-9`}>
        <MiniLogo />
        <div className="mt-7 flex items-start justify-between">
          <div>
            <h3 className="text-[30px] font-black leading-tight" style={{ color: s.ink }}>
              找幼稚園
            </h3>
            <p className="mt-2 max-w-[160px] text-[12px] leading-5 text-[#617168]">睇空缺、學費、距離和口碑，一次完成初步篩選。</p>
          </div>
          <Image src={`${mascot}/03_elephant_search_home.png`} alt="" width={92} height={92} className="h-[92px] w-[92px] object-contain" />
        </div>
        <div className="mt-5 rounded-[8px] bg-white px-4 py-3 shadow-[0_12px_26px_rgba(33,66,48,.10)]">
          <p className="text-[12px] font-bold text-[#93A098]">輸入地區 / 學校名稱</p>
        </div>
        <div className="mt-4 w-full rounded-[8px] py-3 text-center text-[14px] font-black text-white shadow-[0_10px_22px_rgba(31,80,55,.22)]" style={{ background: s.brand }}>
          立即搜尋幼稚園
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2 rounded-[8px] bg-white/75 p-3">
          {["九龍城", "油尖旺", "港島東", "屯門", "K1", "K2", "K3", "直資"].map((x) => (
            <span key={x} className="rounded-full px-2 py-2 text-center text-[10px] font-bold" style={{ background: s.soft, color: s.brand }}>
              {x}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-[8px] p-4" style={{ background: s.soft }}>
          <Image src={`${mascot}/02_elephant_wave_hero.png`} alt="" width={56} height={56} className="h-14 w-14 object-contain" />
          <div>
            <p className="text-[13px] font-black" style={{ color: s.ink }}>小貼士</p>
            <p className="mt-1 text-[11px] leading-5 text-[#627168]">先收藏 3-5 間學校，再比較申請時間。</p>
          </div>
        </div>
      </div>
      <BottomNav active="找幼稚園" brand={s.brand} />
    </Phone>
  );
}

function SearchScreen({ s }: { s: (typeof sets)[number] }) {
  return (
    <Phone>
      <div className={`h-full bg-gradient-to-b ${s.bg} px-4 pb-[70px] pt-9`}>
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-black" style={{ color: s.ink }}>學校結果</h3>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold" style={{ color: s.brand }}>篩選</span>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-[8px] bg-white p-3 shadow-[0_12px_26px_rgba(33,66,48,.10)]">
          <Image src={`${mascot}/03_elephant_search_home.png`} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
          <div>
            <p className="text-[13px] font-black" style={{ color: s.ink }}>為你找到 128 間學校</p>
            <p className="mt-1 text-[11px] text-[#6D7A72]">可按距離、學費、口碑和空缺排序</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["地區", "學費", "空缺", "全部", "K1", "K2", "K3"].map((tag, i) => (
            <span key={tag} className="rounded-full px-3 py-1.5 text-[11px] font-bold" style={{ background: i === 0 ? s.brand : "#fff", color: i === 0 ? "#fff" : s.brand }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {["明慧幼稚園", "快樂天地幼稚園", "培正幼稚園"].map((name, i) => (
            <div key={name} className="rounded-[8px] bg-white p-3 shadow-[0_10px_24px_rgba(33,66,48,.10)]">
              <div className="flex gap-3">
                <Image src={schoolImages[i]} alt="" width={74} height={58} className="h-[58px] w-[74px] rounded-[6px] object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-[13px] font-black" style={{ color: s.ink }}>{name}</p>
                    <span className="text-[15px]" style={{ color: i === 1 ? s.coral : "#C8D0CA" }}>♥</span>
                  </div>
                  <p className="mt-1 text-[10px] text-[#758178]">九龍城 · 半日班 / 全日班</p>
                  <div className="mt-2 flex gap-1">
                    {["K1 有位", "K2 少量", "K3 滿額"].map((x, n) => (
                      <span key={x} className="rounded-full px-2 py-1 text-[9px] font-black" style={{ background: n === 2 ? "#FDE6DE" : s.soft, color: n === 2 ? s.coral : s.brand }}>{x}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 w-full rounded-[8px] py-3 text-center text-[13px] font-black text-white" style={{ background: s.brand }}>加入對比</div>
      </div>
      <BottomNav active="找幼稚園" brand={s.brand} />
    </Phone>
  );
}

function ProgrammeScreen({ s }: { s: (typeof sets)[number] }) {
  return (
    <Phone>
      <div className={`h-full bg-gradient-to-b ${s.bg} px-5 pb-[70px] pt-9`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[.12em]" style={{ color: s.brand }}>康體通</p>
            <h3 className="mt-1 text-[26px] font-black leading-tight" style={{ color: s.ink }}>活動報名<br />一頁跟進</h3>
          </div>
          <Image src={`${mascot}/06_elephant_celebration_success.png`} alt="" width={88} height={88} className="h-[88px] w-[88px] object-contain" />
        </div>
        <div className="mt-5 rounded-[8px] p-4 text-white shadow-[0_14px_28px_rgba(33,66,48,.16)]" style={{ background: s.brand }}>
          <p className="text-[12px] font-bold text-white/80">今日可報名</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-[34px] font-black">24</p>
            <p className="pb-1 text-[12px] font-bold text-white/80">音樂 / 運動 / STEM</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {["音樂班", "游泳班", "STEM", "繪畫"].map((x, i) => (
            <div key={x} className="rounded-[8px] bg-white p-3 shadow-[0_10px_20px_rgba(33,66,48,.08)]">
              <span className="block h-9 w-9 rounded-[8px]" style={{ background: i % 2 ? s.soft : s.warm }} />
              <p className="mt-3 text-[13px] font-black" style={{ color: s.ink }}>{x}</p>
              <p className="mt-1 text-[10px] text-[#6D7A72]">附近 6 個名額</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-[8px] bg-white p-4">
          <p className="text-[13px] font-black" style={{ color: s.ink }}>下次提醒</p>
          <div className="mt-3 flex items-center justify-between rounded-[8px] px-3 py-3" style={{ background: s.soft }}>
            <span className="text-[12px] font-bold" style={{ color: s.brand }}>週五 09:00</span>
            <span className="text-[12px] font-black" style={{ color: s.coral }}>熱門課程開報</span>
          </div>
        </div>
      </div>
      <BottomNav active="康體通" brand={s.brand} />
    </Phone>
  );
}

function FavoriteScreen({ s }: { s: (typeof sets)[number] }) {
  return (
    <Phone>
      <div className={`h-full bg-gradient-to-b ${s.bg} px-4 pb-[70px] pt-9`}>
        <div className="flex items-center justify-between">
          <h3 className="text-[22px] font-black" style={{ color: s.ink }}>我的</h3>
          <Image src={`${mascot}/04_elephant_checklist_collection_compare.png`} alt="" width={64} height={64} className="h-16 w-16 object-contain" />
        </div>
        <div className="mt-3 rounded-[8px] p-4" style={{ background: s.soft }}>
          <p className="text-[12px] font-bold" style={{ color: s.brand }}>已收藏 3 間學校</p>
          <p className="mt-1 text-[11px] text-[#6D7A72]">可加入對比、追蹤申請狀態。</p>
        </div>
        <div className="mt-4 space-y-3">
          {["明慧幼稚園", "快樂天地幼稚園", "真光幼稚園"].map((name, i) => (
            <div key={name} className="rounded-[8px] bg-white p-3 shadow-[0_10px_24px_rgba(33,66,48,.10)]">
              <div className="flex gap-3">
                <Image src={schoolImages[i]} alt="" width={76} height={58} className="h-[58px] w-[76px] rounded-[6px] object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-[13px] font-black" style={{ color: s.ink }}>{name}</p>
                    <span style={{ color: s.coral }}>♥</span>
                  </div>
                  <p className="mt-1 text-[10px] text-[#738078]">九龍城 · 口碑高</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8EEE9]">
                    <div className="h-full rounded-full" style={{ width: `${76 - i * 18}%`, background: s.brand }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-[8px] bg-white p-4">
          <p className="text-[13px] font-black" style={{ color: s.ink }}>申請進度</p>
          {["準備文件", "預約開放日", "提交申請"].map((x, i) => (
            <div key={x} className="mt-3 flex items-center justify-between text-[12px]">
              <span className="font-bold text-[#5F6F64]">{x}</span>
              <span className="font-black" style={{ color: i === 2 ? s.coral : s.brand }}>{i === 2 ? "未開始" : "已完成"}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="我的" brand={s.brand} />
    </Phone>
  );
}

function TemplateSet({ s, index }: { s: (typeof sets)[number]; index: number }) {
  return (
    <section id={s.id} className="min-h-screen border-b border-[#E8ECE5] bg-[#F7F4EC] px-6 py-10">
      <div className="mx-auto max-w-[1460px]">
        <div className="mb-6 text-center">
          <h2 className="text-[26px] font-black" style={{ color: s.brand }}>HKSchoolPlace 小象申請助手工作流 {index + 1}</h2>
          <p className="mt-2 text-[14px] font-medium text-[#68756D]">{s.name}｜{s.note}</p>
        </div>
        <div className="grid grid-cols-4 gap-8">
          <div><HomeScreen s={s} /><p className="mt-4 text-center text-[13px] font-bold text-[#526158]">① APP 首页</p></div>
          <div><SearchScreen s={s} /><p className="mt-4 text-center text-[13px] font-bold text-[#526158]">② 学校筛选页</p></div>
          <div><ProgrammeScreen s={s} /><p className="mt-4 text-center text-[13px] font-bold text-[#526158]">③ 康体通</p></div>
          <div><FavoriteScreen s={s} /><p className="mt-4 text-center text-[13px] font-bold text-[#526158]">④ 个人收藏</p></div>
        </div>
      </div>
    </section>
  );
}

function BrandBoard() {
  return (
    <section className="bg-white px-6 py-10">
      <div className="mx-auto grid max-w-[1460px] grid-cols-[1fr_1.2fr] gap-10">
        <div className="flex flex-col justify-center">
          <MiniLogo />
          <p className="mt-8 text-[12px] font-black uppercase tracking-[.18em] text-[#2F7D55]">Lovart brand system</p>
          <h1 className="mt-3 text-[44px] font-black leading-tight text-[#1D382B]">从小象 IP 到 3 套移动端模板</h1>
          <p className="mt-5 max-w-xl text-[16px] leading-8 text-[#5D6B62]">先用 Lovart 做品牌视觉方向，再围绕真实产品功能落到 APP 首页、学校筛选、康体通和个人收藏页面。</p>
        </div>
        <div className="grid grid-cols-[.9fr_1fr] gap-5 rounded-[8px] bg-[#F4F8F3] p-5">
          <div className="flex items-end justify-center rounded-[8px] bg-[#E8F3EC] p-8">
            <Image src={`${mascot}/04_elephant_checklist_collection_compare.png`} alt="小象 IP" width={270} height={270} className="h-[270px] w-[270px] object-contain" />
          </div>
          <div className="grid gap-3">
            {[
              ["Forest", "#245B3E", "可信、教育、长期陪伴"],
              ["Sky", "#A9D8F2", "搜索、信息、轻松感"],
              ["Sunrise", "#F3C45E", "提醒、机会、行动"],
              ["Coral", "#E36F58", "活动、重点、转化"],
            ].map(([name, color, text]) => (
              <div key={name} className="flex items-center gap-3 rounded-[8px] bg-white p-4">
                <span className="h-12 w-12 rounded-[8px]" style={{ background: color }} />
                <div>
                  <p className="text-[14px] font-black text-[#1D382B]">{name}</p>
                  <p className="mt-1 text-[12px] text-[#6B786F]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MascotWorkflowPage() {
  return (
    <main className="min-w-[1440px] bg-[#F7F4EC]">
      <BrandBoard />
      {sets.map((s, index) => <TemplateSet key={s.id} s={s} index={index} />)}
    </main>
  );
}
