import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserAutenticated = await isAuthenticated();
  // console.log("User authenticated:", isUserAutenticated);

  if (!isUserAutenticated) redirect("/auth/sign-in");

  return <>{children}</>;
}
