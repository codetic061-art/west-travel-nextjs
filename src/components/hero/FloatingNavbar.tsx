"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  User,
  ArrowRight,
  Layers,
} from "lucide-react";
import { useHero } from "./HeroProvider";
import { BrandLogo } from "./BrandLogo";
import { DESTINATIONS_CONFIG, type DestinationId } from "@/config/destinations";
import type { SupportedLocale } from "@/i18n/hero-dictionary";
import { usePrefersReducedMotion } from "@/components/motion/MotionPrimitives";

const LOCALES: readonly SupportedLocale[] = ["en", "tr", "es"];

export interface FloatingNavbarProps {
  /**
   * Account icon is rendered only when an existing account feature/route supports it.
   */
  hasAccountRoute?: boolean;
  /**
   * Optional callback used by the Destination Discovery page so selecting a destination
   * from the navbar dropdown immediately synchronizes the page's active destination state.
   */
  onSelectDiscoveryDestination?: (id: DestinationId) => void;
  /**
   * Optional callback used by the Destination Discovery / Trips page so clicking
   * "All Three Destinations" or "Our Journeys" immediately expands the trip filter to `"all"`.
   */
  onSelectAllTrips?: () => void;
}

export function FloatingNavbar({
  hasAccountRoute = false,
  onSelectDiscoveryDestination,
  onSelectAllTrips,
}: FloatingNavbarProps) {
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
  const pathname = usePathname() || "/";
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();

  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLight = theme === "light";
  const isHomePage = pathname === "/";
  const isDiscoveryPage = pathname === "/destinations" || pathname === "/trips";
  const isTripDetailPage = pathname.startsWith("/trips/");
  const isAboutPage = pathname === "/about";

  /**
   * Routes with a full-bleed dark hero/video backdrop at the top (`scrollY <= 520`):
   * - `/` (Homepage Hero)
   * - `/destinations` and `/trips` (Cinematic Destination Selector Stage)
   * Plain-background pages (`/trips/[slug]`, `/about`, etc.) have a light background right from the top in Light Mode.
   */
  const hasDarkHeroBackdropAtTop = isHomePage || isDiscoveryPage;
  const isLightSurface =
    isLight && (!hasDarkHeroBackdropAtTop || isScrolledPastHero);

  const homeLabel = t.footer.links.home;

  // Single passive scroll listener to keep the fixed floating navbar legible over all sections
  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setIsScrolledPastHero(y > 520);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  // Close dropdown & mobile menu on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDestDropdownOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDestDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menus automatically when route pathname changes
  useEffect(() => {
    setDestDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMenus = () => {
    setDestDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSelectDestination = (id: DestinationId) => {
    selectDestinationForBooking(id);
    closeMenus();

    if (onSelectDiscoveryDestination) {
      onSelectDiscoveryDestination(id);
      return;
    }

    if (isHomePage) {
      const el = document.getElementById("hero-destination-cards");
      if (el) {
        el.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "nearest",
        });
      }
      return;
    }

    router.push(`/destinations?destination=${id}`);
  };

  const handleExploreAllTrips = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenus();
    if (onSelectAllTrips) {
      e.preventDefault();
      onSelectAllTrips();
    }
  };

  const handleOpenContactDrawer = (triggerEl?: HTMLElement | null) => {
    closeMenus();
    openInquiryDrawer(undefined, triggerEl);
  };

  /**
   * Navbar items are always interactive and visible (`opacity: 1`) so route transitions
   * never leave `Home`, `About`, or `Our Journeys` hidden behind delayed entrance observers.
   */
  const getNavRevealStyle = (
    delayMs: number,
    durationMs = 420
  ): React.CSSProperties =>
    reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
          transitionProperty: "opacity, transform, background-color, color",
          transitionDuration: `${durationMs}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${ Math.min(delayMs, 120) }ms`,
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
            ? "bg-gradient-to-r from-amber-200/85 via-sky-100/75 to-slate-200/85 border border-slate-900/15 shadow-[inset_0_1.5px_4px_rgba(15,23,42,0.14),0_0_14px_rgba(245,158,11,0.22)] focus-visible:ring-offset-white"
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
                : "scale-90 rotate-45 text-slate-700/75 opacity-70 group-hover:opacity-95"
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

  // Adaptive link styling for Dark/Hero glass vs Light-Surface glass
  const getDesktopLinkClass = (isActive: boolean) => {
    if (isLightSurface) {
      return isActive
        ? "bg-[#0E7C8E] text-white font-semibold shadow-sm"
        : "text-[#081C2E] hover:bg-[#081C2E]/8 hover:text-[#0E7C8E]";
    }
    return isActive
      ? "bg-[#0E7C8E]/45 text-[#5EEAD4] font-semibold border border-[#5EEAD4]/35"
      : "text-white/90 hover:bg-white/14 hover:text-white";
  };

  return (
    <header
      data-navbar-entered="true"
      data-navbar-theme={theme}
      data-navbar-scrolled={isScrolled ? "true" : "false"}
      data-navbar-light-surface={isLightSurface ? "true" : "false"}
      data-navbar-position="fixed"
      className={`pointer-events-none fixed top-0 inset-x-0 z-50 w-full px-3 sm:px-6 lg:px-10 xl:px-12 transition-all duration-300 ${
        isScrolled ? "py-2.5 sm:py-3" : "pt-3.5 sm:pt-5 pb-2"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1640px] items-center justify-between gap-3 sm:gap-4">
        {/* 1. Top-left Official WEST GLOBAL TOURS Logo — Clickable to Homepage (/) */}
        <div
          style={getNavRevealStyle(0, 420)}
          data-nav-seq="logo"
          data-scrolled={isScrolled ? "true" : "false"}
          data-light-surface={isLightSurface ? "true" : "false"}
          className={`west-navbar-logo-pill pointer-events-auto rounded-full ${
            isScrolled || isLightSurface ? "px-3.5 py-1.5" : "px-1 py-0.5"
          }`}
        >
          <BrandLogo
            isLight={isLight}
            variant="navbar"
            useDarkText={isLightSurface}
            onNavigateHome={closeMenus}
          />
        </div>

        {/* 2. Upper-right Compact Floating Liquid-Glass Navbar (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          data-scrolled={isScrolled ? "true" : "false"}
          data-light-surface={isLightSurface ? "true" : "false"}
          className={`west-navbar-liquid-glass pointer-events-auto hidden lg:flex items-center gap-1 xl:gap-1.5 rounded-full px-4 xl:px-5 py-2 transition-all duration-300 ${
            isLightSurface ? "text-[#081C2E]" : "text-white/95"
          }`}
        >
          {/* Nav Item 0: Home Link */}
          <Link
            href="/"
            onClick={closeMenus}
            style={getNavRevealStyle(40, 420)}
            data-nav-seq="item-home"
            data-nav-link="home"
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isHomePage
                ? isLightSurface
                  ? "bg-[#0E7C8E] text-white font-semibold shadow-sm"
                  : "bg-white/18 text-white font-semibold shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.35)]"
                : getDesktopLinkClass(false)
            }`}
          >
            {homeLabel}
          </Link>

          {/* Nav Item 1: Destinations Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            style={getNavRevealStyle(60, 420)}
            data-nav-seq="item-0"
          >
            <button
              type="button"
              onClick={() => setDestDropdownOpen((prev) => !prev)}
              aria-expanded={destDropdownOpen}
              aria-haspopup="true"
              data-nav-link="destinations-dropdown"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${getDesktopLinkClass(
                isDiscoveryPage
              )}`}
            >
              <span>{t.nav.destinations}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 opacity-80 transition-transform duration-200 ${
                  destDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {destDropdownOpen && (
              <div
                role="menu"
                className={`west-glass-popover absolute left-0 mt-3 w-72 rounded-2xl p-2 z-50 transition-all ${
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
                      data-nav-destination-option={dest.id}
                      onClick={() => handleSelectDestination(dest.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-colors ${
                        isActive
                          ? "bg-[#0E7C8E]/25 text-[#0E7C8E] dark:text-[#2DD4BF] font-semibold"
                          : isLight
                          ? "hover:bg-slate-900/5"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-sm">
                          {copy.locationBadge}
                        </p>
                        <p
                          className={
                            isLight ? "text-slate-600" : "text-white/65"
                          }
                        >
                          {copy.tagline}
                        </p>
                      </div>
                      <span className="font-mono text-[11px] opacity-65">
                        {dest.orderNumber}
                      </span>
                    </button>
                  );
                })}

                <div className="mt-1.5 pt-1.5 border-t border-current/10">
                  <Link
                    href="/destinations?destination=all#destination-journeys"
                    role="menuitem"
                    onClick={handleExploreAllTrips}
                    data-nav-link="explore-all-destinations"
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                      isLight
                        ? "bg-[#0E7C8E]/12 text-[#0E7C8E] hover:bg-[#0E7C8E]/20"
                        : "bg-[#2DD4BF]/15 text-[#5EEAD4] hover:bg-[#2DD4BF]/25"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      <span>{t.nav.allDestinations}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Nav Item 2: Experiences (Connected to Why WEST TRAVEL / Experiences section) */}
          {isHomePage ? (
            <a
              href="#why-west-travel"
              style={getNavRevealStyle(80, 420)}
              data-nav-seq="item-1"
              data-nav-link="experiences"
              onClick={(e) => {
                e.preventDefault();
                closeMenus();
                const el = document.getElementById("why-west-travel");
                el?.scrollIntoView({
                  behavior: reducedMotion ? "auto" : "smooth",
                  block: "start",
                });
              }}
              className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${getDesktopLinkClass(
                false
              )}`}
            >
              {t.nav.experiences}
            </a>
          ) : (
            <Link
              href="/#why-west-travel"
              onClick={closeMenus}
              style={getNavRevealStyle(80, 420)}
              data-nav-seq="item-1"
              data-nav-link="experiences"
              className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${getDesktopLinkClass(
                false
              )}`}
            >
              {t.nav.experiences}
            </Link>
          )}

          {/* Nav Item 3: Our Journeys / All Trips */}
          <Link
            href="/destinations?destination=all#destination-journeys"
            onClick={handleExploreAllTrips}
            style={getNavRevealStyle(100, 420)}
            data-nav-seq="item-2"
            data-nav-link="our-journeys"
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${getDesktopLinkClass(
              pathname === "/trips" || isTripDetailPage
            )}`}
          >
            {t.nav.ourJourneys}
          </Link>

          {/* Nav Item 4: About */}
          <Link
            href="/about"
            onClick={closeMenus}
            style={getNavRevealStyle(110, 420)}
            data-nav-seq="item-3"
            data-nav-link="about-us"
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${getDesktopLinkClass(
              isAboutPage
            )}`}
          >
            {t.nav.about}
          </Link>

          {/* Nav Item 5: Contact */}
          <a
            href="#trip-inquiry-drawer"
            style={getNavRevealStyle(120, 420)}
            data-nav-seq="item-4"
            data-nav-link="contact"
            onClick={(e) => {
              e.preventDefault();
              handleOpenContactDrawer(e.currentTarget);
            }}
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${getDesktopLinkClass(
              false
            )}`}
          >
            {t.nav.contact}
          </a>

          {/* 3. Language Selector & Theme Controls */}
          <div
            style={getNavRevealStyle(120, 420)}
            data-nav-seq="controls"
            className="flex items-center"
          >
            <span
              aria-hidden="true"
              className={`mx-1.5 h-4 w-[1px] ${
                isLightSurface ? "bg-[#081C2E]/18" : "bg-white/25"
              }`}
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
                    data-locale-switch={code}
                    className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                      active
                        ? "bg-[#0E7C8E] text-white shadow-sm"
                        : isLightSurface
                        ? "text-[#081C2E]/75 hover:text-[#081C2E] hover:bg-[#081C2E]/8"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>

            <span
              aria-hidden="true"
              className={`mx-1.5 h-4 w-[1px] ${
                isLightSurface ? "bg-[#081C2E]/18" : "bg-white/25"
              }`}
            />

            {renderMechanicalThemeSwitch(false)}

            {hasAccountRoute && (
              <a
                href="/account"
                aria-label="Account"
                className={`ml-1 flex h-8 w-8 items-center justify-center rounded-full border ${
                  isLightSurface
                    ? "border-[#081C2E]/20 text-[#081C2E] hover:bg-[#081C2E]/8"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <User className="h-4 w-4" />
              </a>
            )}
          </div>
        </nav>

        {/* Mobile & Tablet Compact Liquid-Glass Controls */}
        <div
          style={getNavRevealStyle(100, 420)}
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 lg:hidden"
        >
          <div
            role="group"
            aria-label={t.nav.languageLabel}
            data-scrolled={isScrolled ? "true" : "false"}
            data-light-surface={isLightSurface ? "true" : "false"}
            className={`west-navbar-liquid-glass flex items-center rounded-full px-1.5 sm:px-2 py-1 ${
              isLightSurface ? "text-[#081C2E]" : "text-white"
            }`}
          >
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={`rounded-full px-1.5 sm:px-2 py-0.5 text-[10.5px] sm:text-[11px] font-semibold uppercase ${
                  locale === code
                    ? "bg-[#0E7C8E] text-white"
                    : isLightSurface
                    ? "text-[#081C2E]/75 hover:text-[#081C2E]"
                    : "text-white/75 hover:text-white"
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
            aria-label={
              mobileMenuOpen ? t.nav.closeMenuLabel : t.nav.openMenuLabel
            }
            data-scrolled={isScrolled ? "true" : "false"}
            data-light-surface={isLightSurface ? "true" : "false"}
            className={`west-navbar-liquid-glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLightSurface ? "text-[#081C2E]" : "text-white"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Glass Drawer — Constrained height so it never overflows small mobile screens */}
      {mobileMenuOpen && (
        <div
          className={`west-glass-popover pointer-events-auto mx-auto mt-2.5 max-h-[calc(100vh-5rem)] w-full max-w-[680px] overflow-y-auto rounded-3xl p-4 sm:p-5 lg:hidden transition-all ${
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
                      ? "border-slate-200/80 bg-white/80 hover:bg-white"
                      : "border-white/15 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="truncate font-semibold text-sm">
                      {copy.locationBadge}
                    </div>
                    <div className="truncate text-xs opacity-75">
                      {copy.tagline}
                    </div>
                  </div>
                  <Compass className="h-4 w-4 shrink-0 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-current/10 pt-3">
            <Link
              href="/"
              data-mobile-nav-link="home"
              onClick={closeMenus}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                isHomePage
                  ? "bg-[#0E7C8E] text-white"
                  : isLight
                  ? "bg-slate-900/5 hover:bg-slate-900/10"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {homeLabel}
            </Link>

            <Link
              href="/destinations?destination=all#destination-journeys"
              data-mobile-nav-link="all-destinations"
              onClick={handleExploreAllTrips}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isLight
                  ? "bg-slate-900/5 hover:bg-slate-900/10"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {t.nav.allDestinations}
            </Link>

            <Link
              href="/destinations?destination=all#destination-journeys"
              data-mobile-nav-link="our-journeys"
              onClick={handleExploreAllTrips}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isLight
                  ? "bg-slate-900/5 hover:bg-slate-900/10"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {t.nav.ourJourneys}
            </Link>

            <Link
              href="/#why-west-travel"
              data-mobile-nav-link="experiences"
              onClick={closeMenus}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isLight
                  ? "bg-slate-900/5 hover:bg-slate-900/10"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {t.nav.experiences}
            </Link>

            <Link
              href="/about"
              data-mobile-nav-link="about"
              onClick={closeMenus}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isAboutPage
                  ? "bg-[#0E7C8E] text-white"
                  : isLight
                  ? "bg-slate-900/5 hover:bg-slate-900/10"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {t.nav.about}
            </Link>

            <button
              type="button"
              data-mobile-nav-link="contact"
              onClick={(e) => {
                handleOpenContactDrawer(e.currentTarget);
              }}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isLight
                  ? "bg-slate-900/5 hover:bg-slate-900/10"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
