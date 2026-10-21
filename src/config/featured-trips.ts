import type { DestinationId } from "@/config/destinations";

export type JourneyColumnPosition = "left" | "center" | "right";
export type JourneyPricingModel = "quote" | "starting_price";

export interface JourneyItineraryMetadata {
  /** Geographic corridor or city pairing (real geographic metadata, no fabricated days/inclusions) */
  corridorLabel: string;
  /** Booking structure label */
  inquiryFormatLabel: string;
  /** Internal catalog reference code for future API mapping */
  catalogCode: string;
}

export interface FeaturedJourneyRecord {
  id: string;
  slug: string;
  href: string;
  destinationId: DestinationId;
  columnPosition: JourneyColumnPosition;
  columnStackIndex: 0 | 1;
  carouselIndex: number;
  isFeaturedCenter: boolean;
  imageWebp: string;
  imageJpg: string;
  imageAlt: string;
  objectPosition: string;
  locationLabel: string;
  title: string;
  /**
   * Real trip duration when connected to backend API (e.g., "7 Days / 6 Nights").
   * Kept null in placeholder state so the UI displays "Trip duration" without inventing data.
   */
  durationLabel: string | null;
  /**
   * Real starting price when connected to backend API.
   * Kept null in placeholder state so the UI displays "Request a quote" without inventing prices.
   */
  startingPriceLabel: string | null;
  pricingModel: JourneyPricingModel;
  /**
   * Optional real journey description shown on desktop hover / touch expansion.
   * Can be replaced or set to null by backend API records.
   */
  description: string | null;
  itineraryMetadata: JourneyItineraryMetadata;
}

export interface FeaturedTripsSectionCopyConfig {
  eyebrow: string;
  heading: string;
  supportingText: string;
  exploreAllCtaLabel: string;
  exploreAllHref: string;
  cardCtaLabel: string;
  durationPlaceholderLabel: string;
  quotePlaceholderLabel: string;
}

export const FEATURED_TRIPS_SECTION_CONFIG: FeaturedTripsSectionCopyConfig = {
  eyebrow: "FEATURED TRIPS",
  heading: "Find Your Next Journey",
  supportingText: "Explore curated trips across Egypt, Dubai and Türkiye.",
  exploreAllCtaLabel: "Explore All Trips",
  exploreAllHref: "/destinations",
  cardCtaLabel: "Explore Journey",
  durationPlaceholderLabel: "Trip duration",
  quotePlaceholderLabel: "Request a quote",
};

/**
 * Data-driven configuration for the five Featured Trips journey cards.
 * Arranged on desktop as:
 * - Left column (2 stacked compact cards): Cairo & Luxor Discovery, Türkiye Culture Escape
 * - Center column (1 tall featured card): Dubai City Experience
 * - Right column (2 stacked compact cards): Egypt Heritage Trail, Istanbul & Bosphorus Getaway
 *
 * No fabricated prices, trip durations, star ratings, or fake reviews are included.
 */
