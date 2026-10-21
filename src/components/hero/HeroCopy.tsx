"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useHero } from "./HeroProvider";
import { SplitTextReveal, useSectionEntrance } from "@/components/motion/MotionPrimitives";

export function HeroCopy() {
  const { t, theme, activeDestination, selectDestinationForBooking } = useHero();
  const isLight = theme === "light";

  const { ref: copyRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLDivElement>({
    immediate: true,
  });

  const handleExploreClick = () => {
    if (!activeDestination) {
      selectDestinationForBooking("turkiye");
    }
    const target = document.getElementById("hero-destination-cards");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const getSequenceStyle = (delayMs: number, durationMs = 680): React.CSSProperties =>
    reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? "translate3d(0, 0, 0)" : "translate3d(0, 18px, 0)",
          transitionProperty: "opacity, transform",
          transitionDuration: `${durationMs}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${delayMs}ms`,
        };

  return (
    <div
      id="hero-copy"
      ref={copyRef}
      data-hero-copy-entered={hasEntered ? "true" : "false"}
      className="flex flex-col items-start justify-center text-left max-w-2xl pt-4 lg:pt-6"
    >
      {/* 1. Eyebrow with Warm Sunset Gold Line (160ms) */}
      <div
        style={getSequenceStyle(160, 620)}
        className="mb-4 sm:mb-5 inline-flex items-center gap-3.5"
      >
        <span
          aria-hidden="true"
          className="h-[1.5px] w-9 sm:w-12 bg-gradient-to-r from-[#E5A93C] to-[#F4C266]"
        />
        <span className="text-[11px] sm:text-xs md:text-[13px] font-medium uppercase tracking-[0.28em] text-[#F5E9D3] drop-shadow">
          {t.hero.eyebrow}
        </span>
      </div>

      {/* 2. Dominant Editorial Serif Headline with Masked Character-by-Character Reveal */}
      <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] xl:text-[4.85rem] font-semibold leading-[1.04] tracking-[-0.015em] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.55)]">
        <span className="block">
          <SplitTextReveal
            text={t.hero.headlineLine1}
            mode="chars"
            hasEntered={hasEntered}
            reducedMotion={reducedMotion}
            baseDelayMs={230}
            staggerMs={24}
            durationMs={600}
          />
        </span>
        <span className="block mt-1">
          <SplitTextReveal
            text={t.hero.headlineLine2}
            mode="chars"
            hasEntered={hasEntered}
            reducedMotion={reducedMotion}
            baseDelayMs={490}
            staggerMs={28}
            durationMs={620}
            unitClassName="bg-gradient-to-r from-[#F9E6B3] via-[#F4C97A] to-[#E5A93C] bg-clip-text text-transparent"
          />
        </span>
      </h1>

      {/* 3. Supporting Copy (620ms) */}
      <p
        style={getSequenceStyle(620, 680)}
        className="mt-5 sm:mt-6 max-w-lg text-base sm:text-lg md:text-[19px] font-normal leading-relaxed text-white/92 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
      >
        {t.hero.supportingText}
      </p>

      {/* 4. Primary Teal Pill CTA (730ms) */}
      <div
        style={getSequenceStyle(730, 680)}
        className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4"
      >
        <button
          type="button"
          onClick={handleExploreClick}
          className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#0D7486] via-[#0F889C] to-[#149BB0] px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-[15px] font-semibold text-white shadow-[0_12px_32px_rgba(14,124,142,0.48)] border border-[#5EEAD4]/40 transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_rgba(20,155,176,0.62)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061523]"
        >
          <span>{t.hero.primaryCta}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        {/* Active Destination Spotlight Badge */}
        {activeDestination && (
          <div
            className={`west-glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs transition-colors ${
              isLight ? "text-slate-900" : "text-white/95"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#E5A93C]" />
            <span>
              {t.destinations[activeDestination].locationBadge} —{" "}
              <strong className={isLight ? "font-semibold text-[#0E7C8E]" : "font-medium text-[#5EEAD4]"}>
                {t.destinations[activeDestination].tagline}
              </strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
