import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
// import ThemeToggle from "@/components/ui/theme-toggle";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewPrep",
  description: "An AI-Powered Interview Preparation Tool",
};

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${monaSans.className}  antialiased pattern`}>
        {/* <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        > */}
        {children}
        {/* <ThemeToggle /> */}
        <Toaster richColors closeButton />
        {/* </NextThemesProvider> */}
      </body>
    </html>
  );
}
