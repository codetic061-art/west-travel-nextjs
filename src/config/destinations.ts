export type DestinationId = "egypt" | "turkiye" | "dubai";

export interface CanvaVideoAssetMetadata {
  designId: string;
  watchUrl: string;
  exportJobId: string;
  posterExportJobId: string;
  dimensions: {
    width: number;
    height: number;
  };
  exportStatus: "canva_mp4_exported_local_verified";
}

export interface DestinationAssetConfig {
  id: DestinationId;
  slug: DestinationId;
  orderNumber: "01" | "02" | "03";
  editorialRole: "featured" | "compact";
  heroImageWebp: string;
  heroImageJpg: string;
  posterImageWebp: string;
  posterImageJpg: string;
  cardImageWebp: string;
  cardImageJpg: string;
  secondaryPreviewWebp: string;
  secondaryPreviewJpg: string;
  videoMp4: string;
  videoMp4SecondaryPath: string;
  canvaAsset: CanvaVideoAssetMetadata;
  videoSourceNote: string;
  videoLicense: string;
  objectPosition: string;
  sliceObjectPosition: string;
  accentColor: string;
  coordinates: string;
  discoveryHref: string;
  inquiryCtaTarget: string;
  associatedJourneySlugs: readonly string[];
}

/**
 * Centralized, typed destination configuration for the three primary
 * WEST GLOBAL TOURS destinations in strict order:
 * 01 — Egypt   (Canva Design DAHYpsUn6_I)
 * 02 — Türkiye (Canva Design DAHYp4Nj-j4)
 * 03 — Dubai   (Canva Design DAHYpw4T34I)
 *
 * Editorial card layout on Homepage Hero desktop:
 * - Featured large vertical card: Istanbul - Türkiye (02) on the left column
 * - Two compact stacked cards: Cairo - Egypt (01) and Dubai - UAE (03) on the right column,
 *   preserving the approved Homepage Hero composition.
 */
