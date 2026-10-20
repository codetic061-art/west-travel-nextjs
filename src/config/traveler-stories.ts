import type { DestinationId } from "./destinations";
import type { SupportedLocale } from "@/i18n/hero-dictionary";

export type StoryId =
  | "dubai-waterfront"
  | "luxor-colonnade"
  | "giza-desert-palms"
  | "istanbul-sunset"
  | "bosphorus-twilight"
  | "nile-felucca";

export type ReviewVerificationStatus =
  | "verified_customer_review"
  | "sample_development_preview";

export interface TravelerStoryRecord {
  id: StoryId | string;
  destinationId: DestinationId;
  /** Primary optimized landscape photograph (WebP) */
  imageWebp: string;
  /** Fallback landscape photograph (JPEG) */
  imageJpg: string;
  /** Optional star rating (1 to 5). Rendered only when supported by the review record. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Reviewer display name or initials */
  reviewerName: string;
  /** Default English short testimonial excerpt */
  defaultQuote: string;
  /** Default English destination / location label */
  defaultLocation: string;
  /** Default English accessible image description */
  defaultImageAlt: string;
  /** Optional link to verified external or first-party review record */
  reviewUrl?: string;
  /** Optional ISO date string of the review */
  reviewedAt?: string;
  /**
   * Explicitly distinguishes temporary illustrative development records from
   * verified customer testimonials supplied by the backend.
   */
  isSampleData: boolean;
  verificationStatus: ReviewVerificationStatus;
  verificationNote: string;
}

export interface TravelerStoriesSectionConfig {
  sectionId: string;
  eyebrow: string;
  heading: string;
  supportingText: string;
  desktopVisibleCount: 4;
  tabletVisibleCount: 2;
  mobileVisibleCount: 1;
  /** Resting Polaroid tilt angles (in degrees) for the 4 visible desktop hanging slots */
  slotRestingAnglesDeg: readonly [number, number, number, number];
  /** Vertical rope catenary sag offsets (in px) for the 4 visible desktop hanging slots */
  slotRopeSagPx: readonly [number, number, number, number];
}

export const TRAVELER_STORIES_SECTION_CONFIG: TravelerStoriesSectionConfig = {
  sectionId: "traveler-stories",
  eyebrow: "TRAVELER STORIES",
  heading: "Our Latest Stories",
  supportingText:
    "Real traveler experiences, from unforgettable places to life-changing moments around the world.",
  desktopVisibleCount: 4,
  tabletVisibleCount: 2,
  mobileVisibleCount: 1,
  slotRestingAnglesDeg: [-2.8, 1.5, -1.5, 2.8],
  slotRopeSagPx: [0, 14, 14, 0],
};

/**
 * Temporary sample development dataset modeled after the approved visual reference.
 *
 * IMPORTANT DATA INTEGRITY NOTE:
 * These entries are explicitly flagged with `isSampleData: true` and
 * `verificationStatus: "sample_development_preview"` so illustrative layout copy
 * is clearly separated from verified production customer reviews. Pass verified
 * `TravelerStoryRecord[]` items with `isSampleData: false` and
 * `verificationStatus: "verified_customer_review"` into `<TravelerStoriesSection stories={...} />`
 * once connected to the production reviews API.
 */
