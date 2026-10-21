import type { DestinationId } from "./destinations";

export interface CompanyIdentityConfig {
  brandName: string;
  legalName: string;
  logoWebp: string;
  logoPng: string;
  email: string;
  emailHref: string;
  whatsappDisplay: string;
  whatsappE164: string;
  whatsappUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  developerName: string;
  developerUrl: string;
  /**
   * Indicates whether an automated server-side WhatsApp/email dispatch endpoint is connected.
   * Kept false until a backend API route or webhook is wired so the inquiry drawer never
   * fakes automatic background message delivery.
   */
  inquiryBackendConnected: boolean;
}

export const COMPANY_IDENTITY_CONFIG: CompanyIdentityConfig = {
  brandName: "WEST GLOBAL TOURS",
  legalName: "West Global Tours",
  logoWebp: "/images/west-travel/west-global-tours-logo.webp",
  logoPng: "/images/west-travel/west-global-tours-logo.png",
  email: "westglobaltours.info@gmail.com",
  emailHref: "mailto:westglobaltours.info@gmail.com",
  whatsappDisplay: "+20 120 139 8685",
  whatsappE164: "201201398685",
  whatsappUrl: "https://wa.me/201201398685",
  instagramUrl: "https://www.instagram.com/westglobaltours/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61595448091591",
  developerName: "Mina Medhat",
  developerUrl: "https://mina-medhat.is-a.dev/",
  inquiryBackendConnected: false,
};

export interface FinalCtaSectionConfig {
  sectionId: string;
  imageWebp: string;
  imageJpg: string;
  objectPosition: string;
  primaryCtaHref: string;
  secondaryTripsHref: string;
}

export interface FooterNavLinkItem {
  id: "home" | "destinations" | "journeys" | "about" | "contact";
  href: string;
  isInternalRoute: boolean;
  scrollTargetId?: string;
  opensInquiryDrawer?: boolean;
}

export interface FooterSocialProfile {
  id: "instagram" | "facebook" | "whatsapp" | "email";
  label: string;
  href: string;
  external: boolean;
  accentColor?: string;
}

export interface FooterContactConfig {
  businessEmail: string;
  emailHref: string;
  phoneOrWhatsapp: string;
  whatsappUrl: string;
  /**
   * Physical office location is kept null because no physical street address was supplied.
   */
  officeLocation: string | null;
  operatingDestinations: readonly DestinationId[];
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
  privacyPolicyHref: string | null;
  termsAndConditionsHref: string | null;
}

export const FINAL_CTA_SECTION_CONFIG: FinalCtaSectionConfig = {
  sectionId: "final-cta",
  imageWebp: "/images/west-travel/final-cta-nile-panorama.webp",
  imageJpg: "/images/west-travel/final-cta-nile-panorama.jpg",
  objectPosition: "50% 54%",
  primaryCtaHref: "#trip-inquiry-drawer",
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
    href: "#trip-inquiry-drawer",
    isInternalRoute: false,
    opensInquiryDrawer: true,
  },
] as const;

export const FOOTER_CONTACT_CONFIG: FooterContactConfig = {
  businessEmail: COMPANY_IDENTITY_CONFIG.email,
  emailHref: COMPANY_IDENTITY_CONFIG.emailHref,
  phoneOrWhatsapp: COMPANY_IDENTITY_CONFIG.whatsappDisplay,
  whatsappUrl: COMPANY_IDENTITY_CONFIG.whatsappUrl,
  officeLocation: null,
  operatingDestinations: ["egypt", "dubai", "turkiye"],
  inquiryHref: "#trip-inquiry-drawer",
  inquiryScrollTargetId: "hero-booking-bar",
};

/**
 * Verified company social profiles for the Footer (Instagram & Facebook).
 * No TikTok or unverified social URLs are invented.
 */
export const FOOTER_SOCIAL_PROFILES: readonly FooterSocialProfile[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: COMPANY_IDENTITY_CONFIG.instagramUrl,
    external: true,
    accentColor: "#E1306C",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: COMPANY_IDENTITY_CONFIG.facebookUrl,
    external: true,
    accentColor: "#1877F2",
  },
] as const;

/**
 * Real social and contact actions for the Floating Social Action Button (FAB).
 */
export const SOCIAL_FAB_ACTIONS: readonly FooterSocialProfile[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: COMPANY_IDENTITY_CONFIG.whatsappUrl,
    external: true,
    accentColor: "#25D366",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: COMPANY_IDENTITY_CONFIG.instagramUrl,
    external: true,
    accentColor: "#E1306C",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: COMPANY_IDENTITY_CONFIG.facebookUrl,
    external: true,
    accentColor: "#1877F2",
  },
  {
    id: "email",
    label: "Email",
    href: COMPANY_IDENTITY_CONFIG.emailHref,
    external: false,
    accentColor: "#14887E",
  },
] as const;

export interface TripInquiryPayload {
  fullName: string;
  phone: string;
  destination: string;
  trip: string;
  travelers: string;
  travelDate?: string;
  notes?: string;
}

export function buildWhatsAppInquiryHref(payload: TripInquiryPayload): string {
  const lines = [
    `Hello ${COMPANY_IDENTITY_CONFIG.brandName},`,
    `I would like to plan a trip:`,
    `• Name: ${payload.fullName}`,
    `• Phone / WhatsApp: ${payload.phone}`,
    `• Destination: ${payload.destination}`,
    `• Journey / Trip: ${payload.trip}`,
    `• Travelers: ${payload.travelers}`,
    payload.travelDate ? `• Preferred Date: ${payload.travelDate}` : null,
    payload.notes ? `• Notes: ${payload.notes}` : null,
  ].filter(Boolean);

  return `${COMPANY_IDENTITY_CONFIG.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function buildEmailInquiryHref(payload: TripInquiryPayload): string {
  const subject = `Trip Inquiry — ${payload.destination} (${payload.trip}) | ${COMPANY_IDENTITY_CONFIG.brandName}`;
  const lines = [
    `Hello ${COMPANY_IDENTITY_CONFIG.brandName} Team,`,
    ``,
    `Please find my trip inquiry details below:`,
    `- Full Name: ${payload.fullName}`,
    `- Phone / WhatsApp: ${payload.phone}`,
    `- Destination: ${payload.destination}`,
    `- Journey / Trip: ${payload.trip}`,
    `- Travelers: ${payload.travelers}`,
    payload.travelDate ? `- Preferred Travel Date: ${payload.travelDate}` : null,
    payload.notes ? `- Additional Notes: ${payload.notes}` : null,
  ].filter((line) => line !== null);

  return `mailto:${COMPANY_IDENTITY_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export const FOOTER_NEWSLETTER_CONFIG: FooterNewsletterConfig = {
  subscriptionEndpoint: null,
};

export const FOOTER_LEGAL_CONFIG: FooterLegalLinkConfig = {
  privacyPolicyHref: null,
  termsAndConditionsHref: null,
};
