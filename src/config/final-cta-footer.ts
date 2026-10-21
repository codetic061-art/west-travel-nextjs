import type { DestinationId } from "./destinations";

export interface FinalCtaSectionConfig {
  sectionId: string;
  imageWebp: string;
  imageJpg: string;
  objectPosition: string;
  /**
   * Connects the primary CTA button ("Plan My Trip →") to the existing
   * interactive Trip Search & Inquiry bar on the homepage (#hero-booking-bar),
   * matching the project's navigation and About page inquiry routing conventions.
   */
  primaryCtaHref: string;
  secondaryTripsHref: string;
}

export interface FooterNavLinkItem {
  id: "home" | "destinations" | "journeys" | "about" | "contact";
  href: string;
  isInternalRoute: boolean;
  scrollTargetId?: string;
}

export interface FooterSocialProfile {
  id: "instagram" | "facebook" | "x" | "linkedin" | "youtube";
  label: string;
  href: string;
}

export interface FooterContactConfig {
  /**
   * Actual business email when provided by the company (e.g., "concierge@westtravel.com").
   * Kept null by default so no unverified email address is fabricated.
   */
  businessEmail: string | null;
  /**
   * Actual phone or WhatsApp contact when provided by the company.
   * Kept null by default so no unverified phone number is fabricated.
   */
  phoneOrWhatsapp: string | null;
  /**
   * Actual office location when provided by the company.
   * Kept null by default; displays the verified operating destination corridor instead.
   */
  officeLocation: string | null;
  /**
   * Verified operating destination corridor across Egypt, Dubai & Türkiye.
   */
  operatingDestinations: readonly DestinationId[];
  /**
   * Existing interactive inquiry destination on the site.
   */
  inquiryHref: string;
  inquiryScrollTargetId: string;
}

export interface FooterNewsletterConfig {
  /**
   * Optional backend newsletter subscription endpoint (e.g., "/api/newsletter").
   * Kept null until a production mailing list endpoint is connected so the UI
   * communicates honestly without faking a backend subscription success.
   */
  subscriptionEndpoint: string | null;
}

export interface FooterLegalLinkConfig {
  /**
   * Optional Privacy Policy route if an actual route exists.
   * Kept null until a dedicated legal route is added so no broken 404 link is rendered.
   */
  privacyPolicyHref: string | null;
  /**
   * Optional Terms & Conditions route if an actual route exists.
   * Kept null until a dedicated legal route is added so no broken 404 link is rendered.
   */
  termsAndConditionsHref: string | null;
}

export const FINAL_CTA_SECTION_CONFIG: FinalCtaSectionConfig = {
  sectionId: "final-cta",
  imageWebp: "/images/west-travel/final-cta-nile-panorama.webp",
  imageJpg: "/images/west-travel/final-cta-nile-panorama.jpg",
  objectPosition: "50% 54%",
  primaryCtaHref: "/#hero-booking-bar",
  secondaryTripsHref: "/trips",
};

export const FOOTER_QUICK_LINKS: readonly FooterNavLinkItem[] = [
  {
    id: "home",
    href: "/#top",
    isInternalRoute: false,
    scrollTargetId: "top",
  },
  {
    id: "destinations",
    href: "/#hero-destination-cards",
    isInternalRoute: false,
    scrollTargetId: "hero-destination-cards",
  },
  {
    id: "journeys",
    href: "/trips",
    isInternalRoute: true,
    scrollTargetId: "featured-trips",
  },
  {
    id: "about",
    href: "/about",
    isInternalRoute: true,
    scrollTargetId: "why-west-travel",
  },
  {
    id: "contact",
    href: "/#hero-booking-bar",
    isInternalRoute: false,
    scrollTargetId: "hero-booking-bar",
  },
] as const;

export const FOOTER_CONTACT_CONFIG: FooterContactConfig = {
  businessEmail: null,
  phoneOrWhatsapp: null,
  officeLocation: null,
  operatingDestinations: ["egypt", "dubai", "turkiye"],
  inquiryHref: "/#hero-booking-bar",
  inquiryScrollTargetId: "hero-booking-bar",
};

/**
 * Verified company social profiles.
 * Populating real URLs here automatically renders social icon links in the Brand column.
 * Kept empty by default to avoid fabricating unverified social profiles.
 */
export const FOOTER_SOCIAL_PROFILES: readonly FooterSocialProfile[] = [];

export const FOOTER_NEWSLETTER_CONFIG: FooterNewsletterConfig = {
  subscriptionEndpoint: null,
};

export const FOOTER_LEGAL_CONFIG: FooterLegalLinkConfig = {
  privacyPolicyHref: null,
  termsAndConditionsHref: null,
};
