import React from "react";
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
