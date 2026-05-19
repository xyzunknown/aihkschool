import type { Activity } from "@/lib/db/activities";
import type { ProgrammeWithStatus } from "@/lib/db/programmes";

const SCENE_BASE = "/images/activity-scenes";

export const ACTIVITY_SCENE_IMAGES = {
  music: `${SCENE_BASE}/music-piano.webp`,
  sports: `${SCENE_BASE}/sports-hall.webp`,
  art: `${SCENE_BASE}/art-table.webp`,
  dance: `${SCENE_BASE}/dance-studio.webp`,
  stem: `${SCENE_BASE}/parent-child-playroom.webp`,
  language: `${SCENE_BASE}/parent-child-playroom.webp`,
  drama: `${SCENE_BASE}/dance-studio.webp`,
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

export function getActivitySceneImage(activity: Activity) {
  return ACTIVITY_SCENE_IMAGES[activity.category] || ACTIVITY_SCENE_IMAGES.other;
}

export function getProgrammeSceneImage(programme: ProgrammeWithStatus) {
  return PROGRAMME_SCENE_IMAGES[programme.category || "other"] || PROGRAMME_SCENE_IMAGES.other;
}
