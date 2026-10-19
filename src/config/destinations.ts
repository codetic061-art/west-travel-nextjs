export type DestinationId = "egypt" | "dubai" | "turkiye";

export interface DestinationAssetConfig {
  id: DestinationId;
  orderNumber: "01" | "02" | "03";
  editorialRole: "featured" | "compact";
  heroImageWebp: string;
  heroImageJpg: string;
  cardImageWebp: string;
  cardImageJpg: string;
  videoMp4: string;
  videoSourceNote: string;
  videoLicense: string;
  objectPosition: string;
  sliceObjectPosition: string;
  accentColor: string;
  coordinates: string;
}

/**
 * Centralized, replaceable asset configuration for the three primary
 * WEST TRAVEL destinations: Egypt, Dubai, and Türkiye.
 *
 * Editorial card layout on desktop:
 * - Featured large vertical card: Istanbul - Türkiye (02) on the left column
 * - Two compact stacked cards: Cairo - Egypt (01) and Dubai - UAE (03) on the right column,
 *   matching the asymmetric editorial composition in the reference design.
 */
export const DESTINATIONS_CONFIG: readonly DestinationAssetConfig[] = [
  {
    id: "egypt",
    orderNumber: "01",
    editorialRole: "compact",
    heroImageWebp: "/images/west-travel/egypt-hero.webp",
    heroImageJpg: "/images/west-travel/egypt-hero.jpg",
    cardImageWebp: "/images/west-travel/egypt-card.webp",
    cardImageJpg: "/images/west-travel/egypt-card.jpg",
    videoMp4: "/videos/west-travel/egypt.mp4",
    videoSourceNote:
      "Local H.264 MP4 aerial motion loop synthesized from WEST TRAVEL Giza Pyramids sunset asset (Canva workspace returned no video designs)",
    videoLicense: "Royalty-free commercial web usage (WEST TRAVEL project asset bundle)",
    objectPosition: "52% 48%",
    sliceObjectPosition: "46% 52%",
    accentColor: "#E5A93C",
    coordinates: "29.9792° N, 31.1342° E",
  },
  {
    id: "turkiye",
    orderNumber: "02",
    editorialRole: "featured",
    heroImageWebp: "/images/west-travel/turkiye-hero.webp",
    heroImageJpg: "/images/west-travel/turkiye-hero.jpg",
    cardImageWebp: "/images/west-travel/turkiye-card.webp",
    cardImageJpg: "/images/west-travel/turkiye-card.jpg",
    videoMp4: "/videos/west-travel/turkiye.mp4",
    videoSourceNote:
      "Local H.264 MP4 twilight Bosphorus motion loop synthesized from WEST TRAVEL Istanbul skyline asset (Canva workspace returned no video designs)",
    videoLicense: "Royalty-free commercial web usage (WEST TRAVEL project asset bundle)",
    objectPosition: "54% 50%",
    sliceObjectPosition: "54% 52%",
    accentColor: "#2DD4BF",
    coordinates: "41.0082° N, 28.9784° E",
  },
  {
    id: "dubai",
    orderNumber: "03",
    editorialRole: "compact",
    heroImageWebp: "/images/west-travel/dubai-hero.webp",
    heroImageJpg: "/images/west-travel/dubai-hero.jpg",
    cardImageWebp: "/images/west-travel/dubai-card.webp",
    cardImageJpg: "/images/west-travel/dubai-card.jpg",
    videoMp4: "/videos/west-travel/dubai.mp4",
    videoSourceNote:
      "Local H.264 MP4 blue-hour skyline motion loop synthesized from WEST TRAVEL Burj Khalifa asset (Canva workspace returned no video designs)",
    videoLicense: "Royalty-free commercial web usage (WEST TRAVEL project asset bundle)",
    objectPosition: "58% 44%",
    sliceObjectPosition: "36% 42%",
    accentColor: "#38BDF8",
    coordinates: "25.1972° N, 55.2744° E",
  },
] as const;
