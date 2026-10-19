import React from "react";
import { HeroProvider } from "./HeroProvider";
import { PanoramicBackground } from "./PanoramicBackground";
import { FloatingNavbar } from "./FloatingNavbar";
import { HeroCopy } from "./HeroCopy";
import { DestinationCards } from "./DestinationCards";
import { BookingBar } from "./BookingBar";

/**
 * Production Hero Section for WEST TRAVEL.
 * Server Component shell wrapping isolated interactive Client Components.
 */
export function HeroSection() {
  return (
    <HeroProvider initialLocale="en" initialTheme="dark">
      <section
        id="top"
        aria-label="WEST TRAVEL Hero — Egypt, Dubai & Türkiye"
        className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-[#051320] text-white selection:bg-[#149BB0] selection:text-white"
      >
        {/* Layered 3-Destination Panoramic Background & Interactive Video Stage */}
        <PanoramicBackground />

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
        <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pb-6 sm:pb-8">
          <BookingBar />
        </div>
      </section>
    </HeroProvider>
  );
}
