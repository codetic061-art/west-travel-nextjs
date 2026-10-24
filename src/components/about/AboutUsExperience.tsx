"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Compass, MapPin, Sparkles } from "lucide-react";
import {
  ABOUT_STORY_PILLARS_CONFIG,
  getActiveAboutCompanyFacts,
  type CompanyStatOrFactRecord,
} from "@/config/about-us";
import { COMPANY_IDENTITY_CONFIG } from "@/config/final-cta-footer";
import { ABOUT_US_DICTIONARY } from "@/i18n/about-us-dictionary";
import { useHero } from "@/components/hero/HeroProvider";
import { FloatingNavbar } from "@/components/hero/FloatingNavbar";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { TripInquiryDrawer } from "@/components/inquiry-drawer/TripInquiryDrawer";
import { FloatingSocialFab } from "@/components/social-fab/FloatingSocialFab";
import {
  SplitTextReveal,
  getDirectionalMaskStyle,
  getImageScaleSettleStyle,
  useSectionEntrance,
} from "@/components/motion/MotionPrimitives";
import {
  AboutAirplaneIllustration,
  AboutCorridorRouteDivider,
  CompanyFactOutlineIcon,
  StoryPillarOutlineIcon,
} from "./AboutTravelMicrographics";
import { AboutFaqAccordion } from "./AboutFaqAccordion";

export const ABOUT_HERO_COHERENT_PHOTO = {
  webp: "/images/west-travel/about-hero-nile-traveler.webp",
  jpg: "/images/west-travel/about-hero-nile-traveler.jpg",
} as const;

export interface AboutUsExperienceProps {
  /**
   * Optional custom company statistics/facts array for future backend/CMS binding.
   * Only records marked `isConfirmedForDisplay: true` with non-null values are rendered.
   */
  customFacts?: readonly CompanyStatOrFactRecord[];
}

/**
 * Dedicated About Us Page Experience (`/about`):
 * - Uses the fixed FloatingNavbar with top header band clearance so navigation stays visible while scrolling.
 * - Renders the single coherent editorial travel photograph (`/images/west-travel/about-hero-nile-traveler.webp`)
 *   with `quality={90}`, paired with the 2x2 Verified Company Scope panel and "Travel Is a Journey" callout.
 * - Includes the Asymmetric Company Story collage, 4 outline-icon pillars, and accessible trilingual FAQ accordion.
 */
