const EDB_URL_REWRITES: Record<string, string> = {
  "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/vacancy-in-kindergarten/index.html":
    "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/K1-K3_Vacancy_2627.html",
  "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/kindergarten-education-scheme/index.html":
    "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/index.html",
  "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/overview/k1-admission-arrangements.html":
    "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/2627_admission_arrangements.html",
  "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/overview/index.html":
    "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/overview/",
};

export function normalizeNewsHref(href: string): string {
  return EDB_URL_REWRITES[href] ?? href;
}
