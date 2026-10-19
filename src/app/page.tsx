import { HeroSection } from "@/components/hero/HeroSection";

/**
 * WEST TRAVEL Homepage — Phase 1 Scope: Hero Section ONLY.
 * No additional sections below the Hero are rendered until reviewed and approved.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroSection />
    </main>
  );
}
