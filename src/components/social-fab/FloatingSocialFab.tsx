"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Mail, X } from "lucide-react";
import { useHero } from "@/components/hero/HeroProvider";
import {
  SOCIAL_FAB_ACTIONS,
  type FooterSocialProfile,
} from "@/config/final-cta-footer";
import { usePrefersReducedMotion } from "@/components/motion/MotionPrimitives";
import {
  FacebookBrandIcon,
  InstagramBrandIcon,
  WhatsAppBrandIcon,
} from "@/components/icons/BrandIcons";

function SocialActionIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon: FooterSocialProfile["id"];
  className?: string;
}) {
  if (icon === "whatsapp") {
    return <WhatsAppBrandIcon className={className} />;
  }
  if (icon === "instagram") {
    return <InstagramBrandIcon className={className} />;
  }
  if (icon === "facebook") {
    return <FacebookBrandIcon className={className} />;
  }
  return <Mail className={className} strokeWidth={1.85} aria-hidden="true" />;
}

interface FabTrajectoryOffset {
  desktopX: number;
  desktopY: number;
  mobileX: number;
  mobileY: number;
  /** Stagger between secondary icons: 115ms apart (within 90–140ms target range) */
  openDelayMs: number;
  closeDelayMs: number;
}

/**
 * Distinct Desktop Radial Arc & Mobile Compact Vertical Stack:
 * - Desktop (`>= 640px`): Radial upward-left quarter-circle arc around the main button.
 * - Mobile (`< 640px`): Compact vertical arrangement rising straight above the main button.
 * - Timing Phasing:
 *   1. Main button immediate response & liquid morph: 420ms (within 300–500ms target).
 *   2. Secondary icon emergence phase: 640ms (within 500–750ms target), staggered 115ms apart (90ms, 205ms, 320ms, 435ms).
 *   3. Spring overshoot & rebound settling phase: 520ms (within 400–600ms target), total 1160ms keyframe per icon.
 */
const FAB_TRAJECTORIES: ReadonlyArray<FabTrajectoryOffset> = [
  {
    // 1. WhatsApp
    desktopX: -6,
    desktopY: -76,
    mobileX: 0,
    mobileY: -68,
    openDelayMs: 90,
    closeDelayMs: 240,
  },
  {
    // 2. Instagram
    desktopX: -64,
    desktopY: -58,
    mobileX: 0,
    mobileY: -126,
    openDelayMs: 205,
    closeDelayMs: 160,
  },
  {
    // 3. Facebook
    desktopX: -80,
    desktopY: 2,
    mobileX: 0,
    mobileY: -184,
    openDelayMs: 320,
    closeDelayMs: 80,
  },
  {
    // 4. Email
    desktopX: -12,
    desktopY: -142,
    mobileX: 0,
    mobileY: -242,
    openDelayMs: 435,
    closeDelayMs: 0,
  },
];

