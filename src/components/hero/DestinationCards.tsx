"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ArrowRight, ArrowDown, Play, Layers } from "lucide-react";
import { DESTINATIONS_CONFIG, type DestinationAssetConfig, type DestinationId } from "@/config/destinations";
import { useHero } from "./HeroProvider";
import {
  getDirectionalMaskStyle,
  useSectionEntrance,
  type MaskDirection,
} from "@/components/motion/MotionPrimitives";

/**
 * Asymmetric Editorial Destination Cards Composition:
 * - Desktop: ONE large, prominent vertical featured destination card on the left column
 *   paired alongside TWO smaller compact destination cards stacked on the right column.
 * - Mobile/Tablet: Swipeable horizontal snap carousel with interactive destination pills.
 * - Clicking any card highlights it and transitions the Hero background to that destination's video.
 */
export function DestinationCards() {
  const { t, theme, activeDestination, setActiveDestination, selectDestinationForBooking } =
    useHero();
  const isLight = theme === "light";

  const { ref: cardsRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLDivElement>({
    immediate: true,
  });

  const featuredDest = DESTINATIONS_CONFIG.find((d) => d.editorialRole === "featured")!;
  const compactDests = DESTINATIONS_CONFIG.filter((d) => d.editorialRole === "compact");

  const handleCardSelect = (id: DestinationId) => {
    if (activeDestination === id) {
      // Clicking the already-active card toggles back to the 3-destination panoramic view
      setActiveDestination(null);
    } else {
      selectDestinationForBooking(id);
    }
  };

  const handleScrollDown = () => {
    const el = document.getElementById("hero-booking-bar");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const renderCard = (
    dest: DestinationAssetConfig,
    variant: "featured" | "compact" | "mobile",
    staggerIndex = 0
  ) => {
    const copy = t.destinations[dest.id];
    const isSelected = activeDestination === dest.id;
    const isFeaturedDesktop = variant === "featured";

    const sizeClasses =
      variant === "featured"
        ? "w-full h-[338px] xl:h-[366px]"
        : variant === "compact"
        ? "w-full h-[180px] xl:h-[194px]"
        : "flex-shrink-0 snap-center w-[278px] sm:w-[308px] h-[178px] sm:h-[190px]";

    const delayMs = 760 + staggerIndex * 95;
    const maskDirection: MaskDirection =
      variant === "featured" ? "bottom-to-top" : "right-to-left";

    const cardEntranceStyle: React.CSSProperties = reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered
            ? undefined
            : variant === "featured"
            ? "translate3d(0, 22px, 0)"
            : "translate3d(22px, 0, 0)",
          transitionDelay: `${delayMs}ms`,
        };

    const imageMaskStyle = getDirectionalMaskStyle(
      maskDirection,
      hasEntered,
      reducedMotion,
      delayMs,
      780,
      "22px"
    );

    return (
      <button
        key={`${variant}-${dest.id}`}
        type="button"
        data-destination-card={dest.id}
        data-card-variant={variant}
        onClick={() => handleCardSelect(dest.id)}
        aria-pressed={isSelected}
        aria-label={`${copy.locationBadge} — ${copy.tagline}`}
        style={cardEntranceStyle}
        className={`group relative ${sizeClasses} rounded-[22px] overflow-hidden text-left transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#051320] ${
          isSelected
            ? "ring-2 ring-[#5EEAD4] shadow-[0_22px_52px_rgba(14,124,142,0.58)] -translate-y-1"
            : isLight
            ? "west-card-shell hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(8,28,46,0.36)]"
            : "west-card-shell hover:border-[#5EEAD4]/60 hover:-translate-y-1"
        }`}
      >
        {/* High-Resolution Destination Photograph with Directional Mask Reveal */}
        <div className="absolute inset-0" style={imageMaskStyle}>
          <Image
            src={dest.cardImageWebp}
            alt={copy.imageAlt}
            fill
            sizes={
              isFeaturedDesktop
                ? "(max-width: 1280px) 250px, 275px"
                : "(max-width: 1024px) 308px, 250px"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>

        {/* Top Specular Glass Rim */}
        <div
          aria-hidden="true"
          className={`
            absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent to-transparent
            ${isSelected ? "via-[#5EEAD4] opacity-100" : isLight ? "via-white/95 opacity-90" : "via-white/60 opacity-80"}
          `}
        />

        {/* Layered Editorial Scrims for Top & Bottom Label Contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#041220]/65 via-transparent to-[#04111E]/92"
        />

        {/* Top Header Row: Location Pin + City/Country Badge + Order Number (01, 02, 03) */}
        <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium tracking-wide backdrop-blur-md border transition-colors ${
              isSelected
                ? "bg-[#0E7C8E]/80 border-[#5EEAD4]/70 text-white"
                : isLight
                ? "bg-white/35 border-white/60 text-white drop-shadow"
                : "bg-[#051525]/55 border-white/20 text-white/95"
            }`}
          >
            <MapPin className="h-3 w-3 text-[#F4C266] shrink-0" />
            <span className="truncate">{copy.locationBadge}</span>
          </span>

          <span className="font-sans text-xs font-semibold tracking-wider text-white/95 drop-shadow">
            {dest.orderNumber}
          </span>
        </div>

        {/* Bottom Glass Footer Bar: Tagline + Active Video Indicator + Arrow */}
        <div className="absolute inset-x-3 bottom-3">
          <div
            className={`flex items-center justify-between gap-2 rounded-2xl px-3.5 py-2.5 backdrop-blur-md border transition-all duration-300 ${
              isSelected
                ? "bg-[#09283C]/85 border-[#5EEAD4]/60 shadow-[0_8px_24px_rgba(14,124,142,0.4)]"
                : isLight
                ? "bg-white/24 border-white/45 group-hover:bg-white/32"
                : "bg-[#051422]/62 border-white/15 group-hover:bg-[#071D30]/75 group-hover:border-white/30"
            }`}
          >
            <div className="min-w-0">
              <p className="truncate text-[13.5px] sm:text-sm font-semibold tracking-tight text-white drop-shadow">
                {copy.tagline}
              </p>
              {isSelected && (
                <p className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-[#5EEAD4]">
                  <Play className="h-2.5 w-2.5 fill-current" />
                  <span>{t.hero.videoPlayingBadge}</span>
                </p>
              )}
            </div>

            <span
              aria-hidden="true"
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isSelected
                  ? "border-[#5EEAD4] bg-[#0E7C8E] text-white"
                  : "border-white/35 bg-white/10 text-white group-hover:border-[#5EEAD4]/80 group-hover:bg-[#0E7C8E]/80"
              }`}
            >
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div
      id="hero-destination-cards"
      ref={cardsRef}
      aria-label={t.nav.destinations}
      className="flex flex-col items-end justify-center w-full lg:w-auto"
    >
      {/* Desktop Asymmetric Editorial Grid: 1 Large Featured Card (Left) + 2 Compact Cards (Right) */}
      <div className="hidden lg:grid lg:grid-cols-[246px_228px] xl:grid-cols-[266px_246px] items-center gap-4">
        {/* Left Column: ONE Large Featured Card (02 Istanbul - Türkiye, offset vertically between the right stack) */}
        <div className="w-full">{renderCard(featuredDest, "featured", 0)}</div>

        {/* Right Column: TWO Smaller Destination Cards (01 Cairo - Egypt & 03 Dubai - UAE) */}
        <div className="flex flex-col gap-4 w-full">
          {compactDests.map((dest, idx) => renderCard(dest, "compact", idx + 1))}
        </div>
      </div>

      {/* Mobile & Tablet Intelligent Horizontal Snap Carousel */}
      <div className="flex lg:hidden gap-3.5 w-full overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
        {DESTINATIONS_CONFIG.map((dest, idx) => renderCard(dest, "mobile", idx))}
      </div>

      {/* Bottom Row Below Cards: Active Panoramic Reset Pill + Scroll Indicator */}
      <div
        style={
          reducedMotion
            ? { opacity: 1 }
            : {
                opacity: hasEntered ? 1 : 0,
                transition: "opacity 600ms ease 1020ms",
              }
        }
        className="mt-3.5 flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full pr-1"
      >
        {activeDestination && (
          <button
            type="button"
            onClick={() => setActiveDestination(null)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
              isLight
                ? "bg-white/65 border-white/80 text-slate-900 hover:bg-white/80"
                : "bg-[#071A2C]/75 border-white/20 text-white/90 hover:bg-[#0A253D]"
            }`}
          >
            <Layers className="h-3 w-3 text-[#2DD4BF]" />
            <span>{t.hero.panoramicResetLabel}</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleScrollDown}
          className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] rounded-full px-2 py-1"
        >
          <span>{t.hero.scrollIndicator}</span>
          <ArrowDown className="h-3.5 w-3.5 text-[#E5A93C] transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
