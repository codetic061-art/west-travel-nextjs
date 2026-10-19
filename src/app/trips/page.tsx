import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Calendar, FileText } from "lucide-react";
import {
  FEATURED_TRIPS_CONFIG,
  FEATURED_TRIPS_SECTION_CONFIG,
} from "@/config/featured-trips";

export const metadata = {
  title: "Featured Trips — WEST TRAVEL | Egypt, Dubai & Türkiye",
  description: "Explore curated trips across Egypt, Dubai and Türkiye.",
};

/**
 * Prepared Trips Listing Route (/trips) connected to the section-level
 * "Explore All Trips →" CTA. Uses the typed FeaturedJourneyRecord catalog
 * without fabricating prices, durations, or backend availability.
 */
export default function TripsIndexPage() {
  return (
    <main className="min-h-screen w-full bg-[#FAF8F4] dark:bg-[#061523] text-[#081C2E] dark:text-white px-4 sm:px-8 lg:px-12 py-12 sm:py-16 transition-colors">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
          <Link
            href="/#featured-trips"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-[#081C2E] dark:text-white hover:border-[#0E7C8E] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF]" />
            <span>Back to Featured Trips</span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0E7C8E] dark:text-[#2DD4BF]">
            WEST TRAVEL · JOURNEY CATALOG
          </span>
        </div>

        <header className="mt-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0E7C8E] dark:text-[#2DD4BF]">
            {FEATURED_TRIPS_SECTION_CONFIG.eyebrow}
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold tracking-tight">
            {FEATURED_TRIPS_SECTION_CONFIG.heading}
          </h1>
          <p className="mt-3 text-base text-[#546576] dark:text-slate-300">
            {FEATURED_TRIPS_SECTION_CONFIG.supportingText}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TRIPS_CONFIG.map((journey) => (
            <article
              key={journey.id}
              className="group relative h-[320px] rounded-[20px] overflow-hidden border border-white/90 dark:border-white/15 bg-[#092136] shadow-[0_16px_38px_rgba(11,30,49,0.14)] dark:shadow-[0_20px_44px_rgba(2,9,18,0.72)]"
            >
              <Image
                src={journey.imageWebp}
                alt={journey.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: journey.objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03111F]/95 via-[#051B2E]/55 to-[#041322]/30" />

              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-white">
                <MapPin className="h-3.5 w-3.5 text-[#5EEAD4]" />
                <span className="text-xs font-medium">{journey.locationLabel}</span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
                <h2 className="font-serif text-2xl font-medium text-white">{journey.title}</h2>
                {journey.description && (
                  <p className="mt-1.5 text-xs text-white/80 line-clamp-2">{journey.description}</p>
                )}
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="text-xs text-white/85 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#5EEAD4]" />
                      <span>
                        {journey.durationLabel ??
                          FEATURED_TRIPS_SECTION_CONFIG.durationPlaceholderLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-[#5EEAD4]" />
                      <span>
                        {journey.startingPriceLabel ??
                          FEATURED_TRIPS_SECTION_CONFIG.quotePlaceholderLabel}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={journey.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#2DD4BF]/75 bg-[#072235]/75 px-4 py-2 text-xs font-medium text-white hover:bg-[#0E7C8E] transition-colors"
                  >
                    <span>{FEATURED_TRIPS_SECTION_CONFIG.cardCtaLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#2DD4BF]" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
