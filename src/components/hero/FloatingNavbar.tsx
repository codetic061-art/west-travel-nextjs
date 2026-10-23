"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Sun, Moon, Menu, X, Compass, User, ArrowRight } from "lucide-react";
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
  /**
   * Optional callback used by the Destination Discovery page so selecting a destination
   * from the navbar dropdown immediately synchronizes the page's active destination state.
   */
  onSelectDiscoveryDestination?: (id: DestinationId) => void;
}

export function FloatingNavbar({
  hasAccountRoute = false,
  onSelectDiscoveryDestination,
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
  const pathname = usePathname();
  const router = useRouter();
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { ref: headerRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLElement>({
    immediate: true,
  });

  const isLight = theme === "light";
  const isHomePage = pathname === "/";
  const isDiscoveryPage = pathname === "/destinations" || pathname === "/trips";
  const homeLabel = t.footer.links.home;

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

    if (onSelectDiscoveryDestination) {
      onSelectDiscoveryDestination(id);
      return;
    }

    if (isHomePage) {
      const el = document.getElementById("hero-destination-cards");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      return;
    }

    router.push(`/destinations?destination=${id}`);
  };

  const handleOpenContactDrawer = (triggerEl?: HTMLElement | null) => {
    setMobileMenuOpen(false);
    openInquiryDrawer(undefined, triggerEl);
  };

  /**
   * Slower, Deliberate Navbar Entrance Sequence:
   * 1. Logo enters first (0ms, 860ms duration).
   * 2. Nav links appear one by one with stagger.
   * 3. Language selector, theme toggle, and mobile controls appear last.
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
            ? "bg-gradient-to-r from-amber-200/75 via-sky-100/65 to-slate-200/75 border border-white/65 shadow-[inset_0_1.5px_4px_rgba(15,23,42,0.14),0_0_14px_rgba(245,158,11,0.22)] focus-visible:ring-offset-[#051320]"
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

  return (
    <header
      ref={headerRef}
      data-navbar-entered={hasEntered ? "true" : "false"}
      data-navbar-theme={theme}
      className="relative z-30 w-full px-4 sm:px-8 lg:px-12 pt-5 sm:pt-7"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        {/* 1. Top-left Official WEST GLOBAL TOURS Logo — Clickable to Homepage (/), No Opaque Background Patch */}
        <div style={getNavRevealStyle(0, 860)} data-nav-seq="logo">
          <BrandLogo isLight={isLight} variant="navbar" />
        </div>

        {/* 2. Upper-right Compact Floating Liquid-Glass Navbar (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="west-navbar-liquid-glass hidden lg:flex items-center gap-1 xl:gap-1.5 rounded-full px-4 xl:px-5 py-2 text-white/95 transition-all duration-300"
        >
          {/* Nav Item 0: Home Link (Restored across all pages in EN / TR / ES) */}
          <Link
            href="/"
            style={getNavRevealStyle(110, 840)}
            data-nav-seq="item-home"
            data-nav-link="home"
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isHomePage
                ? "bg-white/18 text-white font-semibold shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.35)]"
                : "text-white/90 hover:bg-white/14 hover:text-white"
            }`}
          >
            {homeLabel}
          </Link>

          {/* Nav Item 1: Destinations Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            style={getNavRevealStyle(210, 840)}
            data-nav-seq="item-0"
          >
            <button
              type="button"
              onClick={() => setDestDropdownOpen((prev) => !prev)}
              aria-expanded={destDropdownOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                isDiscoveryPage
                  ? "bg-[#0E7C8E]/45 text-[#5EEAD4] font-semibold border border-[#5EEAD4]/35"
                  : "text-white/90 hover:bg-white/14 hover:text-white"
              }`}
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
                className={`west-glass-popover absolute left-0 mt-3 w-72 rounded-2xl p-2 transition-all ${
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

                <div className="mt-1.5 pt-1.5 border-t border-current/10">
                  <Link
                    href="/destinations"
                    role="menuitem"
                    onClick={() => setDestDropdownOpen(false)}
                    data-nav-link="explore-all-destinations"
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                      isLight
                        ? "bg-[#0E7C8E]/12 text-[#0E7C8E] hover:bg-[#0E7C8E]/20"
                        : "bg-[#2DD4BF]/15 text-[#5EEAD4] hover:bg-[#2DD4BF]/25"
                    }`}
                  >
                    <span>{t.nav.allDestinations}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Nav Item 2: Experiences */}
          {isHomePage ? (
            <a
              href="#hero-destination-cards"
              style={getNavRevealStyle(320, 840)}
              data-nav-seq="item-1"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("hero-destination-cards");
                el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
              }}
              className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-white/90 hover:bg-white/14 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
            >
              {t.nav.experiences}
            </a>
          ) : (
            <Link
              href="/destinations"
              style={getNavRevealStyle(320, 840)}
              data-nav-seq="item-1"
              className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-white/90 hover:bg-white/14 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
            >
              {t.nav.experiences}
            </Link>
          )}

          {/* Nav Item 3: Our Journeys */}
          <Link
            href="/destinations#destination-journeys"
            style={getNavRevealStyle(430, 840)}
            data-nav-seq="item-2"
            data-nav-link="our-journeys"
            className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-white/90 hover:bg-white/14 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
          >
            {t.nav.ourJourneys}
          </Link>

          {/* Nav Item 4: About */}
          <Link
            href="/about"
            style={getNavRevealStyle(540, 840)}
            data-nav-seq="item-3"
            data-nav-link="about-us"
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              pathname === "/about"
                ? "bg-[#0E7C8E]/45 text-[#5EEAD4] font-semibold border border-[#5EEAD4]/35"
                : "text-white/90 hover:bg-white/14 hover:text-white"
            }`}
          >
            {t.nav.about}
          </Link>

          {/* Nav Item 5: Contact */}
          <a
            href="#trip-inquiry-drawer"
            style={getNavRevealStyle(650, 840)}
            data-nav-seq="item-4"
            onClick={(e) => {
              e.preventDefault();
              handleOpenContactDrawer(e.currentTarget);
            }}
            className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-white/90 hover:bg-white/14 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
          >
            {t.nav.contact}
          </a>

          {/* 3. Language Selector & Theme Controls Enter Last */}
          <div
            style={getNavRevealStyle(780, 860)}
            data-nav-seq="controls"
            className="flex items-center"
          >
            <span
              aria-hidden="true"
              className="mx-1.5 h-4 w-[1px] bg-white/25"
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
                        ? "bg-[#0E7C8E] text-white shadow-sm"
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
              className="mx-1.5 h-4 w-[1px] bg-white/25"
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

        {/* Mobile & Tablet Compact Liquid-Glass Controls */}
        <div
          style={getNavRevealStyle(780, 860)}
          className="flex items-center gap-2 lg:hidden"
        >
          <div
            role="group"
            aria-label={t.nav.languageLabel}
            className="west-navbar-liquid-glass flex items-center rounded-full px-2 py-1 text-white"
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
            aria-label={mobileMenuOpen ? t.nav.closeMenuLabel : t.nav.openMenuLabel}
            className="west-navbar-liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors"
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
            <Link
              href="/"
              data-mobile-nav-link="home"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                isHomePage
                  ? "bg-[#0E7C8E] text-white"
                  : isLight
                  ? "bg-white/60 hover:bg-white/80"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {homeLabel}
            </Link>

            <Link
              href="/destinations"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isLight ? "bg-white/60 hover:bg-white/80" : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {t.nav.allDestinations}
            </Link>

            <Link
              href="/destinations#destination-journeys"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isLight ? "bg-white/60 hover:bg-white/80" : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {t.nav.ourJourneys}
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isLight ? "bg-white/60 hover:bg-white/80" : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {t.nav.about}
            </Link>

            <button
              type="button"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleOpenContactDrawer(e.currentTarget);
              }}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isLight ? "bg-white/60 hover:bg-white/80" : "bg-white/10 hover:bg-white/15"
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
