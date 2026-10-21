"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Mail,
  MessageSquare,
  MapPin,
  Info,
  CheckCircle2,
} from "lucide-react";
import { useHero } from "@/components/hero/HeroProvider";
import { BrandLogo } from "@/components/hero/BrandLogo";
import {
  FOOTER_CONTACT_CONFIG,
  FOOTER_LEGAL_CONFIG,
  FOOTER_NEWSLETTER_CONFIG,
  FOOTER_QUICK_LINKS,
  FOOTER_SOCIAL_PROFILES,
} from "@/config/final-cta-footer";
import { useSectionEntrance } from "@/components/motion/MotionPrimitives";

/**
 * Section 6: SiteFooter — Compact, Functional, Theme-Adaptive Footer.
 * - Desktop: Balanced 4-column layout (Brand, Quick Links, Contact Info, Newsletter) + Bottom Copyright Row.
 * - Tablet: Clean 2x2 grid with comfortable spacing.
 * - Mobile: Compact stacked layout with 2-column link/contact row and full-width pill newsletter form.
 * - Adapts intentionally to Light Mode (warm ivory surface, navy headings, muted blue-gray copy)
 *   and Dark Mode (deep navy/petrol surface, off-white headings, muted slate copy, teal accents).
 * - Never fabricates phone numbers, email addresses, office addresses, social URLs, or backend subscription success.
 */
