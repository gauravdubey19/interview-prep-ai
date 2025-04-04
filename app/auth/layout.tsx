import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.actions";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserAutenticated = await isAuthenticated();
  // console.log("User authenticated:", isUserAutenticated);

  if (isUserAutenticated) redirect("/dashboard");
  return <div className="auth-layout">{children}</div>;
}
