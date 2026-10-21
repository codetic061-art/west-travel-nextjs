"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, FileText, ArrowRight, Compass, Info } from "lucide-react";
import type { FeaturedJourneyRecord } from "@/config/featured-trips";
import type { FeaturedTripsTranslation, SupportedLocale } from "@/i18n/hero-dictionary";
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
  variant: "desktop-compact" | "desktop-featured" | "tablet-featured" | "tablet-compact" | "mobile";
  onSelectCard?: (index: number) => void;
}

/**
 * Individual bookable Journey Card for WEST GLOBAL TOURS (reused across Homepage Featured Trips
 * and the Destination Discovery page).
 * - Image Reveal from a Thin Line: The card's photograph starts masked as a narrow 2.5% horizontal strip
 *   (`top-to-bottom` or `bottom-to-top`) and progressively uncovers over `1320ms` (`1.32s`) with a subtle
 *   inner scale settle (`1.05` -> `1.0`).
 * - Supports EN / TR / ES localized journey titles, descriptions, locations, and corridor labels.
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
  const [touchExpanded, setTouchExpanded] = useState(false);

  const isFeaturedSize = variant === "desktop-featured" || variant === "tablet-featured";
  const isMobile = variant === "mobile";

  const localizedJourney =
    DESTINATION_DISCOVERY_DICTIONARY[locale]?.journeys[journey.slug];

  const resolvedTitle = localizedJourney?.title ?? journey.title;
  const resolvedLocation = localizedJourney?.locationLabel ?? journey.locationLabel;
  const resolvedDescription = localizedJourney?.description ?? journey.description;
  const resolvedCorridor =
    localizedJourney?.corridorLabel ?? journey.itineraryMetadata.corridorLabel;
  const resolvedInquiryFormat =
    localizedJourney?.inquiryFormatLabel ?? journey.itineraryMetadata.inquiryFormatLabel;

  const getEntranceTiming = (): {
    cardDelayMs: number;
    maskDirection: MaskDirection;
  } => {
    if (isMobile) {
      return {
        cardDelayMs: 140 + journey.carouselIndex * 150,
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
    "20px"
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
        transform: hasEntered ? "translate3d(0, 0, 0)" : "translate3d(0, 12px, 0)",
        transitionProperty: "opacity, transform",
        transitionDuration: "880ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${contentDelayMs}ms`,
      };

  const ctaEntranceStyle: React.CSSProperties = reducedMotion
    ? { opacity: 1, transform: "none" }
    : {
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? "translate3d(0, 0, 0)" : "translate3d(0, 14px, 0)",
        transitionProperty: "opacity, transform, background-color, border-color, box-shadow",
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
      : "h-[396px] sm:h-[416px]";

  const cardSurfaceClasses = journey.isFeaturedCenter
    ? isLight
      ? "bg-[#092136] border border-[#22D3EE]/80 ring-1 ring-[#22D3EE]/60 shadow-[0_22px_52px_rgba(10,32,54,0.22),0_0_26px_rgba(34,211,238,0.30)] hover:shadow-[0_28px_60px_rgba(10,32,54,0.30),0_0_34px_rgba(34,211,238,0.42)]"
      : "bg-[#071A2C] border border-[#2DD4BF]/75 ring-1 ring-[#2DD4BF]/50 shadow-[0_26px_58px_rgba(2,8,16,0.82),0_0_28px_rgba(45,212,191,0.24)] hover:shadow-[0_30px_64px_rgba(2,8,16,0.92),0_0_36px_rgba(45,212,191,0.36)]"
    : isLight
    ? `bg-[#0B2236] border ${
        isSpotlightActive
          ? "border-[#0E7C8E] ring-2 ring-[#149BB0]/55 shadow-[0_22px_48px_rgba(14,124,142,0.24)]"
          : "border-white/90 shadow-[0_16px_38px_rgba(11,30,49,0.15)] hover:border-[#149BB0]/65 hover:shadow-[0_22px_48px_rgba(11,30,49,0.24)]"
      }`
    : `bg-[#07192A] border ${
        isSpotlightActive
          ? "border-[#2DD4BF]/80 ring-2 ring-[#2DD4BF]/45 shadow-[0_24px_52px_rgba(2,9,18,0.85)]"
          : "border-white/15 shadow-[0_20px_44px_rgba(2,9,18,0.72)] hover:border-[#2DD4BF]/55 hover:shadow-[0_26px_54px_rgba(2,9,18,0.88)]"
      }`;

  const durationText = journey.durationLabel ?? copy.durationPlaceholder;
  const priceOrQuoteText = journey.startingPriceLabel ?? copy.quotePlaceholder;

  return (
    <article
      data-journey-card={journey.id}
      data-journey-destination={journey.destinationId}
      data-column-position={journey.columnPosition}
      data-featured-center={journey.isFeaturedCenter ? "true" : "false"}
      data-card-variant={variant}
      data-mask-direction={maskDirection}
      data-reveal-state={hasEntered ? "revealed" : "masked-thin-line"}
      onClick={() => onSelectCard?.(journey.carouselIndex)}
      className={`group relative w-full ${heightClasses} rounded-[20px] overflow-hidden select-none transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-[#2DD4BF] focus-within:ring-offset-2 ${
        isLight ? "focus-within:ring-offset-[#FAF8F3]" : "focus-within:ring-offset-[#061523]"
      } ${cardSurfaceClasses}`}
    >
      {/* Scenic Travel Photograph with 1.32s Thin-Line Progressive Mask Reveal */}
      <div className="absolute inset-0" style={imageMaskStyle}>
        <div className="relative h-full w-full" style={imageScaleStyle}>
          <Image
            src={journey.imageWebp}
            alt={journey.imageAlt}
            fill
            sizes={
              isFeaturedSize
                ? "(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 440px"
                : "(max-width: 768px) 90vw, (max-width: 1200px) 32vw, 390px"
            }
            className="object-cover brightness-[1.06] saturate-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-within:scale-[1.04]"
            style={{ objectPosition: journey.objectPosition }}
          />
        </div>

        {/* Scrims live inside the progressive mask so they uncover together with the photograph */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#041322]/42 via-[#041322]/12 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#03111F]/95 via-[#051B2E]/58 to-transparent transition-opacity duration-500"
        />

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020D18]/98 via-[#051A2D]/78 to-[#041322]/25 transition-opacity duration-500 ${
            touchExpanded
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          }`}
        />
      </div>

      {/* Subtle warm-gold/teal thin starting line accent visible before/during reveal */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent to-transparent ${
          journey.isFeaturedCenter
            ? "via-[#67E8F9]/90 opacity-95"
            : isLight
            ? "via-[#D4B475]/85 opacity-85"
            : "via-white/40 opacity-75"
        }`}
      />

      {/* Top Row: Location Pin + Location Label */}
      <div
        style={overlayContentStyle}
        className="absolute inset-x-4 sm:inset-x-5 top-4 flex items-center justify-between gap-2 z-10"
      >
        <div className="inline-flex items-center gap-1.5 text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30"
          >
            <MapPin className="h-3 w-3 text-white stroke-[2.2]" />
          </span>
          <span className="text-xs sm:text-[13px] font-medium tracking-wide text-white/95">
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
          className="md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 inline-flex items-center gap-1 rounded-full bg-[#061C2E]/75 hover:bg-[#0E7C8E]/85 border border-white/25 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
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
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-4 sm:p-5"
      >
        <h3
          className={`font-serif font-medium tracking-[-0.01em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out ${
            isFeaturedSize
              ? "text-[1.65rem] sm:text-[1.85rem] xl:text-[2.05rem] leading-[1.15]"
              : "text-[1.32rem] sm:text-[1.42rem] xl:text-[1.52rem] leading-[1.18]"
          }`}
        >
          {resolvedTitle}
        </h3>

        <div
          className={`grid transition-all duration-500 ease-out ${
            touchExpanded || isMobile
              ? "grid-rows-[1fr] opacity-100 mt-2"
              : "grid-rows-[0fr] opacity-0 mt-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-2.5 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-focus-within:mt-2.5"
          }`}
        >
          <div className="overflow-hidden">
            {resolvedDescription && (
              <p
                className={`text-white/88 font-normal leading-relaxed ${
                  isFeaturedSize
                    ? "text-xs sm:text-[13.5px] line-clamp-2"
                    : "text-[11.5px] sm:text-xs line-clamp-2"
                }`}
              >
                {resolvedDescription}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/12 border border-white/20 px-2.5 py-0.5 text-[10.5px] font-medium text-[#A5F3FC]">
                <Compass className="h-2.5 w-2.5 text-[#2DD4BF] shrink-0" />
                <span>{resolvedCorridor}</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-[#0E7C8E]/35 border border-[#2DD4BF]/35 px-2 py-0.5 text-[10px] font-medium text-white/90">
                {resolvedInquiryFormat}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2.5 sm:gap-3 pt-1">
          <dl className="flex flex-col gap-1 min-w-0 flex-1 text-[11.5px] sm:text-xs text-white/85">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Duration</dt>
              <Calendar
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-[#5EEAD4]/90 stroke-[1.8]"
              />
              <dd className="truncate font-normal">{durationText}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Pricing</dt>
              <FileText
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-[#5EEAD4]/90 stroke-[1.8]"
              />
              <dd className="truncate font-normal">{priceOrQuoteText}</dd>
            </div>
          </dl>

          <div style={ctaEntranceStyle} className="shrink-0 max-w-full">
            <Link
              href={journey.href}
              onClick={(e) => e.stopPropagation()}
              data-journey-cta={journey.slug}
              data-featured-size={isFeaturedSize ? "true" : "false"}
              aria-label={`${copy.cardCta}: ${resolvedTitle}`}
              className={`west-journey-card-cta group/cta inline-flex items-center justify-center rounded-full border backdrop-blur-md font-medium text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
                journey.isFeaturedCenter
                  ? "border-[#2DD4BF]/85 bg-[#082B3F]/75 shadow-[0_0_18px_rgba(45,212,191,0.28)] hover:bg-[#0E7C8E] hover:border-[#67E8F9] hover:shadow-[0_0_24px_rgba(45,212,191,0.5)]"
                  : "border-[#2DD4BF]/70 bg-[#072235]/65 shadow-[0_0_14px_rgba(20,155,176,0.2)] hover:bg-[#0E7C8E]/90 hover:border-[#5EEAD4] hover:shadow-[0_0_20px_rgba(45,212,191,0.42)]"
              }`}
            >
              <span className="sm:hidden">{copy.cardCtaShort || "Explore"}</span>
              <span className="hidden sm:inline">{copy.cardCta}</span>
              <ArrowRight
                aria-hidden="true"
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-[#2DD4BF] group-hover/cta:text-white transition-transform duration-300 group-hover/cta:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
