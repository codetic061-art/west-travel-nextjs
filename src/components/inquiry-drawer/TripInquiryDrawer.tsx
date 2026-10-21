"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useHero } from "@/components/hero/HeroProvider";
import { DESTINATIONS_CONFIG, type DestinationId } from "@/config/destinations";
import {
  FEATURED_TRIPS_CONFIG,
  type FeaturedJourneyRecord,
} from "@/config/featured-trips";
import {
  buildEmailInquiryHref,
  buildWhatsAppInquiryHref,
  FOOTER_CONTACT_CONFIG,
} from "@/config/final-cta-footer";
import { usePrefersReducedMotion } from "@/components/motion/MotionPrimitives";

interface InquiryFormState {
  fullName: string;
  phone: string;
  destinationId: DestinationId | "";
  tripId: FeaturedJourneyRecord["id"] | "";
  travelers: number;
  travelDate: string;
  notes: string;
}

interface InquiryFormErrors {
  fullName?: string;
  phone?: string;
  destinationId?: string;
  tripId?: string;
}

const TRAVELER_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export function TripInquiryDrawer() {
  const {
    t: dictionary,
    theme,
    isInquiryDrawerOpen,
    inquiryDrawerPrefill,
    closeInquiryDrawer,
  } = useHero();
  const isDark = theme === "dark";
  const prefersReducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const descriptionId = useId();

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const fullNameInputRef = useRef<HTMLInputElement | null>(null);

  const [formState, setFormState] = useState<InquiryFormState>({
    fullName: "",
    phone: "",
    destinationId: "",
    tripId: "",
    travelers: 2,
    travelDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState<{
    whatsappHref: string;
    emailHref: string;
  } | null>(null);

  // Sync prefill values when the drawer opens
  useEffect(() => {
    if (!isInquiryDrawerOpen) return;
    setShowDiscardConfirm(false);
    setErrors({});

    if (inquiryDrawerPrefill) {
      setFormState((prev) => {
        const nextDestination =
          inquiryDrawerPrefill.destinationId ?? prev.destinationId;
        let nextTrip = inquiryDrawerPrefill.tripId ?? prev.tripId;

        if (nextDestination && nextTrip) {
          const tripConfig = FEATURED_TRIPS_CONFIG.find(
            (t) => t.id === nextTrip
          );
          if (tripConfig && tripConfig.destinationId !== nextDestination) {
            nextTrip = "";
          }
        }

        return {
          ...prev,
          destinationId: nextDestination,
          tripId: nextTrip,
          travelers: inquiryDrawerPrefill.travelers ?? prev.travelers,
        };
      });
    }
  }, [isInquiryDrawerOpen, inquiryDrawerPrefill]);

  // Filter journeys logically associated with the selected destination
  const availableTrips = useMemo(() => {
    if (!formState.destinationId) {
      return FEATURED_TRIPS_CONFIG;
    }
    return FEATURED_TRIPS_CONFIG.filter(
      (trip) => trip.destinationId === formState.destinationId
    );
  }, [formState.destinationId]);

  // Check if user has entered data that could be lost on accidental backdrop click
  const isDirty = useMemo(() => {
    return (
      formState.fullName.trim().length > 0 ||
      formState.phone.trim().length > 0 ||
      formState.notes.trim().length > 0 ||
      formState.travelDate.trim().length > 0
    );
  }, [
    formState.fullName,
    formState.phone,
    formState.notes,
    formState.travelDate,
  ]);

  // Lock background page scroll and manage initial focus when open
  useEffect(() => {
    if (!isInquiryDrawerOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => {
      fullNameInputRef.current?.focus();
    }, 120);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isInquiryDrawerOpen]);

  // Trap focus inside drawer and handle Escape key
  useEffect(() => {
    if (!isInquiryDrawerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (showDiscardConfirm) {
          setShowDiscardConfirm(false);
          return;
        }
        closeInquiryDrawer();
        return;
      }

      if (event.key === "Tab" && drawerRef.current) {
        const focusableElements = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInquiryDrawerOpen, showDiscardConfirm, closeInquiryDrawer]);

  const handleBackdropClick = () => {
    if (isDirty && !submittedPayload) {
      setShowDiscardConfirm(true);
      return;
    }
    closeInquiryDrawer();
  };

  const handleConfirmDiscard = () => {
    setShowDiscardConfirm(false);
    setSubmittedPayload(null);
    setFormState({
      fullName: "",
      phone: "",
      destinationId: "",
      tripId: "",
      travelers: 2,
      travelDate: "",
      notes: "",
    });
    closeInquiryDrawer();
  };

  const validateForm = (): boolean => {
    const nextErrors: InquiryFormErrors = {};
    const trimmedName = formState.fullName.trim();
    const trimmedPhone = formState.phone.trim();
    // International phone validation: optional +, digits, spaces, dashes, parentheses, 7 to 16 digits
    const digitCount = trimmedPhone.replace(/\D/g, "").length;
    const phonePattern = /^\+?[0-9\s\-()]{7,22}$/;

    if (trimmedName.length < 2) {
      nextErrors.fullName = dictionary.inquiryDrawer.validation.fullNameRequired;
    }

    if (!phonePattern.test(trimmedPhone) || digitCount < 7 || digitCount > 16) {
      nextErrors.phone = dictionary.inquiryDrawer.validation.phoneRequired;
    }

    if (!formState.destinationId) {
      nextErrors.destinationId =
        dictionary.inquiryDrawer.validation.destinationRequired;
    }

    if (!formState.tripId) {
      nextErrors.tripId = dictionary.inquiryDrawer.validation.journeyRequired;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedPayload(null);

    if (!validateForm()) {
      return;
    }

    const destinationLabel = formState.destinationId
      ? dictionary.destinations[formState.destinationId].name
      : "";
    const tripLabel = formState.tripId
      ? (FEATURED_TRIPS_CONFIG.find((trip) => trip.id === formState.tripId)
          ?.title ?? "")
      : "";
    const travelersLabel =
      formState.travelers === 1
        ? `1 ${dictionary.inquiryDrawer.fields.travelerSingular}`
        : `${formState.travelers} ${dictionary.inquiryDrawer.fields.travelerPlural}`;

    const payload = {
      fullName: formState.fullName.trim(),
      phone: formState.phone.trim(),
      destination: destinationLabel,
      trip: tripLabel,
      travelers: travelersLabel,
      travelDate: formState.travelDate.trim() || undefined,
      notes: formState.notes.trim() || undefined,
    };

    setSubmittedPayload({
      whatsappHref: buildWhatsAppInquiryHref(payload),
      emailHref: buildEmailInquiryHref(payload),
    });
  };

  const d = dictionary.inquiryDrawer;

  return (
    <div
      id="trip-inquiry-drawer"
      className={`fixed inset-0 z-50 overflow-hidden transition-all ${
        isInquiryDrawerOpen
          ? "pointer-events-auto visible"
          : "pointer-events-none invisible"
      }`}
      style={{
        transitionDuration: prefersReducedMotion ? "0ms" : "820ms",
      }}
      aria-hidden={!isInquiryDrawerOpen}
    >
      {/* Restrained Dark Translucent Backdrop keeping remaining 2/3 of homepage visible */}
      <div
        onClick={handleBackdropClick}
        aria-hidden="true"
        className={`absolute inset-0 backdrop-blur-[2px] transition-opacity ${
          isDark ? "bg-[#060E17]/68" : "bg-[#0E1E2F]/52"
        } ${isInquiryDrawerOpen ? "opacity-100" : "opacity-0"}`}
        style={{
          transitionDuration: prefersReducedMotion ? "0ms" : "780ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Right-Side Slide-Out Drawer Panel (~1/3 viewport width on desktop, full width on mobile) */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={`relative flex h-full w-screen flex-col overflow-hidden sm:w-[34vw] sm:min-w-[420px] sm:max-w-[510px] sm:rounded-l-[28px] border-l shadow-[-24px_0_64px_rgba(8,21,35,0.34)] transition-transform ${
            isDark
              ? "border-white/10 bg-[#102030] text-[#F5EFE4]"
              : "border-[#E6DEC8] bg-[#FBF7F0] text-[#13293D]"
          }`}
          style={{
            transitionDuration: prefersReducedMotion ? "0ms" : "820ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            transform: isInquiryDrawerOpen
              ? "translate3d(0%, 0, 0)"
              : "translate3d(104%, 0, 0)",
          }}
        >
          {/* Decorative Faint Giza Pyramids & Palm Silhouette in Bottom-Left (matching reference image_7b6b25.jpg) */}
          <svg
            viewBox="0 0 220 150"
            fill="none"
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 left-0 h-36 w-52 select-none ${
              isDark ? "text-[#D8C39E]/10" : "text-[#C5AE87]/28"
            }`}
          >
            {/* Pyramids */}
            <path
              d="M36 148L88 78L138 148H36Z"
              fill="currentColor"
              fillOpacity="0.55"
            />
            <path
              d="M88 78L114 148H138L88 78Z"
              fill="currentColor"
              fillOpacity="0.85"
            />
            <path
              d="M112 148L150 96L188 148H112Z"
              fill="currentColor"
              fillOpacity="0.4"
            />
            {/* Palm trunk & fronds */}
            <path
              d="M18 148C21 122 25 96 34 68"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M34 68C18 62 6 69 2 78M34 68C20 52 6 52 -2 58M34 68C32 48 22 36 12 34M34 68C48 52 62 50 74 56M34 68C52 64 66 72 72 82"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M44 148C46 128 50 110 58 90"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M58 90C46 86 38 90 34 96M58 90C54 76 46 70 38 68M58 90C70 80 82 80 90 86"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>

          {/* Decorative Faint Travel Postmark Stamp in Bottom-Right (matching reference image_7b6b25.jpg) */}
          <svg
            viewBox="0 0 140 90"
            fill="none"
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-3 right-3 h-20 w-32 select-none ${
              isDark ? "text-[#D8C39E]/10" : "text-[#C5AE87]/32"
            }`}
          >
            <circle
              cx="44"
              cy="46"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle
              cx="44"
              cy="46"
              r="22"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Airplane silhouette inside stamp */}
            <path
              d="M35 49L53 39L50 53L44 48L39 52L40 46L35 49Z"
              fill="currentColor"
            />
            {/* Wavy postmark lines */}
            <path
              d="M78 34C88 30 98 38 108 34C118 30 128 38 136 34"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M78 46C88 42 98 50 108 46C118 42 128 50 136 46"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M78 58C88 54 98 62 108 58C118 54 128 62 136 58"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          {/* Upper-right close button */}
          <div className="relative z-20 flex items-center justify-end px-6 pt-5 sm:px-9 sm:pt-6">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeInquiryDrawer}
              aria-label={d.closeLabel}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138D83] ${
                isDark
                  ? "text-[#B8C7D6] hover:bg-white/10 hover:text-white"
                  : "text-[#35495E] hover:bg-[#13293D]/8 hover:text-[#13293D]"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable Form Content */}
          <div
            className="relative z-10 flex-1 overflow-y-auto px-6 pb-8 pt-1 sm:px-10 sm:pb-10"
            style={{
              paddingBottom: "max(2rem, env(safe-area-inset-bottom, 2rem))",
            }}
          >
            {/* Header with subtle entrance stagger */}
            <header
              className="mb-6 transition-all"
              style={{
                transitionDuration: prefersReducedMotion ? "0ms" : "680ms",
                transitionDelay:
                  isInquiryDrawerOpen && !prefersReducedMotion
                    ? "140ms"
                    : "0ms",
                opacity: isInquiryDrawerOpen ? 1 : 0,
                transform: isInquiryDrawerOpen
                  ? "translateY(0)"
                  : "translateY(12px)",
              }}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-[1px] w-5 bg-[#C5A367]"
                />
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
                    isDark ? "text-[#4CC2B8]" : "text-[#17857C]"
                  }`}
                >
                  {d.eyebrow}
                </span>
                <span
                  aria-hidden="true"
                  className="h-[1px] w-10 bg-[#C5A367]/45"
                />
              </div>

              <h2
                id={titleId}
                className={`font-serif text-[1.75rem] font-bold leading-[1.18] tracking-tight sm:text-[2.05rem] ${
                  isDark ? "text-[#F7F2E8]" : "text-[#13293D]"
                }`}
              >
                {d.heading}
              </h2>

              <p
                id={descriptionId}
                className={`mt-1.5 text-[0.9rem] leading-relaxed ${
                  isDark ? "text-[#9EB2C5]" : "text-[#63768A]"
                }`}
              >
                {d.supportingText}
              </p>
            </header>

            {/* Accidental backdrop dismissal confirmation banner if form is dirty */}
            {showDiscardConfirm && (
              <div
                role="alert"
                className={`mb-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                  isDark
                    ? "border-amber-400/35 bg-amber-500/10 text-amber-100"
                    : "border-amber-600/30 bg-amber-50 text-[#5C4314]"
                }`}
              >
                <p className="font-semibold">{d.discardConfirm.message}</p>
                <div className="mt-3 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowDiscardConfirm(false)}
                    className={`rounded-full px-3.5 py-1.5 font-semibold transition-colors ${
                      isDark
                        ? "bg-white/15 text-white hover:bg-white/25"
                        : "bg-[#13293D] text-white hover:bg-[#1E3B56]"
                    }`}
                  >
                    {d.discardConfirm.keepEditing}
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDiscard}
                    className={`rounded-full px-3.5 py-1.5 font-medium transition-colors ${
                      isDark
                        ? "text-amber-200 hover:bg-white/10"
                        : "text-[#7A591B] hover:bg-amber-200/50"
                    }`}
                  >
                    {d.discardConfirm.discardAndClose}
                  </button>
                </div>
              </div>
            )}

            {/* Trip Inquiry Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
              style={{
                transitionDuration: prefersReducedMotion ? "0ms" : "740ms",
                transitionDelay:
                  isInquiryDrawerOpen && !prefersReducedMotion
                    ? "220ms"
                    : "0ms",
                opacity: isInquiryDrawerOpen ? 1 : 0,
                transform: isInquiryDrawerOpen
                  ? "translateY(0)"
                  : "translateY(16px)",
              }}
            >
              {/* 1. Full Name */}
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center ${
                    isDark ? "text-[#9EB2C5]" : "text-[#35495E]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="inquiry-full-name"
                    className={`block text-[13px] font-semibold ${
                      isDark ? "text-[#E6EEF6]" : "text-[#1E354D]"
                    }`}
                  >
                    {d.fields.fullNameLabel}
                  </label>
                  <input
                    ref={fullNameInputRef}
                    id="inquiry-full-name"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={formState.fullName}
                    onChange={(e) => {
                      setFormState((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }));
                      if (errors.fullName) {
                        setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }
                    }}
                    placeholder={d.fields.fullNamePlaceholder}
                    aria-invalid={Boolean(errors.fullName)}
                    className={`mt-1 w-full border-0 border-b bg-transparent pb-2 text-[14px] transition-colors focus:outline-none ${
                      errors.fullName
                        ? "border-rose-500 focus:border-rose-500"
                        : isDark
                          ? "border-white/20 text-[#F7F2E8] placeholder:text-[#788EA4] focus:border-[#4CC2B8]"
                          : "border-[#D6CEBE] text-[#13293D] placeholder:text-[#9AA8B6] focus:border-[#148A81]"
                    }`}
                  />
                  {errors.fullName && (
                    <p
                      role="alert"
                      className="mt-1 text-[11.5px] font-medium text-rose-500"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>
              </div>

              {/* 2. Phone / WhatsApp */}
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center ${
                    isDark ? "text-[#9EB2C5]" : "text-[#35495E]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="inquiry-phone"
                    className={`block text-[13px] font-semibold ${
                      isDark ? "text-[#E6EEF6]" : "text-[#1E354D]"
                    }`}
                  >
                    {d.fields.phoneLabel}
                  </label>
                  <input
                    id="inquiry-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    value={formState.phone}
                    onChange={(e) => {
                      setFormState((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }));
                      if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }
                    }}
                    placeholder={d.fields.phonePlaceholder}
                    aria-invalid={Boolean(errors.phone)}
                    className={`mt-1 w-full border-0 border-b bg-transparent pb-2 text-[14px] transition-colors focus:outline-none ${
                      errors.phone
                        ? "border-rose-500 focus:border-rose-500"
                        : isDark
                          ? "border-white/20 text-[#F7F2E8] placeholder:text-[#788EA4] focus:border-[#4CC2B8]"
                          : "border-[#D6CEBE] text-[#13293D] placeholder:text-[#9AA8B6] focus:border-[#148A81]"
                    }`}
                  />
                  {errors.phone && (
                    <p
                      role="alert"
                      className="mt-1 text-[11.5px] font-medium text-rose-500"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Destination */}
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center ${
                    isDark ? "text-[#9EB2C5]" : "text-[#35495E]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="inquiry-destination"
                    className={`block text-[13px] font-semibold ${
                      isDark ? "text-[#E6EEF6]" : "text-[#1E354D]"
                    }`}
                  >
                    {d.fields.destinationLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="inquiry-destination"
                      name="destinationId"
                      required
                      value={formState.destinationId}
                      onChange={(e) => {
                        const nextDest = e.target.value as DestinationId | "";
                        setFormState((prev) => {
                          let nextTrip = prev.tripId;
                          if (nextDest && nextTrip) {
                            const match = FEATURED_TRIPS_CONFIG.find(
                              (t) =>
                                t.id === nextTrip &&
                                t.destinationId === nextDest
                            );
                            if (!match) nextTrip = "";
                          }
                          return {
                            ...prev,
                            destinationId: nextDest,
                            tripId: nextTrip,
                          };
                        });
                        if (errors.destinationId) {
                          setErrors((prev) => ({
                            ...prev,
                            destinationId: undefined,
                          }));
                        }
                      }}
                      aria-invalid={Boolean(errors.destinationId)}
                      className={`mt-1 w-full appearance-none border-0 border-b bg-transparent pb-2 pr-7 text-[14px] transition-colors focus:outline-none ${
                        errors.destinationId
                          ? "border-rose-500 focus:border-rose-500"
                          : isDark
                            ? "border-white/20 focus:border-[#4CC2B8]"
                            : "border-[#D6CEBE] focus:border-[#148A81]"
                      } ${
                        !formState.destinationId
                          ? isDark
                            ? "text-[#788EA4]"
                            : "text-[#9AA8B6]"
                          : isDark
                            ? "text-[#F7F2E8]"
                            : "text-[#13293D]"
                      }`}
                    >
                      <option
                        value=""
                        className={
                          isDark
                            ? "bg-[#102030] text-[#9EB2C5]"
                            : "bg-[#FBF7F0] text-[#63768A]"
                        }
                      >
                        {d.fields.destinationPlaceholder}
                      </option>
                      {DESTINATIONS_CONFIG.map((dest) => (
                        <option
                          key={dest.id}
                          value={dest.id}
                          className={
                            isDark
                              ? "bg-[#102030] text-[#F7F2E8]"
                              : "bg-[#FBF7F0] text-[#13293D]"
                          }
                        >
                          {dictionary.destinations[dest.id].name}
                        </option>
                      ))}
                    </select>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`pointer-events-none absolute right-0.5 top-2.5 h-4 w-4 ${
                        isDark ? "text-[#9EB2C5]" : "text-[#63768A]"
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  {errors.destinationId && (
                    <p
                      role="alert"
                      className="mt-1 text-[11.5px] font-medium text-rose-500"
                    >
                      {errors.destinationId}
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Journey / Trip (Filtered by Destination) */}
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center ${
                    isDark ? "text-[#9EB2C5]" : "text-[#35495E]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="inquiry-trip"
                    className={`block text-[13px] font-semibold ${
                      isDark ? "text-[#E6EEF6]" : "text-[#1E354D]"
                    }`}
                  >
                    {d.fields.journeyLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="inquiry-trip"
                      name="tripId"
                      required
                      value={formState.tripId}
                      onChange={(e) => {
                        const nextTripId = e.target.value as
                          | FeaturedJourneyRecord["id"]
                          | "";
                        setFormState((prev) => {
                          let nextDest = prev.destinationId;
                          if (nextTripId && !nextDest) {
                            const found = FEATURED_TRIPS_CONFIG.find(
                              (t) => t.id === nextTripId
                            );
                            if (found) nextDest = found.destinationId;
                          }
                          return {
                            ...prev,
                            tripId: nextTripId,
                            destinationId: nextDest,
                          };
                        });
                        if (errors.tripId) {
                          setErrors((prev) => ({ ...prev, tripId: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.tripId)}
                      className={`mt-1 w-full appearance-none border-0 border-b bg-transparent pb-2 pr-7 text-[14px] transition-colors focus:outline-none ${
                        errors.tripId
                          ? "border-rose-500 focus:border-rose-500"
                          : isDark
                            ? "border-white/20 focus:border-[#4CC2B8]"
                            : "border-[#D6CEBE] focus:border-[#148A81]"
                      } ${
                        !formState.tripId
                          ? isDark
                            ? "text-[#788EA4]"
                            : "text-[#9AA8B6]"
                          : isDark
                            ? "text-[#F7F2E8]"
                            : "text-[#13293D]"
                      }`}
                    >
                      <option
                        value=""
                        className={
                          isDark
                            ? "bg-[#102030] text-[#9EB2C5]"
                            : "bg-[#FBF7F0] text-[#63768A]"
                        }
                      >
                        {formState.destinationId
                          ? d.fields.journeyPlaceholder
                          : d.fields.journeyAllDestinationsHint}
                      </option>
                      {availableTrips.map((trip) => {
                        const tripOption =
                          trip.durationLabel !== null
                            ? `${trip.title} (${trip.durationLabel})`
                            : trip.title;
                        return (
                          <option
                            key={trip.id}
                            value={trip.id}
                            className={
                              isDark
                                ? "bg-[#102030] text-[#F7F2E8]"
                                : "bg-[#FBF7F0] text-[#13293D]"
                            }
                          >
                            {tripOption}
                          </option>
                        );
                      })}
                    </select>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`pointer-events-none absolute right-0.5 top-2.5 h-4 w-4 ${
                        isDark ? "text-[#9EB2C5]" : "text-[#63768A]"
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  {errors.tripId && (
                    <p
                      role="alert"
                      className="mt-1 text-[11.5px] font-medium text-rose-500"
                    >
                      {errors.tripId}
                    </p>
                  )}
                </div>
              </div>

              {/* 5. Number of Travelers */}
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center ${
                    isDark ? "text-[#9EB2C5]" : "text-[#35495E]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="inquiry-travelers"
                    className={`block text-[13px] font-semibold ${
                      isDark ? "text-[#E6EEF6]" : "text-[#1E354D]"
                    }`}
                  >
                    {d.fields.travelersLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="inquiry-travelers"
                      name="travelers"
                      value={formState.travelers}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          travelers: Number(e.target.value),
                        }))
                      }
                      className={`mt-1 w-full appearance-none border-0 border-b bg-transparent pb-2 pr-7 text-[14px] transition-colors focus:outline-none ${
                        isDark
                          ? "border-white/20 text-[#F7F2E8] focus:border-[#4CC2B8]"
                          : "border-[#D6CEBE] text-[#13293D] focus:border-[#148A81]"
                      }`}
                    >
                      {TRAVELER_COUNTS.map((count) => (
                        <option
                          key={count}
                          value={count}
                          className={
                            isDark
                              ? "bg-[#102030] text-[#F7F2E8]"
                              : "bg-[#FBF7F0] text-[#13293D]"
                          }
                        >
                          {count === 1
                            ? `1 ${d.fields.travelerSingular}`
                            : count === 10
                              ? `10+ ${d.fields.travelerPlural}`
                              : `${count} ${d.fields.travelerPlural}`}
                        </option>
                      ))}
                    </select>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`pointer-events-none absolute right-0.5 top-2.5 h-4 w-4 ${
                        isDark ? "text-[#9EB2C5]" : "text-[#63768A]"
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 6. Preferred Travel Date (Optional) */}
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center ${
                    isDark ? "text-[#9EB2C5]" : "text-[#35495E]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="inquiry-travel-date"
                    className={`block text-[13px] font-semibold ${
                      isDark ? "text-[#E6EEF6]" : "text-[#1E354D]"
                    }`}
                  >
                    {d.fields.preferredDateLabel}
                  </label>
                  <div className="relative">
                    <input
                      id="inquiry-travel-date"
                      name="travelDate"
                      type="date"
                      value={formState.travelDate}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          travelDate: e.target.value,
                        }))
                      }
                      placeholder={d.fields.preferredDatePlaceholder}
                      className={`mt-1 w-full border-0 border-b bg-transparent pb-2 text-[14px] transition-colors focus:outline-none ${
                        isDark
                          ? "border-white/20 text-[#F7F2E8] [color-scheme:dark] focus:border-[#4CC2B8]"
                          : "border-[#D6CEBE] text-[#13293D] [color-scheme:light] focus:border-[#148A81]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* 7. Additional Notes (Optional multiline field) */}
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center ${
                    isDark ? "text-[#9EB2C5]" : "text-[#35495E]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="inquiry-notes"
                    className={`block text-[13px] font-semibold ${
                      isDark ? "text-[#E6EEF6]" : "text-[#1E354D]"
                    }`}
                  >
                    {d.fields.notesLabel}
                  </label>
                  <textarea
                    id="inquiry-notes"
                    name="notes"
                    rows={2}
                    value={formState.notes}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder={d.fields.notesPlaceholder}
                    className={`mt-1.5 w-full resize-y rounded-lg border border-b px-3 py-2 text-[13.5px] transition-colors focus:outline-none ${
                      isDark
                        ? "border-white/15 bg-white/[0.03] text-[#F7F2E8] placeholder:text-[#788EA4] focus:border-[#4CC2B8]"
                        : "border-[#DFD7C8] bg-white/55 text-[#13293D] placeholder:text-[#9AA8B6] focus:border-[#148A81]"
                    }`}
                  />
                </div>
              </div>

              {/* Primary Rounded Teal Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-2.5 rounded-full bg-[#15887E] px-6 py-3.5 text-[14.5px] font-semibold tracking-wide text-white shadow-[0_12px_28px_rgba(21,136,126,0.32)] transition-all duration-300 hover:bg-[#11736A] hover:shadow-[0_16px_34px_rgba(21,136,126,0.42)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CC2B8] focus-visible:ring-offset-2"
                >
                  <span>{d.submitButton}</span>
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>

                {/* Restrained Privacy Note below Submit Button */}
                <p
                  className={`mt-3 flex items-center justify-center gap-1.5 text-center text-[11.5px] ${
                    isDark ? "text-[#8DA2B7]" : "text-[#7A8B9C]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0 text-[#15887E]"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  <span>{d.privacyNote}</span>
                </p>
              </div>
            </form>

            {/* Honest Pending Integration / Prepared Handoff Boundary State */}
            {submittedPayload && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                  isDark
                    ? "border-[#4CC2B8]/35 bg-[#153044]/90 text-[#E8F1F8]"
                    : "border-[#15887E]/30 bg-white/90 text-[#183148] shadow-sm"
                }`}
              >
                <p className="text-[13px] font-bold text-[#15887E] dark:text-[#4CC2B8]">
                  {d.submissionStatus.pendingTitle}
                </p>
                <p className="mt-1 opacity-90">
                  {d.submissionStatus.pendingDescription}
                </p>
                <div className="mt-3.5 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={submittedPayload.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-center text-[12.5px] font-semibold text-white shadow-sm transition-transform hover:scale-[1.01]"
                  >
                    <span>{d.submissionStatus.whatsappActionLabel}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href={submittedPayload.emailHref}
                    className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-center text-[12.5px] font-semibold transition-colors ${
                      isDark
                        ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
                        : "border-[#13293D]/20 bg-[#13293D]/5 text-[#13293D] hover:bg-[#13293D]/10"
                    }`}
                  >
                    <span>{d.submissionStatus.emailActionLabel}</span>
                  </a>
                </div>
                <p className="mt-2.5 text-[11px] opacity-75">
                  WhatsApp: {FOOTER_CONTACT_CONFIG.phoneOrWhatsapp} ·{" "}
                  {FOOTER_CONTACT_CONFIG.businessEmail}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
