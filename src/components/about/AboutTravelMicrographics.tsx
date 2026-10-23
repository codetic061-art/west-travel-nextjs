import React from "react";
import type { CompanyFactIconId } from "@/config/about-us";

/**
 * 2D Editorial Airplane & Clouds Illustration inspired by Reference 3 (`image_8b01ab.png`),
 * adapted to the WEST GLOBAL TOURS palette (Navy, Teal, and Warm Sand-Gold).
 */
export function AboutAirplaneIllustration({ className = "w-44 h-24" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Dotted Curved Flight Trajectory */}
      <path
        d="M8 98C56 88 98 64 152 44"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="4 5"
        strokeLinecap="round"
        className="text-[#C89648] dark:text-[#F4C266] opacity-80"
      />
      <circle
        cx="12"
        cy="97"
        r="3"
        className="fill-[#0E7C8E] dark:fill-[#2DD4BF]"
      />

      {/* Upper Soft Outline Cloud */}
      <path
        d="M52 34H82C86.4 34 90 30.4 90 26C90 22.1 87.2 18.8 83.4 18.1C81.8 12.3 76.5 8 70.2 8C62.9 8 56.9 13.7 56.5 20.9C52.8 21.6 50 24.8 50 28.8C50 31.7 50.9 34 52 34Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#0E7C8E]/55 dark:text-[#5EEAD4]/45 fill-white/60 dark:fill-white/5"
      />

      {/* Lower Soft Outline Cloud */}
      <path
        d="M68 82H112C117.5 82 122 77.5 122 72C122 67 118.3 62.9 113.5 62.1C111.4 54.6 104.5 49 96.2 49C86.7 49 79 56.4 78.5 65.8C73.7 66.6 70 70.8 70 75.8C70 79.2 68 82 68 82Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#0B2B4B]/45 dark:text-white/35 fill-white/75 dark:fill-white/5"
      />

      {/* Sleek 2D Airliner Illustration */}
      <g transform="translate(108, 12) rotate(-8)">
        <path
          d="M52 36L64 10L75 12L68 36Z"
          className="fill-[#E2E8F0] dark:fill-slate-300 stroke-[#0B2B4B] dark:stroke-white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 38C22 31 44 29 94 31L112 14L120 15L109 35C114 36 116 39 112 41C96 44 42 45 16 43C9 42.5 8 40.5 12 38Z"
          className="fill-white dark:fill-[#F8FAFC] stroke-[#0B2B4B] dark:stroke-white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M94 31L112 14L119 15L108 34Z"
          className="fill-[#0E7C8E] dark:fill-[#2DD4BF]"
        />
        <path
          d="M11 39.5C24 41.5 64 41.5 106 39"
          stroke="#E5A93C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="34" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="41" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="48" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="55" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="62" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="69" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="76" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <path
          d="M48 40L72 68L84 66L68 40Z"
          className="fill-white dark:fill-slate-200 stroke-[#0B2B4B] dark:stroke-white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/**
 * Subtle 2D Editorial Route Divider connecting Cairo, Istanbul, and Dubai.
 */
export function AboutCorridorRouteDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto my-2 flex w-full max-w-xl items-center justify-center gap-3 opacity-85"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C89648]/60 to-[#0E7C8E]/60" />
      <svg viewBox="0 0 180 28" fill="none" className="h-6 w-40 shrink-0">
        <path
          d="M10 18 Q 50 4 90 14 T 170 10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="3 4"
          strokeLinecap="round"
          className="text-[#0E7C8E] dark:text-[#2DD4BF]"
        />
        <circle cx="10" cy="18" r="3" className="fill-[#E5A93C]" />
        <circle cx="90" cy="14" r="3" className="fill-[#0E7C8E] dark:fill-[#2DD4BF]" />
        <circle cx="170" cy="10" r="3" className="fill-[#E5A93C]" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C89648]/60 to-[#0E7C8E]/60" />
    </div>
  );
}

/**
 * PART 5 — Refined 2D Travel Micrographics for the About Us FAQ Area:
 * Includes:
 * 1. Upper-right / header whitespace illustration: a fine dotted flight path, a small airplane
 *    silhouette, two restrained location pins (warm gold & teal), and an outline travel-memory camera icon.
 * 2. Lower-left & lower-right margin ornaments: subtle Egyptian pyramid-horizon line art and a
 *    compass postmark accent positioned strictly in the outer section whitespace so they never
 *    sit behind FAQ questions or answer text.
 * 3. One-time viewport entrance reveal (`820ms`), with zero continuous motion.
 */
