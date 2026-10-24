"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  ExternalLink,
  FileText,
  Hash,
  Info,
  Layers,
  Mail,
  MapPin,
  Sparkles,
  Star,
  Utensils,
} from "lucide-react";
import {
  FEATURED_TRIPS_SECTION_CONFIG,
  getJourneysByDestination,
  type FeaturedJourneyRecord,
} from "@/config/featured-trips";
import {
  buildEmailInquiryHref,
  buildWhatsAppInquiryHref,
} from "@/config/final-cta-footer";
import { DESTINATION_DISCOVERY_DICTIONARY } from "@/i18n/destination-discovery-dictionary";
import { useHero } from "@/components/hero/HeroProvider";
import { FloatingNavbar } from "@/components/hero/FloatingNavbar";
import { JourneyCard } from "@/components/featured-trips/JourneyCard";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { TripInquiryDrawer } from "@/components/inquiry-drawer/TripInquiryDrawer";
import { FloatingSocialFab } from "@/components/social-fab/FloatingSocialFab";
import { WhatsAppBrandIcon } from "@/components/icons/BrandIcons";

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
  const resolvedLocation =
    localizedJourney?.locationLabel ?? journey.locationLabel;
  const resolvedDescription =
    localizedJourney?.description ?? journey.description;
  const resolvedExtendedOverview =
    localizedJourney?.extendedOverview ?? resolvedDescription ?? "";
  const resolvedCorridor =
    localizedJourney?.corridorLabel ?? journey.itineraryMetadata.corridorLabel;
  const resolvedInquiryFormat =
    localizedJourney?.inquiryFormatLabel ??
    journey.itineraryMetadata.inquiryFormatLabel;
  const resolvedTravelStyle =
    localizedJourney?.travelStyleLabel ?? resolvedInquiryFormat;
  const resolvedCities = localizedJourney?.citiesCovered ?? [resolvedLocation];
  const resolvedHighlights = localizedJourney?.highlights ?? [];
  const resolvedOvernightCorridors = localizedJourney?.overnightCorridors ?? [
    resolvedCorridor,
  ];
  const localizedDays = localizedJourney?.days ?? [];

  // All itinerary days start expanded so visitors immediately see Day 1, Day 2, Day 3+
  const [expandedDays, setExpandedDays] = useState<readonly number[]>(() =>
    journey.itineraryDays.map((d) => d.dayNumber)
  );
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const markImageFailed = (key: string) => {
    setFailedImages((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  };

  const toggleDay = (dayNumber: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((d) => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  const expandAllDays = () => {
    setExpandedDays(journey.itineraryDays.map((d) => d.dayNumber));
  };

  const collapseAllDays = () => {
    setExpandedDays([]);
  };

  const handleBookTrip = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    openInquiryDrawer(
      {
        destination: journey.destinationId,
        journeySlug: journey.slug,
      },
      e.currentTarget
    );
  };

  const directWhatsappHref = buildWhatsAppInquiryHref({
    fullName: "Prospective Traveler",
    phone: "Direct Website Inquiry",
    destination: t.destinations[journey.destinationId].name,
    trip: `${resolvedTitle} (${journey.itineraryMetadata.catalogCode})`,
    travelers: "2 Guests (Adjustable)",
  });

  const directEmailHref = buildEmailInquiryHref({
    fullName: "Prospective Traveler",
    phone: "Direct Website Inquiry",
    destination: t.destinations[journey.destinationId].name,
    trip: `${resolvedTitle} (${journey.itineraryMetadata.catalogCode})`,
    travelers: "2 Guests (Adjustable)",
  });

  const relatedJourneys = getJourneysByDestination(
    journey.destinationId
  ).filter((item) => item.slug !== journey.slug);

  const galleryItems = journey.gallery;
  const activeGalleryItem =
    galleryItems[activeGalleryIdx] ?? galleryItems[0] ?? null;

  const durationDisplay =
    journey.durationLabel ??
    detailCopy.durationFlexibleValue ??
    t.featuredTrips.durationPlaceholder ??
    FEATURED_TRIPS_SECTION_CONFIG.durationPlaceholderLabel;

  const bookingModelDisplay =
    journey.startingPriceLabel ??
    t.featuredTrips.quotePlaceholder ??
    FEATURED_TRIPS_SECTION_CONFIG.quotePlaceholderLabel;

  return (
    <div
      data-page="journey-detail"
      data-journey-slug={journey.slug}
      data-journey-destination={journey.destinationId}
      data-itinerary-days-count={journey.itineraryDays.length}
      data-accommodation-status={journey.accommodationStatus}
      data-theme-mode={theme}
      className={`min-h-screen w-full transition-colors duration-500 ${
        isLight ? "bg-[#FAF8F4] text-[#081C2E]" : "bg-[#051320] text-white"
      }`}
    >
      {/* Shared Fixed Floating Navbar + Top Header Band Clearance */}
      <FloatingNavbar hasAccountRoute={false} />
      <div aria-hidden="true" className="h-20 sm:h-24 w-full bg-[#051320]" />

      <main className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10 xl:px-12 py-8 sm:py-12">
        {/* Top Breadcrumb & Navigation Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <Link
            href={`/destinations?destination=${journey.destinationId}`}
            data-back-to-destination={journey.destinationId}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLight
                ? "border-[#D5C7AE] bg-white text-[#081C2E] hover:border-[#0E7C8E]"
                : "border-white/20 bg-white/5 text-white hover:border-[#2DD4BF]"
            }`}
          >
            <ArrowLeft className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF]" />
            <span>{detailCopy.backToDiscoveryLabel}</span>
          </Link>

          <Link
            href="/destinations?destination=all#destination-journeys"
            data-explore-all-trips-link=""
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0E7C8E] dark:text-[#2DD4BF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] rounded px-1"
          >
            <span>{detailCopy.viewAllDestinationsLabel}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* SECTION A — TRIP HERO */}
        <section
          id="trip-hero"
          aria-labelledby="trip-hero-title"
          className={`overflow-hidden rounded-[28px] border ${
            isLight
              ? "border-[#E2D8C5] bg-white shadow-[0_22px_54px_rgba(10,28,46,0.12)]"
              : "border-white/15 bg-[#081C2E] shadow-[0_26px_62px_rgba(2,9,18,0.78)]"
          }`}
        >
          <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] w-full flex flex-col justify-end p-6 sm:p-10 lg:p-12">
            <Image
              src={
                failedImages["hero"] ? journey.imageJpg : journey.imageWebp
              }
              alt={journey.imageAlt}
              fill
              priority
              quality={90}
              sizes="(max-width: 1380px) 100vw, 1380px"
              onError={() => markImageFailed("hero")}
              className="object-cover"
              style={{ objectPosition: journey.objectPosition }}
            />
            {/* Multi-Stop Directional Readability Scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,10,19,0.96)_0%,rgba(4,18,32,0.72)_48%,rgba(4,18,32,0.22)_100%)]"
            />

            <div className="relative z-10 max-w-4xl text-white">
              {/* Top Badges: Location, Inquiry Format, Catalog Code, Core Days */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#041322]/82 backdrop-blur-md border border-white/30 px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
                  <MapPin className="h-3.5 w-3.5 text-[#F4C266]" />
                  <span>{resolvedLocation}</span>
                </span>

                <span className="inline-flex items-center rounded-full bg-[#0E7C8E]/88 border border-[#5EEAD4]/60 px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
                  {resolvedInquiryFormat}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 font-mono text-xs font-semibold text-[#A5F3FC]">
                  <Hash className="h-3 w-3 text-[#5EEAD4]" />
                  <span>{journey.itineraryMetadata.catalogCode}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#041322]/78 backdrop-blur-md border border-white/25 px-3 py-1 text-xs font-medium text-white/95">
                  <Calendar className="h-3.5 w-3.5 text-[#5EEAD4]" />
                  <span>
                    {journey.itineraryDays.length}{" "}
                    {detailCopy.dayPrefixLabel}s Core Corridor
                  </span>
                </span>
              </div>

              {/* Trip Title */}
              <h1
                id="trip-hero-title"
                data-trip-hero-title={journey.slug}
                className="mt-4 font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.85)]"
              >
                {resolvedTitle}
              </h1>

              {/* Brief Introduction */}
              {resolvedDescription && (
                <p className="mt-3.5 max-w-2xl text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-white/95 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
                  {resolvedDescription}
                </p>
              )}

              {/* Key Corridor Cities Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {resolvedCities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#051829]/80 border border-white/25 px-3 py-1 text-xs font-medium text-[#A5F3FC] backdrop-blur-md"
                  >
                    <Compass className="h-3 w-3 text-[#2DD4BF]" />
                    <span>{city}</span>
                  </span>
                ))}
              </div>

              {/* Hero Action Buttons: Book / Request This Trip + Jump to Itinerary */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={handleBookTrip}
                  data-hero-book-trip-cta={journey.slug}
                  className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-r from-[#0C7486] via-[#0E869A] to-[#149BB0] px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-[15px] font-semibold text-white shadow-[0_14px_34px_rgba(14,124,142,0.48)] border border-[#5EEAD4]/50 transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                >
                  <span>{detailCopy.bookThisTripCta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a
                  href="#trip-itinerary"
                  data-jump-to-itinerary-cta=""
                  className="inline-flex items-center gap-2 rounded-full bg-[#041322]/78 hover:bg-[#082238]/90 border border-white/35 px-6 py-3.5 sm:py-4 text-sm font-semibold text-white backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                >
                  <Layers className="h-4 w-4 text-[#5EEAD4]" />
                  <span>{detailCopy.jumpToItineraryCta}</span>
                </a>
              </div>
            </div>
          </div>

          {/* In-Page Section Jump Bar */}
          <nav
            aria-label={detailCopy.sectionNavAriaLabel}
            className={`flex items-center gap-2 overflow-x-auto no-scrollbar px-6 py-3.5 border-t text-xs sm:text-[13px] font-semibold ${
              isLight
                ? "bg-[#F6F1E6] border-[#E2D8C5] text-[#081C2E]"
                : "bg-[#061626] border-white/10 text-white/90"
            }`}
          >
            {[
              { href: "#trip-overview", label: detailCopy.navOverview },
              { href: "#trip-itinerary", label: detailCopy.navItinerary },
              {
                href: "#trip-accommodation",
                label: detailCopy.navAccommodation,
              },
              { href: "#trip-gallery", label: detailCopy.navGallery },
              { href: "#trip-inclusions", label: detailCopy.navInclusions },
              { href: "#trip-booking-cta", label: detailCopy.navBook },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-3.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                  isLight
                    ? "hover:bg-[#0E7C8E]/12 hover:text-[#0E7C8E]"
                    : "hover:bg-white/10 hover:text-[#5EEAD4]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </section>

        {/* SECTION B — TRIP OVERVIEW & KEY HIGHLIGHTS */}
        <section
          id="trip-overview"
          aria-labelledby="trip-overview-heading"
          className="mt-10 sm:mt-14 scroll-mt-28"
        >
          <div
            className={`rounded-[26px] border p-6 sm:p-9 lg:p-10 ${
              isLight
                ? "bg-white border-[#E2D8C5] shadow-[0_14px_36px_rgba(10,28,46,0.06)]"
                : "bg-[#081C2E] border-white/12 shadow-[0_18px_44px_rgba(2,9,18,0.55)]"
            }`}
          >
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E7C8E] dark:text-[#2DD4BF]">
              <Sparkles className="h-3.5 w-3.5 text-[#C89648] dark:text-[#F4C266]" />
              <span>{detailCopy.overviewEyebrow}</span>
            </div>

            <h2
              id="trip-overview-heading"
              className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight"
            >
              {detailCopy.overviewHeading}
            </h2>

            <p
              className={`mt-3.5 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-4xl ${
                isLight ? "text-[#475869]" : "text-slate-200"
              }`}
            >
              {resolvedExtendedOverview}
            </p>

            {/* 6-Item Structured Overview Metadata Grid */}
            <div
              data-trip-overview-grid=""
              className={`mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-2xl p-5 border ${
                isLight
                  ? "bg-[#F9F6EE] border-[#E2D8C5]"
                  : "bg-[#061523] border-white/10"
              }`}
            >
              <div className="flex items-start gap-3.5 p-2">
                <Compass className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider opacity-65">
                    {detailCopy.corridorHeading}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold">
                    {resolvedCorridor}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-2">
                <Calendar className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider opacity-65">
                    {detailCopy.durationHeading}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold">
                    {durationDisplay}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-2">
                <MapPin className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider opacity-65">
                    {detailCopy.citiesCoveredHeading}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold">
                    {resolvedCities.join(" · ")}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-2">
                <Layers className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider opacity-65">
                    {detailCopy.travelStyleHeading}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold">
                    {resolvedTravelStyle}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-2">
                <FileText className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider opacity-65">
                    {detailCopy.bookingModelHeading}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold">
                    {bookingModelDisplay}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-2">
                <Hash className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider opacity-65">
                    {detailCopy.catalogRefHeading}
                  </div>
                  <div className="mt-0.5 font-mono text-sm font-semibold">
                    {journey.itineraryMetadata.catalogCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Highlights List */}
            {resolvedHighlights.length > 0 && (
              <div className="mt-7 pt-6 border-t border-[#E2D8C5] dark:border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                  {detailCopy.keyHighlightsHeading}
                </h3>
                <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {resolvedHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className={`flex items-start gap-3 rounded-xl p-3.5 border text-sm ${
                        isLight
                          ? "bg-[#FAF8F2] border-[#E6DEC8] text-[#1E293B]"
                          : "bg-[#061626] border-white/10 text-slate-200"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* SECTION C — DAY-BY-DAY ITINERARY TIMELINE & SCHEDULE */}
        <section
          id="trip-itinerary"
          aria-labelledby="trip-itinerary-heading"
          data-itinerary-section={journey.slug}
          className="mt-12 sm:mt-16 scroll-mt-28"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2D8C5] dark:border-white/10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                <Compass className="h-3.5 w-3.5 text-[#C89648] dark:text-[#F4C266]" />
                <span>{detailCopy.itineraryEyebrow}</span>
              </div>
              <h2
                id="trip-itinerary-heading"
                className="mt-2 font-serif text-2xl sm:text-4xl font-semibold tracking-tight"
              >
                {detailCopy.itineraryHeading}
              </h2>
              <p
                className={`mt-2.5 text-sm sm:text-[15px] leading-relaxed ${
                  isLight ? "text-[#546576]" : "text-slate-300"
                }`}
              >
                {detailCopy.itinerarySupporting}
              </p>
            </div>

            {/* Expand All / Collapse All Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={expandAllDays}
                data-itinerary-expand-all=""
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                  isLight
                    ? "border-[#D5C7AE] bg-white text-[#081C2E] hover:border-[#0E7C8E]"
                    : "border-white/20 bg-[#081C2E] text-white hover:border-[#2DD4BF]"
                }`}
              >
                {detailCopy.expandAllDaysLabel}
              </button>
              <button
                type="button"
                onClick={collapseAllDays}
                data-itinerary-collapse-all=""
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                  isLight
                    ? "border-[#D5C7AE] bg-white text-[#546576] hover:border-[#0E7C8E] hover:text-[#081C2E]"
                    : "border-white/15 bg-white/5 text-slate-300 hover:border-[#2DD4BF] hover:text-white"
                }`}
              >
                {detailCopy.collapseAllDaysLabel}
              </button>
            </div>
          </div>

          {/* Vertical Timeline of Expandable Day Cards (Day 1, Day 2, Day 3+) */}
          <div className="relative mt-8 space-y-6">
            {/* Vertical Connecting Line on Desktop */}
            <span
              aria-hidden="true"
              className="pointer-events-none hidden lg:block absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-[#0E7C8E] via-[#C89648]/60 to-[#0E7C8E]/30 dark:from-[#2DD4BF] dark:via-[#F4C266]/60 dark:to-[#2DD4BF]/25"
            />

            {journey.itineraryDays.map((dayRecord, idx) => {
              const dayCopy = localizedDays[idx] ?? {
                dayNumber: dayRecord.dayNumber,
                cityLabel: dayRecord.cityKey,
                title: `${detailCopy.dayPrefixLabel} ${dayRecord.dayNumber} — ${dayRecord.cityKey}`,
                description: resolvedDescription ?? "",
                landmarks: [dayRecord.cityKey],
                segments: {
                  morning: {
                    periodLabel: "Morning",
                    focusTitle: dayRecord.cityKey,
                    pacingNote: "Tailored private pacing",
                  },
                  afternoon: {
                    periodLabel: "Afternoon",
                    focusTitle: resolvedCorridor,
                    pacingNote: "Flexible sightseeing window",
                  },
                  evening: {
                    periodLabel: "Evening",
                    focusTitle: resolvedLocation,
                    pacingNote: "Relaxed evening leisure",
                  },
                },
              };

              const isExpanded = expandedDays.includes(dayRecord.dayNumber);
              const triggerId = `itinerary-day-trigger-${journey.slug}-${dayRecord.dayNumber}`;
              const panelId = `itinerary-day-panel-${journey.slug}-${dayRecord.dayNumber}`;
              const dayImgKey = `day-${dayRecord.dayNumber}`;

              return (
                <div
                  key={dayRecord.id}
                  data-itinerary-day={dayRecord.dayNumber}
                  data-day-expanded={isExpanded ? "true" : "false"}
                  className="relative lg:pl-16"
                >
                  {/* Desktop Timeline Node Badge */}
                  <span
                    aria-hidden="true"
                    className={`hidden lg:flex absolute left-0 top-5 h-14 w-14 items-center justify-center rounded-2xl font-mono text-sm font-bold border transition-all ${
                      isExpanded
                        ? "bg-[#0E7C8E] text-white border-[#5EEAD4] shadow-[0_8px_22px_rgba(14,124,142,0.38)]"
                        : isLight
                        ? "bg-white text-[#081C2E] border-[#D5C7AE]"
                        : "bg-[#081C2E] text-[#5EEAD4] border-white/20"
                    }`}
                  >
                    0{dayRecord.dayNumber}
                  </span>

                  <article
                    className={`overflow-hidden rounded-[24px] border transition-all ${
                      isExpanded
                        ? isLight
                          ? "bg-white border-[#0E7C8E]/45 shadow-[0_16px_40px_rgba(8,28,46,0.08)]"
                          : "bg-[#081C2E] border-[#2DD4BF]/45 shadow-[0_20px_48px_rgba(2,8,16,0.65)]"
                        : isLight
                        ? "bg-[#FAF8F2] border-[#E2D8C5] hover:border-[#C89648]"
                        : "bg-[#07192A]/85 border-white/12 hover:border-white/25"
                    }`}
                  >
                    {/* Day Accordion Header Button */}
                    <h3 className="m-0">
                      <button
                        id={triggerId}
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                        onClick={() => toggleDay(dayRecord.dayNumber)}
                        className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 lg:p-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
                      >
                        <div className="flex flex-wrap items-center gap-3 min-w-0">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0E7C8E] px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white">
                            <span>
                              {detailCopy.dayPrefixLabel} {dayRecord.dayNumber}
                            </span>
                          </span>

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${
                              isLight
                                ? "bg-[#F4EFE4] border-[#DED3BE] text-[#0B2B4B]"
                                : "bg-white/10 border-white/15 text-[#A5F3FC]"
                            }`}
                          >
                            <MapPin className="h-3 w-3 text-[#C89648] dark:text-[#F4C266]" />
                            <span>{dayCopy.cityLabel}</span>
                          </span>

                          <span className="block w-full sm:w-auto mt-1 sm:mt-0 font-serif text-lg sm:text-xl lg:text-2xl font-semibold leading-snug">
                            {dayCopy.title}
                          </span>
                        </div>

                        <span
                          aria-hidden="true"
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 ${
                            isExpanded
                              ? "rotate-180 border-[#0E7C8E] bg-[#0E7C8E]/10 text-[#0E7C8E] dark:border-[#2DD4BF] dark:text-[#2DD4BF]"
                              : isLight
                              ? "border-[#D5C7AE] text-[#546576]"
                              : "border-white/20 text-white/75"
                          }`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>
                    </h3>

                    {/* Expandable Day Details Panel */}
                    {isExpanded && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        className="border-t border-[#E2D8C5]/80 dark:border-white/10 p-5 sm:p-6 lg:p-7"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                          {/* Left 7 Columns: Narrative Description, Landmarks, Schedule Table, Meals & Overnight */}
                          <div className="lg:col-span-7 space-y-5">
                            <p
                              className={`text-sm sm:text-base leading-relaxed ${
                                isLight ? "text-[#475869]" : "text-slate-200"
                              }`}
                            >
                              {dayCopy.description}
                            </p>

                            {/* Featured Landmarks & Corridors Pills */}
                            <div>
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                                {detailCopy.landmarksHeading}
                              </h4>
                              <div className="mt-2.5 flex flex-wrap gap-2">
                                {dayCopy.landmarks.map((landmark) => (
                                  <span
                                    key={landmark}
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${
                                      isLight
                                        ? "bg-[#F8F5EE] border-[#DFD5C2] text-[#081C2E]"
                                        : "bg-[#061523] border-white/15 text-white/90"
                                    }`}
                                  >
                                    <Compass className="h-3 w-3 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                                    <span>{landmark}</span>
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Compact Structured Daily Pacing Table */}
                            <div>
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0E7C8E] dark:text-[#2DD4BF] mb-2.5">
                                {detailCopy.scheduleTableHeading}
                              </h4>
                              <div
                                className={`overflow-x-auto rounded-2xl border ${
                                  isLight
                                    ? "border-[#E2D8C5] bg-[#FAF8F2]"
                                    : "border-white/12 bg-[#061523]"
                                }`}
                              >
                                <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
                                  <thead>
                                    <tr
                                      className={
                                        isLight
                                          ? "bg-[#F1EBD9] text-[#081C2E] border-b border-[#E2D8C5]"
                                          : "bg-[#092136] text-[#A5F3FC] border-b border-white/10"
                                      }
                                    >
                                      <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">
                                        {detailCopy.scheduleColumnSegment}
                                      </th>
                                      <th className="py-2.5 px-3.5 font-semibold">
                                        {detailCopy.scheduleColumnFocus}
                                      </th>
                                      <th className="py-2.5 px-3.5 font-semibold">
                                        {detailCopy.scheduleColumnPacing}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#E2D8C5]/70 dark:divide-white/10">
                                    {(
                                      ["morning", "afternoon", "evening"] as const
                                    ).map((periodKey) => {
                                      const seg = dayCopy.segments[periodKey];
                                      return (
                                        <tr key={periodKey}>
                                          <td className="py-2.5 px-3.5 font-semibold whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5">
                                              <Clock className="h-3.5 w-3.5 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                                              <span>{seg.periodLabel}</span>
                                            </span>
                                          </td>
                                          <td className="py-2.5 px-3.5 font-medium">
                                            {seg.focusTitle}
                                          </td>
                                          <td
                                            className={`py-2.5 px-3.5 ${
                                              isLight
                                                ? "text-[#546576]"
                                                : "text-slate-300"
                                            }`}
                                          >
                                            {seg.pacingNote}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* Meals & Overnight Zone Row */}
                            <div
                              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl p-3.5 border text-xs ${
                                isLight
                                  ? "bg-[#F6F2E8] border-[#E2D8C5]"
                                  : "bg-[#05121F] border-white/10"
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <Utensils className="h-4 w-4 text-[#C89648] dark:text-[#F4C266] shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold block">
                                    {detailCopy.mealsHeading}:
                                  </span>
                                  <span
                                    className={
                                      isLight
                                        ? "text-[#546576]"
                                        : "text-slate-300"
                                    }
                                  >
                                    {dayRecord.confirmedMealsLabel ??
                                      detailCopy.mealsPendingValue}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-2.5">
                                <Building2 className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold block">
                                    {detailCopy.overnightHeading}:
                                  </span>
                                  <span
                                    className={
                                      isLight
                                        ? "text-[#546576]"
                                        : "text-slate-300"
                                    }
                                  >
                                    {dayRecord.confirmedOvernightHotel ??
                                      `${dayCopy.cityLabel} · ${detailCopy.overnightPendingValue}`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right 5 Columns: Day Photograph */}
                          <div className="lg:col-span-5">
                            <div className="relative h-[240px] sm:h-[280px] lg:h-[310px] w-full overflow-hidden rounded-2xl border border-white/20 bg-[#061829] shadow-md">
                              <Image
                                src={
                                  failedImages[dayImgKey]
                                    ? dayRecord.imageJpg
                                    : dayRecord.imageWebp
                                }
                                alt={`${dayCopy.title} — ${resolvedTitle}`}
                                fill
                                quality={90}
                                sizes="(max-width: 1024px) 92vw, 480px"
                                onError={() => markImageFailed(dayImgKey)}
                                className="object-cover"
                                style={{
                                  objectPosition: dayRecord.objectPosition,
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#03111F]/85 via-transparent to-transparent" />
                              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 text-white">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#041322]/80 border border-white/25 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                                  <MapPin className="h-3 w-3 text-[#F4C266]" />
                                  <span>{dayCopy.cityLabel}</span>
                                </span>
                                <span className="font-mono text-xs font-bold text-[#5EEAD4] bg-[#041322]/75 px-2.5 py-0.5 rounded-full border border-white/20">
                                  {detailCopy.dayPrefixLabel}{" "}
                                  {dayRecord.dayNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION D — ACCOMMODATION & HOTEL SECTION */}
        <section
          id="trip-accommodation"
          aria-labelledby="trip-accommodation-heading"
          data-accommodation-section={journey.accommodationStatus}
          className="mt-12 sm:mt-16 scroll-mt-28"
        >
          <div
            className={`rounded-[26px] border p-6 sm:p-9 lg:p-10 ${
              isLight
                ? "bg-white border-[#E2D8C5] shadow-[0_14px_36px_rgba(10,28,46,0.06)]"
                : "bg-[#081C2E] border-white/12 shadow-[0_18px_44px_rgba(2,9,18,0.55)]"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                <Building2 className="h-3.5 w-3.5 text-[#C89648] dark:text-[#F4C266]" />
                <span>{detailCopy.accommodationEyebrow}</span>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold border ${
                  journey.accommodations.length > 0
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                    : isLight
                    ? "bg-amber-50 border-amber-300/80 text-amber-900"
                    : "bg-amber-500/15 border-amber-400/35 text-[#F9E6B3]"
                }`}
              >
                <Info className="h-3.5 w-3.5" />
                <span>{detailCopy.accommodationPendingBadge}</span>
              </span>
            </div>

            <h2
              id="trip-accommodation-heading"
              className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight"
            >
              {detailCopy.accommodationHeading}
            </h2>

            {journey.accommodations.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {journey.accommodations.map((hotel) => (
                  <article
                    key={hotel.id}
                    data-hotel-card={hotel.id}
                    className={`rounded-2xl border p-5 ${
                      isLight
                        ? "bg-[#FAF8F2] border-[#E2D8C5]"
                        : "bg-[#061523] border-white/15"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#0E7C8E] dark:text-[#2DD4BF]">
                          {hotel.nightsLabel}
                        </span>
                        <h3 className="mt-1 font-serif text-xl font-semibold">
                          {hotel.hotelName}
                        </h3>
                        <p className="text-xs opacity-75">{hotel.location}</p>
                      </div>
                      {hotel.starRating && (
                        <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span>{hotel.starRating}-Star</span>
                        </div>
                      )}
                    </div>
                    {hotel.roomDetails && (
                      <p className="mt-3 text-sm">{hotel.roomDetails}</p>
                    )}
                    {hotel.mapUrl && (
                      <a
                        href={hotel.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E7C8E] dark:text-[#2DD4BF] hover:underline"
                      >
                        <span>{hotel.address ?? hotel.location}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              /* Discreet, Non-Fabricated Accommodation Confirmation Panel */
              <div
                data-accommodation-pending-notice=""
                className={`mt-6 rounded-2xl border p-6 sm:p-7 ${
                  isLight
                    ? "bg-gradient-to-br from-[#FAF7EF] to-[#EFF7F8] border-[#DFD4BF]"
                    : "bg-gradient-to-br from-[#061626] to-[#082236] border-white/12"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="max-w-3xl">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                      {detailCopy.accommodationPendingTitle}
                    </h3>
                    <p
                      className={`mt-2 text-sm sm:text-[15px] leading-relaxed ${
                        isLight ? "text-[#475869]" : "text-slate-300"
                      }`}
                    >
                      {detailCopy.accommodationPendingMessage}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleBookTrip}
                    data-accommodation-inquire-cta=""
                    className="shrink-0 inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#0E7C8E] hover:bg-[#149BB0] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
                  >
                    <Building2 className="h-4 w-4" />
                    <span>{detailCopy.accommodationCtaLabel}</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-[#DFD4BF]/80 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Confirmed Overnight Geographic Zones */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                      {detailCopy.accommodationOvernightZonesLabel}
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {resolvedOvernightCorridors.map((zone) => (
                        <li
                          key={zone}
                          className="flex items-center gap-2.5 text-xs sm:text-sm font-medium"
                        >
                          <MapPin className="h-4 w-4 text-[#C89648] dark:text-[#F4C266] shrink-0" />
                          <span>{zone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Available Property Tiers on Request */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                      {detailCopy.accommodationCategoriesLabel}
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {detailCopy.accommodationCategoriesList.map((cat) => (
                        <li
                          key={cat}
                          className="flex items-center gap-2.5 text-xs sm:text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0" />
                          <span>{cat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION E — RESPONSIVE TRIP GALLERY */}
        {galleryItems.length > 0 && activeGalleryItem && (
          <section
            id="trip-gallery"
            aria-labelledby="trip-gallery-heading"
            data-trip-gallery={journey.slug}
            className="mt-12 sm:mt-16 scroll-mt-28"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
              <div>
                <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                  <Sparkles className="h-3.5 w-3.5 text-[#C89648] dark:text-[#F4C266]" />
                  <span>{detailCopy.galleryEyebrow}</span>
                </div>
                <h2
                  id="trip-gallery-heading"
                  className="mt-2 font-serif text-2xl sm:text-4xl font-semibold tracking-tight"
                >
                  {detailCopy.galleryHeading}
                </h2>
                <p
                  className={`mt-2 text-sm sm:text-[15px] ${
                    isLight ? "text-[#546576]" : "text-slate-300"
                  }`}
                >
                  {detailCopy.gallerySupporting}
                </p>
              </div>

              {/* Gallery Prev / Next Controls */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  aria-label="Previous gallery photo"
                  onClick={() =>
                    setActiveGalleryIdx(
                      (prev) =>
                        (prev - 1 + galleryItems.length) % galleryItems.length
                    )
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                    isLight
                      ? "border-[#D5C7AE] bg-white text-[#081C2E] hover:border-[#0E7C8E]"
                      : "border-white/20 bg-[#081C2E] text-white hover:border-[#2DD4BF]"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="font-mono text-xs font-semibold px-2">
                  0{activeGalleryIdx + 1} / 0{galleryItems.length}
                </span>
                <button
                  type="button"
                  aria-label="Next gallery photo"
                  onClick={() =>
                    setActiveGalleryIdx(
                      (prev) => (prev + 1) % galleryItems.length
                    )
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                    isLight
                      ? "border-[#D5C7AE] bg-white text-[#081C2E] hover:border-[#0E7C8E]"
                      : "border-white/20 bg-[#081C2E] text-white hover:border-[#2DD4BF]"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Active Spotlight Image */}
            <div className="relative h-[300px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden rounded-[24px] border border-[#E2D8C5] dark:border-white/15 bg-[#061829] shadow-lg">
              <Image
                src={
                  failedImages[activeGalleryItem.id]
                    ? activeGalleryItem.imageJpg
                    : activeGalleryItem.imageWebp
                }
                alt={
                  detailCopy.galleryCaptions[activeGalleryItem.captionKey] ??
                  resolvedTitle
                }
                fill
                quality={90}
                sizes="(max-width: 1380px) 100vw, 1380px"
                onError={() => markImageFailed(activeGalleryItem.id)}
                className="object-cover transition-all duration-500"
                style={{ objectPosition: activeGalleryItem.objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020B14]/88 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 text-white">
                <p className="text-xs sm:text-sm font-medium text-white/95 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
                  {detailCopy.galleryCaptions[activeGalleryItem.captionKey] ??
                    resolvedTitle}
                </p>
                <span className="rounded-full bg-[#041322]/80 border border-white/25 px-3 py-1 font-mono text-xs font-semibold text-[#5EEAD4]">
                  {resolvedLocation}
                </span>
              </div>
            </div>

            {/* Thumbnail Selector Grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {galleryItems.map((item, idx) => {
                const isSelected = idx === activeGalleryIdx;
                const caption =
                  detailCopy.galleryCaptions[item.captionKey] ?? resolvedTitle;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveGalleryIdx(idx)}
                    aria-pressed={isSelected}
                    aria-label={caption}
                    data-gallery-thumb={item.id}
                    className={`group relative h-24 sm:h-28 w-full overflow-hidden rounded-2xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                      isSelected
                        ? "ring-2 ring-[#0E7C8E] dark:ring-[#5EEAD4] border-transparent scale-[1.01]"
                        : "border-[#E2D8C5] dark:border-white/15 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={
                        failedImages[item.id] ? item.imageJpg : item.imageWebp
                      }
                      alt={caption}
                      fill
                      quality={85}
                      sizes="(max-width: 640px) 46vw, 320px"
                      onError={() => markImageFailed(item.id)}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{ objectPosition: item.objectPosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03111F]/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2.5 right-2.5 truncate text-[11px] font-medium text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]">
                      {caption}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION F — WHAT'S INCLUDED / NOT INCLUDED & PRACTICAL NOTES */}
        <section
          id="trip-inclusions"
          aria-labelledby="trip-inclusions-heading"
          data-inclusions-section={journey.slug}
          className="mt-12 sm:mt-16 scroll-mt-28"
        >
          <div
            className={`rounded-[26px] border p-6 sm:p-9 lg:p-10 ${
              isLight
                ? "bg-white border-[#E2D8C5] shadow-[0_14px_36px_rgba(10,28,46,0.06)]"
                : "bg-[#081C2E] border-white/12 shadow-[0_18px_44px_rgba(2,9,18,0.55)]"
            }`}
          >
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E7C8E] dark:text-[#2DD4BF]">
              <FileText className="h-3.5 w-3.5 text-[#C89648] dark:text-[#F4C266]" />
              <span>{detailCopy.inclusionsEyebrow}</span>
            </div>

            <h2
              id="trip-inclusions-heading"
              className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight"
            >
              {detailCopy.inclusionsHeading}
            </h2>

            <p
              className={`mt-2.5 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${
                isLight ? "text-[#546576]" : "text-slate-300"
              }`}
            >
              {detailCopy.inclusionsSupporting}
            </p>

            <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1: Confirmed Consultation & Planning Scope */}
              <div
                className={`rounded-2xl border p-5 sm:p-6 ${
                  isLight
                    ? "bg-[#F9F6EE] border-[#E2D8C5]"
                    : "bg-[#061523] border-white/10"
                }`}
              >
                <h3 className="font-serif text-lg font-semibold text-[#0E7C8E] dark:text-[#5EEAD4]">
                  {detailCopy.confirmedPlanningTitle}
                </h3>
                <ul className="mt-4 space-y-3 text-xs sm:text-sm">
                  {detailCopy.confirmedPlanningItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Customizable Services Confirmed in Your Quote */}
              <div
                className={`rounded-2xl border p-5 sm:p-6 ${
                  isLight
                    ? "bg-[#F9F6EE] border-[#E2D8C5]"
                    : "bg-[#061523] border-white/10"
                }`}
              >
                <h3 className="font-serif text-lg font-semibold text-[#C89648] dark:text-[#F4C266]">
                  {detailCopy.tailoredQuotationTitle}
                </h3>
                <ul className="mt-4 space-y-3 text-xs sm:text-sm">
                  {detailCopy.tailoredQuotationItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Compass className="h-4 w-4 text-[#C89648] dark:text-[#F4C266] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Exclusions & Practical Notes */}
              <div
                className={`rounded-2xl border p-5 sm:p-6 ${
                  isLight
                    ? "bg-[#F9F6EE] border-[#E2D8C5]"
                    : "bg-[#061523] border-white/10"
                }`}
              >
                <h3 className="font-serif text-lg font-semibold">
                  {detailCopy.practicalNotesTitle}
                </h3>
                <ul className="mt-4 space-y-3 text-xs sm:text-sm">
                  {detailCopy.practicalNotesItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Info className="h-4 w-4 text-[#546576] dark:text-slate-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION G — BOOKING & DIRECT TRIP INQUIRY CTA */}
        <section
          id="trip-booking-cta"
          aria-labelledby="trip-booking-cta-heading"
          className="mt-12 sm:mt-16 scroll-mt-28"
        >
          <div
            className={`rounded-[28px] border p-7 sm:p-10 lg:p-12 ${
              isLight
                ? "bg-gradient-to-r from-[#EFF7F8] via-[#F7F4EB] to-[#FAF6EC] border-[#C9E2E5] shadow-[0_18px_44px_rgba(14,124,142,0.12)]"
                : "bg-gradient-to-r from-[#092438] via-[#081E30] to-[#071B2C] border-[#2DD4BF]/35 shadow-[0_22px_52px_rgba(2,9,18,0.75)]"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0E7C8E]/15 dark:bg-[#2DD4BF]/15 px-3.5 py-1 text-xs font-semibold text-[#0E7C8E] dark:text-[#5EEAD4]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>
                    {resolvedTitle} · {journey.itineraryMetadata.catalogCode}
                  </span>
                </div>

                <h2
                  id="trip-booking-cta-heading"
                  className="mt-3 font-serif text-2xl sm:text-4xl font-semibold tracking-tight"
                >
                  {detailCopy.inquireHeading}
                </h2>

                <p
                  className={`mt-2.5 text-sm sm:text-base leading-relaxed ${
                    isLight ? "text-[#4F6478]" : "text-slate-300"
                  }`}
                >
                  {detailCopy.inquireDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={handleBookTrip}
                  data-journey-detail-inquire={journey.slug}
                  className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#0C7486] via-[#0E869A] to-[#149BB0] px-7 py-4 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(14,124,142,0.35)] hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
                >
                  <span>{detailCopy.inquirePrimaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href={directWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-journey-detail-whatsapp={journey.slug}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                    isLight
                      ? "bg-white border-[#D5C7AE] text-[#081C2E] hover:border-[#0E7C8E]"
                      : "bg-[#061523] border-white/20 text-white hover:border-[#2DD4BF]"
                  }`}
                >
                  <WhatsAppBrandIcon className="h-4 w-4 text-[#25D366]" />
                  <span>{detailCopy.inquireWhatsappCta}</span>
                </a>

                <a
                  href={directEmailHref}
                  data-journey-detail-email={journey.slug}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                    isLight
                      ? "bg-white border-[#D5C7AE] text-[#081C2E] hover:border-[#0E7C8E]"
                      : "bg-[#061523] border-white/20 text-white hover:border-[#2DD4BF]"
                  }`}
                >
                  <Mail className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                  <span>{detailCopy.inquireEmailCta}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Journeys in the Same Destination */}
        {relatedJourneys.length > 0 && (
          <section className="mt-14">
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
