import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import Dashboard from "@/components/pages/Dashboard";

export default async function DashboardPage() {
  const isUserAutenticated = await isAuthenticated();
  // console.log("User authenticated:", isUserAutenticated);

  if (!isUserAutenticated) redirect("/auth/sign-in");
  return <Dashboard />;
}
