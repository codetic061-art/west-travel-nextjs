import { HeroProvider } from "@/components/hero/HeroProvider";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturedTripsSection } from "@/components/featured-trips/FeaturedTripsSection";
import { WhyWestTravelSection } from "@/components/why-west-travel/WhyWestTravelSection";

/**
 * WEST TRAVEL Homepage — Complete 3-Section Integrated Experience:
 * 1. HeroSection (Section 1 — Egypt, Dubai & Türkiye Panoramic Hero + Interactive Video Stage)
 * 2. FeaturedTripsSection (Section 2 — Find Your Next Journey 5-Card Asymmetric Layout)
 * 3. WhyWestTravelSection (Section 3 — Why West Travel Editorial Traveler & Landmarks Composition)
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
      </main>
    </HeroProvider>
  );
}
