import type { DestinationId } from "@/config/destinations";

export type JourneyColumnPosition = "left" | "center" | "right";
export type JourneyPricingModel = "quote" | "starting_price";
export type DataVerificationStatus =
  | "confirmed_repository_data"
  | "pending_team_confirmation";

export interface JourneyItineraryMetadata {
  /** Geographic corridor or city pairing (real geographic metadata, no fabricated days/inclusions) */
  corridorLabel: string;
  /** Booking structure label */
  inquiryFormatLabel: string;
  /** Internal catalog reference code for future API mapping */
  catalogCode: string;
}

export interface TripScheduleSlotRecord {
  /** Segment identifier ("morning" | "afternoon" | "evening") */
  periodId: "morning" | "afternoon" | "evening";
  /**
   * Optional exact clock window when supplied by a fixed-departure contract.
   * Kept `null` for private tailored routes so no fake departure times are invented.
   */
  exactTimeWindow: string | null;
}

export interface TripItineraryDayRecord {
  dayNumber: number;
  id: string;
  cityKey: string;
  imageWebp: string;
  imageJpg: string;
  objectPosition: string;
  scheduleSlots: readonly TripScheduleSlotRecord[];
  /**
   * Confirmed meals included on this day (e.g., "Breakfast & Dinner").
   * Kept `null` when meal board basis depends on the traveler's confirmed hotel quotation.
   */
  confirmedMealsLabel: string | null;
  /**
   * Confirmed hotel/overnight property name for this day when contracted.
   * Kept `null` when hotel selection is finalized during quotation.
   */
  confirmedOvernightHotel: string | null;
  verificationStatus: DataVerificationStatus;
}

export interface TripGalleryImageRecord {
  id: string;
  imageWebp: string;
  imageJpg: string;
  objectPosition: string;
  aspectRatio: "16:9" | "4:3" | "4:5";
  captionKey: string;
}

export interface TripAccommodationRecord {
  id: string;
  hotelName: string;
  location: string;
  nightsLabel: string;
  starRating: number | null;
  address: string | null;
  mapUrl: string | null;
  amenities: readonly string[];
  checkInInfo: string | null;
  checkOutInfo: string | null;
  roomDetails: string | null;
  photos: readonly TripGalleryImageRecord[];
  verificationStatus: "confirmed" | "pending_confirmation";
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
  /**
   * Ordered Day 1 / Day 2 / Day 3+ itinerary structure mapped to real destination corridors.
   */
  itineraryDays: readonly TripItineraryDayRecord[];
  /**
   * Verified hotel/accommodation records when supplied by the business.
   * Empty array (`[]`) when hotel selection is confirmed upon quotation.
   */
  accommodations: readonly TripAccommodationRecord[];
  accommodationStatus: DataVerificationStatus;
  /**
   * Destination-matched photo gallery using real project image assets.
   */
  gallery: readonly TripGalleryImageRecord[];
  /**
   * Optional confirmed fixed inclusions/exclusions from backend contracts.
   * When empty, the UI displays the transparent consultation & quotation scope breakdown.
   */
  confirmedInclusions: readonly string[];
  confirmedExclusions: readonly string[];
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
  exploreAllHref: "/destinations?destination=all#destination-journeys",
  cardCtaLabel: "Explore Journey",
  durationPlaceholderLabel: "Trip duration",
  quotePlaceholderLabel: "Request a quote",
};

