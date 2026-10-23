"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  MapPin,
  Play,
  Sparkles,
} from "lucide-react";
import {
  DESTINATIONS_CONFIG,
  resolveDestinationId,
  type DestinationId,
} from "@/config/destinations";
import {
  getFeaturedJourneys,
  getJourneysByDestination,
  type FeaturedJourneyRecord,
} from "@/config/featured-trips";
import {
  POSTER_HOLD_DURATION_MS,
  useDestinationVideoSequence,
} from "@/hooks/useDestinationVideoSequence";
import { DESTINATION_DISCOVERY_DICTIONARY } from "@/i18n/destination-discovery-dictionary";
import { useHero } from "@/components/hero/HeroProvider";
import { FloatingNavbar } from "@/components/hero/FloatingNavbar";
import { JourneyCard } from "@/components/featured-trips/JourneyCard";
import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { TripInquiryDrawer } from "@/components/inquiry-drawer/TripInquiryDrawer";
import { FloatingSocialFab } from "@/components/social-fab/FloatingSocialFab";
import { useSectionEntrance } from "@/components/motion/MotionPrimitives";

export interface DestinationDiscoveryExperienceProps {
  initialDestination?: string | null;
  customJourneys?: readonly FeaturedJourneyRecord[];
}

/**
 * Cinematic Destination Discovery Page Experience (`/destinations`):
 * 1. Shared 3-Second Poster-to-Video Sequence (`useDestinationVideoSequence`):
 *    - Selecting Egypt (`01`), Türkiye (`02`), or Dubai (`03`) immediately displays the
 *      corresponding poster (`hero-egypt-poster.jpg`, `hero-turkiye-poster.jpg`, `hero-dubai-poster.jpg`).
 *    - Holds the poster visible for **exactly 3 seconds (`3000ms`)**.
 *    - Loads ONLY the selected destination's `<video>` (`hero-egypt.mp4`, `hero-turkiye.mp4`, `hero-dubai.mp4`).
 *    - After the 3-second interval — and once the video has reached a playable state (`readyState >= 2`) —
 *      reveals the video with a smooth 880ms crossfade (`z-[2]`, `opacity-100`).
 *    - If the video is still loading after 3 seconds, keeps showing the poster until playback is ready.
 *    - Resets the 3-second timer and repeats the sequence whenever the destination changes.
 * 2. Layered 2-Card Destination Carousel (`1 prominent foreground card + 1 partially visible right-edge preview`):
 *    - Egypt (`01`) is the initial active destination.
 *    - Its foreground photograph card is 100% visible (`z-20`, `scale(1)`).
 *    - Only ONE secondary destination preview peeks in from the right edge (`z-10`, `scale(0.90)`, ~45% visible inside the carousel mask).
 *    - The third destination remains off-stage inside the carousel track (`opacity-0`, `pointer-events-none`).
 * 3. Slim `1px` Vertical Progress Indicator (`w-px`) on the Left Rail (`28px` column).
 * 4. Compact Journey Cards (`variant="discovery-compact"`) & Working "View All Trips" Action.
 */