export function AboutFaqMicrographics({
  hasEntered,
  reducedMotion,
}: {
  hasEntered: boolean;
  reducedMotion: boolean;
}) {
  const entranceStyle: React.CSSProperties = reducedMotion
    ? { opacity: 1, transform: "none" }
    : {
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? "translate3d(0, 0, 0)" : "translate3d(0, 12px, 0)",
        transitionProperty: "opacity, transform",
        transitionDuration: "820ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: "180ms",
      };

  return (
    <div
      aria-hidden="true"
      data-faq-micrographics=""
      data-entered={hasEntered ? "true" : "false"}
      style={entranceStyle}
      className="pointer-events-none select-none"
    >
      {/* 1. Header Whitespace Flight Path, Outline Camera, Location Pins & Small Airplane Silhouette */}
      <div className="hidden md:block absolute top-10 right-6 lg:right-12 xl:right-20 w-[340px] lg:w-[420px] h-[110px] z-0">
        <svg
          viewBox="0 0 420 110"
          fill="none"
          focusable="false"
          className="w-full h-full overflow-visible"
        >
          {/* Fine Dotted Flight Path in Muted Warm Gold */}
          <path
            d="M 12 88 C 88 26, 184 96, 276 48 C 322 24, 358 22, 388 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 5.5"
            strokeLinecap="round"
            className="text-[#C89648]/80 dark:text-[#F4C266]/65"
          />

          {/* Origin Location Pin (Warm Sand-Gold) */}
          <g
            transform="translate(12, 88)"
            className="text-[#C89648] dark:text-[#F4C266]"
          >
            <ellipse
              cx="0"
              cy="1.5"
              rx="6.5"
              ry="2.2"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.45"
            />
            <path
              d="M0 0C-1.4-4-7.5-8.8-7.5-14.2a7.5 7.5 0 0 1 15 0C7.5-8.8 1.4-4 0 0Z"
              fill="currentColor"
              fillOpacity="0.18"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cy="-14.2" r="2.5" fill="currentColor" />
          </g>

          {/* Outline Travel-Memory Camera Icon Perched Along the Route */}
          <g
            transform="translate(136, 46) rotate(-7)"
            className="text-[#0B2B4B]/75 dark:text-[#CFE9E6]/75"
          >
            <rect
              x="-14"
              y="-8.5"
              width="28"
              height="19.5"
              rx="3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              className="fill-[#FBF8F2] dark:fill-[#071A2B]"
            />
            <path
              d="M -5.5 -8.5 L -3.2 -12.5 H 5.2 L 7.5 -8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-[#FBF8F2] dark:fill-[#071A2B]"
            />
            <line
              x1="-9.5"
              y1="-10.8"
              x2="-6.5"
              y2="-10.8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="0.8" cy="1.2" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="0.8" cy="1.2" r="2" fill="currentColor" opacity="0.65" />
            <circle cx="9.2" cy="-4" r="1.1" fill="currentColor" />
          </g>

          {/* Mid-Route Location Pin (Teal) */}
          <g
            transform="translate(276, 48)"
            className="text-[#0E7C8E] dark:text-[#2DD4BF]"
          >
            <ellipse
              cx="0"
              cy="1.5"
              rx="6"
              ry="2"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.45"
            />
            <path
              d="M0 0C-1.3-3.6-6.8-8-6.8-13a6.8 6.8 0 0 1 13.6 0C6.8-8 1.3-3.6 0 0Z"
              fill="currentColor"
              fillOpacity="0.18"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cy="-13" r="2.2" fill="currentColor" />
          </g>

          {/* Small Banking Airplane Silhouette at the Tip of the Flight Path */}
          <g
            transform="translate(396, 16) rotate(-14) scale(1.1)"
            className="text-[#0B2B4B]/85 dark:text-[#5EEAD4]/85"
          >
            <path
              d="M14 0C14-1.4 12.8-2.1 11.4-2.1H4.5L-3.5-12.8H-6.8L-2.7-2.1H-9.2L-12-5.7H-14.4L-12.9 0L-14.4 5.7H-12L-9.2 2.1H-2.7L-6.8 12.8H-3.5L4.5 2.1H11.4C12.8 2.1 14 1.4 14 0Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </div>

      {/* 2. Lower-Left Outer Margin Destination Horizon Mark (Giza Pyramids & Date Palm Line Art) */}
      <div className="hidden xl:block absolute bottom-6 left-6 w-48 h-28 z-0">
        <svg
          viewBox="0 0 210 120"
          fill="none"
          focusable="false"
          className="w-full h-full text-[#C89648]/35 dark:text-[#F4C266]/22"
        >
          <path
            d="M28 112L76 52L122 112"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M76 52L96 112"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M106 112L140 70L174 112"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 112C42 104 94 106 146 111C170 113 190 110 206 112"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <path
            d="M18 112C20 92 23 72 30 50M30 50C18 46 8 50 3 56M30 50C20 39 10 39 3 43M30 50C40 39 50 38 58 43"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 3. Lower-Right Outer Margin Compass & Postmark Stamp */}
      <div className="hidden xl:block absolute bottom-8 right-8 w-36 h-20 z-0">
        <svg
          viewBox="0 0 150 84"
          fill="none"
          focusable="false"
          className="w-full h-full text-[#0E7C8E]/30 dark:text-[#5EEAD4]/22"
        >
          <circle
            cx="104"
            cy="42"
            r="25"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeDasharray="3 3"
          />
          <circle cx="104" cy="42" r="18.5" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M104 28L107 39L118 42L107 45L104 56L101 45L90 42L101 39Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M12 33C22 29 32 37 42 33C52 29 62 37 72 33"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path
            d="M8 43C18 39 28 47 38 43C48 39 58 47 68 43"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Small warm-gold & teal decorative divider rule for the FAQ heading area.
 */
export function AboutFaqHeaderRule() {
  return (
    <div aria-hidden="true" className="mt-4 flex items-center gap-2.5">
      <span className="h-px w-12 bg-gradient-to-r from-[#C89648] to-[#0E7C8E] dark:from-[#F4C266] dark:to-[#2DD4BF]" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[#C89648] dark:bg-[#F4C266]" />
      <span className="h-px w-24 bg-gradient-to-r from-[#C89648]/65 to-transparent dark:from-[#F4C266]/55" />
    </div>
  );
}

/**
 * Custom 2D Teal Line-Art Icons for the 2x2 Verified Facts / Statistics Panel
 * (Matching Reference 2 `image_8b01a9.png` outline travel icon style).
 */
export function CompanyFactOutlineIcon({
  iconId,
  className = "h-10 w-10",
}: {
  iconId: CompanyFactIconId;
  className?: string;
}) {
  switch (iconId) {
    case "destinations":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
          <circle cx="22" cy="24" r="14" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="22" cy="24" rx="6.5" ry="14" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 19H35M9 29H35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M34 10L41 7L38 14L35.5 11.5L34 10Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <rect
            x="30"
            y="24"
            width="11"
            height="14"
            rx="2.5"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M33 24V21.5C33 20.7 33.7 20 34.5 20H36.5C37.3 20 38 20.7 38 21.5V24" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "journeys":
    case "travelers":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
          <circle cx="26" cy="14" r="5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M19 14H33" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M17 38V31C17 26.6 20.6 23 25 23H27C31.4 23 35 26.6 35 31V38"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <rect
            x="10"
            y="25"
            width="9"
            height="13"
            rx="2"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path d="M12.5 25V22H16.5V25" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "languages":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.8" />
          <polygon
            points="24,14 27,21 34,24 27,27 24,34 21,27 14,24 21,21"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
        </svg>
      );
    case "channels":
    case "experience":
    default:
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
          <path
            d="M16 28C16 21.4 21.4 16 28 16C34.6 16 40 21.4 40 28C40 34.6 34.6 40 28 40H18L13 43V34.5C14.8 32.6 16 30.4 16 28Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M24 10L25.2 12.6L28 13L26 15L26.5 17.8L24 16.4L21.5 17.8L22 15L20 13L22.8 12.6L24 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="28" r="1.6" fill="currentColor" />
          <circle cx="28.5" cy="28" r="1.6" fill="currentColor" />
          <circle cx="33" cy="28" r="1.6" fill="currentColor" />
        </svg>
      );
  }
}

/**
 * Custom 2D Teal Outline Icons for the Company Story Pillars
 * (Inspired by Reference 3 `image_8b01ab.png` "Trusted travel guide" & "Mission & Vision" outline icons).
 */
export function StoryPillarOutlineIcon({
  iconName,
  className = "h-10 w-10",
}: {
  iconName: "compass" | "target" | "map" | "message";
  className?: string;
}) {
  switch (iconName) {
    case "compass":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
          <path d="M12 10V40" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          <path
            d="M12 11L23 15.5L12 20Z"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="31" cy="18" r="5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M24 18H38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M22 39V32C22 28.1 25.1 25 29 25H33C36.9 25 40 28.1 40 32V39"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M28 25L31 31L34 25" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.8" />
          <circle
            cx="24"
            cy="24"
            r="9"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M24 6V11M24 37V42M6 24H11M37 24H42" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M24 24L38 10M38 10H32M38 10V16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "map":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
          <path
            d="M10 14L19 10L29 14L38 10V34L29 38L19 34L10 38V14Z"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M19 10V34M29 14V38" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "message":
    default:
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
          <rect
            x="9"
            y="12"
            width="30"
            height="22"
            rx="5"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M15 20H33M15 26H26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 34L14 40V34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