export const SAMPLE_TRAVELER_STORIES: readonly TravelerStoryRecord[] = [
  {
    id: "dubai-waterfront",
    destinationId: "dubai",
    imageWebp: "/images/traveler-stories/story-dubai-skyline.webp",
    imageJpg: "/images/traveler-stories/story-dubai-skyline.jpg",
    rating: 5,
    reviewerName: "Hannah C.",
    defaultQuote: "Beautiful, breathtaking and so full of life!",
    defaultLocation: "Dubai, UAE",
    defaultImageAlt:
      "Downtown Dubai skyline and Burj Khalifa glowing above the waterfront at sunset",
    isSampleData: true,
    verificationStatus: "sample_development_preview",
    verificationNote:
      "Sample preview entry from approved design reference; replace with verified customer review record before launch.",
  },
  {
    id: "luxor-colonnade",
    destinationId: "egypt",
    imageWebp: "/images/traveler-stories/story-luxor-temple.webp",
    imageJpg: "/images/traveler-stories/story-luxor-temple.jpg",
    rating: 5,
    reviewerName: "Ethan P.",
    defaultQuote: "A truly magical place with so much history.",
    defaultLocation: "Luxor, Egypt",
    defaultImageAlt:
      "Sunlit sandstone columns of an ancient Egyptian temple by the Nile with palm trees",
    isSampleData: true,
    verificationStatus: "sample_development_preview",
    verificationNote:
      "Sample preview entry from approved design reference; replace with verified customer review record before launch.",
  },
  {
    id: "giza-desert-palms",
    destinationId: "egypt",
    imageWebp: "/images/traveler-stories/story-giza-pyramids.webp",
    imageJpg: "/images/traveler-stories/story-giza-pyramids.jpg",
    rating: 5,
    reviewerName: "Grace L.",
    defaultQuote: "The desert was even more beautiful than we imagined.",
    defaultLocation: "Giza, Egypt",
    defaultImageAlt:
      "Great Pyramids of Giza and the Sphinx rising beyond golden desert dunes and date palms",
    isSampleData: true,
    verificationStatus: "sample_development_preview",
    verificationNote:
      "Sample preview entry from approved design reference; replace with verified customer review record before launch.",
  },
  {
    id: "istanbul-sunset",
    destinationId: "turkiye",
    imageWebp: "/images/traveler-stories/story-istanbul-sunset.webp",
    imageJpg: "/images/traveler-stories/story-istanbul-sunset.jpg",
    rating: 5,
    reviewerName: "Oliver T.",
    defaultQuote: "Incredible culture, food and hospitality.",
    defaultLocation: "Istanbul, Türkiye",
    defaultImageAlt:
      "Maiden's Tower and historic mosque silhouettes across the Bosphorus at golden sunset",
    isSampleData: true,
    verificationStatus: "sample_development_preview",
    verificationNote:
      "Sample preview entry from approved design reference; replace with verified customer review record before launch.",
  },
  {
    id: "bosphorus-twilight",
    destinationId: "turkiye",
    imageWebp: "/images/traveler-stories/story-bosphorus-ferry.webp",
    imageJpg: "/images/traveler-stories/story-bosphorus-ferry.jpg",
    rating: 5,
    reviewerName: "Sofia M.",
    defaultQuote: "Cruising the Bosphorus at twilight was unforgettable.",
    defaultLocation: "Bosphorus, Türkiye",
    defaultImageAlt:
      "Illuminated passenger ferry gliding across the Bosphorus below Istanbul's mosque-lined skyline",
    isSampleData: true,
    verificationStatus: "sample_development_preview",
    verificationNote:
      "Sample preview entry for carousel continuity; replace with verified customer review record before launch.",
  },
  {
    id: "nile-felucca",
    destinationId: "egypt",
    imageWebp: "/images/traveler-stories/story-nile-felucca.webp",
    imageJpg: "/images/traveler-stories/story-nile-felucca.jpg",
    rating: 5,
    reviewerName: "Lucas R.",
    defaultQuote: "Sailing the Nile past ancient temples felt timeless.",
    defaultLocation: "Nile Valley, Egypt",
    defaultImageAlt:
      "Golden sunset horizons across the Nile Valley and ancient pyramids",
    isSampleData: true,
    verificationStatus: "sample_development_preview",
    verificationNote:
      "Sample preview entry for carousel continuity; replace with verified customer review record before launch.",
  },
] as const;

export interface TravelerStoryItemCopy {
  quote: string;
  location: string;
  imageAlt: string;
}

