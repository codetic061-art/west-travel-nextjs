"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useHero } from "./HeroProvider";

export function HeroCopy() {
  const { t, theme, activeDestination, selectDestinationForBooking } = useHero();
  const isLight = theme === "light";

  const handleExploreClick = () => {
    if (!activeDestination) {
      selectDestinationForBooking("turkiye");
    }
    const target = document.getElementById("hero-destination-cards");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div
      id="hero-copy"
      className="flex flex-col items-start justify-center text-left max-w-2xl pt-4 lg:pt-6"
    >
      {/* Eyebrow with Warm Sunset Gold Line */}
      <div className="animate-fade-up-1 mb-4 sm:mb-5 inline-flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="h-[1.5px] w-9 sm:w-12 bg-gradient-to-r from-[#E5A93C] to-[#F4C266]"
        />
        <span className="text-[11px] sm:text-xs md:text-[13px] font-medium uppercase tracking-[0.28em] text-[#F5E9D3] drop-shadow">
          {t.hero.eyebrow}
        </span>
      </div>

      {/* Dominant Editorial Serif Headline */}
      <h1 className="animate-fade-up-2 font-serif text-4xl sm:text-6xl lg:text-[4.25rem] xl:text-[4.85rem] font-semibold leading-[1.04] tracking-[-0.015em] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.55)]">
        <span className="block">{t.hero.headlineLine1}</span>
        <span className="block mt-1 bg-gradient-to-r from-[#F9E6B3] via-[#F4C97A] to-[#E5A93C] bg-clip-text text-transparent">
          {t.hero.headlineLine2}
        </span>
      </h1>

      {/* Supporting Copy */}
      <p className="animate-fade-up-3 mt-5 sm:mt-6 max-w-lg text-base sm:text-lg md:text-[19px] font-normal leading-relaxed text-white/92 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
        {t.hero.supportingText}
      </p>

      {/* Primary Teal Pill CTA */}
      <div className="animate-fade-up-4 mt-7 sm:mt-8 flex flex-wrap items-center gap-4">
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
