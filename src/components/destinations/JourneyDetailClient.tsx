"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Calendar, FileText, Compass, Hash } from "lucide-react";
import {
  FEATURED_TRIPS_SECTION_CONFIG,
  getJourneysByDestination,
  type FeaturedJourneyRecord,
} from "@/config/featured-trips";
import { DESTINATION_DISCOVERY_DICTIONARY } from "@/i18n/destination-discovery-dictionary";
import { useHero } from "@/components/hero/HeroProvider";
import { FloatingNavbar } from "@/components/hero/FloatingNavbar";
import { JourneyCard } from "@/components/featured-trips/JourneyCard";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { TripInquiryDrawer } from "@/components/inquiry-drawer/TripInquiryDrawer";
import { FloatingSocialFab } from "@/components/social-fab/FloatingSocialFab";

export function JourneyDetailClient({
  journey,
}: {
  journey: FeaturedJourneyRecord;
}) {
  const { locale, t, theme, openInquiryDrawer } = useHero();
  const isLight = theme === "light";
  const discoveryCopy = DESTINATION_DISCOVERY_DICTIONARY[locale];
  const detailCopy = discoveryCopy.journeyDetail;
  const localizedJourney = discoveryCopy.journeys[journey.slug];

  const resolvedTitle = localizedJourney?.title ?? journey.title;
  const resolvedLocation = localizedJourney?.locationLabel ?? journey.locationLabel;
  const resolvedDescription = localizedJourney?.description ?? journey.description;
  const resolvedCorridor =
    localizedJourney?.corridorLabel ?? journey.itineraryMetadata.corridorLabel;
  const resolvedInquiryFormat =
    localizedJourney?.inquiryFormatLabel ?? journey.itineraryMetadata.inquiryFormatLabel;

  const relatedJourneys = getJourneysByDestination(journey.destinationId).filter(
    (item) => item.slug !== journey.slug
  );

  return (
    <div
      data-page="journey-detail"
      data-journey-slug={journey.slug}
      data-theme-mode={theme}
      className={`min-h-screen w-full transition-colors duration-500 ${
        isLight ? "bg-[#FAF8F4] text-[#081C2E]" : "bg-[#051320] text-white"
      }`}
    >
      <div className="bg-[#051320] pb-6">
        <FloatingNavbar hasAccountRoute={false} />
      </div>

      <main className="mx-auto max-w-[1180px] px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <Link
            href={`/destinations?destination=${journey.destinationId}`}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
              isLight
                ? "border-[#D5C7AE] bg-white text-[#081C2E] hover:border-[#0E7C8E]"
                : "border-white/20 bg-white/5 text-white hover:border-[#2DD4BF]"
            }`}
          >
            <ArrowLeft className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF]" />
            <span>{detailCopy.backToDiscoveryLabel}</span>
          </Link>

          <Link
            href="/destinations"
            className="text-xs sm:text-sm font-semibold text-[#0E7C8E] dark:text-[#2DD4BF] hover:underline"
          >
            {detailCopy.viewAllDestinationsLabel} →
          </Link>
        </div>

        <article
          className={`overflow-hidden rounded-[26px] border ${
            isLight
              ? "border-[#E2D8C5] bg-white shadow-[0_20px_50px_rgba(10,28,46,0.10)]"
              : "border-white/15 bg-[#081C2E] shadow-[0_24px_56px_rgba(2,9,18,0.75)]"
          }`}
        >
          <div className="relative h-[340px] sm:h-[440px] w-full">
            <Image
              src={journey.imageWebp}
              alt={journey.imageAlt}
              fill
              priority
              sizes="(max-width: 1180px) 100vw, 1180px"
              className="object-cover"
              style={{ objectPosition: journey.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03111F]/92 via-[#041526]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 text-xs font-medium">
                  <MapPin className="h-3.5 w-3.5 text-[#5EEAD4]" />
                  <span>{resolvedLocation}</span>
                </span>
                <span className="inline-flex items-center rounded-full bg-[#0E7C8E]/75 border border-[#5EEAD4]/50 px-3 py-1 text-xs font-medium">
                  {resolvedInquiryFormat}
                </span>
              </div>
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold">
                {resolvedTitle}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {resolvedDescription && (
              <p
                className={`text-base sm:text-lg leading-relaxed max-w-3xl ${
                  isLight ? "text-[#475869]" : "text-slate-200"
                }`}
              >
                {resolvedDescription}
              </p>
            )}

            <div
              className={`mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl p-5 border ${
                isLight
                  ? "bg-[#F8F5EE] border-[#E2D8C5]"
                  : "bg-[#061523] border-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider opacity-65">
                    {detailCopy.corridorHeading}
                  </div>
                  <div className="text-sm font-semibold">{resolvedCorridor}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider opacity-65">
                    {detailCopy.durationHeading}
                  </div>
                  <div className="text-sm font-semibold">
                    {journey.durationLabel ??
                      t.featuredTrips.durationPlaceholder ??
                      FEATURED_TRIPS_SECTION_CONFIG.durationPlaceholderLabel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider opacity-65">
                    {detailCopy.bookingModelHeading}
                  </div>
                  <div className="text-sm font-semibold">
                    {journey.startingPriceLabel ??
                      t.featuredTrips.quotePlaceholder ??
                      FEATURED_TRIPS_SECTION_CONFIG.quotePlaceholderLabel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider opacity-65">
                    {detailCopy.catalogRefHeading}
                  </div>
                  <div className="font-mono text-sm font-semibold">
                    {journey.itineraryMetadata.catalogCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Trip Quotation Action Panel */}
            <div
              className={`mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl p-6 border ${
                isLight
                  ? "bg-gradient-to-r from-[#EFF7F8] to-[#FAF6EC] border-[#C9E2E5]"
                  : "bg-gradient-to-r from-[#092438] to-[#071B2C] border-[#2DD4BF]/30"
              }`}
            >
              <div className="max-w-xl">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold">
                  {detailCopy.inquireHeading}
                </h2>
                <p
                  className={`mt-1.5 text-xs sm:text-sm leading-relaxed ${
                    isLight ? "text-[#4F6478]" : "text-slate-300"
                  }`}
                >
                  {detailCopy.inquireDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) =>
                  openInquiryDrawer(
                    {
                      destination: journey.destinationId,
                      journeySlug: journey.slug,
                    },
                    e.currentTarget
                  )
                }
                data-journey-detail-inquire={journey.slug}
                className="shrink-0 inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#0C7486] via-[#0E869A] to-[#149BB0] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(14,124,142,0.32)] hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
              >
                <span>{detailCopy.inquirePrimaryCta}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </article>

        {/* Related Journeys in the Same Destination */}
        {relatedJourneys.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
              {detailCopy.relatedJourneysHeading}
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedJourneys.map((item) => (
                <JourneyCard
                  key={item.id}
                  journey={item}
                  copy={t.featuredTrips}
                  locale={locale}
                  isLight={isLight}
                  hasEntered={true}
                  reducedMotion={false}
                  variant="tablet-compact"
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
      <TripInquiryDrawer />
      <FloatingSocialFab />
    </div>
  );
}
