"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { HERO_DICTIONARY, type HeroTranslation, type SupportedLocale } from "@/i18n/hero-dictionary";
import type { DestinationId } from "@/config/destinations";

export type ThemeMode = "dark" | "light";
export type BookingDestinationFilter = DestinationId | "all" | "";

const THEME_STORAGE_KEY = "west-travel-theme";

export interface BookingQueryState {
  destination: BookingDestinationFilter;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
}

interface HeroContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: HeroTranslation;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  activeDestination: DestinationId | null;
  setActiveDestination: (id: DestinationId | null) => void;
  booking: BookingQueryState;
  setBooking: React.Dispatch<React.SetStateAction<BookingQueryState>>;
  selectDestinationForBooking: (id: DestinationId) => void;
  lastSubmittedQuery: (BookingQueryState & { submittedAt: string }) | null;
  submitBookingSearch: () => void;
  clearSubmittedQuery: () => void;
}

const HeroContext = createContext<HeroContextValue | null>(null);

export function HeroProvider({
  children,
  initialLocale = "en",
  initialTheme = "dark",
}: {
  children: React.ReactNode;
  initialLocale?: SupportedLocale;
  initialTheme?: ThemeMode;
}) {
  const [locale, setLocale] = useState<SupportedLocale>(initialLocale);
  const [theme, setThemeState] = useState<ThemeMode>(initialTheme);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [activeDestination, setActiveDestination] = useState<DestinationId | null>(null);
  const [booking, setBooking] = useState<BookingQueryState>({
    destination: "",
    startDate: "",
    endDate: "",
    adults: 2,
    children: 0,
  });
  const [lastSubmittedQuery, setLastSubmittedQuery] = useState<
    (BookingQueryState & { submittedAt: string }) | null
  >(null);

  // Read persisted theme after hydration to prevent SSR/Client mismatch
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
      }
    } catch {
      // Ignore storage access errors in restricted environments
    }
    setHasHydrated(true);
  }, []);

  // Synchronize HTML class, data-theme attribute, and localStorage persistence
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    root.setAttribute("data-theme", theme);

    if (hasHydrated) {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        // Ignore storage write errors
      }
    }
  }, [theme, hasHydrated]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setTheme = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const selectDestinationForBooking = (id: DestinationId) => {
    setActiveDestination(id);
    setBooking((prev) => ({ ...prev, destination: id }));
  };

  const submitBookingSearch = () => {
    setLastSubmittedQuery({
      ...booking,
      destination: booking.destination || activeDestination || "all",
      submittedAt: new Date().toISOString(),
    });
  };

  const clearSubmittedQuery = () => setLastSubmittedQuery(null);

  const value = useMemo<HeroContextValue>(
    () => ({
      locale,
      setLocale,
      t: HERO_DICTIONARY[locale],
      theme,
      toggleTheme,
      setTheme,
      activeDestination,
      setActiveDestination,
      booking,
      setBooking,
      selectDestinationForBooking,
      lastSubmittedQuery,
      submitBookingSearch,
      clearSubmittedQuery,
    }),
    [locale, theme, activeDestination, booking, lastSubmittedQuery]
  );

  return <HeroContext.Provider value={value}>{children}</HeroContext.Provider>;
}

export function useHero() {
  const ctx = useContext(HeroContext);
  if (!ctx) {
    throw new Error("useHero must be used within a HeroProvider");
  }
  return ctx;
}
