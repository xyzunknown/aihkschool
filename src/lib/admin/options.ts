export const DISTRICT_OPTIONS = [
  ["central_and_western", "中西區"],
  ["eastern", "東區"],
  ["southern", "南區"],
  ["wan_chai", "灣仔區"],
  ["kowloon_city", "九龍城區"],
  ["kwun_tong", "觀塘區"],
  ["sham_shui_po", "深水埗區"],
  ["wong_tai_sin", "黃大仙區"],
  ["yau_tsim_mong", "油尖旺區"],
  ["islands", "離島區"],
  ["kwai_tsing", "葵青區"],
  ["north", "北區"],
  ["sai_kung", "西貢區"],
  ["sha_tin", "沙田區"],
  ["tai_po", "大埔區"],
  ["tsuen_wan", "荃灣區"],
  ["tuen_mun", "屯門區"],
  ["yuen_long", "元朗區"],
] as const;

export const SCHOOL_TYPE_OPTIONS = [
  ["non_profit", "非牟利"],
  ["private_independent", "私立獨立"],
  ["international", "國際"],
] as const;

export const SESSION_OPTIONS = [
  ["", "未設定"],
  ["am", "上午班"],
  ["pm", "下午班"],
  ["whole_day", "全日班"],
  ["am_pm", "上午及下午班"],
  ["am_whole_day", "上午及全日班"],
  ["pm_whole_day", "下午及全日班"],
  ["am_pm_whole_day", "上午、下午及全日班"],
] as const;

export const VACANCY_OPTIONS = [
  ["has_vacancy", "有學位"],
  ["no_vacancy", "無學位"],
  ["waiting_list", "候補"],
  ["no_information", "沒資料"],
  ["not_offered", "不提供"],
  ["check_school", "向學校查詢"],
] as const;
