import { DESTINATIONS_CONFIG } from "./destinations";
import { FEATURED_TRIPS_CONFIG } from "./featured-trips";
import { COMPANY_IDENTITY_CONFIG } from "./final-cta-footer";

export type CompanyFactIconId =
  | "destinations"
  | "journeys"
  | "languages"
  | "channels"
  | "travelers"
  | "experience";

export type FactVerificationStatus =
  | "verified_company_record"
  | "unpopulated_pending_business_input";

export interface CompanyStatOrFactRecord {
  id: string;
  iconId: CompanyFactIconId;
  /**
   * Confirmed numeric value when backed by real repository/company records.
   * Kept `null` when a historical metric (such as total past travelers or years in operation)
   * has not yet been supplied by the business.
   */
  numericValue: number | null;
  /**
   * Optional suffix (e.g., "+" or "") used only when numericValue is non-null and verified.
   */
  valueSuffix?: string;
  /**
   * Display string derived strictly from confirmed records (e.g., "03", "05").
   * Never set to zero or unverified placeholder figures.
   */
  displayValue: string | null;
  verificationStatus: FactVerificationStatus;
  /**
   * Controls whether the item is rendered in production.
   * Unpopulated metrics are automatically hidden from production until verified numbers are provided.
   */
  isConfirmedForDisplay: boolean;
  sourceNote: string;
}

/**
 * 1. Historical Volume Metrics Model (Part 3.4):
 * Prepared for future business population (travelers served, total journeys organized,
 * years of company experience). Kept `null` and `isConfirmedForDisplay: false` by default
 * so production never renders fictional counts or zeros.
 */
export const HISTORICAL_COMPANY_STATISTICS_CONFIG: readonly CompanyStatOrFactRecord[] =
  [
    {
      id: "travelers_served",
      iconId: "travelers",
      numericValue: null,
      valueSuffix: "+",
      displayValue: null,
      verificationStatus: "unpopulated_pending_business_input",
      isConfirmedForDisplay: false,
      sourceNote:
        "Set numericValue and isConfirmedForDisplay: true once verified traveler count is supplied by WEST GLOBAL TOURS.",
    },
    {
      id: "journeys_organized",
      iconId: "journeys",
      numericValue: null,
      valueSuffix: "+",
      displayValue: null,
      verificationStatus: "unpopulated_pending_business_input",
      isConfirmedForDisplay: false,
      sourceNote:
        "Set numericValue and isConfirmedForDisplay: true once historical organized trip count is supplied.",
    },
    {
      id: "years_experience",
      iconId: "experience",
      numericValue: null,
      valueSuffix: "+",
      displayValue: null,
      verificationStatus: "unpopulated_pending_business_input",
      isConfirmedForDisplay: false,
      sourceNote:
        "Set numericValue and isConfirmedForDisplay: true once founding year / years of operation is confirmed.",
    },
  ] as const;

/**
 * 2. Confirmed Catalog & Service Scope Facts (Part 3.2 & 3.4):
 * Derived 100% from the actual repository configuration (`DESTINATIONS_CONFIG`,
 * `FEATURED_TRIPS_CONFIG`, `HERO_DICTIONARY`, and `COMPANY_IDENTITY_CONFIG`).
 */
