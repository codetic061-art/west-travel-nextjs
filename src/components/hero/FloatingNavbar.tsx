"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Sun, Moon, Menu, X, Compass, User } from "lucide-react";
import { useHero } from "./HeroProvider";
import { BrandLogo } from "./BrandLogo";
import { DESTINATIONS_CONFIG, type DestinationId } from "@/config/destinations";
import type { SupportedLocale } from "@/i18n/hero-dictionary";

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
  } = useHero();
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleScrollToBooking = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById("hero-booking-bar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
   * Tactile, pill-shaped mechanical Sun/Moon toggle switch.
   * - Displays a rounded glassmorphic track containing both Sun (left) and Moon (right) icons.
   * - Slides a physical circular thumb smoothly between Light Mode (left/Sun) and Dark Mode (right/Moon)
   *   over 340ms with cubic-bezier(0.22, 1, 0.36, 1) easing.
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
        {/* Background Track Icons (Both Sun and Moon remain part of the mechanical switch track) */}
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

        {/* Physical Sliding Circular Thumb / Knob */}
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
          {/* Synchronized Active Icon inside the Sliding Knob */}
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
    <header className="relative z-30 w-full px-4 sm:px-8 lg:px-12 pt-5 sm:pt-7">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        {/* Top-left Official WEST TRAVEL Logo */}
        <BrandLogo isLight={isLight} />

        {/* Upper-right Compact Floating Glassmorphic Notch Navbar (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className={`west-glass-pill hidden lg:flex items-center gap-1 xl:gap-2 rounded-full px-5 py-2 transition-all duration-300 ${
            isLight ? "text-slate-900" : "text-white/92"
          }`}
        >
          {/* Destinations Dropdown */}
          <div className="relative" ref={dropdownRef}>
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

          <a
            href="#hero-destination-cards"
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

          <a
            href="#featured-trips"
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

          <a
            href="#hero-copy"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("hero-copy")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLight
                ? "hover:bg-white/50 hover:text-slate-950"
                : "hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.nav.about}
          </a>

          <a
            href="#hero-booking-bar"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToBooking();
            }}
            className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
              isLight
                ? "hover:bg-white/50 hover:text-slate-950"
                : "hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.nav.contact}
          </a>

          {/* Thin Vertical Separator */}
          <span
            aria-hidden="true"
            className={`mx-1.5 h-4 w-[1px] ${isLight ? "bg-slate-900/20" : "bg-white/20"}`}
          />

          {/* Language Selector: EN / TR / ES */}
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

          {/* Thin Vertical Separator */}
          <span
            aria-hidden="true"
            className={`mx-1.5 h-4 w-[1px] ${isLight ? "bg-slate-900/20" : "bg-white/20"}`}
          />

          {/* Tactile Pill-Shaped Mechanical Sun/Moon Switch */}
          {renderMechanicalThemeSwitch(false)}

          {/* Optional Account Icon */}
          {hasAccountRoute && (
            <a
              href="/account"
              aria-label="Account"
              className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
            >
              <User className="h-4 w-4" />
            </a>
          )}
        </nav>

        {/* Mobile & Tablet Compact Controls */}
        <div className="flex items-center gap-2 lg:hidden">
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

          {/* Mobile Mechanical Theme Switch */}
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
              { label: t.nav.experiences, target: "hero-destination-cards" },
              { label: t.nav.ourJourneys, target: "featured-trips" },
              { label: t.nav.about, target: "hero-copy" },
              { label: t.nav.contact, target: "hero-booking-bar" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" });
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
