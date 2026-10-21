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
 * - Viewport-triggered thin-line progressive image reveal (`top-to-bottom`, `1380ms` duration)
 *   so the panoramic Nile felucca sunset photograph visibly uncovers from a narrow top line
 *   when the section enters the viewport (`threshold: 0.24`, `rootMargin: "0px 0px -12% 0px"`).
 * - Clicking "Plan My Trip →" opens the right-side Trip Inquiry Drawer (`openInquiryDrawer`).
 */
export function FinalCtaSection() {
  const { t, theme, openInquiryDrawer } = useHero();
  const isLight = theme === "light";
  const copy = t.finalCta;

  const { ref: sectionRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLElement>({
    threshold: 0.24,
    rootMargin: "0px 0px -12% 0px",
  });

  const [useFallbackJpg, setUseFallbackJpg] = useState(false);

  const handlePlanTripClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    openInquiryDrawer(undefined, e.currentTarget);
  };

  // Progressive thin-line reveal from top edge down through the full panoramic photograph (1380ms)
  const panelMaskStyle = getDirectionalMaskStyle(
    "top-to-bottom",
    hasEntered,
    reducedMotion,
    0,
    1380,
    "28px"
  );

  const getItemRevealStyle = (delayMs: number, offsetY = 20): React.CSSProperties =>
    reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered
            ? "translate3d(0, 0, 0)"
            : `translate3d(0, ${offsetY}px, 0)`,
          transitionProperty: "opacity, transform",
          transitionDuration: "980ms",
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
        {/* Cinematic Panoramic Panel with 1.38s Thin-Line Progressive Reveal */}
        <div
          style={panelMaskStyle}
          data-cta-panel=""
          data-reveal-state={hasEntered ? "revealed" : "masked-thin-line"}
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
              priority
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
                  : "transform 1520ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="object-cover saturate-[1.08] contrast-[1.03]"
            />
          </div>

          {/* 2. Controlled Multi-Layer Atmospheric Overlay */}
          <div
            aria-hidden="true"
            style={{
              opacity: reducedMotion || hasEntered ? 1 : 0.45,
              transition: reducedMotion ? "none" : "opacity 1120ms ease 180ms",
            }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#061829]/34 via-[#061B2E]/44 to-[#04111E]/78"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_52%_at_50%_50%,rgba(4,18,32,0.52)_0%,rgba(4,16,28,0.18)_65%,rgba(3,12,22,0.38)_100%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F4C266]/75 to-transparent opacity-90"
          />

          {/* 3. Centered Conversion-Focused Copy Stack */}
          <div className="relative z-10 mx-auto flex max-w-[42rem] flex-col items-center text-center">
            {/* Small Uppercase Eyebrow (340ms) */}
            <div
              style={getItemRevealStyle(340, 16)}
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

            {/* Large, Elegant Serif Headline with Character Reveal (480ms) */}
            <h2
              id="final-cta-heading"
              className="mt-4 sm:mt-5 font-serif text-3xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] tracking-[-0.015em] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
            >
              <SplitTextReveal
                text={copy.headline}
                mode="chars"
                hasEntered={hasEntered}
                reducedMotion={reducedMotion}
                baseDelayMs={480}
                staggerMs={34}
                durationMs={900}
              />
            </h2>

            {/* Short Supporting Sentence (760ms) */}
            <p
              style={getItemRevealStyle(760, 18)}
              className="mt-3.5 sm:mt-4 max-w-[34rem] text-sm sm:text-base lg:text-[17.5px] font-normal leading-relaxed text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            >
              {copy.supportingText}
            </p>

            {/* Primary Rounded Pill CTA Button ("Plan My Trip →") — Opens the Right-Side Inquiry Drawer */}
            <div style={getItemRevealStyle(940, 18)} className="mt-7 sm:mt-8">
              <button
                type="button"
                onClick={handlePlanTripClick}
                aria-haspopup="dialog"
                data-final-cta-button="plan-my-trip"
                className="group/btn inline-flex cursor-pointer items-center gap-3.5 rounded-full bg-white/22 hover:bg-white/30 backdrop-blur-xl border border-white/55 pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 text-sm sm:text-[15px] font-semibold text-white shadow-[0_14px_38px_rgba(3,12,23,0.48),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5EEAD4]/80 hover:shadow-[0_18px_44px_rgba(14,124,142,0.48)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061523]"
              >
                <span className="tracking-wide">{copy.primaryCta}</span>
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white text-[#071D30] shadow-sm transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:bg-[#2DD4BF] group-hover/btn:text-[#041421]"
                >
                  <ArrowRight className="h-4 w-4 stroke-[2.2] transition-transform duration-300 group-hover/btn:-rotate-12" />
                </span>
              </button>
            </div>

            {/* Subtle Destination Corridor Pills Below Button (1080ms) */}
            <div
              style={getItemRevealStyle(1080, 14)}
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
