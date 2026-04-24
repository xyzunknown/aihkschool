export const OFFICIAL_SOURCE_PRIORITY = [
  "official_directory",
  "edb",
  "school_website",
  "schooland",
  "media",
  "forum",
] as const;

export type OfficialSource = (typeof OFFICIAL_SOURCE_PRIORITY)[number];

export type MasterFieldGroup =
  | "identity"
  | "official_attribute"
  | "official_dynamic"
  | "official_supplement"
  | "school_website_supplement";

export const SCHOOL_MASTER_FIELD_GROUPS: Record<MasterFieldGroup, readonly string[]> = {
  identity: [
    "school_code",
    "name_tc",
    "name_en",
    "district",
    "address_tc",
    "address_en",
    "phone",
    "fax",
    "website",
  ],
  official_attribute: [
    "school_type",
    "kep_participant",
    "has_nursery",
    "session_type",
    "grades_offered",
  ],
  official_dynamic: [
    "n_vacancy",
    "k1_vacancy",
    "k2_vacancy",
    "k3_vacancy",
    "edb_published_date",
    "official_notice_url",
    "official_notice_updated_at",
  ],
  official_supplement: [
    "fee_annual_hkd",
    "fee_monthly_hkd",
    "application_fee_hkd",
    "registration_fee_hkd",
    "fee_notes",
    "fee_certificate_url",
    "inspection_report_url",
    "inspection_report_updated_at",
    "official_profile_url",
  ],
  school_website_supplement: [
    "application_status",
    "application_details",
    "application_url",
    "open_day_details",
    "open_day_url",
    "admission_hours",
    "application_process",
    "open_day_date",
  ],
};

const FIELD_OWNERS: Record<string, readonly OfficialSource[]> = {};

for (const field of SCHOOL_MASTER_FIELD_GROUPS.identity) {
  FIELD_OWNERS[field] = ["official_directory", "edb"];
}
for (const field of SCHOOL_MASTER_FIELD_GROUPS.official_attribute) {
  FIELD_OWNERS[field] = ["official_directory", "edb"];
}
for (const field of SCHOOL_MASTER_FIELD_GROUPS.official_dynamic) {
  FIELD_OWNERS[field] = ["edb"];
}
for (const field of SCHOOL_MASTER_FIELD_GROUPS.official_supplement) {
  FIELD_OWNERS[field] = ["edb", "official_directory"];
}
for (const field of SCHOOL_MASTER_FIELD_GROUPS.school_website_supplement) {
  FIELD_OWNERS[field] = ["school_website"];
}

export function getAllowedSourcesForField(field: string): readonly OfficialSource[] {
  return FIELD_OWNERS[field] ?? OFFICIAL_SOURCE_PRIORITY;
}

export function canSourceUpdateField(
  field: string,
  source: OfficialSource,
  opts?: { manualIdentityConfirmation?: boolean },
): boolean {
  const allowedSources = getAllowedSourcesForField(field);

  if (
    opts?.manualIdentityConfirmation &&
    SCHOOL_MASTER_FIELD_GROUPS.identity.includes(field)
  ) {
    return source === "school_website";
  }

  return allowedSources.includes(source);
}

export function sourceRank(source: OfficialSource): number {
  const rank = OFFICIAL_SOURCE_PRIORITY.indexOf(source);
  return rank === -1 ? OFFICIAL_SOURCE_PRIORITY.length : rank;
}

export function shouldReplaceFieldValue(params: {
  field: string;
  currentSource: OfficialSource;
  nextSource: OfficialSource;
  manualIdentityConfirmation?: boolean;
}): boolean {
  if (
    !canSourceUpdateField(params.field, params.nextSource, {
      manualIdentityConfirmation: params.manualIdentityConfirmation,
    })
  ) {
    return false;
  }

  if (
    params.manualIdentityConfirmation &&
    SCHOOL_MASTER_FIELD_GROUPS.identity.includes(params.field) &&
    params.nextSource === "school_website"
  ) {
    return true;
  }

  return sourceRank(params.nextSource) <= sourceRank(params.currentSource);
}