export const DESTINATIONS_CONFIG: readonly DestinationAssetConfig[] = [
  {
    id: "egypt",
    slug: "egypt",
    orderNumber: "01",
    editorialRole: "compact",
    heroImageWebp: "/images/west-travel/egypt-hero.webp",
    heroImageJpg: "/images/west-travel/egypt-hero.jpg",
    posterImageWebp: "/images/west-travel/hero-egypt-poster.webp",
    posterImageJpg: "/images/west-travel/hero-egypt-poster.jpg",
    cardImageWebp: "/images/west-travel/egypt-card.webp",
    cardImageJpg: "/images/west-travel/egypt-card.jpg",
    secondaryPreviewWebp: "/images/west-travel/cairo-luxor-card.webp",
    secondaryPreviewJpg: "/images/west-travel/cairo-luxor-card.jpg",
    videoMp4: "/videos/hero-egypt.mp4",
    videoMp4SecondaryPath: "/videos/west-travel/hero-egypt.mp4",
    canvaAsset: {
      designId: "DAHYpsUn6_I",
      watchUrl: "https://www.canva.com/design/DAHYpsUn6_I/8ov-RLJict6P46zGXQaD4w/watch",
      exportJobId: "835021ab-18c7-4f16-bb3c-1376a3ae27d5",
      posterExportJobId: "4702f5c2-e050-4396-98e6-f3c9a788d9a9",
      dimensions: { width: 1280, height: 720 },
      exportStatus: "canva_mp4_exported_local_verified",
    },
    videoSourceNote:
      "Canva design DAHYpsUn6_I (Video 1 — Egypt) exported via Canva MP4 API (job 835021ab-18c7-4f16-bb3c-1376a3ae27d5) with verified local H.264 MP4 asset at /videos/hero-egypt.mp4 and /videos/west-travel/hero-egypt.mp4",
    videoLicense: "WEST GLOBAL TOURS supplied Canva design asset (DAHYpsUn6_I)",
    objectPosition: "52% 48%",
    sliceObjectPosition: "46% 52%",
    accentColor: "#E5A93C",
    coordinates: "29.9792° N, 31.1342° E",
    discoveryHref: "/destinations?destination=egypt",
    inquiryCtaTarget: "#trip-inquiry-drawer",
    associatedJourneySlugs: ["cairo-luxor-discovery", "egypt-heritage-trail"],
  },
  {
    id: "turkiye",
    slug: "turkiye",
    orderNumber: "02",
    editorialRole: "featured",
    heroImageWebp: "/images/west-travel/turkiye-hero.webp",
    heroImageJpg: "/images/west-travel/turkiye-hero.jpg",
    posterImageWebp: "/images/west-travel/hero-turkiye-poster.webp",
    posterImageJpg: "/images/west-travel/hero-turkiye-poster.jpg",
    cardImageWebp: "/images/west-travel/turkiye-card.webp",
    cardImageJpg: "/images/west-travel/turkiye-card.jpg",
    secondaryPreviewWebp: "/images/west-travel/istanbul-bosphorus-card.webp",
    secondaryPreviewJpg: "/images/west-travel/istanbul-bosphorus-card.jpg",
    videoMp4: "/videos/hero-turkiye.mp4",
    videoMp4SecondaryPath: "/videos/west-travel/hero-turkiye.mp4",
    canvaAsset: {
      designId: "DAHYp4Nj-j4",
      watchUrl: "https://www.canva.com/design/DAHYp4Nj-j4/g75cfpa-a1htT74SABedzg/watch",
      exportJobId: "a7df0b94-f44e-4298-969a-d94e1690838f",
      posterExportJobId: "6d5dfef2-6fd6-4579-be66-79a1ff019ace",
      dimensions: { width: 1280, height: 720 },
      exportStatus: "canva_mp4_exported_local_verified",
    },
    videoSourceNote:
      "Canva design DAHYp4Nj-j4 (Video 2 — Türkiye) exported via Canva MP4 API (job a7df0b94-f44e-4298-969a-d94e1690838f) with verified local H.264 MP4 asset at /videos/hero-turkiye.mp4 and /videos/west-travel/hero-turkiye.mp4",
    videoLicense: "WEST GLOBAL TOURS supplied Canva design asset (DAHYp4Nj-j4)",
    objectPosition: "54% 50%",
    sliceObjectPosition: "54% 52%",
    accentColor: "#2DD4BF",
    coordinates: "41.0082° N, 28.9784° E",
    discoveryHref: "/destinations?destination=turkiye",
    inquiryCtaTarget: "#trip-inquiry-drawer",
    associatedJourneySlugs: ["turkiye-culture-escape", "istanbul-bosphorus-getaway"],
  },
  {
    id: "dubai",
    slug: "dubai",
    orderNumber: "03",
    editorialRole: "compact",
    heroImageWebp: "/images/west-travel/dubai-hero.webp",
    heroImageJpg: "/images/west-travel/dubai-hero.jpg",
    posterImageWebp: "/images/west-travel/hero-dubai-poster.webp",
    posterImageJpg: "/images/west-travel/hero-dubai-poster.jpg",
    cardImageWebp: "/images/west-travel/dubai-card.webp",
    cardImageJpg: "/images/west-travel/dubai-card.jpg",
    secondaryPreviewWebp: "/images/traveler-stories/story-dubai-skyline.webp",
    secondaryPreviewJpg: "/images/traveler-stories/story-dubai-skyline.jpg",
    videoMp4: "/videos/hero-dubai.mp4",
    videoMp4SecondaryPath: "/videos/west-travel/hero-dubai.mp4",
    canvaAsset: {
      designId: "DAHYpw4T34I",
      watchUrl: "https://www.canva.com/design/DAHYpw4T34I/0DPZSRcjpzdJb8AtdNfOpA/watch",
      exportJobId: "7b02a25b-7ca1-4ce8-895f-a6f9383942e7",
      posterExportJobId: "8580c904-6d40-4d53-bd46-68120abd3ee1",
      dimensions: { width: 1280, height: 720 },
      exportStatus: "canva_mp4_exported_local_verified",
    },
    videoSourceNote:
      "Canva design DAHYpw4T34I (Video 3 — Dubai) exported via Canva MP4 API (job 7b02a25b-7ca1-4ce8-895f-a6f9383942e7) with verified local H.264 MP4 asset at /videos/hero-dubai.mp4 and /videos/west-travel/hero-dubai.mp4",
    videoLicense: "WEST GLOBAL TOURS supplied Canva design asset (DAHYpw4T34I)",
    objectPosition: "58% 44%",
    sliceObjectPosition: "36% 42%",
    accentColor: "#38BDF8",
    coordinates: "25.1972° N, 55.2744° E",
    discoveryHref: "/destinations?destination=dubai",
    inquiryCtaTarget: "#trip-inquiry-drawer",
    associatedJourneySlugs: ["dubai-city-experience"],
  },
] as const;

export function getDestinationById(id: string | null | undefined): DestinationAssetConfig | undefined {
  if (!id) return undefined;
  const normalized = id.toLowerCase().trim();
  return DESTINATIONS_CONFIG.find((dest) => dest.id === normalized || dest.slug === normalized);
}

export function resolveDestinationId(
  input: string | null | undefined,
  fallback: DestinationId = "egypt"
): DestinationId {
  const found = getDestinationById(input);
  return found ? found.id : fallback;
}
