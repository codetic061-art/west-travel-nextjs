"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, FileText, ArrowRight, Compass, Info } from "lucide-react";
import type { FeaturedJourneyRecord } from "@/config/featured-trips";
import type { FeaturedTripsTranslation } from "@/i18n/hero-dictionary";
import {
  getDirectionalMaskStyle,
  type MaskDirection,
} from "@/components/motion/MotionPrimitives";

export interface JourneyCardProps {
  journey: FeaturedJourneyRecord;
  copy: FeaturedTripsTranslation;
  isLight: boolean;
  hasEntered: boolean;
  reducedMotion: boolean;
  isSpotlightActive?: boolean;
  variant: "desktop-compact" | "desktop-featured" | "tablet-featured" | "tablet-compact" | "mobile";
  onSelectCard?: (index: number) => void;
}

/**
 * Individual bookable Journey Card for the WEST GLOBAL TOURS Featured Trips section.
 * - Uses slower, deliberate entrance durations (1040ms card slide, 1180ms directional image mask,
 *   840ms delayed CTA button settle, and 155ms stagger between cards).
 */
export function JourneyCard({
  journey,
  copy,
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

  const getEntranceTiming = (): {
    cardDelayMs: number;
    initialTransform: string;
    maskDirection: MaskDirection;
  } => {
    if (isMobile) {
      return {
        cardDelayMs: 180 + journey.carouselIndex * 135,
        initialTransform: "translate3d(0, 26px, 0)",
        maskDirection: "bottom-to-top",
      };
    }
    if (journey.columnPosition === "left") {
      return {
        cardDelayMs: journey.columnStackIndex === 0 ? 180 : 350,
        initialTransform: "translate3d(-44px, 0, 0)",
        maskDirection: "left-to-right",
      };
    }
    if (journey.columnPosition === "center") {
      return {
        cardDelayMs: 265,
        initialTransform: "translate3d(0, 44px, 0)",
        maskDirection: "bottom-to-top",
      };
    }
    return {
      cardDelayMs: journey.columnStackIndex === 0 ? 225 : 395,
      initialTransform: "translate3d(44px, 0, 0)",
      maskDirection: "right-to-left",
    };
  };

  const { cardDelayMs, initialTransform, maskDirection } = getEntranceTiming();
  const ctaDelayMs = cardDelayMs + 240;

  const cardEntranceStyle: React.CSSProperties = reducedMotion
    ? { opacity: 1, transform: "none" }
    : {
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? "translate3d(0, 0, 0)" : initialTransform,
        transitionProperty: "opacity, transform, box-shadow, border-color",
        transitionDuration: "1040ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${cardDelayMs}ms`,
      };

  const imageMaskStyle = getDirectionalMaskStyle(
    maskDirection,
    hasEntered,
    reducedMotion,
    cardDelayMs + 45,
    1180,
    "20px"
  );

  const ctaEntranceStyle: React.CSSProperties = reducedMotion
    ? { opacity: 1, transform: "none" }
    : {
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? "translate3d(0, 0, 0)" : "translate3d(0, 14px, 0)",
        transitionProperty: "opacity, transform, background-color, border-color, box-shadow",
        transitionDuration: "840ms",
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
      data-column-position={journey.columnPosition}
      data-featured-center={journey.isFeaturedCenter ? "true" : "false"}
      data-card-variant={variant}
      data-mask-direction={maskDirection}
      onClick={() => onSelectCard?.(journey.carouselIndex)}
      style={cardEntranceStyle}
      className={`group relative w-full ${heightClasses} rounded-[20px] overflow-hidden select-none transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-[#2DD4BF] focus-within:ring-offset-2 ${
        isLight ? "focus-within:ring-offset-[#FAF8F3]" : "focus-within:ring-offset-[#061523]"
      } ${cardSurfaceClasses}`}
    >
      {/* Scenic Travel Photograph with 1.18s Directional Mask Reveal */}
      <div className="absolute inset-0" style={imageMaskStyle}>
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

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent to-transparent ${
          journey.isFeaturedCenter
            ? "via-[#67E8F9]/90 opacity-95"
            : isLight
            ? "via-white/80 opacity-85"
            : "via-white/35 opacity-75"
        }`}
      />

      {/* Top Row: Location Pin + Location Label */}
      <div className="absolute inset-x-4 sm:inset-x-5 top-4 flex items-center justify-between gap-2 z-10">
        <div className="inline-flex items-center gap-1.5 text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30"
          >
            <MapPin className="h-3 w-3 text-white stroke-[2.2]" />
          </span>
          <span className="text-xs sm:text-[13px] font-medium tracking-wide text-white/95">
            {journey.locationLabel}
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
          } — ${journey.title}`}
          className="md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 inline-flex items-center gap-1 rounded-full bg-[#061C2E]/75 hover:bg-[#0E7C8E]/85 border border-white/25 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
        >
          <Info className="h-3 w-3 text-[#5EEAD4]" />
          <span className="sr-only sm:not-sr-only">
            {touchExpanded ? copy.hideDetailsLabel : copy.moreDetailsLabel}
          </span>
        </button>
      </div>

      {/* Bottom Content Stack */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-4 sm:p-5">
        <h3
          className={`font-serif font-medium tracking-[-0.01em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out ${
            isFeaturedSize
              ? "text-[1.65rem] sm:text-[1.85rem] xl:text-[2.05rem] leading-[1.15]"
              : "text-[1.32rem] sm:text-[1.42rem] xl:text-[1.52rem] leading-[1.18]"
          }`}
        >
          {journey.title}
        </h3>

        <div
          className={`grid transition-all duration-500 ease-out ${
            touchExpanded || isMobile
              ? "grid-rows-[1fr] opacity-100 mt-2"
              : "grid-rows-[0fr] opacity-0 mt-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-2.5 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-focus-within:mt-2.5"
          }`}
        >
          <div className="overflow-hidden">
            {journey.description && (
              <p
                className={`text-white/88 font-normal leading-relaxed ${
                  isFeaturedSize
                    ? "text-xs sm:text-[13.5px] line-clamp-2"
                    : "text-[11.5px] sm:text-xs line-clamp-2"
                }`}
              >
                {journey.description}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/12 border border-white/20 px-2.5 py-0.5 text-[10.5px] font-medium text-[#A5F3FC]">
                <Compass className="h-2.5 w-2.5 text-[#2DD4BF] shrink-0" />
                <span>{journey.itineraryMetadata.corridorLabel}</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-[#0E7C8E]/35 border border-[#2DD4BF]/35 px-2 py-0.5 text-[10px] font-medium text-white/90">
                {journey.itineraryMetadata.inquiryFormatLabel}
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
              aria-label={`${copy.cardCta}: ${journey.title}`}
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
