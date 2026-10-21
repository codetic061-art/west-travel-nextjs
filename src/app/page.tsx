import { HeroProvider } from "@/components/hero/HeroProvider";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturedTripsSection } from "@/components/featured-trips/FeaturedTripsSection";
import { WhyWestTravelSection } from "@/components/why-west-travel/WhyWestTravelSection";
import { TravelerStoriesSection } from "@/components/traveler-stories/TravelerStoriesSection";
import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { SiteFooter } from "@/components/footer/SiteFooter";

/**
 * WEST TRAVEL Homepage — Complete 6-Section Integrated Experience & Motion System:
 * 1. HeroSection (Section 1 — Egypt, Dubai & Türkiye Panoramic Hero + Interactive Video Stage + Center-Out Search Bar)
 * 2. FeaturedTripsSection (Section 2 — Find Your Next Journey 5-Card Asymmetric Layout)
 * 3. WhyWestTravelSection (Section 3 — Why West Travel Editorial Traveler & Landmarks Composition)
 * 4. TravelerStoriesSection (Section 4 — Our Latest Stories Polaroid Clothesline Carousel)
 * 5. FinalCtaSection (Section 5 — Ready for Your Next Journey? Cinematic Panoramic Conversion Panel)
 * 6. SiteFooter (Section 6 — Compact 4-Column Responsive Footer with Theme & Locale Support)
 *
 * Shared HeroProvider controls global Light Mode / Dark Mode and EN / TR / ES locale across all sections.
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
    </HeroProvider>
  );
}
