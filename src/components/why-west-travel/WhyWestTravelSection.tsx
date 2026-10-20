"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  WHY_WEST_TRAVEL_FEATURES,
  WHY_WEST_TRAVEL_SECTION_CONFIG,
  type WhyWestFeatureId,
} from "@/config/why-west-travel";
import { useHero } from "@/components/hero/HeroProvider";

/**
 * Refined 2D outline SVG icons matching the approved "Why West Travel" reference design:
 * 1. network: Globe with latitude/longitude meridians
 * 2. transfer: Shield with centered security checkmark
 * 3. support: Support headset with "24/7" badge inside
 * 4. booking: Calendar with bottom-right fast-confirmation clock badge
 */
function FeatureOutlineIcon({ id }: { id: WhyWestFeatureId }) {
  switch (id) {
    case "network":
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="14" cy="14" r="9.5" stroke="currentColor" strokeWidth="1.7" />
          <ellipse cx="14" cy="14" rx="4.6" ry="9.5" stroke="currentColor" strokeWidth="1.55" />
          <path d="M4.8 14H23.2" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
          <path
            d="M6.2 9.8H21.8M6.2 18.2H21.8"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
    case "transfer":
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            d="M14 4.2L21.6 7.3V13.4C21.6 18.4 18.35 22.35 14 23.9C9.65 22.35 6.4 18.4 6.4 13.4V7.3L14 4.2Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M10.6 14.1L12.95 16.45L17.6 11.6"
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "support":
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            d="M6.2 14.5V13.4C6.2 9.09 9.69 5.6 14 5.6C18.31 5.6 21.8 9.09 21.8 13.4V14.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <rect
            x="4.4"
            y="13.2"
            width="2.8"
            height="5.2"
            rx="1.4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <rect
            x="20.8"
            y="13.2"
            width="2.8"
            height="5.2"
            rx="1.4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M21.8 18.2C21.2 20.6 19.1 22.1 16.2 22.1H13.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="13.2" cy="22.1" r="1.1" fill="currentColor" />
          <text
            x="14"
            y="16.1"
            textAnchor="middle"
            fill="currentColor"
            fontSize="6.1"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.02em"
          >
            24/7
          </text>
        </svg>
      );
    case "booking":
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            d="M15.4 21.4H7.8C6.47 21.4 5.4 20.33 5.4 19V8.8C5.4 7.47 6.47 6.4 7.8 6.4H18.6C19.93 6.4 21 7.47 21 8.8V13.2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M9.2 4.6V7.6M17.2 4.6V7.6M5.6 10.4H20.8"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
          />
          <rect x="8.2" y="12.7" width="2.2" height="1.8" rx="0.4" fill="currentColor" />
          <rect x="11.8" y="12.7" width="2.2" height="1.8" rx="0.4" fill="currentColor" />
          <rect x="8.2" y="15.8" width="2.2" height="1.8" rx="0.4" fill="currentColor" />
          <circle cx="19.1" cy="18.9" r="4.3" stroke="currentColor" strokeWidth="1.65" />
          <path
            d="M19.1 16.9V19.1L20.6 20"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

/**
 * Low-contrast Egyptian-inspired vertical cartouche & geometric border ornament.
 * Placed strictly along the outer left and right edges so it never competes with text or imagery.
 */
function EgyptianEdgeMotifStrip({ side, isLight }: { side: "left" | "right"; isLight: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-8 ${
        side === "left" ? "left-1.5 sm:left-3 xl:left-5" : "right-1.5 sm:right-3 xl:right-5"
      } hidden sm:flex w-8 xl:w-11 flex-col items-center justify-between select-none ${
        isLight ? "text-[#BFA374] opacity-[0.18]" : "text-[#E5A93C] opacity-[0.09]"
      }`}
    >
      <svg
        viewBox="0 0 44 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Vertical framing hairlines */}
        <line x1="4" y1="10" x2="4" y2="510" stroke="currentColor" strokeWidth="0.9" />
        <line x1="40" y1="10" x2="40" y2="510" stroke="currentColor" strokeWidth="0.9" />

        {/* Motif 1: Lotus & Solar Disk */}
        <circle cx="22" cy="46" r="9" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="22" cy="46" r="3" fill="currentColor" />
        <path
          d="M11 66C15 58 29 58 33 66M14 70L22 57L30 70"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line x1="10" y1="84" x2="34" y2="84" stroke="currentColor" strokeWidth="1.1" />

        {/* Motif 2: Eye of Horus stylized geometric line art */}
        <path
          d="M9 124C14 116 30 116 35 124C30 132 14 132 9 124Z"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <circle cx="22" cy="124" r="3.2" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M22 132V144M18 131L13 142C11.5 145 14 147 16 145"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line x1="10" y1="164" x2="34" y2="164" stroke="currentColor" strokeWidth="1.1" />

        {/* Motif 3: Ankh / Eternal Life key */}
        <ellipse cx="22" cy="196" rx="6.5" ry="9" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M13 206H31M22 206V228"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <line x1="10" y1="246" x2="34" y2="246" stroke="currentColor" strokeWidth="1.1" />

        {/* Motif 4: Pyramid & Twin Reeds */}
        <path
          d="M10 294L22 272L34 294H10Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M22 272V294" stroke="currentColor" strokeWidth="1" />
        <line x1="10" y1="312" x2="34" y2="312" stroke="currentColor" strokeWidth="1.1" />

        {/* Motif 5: Scarab / Winged Sun Cartouche */}
        <ellipse cx="22" cy="350" rx="6" ry="8.5" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M8 346C12 342 15 342 16 346M36 346C32 342 29 342 28 346M8 354C12 351 15 351 16 354M36 354C32 351 29 351 28 354"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <line x1="10" y1="380" x2="34" y2="380" stroke="currentColor" strokeWidth="1.1" />

        {/* Motif 6: Papyrus Column Capital */}
        <path
          d="M13 414C13 404 31 404 31 414L27 444H17L13 414Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <line x1="22" y1="406" x2="22" y2="444" stroke="currentColor" strokeWidth="1" />
        <line x1="10" y1="462" x2="34" y2="462" stroke="currentColor" strokeWidth="1.1" />

        {/* Bottom Geometric Diamond */}
        <path d="M22 480L30 492L22 504L14 492L22 480Z" stroke="currentColor" strokeWidth="1.15" />
      </svg>
    </div>
  );
}

/**
 * Subtle corner palm-frond line art matching the top-left and bottom-right corners of the reference.
 */
function CornerPalmFrond({
  position,
  isLight,
}: {
  position: "top-left" | "bottom-right";
  isLight: boolean;
}) {
  const isTopLeft = position === "top-left";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none hidden md:block ${
        isTopLeft ? "-left-3 -top-2 w-40 lg:w-48" : "-right-3 -bottom-2 w-44 lg:w-52 rotate-180"
      } ${isLight ? "text-[#C5B291] opacity-35" : "text-[#E5A93C] opacity-12"}`}
    >
      <svg viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M-10 10C45 28 98 62 146 122"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 18C48 10 88 12 126 24C88 22 52 24 18 28Z"
          fill="currentColor"
          fillOpacity="0.45"
        />
        <path
          d="M32 30C72 24 114 28 152 44C112 39 74 39 38 42Z"
          fill="currentColor"
          fillOpacity="0.45"
        />
        <path
          d="M54 46C94 42 134 50 168 68C130 60 92 58 60 58Z"
          fill="currentColor"
          fillOpacity="0.42"
        />
        <path
          d="M76 64C112 63 148 73 176 92C142 82 108 78 82 77Z"
          fill="currentColor"
          fillOpacity="0.38"
        />
        <path
          d="M10 26C18 58 32 92 54 122C38 90 28 58 22 32Z"
          fill="currentColor"
          fillOpacity="0.38"
        />
        <path
          d="M30 40C40 72 56 104 78 132C62 102 50 72 42 46Z"
          fill="currentColor"
          fillOpacity="0.36"
        />
        <path
          d="M54 58C66 86 82 114 104 140C88 112 76 86 66 64Z"
          fill="currentColor"
          fillOpacity="0.32"
        />
      </svg>
    </div>
  );
}

