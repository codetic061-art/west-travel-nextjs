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
  title: "WEST TRAVEL — Egypt, Dubai & Türkiye | Luxury Journeys",
  description:
    "Explore · Dream · Discover. Three extraordinary destinations—Egypt, Dubai & Türkiye—in one unforgettable journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} dark`}>
      <body className="font-sans antialiased bg-[#051320] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
