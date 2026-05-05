import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { NEWS_ITEMS } from "@/data/homepage";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aihkschool.vercel.app";

export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/kg`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/timeline`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/activities`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/programmes`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE_URL}/priority`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: new Date(), priority: 0.3 },
  ];

  const newsRoutes: MetadataRoute.Sitemap = NEWS_ITEMS
    .filter((item) => !item.is_external)
    .map((item) => ({
      url: `${BASE_URL}/news/${item.id}`,
      lastModified: item.published_at ? new Date(item.published_at) : new Date(),
      priority: 0.6,
    }));

  // Dynamic: school detail pages
  let schoolRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: schools } = await supabase
      .from("schools")
      .select("id, updated_at")
      .eq("is_active", true)
      .order("id");

    schoolRoutes =
      schools?.map((school) => ({
        url: `${BASE_URL}/kg/${school.id}`,
        lastModified: school.updated_at ? new Date(school.updated_at) : new Date(),
        priority: 0.8,
      })) ?? [];
  } catch {
    // If DB query fails, skip school routes (don't break build)
    console.warn("sitemap: failed to fetch schools, skipping dynamic school routes");
  }

  // Dynamic: activity pages
  let activityRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: activities } = await supabase
      .from("activities")
      .select("id, updated_at")
      .eq("is_active", true)
      .order("id");

    activityRoutes =
      activities?.map((activity) => ({
        url: `${BASE_URL}/activities/${activity.id}`,
        lastModified: activity.updated_at ? new Date(activity.updated_at) : new Date(),
        priority: 0.6,
      })) ?? [];
  } catch {
    console.warn("sitemap: failed to fetch activities, skipping dynamic activity routes");
  }

  // Dynamic: programme pages
  let programmeRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: programmes } = await supabase
      .from("lcsd_programmes")
      .select("id, created_at")
      .order("id");

    programmeRoutes =
      programmes?.map((programme) => ({
        url: `${BASE_URL}/programmes/${programme.id}`,
        lastModified: programme.created_at ? new Date(programme.created_at) : new Date(),
        priority: 0.5,
      })) ?? [];
  } catch {
    console.warn("sitemap: failed to fetch programmes, skipping dynamic programme routes");
  }

  return [...staticRoutes, ...newsRoutes, ...schoolRoutes, ...activityRoutes, ...programmeRoutes];
}
