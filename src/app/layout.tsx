import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe.az — Azerbaijani Rap News",
  description: "Latest news, releases, and interviews from the Azerbaijani rap scene.",
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Vibe.az — Azerbaijani Rap News",
    description: "Latest news, releases, and interviews from the Azerbaijani rap scene.",
    url: "/",
    siteName: "Vibe.az",
    images: [
      {
        url: "/favicon.ico",
        width: 64,
        height: 64,
        alt: "Vibe.az",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Vibe.az — Azerbaijani Rap News",
    description: "Latest news, releases, and interviews from the Azerbaijani rap scene.",
    images: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[--color-background] text-[--color-foreground]`}>
        <NavBar />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
