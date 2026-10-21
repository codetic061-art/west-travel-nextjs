"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Compass,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";
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
import { WhatsAppBrandIcon } from "@/components/icons/BrandIcons";

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
          inquiryDrawerPrefill.destination ?? prev.destinationId;
        const matchedJourney = inquiryDrawerPrefill.journeySlug
          ? FEATURED_TRIPS_CONFIG.find(
              (trip) => trip.slug === inquiryDrawerPrefill.journeySlug
            )
          : undefined;
        let nextTrip = matchedJourney ? matchedJourney.id : prev.tripId;

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

  // Shared classes for consistent icon scale, stroke weight, and alignment
  const iconContainerClass = `mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center transition-colors ${
    isDark ? "text-[#C9AD79]/85" : "text-[#2C445C]"
  }`;

  const labelClass = `block text-[12.5px] font-semibold tracking-[0.01em] ${
    isDark ? "text-[#E6EEF6]" : "text-[#172F46]"
  }`;

  const getUnderlineInputClass = (hasError: boolean, isPlaceholder = false) =>
    `mt-1.5 w-full border-0 border-b bg-transparent pb-2 text-[14px] leading-snug transition-colors duration-200 focus:outline-none ${
      hasError
        ? "border-rose-500 focus:border-rose-500"
        : isDark
          ? "border-white/15 focus:border-[#4CC2B8]"
          : "border-[#D8CEBC] focus:border-[#15887E]"
    } ${
      isPlaceholder
        ? isDark
          ? "text-[#7A90A6]"
          : "text-[#8C9BA9]"
        : isDark
          ? "text-[#F7F2E8] placeholder:text-[#7A90A6]"
          : "text-[#13293D] placeholder:text-[#8C9BA9]"
    }`;

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
          {/* Subtle Top Warm-Gold Hairline Accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A367]/55 to-transparent"
          />

          {/* Refined Minimal Line-Art Giza Pyramids, Horizon Dunes & Date Palm in Muted Warm-Gold (Bottom-Left) */}
          <svg
            viewBox="0 0 240 140"
            fill="none"
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 left-0 h-32 w-56 select-none ${
              isDark ? "text-[#D4B475]/[0.14]" : "text-[#C5A367]/[0.28]"
            }`}
          >
            {/* Great Pyramid of Khufu & Khafre — Clean 1.3px architectural line art */}
            <path
              d="M38 136L92 68L142 136"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sunlit vs shaded ridge line */}
            <path
              d="M92 68L114 136"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M92 68L142 136H114L92 68Z"
              fill="currentColor"
              fillOpacity="0.16"
            />
            {/* Secondary Pyramid of Menkaure */}
            <path
              d="M124 136L160 88L196 136"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M160 88L174 136"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M160 88L196 136H174L160 88Z"
              fill="currentColor"
              fillOpacity="0.12"
            />
            {/* Minimalist Desert Dune Contours */}
            <path
              d="M2 136C44 126 98 128 154 134C184 137 212 134 236 136"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            {/* Slender Date Palm Line Art */}
            <path
              d="M22 136C24 112 28 88 36 62"
              stroke="currentColor"
              strokeWidth="1.45"
              strokeLinecap="round"
            />
            <path
              d="M36 62C22 57 10 62 4 70M36 62C24 49 12 49 4 54M36 62C33 46 25 37 16 35M36 62C48 49 60 48 70 54M36 62C50 59 62 65 68 73"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>

          {/* Refined Minimal Line-Art Postmark Stamp in Muted Warm-Gold (Bottom-Right) */}
          <svg
            viewBox="0 0 148 84"
            fill="none"
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-3 right-4 h-[68px] w-[122px] select-none ${
              isDark ? "text-[#D4B475]/[0.14]" : "text-[#C5A367]/[0.28]"
            }`}
          >
            <circle
              cx="42"
              cy="42"
              r="26"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="2.5 3"
            />
            <circle
              cx="42"
              cy="42"
              r="20.5"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            {/* Minimalist compass/paper-plane emblem inside postmark */}
            <path
              d="M33 44.5L50 35.5L46.5 49.5L41.5 44.5L37.5 48L38.5 43L33 44.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Three uniform cancellation wave lines */}
            <path
              d="M76 31C86 27.5 96 34.5 106 31C116 27.5 126 34.5 136 31"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <path
              d="M76 42C86 38.5 96 45.5 106 42C116 38.5 126 45.5 136 42"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <path
              d="M76 53C86 49.5 96 56.5 106 53C116 49.5 126 56.5 136 53"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>

          {/* Upper-right close button */}
          <div className="relative z-20 flex items-center justify-end px-6 pt-5 sm:px-10 sm:pt-6">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeInquiryDrawer}
              aria-label={d.closeLabel}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15887E] ${
                isDark
                  ? "border-white/10 text-[#B8C7D6] hover:border-[#D4B475]/40 hover:bg-white/10 hover:text-white"
                  : "border-[#E5DCCB] text-[#35495E] hover:border-[#C5A367]/60 hover:bg-[#13293D]/5 hover:text-[#13293D]"
              }`}
            >
              <X className="h-[18px] w-[18px]" strokeWidth={1.85} aria-hidden="true" />
            </button>
          </div>

          {/* Scrollable Form Content */}
          <div
            className="relative z-10 flex-1 overflow-y-auto px-6 pb-8 pt-1 sm:px-10 sm:pb-10"
            style={{
              paddingBottom: "max(2rem, env(safe-area-inset-bottom, 2rem))",
            }}
          >
            {/* Header with subtle entrance stagger & warm-gold rules */}
            <header
              className="mb-6 transition-all"
              style={{
                transitionDuration: prefersReducedMotion ? "0ms" : "740ms",
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
                    isDark ? "text-[#4CC2B8]" : "text-[#15887E]"
                  }`}
                >
                  {d.eyebrow}
                </span>
                <span
                  aria-hidden="true"
                  className="h-[1px] w-10 bg-gradient-to-r from-[#C5A367]/75 to-transparent"
                />
              </div>

              <h2
                id={titleId}
                className={`font-serif text-[1.75rem] font-bold leading-[1.18] tracking-tight sm:text-[2.02rem] ${
                  isDark ? "text-[#F7F2E8]" : "text-[#13293D]"
                }`}
              >
                {d.heading}
              </h2>

              <p
                id={descriptionId}
                className={`mt-1.5 text-[0.89rem] leading-relaxed ${
                  isDark ? "text-[#9EB2C5]" : "text-[#5C7084]"
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
              className="space-y-[18px]"
              style={{
                transitionDuration: prefersReducedMotion ? "0ms" : "800ms",
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
                <span aria-hidden="true" className={iconContainerClass}>
                  <User className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <label htmlFor="inquiry-full-name" className={labelClass}>
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
                    className={getUnderlineInputClass(Boolean(errors.fullName))}
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
                <span aria-hidden="true" className={iconContainerClass}>
                  <Phone className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <label htmlFor="inquiry-phone" className={labelClass}>
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
                    className={getUnderlineInputClass(Boolean(errors.phone))}
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
                <span aria-hidden="true" className={iconContainerClass}>
                  <MapPin className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <label htmlFor="inquiry-destination" className={labelClass}>
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
                      className={`${getUnderlineInputClass(
                        Boolean(errors.destinationId),
                        !formState.destinationId
                      )} appearance-none pr-7`}
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
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={1.8}
                      className={`pointer-events-none absolute right-0.5 top-2.5 h-4 w-4 ${
                        isDark ? "text-[#C9AD79]/80" : "text-[#63768A]"
                      }`}
                    />
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
                <span aria-hidden="true" className={iconContainerClass}>
                  <Compass className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <label htmlFor="inquiry-trip" className={labelClass}>
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
                      className={`${getUnderlineInputClass(
                        Boolean(errors.tripId),
                        !formState.tripId
                      )} appearance-none pr-7`}
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
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={1.8}
                      className={`pointer-events-none absolute right-0.5 top-2.5 h-4 w-4 ${
                        isDark ? "text-[#C9AD79]/80" : "text-[#63768A]"
                      }`}
                    />
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
                <span aria-hidden="true" className={iconContainerClass}>
                  <Users className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <label htmlFor="inquiry-travelers" className={labelClass}>
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
                      className={`${getUnderlineInputClass(false)} appearance-none pr-7`}
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
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={1.8}
                      className={`pointer-events-none absolute right-0.5 top-2.5 h-4 w-4 ${
                        isDark ? "text-[#C9AD79]/80" : "text-[#63768A]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* 6. Preferred Travel Date (Optional) */}
              <div className="flex items-start gap-3.5">
                <span aria-hidden="true" className={iconContainerClass}>
                  <Calendar className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <label htmlFor="inquiry-travel-date" className={labelClass}>
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
                      className={`${getUnderlineInputClass(
                        false,
                        !formState.travelDate
                      )} ${isDark ? "[color-scheme:dark]" : "[color-scheme:light]"}`}
                    />
                  </div>
                </div>
              </div>

              {/* 7. Additional Notes (Optional multiline field) */}
              <div className="flex items-start gap-3.5">
                <span aria-hidden="true" className={iconContainerClass}>
                  <FileText className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <label htmlFor="inquiry-notes" className={labelClass}>
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
                    className={`mt-1.5 w-full resize-y rounded-lg border px-3 py-2 text-[13.5px] leading-relaxed transition-colors duration-200 focus:outline-none ${
                      isDark
                        ? "border-white/15 bg-white/[0.03] text-[#F7F2E8] placeholder:text-[#7A90A6] focus:border-[#4CC2B8]"
                        : "border-[#D8CEBC] bg-white/60 text-[#13293D] placeholder:text-[#8C9BA9] focus:border-[#15887E]"
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
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                {/* Restrained Privacy Note below Submit Button */}
                <p
                  className={`mt-3 flex items-center justify-center gap-1.5 text-center text-[11.5px] ${
                    isDark ? "text-[#8DA2B7]" : "text-[#718496]"
                  }`}
                >
                  <ShieldCheck
                    aria-hidden="true"
                    strokeWidth={1.85}
                    className="h-3.5 w-3.5 shrink-0 text-[#15887E] dark:text-[#4CC2B8]"
                  />
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
                    <WhatsAppBrandIcon className="h-3.5 w-3.5 shrink-0" />
                    <span>{d.submissionStatus.whatsappActionLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                  <a
                    href={submittedPayload.emailHref}
                    className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-center text-[12.5px] font-semibold transition-colors ${
                      isDark
                        ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
                        : "border-[#13293D]/20 bg-[#13293D]/5 text-[#13293D] hover:bg-[#13293D]/10"
                    }`}
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
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
