import type { DestinationId } from "@/config/destinations";

export type SupportedLocale = "en" | "tr" | "es";

export interface DestinationCopy {
  id: DestinationId;
  name: string;
  locationBadge: string;
  tagline: string;
  regionLabel: string;
  highlightSummary: string;
  imageAlt: string;
}

export interface FeaturedTripsTranslation {
  eyebrow: string;
  heading: string;
  supportingText: string;
  exploreAllCta: string;
  cardCta: string;
  durationPlaceholder: string;
  quotePlaceholder: string;
  prevJourneyLabel: string;
  nextJourneyLabel: string;
  goToJourneyPrefix: string;
  moreDetailsLabel: string;
  hideDetailsLabel: string;
}

export interface HeroTranslation {
  locale: SupportedLocale;
  languageName: string;
  nav: {
    destinations: string;
    experiences: string;
    ourJourneys: string;
    about: string;
    contact: string;
    languageLabel: string;
    themeToggleLabel: string;
    darkMode: string;
    lightMode: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    allDestinations: string;
    navNoticePrefix: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    supportingText: string;
    primaryCta: string;
    scrollIndicator: string;
    activeSpotlightLabel: string;
    panoramicResetLabel: string;
    videoPlayingBadge: string;
    posterFallbackBadge: string;
  };
  destinations: Record<DestinationId, DestinationCopy>;
  booking: {
    destinationLabel: string;
    destinationPlaceholder: string;
    allThreeOption: string;
    datesLabel: string;
    datesPlaceholder: string;
    departureLabel: string;
    returnLabel: string;
    applyDates: string;
    clearDates: string;
    travelersLabel: string;
    guestSingular: string;
    guestPlural: string;
    adultsLabel: string;
    adultsDesc: string;
    childrenLabel: string;
    childrenDesc: string;
    doneLabel: string;
    searchCta: string;
    searchReadyTitle: string;
    searchReadySubtitle: string;
    closeSummaryLabel: string;
  };
  featuredTrips: FeaturedTripsTranslation;
}

