"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Play,
  Sparkles,
} from "lucide-react";
import {
  DESTINATIONS_CONFIG,
  resolveDestinationId,
  type DestinationAssetConfig,
  type DestinationId,
} from "@/config/destinations";
import {
  getJourneysByDestination,
  type FeaturedJourneyRecord,
} from "@/config/featured-trips";
import { DESTINATION_DISCOVERY_DICTIONARY } from "@/i18n/destination-discovery-dictionary";
import { useHero } from "@/components/hero/HeroProvider";
import { FloatingNavbar } from "@/components/hero/FloatingNavbar";
import { JourneyCard } from "@/components/featured-trips/JourneyCard";
import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { TripInquiryDrawer } from "@/components/inquiry-drawer/TripInquiryDrawer";
import { FloatingSocialFab } from "@/components/social-fab/FloatingSocialFab";
import {
  getDirectionalMaskStyle,
  useSectionEntrance,
} from "@/components/motion/MotionPrimitives";

export interface DestinationDiscoveryExperienceProps {
  initialDestination?: string | null;
  customJourneys?: readonly FeaturedJourneyRecord[];
}

/**
 * PART 2 — Cinematic Destination Discovery Page Experience:
 * Modeled after Reference 1 (`image_8b01a6.jpg`) and adapted to WEST GLOBAL TOURS:
 * 1. Active destination's own imagery & optional video fill the background with controlled atmospheric blur
 *    plus a sharp central-midground landmark photograph and readable gradient overlays.
 * 2. Left 2D vertical progress rail (`01`, `02`, `03` markers + `01 / 03` rotated fraction) on desktop
 *    and compact horizontal step rail on mobile.
 * 3. Dominant active destination title (`EGYPT`, `TÜRKİYE`, `DUBAI`), short editorial introduction,
 *    corridor badges, and compact primary CTA.
 * 4. Right foreground preview composition: prominent active landmark portrait card paired with
 *    smaller interactive preview cards for the other two destinations + bottom `<` `>` controls and `01 / 03` counter.
 * 5. Below the selector: dynamic Journey Discovery section that filters confirmed journeys by the selected destination,
 *    reusing `<JourneyCard />` with an honest empty state when a destination has no journeys.
 */