export const VERIFIED_COMPANY_FACTS_CONFIG: readonly CompanyStatOrFactRecord[] =
  [
    {
      id: "verified_destinations",
      iconId: "destinations",
      numericValue: DESTINATIONS_CONFIG.length,
      displayValue: `0${DESTINATIONS_CONFIG.length}`,
      verificationStatus: "verified_company_record",
      isConfirmedForDisplay: true,
      sourceNote:
        "Confirmed in src/config/destinations.ts: Egypt (01), Türkiye (02), and Dubai (03).",
    },
    {
      id: "curated_journey_routes",
      iconId: "journeys",
      numericValue: FEATURED_TRIPS_CONFIG.length,
      displayValue: `0${FEATURED_TRIPS_CONFIG.length}`,
      verificationStatus: "verified_company_record",
      isConfirmedForDisplay: true,
      sourceNote:
        "Confirmed in src/config/featured-trips.ts: 5 curated journey corridors across Egypt, Türkiye, and Dubai.",
    },
    {
      id: "supported_languages",
      iconId: "languages",
      numericValue: 3,
      displayValue: "03",
      verificationStatus: "verified_company_record",
      isConfirmedForDisplay: true,
      sourceNote:
        "Confirmed in src/i18n/hero-dictionary.ts: English (EN), Turkish (TR), and Spanish (ES).",
    },
    {
      id: "direct_inquiry_channels",
      iconId: "channels",
      numericValue: 2,
      displayValue: "02",
      verificationStatus: "verified_company_record",
      isConfirmedForDisplay: true,
      sourceNote: `Confirmed in src/config/final-cta-footer.ts: Direct WhatsApp (${COMPANY_IDENTITY_CONFIG.whatsappDisplay}) & Email (${COMPANY_IDENTITY_CONFIG.email}).`,
    },
  ] as const;

/**
 * Returns only verified, non-null company facts/statistics for production rendering.
 * If historical statistics are populated later, they automatically merge into the active display list.
 */
export function getActiveAboutCompanyFacts(
  customStats?: readonly CompanyStatOrFactRecord[]
): readonly CompanyStatOrFactRecord[] {
  const source = customStats ?? [
    ...HISTORICAL_COMPANY_STATISTICS_CONFIG,
    ...VERIFIED_COMPANY_FACTS_CONFIG,
  ];
  return source.filter(
    (item) =>
      item.isConfirmedForDisplay &&
      item.verificationStatus === "verified_company_record" &&
      item.displayValue !== null &&
      item.numericValue !== null &&
      item.numericValue > 0
  );
}

export type AboutStoryPillarId =
  | "destination_focus"
  | "mission_approach"
  | "transparent_corridors"
  | "direct_consultation";

export interface AboutStoryPillarConfig {
  id: AboutStoryPillarId;
  iconName: "compass" | "target" | "map" | "message";
}

export const ABOUT_STORY_PILLARS_CONFIG: readonly AboutStoryPillarConfig[] = [
  { id: "destination_focus", iconName: "compass" },
  { id: "mission_approach", iconName: "target" },
  { id: "transparent_corridors", iconName: "map" },
  { id: "direct_consultation", iconName: "message" },
] as const;

export type AboutFaqTopicId =
  | "destinations_covered"
  | "explore_journeys"
  | "request_quotation"
  | "inquiry_information"
  | "contact_channels"
  | "booking_conditions";

export interface AboutFaqItemConfig {
  id: AboutFaqTopicId;
  orderNumber: "01" | "02" | "03" | "04" | "05" | "06";
  isConfirmedForDisplay: boolean;
  relatedRouteHref?: string;
  opensInquiryDrawer?: boolean;
}

export const ABOUT_FAQ_ITEMS_CONFIG: readonly AboutFaqItemConfig[] = [
  {
    id: "destinations_covered",
    orderNumber: "01",
    isConfirmedForDisplay: true,
    relatedRouteHref: "/destinations",
  },
  {
    id: "explore_journeys",
    orderNumber: "02",
    isConfirmedForDisplay: true,
    relatedRouteHref: "/destinations#destination-journeys",
  },
  {
    id: "request_quotation",
    orderNumber: "03",
    isConfirmedForDisplay: true,
    opensInquiryDrawer: true,
  },
  {
    id: "inquiry_information",
    orderNumber: "04",
    isConfirmedForDisplay: true,
    opensInquiryDrawer: true,
  },
  {
    id: "contact_channels",
    orderNumber: "05",
    isConfirmedForDisplay: true,
    opensInquiryDrawer: true,
  },
  {
    id: "booking_conditions",
    orderNumber: "06",
    isConfirmedForDisplay: true,
    relatedRouteHref: "/destinations",
  },
] as const;