export const HERO_DICTIONARY: Record<SupportedLocale, HeroTranslation> = {
  en: {
    locale: "en",
    languageName: "English",
    nav: {
      destinations: "Destinations",
      experiences: "Experiences",
      ourJourneys: "Our Journeys",
      about: "About",
      contact: "Contact",
      languageLabel: "Select language",
      themeToggleLabel: "Switch between Light and Dark theme",
      darkMode: "Dark",
      lightMode: "Light",
      openMenuLabel: "Open navigation menu",
      closeMenuLabel: "Close navigation menu",
      allDestinations: "All Three Destinations",
      navNoticePrefix: "Selected section inside Hero preview:",
    },
    hero: {
      eyebrow: "EXPLORE · DREAM · DISCOVER",
      headlineLine1: "Egypt, Dubai &",
      headlineLine2: "Türkiye",
      supportingText: "Three extraordinary destinations. One unforgettable journey.",
      primaryCta: "Explore Our Destinations",
      scrollIndicator: "SCROLL TO EXPLORE",
      activeSpotlightLabel: "Featured Destination Focus",
      panoramicResetLabel: "Panoramic View",
      videoPlayingBadge: "Live Backdrop",
      posterFallbackBadge: "Still Backdrop",
    },
    destinations: {
      egypt: {
        id: "egypt",
        name: "Egypt",
        locationBadge: "Cairo - Egypt",
        tagline: "Ancient Wonders",
        regionLabel: "Giza · Nile Valley · Desert Oases",
        highlightSummary:
          "Golden sunset silhouettes over the Great Pyramids of Giza, timeless Nile river passages, and desert horizons.",
        imageAlt:
          "Great Pyramids of Giza in Egypt bathed in warm golden sunset light above desert palms",
      },
      dubai: {
        id: "dubai",
        name: "Dubai",
        locationBadge: "Dubai - UAE",
        tagline: "Modern Marvels",
        regionLabel: "Downtown Skyline · Burj Khalifa · Arabian Gulf",
        highlightSummary:
          "Soaring architectural icons illuminated at blue hour above shimmering waterfront promenades.",
        imageAlt:
          "Downtown Dubai skyline featuring the Burj Khalifa at blue hour with glowing city reflections",
      },
      turkiye: {
        id: "turkiye",
        name: "Türkiye",
        locationBadge: "Istanbul - Türkiye",
        tagline: "Timeless Beauty",
        regionLabel: "Istanbul · Bosphorus Strait · Historic Peninsula",
        highlightSummary:
          "Minaret-lined silhouettes and illuminated ferries gliding across the Bosphorus at twilight.",
        imageAlt:
          "Istanbul mosque-lined skyline and glowing passenger ferry on the Bosphorus waterfront at sunset",
      },
    },
    booking: {
      destinationLabel: "Destination",
      destinationPlaceholder: "Where do you want to go?",
      allThreeOption: "Egypt, Dubai & Türkiye (Grand Circuit)",
      datesLabel: "Travel dates",
      datesPlaceholder: "Choose dates",
      departureLabel: "Departure",
      returnLabel: "Return",
      applyDates: "Apply Dates",
      clearDates: "Reset",
      travelersLabel: "Travelers",
      guestSingular: "guest",
      guestPlural: "guests",
      adultsLabel: "Adults",
      adultsDesc: "Ages 13 or above",
      childrenLabel: "Children",
      childrenDesc: "Ages 2–12",
      doneLabel: "Done",
      searchCta: "Search Trips",
      searchReadyTitle: "Trip Inquiry Parameters Prepared",
      searchReadySubtitle:
        "Your selected destination, travel window, and party size are structured and ready for itinerary matching.",
      closeSummaryLabel: "Dismiss",
    },
    featuredTrips: {
      eyebrow: "FEATURED TRIPS",
      heading: "Find Your Next Journey",
      supportingText: "Explore curated trips across Egypt, Dubai and Türkiye.",
      exploreAllCta: "Explore All Trips",
      cardCta: "Explore Journey",
      durationPlaceholder: "Trip duration",
      quotePlaceholder: "Request a quote",
      prevJourneyLabel: "Previous journey card",
      nextJourneyLabel: "Next journey card",
      goToJourneyPrefix: "Show journey",
      moreDetailsLabel: "Journey info",
      hideDetailsLabel: "Hide info",
    },
  },
  tr: {
    locale: "tr",
    languageName: "Türkçe",
    nav: {
      destinations: "Destinasyonlar",
      experiences: "Deneyimler",
      ourJourneys: "Yolculuklarımız",
      about: "Hakkımızda",
      contact: "İletişim",
      languageLabel: "Dil seçin",
      themeToggleLabel: "Açık ve koyu tema arasında geçiş yapın",
      darkMode: "Koyu",
      lightMode: "Açık",
      openMenuLabel: "Gezinme menüsünü aç",
      closeMenuLabel: "Gezinme menüsünü kapat",
      allDestinations: "Üç Destinasyonun Tümü",
      navNoticePrefix: "Hero önizlemesinde seçilen bölüm:",
    },
    hero: {
      eyebrow: "KEŞFET · HAYAL ET · DENEYİMLE",
      headlineLine1: "Mısır, Dubai ve",
      headlineLine2: "Türkiye",
      supportingText: "Üç olağanüstü destinasyon. Unutulmaz tek bir yolculuk.",
      primaryCta: "Destinasyonlarımızı Keşfedin",
      scrollIndicator: "KEŞFETMEK İÇİN KAYDIRIN",
      activeSpotlightLabel: "Öne Çıkan Destinasyon Odağı",
      panoramicResetLabel: "Panoramik Görünüm",
      videoPlayingBadge: "Canlı Arka Plan",
      posterFallbackBadge: "Sabit Görünüm",
    },
    destinations: {
      egypt: {
        id: "egypt",
        name: "Mısır",
        locationBadge: "Kahire - Mısır",
        tagline: "Antik Harikalar",
        regionLabel: "Gize · Nil Vadisi · Çöl Vahaları",
        highlightSummary:
          "Gize Piramitleri üzerinde altın gün batımı, zamansız Nil kıyıları ve büyüleyici çöl ufukları.",
        imageAlt: "Gün batımının sıcak altın ışığında Gize Piramitleri ve çöl manzarası",
      },
      dubai: {
        id: "dubai",
        name: "Dubai",
        locationBadge: "Dubai - BAE",
        tagline: "Modern Mucizeler",
        regionLabel: "Downtown Silüeti · Burj Khalifa · Basra Körfezi",
        highlightSummary:
          "Mavi saatlerde ışıldayan Burj Khalifa ve modern mimarinin su kıyısındaki zarif yansımaları.",
        imageAlt: "Mavi saatlerde Burj Khalifa ve ışıklandırılmış Dubai şehir silüeti",
      },
      turkiye: {
        id: "turkiye",
        name: "Türkiye",
        locationBadge: "İstanbul - Türkiye",
        tagline: "Zamansız Güzellik",
        regionLabel: "İstanbul · Boğaziçi · Tarihi Yarımada",
        highlightSummary:
          "Gün batımında Boğaz sularında süzülen vapurlar ve kubbeleriyle gökyüzünü süsleyen İstanbul silüeti.",
        imageAlt: "Gün batımı ve mavi saatlerde İstanbul camileri, Boğaz kıyısı ve ışıklı vapur",
      },
    },
    booking: {
      destinationLabel: "Destinasyon",
      destinationPlaceholder: "Nereye gitmek istersiniz?",
      allThreeOption: "Mısır, Dubai ve Türkiye (Büyük Rota)",
      datesLabel: "Seyahat tarihleri",
      datesPlaceholder: "Tarih seçin",
      departureLabel: "Gidiş",
      returnLabel: "Dönüş",
      applyDates: "Tarihleri Uygula",
      clearDates: "Sıfırla",
      travelersLabel: "Yolcular",
      guestSingular: "misafir",
      guestPlural: "misafir",
      adultsLabel: "Yetişkinler",
      adultsDesc: "13 yaş ve üzeri",
      childrenLabel: "Çocuklar",
      childrenDesc: "2–12 yaş",
      doneLabel: "Tamam",
      searchCta: "Turları Ara",
      searchReadyTitle: "Seyahat Arama Parametreleri Hazır",
      searchReadySubtitle:
        "Seçtiğiniz destinasyon, tarih aralığı ve yolcu sayısı rota eşleştirmesi için hazırlandı.",
      closeSummaryLabel: "Kapat",
    },
    featuredTrips: {
      eyebrow: "FEATURED TRIPS",
      heading: "Find Your Next Journey",
      supportingText: "Explore curated trips across Egypt, Dubai and Türkiye.",
      exploreAllCta: "Explore All Trips",
      cardCta: "Explore Journey",
      durationPlaceholder: "Trip duration",
      quotePlaceholder: "Request a quote",
      prevJourneyLabel: "Önceki yolculuk",
      nextJourneyLabel: "Sonraki yolculuk",
      goToJourneyPrefix: "Yolculuğu göster",
      moreDetailsLabel: "Detaylar",
      hideDetailsLabel: "Gizle",
    },
  },
  es: {
    locale: "es",
    languageName: "Español",
    nav: {
      destinations: "Destinos",
      experiences: "Experiencias",
      ourJourneys: "Nuestros Viajes",
      about: "Nosotros",
      contact: "Contacto",
      languageLabel: "Seleccionar idioma",
      themeToggleLabel: "Cambiar entre tema claro y oscuro",
      darkMode: "Oscuro",
      lightMode: "Claro",
      openMenuLabel: "Abrir menú de navegación",
      closeMenuLabel: "Cerrar menú de navegación",
      allDestinations: "Los Tres Destinos",
      navNoticePrefix: "Sección seleccionada en la vista Hero:",
    },
    hero: {
      eyebrow: "EXPLORA · SUEÑA · DESCUBRE",
      headlineLine1: "Egipto, Dubái y",
      headlineLine2: "Türkiye",
      supportingText: "Tres destinos extraordinarios. Un viaje inolvidable.",
      primaryCta: "Explorar Nuestros Destinos",
      scrollIndicator: "DESPLÁZATE PARA EXPLORAR",
      activeSpotlightLabel: "Destino Destacado",
      panoramicResetLabel: "Vista Panorámica",
      videoPlayingBadge: "Video Activo",
      posterFallbackBadge: "Vista Fija",
    },
    destinations: {
      egypt: {
        id: "egypt",
        name: "Egipto",
        locationBadge: "El Cairo - Egipto",
        tagline: "Maravillas Antiguas",
        regionLabel: "Guiza · Valle del Nilo · Oasis del Desierto",
        highlightSummary:
          "Siluetas doradas al atardecer sobre las Grandes Pirámides de Guiza y horizontes eternos del desierto.",
        imageAlt: "Las Pirámides de Guiza en Egipto bajo una cálida puesta de sol dorada",
      },
      dubai: {
        id: "dubai",
        name: "Dubái",
        locationBadge: "Dubái - EAU",
        tagline: "Maravillas Modernas",
        regionLabel: "Horizonte Urbano · Burj Khalifa · Golfo Pérsico",
        highlightSummary:
          "Iconos arquitectónicos iluminados durante la hora azul sobre serenas aguas urbanas.",
        imageAlt: "Horizonte de Dubái con el Burj Khalifa iluminado en la hora azul",
      },
      turkiye: {
        id: "turkiye",
        name: "Türkiye",
        locationBadge: "Estambul - Türkiye",
        tagline: "Belleza Atemporal",
        regionLabel: "Estambul · Estrecho del Bósforo · Península Histórica",
        highlightSummary:
          "Mezquitas imperiales iluminadas y transbordadores clásicos cruzando el Bósforo al atardecer.",
        imageAlt: "Horizonte de Estambul con mezquitas y barco iluminado en el Bósforo al atardecer",
      },
    },
    booking: {
      destinationLabel: "Destino",
      destinationPlaceholder: "¿A dónde quieres ir?",
      allThreeOption: "Egipto, Dubái y Türkiye (Gran Circuito)",
      datesLabel: "Fechas de viaje",
      datesPlaceholder: "Elegir fechas",
      departureLabel: "Salida",
      returnLabel: "Regreso",
      applyDates: "Aplicar Fechas",
      clearDates: "Reiniciar",
      travelersLabel: "Viajeros",
      guestSingular: "huésped",
      guestPlural: "huéspedes",
      adultsLabel: "Adultos",
      adultsDesc: "13 años o más",
      childrenLabel: "Niños",
      childrenDesc: "De 2 a 12 años",
      doneLabel: "Listo",
      searchCta: "Buscar Viajes",
      searchReadyTitle: "Parámetros de Búsqueda Preparados",
      searchReadySubtitle:
        "Tu destino, fechas de viaje y número de viajeros están listos para la integración de rutas.",
      closeSummaryLabel: "Cerrar",
    },
    featuredTrips: {
      eyebrow: "FEATURED TRIPS",
      heading: "Find Your Next Journey",
      supportingText: "Explore curated trips across Egypt, Dubai and Türkiye.",
      exploreAllCta: "Explore All Trips",
      cardCta: "Explore Journey",
      durationPlaceholder: "Trip duration",
      quotePlaceholder: "Request a quote",
      prevJourneyLabel: "Viaje anterior",
      nextJourneyLabel: "Siguiente viaje",
      goToJourneyPrefix: "Mostrar viaje",
      moreDetailsLabel: "Detalles",
      hideDetailsLabel: "Ocultar",
    },
  },
};
