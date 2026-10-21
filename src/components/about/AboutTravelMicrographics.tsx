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
        {/* Upper Far Wing */}
        <path
          d="M52 36L64 10L75 12L68 36Z"
          className="fill-[#E2E8F0] dark:fill-slate-300 stroke-[#0B2B4B] dark:stroke-white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Main Fuselage */}
        <path
          d="M12 38C22 31 44 29 94 31L112 14L120 15L109 35C114 36 116 39 112 41C96 44 42 45 16 43C9 42.5 8 40.5 12 38Z"
          className="fill-white dark:fill-[#F8FAFC] stroke-[#0B2B4B] dark:stroke-white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Teal & Gold Tail Accent */}
        <path
          d="M94 31L112 14L119 15L108 34Z"
          className="fill-[#0E7C8E] dark:fill-[#2DD4BF]"
        />
        {/* Nose Cone & Belly Accent Stripe */}
        <path
          d="M11 39.5C24 41.5 64 41.5 106 39"
          stroke="#E5A93C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Cabin Windows */}
        <circle cx="34" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="41" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="48" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="55" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="62" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="69" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        <circle cx="76" cy="36" r="1.3" className="fill-[#0B2B4B]" />
        {/* Lower Swept Wing */}
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
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C89648]/60 to-[#0E7C8E]/60" />
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
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C89648]/60 to-[#0E7C8E]/60" />
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
          {/* Flag & Guide silhouette inspired by Reference 3 */}
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
          {/* Target & Arrow inspired by Reference 3 "Mission & Vision" */}
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
