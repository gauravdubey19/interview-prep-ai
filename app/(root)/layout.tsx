import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.actions";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserAutenticated = await isAuthenticated();
  const user = await getCurrentUser();

  return (
    <div className="root-layout">
      <NavBar
        isUserAutenticated={isUserAutenticated}
        userName={user?.name || "User"}
        userPfp={user?.image || "/user-avatar.png"}
      />
      {children}
      <Footer />
    </div>
  );
}
