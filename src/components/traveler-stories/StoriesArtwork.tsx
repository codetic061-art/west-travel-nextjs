import React, { useId } from "react";
import styles from "./TravelerStoriesSection.module.css";

/**
 * Physical braided clothesline SVG with a realistic catenary sag, twisted hemp fiber texture,
 * upper highlight strand, and soft drop shadow beneath the rope.
 */
export function ClotheslineRope({ isFlexing = false }: { isFlexing?: boolean }) {
  return (
    <div
      className={styles.ropeContainer}
      data-rope-flex={isFlexing ? "true" : "false"}
      aria-hidden="true"
    >
      <svg
        className={styles.ropeSvg}
        viewBox="0 0 1600 84"
        preserveAspectRatio="none"
        fill="none"
        focusable="false"
      >
        {/* Soft cast shadow underneath the suspended clothesline */}
        <path
          d="M -24 23 Q 800 77 1624 23"
          className={styles.ropeShadowPath}
        />
        {/* Primary braided hemp/sisal rope body */}
        <path
          d="M -24 16 Q 800 70 1624 16"
          className={styles.ropeBasePath}
        />
        {/* Upper sunlit fiber highlight along top edge of rope */}
        <path
          d="M -24 14.8 Q 800 68.8 1624 14.8"
          className={styles.ropeHighlightPath}
        />
        {/* Diagonal twisted-strand texture along the rope */}
        <path
          d="M -24 16 Q 800 70 1624 16"
          className={styles.ropeTwistPath}
        />
        {/* Secondary fine counter-shading fiber detail */}
        <path
          d="M -24 17.1 Q 800 71.1 1624 17.1"
          className={styles.ropeUnderPath}
        />
      </svg>
    </div>
  );
}

/**
 * Realistic natural wood clothespin SVG that visibly pinches the clothesline
 * and overlaps the top center edge of each Polaroid card.
 */
