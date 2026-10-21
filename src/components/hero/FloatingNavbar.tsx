"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Sun, Moon, Menu, X, Compass, User } from "lucide-react";
import { useHero } from "./HeroProvider";
import { BrandLogo } from "./BrandLogo";
import { DESTINATIONS_CONFIG, type DestinationId } from "@/config/destinations";
import type { SupportedLocale } from "@/i18n/hero-dictionary";
import { useSectionEntrance } from "@/components/motion/MotionPrimitives";

const LOCALES: readonly SupportedLocale[] = ["en", "tr", "es"];

interface FloatingNavbarProps {
  /**
   * Account icon is rendered only when an existing account feature/route supports it.
   */
  hasAccountRoute?: boolean;
}

export function FloatingNavbar({ hasAccountRoute = false }: FloatingNavbarProps) {
  const {
    locale,
    setLocale,
    t,
    theme,
    toggleTheme,
    activeDestination,
    selectDestinationForBooking,
    openInquiryDrawer,
  } = useHero();
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { ref: headerRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLElement>({
    immediate: true,
  });

  const isLight = theme === "light";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDestDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectDestination = (id: DestinationId) => {
    selectDestinationForBooking(id);
    setDestDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById("hero-destination-cards");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleOpenContactDrawer = (triggerEl?: HTMLElement | null) => {
    setMobileMenuOpen(false);
    openInquiryDrawer(undefined, triggerEl);
  };

  const handleScrollToJourneys = () => {
    setMobileMenuOpen(false);
    const el =
      document.getElementById("featured-trips") ??
      document.getElementById("hero-booking-bar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /**
   * Slower, Deliberate Navbar Entrance Sequence (Section 2):
   * 1. Logo enters first (0ms, 860ms duration).
   * 2. Nav links appear one by one with 135ms stagger (150ms -> 690ms, 840ms duration).
   * 3. Language selector, theme toggle, and mobile controls appear last (840ms, 860ms duration).
   */
  const getNavRevealStyle = (delayMs: number, durationMs = 840): React.CSSProperties =>
    reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? "translate3d(0, 0, 0)" : "translate3d(0, -14px, 0)",
          transitionProperty: "opacity, transform",
          transitionDuration: `${durationMs}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${delayMs}ms`,
        };

  /**
   * Tactile, pill-shaped mechanical Sun/Moon toggle switch.
   */
  const renderMechanicalThemeSwitch = (compact = false) => {
    const switchTitle = isLight
      ? `${t.nav.lightMode} — ${t.nav.themeToggleLabel}`
      : `${t.nav.darkMode} — ${t.nav.themeToggleLabel}`;

    return (
      <button
        type="button"
        role="switch"
        aria-checked={!isLight}
        aria-label={t.nav.themeToggleLabel}
        title={switchTitle}
        data-theme-toggle={compact ? "mobile" : "desktop"}
        data-theme-state={theme}
        onClick={toggleTheme}
        className={`theme-switch-track group relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 ${
          compact ? "h-[30px] w-[58px]" : "h-[32px] w-[62px]"
        } ${
          isLight
            ? "bg-gradient-to-r from-amber-200/85 via-sky-100/80 to-slate-200/85 border border-white/85 shadow-[inset_0_1.5px_4px_rgba(15,23,42,0.16),0_0_16px_rgba(245,158,11,0.28)] focus-visible:ring-offset-white"
            : "bg-gradient-to-r from-[#04101C]/95 via-[#072034]/95 to-[#0B2D45]/95 border border-white/25 shadow-[inset_0_2px_5px_rgba(0,0,0,0.68),0_0_16px_rgba(45,212,191,0.22)] focus-visible:ring-offset-[#051320]"
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none relative z-0 flex w-full items-center justify-between px-[5px]"
        >
          <Sun
            className={`theme-switch-icon h-3.5 w-3.5 ${
              isLight
                ? "scale-95 rotate-0 text-amber-600 opacity-30"
                : "scale-90 -rotate-45 text-amber-300/65 opacity-70 group-hover:opacity-95"
            }`}
          />
          <Moon
            className={`theme-switch-icon h-3.5 w-3.5 ${
              !isLight
                ? "scale-95 rotate-0 text-teal-200 opacity-30"
                : "scale-90 rotate-45 text-slate-600/75 opacity-70 group-hover:opacity-95"
            }`}
          />
        </span>

        <span
          aria-hidden="true"
          className={`theme-switch-thumb pointer-events-none absolute left-[3px] top-[2px] z-10 flex items-center justify-center rounded-full ${
            compact ? "h-[24px] w-[24px]" : "h-[24px] w-[24px] top-[3px]"
          } ${
            isLight
              ? "translate-x-0 bg-gradient-to-br from-[#FFFDF7] via-[#FDE68A] to-[#F59E0B] text-amber-950 shadow-[0_2px_8px_rgba(245,158,11,0.55),inset_0_1px_1px_rgba(255,255,255,0.95)]"
              : compact
              ? "translate-x-[26px] bg-gradient-to-br from-[#2DD4BF] via-[#0E7C8E] to-[#083B4C] text-white shadow-[0_2px_10px_rgba(45,212,191,0.55),inset_0_1px_1px_rgba(255,255,255,0.55)]"
              : "translate-x-[30px] bg-gradient-to-br from-[#2DD4BF] via-[#0E7C8E] to-[#083B4C] text-white shadow-[0_2px_10px_rgba(45,212,191,0.55),inset_0_1px_1px_rgba(255,255,255,0.55)]"
          }`}
        >
          <Sun
            className={`theme-switch-icon absolute h-3.5 w-3.5 ${
              isLight
                ? "scale-100 rotate-0 opacity-100"
                : "scale-50 -rotate-90 opacity-0"
            }`}
          />
          <Moon
            className={`theme-switch-icon absolute h-3.5 w-3.5 ${
              !isLight
                ? "scale-100 rotate-0 opacity-100"
                : "scale-50 rotate-90 opacity-0"
            }`}
          />
        </span>
      </button>
    );
  };

  return (
    <header
      ref={headerRef}
      data-navbar-entered={hasEntered ? "true" : "false"}
      className="relative z-30 w-full px-4 sm:px-8 lg:px-12 pt-5 sm:pt-7"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        {/* 1. Top-left Official WEST GLOBAL TOURS Logo (Enters First: 0ms, 860ms) */}
        <div style={getNavRevealStyle(0, 860)} data-nav-seq="logo">
          <BrandLogo isLight={isLight} />
        </div>

        {/* 2. Upper-right Compact Floating Glassmorphic Notch Navbar (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className={`west-glass-pill hidden lg:flex items-center gap-1 xl:gap-2 rounded-full px-5 py-2 transition-all duration-300 ${
            isLight ? "text-slate-900" : "text-white/92"
          }`}
        >
          {/* Nav Item 1: Destinations Dropdown (150ms) */}
          <div
            className="relative"
            ref={dropdownRef}
            style={getNavRevealStyle(150, 840)}
            data-nav-seq="item-0"
          >
            <button
              type="button"
              onClick={() => setDestDropdownOpen((prev) => !prev)}
              aria-expanded={destDropdownOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                isLight
                  ? "hover:bg-white/50 hover:text-slate-950"
                  : "hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{t.nav.destinations}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 opacity-75 transition-transform duration-200 ${
                  destDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {destDropdownOpen && (
              <div
                role="menu"
                className={`west-glass-popover absolute left-0 mt-3 w-64 rounded-2xl p-2 transition-all ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                {DESTINATIONS_CONFIG.map((dest) => {
                  const copy = t.destinations[dest.id];
                  const isActive = activeDestination === dest.id;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      role="menuitem"
                      onClick={() => handleSelectDestination(dest.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-colors ${
                        isActive
                          ? "bg-[#0E7C8E]/25 text-[#0E7C8E] dark:text-[#2DD4BF] font-semibold"
                          : isLight
                          ? "hover:bg-white/60"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-sm">{copy.locationBadge}</p>
                        <p className={isLight ? "text-slate-600" : "text-white/65"}>
                          {copy.tagline}
                        </p>
                      </div>
                      <span className="font-mono text-[11px] opacity-65">{dest.orderNumber}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Nav Item 2: Experiences (285ms) */}
          <a
            href="#hero-destination-cards"
            style={getNavRevealStyle(285, 840)}
            data-nav-seq="item-1"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("hero-destination-cards");
              el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }}
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLight
                ? "hover:bg-white/50 hover:text-slate-950"
                : "hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.nav.experiences}
          </a>

          {/* Nav Item 3: Our Journeys (420ms) */}
          <a
            href="#featured-trips"
            style={getNavRevealStyle(420, 840)}
            data-nav-seq="item-2"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToJourneys();
            }}
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLight
                ? "hover:bg-white/50 hover:text-slate-950"
                : "hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.nav.ourJourneys}
          </a>

          {/* Nav Item 4: About (555ms) */}
          <a
            href="#why-west-travel"
            style={getNavRevealStyle(555, 840)}
            data-nav-seq="item-3"
            onClick={(e) => {
              e.preventDefault();
              (document.getElementById("why-west-travel") ?? document.getElementById("hero-copy"))?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLight
                ? "hover:bg-white/50 hover:text-slate-950"
                : "hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.nav.about}
          </a>

          {/* Nav Item 5: Contact (690ms) — Opens the Trip Inquiry Drawer */}
          <a
            href="#trip-inquiry-drawer"
            style={getNavRevealStyle(690, 840)}
            data-nav-seq="item-4"
            onClick={(e) => {
              e.preventDefault();
              handleOpenContactDrawer(e.currentTarget);
            }}
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLight
                ? "hover:bg-white/50 hover:text-slate-950"
                : "hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.nav.contact}
          </a>

          {/* 3. Language Selector & Theme Controls Enter Last (830ms) */}
          <div
            style={getNavRevealStyle(830, 860)}
            data-nav-seq="controls"
            className="flex items-center"
          >
            <span
              aria-hidden="true"
              className={`mx-1.5 h-4 w-[1px] ${isLight ? "bg-slate-900/20" : "bg-white/20"}`}
            />

            <div
              role="group"
              aria-label={t.nav.languageLabel}
              className="flex items-center gap-0.5 px-1"
            >
              {LOCALES.map((code) => {
                const active = locale === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLocale(code)}
                    aria-pressed={active}
                    className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                      active
                        ? isLight
                          ? "bg-[#0E7C8E] text-white shadow-sm"
                          : "bg-white/20 text-white shadow-sm"
                        : isLight
                        ? "text-slate-700 hover:text-slate-950"
                        : "text-white/60 hover:text-white/95"
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>

            <span
              aria-hidden="true"
              className={`mx-1.5 h-4 w-[1px] ${isLight ? "bg-slate-900/20" : "bg-white/20"}`}
            />

            {renderMechanicalThemeSwitch(false)}

            {hasAccountRoute && (
              <a
                href="/account"
                aria-label="Account"
                className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <User className="h-4 w-4" />
              </a>
            )}
          </div>
        </nav>

        {/* Mobile & Tablet Compact Controls (830ms) */}
        <div
          style={getNavRevealStyle(830, 860)}
          className="flex items-center gap-2 lg:hidden"
        >
          <div
            role="group"
            aria-label={t.nav.languageLabel}
            className={`west-glass-pill flex items-center rounded-full px-2 py-1 ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${
                  locale === code
                    ? "bg-[#0E7C8E] text-white"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {renderMechanicalThemeSwitch(true)}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.nav.closeMenuLabel : t.nav.openMenuLabel}
            className={`west-glass-pill flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Drawer */}
      {mobileMenuOpen && (
        <div
          className={`west-glass-popover mt-3 rounded-3xl p-5 lg:hidden transition-all ${
            isLight ? "text-slate-900" : "text-white"
          }`}
        >
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-65">
            {t.nav.destinations}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            {DESTINATIONS_CONFIG.map((dest) => {
              const copy = t.destinations[dest.id];
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => handleSelectDestination(dest.id)}
                  className={`flex items-center justify-between rounded-2xl p-3 text-left border transition-colors ${
                    isLight
                      ? "border-white/75 bg-white/50 hover:bg-white/70"
                      : "border-white/15 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm">{copy.locationBadge}</div>
                    <div className="text-xs opacity-75">{copy.tagline}</div>
                  </div>
                  <Compass className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-current/10 pt-3">
            {[
              { label: t.nav.experiences, target: "hero-destination-cards", isDrawer: false },
              { label: t.nav.ourJourneys, target: "featured-trips", isDrawer: false },
              { label: t.nav.about, target: "why-west-travel", isDrawer: false },
              { label: t.nav.contact, target: "trip-inquiry-drawer", isDrawer: true },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (item.isDrawer) {
                    handleOpenContactDrawer(e.currentTarget);
                  } else {
                    document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`rounded-full px-4 py-2 text-xs font-medium ${
                  isLight ? "bg-white/60 hover:bg-white/80" : "bg-white/10 hover:bg-white/15"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
