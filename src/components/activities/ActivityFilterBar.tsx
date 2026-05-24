"use client";

import { FilterBar, type FilterActiveTag, type FilterOptionGroup } from "@/components/ui/FilterBar";
import type { ActivityDistrict } from "@/lib/db/activities";
import {
  CATEGORY_GROUP_LABELS,
  CATEGORY_GROUP_ORDER,
  DISTRICT_LABELS,
  type ActivityCategoryGroup,
} from "@/lib/activities/labels";

interface ActivityFilterBarProps {
  group: ActivityCategoryGroup | null;
  district: ActivityDistrict | null;
  free: boolean;
  onChangeGroup: (v: ActivityCategoryGroup | null) => void;
  onChangeDistrict: (v: ActivityDistrict | null) => void;
  onChangeFree: (v: boolean) => void;
  onReset: () => void;
}

const DISTRICT_GROUPS: FilterOptionGroup[] = [
  { label: "港島", options: ["central_and_western", "eastern", "southern", "wan_chai"].map(toDistrictOption) },
  { label: "九龍", options: ["kowloon_city", "kwun_tong", "sham_shui_po", "wong_tai_sin", "yau_tsim_mong"].map(toDistrictOption) },
  { label: "新界", options: ["kwai_tsing", "north", "sai_kung", "sha_tin", "tai_po", "tsuen_wan", "tuen_mun", "yuen_long"].map(toDistrictOption) },
  { label: "離島", options: ["islands"].map(toDistrictOption) },
];

function toDistrictOption(key: string) {
  return { key, label: DISTRICT_LABELS[key as ActivityDistrict] ?? key };
}

export function ActivityFilterBar({
  group,
  district,
  free,
  onChangeGroup,
  onChangeDistrict,
  onChangeFree,
  onReset,
}: ActivityFilterBarProps) {
  const tags: FilterActiveTag[] = [
    ...(district ? [{ key: `district-${district}`, label: DISTRICT_LABELS[district], onRemove: () => onChangeDistrict(null) }] : []),
    ...(group ? [{ key: `group-${group}`, label: CATEGORY_GROUP_LABELS[group], onRemove: () => onChangeGroup(null) }] : []),
    ...(free ? [{ key: "free", label: "免費", onRemove: () => onChangeFree(false) }] : []),
  ];

  return (
    <FilterBar
      districtGroups={DISTRICT_GROUPS}
      selectedDistrictKeys={district ? [district] : []}
      districtSummary={district ? DISTRICT_LABELS[district] : "全部地區"}
      onToggleDistrict={(key) => onChangeDistrict(district === key ? null : (key as ActivityDistrict))}
      onClearDistricts={() => onChangeDistrict(null)}
      sections={[
        {
          key: "activity-category",
          label: "活動類別",
          options: CATEGORY_GROUP_ORDER.map((key) => ({ key, label: CATEGORY_GROUP_LABELS[key] })),
          selectedKeys: group ? [group] : [],
          onToggle: (key) => onChangeGroup(group === key ? null : (key as ActivityCategoryGroup)),
        },
        {
          key: "fee",
          label: "費用",
          options: [{ key: "free", label: "只顯示免費" }],
          selectedKeys: free ? ["free"] : [],
          onToggle: () => onChangeFree(!free),
        },
      ]}
      activeTags={tags}
      onReset={onReset}
    />
  );
}