export interface TravelerStoriesLocaleCopy {
  eyebrow: string;
  heading: string;
  supportingText: string;
  prevStoryLabel: string;
  nextStoryLabel: string;
  goToStoryPrefix: string;
  carouselAriaLabel: string;
  paginationAriaLabel: string;
  starRatingLabel: string;
  items: Record<StoryId, TravelerStoryItemCopy>;
}

export const TRAVELER_STORIES_I18N: Record<
  SupportedLocale,
  TravelerStoriesLocaleCopy
> = {
  en: {
    eyebrow: "TRAVELER STORIES",
    heading: "Our Latest Stories",
    supportingText:
      "Real traveler experiences, from unforgettable places to life-changing moments around the world.",
    prevStoryLabel: "Previous traveler story",
    nextStoryLabel: "Next traveler story",
    goToStoryPrefix: "View story from",
    carouselAriaLabel: "Traveler stories Polaroid clothesline carousel",
    paginationAriaLabel: "Traveler stories carousel pagination",
    starRatingLabel: "out of 5 stars",
    items: {
      "dubai-waterfront": {
        quote: "Beautiful, breathtaking and so full of life!",
        location: "Dubai, UAE",
        imageAlt:
          "Downtown Dubai skyline and Burj Khalifa glowing above the waterfront at sunset",
      },
      "luxor-colonnade": {
        quote: "A truly magical place with so much history.",
        location: "Luxor, Egypt",
        imageAlt:
          "Sunlit sandstone columns of an ancient Egyptian temple by the Nile with palm trees",
      },
      "giza-desert-palms": {
        quote: "The desert was even more beautiful than we imagined.",
        location: "Giza, Egypt",
        imageAlt:
          "Great Pyramids of Giza and the Sphinx rising beyond golden desert dunes and date palms",
      },
      "istanbul-sunset": {
        quote: "Incredible culture, food and hospitality.",
        location: "Istanbul, Türkiye",
        imageAlt:
          "Maiden's Tower and historic mosque silhouettes across the Bosphorus at golden sunset",
      },
      "bosphorus-twilight": {
        quote: "Cruising the Bosphorus at twilight was unforgettable.",
        location: "Bosphorus, Türkiye",
        imageAlt:
          "Illuminated passenger ferry gliding across the Bosphorus below Istanbul's mosque-lined skyline",
      },
      "nile-felucca": {
        quote: "Sailing the Nile past ancient temples felt timeless.",
        location: "Nile Valley, Egypt",
        imageAlt:
          "Golden sunset horizons across the Nile Valley and ancient pyramids",
      },
    },
  },
  tr: {
    eyebrow: "GEZGİN HİKÂYELERİ",
    heading: "En Son Hikâyelerimiz",
    supportingText:
      "Unutulmaz yerlerden dünyanın dört bir yanındaki hayat değiştiren anlara kadar gerçek gezgin deneyimleri.",
    prevStoryLabel: "Önceki gezgin hikâyesi",
    nextStoryLabel: "Sonraki gezgin hikâyesi",
    goToStoryPrefix: "Hikâyeyi göster:",
    carouselAriaLabel: "Gezgin hikâyeleri Polaroid fotoğraf askısı karuseli",
    paginationAriaLabel: "Gezgin hikâyeleri karusel sayfalaması",
    starRatingLabel: "5 üzerinden yıldız",
    items: {
      "dubai-waterfront": {
        quote: "Muhteşem, nefes kesici ve hayat dolu!",
        location: "Dubai, BAE",
        imageAlt:
          "Gün batımında su kıyısında ışıldayan Downtown Dubai silüeti ve Burj Khalifa",
      },
      "luxor-colonnade": {
        quote: "Tarihle dolu, gerçekten büyüleyici bir yer.",
        location: "Luksor, Mısır",
        imageAlt:
          "Nil kıyısında palmiye ağaçlarıyla çevrili güneşli antik Mısır tapınağı sütunları",
      },
      "giza-desert-palms": {
        quote: "Çöl hayal ettiğimizden bile daha güzeldi.",
        location: "Gize, Mısır",
        imageAlt:
          "Altın çöl kumulları ve hurma palmiyelerinin ardında yükselen Gize Piramitleri ve Sfenks",
      },
      "istanbul-sunset": {
        quote: "İnanılmaz kültür, lezzetler ve misafirperverlik.",
        location: "İstanbul, Türkiye",
        imageAlt:
          "Altın gün batımında Boğaz'da Kız Kulesi ve tarihi cami silüetleri",
      },
      "bosphorus-twilight": {
        quote: "Alacakaranlıkta Boğaz'da süzülmek unutulmazdı.",
        location: "Boğaziçi, Türkiye",
        imageAlt:
          "İstanbul'un camilerle bezeli silüeti altında Boğaz'da süzülen ışıklı vapur",
      },
      "nile-felucca": {
        quote: "Antik tapınakların kıyısında Nil'de yelken açmak zamansızdı.",
        location: "Nil Vadisi, Mısır",
        imageAlt:
          "Altın saatlerde Nil Vadisi ve antik piramitler üzerinde gün batımı",
      },
    },
  },
  es: {
    eyebrow: "HISTORIAS DE VIAJEROS",
    heading: "Nuestras Últimas Historias",
    supportingText:
      "Experiencias reales de viajeros, desde lugares inolvidables hasta momentos que cambian la vida alrededor del mundo.",
    prevStoryLabel: "Historia de viajero anterior",
    nextStoryLabel: "Siguiente historia de viajero",
    goToStoryPrefix: "Mostrar historia de",
    carouselAriaLabel: "Carrusel de historias de viajeros en cuerda Polaroid",
    paginationAriaLabel: "Paginación del carrusel de historias de viajeros",
    starRatingLabel: "de 5 estrellas",
    items: {
      "dubai-waterfront": {
        quote: "¡Hermoso, impresionante y tan lleno de vida!",
        location: "Dubái, EAU",
        imageAlt:
          "Horizonte de Dubái y el Burj Khalifa brillando sobre el agua al atardecer",
      },
      "luxor-colonnade": {
        quote: "Un lugar verdaderamente mágico y lleno de historia.",
        location: "Luxor, Egipto",
        imageAlt:
          "Columnas de piedra arenisca iluminadas por el sol en un antiguo templo egipcio junto al Nilo",
      },
      "giza-desert-palms": {
        quote: "El desierto fue aún más hermoso de lo que imaginábamos.",
        location: "Guiza, Egipto",
        imageAlt:
          "Grandes Pirámides de Guiza y la Esfinge sobre dunas doradas y palmeras datileras",
      },
      "istanbul-sunset": {
        quote: "Cultura, gastronomía y hospitalidad increíbles.",
        location: "Estambul, Türkiye",
        imageAlt:
          "Torre de la Doncella y siluetas de mezquitas históricas en el Bósforo al atardecer",
      },
      "bosphorus-twilight": {
        quote: "Navegar por el Bósforo al anochecer fue inolvidable.",
        location: "Bósforo, Türkiye",
        imageAlt:
          "Ferry iluminado deslizándose por el Bósforo bajo el horizonte de mezquitas de Estambul",
      },
      "nile-felucca": {
        quote: "Navegar por el Nilo frente a templos antiguos fue eterno.",
        location: "Valle del Nilo, Egipto",
        imageAlt:
          "Horizontes dorados al atardecer sobre el Valle del Nilo y las pirámides",
      },
    },
  },
};

export function getTravelerStories(
  customStories?: readonly TravelerStoryRecord[]
): readonly TravelerStoryRecord[] {
  if (customStories && customStories.length > 0) {
    return customStories;
  }
  return SAMPLE_TRAVELER_STORIES;
}
