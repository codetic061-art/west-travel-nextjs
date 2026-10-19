import React from "react";

interface BrandLogoProps {
  isLight?: boolean;
}

/**
 * Official WEST TRAVEL crest emblem and wordmark.
 * Recreates the circular compass ring + twin mountain peaks in warm gold and crisp white/navy.
 */
export function BrandLogo({ isLight = false }: BrandLogoProps) {
  return (
    <a
      href="#top"
      aria-label="WEST TRAVEL Home"
      className={`group inline-flex items-center gap-3.5 rounded-full pr-4 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] transition-all duration-300 ${
        isLight ? "west-glass-pill px-3.5 py-1.5" : ""
      }`}
    >
      <span className="relative flex h-11 w-11 items-center justify-center">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-11 w-11 transition-transform duration-500 group-hover:scale-105"
          aria-hidden="true"
        >
          {/* Outer compass ring */}
          <circle
            cx="32"
            cy="32"
            r="24"
            stroke={isLight ? "#071A2C" : "#F8FAFC"}
            strokeWidth="1.6"
            strokeOpacity="0.9"
          />
          {/* Inner subtle gold ring */}
          <circle
            cx="32"
            cy="32"
            r="20"
            stroke="#E5A93C"
            strokeWidth="1"
            strokeOpacity="0.7"
            strokeDasharray="3 3"
          />
          {/* North star pointer */}
          <path d="M32 3L34.2 9.5L32 7.8L29.8 9.5L32 3Z" fill="#E5A93C" />
          {/* Cardinal ticks */}
          <line
            x1="32"
            y1="56"
            x2="32"
            y2="60"
            stroke="#E5A93C"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="4"
            y1="32"
            x2="8"
            y2="32"
            stroke="#E5A93C"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="56"
            y1="32"
            x2="60"
            y2="32"
            stroke="#E5A93C"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Diagonal gold rays */}
          <path
            d="M17 17L24 24M47 17L40 24"
            stroke="#E5A93C"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
          {/* Twin mountain peaks */}
          <path
            d="M8 44L23.5 22L33.5 35.5L41 25.5L56 44"
            stroke={isLight ? "#071A2C" : "#FFFFFF"}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Snow cap highlights */}
          <path
            d="M18.2 29.5L23.5 22L28.5 28.8L25.5 31L23.5 28.2L20.8 31.2L18.2 29.5Z"
            fill={isLight ? "#0E7C8E" : "#FFFFFF"}
          />
          <path
            d="M37.2 30.8L41 25.5L45.2 31.2L42.5 32.8L41 30.4L39 32.4L37.2 30.8Z"
            fill="#E5A93C"
          />
          {/* Horizon arc */}
          <path
            d="M12 45.5C24 41.5 40 41.5 52 45.5"
            stroke="#E5A93C"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className={`text-sm sm:text-[15px] font-semibold uppercase tracking-[0.28em] transition-colors ${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        WEST TRAVEL
      </span>
    </a>
  );
}
