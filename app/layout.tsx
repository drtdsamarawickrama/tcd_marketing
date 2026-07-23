import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Setting meta details for the brand SEO
export const metadata: Metadata = {
  title: "TCD Marketing | Home Solutions, Electrics & Furniture Sri Lanka",
  description: "Explore high-quality furniture, electrics, home appliances, smart TVs, and home solutions at TCD Marketing. Smart Solutions, Better Living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-slate-900">{children}</body>
    </html>
  );
}
