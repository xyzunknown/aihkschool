import { redirect } from "next/navigation";

export default function PriorityPage() {
  redirect("/kg?hot=100");
}
