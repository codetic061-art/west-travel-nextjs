import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FEATURED_TRIPS_CONFIG,
  getFeaturedJourneyBySlug,
} from "@/config/featured-trips";
import { HeroProvider } from "@/components/hero/HeroProvider";
import { JourneyDetailClient } from "@/components/destinations/JourneyDetailClient";

export function generateStaticParams() {
  return FEATURED_TRIPS_CONFIG.map((journey) => ({
    slug: journey.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = getFeaturedJourneyBySlug(slug);

  if (!journey) {
    return {
      title: "Journey Not Found | WEST GLOBAL TOURS",
    };
  }

  return {
    title: `${journey.title} (${journey.locationLabel}) — Itinerary & Details | WEST GLOBAL TOURS`,
    description:
      journey.description ??
      `Explore the day-by-day itinerary, route corridors, and tailored booking options for ${journey.title} with WEST GLOBAL TOURS.`,
  };
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = getFeaturedJourneyBySlug(slug);

  if (!journey) {
    notFound();
  }

  return (
    <HeroProvider initialLocale="en" initialTheme="light">
      <JourneyDetailClient journey={journey} />
    </HeroProvider>
  );
}
