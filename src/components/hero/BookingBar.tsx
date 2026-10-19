"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ArrowRight,
  ChevronDown,
  Plus,
  Minus,
  CheckCircle2,
  X,
} from "lucide-react";
import { DESTINATIONS_CONFIG, type DestinationId } from "@/config/destinations";
import { useHero, type BookingDestinationFilter } from "./HeroProvider";

export function BookingBar() {
  const {
    t,
    theme,
    booking,
    setBooking,
    setActiveDestination,
    lastSubmittedQuery,
    submitBookingSearch,
    clearSubmittedQuery,
  } = useHero();

  const [openPopover, setOpenPopover] = useState<"destination" | "dates" | "travelers" | null>(
    null
  );
  const barRef = useRef<HTMLDivElement>(null);
  const isLight = theme === "light";

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenPopover(null);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const totalGuests = booking.adults + booking.children;

  const getDestinationDisplay = () => {
    if (!booking.destination) return t.booking.destinationPlaceholder;
    if (booking.destination === "all") return t.booking.allThreeOption;
    const copy = t.destinations[booking.destination];
    return `${copy.locationBadge} — ${copy.tagline}`;
  };

  const getDatesDisplay = () => {
    if (booking.startDate && booking.endDate) {
      return `${booking.startDate} → ${booking.endDate}`;
    }
    if (booking.startDate) {
      return booking.startDate;
    }
    return t.booking.datesPlaceholder;
  };

  const handleSelectDestination = (val: BookingDestinationFilter) => {
    setBooking((prev) => ({ ...prev, destination: val }));
    if (val === "egypt" || val === "dubai" || val === "turkiye") {
      setActiveDestination(val);
    } else {
      setActiveDestination(null);
    }
    setOpenPopover(null);
  };

  const adjustGuests = (field: "adults" | "children", delta: number) => {
    setBooking((prev) => {
      const min = field === "adults" ? 1 : 0;
      const max = 12;
      const next = Math.min(max, Math.max(min, prev[field] + delta));
      return { ...prev, [field]: next };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenPopover(null);
    submitBookingSearch();
  };

  return (
    <div id="hero-booking-bar" ref={barRef} className="relative z-20 w-full">
      <form
        onSubmit={handleFormSubmit}
        aria-label="Trip Search and Booking Controls"
        className={`west-glass-panel mx-auto w-full rounded-[22px] p-3 sm:p-4 transition-all duration-300 ${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.25fr_1.2fr_1fr_auto] items-center gap-2 lg:gap-0 lg:divide-x ${
            isLight ? "lg:divide-slate-900/15" : "lg:divide-white/15"
          }`}
        >
          {/* 1. Destination Selector */}
          <div className="relative px-3 py-1.5">
            <button
              type="button"
              onClick={() =>
                setOpenPopover((prev) => (prev === "destination" ? null : "destination"))
              }
              aria-expanded={openPopover === "destination"}
              aria-haspopup="listbox"
              className="flex w-full items-center justify-between gap-3 rounded-xl p-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <MapPin
                  className={`h-5 w-5 shrink-0 ${
                    isLight ? "text-[#0E7C8E]" : "text-[#2DD4BF]"
                  }`}
                />
                <div className="min-w-0">
                  <span
                    className={`block text-[11px] font-medium ${
                      isLight ? "text-slate-600" : "text-white/65"
                    }`}
                  >
                    {t.booking.destinationLabel}
                  </span>
                  <span className="block truncate text-sm font-medium mt-0.5">
                    {getDestinationDisplay()}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${
                  openPopover === "destination" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openPopover === "destination" && (
              <div
                role="listbox"
                aria-label={t.booking.destinationLabel}
                className={`west-glass-popover absolute left-0 bottom-full mb-3 w-full sm:w-80 rounded-2xl p-2 z-30 ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={booking.destination === "all"}
                  onClick={() => handleSelectDestination("all")}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
                    booking.destination === "all"
                      ? "bg-[#0E7C8E]/25 text-[#0E7C8E] dark:text-[#2DD4BF]"
                      : isLight
                      ? "hover:bg-white/65"
                      : "hover:bg-white/10"
                  }`}
                >
                  <span>{t.booking.allThreeOption}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-70">
                    3 Countries
                  </span>
                </button>

                {DESTINATIONS_CONFIG.map((dest) => {
                  const copy = t.destinations[dest.id];
                  const selected = booking.destination === dest.id;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => handleSelectDestination(dest.id as DestinationId)}
                      className={`mt-1 flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-colors ${
                        selected
                          ? "bg-[#0E7C8E]/25 text-[#0E7C8E] dark:text-[#2DD4BF]"
                          : isLight
                          ? "hover:bg-white/65"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">{copy.locationBadge}</div>
                        <div className="opacity-75">{copy.tagline}</div>
                      </div>
                      <span className="font-mono text-[11px] opacity-60">{dest.orderNumber}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Travel Dates Selector */}
          <div className="relative px-3 lg:px-5 py-1.5">
            <button
              type="button"
              onClick={() => setOpenPopover((prev) => (prev === "dates" ? null : "dates"))}
              aria-expanded={openPopover === "dates"}
              className="flex w-full items-center justify-between gap-3 rounded-xl p-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <Calendar
                  className={`h-5 w-5 shrink-0 ${
                    isLight ? "text-[#0E7C8E]" : "text-[#2DD4BF]"
                  }`}
                />
                <div className="min-w-0">
                  <span
                    className={`block text-[11px] font-medium ${
                      isLight ? "text-slate-600" : "text-white/65"
                    }`}
                  >
                    {t.booking.datesLabel}
                  </span>
                  <span className="block truncate text-sm font-medium mt-0.5">
                    {getDatesDisplay()}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${
                  openPopover === "dates" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openPopover === "dates" && (
              <div
                className={`west-glass-popover absolute left-0 bottom-full mb-3 w-full sm:w-80 rounded-2xl p-4 z-30 ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-xs">
                    <span className="opacity-75">{t.booking.departureLabel}</span>
                    <input
                      type="date"
                      value={booking.startDate}
                      onChange={(e) =>
                        setBooking((prev) => ({ ...prev, startDate: e.target.value }))
                      }
                      className={`mt-1 w-full rounded-lg border px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] ${
                        isLight
                          ? "border-slate-300 bg-white/80 text-slate-900"
                          : "border-white/20 bg-white/10 text-white"
                      }`}
                    />
                  </label>
                  <label className="block text-xs">
                    <span className="opacity-75">{t.booking.returnLabel}</span>
                    <input
                      type="date"
                      value={booking.endDate}
                      min={booking.startDate || undefined}
                      onChange={(e) =>
                        setBooking((prev) => ({ ...prev, endDate: e.target.value }))
                      }
                      className={`mt-1 w-full rounded-lg border px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] ${
                        isLight
                          ? "border-slate-300 bg-white/80 text-slate-900"
                          : "border-white/20 bg-white/10 text-white"
                      }`}
                    />
                  </label>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-current/10">
                  <button
                    type="button"
                    onClick={() => setBooking((prev) => ({ ...prev, startDate: "", endDate: "" }))}
                    className="text-xs opacity-75 hover:opacity-100"
                  >
                    {t.booking.clearDates}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenPopover(null)}
                    className="rounded-lg bg-[#0E7C8E] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#149BB0]"
                  >
                    {t.booking.applyDates}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Travelers Selector */}
          <div className="relative px-3 lg:px-5 py-1.5">
            <button
              type="button"
              onClick={() =>
                setOpenPopover((prev) => (prev === "travelers" ? null : "travelers"))
              }
              aria-expanded={openPopover === "travelers"}
              className="flex w-full items-center justify-between gap-3 rounded-xl p-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <Users
                  className={`h-5 w-5 shrink-0 ${
                    isLight ? "text-[#0E7C8E]" : "text-[#2DD4BF]"
                  }`}
                />
                <div className="min-w-0">
                  <span
                    className={`block text-[11px] font-medium ${
                      isLight ? "text-slate-600" : "text-white/65"
                    }`}
                  >
                    {t.booking.travelersLabel}
                  </span>
                  <span className="block truncate text-sm font-medium mt-0.5">
                    {totalGuests}{" "}
                    {totalGuests === 1 ? t.booking.guestSingular : t.booking.guestPlural}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${
                  openPopover === "travelers" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openPopover === "travelers" && (
              <div
                className={`west-glass-popover absolute right-0 bottom-full mb-3 w-full sm:w-72 rounded-2xl p-4 z-30 ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                {/* Adults Row */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-xs font-semibold">{t.booking.adultsLabel}</div>
                    <div className="text-[11px] opacity-65">{t.booking.adultsDesc}</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => adjustGuests("adults", -1)}
                      disabled={booking.adults <= 1}
                      aria-label="Decrease adults"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-current/25 disabled:opacity-35"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-semibold">{booking.adults}</span>
                    <button
                      type="button"
                      onClick={() => adjustGuests("adults", 1)}
                      aria-label="Increase adults"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-current/25"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children Row */}
                <div className="flex items-center justify-between py-2 border-t border-current/10">
                  <div>
                    <div className="text-xs font-semibold">{t.booking.childrenLabel}</div>
                    <div className="text-[11px] opacity-65">{t.booking.childrenDesc}</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => adjustGuests("children", -1)}
                      disabled={booking.children <= 0}
                      aria-label="Decrease children"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-current/25 disabled:opacity-35"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-semibold">
                      {booking.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustGuests("children", 1)}
                      aria-label="Increase children"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-current/25"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-current/10 text-right">
                  <button
                    type="button"
                    onClick={() => setOpenPopover(null)}
                    className="rounded-lg bg-[#0E7C8E] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#149BB0]"
                  >
                    {t.booking.doneLabel}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. Search Trips Primary Action Button */}
          <div className="pt-2 md:pt-0 lg:pl-4 flex justify-end">
            <button
              type="submit"
              className="group inline-flex w-full lg:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#0C7A8B] via-[#118FA3] to-[#16A3B8] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(14,124,142,0.45)] border border-[#5EEAD4]/40 transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
            >
              <Search className="h-4 w-4 text-white/90" />
              <span>{t.booking.searchCta}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </form>

      {/* Non-Hallucinated Frontend Search State Confirmation Banner */}
      {lastSubmittedQuery && (
        <div
          role="status"
          aria-live="polite"
          className={`west-glass-popover mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 text-xs transition-all ${
            isLight ? "text-slate-900" : "text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2
              className={`h-4 w-4 shrink-0 ${
                isLight ? "text-[#0E7C8E]" : "text-[#2DD4BF]"
              }`}
            />
            <div>
              <span className="font-semibold">{t.booking.searchReadyTitle}: </span>
              <span className="opacity-85">
                {lastSubmittedQuery.destination === "all"
                  ? t.booking.allThreeOption
                  : t.destinations[lastSubmittedQuery.destination as DestinationId]
                      ?.locationBadge || t.booking.allThreeOption}{" "}
                ·{" "}
                {lastSubmittedQuery.startDate
                  ? `${lastSubmittedQuery.startDate}${
                      lastSubmittedQuery.endDate ? ` → ${lastSubmittedQuery.endDate}` : ""
                    }`
                  : t.booking.datesPlaceholder}{" "}
                · {lastSubmittedQuery.adults + lastSubmittedQuery.children}{" "}
                {lastSubmittedQuery.adults + lastSubmittedQuery.children === 1
                  ? t.booking.guestSingular
                  : t.booking.guestPlural}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={clearSubmittedQuery}
            aria-label={t.booking.closeSummaryLabel}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium opacity-75 hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
            <span>{t.booking.closeSummaryLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}
