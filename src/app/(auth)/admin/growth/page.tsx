import { requireAdminPage } from "@/lib/admin/auth";
import { AdminGrowthClient } from "./growth-client";

export const dynamic = "force-dynamic";

export default async function AdminGrowthPage() {
  await requireAdminPage();
  return <AdminGrowthClient />;
}
