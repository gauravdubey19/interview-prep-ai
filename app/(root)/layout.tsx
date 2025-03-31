import NavBar from "@/components/layout/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="root-layout">
      <NavBar />
      {children}
    </div>
  );
}
