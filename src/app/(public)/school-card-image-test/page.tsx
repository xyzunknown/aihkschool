import { SchoolCard } from "@/components/schools/SchoolCard";

const vacancy = {
  n_vacancy: "no_information" as const,
  k1_vacancy: "has_vacancy" as const,
  k2_vacancy: "waiting_list" as const,
  k3_vacancy: "has_vacancy" as const,
  edb_published_date: "2026-04-21",
};

const stressSchools = [
  {
    id: "map-private-short",
    nameTc: "盈思幼稚園",
    nameEn: "Witty Kindergarten",
    logoUrl: "/logos/590673.svg",
    district: "central_and_western",
    schoolType: "private_independent",
    distanceKm: undefined,
    sessionType: "am_whole_day",
    feeMonthlyHkd: 7320,
    applicationStatus: null,
  },
  {
    id: "map-international-long",
    nameTc: "維多利亞（何文田）國際幼稚園",
    nameEn: "Victoria (Homantin) International Kindergarten",
    logoUrl: null,
    district: "kowloon_city",
    schoolType: "international",
    distanceKm: 4.7,
    sessionType: "am",
    feeMonthlyHkd: 6200,
    applicationStatus: "website",
  },
  {
    id: "map-nonprofit-extra-long",
    nameTc: "中華基督教會元朗堂真光幼稚園二校",
    nameEn: "CCC Chun Kwong Kindergarten Second School",
    logoUrl: null,
    district: "yuen_long",
    schoolType: "non_profit",
    distanceKm: 5.8,
    sessionType: "whole_day",
    feeMonthlyHkd: 0,
  },
  {
    id: "map-long-parenthesis",
    nameTc: "平安福音堂幼稚園（天水圍）",
    nameEn: "Peace Evangelical Church Kindergarten (Tin Shui Wai)",
    logoUrl: null,
    district: "yuen_long",
    schoolType: "non_profit",
    distanceKm: 8.4,
    sessionType: "whole_day",
    feeMonthlyHkd: 0,
  },
  {
    id: "map-private-extra-long",
    nameTc: "基督教香港信義會靈安幼兒學校（將軍澳）",
    nameEn: "Ling On Nursery School",
    logoUrl: "/logos/622060.svg",
    district: "sai_kung",
    schoolType: "private_independent",
    distanceKm: 3.6,
    sessionType: "am_pm",
    feeMonthlyHkd: 3800,
    applicationStatus: "year_round",
  },
  {
    id: "map-simple-nonprofit",
    nameTc: "明我幼稚園",
    nameEn: "Dominic Savio Kindergarten",
    logoUrl: null,
    district: "eastern",
    schoolType: "non_profit",
    distanceKm: 2.4,
    sessionType: "am_pm",
    feeMonthlyHkd: 5100,
  },
];

export default function SchoolCardImageTestPage() {
  return (
    <main className="min-h-screen bg-[#F8FBF8] px-5 py-8 md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold text-emerald-700">V1.1 卡片壓測</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">
            徽章 + 數據卡片測試
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            無地圖圖位；校徽作身份錨點，距離、學費、班別改為三欄數據。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stressSchools.map((school) => (
            <SchoolCard
              key={school.id}
              id={school.id}
              nameTc={school.nameTc}
              nameEn={school.nameEn}
              logoUrl={school.logoUrl}
              schoolCode={null}
              district={school.district}
              schoolType={school.schoolType}
              sessionType={school.sessionType}
              schoolandSessionLabel={null}
              feeMonthlyHkd={school.feeMonthlyHkd}
              applicationStatus={"applicationStatus" in school ? school.applicationStatus : null}
              applicationDetails={null}
              applicationUrl={null}
              vacancy={vacancy}
              isFavorited={false}
              distanceKm={school.distanceKm}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
