import React from "react";
import type { Metadata } from "next";
import { HeroProvider } from "@/components/hero/HeroProvider";
import { DestinationDiscoveryExperience } from "@/components/destinations/DestinationDiscoveryExperience";

export const metadata: Metadata = {
  title: "Destination Discovery — Egypt, Türkiye & Dubai | WEST GLOBAL TOURS",
  description:
    "Explore Egypt, Türkiye, and Dubai through our interactive destination selector and discover curated journeys across all three destinations.",
};

export default async function DestinationsDiscoveryPage({
  searchParams,
}: {
  searchParams?: Promise<{ destination?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const initialDestination = resolvedParams?.destination ?? "egypt";

  return (
    <HeroProvider initialLocale="en" initialTheme="light">
      <main className="min-h-screen w-full overflow-x-hidden">
        <DestinationDiscoveryExperience initialDestination={initialDestination} />
      </main>
    </HeroProvider>
  );
}
