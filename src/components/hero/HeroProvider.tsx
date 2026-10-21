"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { HERO_DICTIONARY, type HeroTranslation, type SupportedLocale } from "@/i18n/hero-dictionary";
import type { DestinationId } from "@/config/destinations";

export type ThemeMode = "dark" | "light";
export type BookingDestinationFilter = DestinationId | "all" | "";

const THEME_STORAGE_KEY = "west-travel-theme";
const LOCALE_STORAGE_KEY = "west-travel-locale";

export interface BookingQueryState {
  destination: BookingDestinationFilter;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
}

export interface InquiryDrawerPrefill {
  destination?: DestinationId | "";
  journeySlug?: string;
  travelers?: number;
  preferredDate?: string;
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
  isInquiryDrawerOpen: boolean;
  inquiryDrawerPrefill: InquiryDrawerPrefill | null;
  openInquiryDrawer: (prefill?: InquiryDrawerPrefill, triggerEl?: HTMLElement | null) => void;
  closeInquiryDrawer: () => void;
}

const HeroContext = createContext<HeroContextValue | null>(null);

export function HeroProvider({
  children,
  initialLocale = "en",
  initialTheme = "light",
}: {
  children: React.ReactNode;
  initialLocale?: SupportedLocale;
  initialTheme?: ThemeMode;
}) {
  const existingContext = useContext(HeroContext);

  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale);
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

  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState(false);
  const [inquiryDrawerPrefill, setInquiryDrawerPrefill] =
    useState<InquiryDrawerPrefill | null>(null);
  const inquiryTriggerRef = useRef<HTMLElement | null>(null);

  // Read persisted theme and locale after hydration to prevent SSR/Client mismatch
  useEffect(() => {
    if (existingContext) return;
    try {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
      }
      const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (savedLocale === "en" || savedLocale === "tr" || savedLocale === "es") {
        setLocaleState(savedLocale);
      }
    } catch {
      // Ignore storage access errors in restricted environments
    }
    setHasHydrated(true);
  }, [existingContext]);

  // Synchronize HTML class, data-theme attribute, and localStorage persistence
  useEffect(() => {
    if (existingContext) return;
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
  }, [theme, hasHydrated, existingContext]);

  useEffect(() => {
    if (existingContext) return;
    document.documentElement.lang = locale;
    if (hasHydrated) {
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      } catch {
        // Ignore storage write errors
      }
    }
  }, [locale, hasHydrated, existingContext]);

  const setLocale = (nextLocale: SupportedLocale) => {
    setLocaleState(nextLocale);
  };

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

  const openInquiryDrawer = useCallback(
    (prefill?: InquiryDrawerPrefill, triggerEl?: HTMLElement | null) => {
      if (triggerEl) {
        inquiryTriggerRef.current = triggerEl;
      } else if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
        inquiryTriggerRef.current = document.activeElement;
      }
      const resolvedDest =
        prefill?.destination ??
        (booking.destination === "egypt" ||
        booking.destination === "dubai" ||
        booking.destination === "turkiye"
          ? booking.destination
          : activeDestination ?? "");
      setInquiryDrawerPrefill({
        destination: resolvedDest,
        journeySlug: prefill?.journeySlug ?? "",
        travelers: prefill?.travelers ?? booking.adults + booking.children,
        preferredDate: prefill?.preferredDate ?? booking.startDate ?? "",
      });
      setIsInquiryDrawerOpen(true);
    },
    [booking, activeDestination]
  );

  const closeInquiryDrawer = useCallback(() => {
    setIsInquiryDrawerOpen(false);
    const trigger = inquiryTriggerRef.current;
    if (trigger && typeof trigger.focus === "function") {
      window.setTimeout(() => {
        trigger.focus({ preventScroll: true });
      }, 60);
    }
  }, []);

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
      isInquiryDrawerOpen,
      inquiryDrawerPrefill,
      openInquiryDrawer,
      closeInquiryDrawer,
    }),
    [
      locale,
      theme,
      activeDestination,
      booking,
      lastSubmittedQuery,
      isInquiryDrawerOpen,
      inquiryDrawerPrefill,
      openInquiryDrawer,
      closeInquiryDrawer,
    ]
  );

  // If a parent HeroProvider is already active in the tree, pass through without shadowing
  if (existingContext) {
    return <>{children}</>;
  }

  return <HeroContext.Provider value={value}>{children}</HeroContext.Provider>;
}

export function useHero() {
  const ctx = useContext(HeroContext);
  if (!ctx) {
    throw new Error("useHero must be used within a HeroProvider");
  }
  return ctx;
}