export function WoodenClothespin() {
  const uid = useId().replace(/:/g, "");
  const bodyGradId = `clip-wood-${uid}`;
  const bevelGradId = `clip-bevel-${uid}`;
  const metalGradId = `clip-metal-${uid}`;

  return (
    <span className={styles.clothespin} aria-hidden="true" data-clothespin="">
      <svg
        className={styles.clothespinSvg}
        viewBox="0 0 28 58"
        fill="none"
        focusable="false"
      >
        <defs>
          <linearGradient id={bodyGradId} x1="4" y1="4" x2="22" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--clip-wood-top, #e3bf93)" />
            <stop offset="45%" stopColor="var(--clip-wood-mid, #cc9d69)" />
            <stop offset="100%" stopColor="var(--clip-wood-bottom, #ae7d49)" />
          </linearGradient>
          <linearGradient id={bevelGradId} x1="6" y1="4" x2="11" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255, 248, 236, 0.65)" />
            <stop offset="100%" stopColor="rgba(255, 248, 236, 0.08)" />
          </linearGradient>
          <linearGradient id={metalGradId} x1="5" y1="24" x2="23" y2="31" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8d7357" />
            <stop offset="50%" stopColor="#d7c4aa" />
            <stop offset="100%" stopColor="#6e563d" />
          </linearGradient>
        </defs>

        {/* Soft ambient shadow cast onto Polaroid frame and rope */}
        <rect
          x="8.5"
          y="6"
          width="14"
          height="48"
          rx="2.6"
          fill="var(--clip-shadow, rgba(16, 30, 46, 0.24))"
          transform="rotate(2 15.5 30)"
        />

        {/* Main wooden peg body */}
        <path
          d="M7.5 5.5C7.5 4.1 8.6 3 10 3H18C19.4 3 20.5 4.1 20.5 5.5V22.5L19.8 25.5L20.5 28.5V50.5C20.5 51.9 19.4 53 18 53H10C8.6 53 7.5 51.9 7.5 50.5V28.5L8.2 25.5L7.5 22.5V5.5Z"
          fill={`url(#${bodyGradId})`}
          stroke="var(--clip-border, rgba(118, 79, 41, 0.48))"
          strokeWidth="0.9"
        />

        {/* Left sunlit wood bevel highlight */}
        <path
          d="M8.4 5.5C8.4 4.7 9 4 9.8 4H11.5V52H9.8C9 52 8.4 51.3 8.4 50.5V5.5Z"
          fill={`url(#${bevelGradId})`}
        />

        {/* Subtle vertical wood grain lines */}
        <path
          d="M13.2 5V22M13.2 30V51M16.8 6V21M16.8 31V50"
          stroke="rgba(110, 71, 34, 0.22)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />

        {/* Chamfered horizontal groove above and below the spring */}
        <line
          x1="7.8"
          y1="22.2"
          x2="20.2"
          y2="22.2"
          stroke="rgba(96, 61, 28, 0.35)"
          strokeWidth="0.85"
        />
        <line
          x1="7.8"
          y1="29.8"
          x2="20.2"
          y2="29.8"
          stroke="rgba(255, 245, 228, 0.38)"
          strokeWidth="0.85"
        />

        {/* Center split seam at lower clamping tip */}
        <line
          x1="14"
          y1="31"
          x2="14"
          y2="52.5"
          stroke="rgba(88, 54, 22, 0.42)"
          strokeWidth="0.95"
        />

        {/* Metallic coil spring band */}
        <rect
          x="6.6"
          y="24.2"
          width="14.8"
          height="3.8"
          rx="1.2"
          fill={`url(#${metalGradId})`}
          stroke="rgba(68, 49, 31, 0.55)"
          strokeWidth="0.65"
        />
        {/* Spring tension wire arm */}
        <path
          d="M14 24.2V34.5"
          stroke="rgba(90, 68, 46, 0.65)"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/**
 * Upper decorative travel micrographics matching the reference composition:
 * - Left: Curved dotted flight route with a line-art travel camera and pin dot.
 * - Right: Curved dotted flight route leading to a banking airplane silhouette.
 * Positioned outside the central heading column so it never overlaps copy.
 */
export function UpperTravelMicrographics() {
  return (
    <div className={styles.upperMicroWrap} aria-hidden="true">
      <svg
        className={styles.upperMicroSvg}
        viewBox="0 0 1600 220"
        fill="none"
        focusable="false"
      >
        {/* Left curved dotted flight route from outer left edge toward first clip */}
        <path
          d="M -18 134 C 72 28, 198 22, 286 92 C 336 132, 388 164, 462 182"
          className={styles.dottedRoute}
        />

        {/* Small path anchor dot below the camera on the left route */}
        <circle
          cx="286"
          cy="92"
          r="3.2"
          className={styles.routePinDot}
        />

        {/* Travel camera line-art icon perched above the left dotted route */}
        <g
          transform="translate(286 66) rotate(-9)"
          className={styles.cameraIcon}
        >
          {/* Camera body */}
          <rect
            x="-15"
            y="-9"
            width="30"
            height="21"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.85"
            fill="var(--micro-badge-fill, rgba(252, 249, 242, 0.85))"
          />
          {/* Top viewfinder prism hump */}
          <path
            d="M -6 -9 L -3.5 -13.5 H 5.5 L 8 -9"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="var(--micro-badge-fill, rgba(252, 249, 242, 0.85))"
          />
          {/* Shutter button */}
          <line
            x1="-10.5"
            y1="-11.5"
            x2="-7"
            y2="-11.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Camera lens outer and inner rings */}
          <circle
            cx="1"
            cy="1.5"
            r="6.2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <circle
            cx="1"
            cy="1.5"
            r="2.4"
            fill="currentColor"
            opacity="0.75"
          />
          {/* Small flash dot */}
          <circle cx="10.2" cy="-4.2" r="1.25" fill="currentColor" />
        </g>

        {/* Right curved dotted flight route rising from clothesline toward upper right */}
        <path
          d="M 1138 184 C 1228 158, 1326 94, 1456 58"
          className={styles.dottedRoute}
        />

        {/* Small origin dot at start of right route */}
        <circle
          cx="1138"
          cy="184"
          r="2.8"
          className={styles.routePinDot}
        />

        {/* Banking airplane silhouette at the upper-right tip of the route */}
        <g
          transform="translate(1476 52) rotate(-19) scale(1.25)"
          className={styles.airplaneIcon}
        >
          <path
            d="M15 0C15-1.5 13.7-2.3 12.2-2.3H4.8L-3.8-13.8H-7.4L-2.9-2.3H-10L-13-6.2H-15.5L-13.9 0L-15.5 6.2H-13L-10 2.3H-2.9L-7.4 13.8H-3.8L4.8 2.3H12.2C13.7 2.3 15 1.5 15 0Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Egyptian-inspired lower-left corner illustration featuring the Giza Pyramids,
 * twin foreground date palms, distant oasis palms, and desert horizon ripples.
 */
export function LowerLeftGizaArtwork() {
  return (
    <div className={styles.gizaCornerWrap} aria-hidden="true">
      <svg
        className={styles.gizaCornerSvg}
        viewBox="0 0 430 195"
        fill="none"
        focusable="false"
      >
        {/* Left Tall Date Palm Tree */}
        <g className={styles.palmSilhouette}>
          {/* Curved trunk */}
          <path
            d="M 28 168 Q 42 118 58 62 L 62 63 Q 47 119 34 168 Z"
            fill="currentColor"
          />
          {/* Palm fronds */}
          <path
            d="M60 62C42 46 18 48 4 62C22 56 42 58 60 62Z
               M60 62C44 36 22 28 6 36C25 36 44 46 60 62Z
               M60 62C56 34 44 18 28 16C42 26 52 42 60 62Z
               M60 62C68 34 84 20 102 22C84 30 70 44 60 62Z
               M60 62C78 42 102 38 118 48C98 46 78 52 60 62Z
               M60 62C78 56 98 64 110 78C92 68 76 64 60 62Z
               M60 62C44 62 26 72 16 88C30 76 46 66 60 62Z"
            fill="currentColor"
          />
        </g>

        {/* Second Lower Left Date Palm Tree */}
        <g className={styles.palmSilhouetteSecondary} transform="translate(-14, 34) scale(0.76)">
          <path
            d="M 28 168 Q 38 124 48 76 L 52 77 Q 43 125 34 168 Z"
            fill="currentColor"
          />
          <path
            d="M50 76C34 62 12 64 0 76C16 70 34 72 50 76Z
               M50 76C36 52 16 44 2 52C18 52 36 62 50 76Z
               M50 76C58 50 74 38 90 40C74 48 60 60 50 76Z
               M50 76C66 58 88 56 102 64C84 62 66 68 50 76Z
               M50 76C36 76 20 86 10 100C24 88 38 80 50 76Z"
            fill="currentColor"
          />
        </g>

        {/* Left Secondary Giza Pyramid */}
        <g className={styles.pyramidGroup}>
          {/* Sunlit left facet */}
          <polygon
            points="32,166 96,94 116,166"
            className={styles.pyramidLit}
          />
          {/* Shaded right facet */}
          <polygon
            points="96,94 162,166 116,166"
            className={styles.pyramidShade}
          />
          {/* Fine architectural stone courses */}
          <path
            d="M32 166L96 94L162 166M96 94L116 166M76 116H102M60 134H107M46 150H112"
            className={styles.pyramidStroke}
          />
        </g>

        {/* Center-Right Great Pyramid of Giza */}
        <g className={styles.pyramidGroup}>
          {/* Sunlit left facet */}
          <polygon
            points="102,168 184,74 210,168"
            className={styles.pyramidLit}
          />
          {/* Shaded right facet */}
          <polygon
            points="184,74 274,168 210,168"
            className={styles.pyramidShade}
          />
          {/* Architectural stone-tier lines */}
          <path
            d="M102 168L184 74L274 168M184 74L210 168M162 99H191M142 122H197M124 143H204"
            className={styles.pyramidStroke}
          />
        </g>

        {/* Smaller Foreground Queen's Pyramid */}
        <g className={styles.pyramidGroup}>
          <polygon
            points="198,170 242,122 256,170"
            className={styles.pyramidLit}
          />
          <polygon
            points="242,122 290,170 256,170"
            className={styles.pyramidShade}
          />
          <path
            d="M198 170L242 122L290 170M242 122L256 170M224 142H248M212 155H252"
            className={styles.pyramidStroke}
          />
        </g>

        {/* Distant Small Oasis Palms on Right Side of Pyramids */}
        <g className={styles.palmSilhouetteSecondary} transform="translate(292, 92) scale(0.42)">
          <path d="M 32 180 Q 38 128 44 74 L 48 75 Q 43 128 38 180 Z" fill="currentColor" />
          <path
            d="M46 74C28 58 6 60 -8 74C10 68 28 70 46 74Z
               M46 74C32 48 12 40 -4 48C14 48 32 58 46 74Z
               M46 74C56 48 74 36 92 38C74 46 58 58 46 74Z
               M46 74C64 56 88 54 104 64C84 62 64 66 46 74Z
               M46 74C64 70 84 78 96 92C78 82 62 76 46 74Z"
            fill="currentColor"
          />
        </g>
        <g className={styles.palmSilhouetteSecondary} transform="translate(316, 114) scale(0.31)">
          <path d="M 32 180 Q 38 128 44 74 L 48 75 Q 43 128 38 180 Z" fill="currentColor" />
          <path
            d="M46 74C28 58 6 60 -8 74C10 68 28 70 46 74Z
               M46 74C56 48 74 36 92 38C74 46 58 58 46 74Z
               M46 74C64 56 88 54 104 64C84 62 64 66 46 74Z"
            fill="currentColor"
          />
        </g>

        {/* Flowing Desert Horizon Dunes & Foreground Sand Lines */}
        <path
          d="M 0 166 Q 92 158 196 167 T 386 172 L 415 178 L 0 178 Z"
          className={styles.duneFill}
        />
        <path
          d="M 0 166 Q 94 157 198 167 T 392 173 M 18 175 Q 134 168 264 176 T 420 182 M 54 184 Q 175 179 332 185"
          className={styles.duneStroke}
        />
      </svg>
    </div>
  );
}

/**
 * Subtle editorial postmark and compass stamp in the lower-right whitespace
 * to balance the composition on wide viewports without competing with the Polaroids.
 */
export function LowerRightPostmark() {
  return (
    <div className={styles.postmarkWrap} aria-hidden="true">
      <svg
        className={styles.postmarkSvg}
        viewBox="0 0 190 88"
        fill="none"
        focusable="false"
      >
        <g className={styles.postmarkStroke}>
          {/* Outer and inner circular postmark rings */}
          <circle cx="136" cy="44" r="28" strokeWidth="1.2" strokeDasharray="3 2.5" />
          <circle cx="136" cy="44" r="21" strokeWidth="1" />
          {/* 4-point compass star inside stamp */}
          <path
            d="M136 29L139 41L151 44L139 47L136 59L133 47L121 44L133 41Z"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Wavy postal cancellation lines */}
          <path
            d="M 14 34 Q 30 28 46 34 T 78 34 T 104 34"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M 8 44 Q 24 38 40 44 T 72 44 T 100 44"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M 18 54 Q 34 48 50 54 T 82 54 T 104 54"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