export function FloatingSocialFab() {
  const { t: dictionary, theme, isInquiryDrawerOpen } = useHero();
  const isDark = theme === "dark";
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const actionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const filterId = useId().replace(/:/g, "");

  // Track responsive breakpoint for Desktop Radial Arc vs Mobile Compact Vertical Stack
  useEffect(() => {
    const updateViewport = () => {
      setIsMobileViewport(window.innerWidth < 640);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // Close social menu automatically if the Trip Inquiry Drawer opens
  useEffect(() => {
    if (isInquiryDrawerOpen && isOpen) {
      setIsOpen(false);
    }
  }, [isInquiryDrawerOpen, isOpen]);

  // Handle outside click and Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (
        containerRef.current &&
        target &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, {
      passive: true,
    });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setHasInteracted(true);
    if (!prefersReducedMotion) {
      setIsMorphing(true);
      window.setTimeout(() => setIsMorphing(false), 960);
    }
    setIsOpen((prev) => !prev);
  };

  const getActionLabel = (id: FooterSocialProfile["id"]) => {
    if (id === "whatsapp") return dictionary.socialFab.whatsappLabel;
    if (id === "instagram") return dictionary.socialFab.instagramLabel;
    if (id === "facebook") return dictionary.socialFab.facebookLabel;
    return dictionary.socialFab.emailLabel;
  };

  // Hide or disable interaction when inquiry drawer is open so it never blocks form submit button
  const hiddenByDrawer = isInquiryDrawerOpen;

  return (
    <div
      ref={containerRef}
      data-social-fab-root=""
      data-fab-state={isOpen ? "open" : "closed"}
      data-fab-layout={isMobileViewport ? "mobile-vertical" : "desktop-radial"}
      className={`fixed z-40 transition-all duration-500 ${
        hiddenByDrawer
          ? "pointer-events-none translate-y-6 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        right: "max(1.25rem, env(safe-area-inset-right, 1.25rem))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 1.25rem))",
      }}
      aria-label={dictionary.socialFab.menuRegionLabel}
    >
      {/* Scoped Multi-Phase Liquid Emergence + Spring Overshoot/Rebound Keyframes */}
      <style>{`
        @keyframes fabSecondaryEmergeAndSettle {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translate3d(0px, 0px, 0) scale(0.24);
          }
          18% {
            opacity: 0.92;
          }
          /* End of 640ms Emergence Phase (55% of 1160ms): reaches target with controlled spring overshoot */
          55% {
            opacity: 1;
            transform: translate(-50%, -50%) translate3d(calc(var(--fab-tx) * 1.11), calc(var(--fab-ty) * 1.11), 0) scale(1.08);
          }
          /* Spring Rebound Phase (+270ms) */
          78% {
            opacity: 1;
            transform: translate(-50%, -50%) translate3d(calc(var(--fab-tx) * 0.95), calc(var(--fab-ty) * 0.95), 0) scale(0.97);
          }
          /* Secondary Micro-Settle */
          91% {
            opacity: 1;
            transform: translate(-50%, -50%) translate3d(calc(var(--fab-tx) * 1.02), calc(var(--fab-ty) * 1.02), 0) scale(1.01);
          }
          /* Final Settled Position (1160ms total = 640ms emergence + 520ms spring settle) */
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) translate3d(var(--fab-tx), var(--fab-ty), 0) scale(1);
          }
        }

        @keyframes fabSecondaryCollapse {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translate3d(var(--fab-tx), var(--fab-ty), 0) scale(1);
          }
          32% {
            opacity: 0.85;
            transform: translate(-50%, -50%) translate3d(calc(var(--fab-tx) * 1.04), calc(var(--fab-ty) * 1.04), 0) scale(1.03);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translate3d(0px, 0px, 0) scale(0.22);
          }
        }

        @keyframes fabMainButtonMorphOpen {
          0% {
            transform: scale(1);
          }
          28% {
            transform: scale(0.88, 0.92);
          }
          64% {
            transform: scale(1.09, 0.94);
          }
          84% {
            transform: scale(0.98, 1.03);
          }
          100% {
            transform: scale(1.02);
          }
        }
      `}</style>

      {/* Lightweight SVG Gooey / Liquid Morph Filter */}
      <svg
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id={`liquid-goo-${filterId}`}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="8.5"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="relative flex h-14 w-14 items-center justify-center">
        {/* Gooey Liquid Bridge Layer (active during morph expansion/collapse) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            filter:
              !prefersReducedMotion && (isMorphing || isOpen)
                ? `url(#liquid-goo-${filterId})`
                : undefined,
          }}
        >
          {/* Phase 1 & 2: Emerging liquid neck blob from primary orb (420ms morph response) */}
          <span
            className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all"
            style={{
              background: isOpen
                ? "linear-gradient(135deg, #169185 0%, #25D366 100%)"
                : "#25D366",
              transitionDuration: prefersReducedMotion ? "0ms" : "440ms",
              transitionTimingFunction: "cubic-bezier(0.34, 1.48, 0.64, 1)",
              transform: isOpen
                ? isMobileViewport
                  ? "translate(-50%, -50%) translate(0px, -42px) scale(0.72, 1.32)"
                  : "translate(-50%, -50%) translate(-20px, -40px) scale(0.78, 1.24)"
                : "translate(-50%, -50%) translate(0px, 0px) scale(0.5)",
              opacity: isMorphing ? 0.9 : isOpen ? 0.24 : 0,
            }}
          />

          {/* Secondary liquid droplets tracking the action buttons during emergence */}
          {SOCIAL_FAB_ACTIONS.map((action, index) => {
            const offset = FAB_TRAJECTORIES[index] ?? FAB_TRAJECTORIES[0];
            const tx = isMobileViewport ? offset.mobileX : offset.desktopX;
            const ty = isMobileViewport ? offset.mobileY : offset.desktopY;

            return (
              <span
                key={`blob-${action.id}`}
                className="absolute left-1/2 top-1/2 h-11 w-11 rounded-full"
                style={
                  {
                    "--fab-tx": `${tx}px`,
                    "--fab-ty": `${ty}px`,
                    backgroundColor: action.accentColor ?? "#14887E",
                    opacity: prefersReducedMotion ? (isOpen ? 0.65 : 0) : 0,
                    transform: prefersReducedMotion
                      ? isOpen
                        ? `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0) scale(0.92)`
                        : "translate(-50%, -50%) scale(0.25)"
                      : undefined,
                    animation:
                      prefersReducedMotion || !hasInteracted
                        ? "none"
                        : isOpen
                        ? `fabSecondaryEmergeAndSettle 1160ms cubic-bezier(0.22, 1, 0.36, 1) ${offset.openDelayMs}ms forwards`
                        : `fabSecondaryCollapse 560ms cubic-bezier(0.22, 1, 0.36, 1) ${offset.closeDelayMs}ms forwards`,
                  } as React.CSSProperties
                }
              />
            );
          })}

          {/* Primary orb liquid base (420ms morph duration) */}
          <span
            className="absolute inset-0 rounded-full transition-all"
            style={{
              backgroundColor: isOpen
                ? isDark
                  ? "#1D2C3B"
                  : "#162A3E"
                : "#25D366",
              transitionDuration: prefersReducedMotion ? "0ms" : "420ms",
              transitionTimingFunction: "cubic-bezier(0.34, 1.48, 0.64, 1)",
              transform: isMorphing ? "scale(1.12, 0.90)" : "scale(1)",
            }}
          />
        </div>

        {/* Interactive Secondary Circular Social Actions (640ms emergence + 520ms spring settle, 115ms stagger) */}
        <div
          id={`social-fab-menu-${filterId}`}
          role="group"
          aria-label={dictionary.socialFab.menuRegionLabel}
          className="absolute inset-0"
        >
          {SOCIAL_FAB_ACTIONS.map((action, index) => {
            const offset = FAB_TRAJECTORIES[index] ?? FAB_TRAJECTORIES[0];
            const tx = isMobileViewport ? offset.mobileX : offset.desktopX;
            const ty = isMobileViewport ? offset.mobileY : offset.desktopY;
            const label = getActionLabel(action.id);
            const isExternal = action.external;

            return (
              <a
                key={action.id}
                ref={(el) => {
                  actionRefs.current[index] = el;
                }}
                href={action.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                tabIndex={isOpen ? 0 : -1}
                aria-hidden={!isOpen}
                data-social-fab-action={action.id}
                data-stagger-delay-ms={offset.openDelayMs}
                onClick={() => setIsOpen(false)}
                className={`group absolute left-1/2 top-1/2 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58B9B3] focus-visible:ring-offset-2 ${
                  isDark
                    ? "border-white/20 text-white shadow-[0_12px_28px_rgba(0,0,0,0.48)]"
                    : "border-white/80 text-white shadow-[0_12px_26px_rgba(15,35,56,0.26)]"
                } ${
                  isOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={
                  {
                    "--fab-tx": `${tx}px`,
                    "--fab-ty": `${ty}px`,
                    backgroundColor: action.accentColor ?? "#14887E",
                    opacity: prefersReducedMotion ? (isOpen ? 1 : 0) : 0,
                    transform: prefersReducedMotion
                      ? isOpen
                        ? `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0) scale(1)`
                        : "translate(-50%, -50%) scale(0.25)"
                      : undefined,
                    animation:
                      prefersReducedMotion || !hasInteracted
                        ? "none"
                        : isOpen
                        ? `fabSecondaryEmergeAndSettle 1160ms cubic-bezier(0.22, 1, 0.36, 1) ${offset.openDelayMs}ms forwards`
                        : `fabSecondaryCollapse 560ms cubic-bezier(0.22, 1, 0.36, 1) ${offset.closeDelayMs}ms forwards`,
                  } as React.CSSProperties
                }
              >
                {/* Subtle inner top highlight for tactile depth */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
                />
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <SocialActionIcon icon={action.id} className="h-5 w-5" />
                </span>

                {/* Tooltip pill on hover/focus */}
                <span
                  className={`pointer-events-none absolute right-full mr-2.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 -translate-x-1 ${
                    isDark
                      ? "bg-[#132232]/95 text-[#F6F1E6] border border-white/10"
                      : "bg-[#152A3F]/95 text-white"
                  }`}
                >
                  {action.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Primary Circular WhatsApp / Close Trigger Orb (420ms morph response) */}
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={`social-fab-menu-${filterId}`}
          aria-label={
            isOpen
              ? dictionary.socialFab.closeMenuLabel
              : dictionary.socialFab.openMenuLabel
          }
          title={
            isOpen
              ? dictionary.socialFab.closeMenuLabel
              : dictionary.socialFab.openMenuLabel
          }
          data-social-fab-trigger=""
          className={`group relative z-10 flex h-14 w-14 items-center justify-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58B9B3] focus-visible:ring-offset-2 ${
            isOpen
              ? isDark
                ? "border-white/20 bg-[#1B2B3C] text-[#F5EFE4] shadow-[0_16px_36px_rgba(0,0,0,0.55)]"
                : "border-white/40 bg-[#162B40] text-white shadow-[0_16px_34px_rgba(16,35,56,0.34)]"
              : "border-white/35 bg-[#25D366] text-white shadow-[0_14px_32px_rgba(37,211,102,0.42)] hover:shadow-[0_18px_38px_rgba(37,211,102,0.54)]"
          }`}
          style={{
            transitionDuration: prefersReducedMotion ? "0ms" : "420ms",
            animation:
              !prefersReducedMotion && isOpen && hasInteracted
                ? "fabMainButtonMorphOpen 440ms cubic-bezier(0.34, 1.48, 0.64, 1) forwards"
                : undefined,
          }}
        >
          {/* Ambient subtle ring glow when closed */}
          {!isOpen && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 rounded-full border border-[#25D366]/35 opacity-75 transition-transform duration-500 group-hover:scale-110"
            />
          )}

          {/* Tactile top specular highlight */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-white/5 to-transparent"
          />

          {/* Smooth 420ms crossfade + rotation between canonical WhatsApp brand icon and Lucide X icon */}
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span
              className="absolute inset-0 flex items-center justify-center transition-all"
              style={{
                transitionDuration: prefersReducedMotion ? "0ms" : "420ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                opacity: isOpen ? 0 : 1,
                transform: isOpen
                  ? "rotate(-90deg) scale(0.5)"
                  : "rotate(0deg) scale(1)",
              }}
            >
              <WhatsAppBrandIcon className="h-6 w-6" />
            </span>

            <span
              className="absolute inset-0 flex items-center justify-center transition-all"
              style={{
                transitionDuration: prefersReducedMotion ? "0ms" : "420ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                opacity: isOpen ? 1 : 0,
                transform: isOpen
                  ? "rotate(0deg) scale(1)"
                  : "rotate(90deg) scale(0.5)",
              }}
            >
              <X className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