/**
 * Centralized, strongly typed configuration for all five existing WEST GLOBAL TOURS journeys.
 * Every trip defines its unique ID, slug, `/trips/[slug]` route, overview metadata,
 * ordered Day 1 / Day 2 / Day 3 itinerary records, accommodation structure, and
 * destination-matched image gallery using verified local assets.
 *
 * No fabricated prices, fake hotel names, unverified star ratings, or invented policies are included.
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
    itineraryDays: [
      {
        dayNumber: 1,
        id: "cairo-luxor-day-1",
        cityKey: "Cairo & Giza Plateau",
        imageWebp: "/images/west-travel/egypt-hero.webp",
        imageJpg: "/images/west-travel/egypt-hero.jpg",
        objectPosition: "52% 48%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 2,
        id: "cairo-luxor-day-2",
        cityKey: "Historic Cairo & Nile Corridor",
        imageWebp: "/images/west-travel/final-cta-nile-panorama.webp",
        imageJpg: "/images/west-travel/final-cta-nile-panorama.jpg",
        objectPosition: "50% 52%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 3,
        id: "cairo-luxor-day-3",
        cityKey: "Luxor Temple Sanctuaries & Nile Sunset",
        imageWebp: "/images/west-travel/cairo-luxor-card.webp",
        imageJpg: "/images/west-travel/cairo-luxor-card.jpg",
        objectPosition: "50% 48%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
    ],
    accommodations: [],
    accommodationStatus: "pending_team_confirmation",
    gallery: [
      {
        id: "cairo-luxor-gal-1",
        imageWebp: "/images/west-travel/cairo-luxor-card.webp",
        imageJpg: "/images/west-travel/cairo-luxor-card.jpg",
        objectPosition: "50% 48%",
        aspectRatio: "16:9",
        captionKey: "luxor_nile_sanctuary",
      },
      {
        id: "cairo-luxor-gal-2",
        imageWebp: "/images/west-travel/egypt-hero.webp",
        imageJpg: "/images/west-travel/egypt-hero.jpg",
        objectPosition: "52% 48%",
        aspectRatio: "16:9",
        captionKey: "giza_pyramids_sunset",
      },
      {
        id: "cairo-luxor-gal-3",
        imageWebp: "/images/west-travel/final-cta-nile-panorama.webp",
        imageJpg: "/images/west-travel/final-cta-nile-panorama.jpg",
        objectPosition: "50% 54%",
        aspectRatio: "16:9",
        captionKey: "nile_felucca_horizon",
      },
      {
        id: "cairo-luxor-gal-4",
        imageWebp: "/images/traveler-stories/story-luxor-temple.webp",
        imageJpg: "/images/traveler-stories/story-luxor-temple.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "4:3",
        captionKey: "luxor_colonnade_detail",
      },
    ],
    confirmedInclusions: [],
    confirmedExclusions: [],
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
    itineraryDays: [
      {
        dayNumber: 1,
        id: "turkiye-culture-day-1",
        cityKey: "Sultanahmet & Historic Peninsula",
        imageWebp: "/images/west-travel/turkiye-hero.webp",
        imageJpg: "/images/west-travel/turkiye-hero.jpg",
        objectPosition: "54% 50%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 2,
        id: "turkiye-culture-day-2",
        cityKey: "Golden Horn & Imperial Bazaars",
        imageWebp: "/images/west-travel/turkiye-card.webp",
        imageJpg: "/images/west-travel/turkiye-card.jpg",
        objectPosition: "52% 50%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 3,
        id: "turkiye-culture-day-3",
        cityKey: "Two-Continent Culinary & Waterfront Quarters",
        imageWebp: "/images/west-travel/istanbul-bosphorus-card.webp",
        imageJpg: "/images/west-travel/istanbul-bosphorus-card.jpg",
        objectPosition: "50% 50%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
    ],
    accommodations: [],
    accommodationStatus: "pending_team_confirmation",
    gallery: [
      {
        id: "turkiye-culture-gal-1",
        imageWebp: "/images/west-travel/turkiye-hero.webp",
        imageJpg: "/images/west-travel/turkiye-hero.jpg",
        objectPosition: "54% 50%",
        aspectRatio: "16:9",
        captionKey: "istanbul_historic_peninsula",
      },
      {
        id: "turkiye-culture-gal-2",
        imageWebp: "/images/west-travel/turkiye-card.webp",
        imageJpg: "/images/west-travel/turkiye-card.jpg",
        objectPosition: "52% 50%",
        aspectRatio: "4:5",
        captionKey: "golden_horn_minarets",
      },
      {
        id: "turkiye-culture-gal-3",
        imageWebp: "/images/west-travel/istanbul-bosphorus-card.webp",
        imageJpg: "/images/west-travel/istanbul-bosphorus-card.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "16:9",
        captionKey: "bosphorus_maidens_tower",
      },
      {
        id: "turkiye-culture-gal-4",
        imageWebp: "/images/traveler-stories/story-istanbul-sunset.webp",
        imageJpg: "/images/traveler-stories/story-istanbul-sunset.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "4:3",
        captionKey: "istanbul_dusk_waterfront",
      },
    ],
    confirmedInclusions: [],
    confirmedExclusions: [],
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
    itineraryDays: [
      {
        dayNumber: 1,
        id: "dubai-city-day-1",
        cityKey: "Downtown Dubai & Burj Khalifa Corridor",
        imageWebp: "/images/west-travel/dubai-hero.webp",
        imageJpg: "/images/west-travel/dubai-hero.jpg",
        objectPosition: "54% 44%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 2,
        id: "dubai-city-day-2",
        cityKey: "Arabian Gulf Waterfront & Marina Promenades",
        imageWebp: "/images/west-travel/dubai-card.webp",
        imageJpg: "/images/west-travel/dubai-card.jpg",
        objectPosition: "58% 44%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 3,
        id: "dubai-city-day-3",
        cityKey: "Historic Creek Heritage & Desert Horizon",
        imageWebp: "/images/traveler-stories/story-dubai-skyline.webp",
        imageJpg: "/images/traveler-stories/story-dubai-skyline.jpg",
        objectPosition: "50% 50%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
    ],
    accommodations: [],
    accommodationStatus: "pending_team_confirmation",
    gallery: [
      {
        id: "dubai-city-gal-1",
        imageWebp: "/images/west-travel/dubai-hero.webp",
        imageJpg: "/images/west-travel/dubai-hero.jpg",
        objectPosition: "54% 44%",
        aspectRatio: "16:9",
        captionKey: "downtown_dubai_burj",
      },
      {
        id: "dubai-city-gal-2",
        imageWebp: "/images/west-travel/dubai-card.webp",
        imageJpg: "/images/west-travel/dubai-card.jpg",
        objectPosition: "58% 44%",
        aspectRatio: "4:5",
        captionKey: "dubai_waterfront_promenade",
      },
      {
        id: "dubai-city-gal-3",
        imageWebp: "/images/traveler-stories/story-dubai-skyline.webp",
        imageJpg: "/images/traveler-stories/story-dubai-skyline.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "4:3",
        captionKey: "arabian_gulf_skyline",
      },
    ],
    confirmedInclusions: [],
    confirmedExclusions: [],
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
    itineraryDays: [
      {
        dayNumber: 1,
        id: "egypt-heritage-day-1",
        cityKey: "Giza Plateau & Great Pyramids Sanctuary",
        imageWebp: "/images/west-travel/egypt-hero.webp",
        imageJpg: "/images/west-travel/egypt-hero.jpg",
        objectPosition: "50% 48%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 2,
        id: "egypt-heritage-day-2",
        cityKey: "Sakkara Necropolis & Ancient Memphis",
        imageWebp: "/images/west-travel/egypt-card.webp",
        imageJpg: "/images/west-travel/egypt-card.jpg",
        objectPosition: "50% 50%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 3,
        id: "egypt-heritage-day-3",
        cityKey: "Old Cairo Heritage & Nile Evening Perspective",
        imageWebp: "/images/traveler-stories/story-giza-pyramids.webp",
        imageJpg: "/images/traveler-stories/story-giza-pyramids.jpg",
        objectPosition: "50% 50%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
    ],
    accommodations: [],
    accommodationStatus: "pending_team_confirmation",
    gallery: [
      {
        id: "egypt-heritage-gal-1",
        imageWebp: "/images/west-travel/egypt-hero.webp",
        imageJpg: "/images/west-travel/egypt-hero.jpg",
        objectPosition: "50% 48%",
        aspectRatio: "16:9",
        captionKey: "giza_pyramids_sunset",
      },
      {
        id: "egypt-heritage-gal-2",
        imageWebp: "/images/west-travel/egypt-card.webp",
        imageJpg: "/images/west-travel/egypt-card.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "4:5",
        captionKey: "sakkara_desert_horizon",
      },
      {
        id: "egypt-heritage-gal-3",
        imageWebp: "/images/traveler-stories/story-giza-pyramids.webp",
        imageJpg: "/images/traveler-stories/story-giza-pyramids.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "4:3",
        captionKey: "giza_plateau_camel_view",
      },
      {
        id: "egypt-heritage-gal-4",
        imageWebp: "/images/traveler-stories/story-nile-felucca.webp",
        imageJpg: "/images/traveler-stories/story-nile-felucca.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "4:3",
        captionKey: "nile_felucca_horizon",
      },
    ],
    confirmedInclusions: [],
    confirmedExclusions: [],
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
    itineraryDays: [
      {
        dayNumber: 1,
        id: "bosphorus-getaway-day-1",
        cityKey: "Bosphorus Strait & European Waterfront Palaces",
        imageWebp: "/images/west-travel/istanbul-bosphorus-card.webp",
        imageJpg: "/images/west-travel/istanbul-bosphorus-card.jpg",
        objectPosition: "50% 50%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 2,
        id: "bosphorus-getaway-day-2",
        cityKey: "Üsküdar Asian Shore & Maiden's Tower Promenades",
        imageWebp: "/images/traveler-stories/story-bosphorus-ferry.webp",
        imageJpg: "/images/traveler-stories/story-bosphorus-ferry.jpg",
        objectPosition: "50% 50%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
      {
        dayNumber: 3,
        id: "bosphorus-getaway-day-3",
        cityKey: "Karaköy, Galata & Golden Horn Sunset",
        imageWebp: "/images/west-travel/turkiye-hero.webp",
        imageJpg: "/images/west-travel/turkiye-hero.jpg",
        objectPosition: "54% 50%",
        scheduleSlots: [
          { periodId: "morning", exactTimeWindow: null },
          { periodId: "afternoon", exactTimeWindow: null },
          { periodId: "evening", exactTimeWindow: null },
        ],
        confirmedMealsLabel: null,
        confirmedOvernightHotel: null,
        verificationStatus: "confirmed_repository_data",
      },
    ],
    accommodations: [],
    accommodationStatus: "pending_team_confirmation",
    gallery: [
      {
        id: "bosphorus-getaway-gal-1",
        imageWebp: "/images/west-travel/istanbul-bosphorus-card.webp",
        imageJpg: "/images/west-travel/istanbul-bosphorus-card.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "16:9",
        captionKey: "bosphorus_maidens_tower",
      },
      {
        id: "bosphorus-getaway-gal-2",
        imageWebp: "/images/traveler-stories/story-bosphorus-ferry.webp",
        imageJpg: "/images/traveler-stories/story-bosphorus-ferry.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "4:3",
        captionKey: "bosphorus_ferry_crossing",
      },
      {
        id: "bosphorus-getaway-gal-3",
        imageWebp: "/images/west-travel/turkiye-hero.webp",
        imageJpg: "/images/west-travel/turkiye-hero.jpg",
        objectPosition: "54% 50%",
        aspectRatio: "16:9",
        captionKey: "istanbul_historic_peninsula",
      },
      {
        id: "bosphorus-getaway-gal-4",
        imageWebp: "/images/traveler-stories/story-istanbul-sunset.webp",
        imageJpg: "/images/traveler-stories/story-istanbul-sunset.jpg",
        objectPosition: "50% 50%",
        aspectRatio: "4:3",
        captionKey: "istanbul_dusk_waterfront",
      },
    ],
    confirmedInclusions: [],
    confirmedExclusions: [],
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

export function getFeaturedJourneyBySlug(
  slug: string
): FeaturedJourneyRecord | undefined {
  return FEATURED_TRIPS_CONFIG.find((item) => item.slug === slug);
}
