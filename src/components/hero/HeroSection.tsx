import React from "react";
import { PanoramicBackground } from "./PanoramicBackground";
import { FloatingNavbar } from "./FloatingNavbar";
import { HeroCopy } from "./HeroCopy";
import { DestinationCards } from "./DestinationCards";
import { BookingBar } from "./BookingBar";

/**
 * Production Hero Section for WEST TRAVEL.
 * Server Component shell using the page-level theme and locale provider.
 */
export function HeroSection() {
  return (
      <section
        id="top"
        aria-label="WEST TRAVEL Hero — Egypt, Dubai & Türkiye"
        className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-[#051320] text-white selection:bg-[#149BB0] selection:text-white"
      >
        {/* Cohesive Panoramic Background & Interactive Video Stage */}
        <PanoramicBackground />

        {/* Shallow curved hand-off into Featured Trips (above the image scrims, below all content): ivory in Light Mode, seamless navy with a teal hairline in Dark Mode */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[clamp(18px,3vw,44px)] w-full"
        >
          <path className="west-hero-edge-fill" d="M0 44V30C240 11 480 1 720 1S1200 11 1440 30V44Z" />
          <path className="west-hero-edge-line" d="M0 30C240 11 480 1 720 1S1200 11 1440 30" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Top Header & Floating Glassmorphic Navbar */}
        <FloatingNavbar hasAccountRoute={false} />

        {/* Main Center Stage: Left Copy + Right Asymmetric Destination Cards */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 sm:px-8 lg:px-12 py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.12fr)_auto] items-center gap-8 lg:gap-12">
            <div className="min-w-0">
              <HeroCopy />
            </div>
            <div className="min-w-0 w-full lg:w-auto">
              <DestinationCards />
            </div>
          </div>
        </div>

        {/* Bottom Translucent Glass Booking / Search Panel */}
        <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pb-8 sm:pb-11 lg:pb-14">
          <BookingBar />
        </div>
      </section>
  );
}
