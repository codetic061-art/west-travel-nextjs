import React from "react";
import type { Metadata } from "next";
import { HeroProvider } from "@/components/hero/HeroProvider";
import { DestinationDiscoveryExperience } from "@/components/destinations/DestinationDiscoveryExperience";

export const metadata: Metadata = {
  title: "Explore All Trips & Destinations — Egypt, Türkiye & Dubai | WEST GLOBAL TOURS",
  description:
    "Explore curated trips and destination corridors across Egypt, Türkiye, and Dubai with WEST GLOBAL TOURS.",
};

/**
 * /trips route connected to "Explore All Trips" / "View All Trips" entries.
 * Renders the unified Cinematic Destination Discovery & Journey Catalog experience
 * so visitors have a single cohesive discovery flow with zero duplicate code.
 */
export default async function TripsDiscoveryPage({
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