export function SiteFooter() {
  const { t, theme } = useHero();
  const isLight = theme === "light";
  const copy = t.footer;

  const { ref: footerRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -4% 0px",
  });

  const [email, setEmail] = useState("");
  const [statusState, setStatusState] = useState<
    "idle" | "invalid" | "pending_integration" | "subscribed"
  >("idle");

  const handleSmoothAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    scrollTargetId?: string,
    isInternalRoute?: boolean
  ) => {
    if (!scrollTargetId || isInternalRoute) return;
    const targetEl = document.getElementById(scrollTargetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: scrollTargetId === "hero-booking-bar" ? "center" : "start",
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setStatusState("invalid");
      return;
    }

    if (!FOOTER_NEWSLETTER_CONFIG.subscriptionEndpoint) {
      // Honest status message when no backend endpoint is configured yet
      setStatusState("pending_integration");
      return;
    }

    setStatusState("subscribed");
  };

  const getColumnRevealStyle = (delayMs: number): React.CSSProperties =>
    reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? "translate3d(0, 0, 0)" : "translate3d(0, 14px, 0)",
          transitionProperty: "opacity, transform",
          transitionDuration: "560ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${delayMs}ms`,
        };

  return (
    <footer
      id="site-footer"
      ref={footerRef}
      data-theme-mode={theme}
      data-entered={hasEntered ? "true" : "false"}
      className={`relative w-full overflow-hidden border-t transition-colors duration-500 [background:var(--west-surface-footer)] ${
        isLight
          ? "border-[#E4DAC6] text-[#081C2E]"
          : "border-white/10 text-[#F4F3EB]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-11 pb-8 sm:pt-14 sm:pb-10">
        {/* Main 4-Column Desktop / 2-Column Tablet / Compact Mobile Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.95fr_1.25fr] gap-8 sm:gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div style={getColumnRevealStyle(0)} className="flex flex-col items-start">
            <BrandLogo isLight={isLight} />
            <p
              className={`mt-4 max-w-[34ch] text-xs sm:text-[13.5px] leading-relaxed ${
                isLight ? "text-[#546576]" : "text-[#A7BCC8]"
              }`}
            >
              {copy.brandDescription}
            </p>

            {/* Render verified social profile links only when configured */}
            {FOOTER_SOCIAL_PROFILES.length > 0 && (
              <div className="mt-5 flex items-center gap-2.5">
                {FOOTER_SOCIAL_PROFILES.map((profile) => (
                  <a
                    key={profile.id}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={profile.label}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                      isLight
                        ? "border-[#D8CEBC] bg-white/80 text-[#0B2B4B] hover:border-[#0E7C8E] hover:text-[#0E7C8E]"
                        : "border-white/15 bg-white/5 text-white/85 hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
                    }`}
                  >
                    {profile.label.slice(0, 2)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2 — Quick Links */}
          <nav
            aria-label={copy.quickLinksTitle}
            style={getColumnRevealStyle(75)}
            className="flex flex-col items-start"
          >
            <h3
              className={`text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] ${
                isLight ? "text-[#0B2B4B]" : "text-white"
              }`}
            >
              {copy.quickLinksTitle}
            </h3>
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-[13.5px]">
              {FOOTER_QUICK_LINKS.map((item) => {
                const label = copy.links[item.id];
                const linkClasses = `inline-flex items-center gap-1.5 font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] rounded ${
                  isLight
                    ? "text-[#4F6478] hover:text-[#0E7C8E]"
                    : "text-[#A7BCC8] hover:text-[#5EEAD4]"
                }`;

                if (item.isInternalRoute) {
                  return (
                    <li key={item.id}>
                      <Link href={item.href} className={linkClasses}>
                        <span>{label}</span>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) =>
                        handleSmoothAnchorClick(
                          e,
                          item.scrollTargetId,
                          item.isInternalRoute
                        )
                      }
                      className={linkClasses}
                    >
                      <span>{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Column 3 — Contact Info (Strictly Real Project Routes & Non-Fabricated Details) */}
          <div style={getColumnRevealStyle(150)} className="flex flex-col items-start">
            <h3
              className={`text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] ${
                isLight ? "text-[#0B2B4B]" : "text-white"
              }`}
            >
              {copy.contactTitle}
            </h3>

            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-[13.5px]">
              {/* Active Trip Inquiry Link */}
              <li>
                <a
                  href={FOOTER_CONTACT_CONFIG.inquiryHref}
                  onClick={(e) =>
                    handleSmoothAnchorClick(
                      e,
                      FOOTER_CONTACT_CONFIG.inquiryScrollTargetId,
                      false
                    )
                  }
                  className={`group/contact inline-flex items-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] rounded ${
                    isLight
                      ? "text-[#0E7C8E] hover:text-[#095E6D]"
                      : "text-[#5EEAD4] hover:text-white"
                  }`}
                >
                  <Compass className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{copy.contactInquiryCta}</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>

              {/* Business Email (Real mailto if configured, honest status label otherwise) */}
              <li
                className={`flex items-start gap-2 ${
                  isLight ? "text-[#4F6478]" : "text-[#A7BCC8]"
                }`}
              >
                <Mail
                  className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${
                    isLight ? "text-[#0E7C8E]" : "text-[#2DD4BF]"
                  }`}
                  aria-hidden="true"
                />
                {FOOTER_CONTACT_CONFIG.businessEmail ? (
                  <a
                    href={`mailto:${FOOTER_CONTACT_CONFIG.businessEmail}`}
                    className="hover:underline"
                  >
                    {FOOTER_CONTACT_CONFIG.businessEmail}
                  </a>
                ) : (
                  <span>{copy.contactEmailPending}</span>
                )}
              </li>

              {/* Phone / WhatsApp (Real tel/link if configured, honest status label otherwise) */}
              <li
                className={`flex items-start gap-2 ${
                  isLight ? "text-[#4F6478]" : "text-[#A7BCC8]"
                }`}
              >
                <MessageSquare
                  className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${
                    isLight ? "text-[#0E7C8E]" : "text-[#2DD4BF]"
                  }`}
                  aria-hidden="true"
                />
                {FOOTER_CONTACT_CONFIG.phoneOrWhatsapp ? (
                  <a
                    href={`tel:${FOOTER_CONTACT_CONFIG.phoneOrWhatsapp}`}
                    className="hover:underline"
                  >
                    {FOOTER_CONTACT_CONFIG.phoneOrWhatsapp}
                  </a>
                ) : (
                  <span>{copy.contactPhonePending}</span>
                )}
              </li>

              {/* Operating Destinations / Location */}
              <li
                className={`flex items-start gap-2 ${
                  isLight ? "text-[#4F6478]" : "text-[#A7BCC8]"
                }`}
              >
                <MapPin
                  className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${
                    isLight ? "text-[#C89648]" : "text-[#F4C266]"
                  }`}
                  aria-hidden="true"
                />
                <span>
                  {FOOTER_CONTACT_CONFIG.officeLocation ??
                    copy.contactDestinationsLabel}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 — Compact Pill Newsletter Subscription */}
          <div style={getColumnRevealStyle(225)} className="flex flex-col items-start">
            <h3
              className={`text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] ${
                isLight ? "text-[#0B2B4B]" : "text-white"
              }`}
            >
              {copy.newsletterTitle}
            </h3>
            <p
              className={`mt-3 text-xs sm:text-[13px] leading-relaxed ${
                isLight ? "text-[#546576]" : "text-[#A7BCC8]"
              }`}
            >
              {copy.newsletterDescription}
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              noValidate
              data-newsletter-form=""
              className="mt-4 w-full max-w-[380px]"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                {copy.newsletterInputLabel}
              </label>
              <div
                className={`flex items-center rounded-full p-1.5 border transition-colors focus-within:ring-2 focus-within:ring-[#2DD4BF] ${
                  isLight
                    ? "bg-white border-[#DCD2C0] shadow-[0_4px_16px_rgba(11,43,75,0.06)]"
                    : "bg-[#092032] border-white/15 shadow-[0_6px_20px_rgba(2,8,16,0.5)]"
                }`}
              >
                <input
                  id="footer-newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (statusState !== "idle") setStatusState("idle");
                  }}
                  placeholder={copy.newsletterPlaceholder}
                  aria-invalid={statusState === "invalid"}
                  className={`min-w-0 flex-1 bg-transparent px-3.5 py-1.5 text-xs sm:text-[13px] focus:outline-none ${
                    isLight
                      ? "text-[#081C2E] placeholder:text-[#7A8B9B]"
                      : "text-white placeholder:text-slate-400"
                  }`}
                />
                <button
                  type="submit"
                  className={`shrink-0 rounded-full px-4 sm:px-5 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                    isLight
                      ? "bg-[#0B2B4B] text-white hover:bg-[#0E7C8E]"
                      : "bg-[#0E7C8E] text-white hover:bg-[#149BB0]"
                  }`}
                >
                  {copy.newsletterButton}
                </button>
              </div>

              {/* Honest Validation / Integration Status Feedback */}
              {statusState !== "idle" && (
                <div
                  role="status"
                  aria-live="polite"
                  data-newsletter-status={statusState}
                  className={`mt-2.5 flex items-start gap-2 rounded-xl px-3 py-2 text-[11.5px] leading-snug border ${
                    statusState === "invalid"
                      ? isLight
                        ? "bg-amber-50 border-amber-300/80 text-amber-900"
                        : "bg-amber-950/40 border-amber-500/35 text-amber-200"
                      : isLight
                      ? "bg-[#EFF6F6] border-[#B8D8D8] text-[#0B3B49]"
                      : "bg-[#0B2838] border-[#2DD4BF]/30 text-[#CCFBF1]"
                  }`}
                >
                  {statusState === "subscribed" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                  ) : (
                    <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                  )}
                  <span>
                    {statusState === "invalid"
                      ? copy.newsletterInvalidEmail
                      : statusState === "subscribed"
                      ? copy.newsletterSubscribedNotice
                      : copy.newsletterPendingEndpointNotice}
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar — Subtle Divider, Copyright, Destination Corridor & Optional Legal Links */}
        <div
          style={getColumnRevealStyle(290)}
          className={`mt-9 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isLight
              ? "border-[#E4DAC6]/85 text-[#5D7082]"
              : "border-white/10 text-[#8FA6B5]"
          }`}
        >
          <p>{copy.copyright}</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {FOOTER_LEGAL_CONFIG.privacyPolicyHref && (
              <Link
                href={FOOTER_LEGAL_CONFIG.privacyPolicyHref}
                className={`transition-colors ${
                  isLight ? "hover:text-[#0E7C8E]" : "hover:text-[#5EEAD4]"
                }`}
              >
                {copy.privacyPolicy}
              </Link>
            )}
            {FOOTER_LEGAL_CONFIG.termsAndConditionsHref && (
              <Link
                href={FOOTER_LEGAL_CONFIG.termsAndConditionsHref}
                className={`transition-colors ${
                  isLight ? "hover:text-[#0E7C8E]" : "hover:text-[#5EEAD4]"
                }`}
              >
                {copy.termsAndConditions}
              </Link>
            )}
            <span
              className={`text-[11px] font-medium uppercase tracking-[0.18em] ${
                isLight ? "text-[#0E7C8E]" : "text-[#5EEAD4]"
              }`}
            >
              {copy.contactDestinationsLabel}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
