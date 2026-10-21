"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Compass } from "lucide-react";
import { useHero } from "@/components/hero/HeroProvider";
import { FINAL_CTA_SECTION_CONFIG } from "@/config/final-cta-footer";
import { DESTINATIONS_CONFIG } from "@/config/destinations";
import {
  SplitTextReveal,
  getDirectionalMaskStyle,
  useSectionEntrance,
} from "@/components/motion/MotionPrimitives";

/**
 * Section 5: Final CTA — Ready for Your Next Journey?
 * - Combines the strongest visual qualities of both supplied references:
 *   1. Rounded panoramic travel photograph frame with golden-hour Nile & felucca scenery.
 *   2. Controlled atmospheric dark overlay & vignette so centered white typography remains crisp in both themes
 *      while keeping the warm golden sunset sky and shimmering water vibrant.
 *   3. Clear visual hierarchy: uppercase eyebrow, serif headline with character/word reveal,
 *      supporting copy, and a pill CTA button ("Plan My Trip →") with circular arrow badge.
 * - Connects directly to the existing interactive Trip Search & Inquiry bar (#hero-booking-bar).
 */
export function FinalCtaSection() {
  const { t, theme } = useHero();
  const isLight = theme === "light";
  const copy = t.finalCta;

  const { ref: sectionRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  });

  const [useFallbackJpg, setUseFallbackJpg] = useState(false);

  const handlePlanTripClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const bookingEl = document.getElementById("hero-booking-bar");
    if (bookingEl) {
      e.preventDefault();
      bookingEl.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
      // Focus the first interactive control inside the booking bar after smooth scroll begins
      window.setTimeout(() => {
        const firstButton = bookingEl.querySelector<HTMLButtonElement>("button");
        firstButton?.focus({ preventScroll: true });
      }, reducedMotion ? 0 : 480);
    }
  };

  const panelMaskStyle = getDirectionalMaskStyle(
    "center-out",
    hasEntered,
    reducedMotion,
    0,
    920,
    "28px"
  );

  const getItemRevealStyle = (delayMs: number, offsetY = 18): React.CSSProperties =>
    reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered
            ? "translate3d(0, 0, 0)"
            : `translate3d(0, ${offsetY}px, 0)`,
          transitionProperty: "opacity, transform",
          transitionDuration: "720ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${delayMs}ms`,
        };

  return (
    <section
      id={FINAL_CTA_SECTION_CONFIG.sectionId}
      ref={sectionRef}
      aria-labelledby="final-cta-heading"
      data-theme-mode={theme}
      data-entered={hasEntered ? "true" : "false"}
      className={`relative w-full overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 transition-colors duration-500 [background:var(--west-surface-cta)] ${
        isLight ? "text-[#081C2E]" : "text-white"
      }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Cinematic Panoramic Panel with Directional Mask Reveal */}
        <div
          style={panelMaskStyle}
          data-cta-panel=""
          className={`group/cta-panel relative w-full overflow-hidden rounded-[26px] sm:rounded-[32px] min-h-[360px] sm:min-h-[410px] lg:min-h-[448px] flex items-center justify-center px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 ${
            isLight
              ? "border border-[#E5D9C3]/90 shadow-[0_26px_64px_-12px_rgba(8,28,46,0.24)]"
              : "border border-white/15 shadow-[0_30px_72px_-12px_rgba(2,8,16,0.82)]"
          }`}
        >
          {/* 1. High-Resolution Panoramic Travel Photograph (Nile at Sunset with Feluccas) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden bg-[#061829]"
          >
            <Image
              src={
                useFallbackJpg
                  ? FINAL_CTA_SECTION_CONFIG.imageJpg
                  : FINAL_CTA_SECTION_CONFIG.imageWebp
              }
              alt={copy.imageAlt}
              fill
              sizes="(max-width: 640px) 95vw, (max-width: 1440px) 92vw, 1360px"
              onError={() => {
                if (!useFallbackJpg) setUseFallbackJpg(true);
              }}
              style={{
                objectPosition: FINAL_CTA_SECTION_CONFIG.objectPosition,
                transform: reducedMotion
                  ? "none"
                  : hasEntered
                  ? "scale(1.0)"
                  : "scale(1.06)",
                transition: reducedMotion
                  ? "none"
                  : "transform 1250ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="object-cover saturate-[1.08] contrast-[1.03]"
            />
          </div>

          {/* 2. Controlled Multi-Layer Atmospheric Overlay — Preserves Golden Sunset Sky While Ensuring Crisp White Text */}
          <div
            aria-hidden="true"
            style={{
              opacity: reducedMotion || hasEntered ? 1 : 0.45,
              transition: reducedMotion ? "none" : "opacity 820ms ease 120ms",
            }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#061829]/34 via-[#061B2E]/44 to-[#04111E]/78"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_52%_at_50%_50%,rgba(4,18,32,0.52)_0%,rgba(4,16,28,0.18)_65%,rgba(3,12,22,0.38)_100%)]"
          />

          {/* Top Specular Glass Rim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/65 to-transparent opacity-85"
          />

          {/* 3. Centered Conversion-Focused Copy Stack */}
          <div className="relative z-10 mx-auto flex max-w-[42rem] flex-col items-center text-center">
            {/* Small Uppercase Eyebrow */}
            <div
              style={getItemRevealStyle(210, 14)}
              className="inline-flex items-center gap-3 rounded-full bg-[#061A2C]/55 px-4 py-1.5 backdrop-blur-md border border-white/25"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#F4C266]"
              />
              <span className="text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#F9E6B3]">
                {copy.eyebrow}
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]"
              />
            </div>

            {/* Large, Elegant Serif Headline with Character/Word Reveal */}
            <h2
              id="final-cta-heading"
              className="mt-4 sm:mt-5 font-serif text-3xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] tracking-[-0.015em] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
            >
              <SplitTextReveal
                text={copy.headline}
                mode="chars"
                hasEntered={hasEntered}
                reducedMotion={reducedMotion}
                baseDelayMs={290}
                staggerMs={20}
                durationMs={620}
              />
            </h2>

            {/* Short Supporting Sentence */}
            <p
              style={getItemRevealStyle(480, 16)}
              className="mt-3.5 sm:mt-4 max-w-[34rem] text-sm sm:text-base lg:text-[17.5px] font-normal leading-relaxed text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            >
              {copy.supportingText}
            </p>

            {/* Primary Rounded Pill CTA Button ("Plan My Trip →") Inspired by Both References */}
            <div style={getItemRevealStyle(600, 16)} className="mt-7 sm:mt-8">
              <a
                href={FINAL_CTA_SECTION_CONFIG.primaryCtaHref}
                onClick={handlePlanTripClick}
                data-final-cta-button="plan-my-trip"
                className="group/btn inline-flex items-center gap-3.5 rounded-full bg-white/22 hover:bg-white/30 backdrop-blur-xl border border-white/55 pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 text-sm sm:text-[15px] font-semibold text-white shadow-[0_14px_38px_rgba(3,12,23,0.48),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5EEAD4]/80 hover:shadow-[0_18px_44px_rgba(14,124,142,0.48)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061523]"
              >
                <span className="tracking-wide">{copy.primaryCta}</span>
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white text-[#071D30] shadow-sm transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:bg-[#2DD4BF] group-hover/btn:text-[#041421]"
                >
                  <ArrowRight className="h-4 w-4 stroke-[2.2] transition-transform duration-300 group-hover/btn:-rotate-12" />
                </span>
              </a>
            </div>

            {/* Subtle Destination Corridor Pills Below Button */}
            <div
              style={getItemRevealStyle(700, 12)}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-medium text-white/88"
            >
              {DESTINATIONS_CONFIG.map((dest, idx) => (
                <React.Fragment key={dest.id}>
                  <span className="inline-flex items-center gap-1.5">
                    <Compass className="h-3 w-3 text-[#F4C266]" aria-hidden="true" />
                    <span>{t.destinations[dest.id].locationBadge}</span>
                  </span>
                  {idx < DESTINATIONS_CONFIG.length - 1 && (
                    <span aria-hidden="true" className="text-white/40">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