export function AboutUsExperience({ customFacts }: AboutUsExperienceProps) {
  const { locale, theme } = useHero();
  const isLight = theme === "light";
  const copy = ABOUT_US_DICTIONARY[locale];
  const [useJpgFallback, setUseJpgFallback] = useState(false);

  const activeFacts = getActiveAboutCompanyFacts(customFacts);

  const {
    ref: heroRef,
    hasEntered: heroEntered,
    reducedMotion,
  } = useSectionEntrance<HTMLElement>({
    immediate: true,
  });

  const { ref: storyRef, hasEntered: storyEntered } =
    useSectionEntrance<HTMLElement>({
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    });

  // Directional image mask reveals
  const heroShowcaseMaskStyle = getDirectionalMaskStyle(
    "bottom-to-top",
    heroEntered,
    reducedMotion,
    180,
    1320,
    "28px"
  );

  const heroShowcaseScaleStyle = getImageScaleSettleStyle(
    heroEntered,
    reducedMotion,
    180,
    1420
  );

  const collageLeftMaskStyle = getDirectionalMaskStyle(
    "top-to-bottom",
    storyEntered,
    reducedMotion,
    120,
    1240,
    "22px"
  );

  const collageRightMaskStyle = getDirectionalMaskStyle(
    "bottom-to-top",
    storyEntered,
    reducedMotion,
    240,
    1320,
    "22px"
  );

  const getStaggerRevealStyle = (
    entered: boolean,
    delayMs: number,
    offsetY = 20
  ): React.CSSProperties =>
    reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: entered ? 1 : 0,
          transform: entered
            ? "translate3d(0, 0, 0)"
            : `translate3d(0, ${offsetY}px, 0)`,
          transitionProperty: "opacity, transform",
          transitionDuration: "880ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${delayMs}ms`,
        };

  return (
    <div
      data-page="about-us"
      data-theme-mode={theme}
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-500 ${
        isLight
          ? "bg-[#FBF8F2] text-[#081C2E]"
          : "bg-[#051320] text-[#F4F3EB]"
      }`}
    >
      {/* Top Shared Fixed Liquid-Glass Navbar + Top Band Clearance */}
      <FloatingNavbar hasAccountRoute={false} />

      {/* SECTION 1 — ABOUT PAGE HERO: COHERENT TRAVEL PHOTOGRAPH & 2x2 FACTS PANEL */}
      <section
        ref={heroRef}
        id="about-hero"
        aria-labelledby="about-hero-heading"
        data-entered={heroEntered ? "true" : "false"}
        className="relative w-full pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
          {/* Top Eyebrow Header */}
          <div
            style={getStaggerRevealStyle(heroEntered, 60, 14)}
            className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E4DAC6] dark:border-white/10"
          >
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E7C8E] dark:text-[#2DD4BF]">
              <Sparkles className="h-3.5 w-3.5 text-[#C89648] dark:text-[#F4C266]" />
              <span>{copy.hero.eyebrow}</span>
            </div>

            <span className="text-xs font-medium tracking-wider text-[#546576] dark:text-slate-400">
              Egypt · Türkiye · Dubai
            </span>
          </div>

          {/* Editorial Intro Header */}
          <div className="mt-8 max-w-3xl">
            <h1
              id="about-hero-heading"
              className="font-serif text-3xl sm:text-5xl lg:text-[3.45rem] font-semibold leading-[1.1] tracking-[-0.015em]"
            >
              <span className="block">
                <SplitTextReveal
                  text={copy.hero.headingLine1}
                  mode="words"
                  hasEntered={heroEntered}
                  reducedMotion={reducedMotion}
                  baseDelayMs={120}
                  staggerMs={95}
                  durationMs={860}
                />
              </span>
              <span className="block mt-1 text-[#0E7C8E] dark:text-[#5EEAD4]">
                <SplitTextReveal
                  text={copy.hero.headingLine2}
                  mode="words"
                  hasEntered={heroEntered}
                  reducedMotion={reducedMotion}
                  baseDelayMs={360}
                  staggerMs={95}
                  durationMs={880}
                />
              </span>
            </h1>

            <p
              style={getStaggerRevealStyle(heroEntered, 420, 18)}
              className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${
                isLight ? "text-[#546576]" : "text-slate-300"
              }`}
            >
              {copy.hero.supportingText}
            </p>
          </div>

          {/* Panoramic Showcase Using Single Coherent Travel Photograph */}
          <div
            style={heroShowcaseMaskStyle}
            data-about-hero-showcase=""
            data-about-hero-photo={ABOUT_HERO_COHERENT_PHOTO.webp}
            className={`relative mt-8 sm:mt-10 w-full overflow-hidden rounded-[28px] sm:rounded-[32px] border min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center p-5 sm:p-8 lg:p-11 ${
              isLight
                ? "border-[#E2D6C1] shadow-[0_24px_60px_rgba(11,43,75,0.16)]"
                : "border-white/15 shadow-[0_28px_68px_rgba(2,8,16,0.78)]"
            }`}
          >
            {/* Single Complete Coherent Editorial Travel Photograph */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden bg-[#081F32]"
              style={heroShowcaseScaleStyle}
            >
              <Image
                src={
                  useJpgFallback
                    ? ABOUT_HERO_COHERENT_PHOTO.jpg
                    : ABOUT_HERO_COHERENT_PHOTO.webp
                }
                alt={copy.hero.mainImageAlt}
                fill
                priority
                quality={90}
                sizes="(max-width: 1440px) 100vw, 1440px"
                onError={() => {
                  if (!useJpgFallback) setUseJpgFallback(true);
                }}
                className="object-cover object-[66%_36%] sm:object-[62%_38%] lg:object-[58%_38%]"
              />
              {/* Subtle left-side scrim behind the 2x2 Facts Card */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(5,19,32,0.38) 0%, rgba(5,19,32,0.12) 45%, transparent 72%)",
                }}
              />
            </div>

            <div className="relative z-20 grid w-full grid-cols-1 lg:grid-cols-12 items-end lg:items-center gap-8">
              {/* Left 2x2 Verified Facts / Statistics Card */}
              {activeFacts.length > 0 && (
                <div
                  data-about-facts-panel=""
                  style={getStaggerRevealStyle(heroEntered, 480, 20)}
                  className={`lg:col-span-6 xl:col-span-5 rounded-[24px] p-6 sm:p-7 backdrop-blur-xl border transition-colors ${
                    isLight
                      ? "bg-white/94 border-white shadow-[0_22px_50px_rgba(8,28,46,0.22)] text-[#081C2E]"
                      : "bg-[#071A2C]/90 border-white/15 shadow-[0_24px_54px_rgba(2,8,16,0.75)] text-white"
                  }`}
                >
                  <div className="mb-4 pb-3 border-b border-current/10 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                        {copy.hero.factsPanelTitle}
                      </p>
                      <p
                        className={`mt-0.5 text-xs ${
                          isLight ? "text-[#546576]" : "text-slate-300"
                        }`}
                      >
                        {copy.hero.factsPanelSubtitle}
                      </p>
                    </div>
                    <Compass className="h-5 w-5 text-[#C89648] dark:text-[#F4C266] shrink-0" />
                  </div>

                  {/* 2x2 Crosshair Grid */}
                  <div className="grid grid-cols-2">
                    {activeFacts.slice(0, 4).map((fact, idx) => {
                      const factCopy = copy.facts[fact.id] ?? {
                        label: fact.id,
                        detail: "",
                      };
                      const isRightCol = idx % 2 === 1;
                      const isBottomRow = idx >= 2;

                      return (
                        <div
                          key={fact.id}
                          data-company-fact={fact.id}
                          data-verification-status={fact.verificationStatus}
                          className={`flex flex-col items-center text-center p-4 sm:p-5 ${
                            isRightCol
                              ? "border-l border-slate-200/90 dark:border-white/10"
                              : ""
                          } ${
                            isBottomRow
                              ? "border-t border-slate-200/90 dark:border-white/10"
                              : ""
                          }`}
                        >
                          <CompanyFactOutlineIcon
                            iconId={fact.iconId}
                            className="h-11 w-11 text-[#1196B2] dark:text-[#2DD4BF]"
                          />
                          <div className="mt-2.5 font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                            {fact.displayValue}
                            {fact.valueSuffix ?? ""}
                          </div>
                          <div className="mt-1 text-xs sm:text-[13px] font-semibold">
                            {factCopy.label}
                          </div>
                          <div
                            className={`mt-0.5 text-[11px] leading-snug ${
                              isLight ? "text-[#64748B]" : "text-slate-400"
                            }`}
                          >
                            {factCopy.detail}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Right Column: Compact Editorial Callout Positioned at Bottom-Right Corner */}
              <div
                style={getStaggerRevealStyle(heroEntered, 640, 22)}
                className="lg:col-span-6 xl:col-span-7 flex justify-end items-end min-h-[220px] lg:min-h-[420px]"
              >
                <div
                  data-editorial-callout="travel-is-a-journey"
                  className="relative flex h-40 w-40 sm:h-44 sm:w-44 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#16A3B8]/92 via-[#0E869A]/92 to-[#0A6C7E]/92 text-center text-white shadow-[0_20px_48px_rgba(6,24,38,0.52)] border border-white/40 backdrop-blur-md p-4 select-none"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 rounded-full border border-dashed border-white/30"
                  />
                  <span className="font-serif italic text-xl sm:text-2xl font-medium leading-none tracking-tight drop-shadow">
                    {copy.hero.editorialCalloutLine1}
                  </span>
                  <span className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#F9E6B3]">
                    {copy.hero.editorialCalloutLine2}
                  </span>
                  <span className="mt-0.5 font-serif italic text-2xl sm:text-3xl font-semibold leading-none tracking-tight drop-shadow">
                    {copy.hero.editorialCalloutLine3}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/90">
                    <MapPin className="h-2.5 w-2.5 text-[#F4C266]" />
                    <span>Egypt · Türkiye · Dubai</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <AboutCorridorRouteDivider />
        </div>
      </section>

      {/* SECTION 2 — ASYMMETRIC EDITORIAL COMPANY STORY */}
      <section
        ref={storyRef}
        id="about-company-story"
        aria-labelledby="about-story-heading"
        data-entered={storyEntered ? "true" : "false"}
        className={`relative w-full py-14 sm:py-20 lg:py-24 transition-colors duration-500 [background:var(--west-surface-why)] ${
          isLight ? "text-[#081C2E]" : "text-white"
        }`}
      >
        {/* Upper-Right 2D Airplane & Clouds Micrographic */}
        <div
          style={getStaggerRevealStyle(storyEntered, 380, 14)}
          className="pointer-events-none hidden lg:block absolute right-8 xl:right-16 top-8 z-10"
        >
          <AboutAirplaneIllustration className="w-48 xl:w-56 h-auto" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
            {/* Left Column: Asymmetric 2-Column Travel Photo Collage + Teal Highlight Badge */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-stretch">
              <div className="sm:col-span-6 flex flex-col justify-between gap-4 sm:gap-5">
                <div
                  style={collageLeftMaskStyle}
                  className="relative h-[250px] sm:h-[275px] w-full overflow-hidden rounded-[22px] border border-white/80 dark:border-white/15 shadow-[0_18px_40px_rgba(8,28,46,0.14)]"
                >
                  <Image
                    src="/images/west-travel/cairo-luxor-card.webp"
                    alt={copy.story.collagePrimaryAlt}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 420px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03111F]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#041322]/82 border border-white/30 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
                    <MapPin className="h-3 w-3 text-[#F4C266]" />
                    <span>Cairo & Luxor · Egypt</span>
                  </span>
                </div>

                <div
                  style={getStaggerRevealStyle(storyEntered, 340, 18)}
                  data-about-collage-badge=""
                  className="flex items-center gap-4 rounded-[22px] bg-gradient-to-r from-[#0E7C8E] via-[#118FA3] to-[#159FB5] p-5 sm:p-6 text-white shadow-[0_18px_38px_rgba(14,124,142,0.32)]"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 border border-white/30">
                    <CompanyFactOutlineIcon
                      iconId="channels"
                      className="h-9 w-9 text-white"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-lg sm:text-xl font-bold leading-snug">
                      {copy.story.collageBadgeTitle}
                    </p>
                    <p className="mt-1 text-xs sm:text-[13px] text-white/90 leading-snug">
                      {copy.story.collageBadgeSubtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={collageRightMaskStyle}
                className="sm:col-span-6 relative h-[320px] sm:h-full min-h-[380px] lg:min-h-[430px] w-full overflow-hidden rounded-[22px] border border-white/80 dark:border-white/15 shadow-[0_20px_46px_rgba(8,28,46,0.16)]"
              >
                <Image
                  src="/images/west-travel/turkiye-card.webp"
                  alt={copy.story.collageSecondaryAlt}
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 420px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03111F]/85 via-transparent to-[#041322]/25" />
                <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#041322]/75 border border-white/35 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-[#F4C266]" />
                  <span>Istanbul · Dubai · Cairo</span>
                </span>
                <div className="absolute inset-x-4 bottom-4 rounded-xl bg-[#041423]/84 border border-white/25 p-3.5 backdrop-blur-md text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5EEAD4]">
                    Bosphorus & Skyline Corridors
                  </p>
                  <p className="mt-0.5 text-xs text-white/92">
                    Istanbul Historic Peninsula · Downtown Dubai Waterfront
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Copy, Outline Icon Feature Pillars & Visual CTA */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <p
                style={getStaggerRevealStyle(storyEntered, 120, 14)}
                className="font-serif italic text-xl sm:text-2xl font-medium text-[#1196B2] dark:text-[#5EEAD4]"
              >
                {copy.story.scriptEyebrow}
              </p>

              <h2
                id="about-story-heading"
                style={getStaggerRevealStyle(storyEntered, 200, 18)}
                className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.14] tracking-tight"
              >
                <span className="block">{copy.story.headingLine1}</span>
                <span className="block mt-1">{copy.story.headingLine2}</span>
              </h2>

              <p
                style={getStaggerRevealStyle(storyEntered, 300, 18)}
                className={`mt-4 text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-[#4F6478]" : "text-slate-300"
                }`}
              >
                {copy.story.leadParagraph}
              </p>

              <p
                style={getStaggerRevealStyle(storyEntered, 380, 18)}
                className={`mt-3 text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-[#4F6478]" : "text-slate-300"
                }`}
              >
                {copy.story.secondaryParagraph}
              </p>

              {/* 2x2 Feature Statements with Custom Outline Icons */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                {ABOUT_STORY_PILLARS_CONFIG.map((pillar, idx) => {
                  const pillarCopy = copy.story.pillars[pillar.id];
                  return (
                    <div
                      key={pillar.id}
                      data-about-pillar={pillar.id}
                      style={getStaggerRevealStyle(
                        storyEntered,
                        440 + idx * 110,
                        18
                      )}
                      className={`flex items-start gap-3.5 rounded-2xl p-4 border transition-colors ${
                        isLight
                          ? "bg-white/85 border-[#E6DEC8] shadow-sm"
                          : "bg-[#081F32]/80 border-white/10"
                      }`}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0E7C8E]/10 dark:bg-[#2DD4BF]/10 text-[#1196B2] dark:text-[#2DD4BF]">
                        <StoryPillarOutlineIcon
                          iconName={pillar.iconName}
                          className="h-9 w-9"
                        />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-[15px] font-bold leading-snug">
                          {pillarCopy.title}
                        </h3>
                        <p
                          className={`mt-1 text-xs leading-relaxed ${
                            isLight ? "text-[#5A6D80]" : "text-slate-300"
                          }`}
                        >
                          {pillarCopy.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA Row */}
              <div
                style={getStaggerRevealStyle(storyEntered, 820, 16)}
                className="mt-8 flex flex-wrap items-center gap-6 pt-2"
              >
                <button
                  type="button"
                  data-about-start-journey-cta="unwired-visual-only"
                  className="group inline-flex items-center gap-3 rounded-xl bg-[#1196B2] hover:bg-[#0E7C8E] px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(17,150,178,0.32)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
                >
                  <span>{copy.story.primaryCta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Official Brand Crest Badge */}
                <div className="flex items-center gap-3">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full overflow-hidden ring-2 ring-[#E5A93C]/60 bg-[#061523]">
                    <Image
                      src={COMPANY_IDENTITY_CONFIG.logoWebp}
                      alt={COMPANY_IDENTITY_CONFIG.brandName}
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                  </span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold tracking-wide">
                      {copy.story.planningDeskLabel}
                    </div>
                    <div
                      className={`text-[11.5px] ${
                        isLight ? "text-[#5A6D80]" : "text-slate-400"
                      }`}
                    >
                      {copy.story.planningDeskRole}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FAQ / QUESTIONS AND ANSWERS WITH REFINED TRAVEL MICROGRAPHICS */}
      <AboutFaqAccordion copy={copy.faq} isLight={isLight} />

      {/* GLOBAL FOOTER */}
      <SiteFooter />
      <TripInquiryDrawer />
      <FloatingSocialFab />
    </div>
  );
}