export function DestinationDiscoveryExperience({
  initialDestination,
  customJourneys,
}: DestinationDiscoveryExperienceProps) {
  const {
    locale,
    t,
    theme,
    selectDestinationForBooking,
    openInquiryDrawer,
  } = useHero();

  const isLight = theme === "light";
  const discoveryCopy = DESTINATION_DISCOVERY_DICTIONARY[locale];

  // Egypt is strictly the default initial destination unless a valid URL query param overrides it
  const [selectedId, setSelectedId] = useState<DestinationId>(() =>
    resolveDestinationId(initialDestination, "egypt")
  );
  const [journeyFilter, setJourneyFilter] = useState<DestinationId | "all">(() =>
    resolveDestinationId(initialDestination, "egypt")
  );
  const [transitionTick, setTransitionTick] = useState(0);

  const { ref: heroStageRef, hasEntered: heroEntered, reducedMotion } =
    useSectionEntrance<HTMLElement>({
      immediate: true,
    });

  const { ref: journeysSectionRef, hasEntered: journeysEntered } =
    useSectionEntrance<HTMLElement>({
      threshold: 0.14,
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
    } else {
      selectDestinationForBooking("egypt");
    }
  }, [selectDestinationForBooking]);

  const handleSelectDestination = useCallback(
    (id: DestinationId) => {
      setSelectedId((prev) => {
        if (prev !== id) {
          setTransitionTick((tCount) => tCount + 1);
        }
        return id;
      });
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

  const handleStepDestination = useCallback(
    (delta: number) => {
      const total = DESTINATIONS_CONFIG.length;
      const nextIdx = ((activeIndex + delta) % total + total) % total;
      handleSelectDestination(DESTINATIONS_CONFIG[nextIdx].id);
    },
    [activeIndex, handleSelectDestination]
  );

  // Shared 3-second poster hold + playable readiness video sequence
  const {
    videoRef,
    shouldLoadVideo,
    isPosterHoldActive,
    isPosterHoldElapsed,
    isVideoPlayable,
    isVideoRevealed,
    isWaitingForVideoAfterHold,
    isPosterFallbackActive,
    posterHoldDurationMs,
    sequenceTick,
    handleVideoLoadedData,
    handleVideoCanPlay,
    handleVideoPlaying,
    handleVideoError,
  } = useDestinationVideoSequence({
    activeDestinationId: selectedId,
    reducedMotion,
    posterHoldDurationMs: POSTER_HOLD_DURATION_MS,
  });

  const allJourneys = useMemo(
    () => getFeaturedJourneys(customJourneys),
    [customJourneys]
  );

  const filteredJourneys = useMemo(
    () => getJourneysByDestination(journeyFilter, customJourneys),
    [journeyFilter, customJourneys]
  );

  const handleViewAllTrips = useCallback(() => {
    setJourneyFilter("all");
    const el = document.getElementById("destination-journeys");
    if (el) {
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [reducedMotion]);

  const scrollToJourneysSection = () => {
    const el = document.getElementById("destination-journeys");
    if (el) {
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
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

  /**
   * Deliberate, slower staggered text transitions:
   * - Duration: 680ms
   * - Stagger step: 130ms
   */
  const getCoordinatedCopyStyle = (staggerStep: number): React.CSSProperties => {
    if (reducedMotion) {
      return { opacity: 1, transform: "none" };
    }
    const delayMs = staggerStep * 130;
    return {
      opacity: heroEntered ? 1 : 0,
      transform: heroEntered
        ? "translate3d(0, 0, 0)"
        : "translate3d(0, 16px, 0)",
      transitionProperty: "opacity, transform",
      transitionDuration: "680ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDelay: `${delayMs}ms`,
    };
  };

  return (
    <div
      data-page="destination-discovery"
      data-active-destination={selectedId}
      data-journey-filter={journeyFilter}
      data-transition-tick={transitionTick}
      data-theme-mode={theme}
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-500 ${
        isLight ? "bg-[#FAF8F4] text-[#081C2E]" : "bg-[#051320] text-white"
      }`}
    >
      {/* Keyframes for coordinated 680ms destination copy transition on destination switch */}
      <style>{`
        @keyframes westDestCopyTransition {
          0% {
            opacity: 0;
            transform: translate3d(0, 14px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .west-dest-copy-step-0 {
          animation: westDestCopyTransition 640ms cubic-bezier(0.4, 0, 0.2, 1) 0ms both;
        }
        .west-dest-copy-step-1 {
          animation: westDestCopyTransition 680ms cubic-bezier(0.4, 0, 0.2, 1) 120ms both;
        }
        .west-dest-copy-step-2 {
          animation: westDestCopyTransition 680ms cubic-bezier(0.4, 0, 0.2, 1) 240ms both;
        }
        .west-dest-copy-step-3 {
          animation: westDestCopyTransition 700ms cubic-bezier(0.4, 0, 0.2, 1) 360ms both;
        }
        .west-dest-copy-step-4 {
          animation: westDestCopyTransition 700ms cubic-bezier(0.4, 0, 0.2, 1) 480ms both;
        }
      `}</style>

      {/* SECTION 1 — CINEMATIC DESTINATION SELECTOR STAGE */}
      <section
        ref={heroStageRef}
        id="destination-selector-stage"
        aria-label="Cinematic Destination Selector — Egypt, Türkiye & Dubai"
        onKeyDown={handleSelectorKeyDown}
        className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#04111D] text-white"
      >
        {/* 1A. 3-Second Poster-to-Video Stage with Softly Defocused Ambient Rim & Clear Active Video */}
        <div
          aria-hidden="true"
          data-active-poster-src={activeConfig.posterImageJpg}
          data-active-video-src={activeConfig.videoMp4}
          data-active-canva-design={activeConfig.canvaAsset.designId}
          data-poster-hold-duration-ms={posterHoldDurationMs}
          data-poster-hold-active={isPosterHoldActive ? "true" : "false"}
          data-poster-hold-elapsed={isPosterHoldElapsed ? "true" : "false"}
          data-video-playable={isVideoPlayable ? "true" : "false"}
          data-video-stage-active={isVideoRevealed ? "true" : "false"}
          data-waiting-for-video={isWaitingForVideoAfterHold ? "true" : "false"}
          data-poster-fallback={isPosterFallbackActive ? "true" : "false"}
          data-video-ready-for={isVideoRevealed ? selectedId : "poster"}
          data-sequence-tick={sequenceTick}
          className="pointer-events-none absolute inset-0 overflow-hidden select-none bg-[#04111D]"
        >
          {/* Layer 0 (z-0): Softly Blurred Ambient Destination Atmosphere (Provides peripheral depth while keeping the stage clear) */}
          <div
            data-discovery-ambient-blur={selectedId}
            className="absolute inset-0 z-0 opacity-35 blur-xl scale-105 transition-opacity duration-[880ms] ease-in-out"
          >
            <Image
              src={activeConfig.posterImageJpg}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: activeConfig.objectPosition }}
            />
          </div>

          {/* Layer 1 (z-[1]): Immediate High-Resolution Destination Poster (Visible immediately for 3 full seconds, and kept visible if video is still loading) */}
          {DESTINATIONS_CONFIG.map((dest) => {
            const isActive = dest.id === selectedId;
            return (
              <div
                key={`poster-stage-${dest.id}`}
                data-discovery-poster={dest.id}
                data-poster-src={dest.posterImageJpg}
                className={`absolute inset-0 transition-opacity duration-[880ms] ease-in-out ${
                  isActive ? "opacity-100 z-[1]" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={dest.posterImageJpg}
                  alt={t.destinations[dest.id].imageAlt}
                  fill
                  priority={dest.id === "egypt"}
                  sizes="100vw"
                  className="object-cover transition-transform duration-[1100ms] ease-in-out"
                  style={{
                    objectPosition: dest.objectPosition,
                    transform:
                      isActive && !reducedMotion ? "scale(1.02)" : "scale(1.06)",
                  }}
                />
              </div>
            );
          })}

          {/* Layer 2 (z-[2]): Single Lazy-Loaded Active Destination Video (Revealed with 880ms crossfade ONLY after 3-second poster hold + playable state) */}
          {shouldLoadVideo && (
            <div
              data-discovery-video-layer={activeConfig.id}
              className={`absolute inset-0 z-[2] transition-opacity duration-[880ms] ease-in-out ${
                isVideoRevealed ? "opacity-100" : "opacity-0"
              }`}
            >
              <video
                ref={videoRef}
                key={`${activeConfig.id}-${sequenceTick}`}
                src={activeConfig.videoMp4}
                poster={activeConfig.posterImageJpg}
                muted
                playsInline
                loop
                preload="metadata"
                onLoadedData={handleVideoLoadedData}
                onCanPlay={handleVideoCanPlay}
                onPlaying={handleVideoPlaying}
                onError={handleVideoError}
                className="h-full w-full object-cover"
                style={{ objectPosition: activeConfig.objectPosition }}
              >
                <source src={activeConfig.videoMp4} type="video/mp4" />
                <source
                  src={activeConfig.videoMp4SecondaryPath}
                  type="video/mp4"
                />
              </video>
            </div>
          )}

          {/* Layer 3 (z-[3]): Controlled, Localized Readability Overlay (Preserves landmark video clarity on center/right) */}
          <div
            className="absolute inset-0 z-[3] transition-opacity duration-[880ms] ease-in-out"
            style={{
              background:
                "linear-gradient(90deg, rgba(4,15,26,0.72) 0%, rgba(4,15,26,0.42) 42%, rgba(4,15,26,0.12) 70%, rgba(4,15,26,0.28) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 z-[3] h-28"
            style={{
              background:
                "linear-gradient(to bottom, rgba(4,15,26,0.48), transparent)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 z-[3] h-32"
            style={{
              background:
                "linear-gradient(to top, rgba(5,19,32,0.92) 0%, rgba(5,19,32,0.42) 55%, transparent 100%)",
            }}
          />
        </div>

        {/* 1B. Shared Floating Liquid-Glass Navbar (Includes Home link + Clickable Logo) */}
        <FloatingNavbar
          hasAccountRoute={false}
          onSelectDiscoveryDestination={handleSelectDestination}
        />

        {/* 1C. Main Interactive Stage: Left-Shifted 1px Rail + Left Editorial Copy + Right 1-Full / 1-Peeking Layered Carousel */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center pl-3 pr-4 sm:pl-5 sm:pr-8 lg:pl-6 lg:pr-10 py-6 lg:py-10">
          {/* Mobile & Tablet Compact Top Step Rail (< 1024px) */}
          <div
            role="tablist"
            aria-label={discoveryCopy.railAriaLabel}
            className="mb-5 flex lg:hidden items-center justify-between gap-3 rounded-2xl bg-[#061A2C]/55 border border-white/25 px-3.5 py-2 backdrop-blur-md"
          >
            <div className="flex items-center gap-1.5">
              {DESTINATIONS_CONFIG.map((dest) => {
                const isCurrent = dest.id === selectedId;
                return (
                  <button
                    key={`mobile-rail-${dest.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    onClick={() => handleSelectDestination(dest.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
                      isCurrent
                        ? "bg-[#0E7C8E] text-white ring-1 ring-[#5EEAD4]"
                        : "bg-white/10 text-white/75 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span className="font-mono text-[10.5px]">
                      {dest.orderNumber}
                    </span>
                    <span>{t.destinations[dest.id].name}</span>
                  </button>
                );
              })}
            </div>
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#F4C266]">
              {activeConfig.orderNumber} / 0{DESTINATIONS_CONFIG.length}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[28px_minmax(0,1.05fr)_minmax(0,1fr)] xl:grid-cols-[32px_minmax(0,1.08fr)_minmax(0,1fr)] items-center gap-6 lg:gap-8 xl:gap-10">
            {/* Column 1: Left-Shifted, Thinner 1px Vertical Progress Rail */}
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={discoveryCopy.railAriaLabel}
              data-progress-rail="desktop"
              className="hidden lg:flex flex-col items-center justify-between h-[390px] py-1 select-none -ml-1 xl:-ml-2"
            >
              <div className="relative flex flex-col items-center justify-between flex-1 w-full">
                {/* 1px Hairline Track */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-2 left-1/2 -translate-x-1/2 w-px bg-white/22"
                />
                {/* 1px Active Progress Fill (960ms transition) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#F4C266]/85 to-[#5EEAD4]/85 transition-all duration-[960ms] ease-in-out"
                  style={{
                    height: `${
                      ((activeIndex + 1) / DESTINATIONS_CONFIG.length) * 86
                    }%`,
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
                      className="group relative z-10 flex h-7 w-7 items-center justify-center focus-visible:outline-none"
                    >
                      <span
                        className={`flex items-center justify-center rounded-full font-mono text-[10.5px] font-semibold transition-all duration-700 ease-in-out ${
                          isCurrent
                            ? "h-6 w-6 bg-[#061A2C]/85 text-white border border-[#5EEAD4]/85 ring-2 ring-[#5EEAD4]/25 shadow-[0_0_14px_rgba(45,212,191,0.4)] backdrop-blur-md"
                            : "h-2 w-2 bg-white/40 group-hover:h-2.5 group-hover:w-2.5 group-hover:bg-[#F4C266]"
                        }`}
                      >
                        {isCurrent ? idx + 1 : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Rotated Fractional Step Indicator at Bottom of Rail (01 / 03) */}
              <div className="mt-7 pt-3 flex flex-col items-center">
                <span className="-rotate-90 font-mono text-[10px] font-medium tracking-[0.22em] text-white/75 whitespace-nowrap">
                  {activeConfig.orderNumber}/0{DESTINATIONS_CONFIG.length}
                </span>
              </div>
            </div>

            {/* Column 2: Coordinated Active Destination Title, Copy & CTAs */}
            <div
              key={`copy-block-${selectedId}`}
              className="flex flex-col items-start text-left min-w-0 lg:pl-2"
            >
              {/* Step 0: Active Destination Badge + Live Video Indicator */}
              <div
                style={getCoordinatedCopyStyle(0)}
                className="west-dest-copy-step-0 flex flex-wrap items-center gap-2.5"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#061A2C]/50 border border-white/25 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A5F3FC] backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-[#F4C266]" />
                  <span>
                    {activeConfig.orderNumber} · {activeHeroCopy.locationBadge}
                  </span>
                </span>

                <span
                  data-video-stage-badge={isVideoRevealed ? "playing" : "poster-hold"}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/12 border border-white/20 px-3 py-1 text-[10.5px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-md"
                >
                  <Play className="h-2.5 w-2.5 fill-[#5EEAD4] text-[#5EEAD4]" />
                  <span>{discoveryCopy.videoAtmosphereLabel}</span>
                </span>
              </div>

              {/* Step 1: Large Cinematic Destination Display Title */}
              <h1
                style={getCoordinatedCopyStyle(1)}
                data-discovery-heading={selectedId}
                className="west-dest-copy-step-1 mt-4 sm:mt-5 font-serif text-5xl sm:text-6xl xl:text-[4.75rem] font-bold uppercase tracking-[0.04em] leading-[1.02] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.65)]"
              >
                {activeCopy.displayTitle}
              </h1>

              {/* Step 2: Subtitle & Editorial Introduction */}
              <div
                style={getCoordinatedCopyStyle(2)}
                className="west-dest-copy-step-2 mt-2.5"
              >
                <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#F4C266] drop-shadow">
                  <MapPin className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
                  <span>{activeCopy.subtitle}</span>
                </p>

                <p className="mt-3.5 max-w-xl text-sm sm:text-base lg:text-[16px] font-normal leading-relaxed text-white/92 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                  {activeCopy.editorialIntro}
                </p>
              </div>

              {/* Step 3: Confirmed Corridor Pills */}
              <div
                style={getCoordinatedCopyStyle(3)}
                className="west-dest-copy-step-3 mt-5 flex flex-wrap items-center gap-2"
              >
                {activeCopy.corridorBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#061A2C]/45 border border-white/22 px-3 py-1 text-xs font-medium text-white/92 backdrop-blur-md"
                  >
                    <Compass className="h-3 w-3 text-[#2DD4BF]" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>

              {/* Step 4: Prominent Compact CTA Row */}
              <div
                style={getCoordinatedCopyStyle(4)}
                className="west-dest-copy-step-4 mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5"
              >
                <button
                  type="button"
                  onClick={scrollToJourneysSection}
                  data-discovery-primary-cta={selectedId}
                  className="group inline-flex items-center gap-3.5 rounded-2xl bg-gradient-to-r from-[#0C7486] via-[#0E869A] to-[#149BB0] px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-[15px] font-semibold text-white shadow-[0_14px_34px_rgba(14,124,142,0.48)] border border-[#5EEAD4]/45 transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                >
                  <span>{activeCopy.ctaExploreJourneys}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={(e) =>
                    openInquiryDrawer(
                      { destination: selectedId },
                      e.currentTarget
                    )
                  }
                  data-discovery-inquire-cta={selectedId}
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-[#061A2C]/45 hover:bg-[#061A2C]/65 border border-white/35 px-6 py-3.5 sm:py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                >
                  <span>{activeCopy.ctaInquireDestination}</span>
                </button>
              </div>
            </div>

            {/* Column 3: Layered 2-Card Destination Carousel (1 Full Foreground Card + 1 ~45% Peeking Side Preview) */}
            <div className="flex flex-col items-end w-full min-w-0">
              {/* Viewport Mask: Shows 100% of the active 310px card + ~45% (~138px) of the secondary 300px preview card */}
              <div
                data-carousel-viewport="one-featured-one-peeking"
                className="relative w-full max-w-[430px] sm:max-w-[462px] xl:max-w-[488px] h-[408px] sm:h-[448px] xl:h-[472px] overflow-hidden select-none"
              >
                {DESTINATIONS_CONFIG.map((dest, destIdx) => {
                  const total = DESTINATIONS_CONFIG.length;
                  const relSlot =
                    ((destIdx - activeIndex) % total + total) % total;
                  const isPrimaryActive = relSlot === 0;
                  const isSecondaryPeek = relSlot === 1;
                  const isHiddenThird = relSlot === 2;

                  const destEditorial = discoveryCopy.destinations[dest.id];
                  const destHero = t.destinations[dest.id];

                  // Deliberate 900ms cubic-bezier(0.4, 0, 0.2, 1) layered carousel transform
                  const slotTransform = isPrimaryActive
                    ? "translate3d(0px, 0px, 0) scale(1)"
                    : isSecondaryPeek
                    ? "translate3d(324px, 24px, 0) scale(0.90)"
                    : "translate3d(640px, 42px, 0) scale(0.84)";

                  return (
                    <div
                      key={`carousel-card-${dest.id}`}
                      data-carousel-item={dest.id}
                      data-carousel-slot={
                        isPrimaryActive
                          ? "active-foreground"
                          : isSecondaryPeek
                          ? "secondary-peek"
                          : "offstage-third"
                      }
                      aria-hidden={isHiddenThird}
                      style={{
                        transform: reducedMotion
                          ? isPrimaryActive
                            ? "translate3d(0px, 0px, 0)"
                            : isSecondaryPeek
                            ? "translate3d(324px, 24px, 0)"
                            : "translate3d(640px, 42px, 0)"
                          : slotTransform,
                        opacity: isPrimaryActive
                          ? 1
                          : isSecondaryPeek
                          ? 0.92
                          : 0,
                        zIndex: isPrimaryActive
                          ? 20
                          : isSecondaryPeek
                          ? 10
                          : 0,
                        transitionProperty: "transform, opacity, box-shadow",
                        transitionDuration: reducedMotion ? "0ms" : "900ms",
                        transitionTimingFunction:
                          "cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      className={`absolute top-0 left-0 w-[276px] sm:w-[304px] xl:w-[316px] ${
                        isHiddenThird
                          ? "pointer-events-none"
                          : "pointer-events-auto"
                      }`}
                    >
                      {/* Top Caption + 5-Dot Indicator Above Card */}
                      <div className="mb-2.5 px-1">
                        <p className="truncate text-xs sm:text-[13px] font-semibold text-white drop-shadow">
                          {isPrimaryActive
                            ? destEditorial.featuredLandmarkTitle
                            : destHero.name}
                        </p>
                        <div
                          className="mt-1 flex items-center gap-1.5"
                          aria-hidden="true"
                        >
                          {[0, 1, 2, 3, 4].map((dotIdx) => (
                            <span
                              key={dotIdx}
                              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                                isPrimaryActive
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

                      {/* Card Button */}
                      <button
                        type="button"
                        tabIndex={isHiddenThird ? -1 : 0}
                        data-discovery-preview-card={dest.id}
                        data-preview-role={
                          isPrimaryActive
                            ? "active-featured"
                            : isSecondaryPeek
                            ? "secondary-peek"
                            : "hidden-third"
                        }
                        aria-pressed={isPrimaryActive}
                        aria-label={`${discoveryCopy.previewSelectLabel}: ${destHero.name} — ${destEditorial.featuredLandmarkTitle}`}
                        onClick={() => {
                          if (isPrimaryActive) {
                            scrollToJourneysSection();
                          } else {
                            handleSelectDestination(dest.id);
                          }
                        }}
                        className={`group relative w-full h-[352px] sm:h-[388px] xl:h-[408px] overflow-hidden rounded-[22px] text-left transition-all duration-700 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
                          isPrimaryActive
                            ? "border border-white/45 ring-1 ring-[#5EEAD4]/70 shadow-[0_26px_60px_rgba(2,10,20,0.72)]"
                            : "border border-white/25 shadow-[0_18px_42px_rgba(2,10,20,0.55)] hover:border-[#5EEAD4]/65"
                        }`}
                      >
                        {/* Clear, Unblurred Destination Photograph */}
                        <Image
                          src={dest.cardImageWebp}
                          alt={destHero.imageAlt}
                          fill
                          sizes="(max-width: 640px) 280px, 320px"
                          className="object-cover transition-transform duration-[900ms] ease-in-out group-hover:scale-105"
                          style={{ objectPosition: dest.objectPosition }}
                        />

                        {/* Subtle Lower Scrim so top landmark scenery stays crisp and unobstructed */}
                        <div
                          aria-hidden="true"
                          className={`absolute inset-0 transition-opacity duration-700 ${
                            isPrimaryActive
                              ? "bg-gradient-to-t from-[#03111F]/88 via-[#041526]/18 to-transparent"
                              : "bg-gradient-to-t from-[#03111F]/90 via-[#041526]/35 to-[#041220]/25"
                          }`}
                        />

                        {/* Top-Right Circular Bookmark Badge */}
                        <span
                          aria-hidden="true"
                          className={`absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-transform duration-300 group-hover:scale-105 ${
                            isPrimaryActive
                              ? "bg-white text-[#081C2E]"
                              : "bg-white/85 text-[#081C2E]"
                          }`}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              isPrimaryActive
                                ? "fill-[#0E7C8E] text-[#0E7C8E]"
                                : "text-[#081C2E]"
                            }`}
                          />
                        </span>

                        {/* Top-Left Order Pill */}
                        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1 rounded-full bg-[#051525]/55 border border-white/25 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-md">
                          {dest.orderNumber}
                        </span>

                        {/* Compact Liquid-Glass Bottom Caption */}
                        <div className="absolute inset-x-3.5 bottom-3.5">
                          <div className="rounded-2xl bg-[#061A2C]/58 border border-white/25 p-3 backdrop-blur-md">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5EEAD4]">
                              {isPrimaryActive
                                ? discoveryCopy.activeSelectionBadge
                                : discoveryCopy.nextPreviewBadge}
                            </p>
                            <p className="mt-0.5 truncate font-serif text-base sm:text-lg font-semibold text-white">
                              {destHero.name}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] text-white/85">
                              {destEditorial.featuredLandmarkSubtitle}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Carousel Controls Row: Prev/Next Circular Buttons + Quick Destination Pills + 01 / 03 Counter */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 w-full max-w-[430px] sm:max-w-[462px] xl:max-w-[488px] px-1">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleStepDestination(-1)}
                    aria-label={discoveryCopy.prevDestinationLabel}
                    data-discovery-nav="prev"
                    className="west-navbar-liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepDestination(1)}
                    aria-label={discoveryCopy.nextDestinationLabel}
                    data-discovery-nav="next"
                    className="west-navbar-liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Direct 3-Destination Quick Switcher Pills */}
                <div className="flex items-center gap-1.5">
                  {DESTINATIONS_CONFIG.map((dest) => {
                    const isCurrent = dest.id === selectedId;
                    return (
                      <button
                        key={`quick-pill-${dest.id}`}
                        type="button"
                        onClick={() => handleSelectDestination(dest.id)}
                        data-carousel-pill={dest.id}
                        aria-pressed={isCurrent}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
                          isCurrent
                            ? "bg-[#0E7C8E] text-white border border-[#5EEAD4]/60 shadow-sm"
                            : "bg-[#061A2C]/45 text-white/75 border border-white/15 hover:text-white hover:bg-white/15 backdrop-blur-md"
                        }`}
                      >
                        {t.destinations[dest.id].name}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-white/85">
                  <span className="text-[#5EEAD4]">
                    {activeConfig.orderNumber}
                  </span>
                  <span className="h-px w-6 bg-white/35" aria-hidden="true" />
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

      {/* SECTION 2 — COMPACT JOURNEY LISTING & WORKING "VIEW ALL TRIPS" */}
      <section
        ref={journeysSectionRef}
        id="destination-journeys"
        aria-labelledby="destination-journeys-heading"
        data-theme-mode={theme}
        className={`relative w-full py-14 sm:py-18 lg:py-20 transition-colors duration-500 [background:var(--west-surface-trips)] ${
          isLight ? "text-[#081C2E]" : "text-white"
        }`}
      >
        <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-8 lg:px-12">
          {/* Header & Interactive Destination Filter Pills + Prominent "View All Trips" Action */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E2D8C5] dark:border-white/10 pb-7">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[#C89648] dark:bg-[#F4C266]"
                />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                  {discoveryCopy.journeysSectionEyebrow}
                </span>
              </div>

              <h2
                id="destination-journeys-heading"
                className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight"
              >
                {journeyFilter === "all"
                  ? discoveryCopy.journeysSectionAllHeading
                  : `${discoveryCopy.journeysSectionHeadingPrefix} ${t.destinations[journeyFilter].name}`}
              </h2>

              <p
                className={`mt-2.5 text-sm sm:text-[15px] leading-relaxed ${
                  isLight ? "text-[#546576]" : "text-slate-300"
                }`}
              >
                {discoveryCopy.journeysSectionSupporting}
              </p>
            </div>

            {/* Destination Filter Tabs + Working "View All Trips" Button */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                role="tablist"
                aria-label="Filter journeys by destination"
                className="flex flex-wrap items-center gap-2"
              >
                {DESTINATIONS_CONFIG.map((dest) => {
                  const count = getJourneysByDestination(
                    dest.id,
                    customJourneys
                  ).length;
                  const isSelectedTab = journeyFilter === dest.id;
                  return (
                    <button
                      key={`filter-tab-${dest.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelectedTab}
                      data-journey-filter-tab={dest.id}
                      onClick={() => handleSelectDestination(dest.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-[13px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                        isSelectedTab
                          ? "bg-[#0E7C8E] text-white shadow-[0_8px_20px_rgba(14,124,142,0.30)]"
                          : isLight
                          ? "bg-white border border-[#DCD2C0] text-[#081C2E] hover:border-[#0E7C8E]"
                          : "bg-[#092032] border border-white/15 text-white/85 hover:border-[#2DD4BF]"
                      }`}
                    >
                      <span>{t.destinations[dest.id].name}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 font-mono text-[10.5px] ${
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
              </div>

              {/* Working "View All Trips" Button — Expands collection to show all 5 configured journeys */}
              <button
                type="button"
                data-view-all-trips-button=""
                aria-pressed={journeyFilter === "all"}
                onClick={handleViewAllTrips}
                className={`group inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-[13px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                  journeyFilter === "all"
                    ? "bg-[#0B2B4B] dark:bg-[#2DD4BF] text-white dark:text-[#041421] shadow-md"
                    : "bg-gradient-to-r from-[#0C7486] via-[#0E869A] to-[#149BB0] text-white shadow-[0_8px_20px_rgba(14,124,142,0.28)] hover:brightness-105"
                }`}
              >
                <Layers className="h-3.5 w-3.5 shrink-0" />
                <span>{discoveryCopy.viewAllTripsCta}</span>
                <span className="rounded-full bg-white/20 dark:bg-black/15 px-1.5 py-0.5 font-mono text-[10.5px]">
                  {allJourneys.length}
                </span>
              </button>
            </div>
          </div>

          {/* Active Destination Summary Bar */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-medium">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#0E7C8E] dark:bg-[#2DD4BF]" />
              <span>
                <strong>{filteredJourneys.length}</strong>{" "}
                {filteredJourneys.length === 1
                  ? discoveryCopy.journeysCountSingular
                  : discoveryCopy.journeysCountPlural}{" "}
                ·{" "}
                {journeyFilter === "all"
                  ? discoveryCopy.showingAllTripsLabel
                  : `${t.destinations[journeyFilter].locationBadge} (${t.destinations[journeyFilter].regionLabel})`}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {journeyFilter !== "all" && (
                <button
                  type="button"
                  onClick={handleViewAllTrips}
                  className={`inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold transition-colors ${
                    isLight
                      ? "text-[#0B2B4B] hover:text-[#0E7C8E]"
                      : "text-white/90 hover:text-[#5EEAD4]"
                  }`}
                >
                  <span>
                    {discoveryCopy.viewAllTripsCta} ({allJourneys.length})
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={(e) =>
                  openInquiryDrawer(
                    {
                      destination:
                        journeyFilter === "all" ? selectedId : journeyFilter,
                    },
                    e.currentTarget
                  )
                }
                className={`inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold transition-colors ${
                  isLight
                    ? "text-[#0E7C8E] hover:text-[#095E6D]"
                    : "text-[#5EEAD4] hover:text-white"
                }`}
              >
                <span>{discoveryCopy.requestCustomQuoteCta}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Compact, Scalable 3-Column Journey Cards Grid */}
          {filteredJourneys.length > 0 ? (
            <>
              <div
                key={`grid-${journeyFilter}`}
                data-journey-results-grid={journeyFilter}
                data-journey-results-count={filteredJourneys.length}
                className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
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
                    variant="discovery-compact"
                  />
                ))}
              </div>

              {/* Bottom Expand Bar when viewing a single destination's subset */}
              {journeyFilter !== "all" &&
                allJourneys.length > filteredJourneys.length && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={handleViewAllTrips}
                      data-expand-all-trips-cta=""
                      className={`group inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                        isLight
                          ? "bg-gradient-to-r from-[#0C7486] via-[#0E869A] to-[#149BB0] shadow-[0_10px_24px_rgba(14,124,142,0.24)] hover:brightness-105"
                          : "bg-gradient-to-r from-[#0D7688] via-[#118CA1] to-[#16A3B8] border border-[#5EEAD4]/35 shadow-[0_12px_28px_rgba(2,10,18,0.6)] hover:brightness-110"
                      }`}
                    >
                      <span>
                        {discoveryCopy.viewAllTripsCta} ({allJourneys.length})
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
            </>
          ) : (
            <div
              data-empty-state="true"
              className={`mt-10 rounded-[24px] border p-8 sm:p-10 text-center max-w-2xl mx-auto ${
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
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={(e) =>
                    openInquiryDrawer(
                      {
                        destination:
                          journeyFilter === "all" ? selectedId : journeyFilter,
                      },
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
                  onClick={handleViewAllTrips}
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
