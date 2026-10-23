"use client";

import React, { useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ABOUT_FAQ_ITEMS_CONFIG, type AboutFaqTopicId } from "@/config/about-us";
import type { AboutUsLocaleCopy } from "@/i18n/about-us-dictionary";
import { useSectionEntrance } from "@/components/motion/MotionPrimitives";
import {
  AboutFaqHeaderRule,
  AboutFaqMicrographics,
} from "./AboutTravelMicrographics";

export interface AboutFaqAccordionProps {
  copy: AboutUsLocaleCopy["faq"];
  isLight: boolean;
}

/**
 * PART 5 — Accessible FAQ Accordion for the About Us Page with Refined Travel Micrographics:
 * - Enriched with `<AboutFaqMicrographics />` (2D airplane silhouette, fine dotted flight path,
 *   location pins, outline travel-memory camera icon, and warm-gold dividers) positioned in the
 *   header and outer margin whitespace so they never sit behind FAQ text.
 * - Preserves existing FAQ questions, answers, keyboard accessibility, and EN/TR/ES translations
 *   without adding new navigation links or button actions.
 */
export function AboutFaqAccordion({
  copy,
  isLight,
}: AboutFaqAccordionProps) {
  const baseId = useId().replace(/:/g, "");
  const confirmedItems = ABOUT_FAQ_ITEMS_CONFIG.filter((item) => item.isConfirmedForDisplay);

  const [openIds, setOpenIds] = useState<ReadonlyArray<AboutFaqTopicId>>([
    "destinations_covered",
  ]);

  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const { ref: sectionRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  });

  const toggleItem = (id: AboutFaqTopicId) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTriggerKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = confirmedItems.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % total;
      triggerRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + total) % total;
      triggerRefs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      triggerRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      triggerRefs.current[total - 1]?.focus();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-faq"
      aria-labelledby="about-faq-heading"
      data-entered={hasEntered ? "true" : "false"}
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* 2D Travel Micrographics in Header & Outer Margin Whitespace (Part 5, Item 11) */}
      <AboutFaqMicrographics
        hasEntered={hasEntered}
        reducedMotion={reducedMotion}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1060px] px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="border-b border-[#E2D8C5] dark:border-white/10 pb-7">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#C89648] dark:bg-[#F4C266]"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0E7C8E] dark:text-[#2DD4BF]">
                {copy.eyebrow}
              </span>
            </div>

            <h2
              id="about-faq-heading"
              className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight"
            >
              {copy.heading}
            </h2>

            <p
              className={`mt-3 text-sm sm:text-base leading-relaxed ${
                isLight ? "text-[#546576]" : "text-slate-300"
              }`}
            >
              {copy.supportingText}
            </p>

            <AboutFaqHeaderRule />
          </div>
        </div>

        {/* Accessible Accordion List */}
        <div className="mt-8 space-y-3.5" role="list">
          {confirmedItems.map((item, idx) => {
            const itemCopy = copy.items[item.id];
            const isOpen = openIds.includes(item.id);
            const triggerId = `faq-trigger-${baseId}-${item.id}`;
            const panelId = `faq-panel-${baseId}-${item.id}`;

            return (
              <div
                key={item.id}
                role="listitem"
                data-faq-item={item.id}
                data-faq-open={isOpen ? "true" : "false"}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? isLight
                      ? "bg-white border-[#0E7C8E]/45 shadow-[0_12px_32px_rgba(8,28,46,0.07)]"
                      : "bg-[#081F32] border-[#2DD4BF]/45 shadow-[0_14px_36px_rgba(2,8,16,0.55)]"
                    : isLight
                    ? "bg-[#FAF8F2] border-[#E2D8C5] hover:border-[#C89648]/70"
                    : "bg-[#071A2B]/80 border-white/10 hover:border-white/25"
                }`}
              >
                <h3 className="m-0">
                  <button
                    ref={(el) => {
                      triggerRefs.current[idx] = el;
                    }}
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    onKeyDown={(e) => handleTriggerKeyDown(e, idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] rounded-2xl"
                  >
                    <span className="flex items-center gap-3.5 min-w-0">
                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors ${
                          isOpen
                            ? "bg-[#0E7C8E] text-white"
                            : isLight
                            ? "bg-[#EAE3D2] text-[#0B2B4B]"
                            : "bg-white/10 text-[#5EEAD4]"
                        }`}
                      >
                        {item.orderNumber}
                      </span>
                      <span className="font-serif text-base sm:text-lg font-semibold leading-snug">
                        {itemCopy.question}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180 border-[#0E7C8E] bg-[#0E7C8E]/10 text-[#0E7C8E] dark:border-[#2DD4BF] dark:text-[#2DD4BF]"
                          : isLight
                          ? "border-[#D5C7AE] text-[#546576]"
                          : "border-white/15 text-white/70"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`grid transition-all ${
                    reducedMotion ? "duration-0" : "duration-200 ease-out"
                  } ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1 sm:px-6 sm:pb-6 sm:pl-[4.25rem] border-t border-current/5">
                      <p
                        className={`text-sm sm:text-[15px] leading-relaxed ${
                          isLight ? "text-[#475869]" : "text-slate-300"
                        }`}
                      >
                        {itemCopy.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
