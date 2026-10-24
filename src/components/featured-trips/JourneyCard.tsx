"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  FileText,
  ArrowRight,
  Compass,
  Info,
} from "lucide-react";
import type { FeaturedJourneyRecord } from "@/config/featured-trips";
import type {
  FeaturedTripsTranslation,
  SupportedLocale,
} from "@/i18n/hero-dictionary";
import { DESTINATION_DISCOVERY_DICTIONARY } from "@/i18n/destination-discovery-dictionary";
import {
  getDirectionalMaskStyle,
  getImageScaleSettleStyle,
  type MaskDirection,
} from "@/components/motion/MotionPrimitives";

export interface JourneyCardProps {
  journey: FeaturedJourneyRecord;
  copy: FeaturedTripsTranslation;
  locale?: SupportedLocale;
  isLight: boolean;
  hasEntered: boolean;
  reducedMotion: boolean;
  isSpotlightActive?: boolean;
  variant:
    | "desktop-compact"
    | "desktop-featured"
    | "tablet-featured"
    | "tablet-compact"
    | "mobile"
    | "discovery-compact";
  onSelectCard?: (index: number) => void;
}

/**
 * Individual bookable Journey Card for WEST GLOBAL TOURS (reused across Homepage Featured Trips,
 * Destination Discovery, and Related Journeys).
 * - Clicking either the card surface OR the Explore Journey CTA opens `/trips/[slug]` (`journey.href`).
 * - High-contrast overlay engineering:
 *   1. Top location badge sits inside a dark frosted pill (`bg-[#041322]/78`) with a warm-gold pin icon.
 *   2. Multi-stop directional bottom gradient scrim (`h-[78%]` on compact/mobile, `h-[68%]` on hover-expand)
 *      paired with crisp text shadows so titles, descriptions, durations, and prices remain 100% readable.
 */
