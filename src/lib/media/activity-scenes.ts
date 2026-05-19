import type { Activity } from "@/lib/db/activities";
import type { ProgrammeWithStatus } from "@/lib/db/programmes";

const SCENE_BASE = "/images/activity-scenes";

export const ACTIVITY_SCENE_IMAGES = {
  music: `${SCENE_BASE}/music-piano.webp`,
  sports: `${SCENE_BASE}/sports-hall.webp`,
  art: `${SCENE_BASE}/art-table.webp`,
  dance: `${SCENE_BASE}/dance-studio.webp`,
  stem: `${SCENE_BASE}/science-lab.webp`,
  language: `${SCENE_BASE}/reading-corner.webp`,
  drama: `${SCENE_BASE}/theatre-stage.webp`,
  other: `${SCENE_BASE}/parent-child-playroom.webp`,
} as const;

export const PROGRAMME_SCENE_IMAGES = {
  swimming: `${SCENE_BASE}/swimming-indoor.webp`,
  music: `${SCENE_BASE}/music-piano.webp`,
  dance: `${SCENE_BASE}/dance-studio.webp`,
  art: `${SCENE_BASE}/art-table.webp`,
  sport: `${SCENE_BASE}/sports-hall.webp`,
  parent_child: `${SCENE_BASE}/parent-child-playroom.webp`,
  other: `${SCENE_BASE}/badminton-court.webp`,
} as const;

const TITLE_SCENE_RULES = [
  { pattern: /太極劍|太极剑/i, image: `${SCENE_BASE}/tai-chi-sword.webp` },
  { pattern: /清晨太極|簡易太極|太極|太极/i, image: `${SCENE_BASE}/tai-chi-park.webp` },
  { pattern: /乒乓|table\s*tennis/i, image: `${SCENE_BASE}/table-tennis-room.webp` },
  { pattern: /柔道|跆拳道|空手道|武術|武术|judo|taekwondo|martial/i, image: `${SCENE_BASE}/judo-dojo.webp` },
  { pattern: /捷泳|胸泳|游泳|水上安全|swim|aquatic/i, image: `${SCENE_BASE}/water-safety-pool.webp` },
  { pattern: /兒童舞|舞蹈|芭蕾|dance|ballet/i, image: `${SCENE_BASE}/dance-studio.webp` },
  { pattern: /圍棋|围棋|棋/i, image: `${SCENE_BASE}/go-board.webp` },
  { pattern: /籃球|篮球|basketball/i, image: `${SCENE_BASE}/basketball-court.webp` },
  { pattern: /瑜伽|yoga/i, image: `${SCENE_BASE}/yoga-studio.webp` },
  { pattern: /陶藝|陶艺|陶瓷|ceramic|pottery/i, image: `${SCENE_BASE}/pottery-table.webp` },
  { pattern: /園藝|园艺|gardening|plant/i, image: `${SCENE_BASE}/garden-activity.webp` },
  { pattern: /STEM|工程|科學|科学|science/i, image: `${SCENE_BASE}/science-lab.webp` },
  { pattern: /故事|閱讀|阅读|英文|語言|语言|language|reading/i, image: `${SCENE_BASE}/reading-corner.webp` },
  { pattern: /戲劇|戏剧|drama|theatre/i, image: `${SCENE_BASE}/theatre-stage.webp` },
  { pattern: /音樂|音乐|歌唱|合唱|music|piano/i, image: `${SCENE_BASE}/music-piano.webp` },
] as const;

function getTitleSceneImage(title: string | null | undefined) {
  const value = title || "";
  return TITLE_SCENE_RULES.find((rule) => rule.pattern.test(value))?.image;
}

export function getActivitySceneImage(activity: Activity) {
  if (activity.image_url) return activity.image_url;
  const titleImage = getTitleSceneImage(activity.title);
  if (titleImage) return titleImage;
  return ACTIVITY_SCENE_IMAGES[activity.category] || ACTIVITY_SCENE_IMAGES.other;
}

export function getProgrammeSceneImage(programme: ProgrammeWithStatus) {
  const titleImage = getTitleSceneImage(programme.name_zh || programme.name_en);
  if (titleImage) return titleImage;
  return PROGRAMME_SCENE_IMAGES[programme.category || "other"] || PROGRAMME_SCENE_IMAGES.other;
}
