import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Compass, ShieldCheck, Headphones, CalendarCheck } from "lucide-react";
import {
  WHY_WEST_TRAVEL_FEATURES,
  WHY_WEST_TRAVEL_SECTION_CONFIG,
} from "@/config/why-west-travel";

export const metadata = {
  title: "Why West Travel — About Our Journey Standards | WEST TRAVEL",
  description:
    "Thoughtful planning, clear trip details, and dedicated support across Egypt, Dubai, and Türkiye.",
};

export default function AboutWestTravelPage() {
  const iconMap = {
    network: Compass,
    transfer: ShieldCheck,
    support: Headphones,
    booking: CalendarCheck,
  } as const;

  return (
    <main className="min-h-screen w-full bg-[#F7F3E8] dark:bg-[#051422] text-[#081C2E] dark:text-white px-4 sm:px-8 lg:px-12 py-12 sm:py-16 transition-colors">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2D8C5] dark:border-white/10 pb-6">
          <Link
            href="/#why-west-travel"
            className="inline-flex items-center gap-2 rounded-full border border-[#D5C7AE] dark:border-white/20 bg-white/80 dark:bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-[#081C2E] dark:text-white hover:border-[#0E7C8E] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF]" />
            <span>Back to Why West Travel</span>
          </Link>

          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0E7C8E] dark:text-[#2DD4BF]">
            WEST TRAVEL · EDITORIAL OVERVIEW
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em]">
              <span className="text-[#BD9556] dark:text-[#F4C266]">
                {WHY_WEST_TRAVEL_SECTION_CONFIG.eyebrowPrefix}
              </span>{" "}
              <span className="text-[#0E7C8E] dark:text-[#2DD4BF]">
                {WHY_WEST_TRAVEL_SECTION_CONFIG.eyebrowHighlight}
              </span>
            </p>
            <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold leading-tight">
              {WHY_WEST_TRAVEL_SECTION_CONFIG.heading}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#546576] dark:text-slate-300 leading-relaxed">
              {WHY_WEST_TRAVEL_SECTION_CONFIG.supportingText}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/trips"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0B7789] via-[#0E8599] to-[#1396AC] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(14,124,142,0.25)] hover:brightness-105 transition-all"
              >
                <span>Explore Curated Trips</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#hero-booking-bar"
                className="inline-flex items-center gap-2 rounded-full border border-[#0E7C8E]/40 dark:border-[#2DD4BF]/40 px-6 py-3.5 text-sm font-semibold text-[#0E7C8E] dark:text-[#2DD4BF] hover:bg-[#0E7C8E]/10 transition-colors"
              >
                <span>Plan a Custom Inquiry</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-[760/752]">
              <Image
                src={WHY_WEST_TRAVEL_SECTION_CONFIG.travelerImageWebp}
                alt={WHY_WEST_TRAVEL_SECTION_CONFIG.travelerImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_WEST_TRAVEL_FEATURES.map((item) => {
            const Icon = iconMap[item.id];
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#E2D8C5] dark:border-white/10 bg-[#FAF8F2] dark:bg-[#081C2E] p-6 shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#DFEFEF] dark:bg-[#0B2438] text-[#0C6B7C] dark:text-[#2DD4BF]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-base font-semibold">{item.defaultTitle}</h2>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5A6A7B] dark:text-slate-300 leading-relaxed">
                  {item.defaultDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
