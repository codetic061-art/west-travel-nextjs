import { HeroProvider } from "@/components/hero/HeroProvider";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturedTripsSection } from "@/components/featured-trips/FeaturedTripsSection";

/**
 * WEST TRAVEL Homepage — Hero Section (Section 1) + Featured Trips Section (Section 2).
 * Shared HeroProvider controls global Light Mode / Dark Mode and locale across sections.
 */
export default function HomePage() {
  return (
    <HeroProvider initialLocale="en" initialTheme="light">
      <main className="min-h-screen w-full overflow-x-hidden">
        <HeroSection />
        <FeaturedTripsSection />
      </main>
    </HeroProvider>
  );
}
