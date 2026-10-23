"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY_IDENTITY_CONFIG } from "@/config/final-cta-footer";

interface BrandLogoProps {
  isLight?: boolean;
  /**
   * When rendered on the floating Navbar over dark/cinematic Hero or Destination imagery,
   * `variant="navbar"` keeps the logo free of any opaque white background patch and keeps
   * the wordmark crisp and legible against varying imagery.
   * When rendered in the Footer (`SiteFooter`), `isLight` adapts the wordmark color to the light footer surface.
   */
  variant?: "navbar" | "footer";
}

/**
 * Official WEST GLOBAL TOURS crest emblem and wordmark.
 * Renders the supplied official Luxury Globe Travel Emblem asset with graceful fallback
 * and zero opaque white rectangle behind the logo in Light Mode.
 */
export function BrandLogo({ isLight = false, variant = "footer" }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);
  const [usePngFallback, setUsePngFallback] = useState(false);

  const isNavbar = variant === "navbar";

  return (
    <Link
      href="/"
      data-brand-logo-link="home"
      aria-label={`${COMPANY_IDENTITY_CONFIG.brandName} Home`}
      className="group inline-flex items-center gap-3 rounded-full py-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] transition-all duration-300"
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.28)] ring-1 ring-[#E5A93C]/65">
        {!imgError ? (
          <Image
            src={
              usePngFallback
                ? COMPANY_IDENTITY_CONFIG.logoPng
                : COMPANY_IDENTITY_CONFIG.logoWebp
            }
            alt={`${COMPANY_IDENTITY_CONFIG.brandName} Logo`}
            width={44}
            height={44}
            className="h-11 w-11 object-contain transition-transform duration-500 group-hover:scale-105"
            onError={() => {
              if (!usePngFallback) {
                setUsePngFallback(true);
              } else {
                setImgError(true);
              }
            }}
          />
        ) : (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-11 w-11 transition-transform duration-500 group-hover:scale-105"
            aria-hidden="true"
          >
            <circle
              cx="32"
              cy="32"
              r="24"
              stroke={!isNavbar && isLight ? "#071A2C" : "#F8FAFC"}
              strokeWidth="1.6"
              strokeOpacity="0.9"
            />
            <circle
              cx="32"
              cy="32"
              r="20"
              stroke="#E5A93C"
              strokeWidth="1"
              strokeOpacity="0.7"
              strokeDasharray="3 3"
            />
            <path
              d="M8 44L23.5 22L33.5 35.5L41 25.5L56 44"
              stroke={!isNavbar && isLight ? "#071A2C" : "#FFFFFF"}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 45.5C24 41.5 40 41.5 52 45.5"
              stroke="#E5A93C"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-xs sm:text-[13.5px] font-bold uppercase tracking-[0.22em] transition-colors ${
            isNavbar
              ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
              : isLight
              ? "text-slate-900"
              : "text-white"
          }`}
        >
          WEST GLOBAL
        </span>
        <span
          className={`mt-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.32em] ${
            isNavbar
              ? "text-[#F4C266] drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]"
              : isLight
              ? "text-[#0E7C8E]"
              : "text-[#F4C266]"
          }`}
        >
          TOURS
        </span>
      </span>
    </Link>
  );
}
