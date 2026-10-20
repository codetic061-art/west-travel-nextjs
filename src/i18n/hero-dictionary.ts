import type { DestinationId } from "@/config/destinations";
import type { WhyWestFeatureId } from "@/config/why-west-travel";
import type { StoryId } from "@/config/traveler-stories";

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
  cardCtaShort: string;
  durationPlaceholder: string;
  quotePlaceholder: string;
  prevJourneyLabel: string;
  nextJourneyLabel: string;
  goToJourneyPrefix: string;
  moreDetailsLabel: string;
  hideDetailsLabel: string;
}

export interface WhyWestFeatureTranslation {
  title: string;
  description: string;
}

export interface WhyWestTravelTranslation {
  eyebrowPrefix: string;
  eyebrowHighlight: string;
  headingLine1: string;
  headingLine2: string;
  supportingText: string;
  primaryCta: string;
  travelerImageAlt: string;
  features: Record<WhyWestFeatureId, WhyWestFeatureTranslation>;
}

export interface TravelerStoryItemTranslation {
  quote: string;
  location: string;
  imageAlt: string;
}

export interface TravelerStoriesTranslation {
  eyebrow: string;
  heading: string;
  supportingText: string;
  prevStoryLabel: string;
  nextStoryLabel: string;
  goToStoryPrefix: string;
  carouselAriaLabel: string;
  paginationAriaLabel: string;
  starRatingLabel: string;
  sampleDataNotice: string;
  sampleBadgeLabel: string;
  items: Record<StoryId, TravelerStoryItemTranslation>;
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
  whyWestTravel: WhyWestTravelTranslation;
  travelerStories: TravelerStoriesTranslation;
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
      cardCtaShort: "Explore",
      durationPlaceholder: "Trip duration",
      quotePlaceholder: "Request a quote",
      prevJourneyLabel: "Previous journey card",
      nextJourneyLabel: "Next journey card",
      goToJourneyPrefix: "Show journey",
      moreDetailsLabel: "Journey info",
      hideDetailsLabel: "Hide info",
    },
    whyWestTravel: {
      eyebrowPrefix: "WHY",
      eyebrowHighlight: "WEST TRAVEL",
      headingLine1: "Get the Best",
      headingLine2: "Travel Experience",
      supportingText:
        "Thoughtful planning, clear trip details, and dedicated support — we make your journey smoother, safer and more memorable.",
      primaryCta: "Learn More",
      travelerImageAlt:
        "Smiling young traveler in a sand sunhat holding an open travel map with the Great Pyramids of Giza, the Sphinx, and the Dubai skyline behind him",
      features: {
        network: {
          title: "Global Travel Network",
          description:
            "Access to trusted partners and unique travel experiences worldwide.",
        },
        transfer: {
          title: "Easy Transfer",
          description: "Smooth and secure transfers for a hassle-free journey.",
        },
        support: {
          title: "24/7 Support",
          description: "We're here for you, anytime, anywhere.",
        },
        booking: {
          title: "Flexible Booking",
          description:
            "Simple steps, fast confirmation, more time for what matters.",
        },
      },
    },
    travelerStories: {
      eyebrow: "TRAVELER STORIES",
      heading: "Our Latest Stories",
      supportingText:
        "Real traveler experiences, from unforgettable places to life-changing moments around the world.",
      prevStoryLabel: "Previous traveler story",
      nextStoryLabel: "Next traveler story",
      goToStoryPrefix: "Show story starting with",
      carouselAriaLabel: "Traveler stories Polaroid clothesline carousel",
      paginationAriaLabel: "Traveler stories carousel pagination",
      starRatingLabel: "out of 5 stars",
      sampleDataNotice: "Sample preview cards — connect verified backend reviews before publication",
      sampleBadgeLabel: "Sample",
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
            "Traditional white felucca sailboat gliding along the calm Nile River at golden hour",
        },
      },
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
      eyebrow: "ÖNE ÇIKAN TURLAR",
      heading: "Bir Sonraki Yolculuğunuzu Bulun",
      supportingText: "Mısır, Dubai ve Türkiye genelinde özenle seçilmiş turları keşfedin.",
      exploreAllCta: "Tüm Turları Keşfet",
      cardCta: "Turu İncele",
      cardCtaShort: "İncele",
      durationPlaceholder: "Tur süresi",
      quotePlaceholder: "Teklif isteyin",
      prevJourneyLabel: "Önceki yolculuk",
      nextJourneyLabel: "Sonraki yolculuk",
      goToJourneyPrefix: "Yolculuğu göster",
      moreDetailsLabel: "Detaylar",
      hideDetailsLabel: "Gizle",
    },
    whyWestTravel: {
      eyebrowPrefix: "NEDEN",
      eyebrowHighlight: "WEST TRAVEL",
      headingLine1: "En İyi Seyahat",
      headingLine2: "Deneyimini Yaşayın",
      supportingText:
        "Özenli planlama, net tur detayları ve özel destek — yolculuğunuzu daha akıcı, güvenli ve unutulmaz kılıyoruz.",
      primaryCta: "Daha Fazla Bilgi",
      travelerImageAlt:
        "Gize Piramitleri, Sfenks ve Dubai silüeti önünde açık seyahat haritası tutan gülümseyen genç gezgin",
      features: {
        network: {
          title: "Küresel Seyahat Ağı",
          description:
            "Dünya çapında güvenilir iş ortaklarına ve benzersiz seyahat deneyimlerine erişim.",
        },
        transfer: {
          title: "Kolay Transfer",
          description: "Sorunsuz bir yolculuk için akıcı ve güvenli transferler.",
        },
        support: {
          title: "7/24 Destek",
          description: "Her zaman, her yerde yanınızdayız.",
        },
        booking: {
          title: "Esnek Rezervasyon",
          description:
            "Basit adımlar, hızlı onay, önemli anlar için daha fazla zaman.",
        },
      },
    },
    travelerStories: {
      eyebrow: "GEZGİN HİKÂYELERİ",
      heading: "En Son Hikâyelerimiz",
      supportingText:
        "Unutulmaz yerlerden dünyanın dört bir yanındaki hayat değiştiren anlara kadar gerçek gezgin deneyimleri.",
      prevStoryLabel: "Önceki gezgin hikâyesi",
      nextStoryLabel: "Sonraki gezgin hikâyesi",
      goToStoryPrefix: "Hikâyeyi göster",
      carouselAriaLabel: "Gezgin hikâyeleri Polaroid fotoğraf askısı karuseli",
      paginationAriaLabel: "Gezgin hikâyeleri karusel sayfalaması",
      starRatingLabel: "5 üzerinden yıldız",
      sampleDataNotice: "Örnek önizleme kartları — yayın öncesi doğrulanmış müşteri yorumlarını bağlayın",
      sampleBadgeLabel: "Örnek",
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
            "Altın saatlerde sakin Nil Nehri'nde süzülen geleneksel beyaz feluka yelkenlisi",
        },
      },
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
      eyebrow: "VIAJES DESTACADOS",
      heading: "Encuentra Tu Próximo Viaje",
      supportingText: "Explora viajes seleccionados por Egipto, Dubái y Türkiye.",
      exploreAllCta: "Explorar Todos los Viajes",
      cardCta: "Explorar Viaje",
      cardCtaShort: "Explorar",
      durationPlaceholder: "Duración del viaje",
      quotePlaceholder: "Solicitar cotización",
      prevJourneyLabel: "Viaje anterior",
      nextJourneyLabel: "Siguiente viaje",
      goToJourneyPrefix: "Mostrar viaje",
      moreDetailsLabel: "Detalles",
      hideDetailsLabel: "Ocultar",
    },
    whyWestTravel: {
      eyebrowPrefix: "POR QUÉ",
      eyebrowHighlight: "WEST TRAVEL",
      headingLine1: "Vive la Mejor",
      headingLine2: "Experiencia de Viaje",
      supportingText:
        "Planificación cuidadosa, detalles claros y soporte dedicado — hacemos que tu viaje sea más fluido, seguro y memorable.",
      primaryCta: "Saber Más",
      travelerImageAlt:
        "Joven viajero sonriente con sombrero sosteniendo un mapa frente a las Pirámides de Guiza, la Esfinge y el horizonte de Dubái",
      features: {
        network: {
          title: "Red Global de Viajes",
          description:
            "Acceso a socios de confianza y experiencias de viaje únicas en todo el mundo.",
        },
        transfer: {
          title: "Traslado Sencillo",
          description:
            "Traslados fluidos y seguros para un viaje sin complicaciones.",
        },
        support: {
          title: "Soporte 24/7",
          description: "Estamos aquí para ti, en cualquier momento y lugar.",
        },
        booking: {
          title: "Reserva Flexible",
          description:
            "Pasos simples, confirmación rápida y más tiempo para lo que importa.",
        },
      },
    },
    travelerStories: {
      eyebrow: "HISTORIAS DE VIAJEROS",
      heading: "Nuestras Últimas Historias",
      supportingText:
        "Experiencias reales de viajeros, desde lugares inolvidables hasta momentos que cambian la vida alrededor del mundo.",
      prevStoryLabel: "Historia de viajero anterior",
      nextStoryLabel: "Siguiente historia de viajero",
      goToStoryPrefix: "Mostrar historia",
      carouselAriaLabel: "Carrusel de historias de viajeros en cuerda Polaroid",
      paginationAriaLabel: "Paginación del carrusel de historias de viajeros",
      starRatingLabel: "de 5 estrellas",
      sampleDataNotice: "Tarjetas de muestra — conecte reseñas verificadas antes de publicar",
      sampleBadgeLabel: "Muestra",
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
            "Faluca tradicional de vela blanca navegando por el tranquilo río Nilo al atardecer",
        },
      },
    },
  },
};
