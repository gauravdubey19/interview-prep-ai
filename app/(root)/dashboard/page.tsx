import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/interview.actions";
import Dashboard from "@/components/pages/dasboard/Dashboard";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user?.id) return redirect("/auth/sing-in");

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user.id),
    await getLatestInterviews({ userId: user.id }),
  ]);

  return (
    <Dashboard
      user={user}
      userInterviews={userInterviews || []}
      latestInterviews={latestInterviews || []}
    />
  );
}