export function DestinationDiscoveryExperience({
  initialDestination,
  customJourneys,
}: DestinationDiscoveryExperienceProps) {
  const {
    locale,
    t,
    theme,
    activeDestination: contextDestination,
    selectDestinationForBooking,
    openInquiryDrawer,
  } = useHero();

  const isLight = theme === "light";
  const discoveryCopy = DESTINATION_DISCOVERY_DICTIONARY[locale];

  const [selectedId, setSelectedId] = useState<DestinationId>(() =>
    resolveDestinationId(initialDestination ?? contextDestination, "egypt")
  );
  const [journeyFilter, setJourneyFilter] = useState<DestinationId | "all">(() =>
    resolveDestinationId(initialDestination ?? contextDestination, "egypt")
  );
  const [videoReadyFor, setVideoReadyFor] = useState<DestinationId | null>(null);
  const [videoErrorFor, setVideoErrorFor] = useState<DestinationId | null>(null);
  const [saveData, setSaveData] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { ref: heroStageRef, hasEntered: heroEntered, reducedMotion } =
    useSectionEntrance<HTMLElement>({
      immediate: true,
    });

  const { ref: journeysSectionRef, hasEntered: journeysEntered } =
    useSectionEntrance<HTMLElement>({
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    });

  // Sync URL query parameter `?destination=egypt|turkiye|dubai` on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const destParam = params.get("destination");
    if (destParam) {
      const resolved = resolveDestinationId(destParam, "egypt");
      setSelectedId(resolved);
      setJourneyFilter(resolved);
      selectDestinationForBooking(resolved);
    }

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (
      nav.connection?.saveData ||
      nav.connection?.effectiveType === "slow-2g" ||
      nav.connection?.effectiveType === "2g"
    ) {
      setSaveData(true);
    }
  }, [selectDestinationForBooking]);

  const handleSelectDestination = useCallback(
    (id: DestinationId) => {
      setSelectedId(id);
      setJourneyFilter(id);
      selectDestinationForBooking(id);

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("destination", id);
        window.history.replaceState({}, "", url.toString());
      }
    },
    [selectDestinationForBooking]
  );

  const activeIndex = useMemo(() => {
    const idx = DESTINATIONS_CONFIG.findIndex((d) => d.id === selectedId);
    return idx >= 0 ? idx : 0;
  }, [selectedId]);

  const activeConfig = DESTINATIONS_CONFIG[activeIndex];
  const activeCopy = discoveryCopy.destinations[selectedId];
  const activeHeroCopy = t.destinations[selectedId];

  // Ordered preview cards: active destination first (featured portrait card), followed by the other two destinations
  const orderedPreviewDestinations = useMemo((): DestinationAssetConfig[] => {
    const total = DESTINATIONS_CONFIG.length;
    return [
      DESTINATIONS_CONFIG[activeIndex],
      DESTINATIONS_CONFIG[(activeIndex + 1) % total],
      DESTINATIONS_CONFIG[(activeIndex + 2) % total],
    ];
  }, [activeIndex]);

  const handleStepDestination = useCallback(
    (delta: number) => {
      const total = DESTINATIONS_CONFIG.length;
      const nextIdx = ((activeIndex + delta) % total + total) % total;
      handleSelectDestination(DESTINATIONS_CONFIG[nextIdx].id);
    },
    [activeIndex, handleSelectDestination]
  );

  const shouldPlayVideo = Boolean(!reducedMotion && !saveData);

  // Lazy load only the active destination video
  useEffect(() => {
    setVideoReadyFor(null);
    setVideoErrorFor(null);

    if (!shouldPlayVideo) {
      if (videoRef.current) videoRef.current.pause();
      return;
    }

    const vid = videoRef.current;
    if (!vid) return;

    try {
      vid.load();
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setVideoReadyFor(selectedId))
          .catch(() => setVideoErrorFor(selectedId));
      }
    } catch {
      setVideoErrorFor(selectedId);
    }
  }, [selectedId, shouldPlayVideo]);

  const isVideoVisible =
    shouldPlayVideo &&
    videoReadyFor === selectedId &&
    videoErrorFor !== selectedId;

  const filteredJourneys = useMemo(
    () => getJourneysByDestination(journeyFilter, customJourneys),
    [journeyFilter, customJourneys]
  );

  const scrollToJourneysSection = () => {
    const el = document.getElementById("destination-journeys");
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  const handleSelectorKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleStepDestination(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleStepDestination(-1);
    }
  };

  const featuredCardMaskStyle = getDirectionalMaskStyle(
    "top-to-bottom",
    heroEntered,
    reducedMotion,
    180,
    1180,
    "22px"
  );

  return (
    <div
      data-page="destination-discovery"
      data-active-destination={selectedId}
      data-journey-filter={journeyFilter}
      data-theme-mode={theme}
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-500 ${
        isLight ? "bg-[#FAF8F4] text-[#081C2E]" : "bg-[#051320] text-white"
      }`}
    >
      {/* SECTION 1 — CINEMATIC DESTINATION SELECTOR STAGE (Reference 1) */}
      <section
        ref={heroStageRef}
        id="destination-selector-stage"
        aria-label="Cinematic Destination Selector — Egypt, Türkiye & Dubai"
        onKeyDown={handleSelectorKeyDown}
        className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#051320] text-white"
      >
        {/* 1A. Coordinated Crossfading Atmospheric Blurred Background + Sharp Landmark Midground */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden select-none bg-[#04111D]"
        >
          {DESTINATIONS_CONFIG.map((dest) => {
            const isActive = dest.id === selectedId;
            return (
              <div
                key={`bg-stage-${dest.id}`}
                data-discovery-backdrop={dest.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Layer 1: Heavily blurred atmospheric perimeter wash */}
                <div className="absolute inset-0 scale-110 blur-[26px] opacity-65">
                  <Image
                    src={dest.heroImageWebp}
                    alt=""
                    fill
                    priority={dest.id === "egypt"}
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: dest.objectPosition }}
                  />
                </div>

                {/* Layer 2: Crisp central/midground landmark photograph */}
                <div
                  className="absolute inset-0 transition-transform duration-1000 ease-out"
                  style={{
                    transform: isActive && !reducedMotion ? "scale(1.015)" : "scale(1.05)",
                  }}
                >
                  <Image
                    src={dest.heroImageWebp}
                    alt={t.destinations[dest.id].imageAlt}
                    fill
                    priority={dest.id === "egypt"}
                    sizes="100vw"
                    className="object-cover opacity-82"
                    style={{ objectPosition: dest.objectPosition }}
                  />
                </div>
              </div>
            );
          })}

          {/* Layer 3: Single Lazy-Loaded Background Video for the Active Destination */}
          {shouldPlayVideo && (
            <div
              className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out ${
                isVideoVisible ? "opacity-55" : "opacity-0"
              }`}
            >
              <video
                ref={videoRef}
                key={activeConfig.id}
                poster={activeConfig.posterImageJpg}
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
                onLoadedData={() => setVideoReadyFor(activeConfig.id)}
                onCanPlay={() => setVideoReadyFor(activeConfig.id)}
                onPlaying={() => setVideoReadyFor(activeConfig.id)}
                onError={() => setVideoErrorFor(activeConfig.id)}
                className="h-full w-full object-cover"
                style={{ objectPosition: activeConfig.objectPosition }}
              >
                <source src={activeConfig.videoMp4} type="video/mp4" />
              </video>
            </div>
          )}

          {/* Layer 4: Controlled Atmospheric & Theme-Aware Readability Scrims */}
          <div
            className="absolute inset-0 z-20"
            style={{
              background: isLight
                ? "linear-gradient(95deg, rgba(5,19,32,0.84) 0%, rgba(6,24,40,0.62) 44%, rgba(6,22,36,0.45) 75%, rgba(5,19,32,0.72) 100%)"
                : "linear-gradient(95deg, rgba(3,12,22,0.90) 0%, rgba(5,19,32,0.68) 44%, rgba(5,18,30,0.52) 75%, rgba(3,12,22,0.78) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 z-20 h-32"
            style={{
              background: "linear-gradient(to bottom, rgba(4,16,28,0.62), transparent)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 z-20 h-40"
            style={{
              background:
                "linear-gradient(to top, rgba(5,19,32,0.96) 0%, rgba(5,19,32,0.58) 55%, transparent 100%)",
            }}
          />
        </div>

        {/* 1B. Top Global Navigation Bar (synchronized with destination selector) */}
        <FloatingNavbar
          hasAccountRoute={false}
          onSelectDiscoveryDestination={handleSelectDestination}
        />

        {/* 1C. Main Interactive Portfolio Stage (Left Rail + Center-Left Editorial Title + Right Preview Cards) */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 sm:px-8 lg:px-12 py-6 lg:py-10">
          {/* Mobile & Tablet Compact Top Step Rail (< 1024px) */}
          <div
            role="tablist"
            aria-label={discoveryCopy.railAriaLabel}
            className="mb-5 flex lg:hidden items-center justify-between gap-3 rounded-2xl bg-[#071D30]/75 border border-white/15 px-4 py-2.5 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              {DESTINATIONS_CONFIG.map((dest) => {
                const isCurrent = dest.id === selectedId;
                return (
                  <button
                    key={`mobile-rail-${dest.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    onClick={() => handleSelectDestination(dest.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
                      isCurrent
                        ? "bg-[#0E7C8E] text-white ring-1 ring-[#5EEAD4]"
                        : "bg-white/10 text-white/75 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span className="font-mono text-[11px]">{dest.orderNumber}</span>
                    <span>{t.destinations[dest.id].name}</span>
                  </button>
                );
              })}
            </div>
            <span className="font-mono text-xs font-semibold tracking-widest text-[#F4C266]">
              {activeConfig.orderNumber} / 0{DESTINATIONS_CONFIG.length}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[52px_minmax(0,1fr)_minmax(0,1.15fr)] xl:grid-cols-[60px_minmax(0,1fr)_minmax(0,1.22fr)] items-center gap-6 lg:gap-8 xl:gap-10">
            {/* Column 1: Slim Vertical 2D Progress Rail Along Left Edge (Desktop >= 1024px, Reference 1) */}
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={discoveryCopy.railAriaLabel}
              data-progress-rail="desktop"
              className="hidden lg:flex flex-col items-center justify-between h-[430px] py-2 select-none"
            >
              <div className="relative flex flex-col items-center justify-between flex-1 w-full">
                {/* Continuous Vertical Hairline */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-2 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-white/15 via-white/35 to-white/15"
                />
                {/* Animated Active Progress Fill */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-[#F4C266] to-[#2DD4BF] transition-all duration-500 ease-out"
                  style={{
                    height: `${((activeIndex + 1) / DESTINATIONS_CONFIG.length) * 88}%`,
                  }}
                />

                {DESTINATIONS_CONFIG.map((dest, idx) => {
                  const isCurrent = dest.id === selectedId;
                  return (
                    <button
                      key={`rail-marker-${dest.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      aria-label={`${discoveryCopy.previewSelectLabel}: ${t.destinations[dest.id].name} (${dest.orderNumber})`}
                      data-rail-step={dest.id}
                      onClick={() => handleSelectDestination(dest.id)}
                      className="group relative z-10 flex items-center justify-center focus-visible:outline-none"
                    >
                      <span
                        className={`flex items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                          isCurrent
                            ? "h-9 w-9 bg-white/95 text-[#061523] ring-4 ring-[#2DD4BF]/45 shadow-[0_0_24px_rgba(45,212,191,0.65)] scale-105"
                            : "h-3 w-3 bg-white/45 group-hover:h-4 group-hover:w-4 group-hover:bg-[#F4C266]"
                        }`}
                      >
                        {isCurrent ? idx + 1 : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Rotated Fractional Step Indicator at Bottom of Rail (e.g. 01/03) */}
              <div className="mt-8 pt-4 flex flex-col items-center">
                <span className="-rotate-90 font-mono text-[11px] font-semibold tracking-[0.22em] text-white/80 whitespace-nowrap">
                  {activeConfig.orderNumber}/0{DESTINATIONS_CONFIG.length}
                </span>
              </div>
            </div>

            {/* Column 2: Active Destination Large Title, Editorial Intro & Compact CTAs */}
            <div className="flex flex-col items-start text-left min-w-0">
              {/* Top Breadcrumb + Coordinates Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1 text-[11.5px] font-medium text-white/90 backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-[#5EEAD4]" />
                  <span>{discoveryCopy.backToHomeLabel}</span>
                </Link>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0E7C8E]/40 border border-[#5EEAD4]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A5F3FC] backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-[#F4C266]" />
                  <span>
                    {activeConfig.orderNumber} · {activeHeroCopy.locationBadge}
                  </span>
                </span>
              </div>

              {/* Large Cinematic Destination Display Title (EGYPT / TÜRKİYE / DUBAI) */}
              <h1
                key={`title-${selectedId}`}
                data-discovery-heading={selectedId}
                className="mt-4 sm:mt-5 font-serif text-5xl sm:text-6xl xl:text-[4.85rem] font-bold uppercase tracking-[0.04em] leading-[1.02] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.65)] transition-all duration-500"
              >
                {activeCopy.displayTitle}
              </h1>

              {/* Subtitle / Region Corridor Line */}
              <p className="mt-2.5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#F4C266]">
                <MapPin className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
                <span>{activeCopy.subtitle}</span>
              </p>

              {/* Editorial Introduction Paragraph */}
              <p
                key={`intro-${selectedId}`}
                className="mt-4 max-w-xl text-sm sm:text-base lg:text-[16.5px] font-normal leading-relaxed text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
              >
                {activeCopy.editorialIntro}
              </p>

              {/* Confirmed Corridor Pills */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {activeCopy.corridorBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
                  >
                    <Compass className="h-3 w-3 text-[#2DD4BF]" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>

              {/* Prominent Compact CTA Row (Reference 1 "Explore ->" + Tailored Inquiry) */}
              <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={scrollToJourneysSection}
                  data-discovery-primary-cta={selectedId}
                  className="group inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#0C7486] via-[#0E869A] to-[#149BB0] px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-[15px] font-semibold text-white shadow-[0_14px_34px_rgba(14,124,142,0.52)] border border-[#5EEAD4]/45 transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                >
                  <span>{activeCopy.ctaExploreJourneys}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={(e) =>
                    openInquiryDrawer({ destination: selectedId }, e.currentTarget)
                  }
                  data-discovery-inquire-cta={selectedId}
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-white/12 hover:bg-white/20 border border-white/35 px-6 py-3.5 sm:py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                >
                  <span>{activeCopy.ctaInquireDestination}</span>
                </button>
              </div>
            </div>

            {/* Column 3: Foreground Featured Landmark Card + Smaller Previews for the Other 2 Destinations (Reference 1) */}
            <div className="flex flex-col w-full min-w-0">
              <div
                style={featuredCardMaskStyle}
                className="grid grid-cols-1 sm:grid-cols-12 items-end gap-4 sm:gap-5"
              >
                {orderedPreviewDestinations.map((dest, slotIdx) => {
                  const isPrimaryFeatured = slotIdx === 0;
                  const destEditorial = discoveryCopy.destinations[dest.id];
                  const destHero = t.destinations[dest.id];

                  return (
                    <div
                      key={`preview-slot-${dest.id}`}
                      className={
                        isPrimaryFeatured
                          ? "sm:col-span-5 flex flex-col"
                          : "sm:col-span-3.5 flex flex-col"
                      }
                      style={{
                        gridColumn: isPrimaryFeatured
                          ? "span 5 / span 5"
                          : slotIdx === 1
                          ? "span 4 / span 4"
                          : "span 3 / span 3",
                      }}
                    >
                      {/* Top Card Caption + 5-Dot Indicator Above Card (Matching Reference 1) */}
                      <div className="mb-2.5 px-1">
                        <p className="truncate text-xs sm:text-[13px] font-semibold text-white drop-shadow">
                          {isPrimaryFeatured
                            ? destEditorial.featuredLandmarkTitle
                            : destHero.name}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5" aria-hidden="true">
                          {[0, 1, 2, 3, 4].map((dotIdx) => (
                            <span
                              key={dotIdx}
                              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                isPrimaryFeatured
                                  ? dotIdx < 3
                                    ? "bg-white"
                                    : "bg-white/35"
                                  : dotIdx === 0
                                  ? "bg-[#5EEAD4]"
                                  : "bg-white/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Interactive Portrait Preview Card */}
                      <button
                        type="button"
                        data-discovery-preview-card={dest.id}
                        data-preview-role={isPrimaryFeatured ? "active-featured" : "secondary-preview"}
                        aria-pressed={isPrimaryFeatured}
                        aria-label={`${discoveryCopy.previewSelectLabel}: ${destHero.name} — ${destEditorial.featuredLandmarkTitle}`}
                        onClick={() => {
                          if (isPrimaryFeatured) {
                            scrollToJourneysSection();
                          } else {
                            handleSelectDestination(dest.id);
                          }
                        }}
                        className={`group relative w-full overflow-hidden rounded-[22px] text-left transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
                          isPrimaryFeatured
                            ? "h-[300px] sm:h-[360px] xl:h-[395px] ring-2 ring-[#5EEAD4] shadow-[0_26px_60px_rgba(2,10,20,0.78)]"
                            : "h-[220px] sm:h-[290px] xl:h-[320px] border border-white/25 opacity-90 hover:opacity-100 hover:-translate-y-1.5 hover:border-[#5EEAD4]/75 shadow-[0_20px_44px_rgba(2,10,20,0.62)]"
                        }`}
                      >
                        <Image
                          src={dest.cardImageWebp}
                          alt={destHero.imageAlt}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1200px) 30vw, 280px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          style={{ objectPosition: dest.objectPosition }}
                        />

                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#03111F]/92 via-[#041526]/28 to-[#041220]/30"
                        />

                        {/* Top-Right Circular Bookmark / Pin Badge (Matching Reference 1) */}
                        <span
                          aria-hidden="true"
                          className={`absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-transform duration-300 group-hover:scale-105 ${
                            isPrimaryFeatured
                              ? "bg-white text-[#081C2E]"
                              : "bg-white/90 text-[#081C2E]"
                          }`}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              isPrimaryFeatured ? "fill-[#0E7C8E] text-[#0E7C8E]" : "text-[#081C2E]"
                            }`}
                          />
                        </span>

                        {/* Top-Left Order Badge */}
                        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1 rounded-full bg-[#051525]/70 border border-white/25 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-md">
                          {dest.orderNumber}
                        </span>

                        {/* Bottom Card Caption */}
                        <div className="absolute inset-x-3.5 bottom-3.5">
                          <div className="rounded-xl bg-[#061A2C]/80 border border-white/20 p-3 backdrop-blur-md">
                            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#5EEAD4]">
                              {isPrimaryFeatured
                                ? discoveryCopy.activeSelectionBadge
                                : destHero.tagline}
                            </p>
                            <p className="mt-0.5 truncate font-serif text-base sm:text-lg font-semibold text-white">
                              {destHero.name}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] text-white/80">
                              {destEditorial.featuredLandmarkSubtitle}
                            </p>
                            {isPrimaryFeatured && (
                              <p className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#F4C266]">
                                <Play className="h-2.5 w-2.5 fill-current" />
                                <span>{discoveryCopy.videoAtmosphereLabel}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Controls Row Below Preview Cards: Circular Prev/Next Buttons + 01 / 03 Counter (Reference 1) */}
              <div className="mt-6 flex items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleStepDestination(-1)}
                    aria-label={discoveryCopy.prevDestinationLabel}
                    data-discovery-nav="prev"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepDestination(1)}
                    aria-label={discoveryCopy.nextDestinationLabel}
                    data-discovery-nav="next"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] text-white/85">
                  <span className="text-[#5EEAD4]">{activeConfig.orderNumber}</span>
                  <span className="h-[1px] w-8 bg-white/35" aria-hidden="true" />
                  <span>0{DESTINATIONS_CONFIG.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Curved Transition Edge into Journey Discovery Section */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          className="pointer-events-none relative z-20 h-[clamp(18px,3vw,44px)] w-full"
        >
          <path
            className="west-hero-edge-fill"
            d="M0 44V30C240 11 480 1 720 1S1200 11 1440 30V44Z"
          />
          <path
            className="west-hero-edge-line"
            d="M0 30C240 11 480 1 720 1S1200 11 1440 30"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </section>

      {/* SECTION 2 — DESTINATION SELECTION & JOURNEY RESULTS (Part 2.4) */}
      <section
        ref={journeysSectionRef}
        id="destination-journeys"
        aria-labelledby="destination-journeys-heading"
        data-theme-mode={theme}
        className={`relative w-full py-16 sm:py-20 lg:py-24 transition-colors duration-500 [background:var(--west-surface-trips)] ${
          isLight ? "text-[#081C2E]" : "text-white"
        }`}
      >
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-8 lg:px-12">
          {/* Header & Interactive Destination Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E2D8C5] dark:border-white/10 pb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[1px] w-8 bg-[#C89648] dark:bg-[#F4C266]"
                />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                  {discoveryCopy.journeysSectionEyebrow}
                </span>
              </div>

              <h2
                id="destination-journeys-heading"
                className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
              >
                {journeyFilter === "all"
                  ? discoveryCopy.journeysSectionAllHeading
                  : `${discoveryCopy.journeysSectionHeadingPrefix} ${t.destinations[journeyFilter].name}`}
              </h2>

              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-[#546576]" : "text-slate-300"
                }`}
              >
                {discoveryCopy.journeysSectionSupporting}
              </p>
            </div>

            {/* Destination Filter Tabs (Egypt, Türkiye, Dubai, All 3) */}
            <div
              role="tablist"
              aria-label="Filter journeys by destination"
              className="flex flex-wrap items-center gap-2"
            >
              {DESTINATIONS_CONFIG.map((dest) => {
                const count = getJourneysByDestination(dest.id, customJourneys).length;
                const isSelectedTab = journeyFilter === dest.id;
                return (
                  <button
                    key={`filter-tab-${dest.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelectedTab}
                    data-journey-filter-tab={dest.id}
                    onClick={() => handleSelectDestination(dest.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                      isSelectedTab
                        ? "bg-[#0E7C8E] text-white shadow-[0_8px_20px_rgba(14,124,142,0.32)]"
                        : isLight
                        ? "bg-white border border-[#DCD2C0] text-[#081C2E] hover:border-[#0E7C8E]"
                        : "bg-[#092032] border border-white/15 text-white/85 hover:border-[#2DD4BF]"
                    }`}
                  >
                    <span>{t.destinations[dest.id].name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                        isSelectedTab
                          ? "bg-white/20 text-white"
                          : isLight
                          ? "bg-slate-100 text-slate-600"
                          : "bg-white/10 text-white/75"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                role="tab"
                aria-selected={journeyFilter === "all"}
                data-journey-filter-tab="all"
                onClick={() => setJourneyFilter("all")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                  journeyFilter === "all"
                    ? "bg-[#0B2B4B] dark:bg-[#2DD4BF] text-white dark:text-[#041421] shadow-md"
                    : isLight
                    ? "bg-white border border-[#DCD2C0] text-[#4F6478] hover:border-[#0E7C8E]"
                    : "bg-[#092032] border border-white/15 text-white/75 hover:border-[#2DD4BF]"
                }`}
              >
                <span>{discoveryCopy.filterAllDestinationsLabel}</span>
                <span className="rounded-full bg-current/10 px-2 py-0.5 font-mono text-[11px]">
                  {getJourneysByDestination("all", customJourneys).length}
                </span>
              </button>
            </div>
          </div>

          {/* Active Destination Summary Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#0E7C8E] dark:bg-[#2DD4BF]" />
              <span>
                <strong>{filteredJourneys.length}</strong>{" "}
                {filteredJourneys.length === 1
                  ? discoveryCopy.journeysCountSingular
                  : discoveryCopy.journeysCountPlural}{" "}
                ·{" "}
                {journeyFilter === "all"
                  ? discoveryCopy.filterAllDestinationsLabel
                  : `${t.destinations[journeyFilter].locationBadge} (${t.destinations[journeyFilter].regionLabel})`}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) =>
                openInquiryDrawer(
                  { destination: journeyFilter === "all" ? selectedId : journeyFilter },
                  e.currentTarget
                )
              }
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors ${
                isLight
                  ? "text-[#0E7C8E] hover:text-[#095E6D]"
                  : "text-[#5EEAD4] hover:text-white"
              }`}
            >
              <span>{discoveryCopy.requestCustomQuoteCta}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Journey Cards Grid or Honest Empty State */}
          {filteredJourneys.length > 0 ? (
            <div
              key={`grid-${journeyFilter}`}
              data-journey-results-grid={journeyFilter}
              className={`mt-8 grid grid-cols-1 gap-6 ${
                filteredJourneys.length === 1
                  ? "md:grid-cols-2 lg:grid-cols-2 max-w-4xl"
                  : filteredJourneys.length === 2
                  ? "md:grid-cols-2"
                  : "md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {filteredJourneys.map((journey) => (
                <JourneyCard
                  key={`discovery-card-${journey.id}`}
                  journey={journey}
                  copy={t.featuredTrips}
                  locale={locale}
                  isLight={isLight}
                  hasEntered={journeysEntered || heroEntered}
                  reducedMotion={reducedMotion}
                  variant="tablet-featured"
                />
              ))}
            </div>
          ) : (
            <div
              data-empty-state="true"
              className={`mt-10 rounded-[26px] border p-8 sm:p-12 text-center max-w-2xl mx-auto ${
                isLight
                  ? "bg-white border-[#E2D8C5] shadow-[0_16px_40px_rgba(8,28,46,0.06)]"
                  : "bg-[#081C2E] border-white/15 shadow-[0_20px_48px_rgba(2,8,16,0.65)]"
              }`}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0E7C8E]/15 dark:bg-[#2DD4BF]/15 px-3.5 py-1 text-xs font-semibold text-[#0E7C8E] dark:text-[#5EEAD4]">
                <Compass className="h-3.5 w-3.5" />
                <span>{discoveryCopy.emptyState.badge}</span>
              </span>
              <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-semibold">
                {discoveryCopy.emptyState.heading}
              </h3>
              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-[#546576]" : "text-slate-300"
                }`}
              >
                {discoveryCopy.emptyState.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={(e) =>
                    openInquiryDrawer(
                      { destination: journeyFilter === "all" ? selectedId : journeyFilter },
                      e.currentTarget
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#0E7C8E] hover:bg-[#149BB0] px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-all"
                >
                  <span>{discoveryCopy.emptyState.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setJourneyFilter("all")}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-xs sm:text-sm font-semibold transition-colors ${
                    isLight
                      ? "border-[#D5C7AE] text-[#081C2E] hover:border-[#0E7C8E]"
                      : "border-white/20 text-white hover:border-[#2DD4BF]"
                  }`}
                >
                  <span>{discoveryCopy.emptyState.secondaryCta}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3 — FINAL CONVERSION PANEL & GLOBAL FOOTER */}
      <FinalCtaSection />
      <SiteFooter />
      <TripInquiryDrawer />
      <FloatingSocialFab />
    </div>
  );
}
