import type { Metadata } from "next";
import { Marcellus, Mona_Sans } from "next/font/google";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
// import ThemeToggle from "@/components/ui/theme-toggle";
import "./globals.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const monaSans: NextFontWithVariable = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

const marcellus: NextFontWithVariable = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
  variable: "--font-marcellus",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AceInterviews | AI-Powered Interview Practice & Preparation Tool",
  description:
    "Prepare for job interviews with AceInterviews - an AI-powered platform that simulates real interview scenarios, provides instant feedback, and helps you improve your technical and soft skills for landing your dream job.",
  keywords: [
    "interview preparation",
    "AI interview coach",
    "technical interview practice",
    "job interview simulator",
    "coding interview preparation",
    "mock interviews",
    "interview questions",
    "career preparation",
  ],
  authors: [{ name: "AceInterviews Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aceinterviews.com",
    title: "AceInterviews | AI-Powered Interview Practice & Preparation Tool",
    description:
      "Prepare for job interviews with AceInterviews - an AI-powered platform that simulates real interview scenarios, provides instant feedback, and helps you improve your technical and soft skills.",
    siteName: "AceInterviews",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AceInterviews - AI-Powered Interview Preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AceInterviews | AI-Powered Interview Preparation Tool",
    description:
      "Practice interviews with AI and land your dream job. Get instant feedback and improve your interview skills.",
    images: ["/twitter-image.jpg"],
    creator: "@aceinterviews",
  },
};

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${monaSans.className} ${marcellus.variable}  antialiased pattern`}
      >
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