export const FEATURED_TRIPS_CONFIG: readonly FeaturedJourneyRecord[] = [
  {
    id: "cairo-luxor-discovery",
    slug: "cairo-luxor-discovery",
    href: "/trips/cairo-luxor-discovery",
    destinationId: "egypt",
    columnPosition: "left",
    columnStackIndex: 0,
    carouselIndex: 0,
    isFeaturedCenter: false,
    imageWebp: "/images/west-travel/cairo-luxor-card.webp",
    imageJpg: "/images/west-travel/cairo-luxor-card.jpg",
    imageAlt:
      "Golden sunset over the Nile River in Luxor and Cairo with ancient Egyptian temple columns, date palms, and a white felucca sailboat",
    objectPosition: "50% 48%",
    locationLabel: "Cairo, Egypt",
    title: "Cairo & Luxor Discovery",
    durationLabel: null,
    startingPriceLabel: null,
    pricingModel: "quote",
    description:
      "Navigate the historic Nile corridor linking Cairo's grand heritage with the riverside temple sanctuaries of Luxor.",
    itineraryMetadata: {
      corridorLabel: "Cairo · Nile Valley · Luxor",
      inquiryFormatLabel: "Tailored Private Inquiry",
      catalogCode: "WT-EG-101",
    },
  },
  {
    id: "turkiye-culture-escape",
    slug: "turkiye-culture-escape",
    href: "/trips/turkiye-culture-escape",
    destinationId: "turkiye",
    columnPosition: "left",
    columnStackIndex: 1,
    carouselIndex: 1,
    isFeaturedCenter: false,
    imageWebp: "/images/west-travel/turkiye-card.webp",
    imageJpg: "/images/west-travel/turkiye-card.jpg",
    imageAlt:
      "Istanbul imperial mosque domes and minarets along the waterfront at golden sunset with boats on the water",
    objectPosition: "52% 50%",
    locationLabel: "Istanbul, Türkiye",
    title: "Türkiye Culture Escape",
    durationLabel: null,
    startingPriceLabel: null,
    pricingModel: "quote",
    description:
      "Experience Istanbul's historic peninsula, imperial architecture, and culinary traditions across Europe and Asia.",
    itineraryMetadata: {
      corridorLabel: "Historic Peninsula · Golden Horn",
      inquiryFormatLabel: "Tailored Private Inquiry",
      catalogCode: "WT-TR-102",
    },
  },
  {
    id: "dubai-city-experience",
    slug: "dubai-city-experience",
    href: "/trips/dubai-city-experience",
    destinationId: "dubai",
    columnPosition: "center",
    columnStackIndex: 0,
    carouselIndex: 2,
    isFeaturedCenter: true,
    imageWebp: "/images/west-travel/dubai-hero.webp",
    imageJpg: "/images/west-travel/dubai-hero.jpg",
    imageAlt:
      "Burj Khalifa and Downtown Dubai skyline reflected in waterfront promenade waters at golden sunset",
    objectPosition: "54% 44%",
    locationLabel: "Dubai, UAE",
    title: "Dubai City Experience",
    durationLabel: null,
    startingPriceLabel: null,
    pricingModel: "quote",
    description:
      "Discover contemporary architectural icons, waterfront promenades, and desert horizons in the heart of Dubai.",
    itineraryMetadata: {
      corridorLabel: "Downtown Dubai · Waterfront · Arabian Gulf",
      inquiryFormatLabel: "Featured Signature Journey",
      catalogCode: "WT-AE-201",
    },
  },
  {
    id: "egypt-heritage-trail",
    slug: "egypt-heritage-trail",
    href: "/trips/egypt-heritage-trail",
    destinationId: "egypt",
    columnPosition: "right",
    columnStackIndex: 0,
    carouselIndex: 3,
    isFeaturedCenter: false,
    imageWebp: "/images/west-travel/egypt-hero.webp",
    imageJpg: "/images/west-travel/egypt-hero.jpg",
    imageAlt:
      "Great Pyramids of Giza rising above desert sands under warm golden sunset rays in Egypt",
    objectPosition: "50% 48%",
    locationLabel: "Giza, Egypt",
    title: "Egypt Heritage Trail",
    durationLabel: null,
    startingPriceLabel: null,
    pricingModel: "quote",
    description:
      "Trace antiquity across the Giza Plateau and Old Cairo landmarks with curated archaeological context.",
    itineraryMetadata: {
      corridorLabel: "Giza Plateau · Memphis · Sakkara",
      inquiryFormatLabel: "Tailored Private Inquiry",
      catalogCode: "WT-EG-103",
    },
  },
  {
    id: "istanbul-bosphorus-getaway",
    slug: "istanbul-bosphorus-getaway",
    href: "/trips/istanbul-bosphorus-getaway",
    destinationId: "turkiye",
    columnPosition: "right",
    columnStackIndex: 1,
    carouselIndex: 4,
    isFeaturedCenter: false,
    imageWebp: "/images/west-travel/istanbul-bosphorus-card.webp",
    imageJpg: "/images/west-travel/istanbul-bosphorus-card.jpg",
    imageAlt:
      "Maiden's Tower on the Bosphorus strait at sunset with boats and distant Istanbul mosque silhouettes",
    objectPosition: "50% 50%",
    locationLabel: "Istanbul, Türkiye",
    title: "Istanbul & Bosphorus Getaway",
    durationLabel: null,
    startingPriceLabel: null,
    pricingModel: "quote",
    description:
      "Sail between two continents along the Bosphorus strait past Maiden's Tower, waterfront palaces, and historic neighborhoods.",
    itineraryMetadata: {
      corridorLabel: "Bosphorus Strait · Üsküdar · Karaköy",
      inquiryFormatLabel: "Tailored Private Inquiry",
      catalogCode: "WT-TR-104",
    },
  },
] as const;

export function getFeaturedJourneys(
  customRecords?: readonly FeaturedJourneyRecord[]
): readonly FeaturedJourneyRecord[] {
  if (customRecords !== undefined) {
    return customRecords;
  }
  return FEATURED_TRIPS_CONFIG;
}

export function getJourneysByDestination(
  destinationId: DestinationId | "all",
  customRecords?: readonly FeaturedJourneyRecord[]
): readonly FeaturedJourneyRecord[] {
  const source = getFeaturedJourneys(customRecords);
  if (destinationId === "all") {
    return source;
  }
  return source.filter((item) => item.destinationId === destinationId);
}

export function getFeaturedJourneyBySlug(slug: string): FeaturedJourneyRecord | undefined {
  return FEATURED_TRIPS_CONFIG.find((item) => item.slug === slug);
}
