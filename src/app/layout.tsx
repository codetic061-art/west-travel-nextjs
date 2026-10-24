import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WEST GLOBAL TOURS — Egypt, Dubai & Türkiye | Luxury Journeys",
  description:
    "Explore · Dream · Discover. Three extraordinary destinations—Egypt, Dubai & Türkiye—in one unforgettable journey with WEST GLOBAL TOURS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} light`} data-theme="light">
      <body className="font-sans antialiased bg-[#FAF8F4] dark:bg-[#051320] text-[#081C2E] dark:text-white overflow-x-hidden transition-colors duration-300">
        <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#081C2E] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
