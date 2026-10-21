"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  FEATURED_TRIPS_SECTION_CONFIG,
  getFeaturedJourneys,
  type FeaturedJourneyRecord,
} from "@/config/featured-trips";
import { useHero } from "@/components/hero/HeroProvider";
import { JourneyCard } from "./JourneyCard";
import { SplitTextReveal, useSectionEntrance } from "@/components/motion/MotionPrimitives";

export interface FeaturedTripsSectionProps {
  /**
   * Optional array of journey records allowing future backend/API data injection
   * without modifying the section or card layout.
   */
  journeys?: readonly FeaturedJourneyRecord[];
}

/**
 * Section 2: Featured Trips — Find Your Next Journey.
 * - Viewport-triggered slower motion (0.94s header reveals, 1.05s card entrances, 1.18s directional image masks).
 * - Desktop: 5-card asymmetric layout (2 stacked left, 1 tall featured center, 2 stacked right).
 */
export function FeaturedTripsSection({ journeys: customJourneys }: FeaturedTripsSectionProps) {
  const { t, theme } = useHero();
  const isLight = theme === "light";
  const copy = t.featuredTrips;

  const journeys = getFeaturedJourneys(customJourneys);
  const leftCards = journeys.filter((j) => j.columnPosition === "left");
  const centerCard =
    journeys.find((j) => j.columnPosition === "center") ?? journeys[2] ?? journeys[0];
  const rightCards = journeys.filter((j) => j.columnPosition === "right");

  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const { ref: sectionRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -10% 0px",
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const scrollToMobileIndex = useCallback(
    (index: number) => {
      const bounded = ((index % journeys.length) + journeys.length) % journeys.length;
      setActiveIndex(bounded);

      const container = mobileCarouselRef.current;
      if (!container) return;
      const cards = container.querySelectorAll<HTMLElement>("[data-mobile-carousel-item]");
      const target = cards[bounded];
      if (target) {
        const scrollLeft =
          target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: reducedMotion ? "auto" : "smooth",
        });
      }
    },
    [journeys.length, reducedMotion]
  );

  const handleMobileScroll = () => {
    const container = mobileCarouselRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-mobile-carousel-item]");
    if (!cards.length) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  };

  const handlePrev = () => {
    scrollToMobileIndex(activeIndex - 1);
  };

  const handleNext = () => {
    scrollToMobileIndex(activeIndex + 1);
  };

  const getHeaderEntranceStyle = (delayMs: number, durationMs = 940): React.CSSProperties =>
    reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? "translate3d(0, 0, 0)" : "translate3d(0, 22px, 0)",
          transitionProperty: "opacity, transform",
          transitionDuration: `${durationMs}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${delayMs}ms`,
        };

  return (
    <section
      id="featured-trips"
      ref={sectionRef}
      aria-labelledby="featured-trips-heading"
      data-theme-mode={theme}
      data-entered={hasEntered ? "true" : "false"}
      className={`relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 transition-colors duration-500 [background:var(--west-surface-trips)] ${
        isLight
          ? "text-[#081C2E]"
          : "text-[#F8FAFC]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          {/* Eyebrow: — FEATURED TRIPS — */}
          <div
            style={getHeaderEntranceStyle(0, 900)}
            className="inline-flex items-center gap-3.5 sm:gap-4"
          >
            <span
              aria-hidden="true"
              className={`h-[1px] w-10 sm:w-14 ${
                isLight
                  ? "bg-gradient-to-r from-transparent via-[#D5A760] to-[#C89648]"
                  : "bg-gradient-to-r from-transparent via-[#E5A93C]/70 to-[#F4C266]"
              }`}
            />
            <span
              className={`text-[11.5px] sm:text-xs font-semibold uppercase tracking-[0.24em] ${
                isLight ? "text-[#0E7C8E]" : "text-[#2DD4BF]"
              }`}
            >
              {copy.eyebrow || FEATURED_TRIPS_SECTION_CONFIG.eyebrow}
            </span>
            <span
              aria-hidden="true"
              className={`h-[1px] w-10 sm:w-14 ${
                isLight
                  ? "bg-gradient-to-l from-transparent via-[#D5A760] to-[#C89648]"
                  : "bg-gradient-to-l from-transparent via-[#E5A93C]/70 to-[#F4C266]"
              }`}
            />
          </div>

          {/* Main Editorial Serif Heading: Find Your Next Journey (Slower Masked Character Reveal) */}
          <h2
            id="featured-trips-heading"
            className={`mt-3 font-serif text-3xl sm:text-5xl lg:text-[3.35rem] font-semibold leading-[1.12] tracking-[-0.015em] ${
              isLight ? "text-[#081C2E]" : "text-white"
            }`}
          >
            <SplitTextReveal
              text={copy.heading || FEATURED_TRIPS_SECTION_CONFIG.heading}
              mode="chars"
              hasEntered={hasEntered}
              reducedMotion={reducedMotion}
              baseDelayMs={110}
              staggerMs={32}
              durationMs={840}
            />
          </h2>

          {/* Supporting Text */}
          <p
            style={getHeaderEntranceStyle(260, 940)}
            className={`mt-3.5 text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed ${
              isLight ? "text-[#546576]" : "text-slate-300/85"
            }`}
          >
            {copy.supportingText || FEATURED_TRIPS_SECTION_CONFIG.supportingText}
          </p>

          {/* Mandatory Section-Level CTA — Explore All Trips → */}
          <div style={getHeaderEntranceStyle(400, 940)} className="mt-6 flex justify-center">
            <Link
              href={FEATURED_TRIPS_SECTION_CONFIG.exploreAllHref}
              data-section-cta="explore-all-trips"
              className={`group/all inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 ${
                isLight
                  ? "bg-gradient-to-r from-[#0C7486] via-[#0E869A] to-[#149BB0] shadow-[0_10px_26px_rgba(14,124,142,0.28)] hover:brightness-105 hover:shadow-[0_14px_32px_rgba(14,124,142,0.38)] focus-visible:ring-offset-[#FAF8F4]"
                  : "bg-gradient-to-r from-[#0D7688] via-[#118CA1] to-[#16A3B8] border border-[#5EEAD4]/35 shadow-[0_12px_30px_rgba(2,10,18,0.65)] hover:brightness-110 hover:shadow-[0_14px_36px_rgba(20,155,176,0.45)] focus-visible:ring-offset-[#061523]"
              }`}
            >
              <span>{copy.exploreAllCta || FEATURED_TRIPS_SECTION_CONFIG.exploreAllCtaLabel}</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover/all:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* 1. DESKTOP ASYMMETRIC FIVE-CARD LAYOUT */}
        <div
          data-layout-tier="desktop-asymmetric"
          className="mt-10 lg:mt-12 hidden lg:grid lg:grid-cols-[1fr_1.12fr_1fr] xl:grid-cols-[1fr_1.15fr_1fr] items-stretch gap-6"
        >
          <div className="flex flex-col justify-between gap-6">
            {leftCards.map((journey) => (
              <JourneyCard
                key={`desktop-left-${journey.id}`}
                journey={journey}
                copy={copy}
                isLight={isLight}
                hasEntered={hasEntered}
                reducedMotion={reducedMotion}
                isSpotlightActive={activeIndex === journey.carouselIndex}
                variant="desktop-compact"
                onSelectCard={setActiveIndex}
              />
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <JourneyCard
              key={`desktop-center-${centerCard.id}`}
              journey={centerCard}
              copy={copy}
              isLight={isLight}
              hasEntered={hasEntered}
              reducedMotion={reducedMotion}
              isSpotlightActive={activeIndex === centerCard.carouselIndex}
              variant="desktop-featured"
              onSelectCard={setActiveIndex}
            />
          </div>

          <div className="flex flex-col justify-between gap-6">
            {rightCards.map((journey) => (
              <JourneyCard
                key={`desktop-right-${journey.id}`}
                journey={journey}
                copy={copy}
                isLight={isLight}
                hasEntered={hasEntered}
                reducedMotion={reducedMotion}
                isSpotlightActive={activeIndex === journey.carouselIndex}
                variant="desktop-compact"
                onSelectCard={setActiveIndex}
              />
            ))}
          </div>
        </div>

        {/* 2. TABLET REDUCED-COLUMN LAYOUT */}
        <div
          data-layout-tier="tablet-grid"
          className="mt-10 hidden md:grid lg:hidden grid-cols-2 gap-5"
        >
          <div className="col-span-2">
            <JourneyCard
              key={`tablet-center-${centerCard.id}`}
              journey={centerCard}
              copy={copy}
              isLight={isLight}
              hasEntered={hasEntered}
              reducedMotion={reducedMotion}
              isSpotlightActive={activeIndex === centerCard.carouselIndex}
              variant="tablet-featured"
              onSelectCard={setActiveIndex}
            />
          </div>
          {[...leftCards, ...rightCards].map((journey) => (
            <JourneyCard
              key={`tablet-compact-${journey.id}`}
              journey={journey}
              copy={copy}
              isLight={isLight}
              hasEntered={hasEntered}
              reducedMotion={reducedMotion}
              isSpotlightActive={activeIndex === journey.carouselIndex}
              variant="tablet-compact"
              onSelectCard={setActiveIndex}
            />
          ))}
        </div>

        {/* 3. MOBILE SWIPEABLE HORIZONTAL SNAP CAROUSEL */}
        <div data-layout-tier="mobile-carousel" className="mt-8 md:hidden -mx-4 px-4">
          <div
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            role="region"
            aria-label="Featured Journeys Carousel"
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
          >
            {journeys.map((journey) => (
              <div
                key={`mobile-slide-${journey.id}`}
                data-mobile-carousel-item={journey.carouselIndex}
                className="w-[85vw] max-w-[348px] shrink-0 snap-center"
              >
                <JourneyCard
                  journey={journey}
                  copy={copy}
                  isLight={isLight}
                  hasEntered={hasEntered}
                  reducedMotion={reducedMotion}
                  isSpotlightActive={activeIndex === journey.carouselIndex}
                  variant="mobile"
                  onSelectCard={scrollToMobileIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Controls */}
        <div
          style={getHeaderEntranceStyle(540, 940)}
          className="mt-8 lg:mt-10 flex items-center justify-center gap-5 sm:gap-6"
          role="group"
          aria-label="Featured Trips Pagination Controls"
        >
          <button
            type="button"
            onClick={handlePrev}
            aria-label={copy.prevJourneyLabel}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLight
                ? "border-slate-200/95 bg-white text-[#0A1E32] shadow-[0_2px_10px_rgba(10,30,50,0.06)] hover:border-[#0E7C8E]/50 hover:text-[#0E7C8E]"
                : "border-white/15 bg-[#0A2034] text-white/90 shadow-[0_4px_14px_rgba(0,0,0,0.45)] hover:border-[#2DD4BF]/60 hover:text-[#2DD4BF]"
            }`}
          >
            <ChevronLeft className="h-4 w-4 stroke-[2]" />
          </button>

          <div className="flex items-center gap-2.5" role="tablist" aria-label="Select featured journey">
            {journeys.map((journey, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <button
                  key={`dot-${journey.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`${copy.goToJourneyPrefix}: ${journey.title}`}
                  onClick={() => scrollToMobileIndex(idx)}
                  className="group/dot flex h-6 w-4 items-center justify-center focus-visible:outline-none"
                >
                  <span
                    className={`rounded-full transition-all duration-300 ${
                      isCurrent
                        ? isLight
                          ? "h-2 w-2 bg-[#0E7C8E] ring-2 ring-[#0E7C8E]/25"
                          : "h-2 w-2 bg-[#2DD4BF] ring-2 ring-[#2DD4BF]/30"
                        : isLight
                        ? "h-1.5 w-1.5 bg-slate-300 group-hover/dot:bg-slate-400"
                        : "h-1.5 w-1.5 bg-white/25 group-hover/dot:bg-white/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label={copy.nextJourneyLabel}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLight
                ? "border-slate-200/95 bg-white text-[#0A1E32] shadow-[0_2px_10px_rgba(10,30,50,0.06)] hover:border-[#0E7C8E]/50 hover:text-[#0E7C8E]"
                : "border-white/15 bg-[#0A2034] text-white/90 shadow-[0_4px_14px_rgba(0,0,0,0.45)] hover:border-[#2DD4BF]/60 hover:text-[#2DD4BF]"
            }`}
          >
            <ChevronRight className="h-4 w-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </section>
  );
}
