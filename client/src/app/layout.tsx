import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BentoLink — Build Your Aesthetic Profile",
  description:
    "Create stunning, interactive bento-grid profiles. Drag, drop, and customize blocks to build your perfect portfolio — no code required.",
  keywords: ["bento", "profile", "portfolio", "link in bio", "creator tools"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