/**
 * Section 3: Why West Travel — Get the Best Travel Experience.
 *
 * Implements the approved editorial 3-column composition:
 * - Left column: 4 compact service highlights with pale-mint circular icon badges, navy headings,
 *   muted blue-gray supporting copy, and thin warm-sand dividers.
 * - Center column: Photographic traveler & Egypt/Dubai landmark composition (Giza Pyramids, Sphinx,
 *   Burj Khalifa skyline, reflective waterfront) crowned by a delicate dashed flight arc, 2D airplane
 *   silhouette, and 3 location pins (no large world map).
 * - Right column: Uppercase eyebrow ("WHY WEST TRAVEL"), two-line editorial serif headline,
 *   concise supporting copy, and rounded teal "Learn More →" pill CTA linking to /about.
 */
export function WhyWestTravelSection() {
  const { t, theme } = useHero();
  const isLight = theme === "light";
  const copy = t.whyWestTravel;

  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setHasEntered(true);
    }
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setHasEntered(true);
      }
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || hasEntered) return;
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.14,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, hasEntered]);

  const getEntranceStyle = (
    vector: "left" | "up" | "right",
    delayMs: number
  ): React.CSSProperties => {
    if (reducedMotion) {
      return { opacity: 1, transform: "none" };
    }
    const initialTransform =
      vector === "left"
        ? "translate3d(-26px, 0, 0)"
        : vector === "right"
        ? "translate3d(26px, 0, 0)"
        : "translate3d(0, 24px, 0)";
    return {
      opacity: hasEntered ? 1 : 0,
      transform: hasEntered ? "translate3d(0, 0, 0)" : initialTransform,
      transitionProperty: "opacity, transform",
      transitionDuration: "740ms",
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delayMs}ms`,
    };
  };

  const renderFeatureItem = (
    feature: (typeof WHY_WEST_TRAVEL_FEATURES)[number],
    index: number,
    layoutVariant: "desktop" | "responsive"
  ) => {
    const localized = copy.features[feature.id];
    const title = localized?.title || feature.defaultTitle;
    const description = localized?.description || feature.defaultDescription;

    return (
      <div
        key={`${layoutVariant}-${feature.id}`}
        data-why-feature={feature.id}
        data-verification-status={feature.verificationStatus}
        style={getEntranceStyle("left", 90 + index * 75)}
        className="flex items-start gap-3.5 sm:gap-4"
      >
        {/* Small Pale-Mint Circular Icon Background (Light Mode) / Dark Petrol-Teal Surface (Dark Mode) */}
        <span
          className={`mt-0.5 flex h-12 w-12 xl:h-[52px] xl:w-[52px] shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            isLight
              ? "bg-[#DFEFEF] border-[#C5E0E0]/90 text-[#0C6B7C] shadow-[0_4px_12px_rgba(14,110,127,0.07)]"
              : "bg-[#0B2438] border-[#2DD4BF]/25 text-[#2DD4BF] shadow-[0_6px_16px_rgba(2,10,18,0.5)]"
          }`}
        >
          <FeatureOutlineIcon id={feature.id} />
        </span>

        {/* Feature Text & Subtle Warm-Sand Divider */}
        <div className="min-w-0 flex-1">
          <h3
            className={`text-[15px] sm:text-base font-semibold leading-snug tracking-[-0.01em] ${
              isLight ? "text-[#092138]" : "text-[#F8FAFC]"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-1 text-xs sm:text-[13px] font-normal leading-[1.5] max-w-[260px] ${
              isLight ? "text-[#5A6A7B]" : "text-slate-300/82"
            }`}
          >
            {description}
          </p>

          {feature.showBottomDivider && (
            <div
              aria-hidden="true"
              className={`mt-3.5 h-[1px] w-9 ${
                layoutVariant === "responsive" ? "sm:hidden lg:block" : ""
              } ${isLight ? "bg-[#D9C098]/90" : "bg-[#E5A93C]/30"}`}
            />
          )}
        </div>
      </div>
    );
  };

  const renderCenterComposition = () => (
    <div
      style={getEntranceStyle("up", 130)}
      className="relative mx-auto flex w-full max-w-[440px] sm:max-w-[470px] xl:max-w-[510px] flex-col items-center justify-center"
    >
      {/* Soft Pale-Blue Atmospheric Halo Behind Traveler & Landmarks (No World Map) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-4 rounded-full blur-2xl transition-opacity duration-500 ${
          isLight
            ? "bg-[radial-gradient(circle_at_50%_46%,rgba(196,229,240,0.62)_0%,rgba(224,242,247,0.28)_55%,transparent_76%)] opacity-100"
            : "bg-[radial-gradient(circle_at_50%_46%,rgba(14,124,142,0.26)_0%,rgba(45,212,191,0.08)_55%,transparent_76%)] opacity-100"
        }`}
      />

      {/* Lightweight 2D SVG Micrographics: Curved Dashed Flight Arc, Airplane Silhouette & 3 Location Pins */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-20 h-full w-full transition-opacity duration-700 ${
          hasEntered || reducedMotion ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Main Dotted Flight Route Arc */}
        <path
          d="M 86 144 C 148 44, 352 44, 414 144"
          stroke={isLight ? "#5B9AA8" : "#2DD4BF"}
          strokeOpacity={isLight ? "0.52" : "0.42"}
          strokeWidth="1.5"
          strokeDasharray="4.5 5"
          strokeLinecap="round"
        />

        {/* Secondary Small Loop Trail Behind Airplane */}
        <path
          d="M 244 65 C 266 56, 274 78, 298 69"
          stroke={isLight ? "#5B9AA8" : "#2DD4BF"}
          strokeOpacity={isLight ? "0.45" : "0.38"}
          strokeWidth="1.3"
          strokeDasharray="3 3.5"
          strokeLinecap="round"
        />

        {/* Subtle Flat Cloud Wisp (Left) */}
        <path
          d="M150 86H174C177.5 86 180 83.5 180 80.5C180 77.8 177.8 75.5 175 75.3C174.1 71.2 170.4 68.2 166 68.2C162.1 68.2 158.8 70.6 157.4 74C156.6 73.7 155.7 73.5 154.8 73.5C151.1 73.5 148 76.4 148 80C148 83.3 148.9 86 150 86Z"
          fill={isLight ? "#CFE6EE" : "#1E4963"}
          fillOpacity={isLight ? "0.65" : "0.45"}
        />

        {/* Left Teardrop Location Pin (Teal) */}
        <g transform="translate(105, 86)">
          <path
            d="M12 0C6.48 0 2 4.48 2 10C2 16.8 12 25.5 12 25.5C12 25.5 22 16.8 22 10C22 4.48 17.52 0 12 0Z"
            fill={isLight ? "#2895A6" : "#2DD4BF"}
          />
          <circle cx="12" cy="9.8" r="3.8" fill={isLight ? "#F8F5EC" : "#071A2C"} />
        </g>

        {/* Top-Center Teardrop Location Pin (Warm Sand-Gold) */}
        <g transform="translate(212, 41)">
          <path
            d="M12 0C6.48 0 2 4.48 2 10C2 16.8 12 25.5 12 25.5C12 25.5 22 16.8 22 10C22 4.48 17.52 0 12 0Z"
            fill={isLight ? "#D7AA63" : "#F4C266"}
          />
          <circle cx="12" cy="9.8" r="3.8" fill={isLight ? "#F8F5EC" : "#071A2C"} />
        </g>

        {/* Flat 2D Airplane Silhouette Along Upper-Right Arc */}
        <g transform="translate(298, 49) rotate(14)">
          <path
            d="M27.5 13.2L17.4 11.4L10.8 1.5C10.3 0.8 9.3 0.6 8.5 1L6.9 1.8L10.7 11.2L4.2 11.1L1.6 7.4L0 8.1L1.7 13.3L0.1 18.5L1.7 19.2L4.3 15.5L10.8 15.4L7 24.8L8.6 25.6C9.4 26 10.4 25.8 10.9 25.1L17.5 15.2L27.5 13.4C28.6 13.2 28.6 13.4 27.5 13.2Z"
            fill={isLight ? "#107E91" : "#2DD4BF"}
          />
        </g>

        {/* Right Teardrop Location Pin (Deep Slate-Teal) */}
        <g transform="translate(366, 88)">
          <path
            d="M12 0C6.48 0 2 4.48 2 10C2 16.8 12 25.5 12 25.5C12 25.5 22 16.8 22 10C22 4.48 17.52 0 12 0Z"
            fill={isLight ? "#2A677B" : "#38BDF8"}
          />
          <circle cx="12" cy="9.8" r="3.8" fill={isLight ? "#F8F5EC" : "#071A2C"} />
        </g>
      </svg>

      {/* Central Traveler & Egypt/Dubai Landmark Composition */}
      <div className="relative z-10 w-full aspect-[760/752]">
        <Image
          src={WHY_WEST_TRAVEL_SECTION_CONFIG.travelerImageWebp}
          alt={copy.travelerImageAlt || WHY_WEST_TRAVEL_SECTION_CONFIG.travelerImageAlt}
          fill
          sizes="(max-width: 768px) 88vw, (max-width: 1200px) 44vw, 490px"
          className={`object-contain select-none transition-all duration-500 ${
            isLight
              ? "drop-shadow-[0_14px_30px_rgba(12,34,54,0.08)]"
              : "brightness-[0.97] contrast-[1.03] drop-shadow-[0_18px_38px_rgba(0,0,0,0.55)]"
          }`}
        />
      </div>
    </div>
  );

  const renderBrandMessage = (alignCenterOnMobile = false) => (
    <div
      className={`flex flex-col ${
        alignCenterOnMobile
          ? "items-center text-center md:items-start md:text-left"
          : "items-start text-left"
      }`}
    >
      {/* Eyebrow: — WHY WEST TRAVEL — */}
      <div
        style={getEntranceStyle("right", 105)}
        className="inline-flex items-center gap-3 sm:gap-3.5"
      >
        <span
          aria-hidden="true"
          className={`h-[1px] w-9 sm:w-11 ${
            isLight ? "bg-[#D5B684]" : "bg-[#E5A93C]/65"
          }`}
        />
        <p className="text-[11.5px] sm:text-xs font-semibold uppercase tracking-[0.22em]">
          <span className={isLight ? "text-[#BD9556]" : "text-[#F4C266]"}>
            {copy.eyebrowPrefix || WHY_WEST_TRAVEL_SECTION_CONFIG.eyebrowPrefix}
          </span>{" "}
          <span className={isLight ? "text-[#0E7C8E]" : "text-[#2DD4BF]"}>
            {copy.eyebrowHighlight || WHY_WEST_TRAVEL_SECTION_CONFIG.eyebrowHighlight}
          </span>
        </p>
        <span
          aria-hidden="true"
          className={`h-[1px] w-9 sm:w-11 ${
            isLight ? "bg-[#D5B684]" : "bg-[#E5A93C]/65"
          }`}
        />
      </div>

      {/* Large Editorial Serif Headline Wrapping into Two Lines on Desktop */}
      <h2
        id="why-west-travel-heading"
        style={getEntranceStyle("right", 170)}
        className={`mt-3.5 font-serif text-3xl sm:text-4xl lg:text-[2.7rem] xl:text-[3.15rem] font-semibold leading-[1.12] tracking-[-0.015em] ${
          isLight ? "text-[#081C2E]" : "text-white"
        }`}
      >
        <span className="block">{copy.headingLine1}</span>
        <span className="block mt-0.5">{copy.headingLine2}</span>
      </h2>

      {/* Concise Supporting Copy */}
      <p
        style={getEntranceStyle("right", 235)}
        className={`mt-4 max-w-[420px] text-sm sm:text-[15px] xl:text-[16px] font-normal leading-[1.65] ${
          isLight ? "text-[#546576]" : "text-slate-300/88"
        }`}
      >
        {copy.supportingText || WHY_WEST_TRAVEL_SECTION_CONFIG.supportingText}
      </p>

      {/* Primary Teal Pill CTA: Learn More → */}
      <div style={getEntranceStyle("right", 305)} className="mt-6 sm:mt-7">
        <Link
          href={WHY_WEST_TRAVEL_SECTION_CONFIG.primaryCtaHref}
          data-why-west-cta="learn-more"
          className={`group/cta inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 ${
            isLight
              ? "bg-gradient-to-r from-[#0B7789] via-[#0E8599] to-[#1396AC] shadow-[0_10px_24px_rgba(14,124,142,0.24)] hover:brightness-105 hover:shadow-[0_14px_30px_rgba(14,124,142,0.34)] focus-visible:ring-offset-[#F7F3E8]"
              : "bg-gradient-to-r from-[#0D7688] via-[#118CA1] to-[#16A3B8] border border-[#5EEAD4]/35 shadow-[0_12px_28px_rgba(2,10,18,0.65)] hover:brightness-110 hover:shadow-[0_14px_34px_rgba(20,155,176,0.45)] focus-visible:ring-offset-[#051422]"
          }`}
        >
          <span>{copy.primaryCta || WHY_WEST_TRAVEL_SECTION_CONFIG.primaryCtaLabel}</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );

  return (
    <section
      id="why-west-travel"
      ref={sectionRef}
      aria-labelledby="why-west-travel-heading"
      data-theme-mode={theme}
      data-entered={hasEntered ? "true" : "false"}
      className={`relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 transition-colors duration-500 ${
        isLight ? "bg-[#F7F3E8] text-[#081C2E]" : "bg-[#051422] text-[#F8FAFC]"
      }`}
    >
      {/* 1. Warm Ivory Paper-Like Texture (Light Mode) / Deep Petrol Surface (Dark Mode) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          isLight
            ? "bg-[radial-gradient(ellipse_70%_55%_at_50%_46%,rgba(255,253,249,0.88),transparent_72%),linear-gradient(180deg,#FAF8F2_0%,#F6F1E4_52%,#F3EDE0_100%)] opacity-100"
            : "bg-[radial-gradient(ellipse_70%_55%_at_50%_46%,rgba(14,124,142,0.12),transparent_72%),linear-gradient(180deg,#061523_0%,#051320_52%,#04101C_100%)] opacity-100"
        }`}
      />

      {/* Subtle Diagonal Editorial Sunbeam Wash Matching Reference */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          isLight
            ? "bg-[linear-gradient(122deg,rgba(235,225,204,0.34)_0%,transparent_36%,transparent_64%,rgba(235,225,204,0.3)_100%)]"
            : "bg-[linear-gradient(122deg,rgba(229,169,60,0.03)_0%,transparent_38%,transparent_64%,rgba(45,212,191,0.04)_100%)]"
        }`}
      />

      {/* Soft Desert Dune Horizon Contour at Bottom */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 w-full"
      >
        <path
          d="M0 78C190 36 390 48 610 88C840 126 1120 34 1440 58V120H0V78Z"
          fill={isLight ? "#EFE7D6" : "#071B2E"}
          fillOpacity={isLight ? "0.65" : "0.55"}
        />
      </svg>

      {/* 2. Low-Contrast Egyptian-Inspired Outer Edge Patterns & Corner Palm Leaves */}
      <EgyptianEdgeMotifStrip side="left" isLight={isLight} />
      <EgyptianEdgeMotifStrip side="right" isLight={isLight} />
      <CornerPalmFrond position="top-left" isLight={isLight} />
      <CornerPalmFrond position="bottom-right" isLight={isLight} />

      {/* 3. Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 sm:px-10 lg:px-16">
        {/* DESKTOP THREE-COLUMN COMPOSITION (lg and above: Benefits Left, Traveler Center, Brand Message Right) */}
        <div
          data-why-layout="desktop-three-column"
          className="hidden lg:grid lg:grid-cols-[minmax(255px,0.92fr)_minmax(360px,1.24fr)_minmax(290px,1.02fr)] items-center gap-8 xl:gap-12"
        >
          {/* Left Column: Four Compact Service Highlights */}
          <div className="flex flex-col gap-4">
            {WHY_WEST_TRAVEL_FEATURES.map((feature, idx) =>
              renderFeatureItem(feature, idx, "desktop")
            )}
          </div>

          {/* Center Column: Traveler and Egypt/Dubai Landmark Composition */}
          <div className="flex items-center justify-center">
            {renderCenterComposition()}
          </div>

          {/* Right Column: Brand Message, Serif Headline & Teal CTA */}
          <div className="flex flex-col justify-center pl-2">
            {renderBrandMessage(false)}
          </div>
        </div>

        {/* TABLET & MOBILE RESPONSIVE COMPOSITION (below lg) */}
        <div data-why-layout="responsive-stack" className="lg:hidden">
          {/* Top Row on Tablet (2-col: Traveler + Headline) / Stacked on Mobile (Headline first, then Traveler) */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-6">
            <div className="order-1 md:order-2 md:col-span-6">
              {renderBrandMessage(true)}
            </div>
            <div className="order-2 md:order-1 md:col-span-6">
              {renderCenterComposition()}
            </div>
          </div>

          {/* Bottom Row on Tablet & Mobile: 4 Service Highlights in a Balanced 2-Column or Stacked Grid */}
          <div
            className={`mt-10 rounded-3xl border p-5 sm:p-7 ${
              isLight
                ? "border-[#E5DAC4]/80 bg-[#FAF7F0]/75 shadow-[0_10px_30px_rgba(12,34,54,0.04)]"
                : "border-white/10 bg-[#071A2C]/65 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {WHY_WEST_TRAVEL_FEATURES.map((feature, idx) =>
                renderFeatureItem(feature, idx, "responsive")
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
