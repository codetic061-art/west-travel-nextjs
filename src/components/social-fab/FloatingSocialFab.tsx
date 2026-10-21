"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { useHeroContext } from "@/components/hero/HeroProvider";
import {
  SOCIAL_FAB_ACTIONS,
  type FooterSocialProfile,
} from "@/config/final-cta-footer";
import { usePrefersReducedMotion } from "@/components/motion/MotionPrimitives";

function SocialActionIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon: FooterSocialProfile["id"];
  className?: string;
}) {
  if (icon === "whatsapp") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M9.5 9.5c.3 1.8 2.2 3.7 4 4l1.3-1.1c.2-.2.5-.2.8-.1l1.7.8c.3.2.4.5.3.8-.3.9-1.1 1.6-2.1 1.6-3.4 0-6.5-3.1-6.5-6.5 0-1 .7-1.8 1.6-2.1.3-.1.6 0 .8.3l.8 1.7c.1.3.1.6-.1.8L9.5 9.5z" />
      </svg>
    );
  }
  if (icon === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (icon === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/**
 * Quarter-circle / curved upward arrangement offsets (px from primary orb center)
 * Inspired by the supplied reference screenshots:
 * - Curved upward arc on desktop & mobile that stays safely inside viewport edges.
 */
const ARC_OFFSETS: ReadonlyArray<{
  x: number;
  y: number;
  openDelayMs: number;
  closeDelayMs: number;
}> = [
  { x: -6, y: -72, openDelayMs: 40, closeDelayMs: 120 }, // WhatsApp
  { x: -62, y: -56, openDelayMs: 95, closeDelayMs: 80 }, // Instagram
  { x: -78, y: 2, openDelayMs: 150, closeDelayMs: 40 }, // Facebook
  { x: -12, y: -136, openDelayMs: 205, closeDelayMs: 0 }, // Email
];

export function FloatingSocialFab() {
  const { dictionary, isDark, isInquiryDrawerOpen } = useHeroContext();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const actionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const filterId = useId().replace(/:/g, "");

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
    if (!prefersReducedMotion) {
      setIsMorphing(true);
      window.setTimeout(() => setIsMorphing(false), 680);
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
              stdDeviation="8"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9"
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
          {/* Emerging liquid neck blob from primary orb */}
          <span
            className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all"
            style={{
              background: isOpen
                ? "linear-gradient(135deg, #169185 0%, #25D366 100%)"
                : "#25D366",
              transitionDuration: prefersReducedMotion ? "0ms" : "580ms",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: isOpen
                ? "translate(-50%, -50%) translate(-18px, -38px) scale(0.76, 1.18)"
                : "translate(-50%, -50%) translate(0px, 0px) scale(0.55)",
              opacity: isMorphing ? 0.88 : isOpen ? 0.22 : 0,
            }}
          />

          {/* Secondary liquid droplets tracking the action buttons during morph */}
          {SOCIAL_FAB_ACTIONS.map((action, index) => {
            const offset = ARC_OFFSETS[index] ?? ARC_OFFSETS[0];
            return (
              <span
                key={`blob-${action.id}`}
                className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  backgroundColor: action.accentColor ?? "#14887E",
                  transitionProperty: "transform, opacity",
                  transitionDuration: prefersReducedMotion
                    ? "0ms"
                    : isOpen
                      ? "640ms"
                      : "420ms",
                  transitionDelay: prefersReducedMotion
                    ? "0ms"
                    : `${isOpen ? offset.openDelayMs : offset.closeDelayMs}ms`,
                  transitionTimingFunction: isOpen
                    ? "cubic-bezier(0.34, 1.52, 0.64, 1)"
                    : "cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: isOpen
                    ? `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(0.92)`
                    : "translate(-50%, -50%) scale(0.35)",
                  opacity: isOpen ? 0.65 : 0,
                }}
              />
            );
          })}

          {/* Primary orb liquid base */}
          <span
            className="absolute inset-0 rounded-full transition-transform"
            style={{
              backgroundColor: isOpen
                ? isDark
                  ? "#1D2C3B"
                  : "#162A3E"
                : "#25D366",
              transitionDuration: prefersReducedMotion ? "0ms" : "540ms",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: isMorphing
                ? "scale(1.14, 0.9)"
                : "scale(1)",
            }}
          />
        </div>

        {/* Interactive Secondary Circular Social Actions */}
        <div
          id={`social-fab-menu-${filterId}`}
          role="group"
          aria-label={dictionary.socialFab.menuRegionLabel}
          className="absolute inset-0"
        >
          {SOCIAL_FAB_ACTIONS.map((action, index) => {
            const offset = ARC_OFFSETS[index] ?? ARC_OFFSETS[0];
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
                onClick={() => setIsOpen(false)}
                className={`group absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58B9B3] focus-visible:ring-offset-2 ${
                  isDark
                    ? "border-white/20 text-white shadow-[0_12px_28px_rgba(0,0,0,0.48)]"
                    : "border-white/80 text-white shadow-[0_12px_26px_rgba(15,35,56,0.26)]"
                } ${
                  isOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{
                  backgroundColor: action.accentColor ?? "#14887E",
                  transitionProperty:
                    "transform, opacity, box-shadow, filter",
                  transitionDuration: prefersReducedMotion
                    ? "0ms"
                    : isOpen
                      ? "680ms"
                      : "420ms",
                  transitionDelay: prefersReducedMotion
                    ? "0ms"
                    : `${isOpen ? offset.openDelayMs : offset.closeDelayMs}ms`,
                  transitionTimingFunction: isOpen
                    ? "cubic-bezier(0.34, 1.54, 0.64, 1)"
                    : "cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: isOpen
                    ? `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(1)`
                    : "translate(-50%, -50%) scale(0.25)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {/* Subtle inner top highlight for tactile depth */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
                />
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <SocialActionIcon icon={action.id} className="h-5 w-5" />
                </span>

                {/* Tooltip pill on hover/focus (desktop) */}
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

        {/* Primary Circular WhatsApp / Close Trigger Orb */}
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
          className={`group relative z-10 flex h-14 w-14 items-center justify-center rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58B9B3] focus-visible:ring-offset-2 ${
            isOpen
              ? isDark
                ? "border-white/20 bg-[#1B2B3C] text-[#F5EFE4] shadow-[0_16px_36px_rgba(0,0,0,0.55)]"
                : "border-white/40 bg-[#162B40] text-white shadow-[0_16px_34px_rgba(16,35,56,0.34)]"
              : "border-white/35 bg-[#25D366] text-white shadow-[0_14px_32px_rgba(37,211,102,0.42)] hover:shadow-[0_18px_38px_rgba(37,211,102,0.54)]"
          }`}
          style={{
            transitionDuration: prefersReducedMotion ? "0ms" : "520ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.52, 0.64, 1)",
            transform: isMorphing
              ? "scale(0.92)"
              : isOpen
                ? "scale(1.03)"
                : "scale(1)",
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

          {/* Smooth crossfade + rotation between WhatsApp icon and Close X */}
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
              <SocialActionIcon icon="whatsapp" className="h-6 w-6" />
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
