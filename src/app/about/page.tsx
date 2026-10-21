import React from "react";
import type { Metadata } from "next";
import { HeroProvider } from "@/components/hero/HeroProvider";
import { AboutUsExperience } from "@/components/about/AboutUsExperience";

export const metadata: Metadata = {
  title: "About WEST GLOBAL TOURS — Egypt, Türkiye & Dubai | Journey Standards & FAQ",
  description:
    "Learn how WEST GLOBAL TOURS plans curated journeys across Egypt, Türkiye, and Dubai, view verified company scope, and read answers to frequently asked questions.",
};

export default function AboutWestTravelPage() {
  return (
    <HeroProvider initialLocale="en" initialTheme="light">
      <main className="min-h-screen w-full overflow-x-hidden">
        <AboutUsExperience />
      </main>
    </HeroProvider>
  );
}
