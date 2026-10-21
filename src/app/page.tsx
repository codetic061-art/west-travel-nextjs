import { HeroProvider } from "@/components/hero/HeroProvider";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturedTripsSection } from "@/components/featured-trips/FeaturedTripsSection";
import { WhyWestTravelSection } from "@/components/why-west-travel/WhyWestTravelSection";
import { TravelerStoriesSection } from "@/components/traveler-stories/TravelerStoriesSection";
import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { TripInquiryDrawer } from "@/components/inquiry-drawer/TripInquiryDrawer";
import { FloatingSocialFab } from "@/components/social-fab/FloatingSocialFab";

/**
 * WEST GLOBAL TOURS Homepage — Complete 6-Section Integrated Experience,
 * Right-Side Trip Inquiry Drawer, Floating Social FAB & Refined Motion System:
 * 1. HeroSection (Section 1 — Egypt, Dubai & Türkiye Panoramic Hero + Interactive Video Stage + Center-Out Search Bar)
 * 2. FeaturedTripsSection (Section 2 — Find Your Next Journey 5-Card Asymmetric Layout)
 * 3. WhyWestTravelSection (Section 3 — Why West Global Tours Editorial Traveler & Landmarks Composition)
 * 4. TravelerStoriesSection (Section 4 — Our Latest Stories Polaroid Clothesline Carousel with 7-Step Entrance)
 * 5. FinalCtaSection (Section 5 — Ready for Your Next Journey? Cinematic Panoramic Conversion Panel)
 * 6. SiteFooter (Section 6 — Compact 4-Column Responsive Footer with Official Branding & Developer Credit)
 * + TripInquiryDrawer (Right-Side Slide-Out Journey Request Drawer)
 * + FloatingSocialFab (Liquid-Morphing Expandable Social Action Menu)
 *
 * Shared HeroProvider controls global Light Mode / Dark Mode, EN / TR / ES locale,
 * and TripInquiryDrawer state across all sections.
 */
export default function HomePage() {
  return (
    <HeroProvider initialLocale="en" initialTheme="light">
      <main className="min-h-screen w-full overflow-x-hidden">
        <HeroSection />
        <FeaturedTripsSection />
        <WhyWestTravelSection />
        <TravelerStoriesSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <TripInquiryDrawer />
      <FloatingSocialFab />
    </HeroProvider>
  );
}
