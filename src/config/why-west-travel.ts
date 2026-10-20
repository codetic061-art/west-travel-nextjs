export type WhyWestFeatureId = "network" | "transfer" | "support" | "booking";

export type ClaimVerificationStatus = "verified" | "pending_business_confirmation";

export interface WhyWestFeatureItemConfig {
  id: WhyWestFeatureId;
  orderNumber: "01" | "02" | "03" | "04";
  defaultTitle: string;
  defaultDescription: string;
  showBottomDivider: boolean;
  /**
   * Operational claim status flag.
   * Kept explicit so unconfirmed operational promises (such as 24/7 availability,
   * guaranteed transfer terms, or flexible booking policies) remain easy to update
   * once verified by the business.
   */
  verificationStatus: ClaimVerificationStatus;
  verificationNote: string;
}

export interface WhyWestTravelSectionConfig {
  sectionId: string;
  eyebrowPrefix: string;
  eyebrowHighlight: string;
  heading: string;
  supportingText: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  travelerImageWebp: string;
  /** Homepage "Why West Travel" center collage: same photo with an organic, feathered edge (no circular mask). */
  travelerCollageImageWebp: string;
  travelerImagePng: string;
  travelerImageJpg: string;
  travelerImageAlt: string;
  landmarksSummary: string;
}

export const WHY_WEST_TRAVEL_SECTION_CONFIG: WhyWestTravelSectionConfig = {
  sectionId: "why-west-travel",
  eyebrowPrefix: "WHY",
  eyebrowHighlight: "WEST TRAVEL",
  heading: "Get the Best Travel Experience",
  supportingText:
    "Thoughtful planning, clear trip details, and dedicated support — we make your journey smoother, safer and more memorable.",
  primaryCtaLabel: "Learn More",
  primaryCtaHref: "/about",
  travelerImageWebp: "/images/west-travel/why-west-traveler.webp",
  travelerCollageImageWebp: "/images/west-travel/why-west-traveler-collage.webp",
  travelerImagePng: "/images/west-travel/why-west-traveler.png",
  travelerImageJpg: "/images/west-travel/why-west-traveler.jpg",
  travelerImageAlt:
    "Smiling young traveler in a sand sunhat holding an open travel map with the Great Pyramids of Giza, the Sphinx, and the Dubai skyline behind him",
  landmarksSummary:
    "Pyramids of Giza & Great Sphinx (Egypt) · Downtown Skyline & Burj Khalifa Waterfront (Dubai)",
};

export const WHY_WEST_TRAVEL_FEATURES: readonly WhyWestFeatureItemConfig[] = [
  {
    id: "network",
    orderNumber: "01",
    defaultTitle: "Global Travel Network",
    defaultDescription:
      "Access to trusted partners and unique travel experiences worldwide.",
    showBottomDivider: true,
    verificationStatus: "pending_business_confirmation",
    verificationNote:
      "Partner network scope across Egypt, Dubai, and Türkiye is configurable pending final vendor roster confirmation.",
  },
  {
    id: "transfer",
    orderNumber: "02",
    defaultTitle: "Easy Transfer",
    defaultDescription:
      "Smooth and secure transfers for a hassle-free journey.",
    showBottomDivider: true,
    verificationStatus: "pending_business_confirmation",
    verificationNote:
      "Transfer inclusion and private/shared ground transport terms should be confirmed per itinerary.",
  },
  {
    id: "support",
    orderNumber: "03",
    defaultTitle: "24/7 Support",
    defaultDescription: "We're here for you, anytime, anywhere.",
    showBottomDivider: true,
    verificationStatus: "pending_business_confirmation",
    verificationNote:
      "24/7 support availability SLA and live dispatch coverage hours require business confirmation before contractual publication.",
  },
  {
    id: "booking",
    orderNumber: "04",
    defaultTitle: "Flexible Booking",
    defaultDescription:
      "Simple steps, fast confirmation, more time for what matters.",
    showBottomDivider: false,
    verificationStatus: "pending_business_confirmation",
    verificationNote:
      "Flexible booking, rescheduling, and cancellation windows should be aligned with official booking terms.",
  },
] as const;