export function JourneyCard({
  journey,
  copy,
  locale = "en",
  isLight,
  hasEntered,
  reducedMotion,
  isSpotlightActive = false,
  variant,
  onSelectCard,
}: JourneyCardProps) {
  const router = useRouter();
  const [touchExpanded, setTouchExpanded] = useState(false);

  const isFeaturedSize =
    variant === "desktop-featured" || variant === "tablet-featured";
  const isDiscoveryCompact = variant === "discovery-compact";
  const isMobile = variant === "mobile";

  const localizedJourney =
    DESTINATION_DISCOVERY_DICTIONARY[locale]?.journeys[journey.slug];

  const resolvedTitle = localizedJourney?.title ?? journey.title;
  const resolvedLocation =
    localizedJourney?.locationLabel ?? journey.locationLabel;
  const resolvedDescription =
    localizedJourney?.description ?? journey.description;
  const resolvedCorridor =
    localizedJourney?.corridorLabel ?? journey.itineraryMetadata.corridorLabel;
  const resolvedInquiryFormat =
    localizedJourney?.inquiryFormatLabel ??
    journey.itineraryMetadata.inquiryFormatLabel;

  const getEntranceTiming = (): {
    cardDelayMs: number;
    maskDirection: MaskDirection;
  } => {
    if (isMobile || isDiscoveryCompact) {
      return {
        cardDelayMs: 110 + (journey.carouselIndex % 5) * 120,
        maskDirection: "top-to-bottom",
      };
    }
    if (journey.columnPosition === "left") {
      return {
        cardDelayMs: journey.columnStackIndex === 0 ? 140 : 320,
        maskDirection: "top-to-bottom",
      };
    }
    if (journey.columnPosition === "center") {
      return {
        cardDelayMs: 230,
        maskDirection: "bottom-to-top",
      };
    }
    return {
      cardDelayMs: journey.columnStackIndex === 0 ? 185 : 365,
      maskDirection: "top-to-bottom",
    };
  };

  const { cardDelayMs, maskDirection } = getEntranceTiming();
  const contentDelayMs = cardDelayMs + 260;
  const ctaDelayMs = cardDelayMs + 420;

  // Thin-line progressive clip-path reveal (1320ms)
  const imageMaskStyle = getDirectionalMaskStyle(
    maskDirection,
    hasEntered,
    reducedMotion,
    cardDelayMs,
    1320,
    isDiscoveryCompact ? "18px" : "20px"
  );

  // Subtle scale settling (1.05 -> 1.0 over 1420ms) inside the expanding mask
  const imageScaleStyle = getImageScaleSettleStyle(
    hasEntered,
    reducedMotion,
    cardDelayMs,
    1420
  );

  const overlayContentStyle: React.CSSProperties = reducedMotion
    ? { opacity: 1, transform: "none" }
    : {
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered
          ? "translate3d(0, 0, 0)"
          : "translate3d(0, 12px, 0)",
        transitionProperty: "opacity, transform",
        transitionDuration: "880ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${contentDelayMs}ms`,
      };

  const ctaEntranceStyle: React.CSSProperties = reducedMotion
    ? { opacity: 1, transform: "none" }
    : {
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered
          ? "translate3d(0, 0, 0)"
          : "translate3d(0, 14px, 0)",
        transitionProperty:
          "opacity, transform, background-color, border-color, box-shadow",
        transitionDuration: "860ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${ctaDelayMs}ms`,
      };

  const heightClasses =
    variant === "desktop-featured"
      ? "h-[504px] xl:h-[536px]"
      : variant === "desktop-compact"
      ? "h-[240px] xl:h-[256px]"
      : variant === "tablet-featured"
      ? "h-[360px]"
      : variant === "tablet-compact"
      ? "h-[252px]"
      : variant === "discovery-compact"
      ? "h-[264px] sm:h-[274px] lg:h-[284px]"
      : "h-[396px] sm:h-[416px]";

  const cardSurfaceClasses =
    journey.isFeaturedCenter && !isDiscoveryCompact
      ? isLight
        ? "bg-[#092136] border border-[#22D3EE]/80 ring-1 ring-[#22D3EE]/60 shadow-[0_22px_52px_rgba(10,32,54,0.22),0_0_26px_rgba(34,211,238,0.30)] hover:shadow-[0_28px_60px_rgba(10,32,54,0.30),0_0_34px_rgba(34,211,238,0.42)]"
        : "bg-[#071A2C] border border-[#2DD4BF]/75 ring-1 ring-[#2DD4BF]/50 shadow-[0_26px_58px_rgba(2,8,16,0.82),0_0_28px_rgba(45,212,191,0.24)] hover:shadow-[0_30px_64px_rgba(2,8,16,0.92),0_0_36px_rgba(45,212,191,0.36)]"
      : isLight
      ? `bg-[#0B2236] border ${
          isSpotlightActive
            ? "border-[#0E7C8E] ring-2 ring-[#149BB0]/55 shadow-[0_22px_48px_rgba(14,124,142,0.24)]"
            : "border-white/90 shadow-[0_14px_32px_rgba(11,30,49,0.14)] hover:border-[#149BB0]/65 hover:shadow-[0_20px_42px_rgba(11,30,49,0.22)]"
        }`
      : `bg-[#07192A] border ${
          isSpotlightActive
            ? "border-[#2DD4BF]/80 ring-2 ring-[#2DD4BF]/45 shadow-[0_24px_52px_rgba(2,9,18,0.85)]"
            : "border-white/15 shadow-[0_18px_38px_rgba(2,9,18,0.68)] hover:border-[#2DD4BF]/55 hover:shadow-[0_24px_48px_rgba(2,9,18,0.84)]"
        }`;

  const durationText = journey.durationLabel ?? copy.durationPlaceholder;
  const priceOrQuoteText = journey.startingPriceLabel ?? copy.quotePlaceholder;

  const handleCardSurfaceClick = () => {
    onSelectCard?.(journey.carouselIndex);
    router.push(journey.href);
  };

  return (
    <article
      data-journey-card={journey.id}
      data-journey-slug={journey.slug}
      data-journey-href={journey.href}
      data-journey-destination={journey.destinationId}
      data-column-position={journey.columnPosition}
      data-featured-center={journey.isFeaturedCenter ? "true" : "false"}
      data-card-variant={variant}
      data-mask-direction={maskDirection}
      data-reveal-state={hasEntered ? "revealed" : "masked-thin-line"}
      onClick={handleCardSurfaceClick}
      className={`group relative w-full cursor-pointer ${heightClasses} ${
        isDiscoveryCompact ? "rounded-[18px]" : "rounded-[20px]"
      } overflow-hidden select-none transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-[#2DD4BF] focus-within:ring-offset-2 ${
        isLight
          ? "focus-within:ring-offset-[#FAF8F3]"
          : "focus-within:ring-offset-[#061523]"
      } ${cardSurfaceClasses}`}
    >
      {/* Scenic Travel Photograph with 1.32s Thin-Line Progressive Mask Reveal */}
      <div className="absolute inset-0" style={imageMaskStyle}>
        <div className="relative h-full w-full" style={imageScaleStyle}>
          <Image
            src={journey.imageWebp}
            alt={journey.imageAlt}
            fill
            quality={90}
            sizes={
              isFeaturedSize
                ? "(max-width: 768px) 92vw, (max-width: 1280px) 50vw, 560px"
                : "(max-width: 768px) 92vw, (max-width: 1280px) 44vw, 480px"
            }
            className="object-cover contrast-[1.03] saturate-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.05] group-focus-within:scale-[1.04]"
            style={{ objectPosition: journey.objectPosition }}
          />
        </div>

        {/* Top Vignette Scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#03101D]/65 via-[#03101D]/24 to-transparent"
        />

        {/* Multi-Stop Directional Bottom Scrim */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 ${
            isDiscoveryCompact || isMobile ? "h-[78%]" : "h-[68%]"
          } bg-[linear-gradient(to_top,rgba(2,10,19,0.96)_0%,rgba(4,17,30,0.88)_38%,rgba(5,22,38,0.52)_68%,transparent_100%)] transition-opacity duration-500`}
        />

        {/* Hover / Focus / Expanded Readability Veil */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(2,10,19,0.98)_0%,rgba(4,19,33,0.84)_56%,rgba(4,16,28,0.32)_100%)] transition-opacity duration-500 ${
            touchExpanded
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          }`}
        />
      </div>

      {/* Subtle warm-gold/teal thin starting line accent */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent to-transparent ${
          journey.isFeaturedCenter && !isDiscoveryCompact
            ? "via-[#67E8F9]/90 opacity-95"
            : isLight
            ? "via-[#D4B475]/85 opacity-85"
            : "via-white/40 opacity-75"
        }`}
      />

      {/* Top Row: High-Contrast Frosted Location Pill + Details Toggle */}
      <div
        style={overlayContentStyle}
        className={`absolute inset-x-3.5 sm:inset-x-4 ${
          isDiscoveryCompact ? "top-3.5" : "top-4"
        } flex items-center justify-between gap-2 z-10`}
      >
        <div
          data-card-location-pill={journey.id}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#041322]/78 border border-white/25 px-3 py-1 text-white shadow-[0_4px_14px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <MapPin
            aria-hidden="true"
            className="h-3 w-3 text-[#F4C266] shrink-0 stroke-[2.2]"
          />
          <span className="text-xs font-semibold tracking-wide text-white">
            {resolvedLocation}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTouchExpanded((prev) => !prev);
          }}
          aria-expanded={touchExpanded}
          aria-label={`${
            touchExpanded ? copy.hideDetailsLabel : copy.moreDetailsLabel
          } — ${resolvedTitle}`}
          className="md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 inline-flex items-center gap-1 rounded-full bg-[#041322]/82 hover:bg-[#0E7C8E]/90 border border-white/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-all duration-300 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
        >
          <Info className="h-3 w-3 text-[#5EEAD4]" />
          <span className="sr-only sm:not-sr-only">
            {touchExpanded ? copy.hideDetailsLabel : copy.moreDetailsLabel}
          </span>
        </button>
      </div>

      {/* Bottom Content Stack */}
      <div
        style={overlayContentStyle}
        className={`absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end ${
          isDiscoveryCompact ? "p-3.5 sm:p-4" : "p-4 sm:p-5"
        }`}
      >
        <h3
          className={`font-serif font-semibold tracking-[-0.01em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out ${
            isFeaturedSize
              ? "text-[1.65rem] sm:text-[1.85rem] xl:text-[2.05rem] leading-[1.15]"
              : isDiscoveryCompact
              ? "text-[1.22rem] sm:text-[1.32rem] leading-[1.18]"
              : "text-[1.32rem] sm:text-[1.42rem] xl:text-[1.52rem] leading-[1.18]"
          }`}
        >
          <Link
            href={journey.href}
            onClick={(e) => e.stopPropagation()}
            className="hover:underline focus-visible:outline-none"
          >
            {resolvedTitle}
          </Link>
        </h3>

        <div
          className={`grid transition-all duration-500 ease-out ${
            touchExpanded || isMobile || isDiscoveryCompact
              ? "grid-rows-[1fr] opacity-100 mt-1.5"
              : "grid-rows-[0fr] opacity-0 mt-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-2.5 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-focus-within:mt-2.5"
          }`}
        >
          <div className="overflow-hidden">
            {resolvedDescription && (
              <p
                className={`text-white/95 font-normal leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.8)] ${
                  isFeaturedSize
                    ? "text-xs sm:text-[13.5px] line-clamp-2"
                    : "text-[11.5px] sm:text-xs line-clamp-2"
                }`}
              >
                {resolvedDescription}
              </p>
            )}

            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#041423]/82 border border-white/25 px-2.5 py-0.5 text-[10px] font-semibold text-[#A5F3FC] shadow-sm">
                <Compass className="h-2.5 w-2.5 text-[#2DD4BF] shrink-0" />
                <span>{resolvedCorridor}</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-[#0C5969]/85 border border-[#5EEAD4]/45 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                {resolvedInquiryFormat}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex items-end justify-between gap-2.5 sm:gap-3 pt-1">
          <dl className="flex flex-col gap-0.5 min-w-0 flex-1 text-[11px] sm:text-[11.5px] text-white/95 [text-shadow:0_1px_6px_rgba(0,0,0,0.82)]">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Duration</dt>
              <Calendar
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-[#5EEAD4] stroke-[2]"
              />
              <dd className="truncate font-medium">{durationText}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Pricing</dt>
              <FileText
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-[#F4C266] stroke-[2]"
              />
              <dd className="truncate font-medium">{priceOrQuoteText}</dd>
            </div>
          </dl>

          <div style={ctaEntranceStyle} className="shrink-0 max-w-full">
            <Link
              href={journey.href}
              onClick={(e) => e.stopPropagation()}
              data-journey-cta={journey.slug}
              data-featured-size={isFeaturedSize ? "true" : "false"}
              aria-label={`${copy.cardCta}: ${resolvedTitle}`}
              className={`west-journey-card-cta group/cta inline-flex items-center justify-center rounded-full border backdrop-blur-md font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
                journey.isFeaturedCenter && !isDiscoveryCompact
                  ? "border-[#2DD4BF]/90 bg-[#072B3F]/88 shadow-[0_6px_20px_rgba(2,10,20,0.65),0_0_18px_rgba(45,212,191,0.28)] hover:bg-[#0E7C8E] hover:border-[#67E8F9] hover:shadow-[0_0_24px_rgba(45,212,191,0.5)]"
                  : "border-[#5EEAD4]/80 bg-[#062437]/86 shadow-[0_6px_18px_rgba(2,10,20,0.6)] hover:bg-[#0E7C8E] hover:border-[#5EEAD4] hover:shadow-[0_0_20px_rgba(45,212,191,0.42)]"
              }`}
            >
              <span className="sm:hidden">
                {copy.cardCtaShort || "Explore"}
              </span>
              <span className="hidden sm:inline">{copy.cardCta}</span>
              <ArrowRight
                aria-hidden="true"
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-[#5EEAD4] group-hover/cta:text-white transition-transform duration-300 group-hover/cta:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
