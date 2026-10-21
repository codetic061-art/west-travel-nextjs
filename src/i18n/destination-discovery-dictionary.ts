import type { DestinationId } from "@/config/destinations";
import type { SupportedLocale } from "@/i18n/hero-dictionary";

export interface DestinationEditorialCopy {
  id: DestinationId;
  displayTitle: string;
  subtitle: string;
  editorialIntro: string;
  featuredLandmarkTitle: string;
  featuredLandmarkSubtitle: string;
  secondaryLandmarkTitle: string;
  corridorBadges: readonly string[];
  ctaExploreJourneys: string;
  ctaInquireDestination: string;
}

export interface LocalizedJourneyCopy {
  title: string;
  locationLabel: string;
  description: string;
  corridorLabel: string;
  inquiryFormatLabel: string;
}

export interface DestinationDiscoveryLocaleCopy {
  pageEyebrow: string;
  backToHomeLabel: string;
  railAriaLabel: string;
  activeSelectionBadge: string;
  otherDestinationsHeading: string;
  previewSelectLabel: string;
  prevDestinationLabel: string;
  nextDestinationLabel: string;
  videoAtmosphereLabel: string;
  journeysSectionEyebrow: string;
  journeysSectionHeadingPrefix: string;
  journeysSectionAllHeading: string;
  journeysSectionSupporting: string;
  filterAllDestinationsLabel: string;
  journeysCountSingular: string;
  journeysCountPlural: string;
  requestCustomQuoteCta: string;
  inquireThisJourneyCta: string;
  emptyState: {
    badge: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  journeyDetail: {
    backToDiscoveryLabel: string;
    viewAllDestinationsLabel: string;
    corridorHeading: string;
    durationHeading: string;
    bookingModelHeading: string;
    catalogRefHeading: string;
    inquireHeading: string;
    inquireDescription: string;
    inquirePrimaryCta: string;
    relatedJourneysHeading: string;
  };
  destinations: Record<DestinationId, DestinationEditorialCopy>;
  journeys: Record<string, LocalizedJourneyCopy>;
}

export const DESTINATION_DISCOVERY_DICTIONARY: Record<
  SupportedLocale,
  DestinationDiscoveryLocaleCopy
> = {
  en: {
    pageEyebrow: "WEST GLOBAL TOURS · DESTINATION PORTFOLIO",
    backToHomeLabel: "Back to Home",
    railAriaLabel: "Destination selector progress rail",
    activeSelectionBadge: "Active Destination",
    otherDestinationsHeading: "Switch Destination",
    previewSelectLabel: "Select destination",
    prevDestinationLabel: "Previous destination",
    nextDestinationLabel: "Next destination",
    videoAtmosphereLabel: "Cinematic Backdrop",
    journeysSectionEyebrow: "CURATED ITINERARIES",
    journeysSectionHeadingPrefix: "Journeys in",
    journeysSectionAllHeading: "All Curated Journeys Across Egypt, Türkiye & Dubai",
    journeysSectionSupporting:
      "Select a destination above or filter below to inspect confirmed geographic corridors and request a tailored quotation.",
    filterAllDestinationsLabel: "All 3 Destinations",
    journeysCountSingular: "Curated Journey",
    journeysCountPlural: "Curated Journeys",
    requestCustomQuoteCta: "Plan a Custom Route",
    inquireThisJourneyCta: "Inquire About This Journey",
    emptyState: {
      badge: "Tailored Planning Available",
      heading: "No pre-packaged journeys listed for this selection yet",
      description:
        "We do not display placeholder prices or unconfirmed schedules. Share your preferred dates and group size with our team to receive a tailored itinerary quotation.",
      primaryCta: "Request a Tailored Quotation",
      secondaryCta: "View All Destinations",
    },
    journeyDetail: {
      backToDiscoveryLabel: "Back to Destination Discovery",
      viewAllDestinationsLabel: "Explore All Destinations",
      corridorHeading: "Geographic Corridor",
      durationHeading: "Duration",
      bookingModelHeading: "Booking Format",
      catalogRefHeading: "Reference Code",
      inquireHeading: "Plan This Journey With WEST GLOBAL TOURS",
      inquireDescription:
        "Share your preferred travel window and party size. Our planning desk will prepare a confirmed itinerary and quotation via WhatsApp or Email.",
      inquirePrimaryCta: "Request Journey Quotation",
      relatedJourneysHeading: "More Journeys in This Destination",
    },
    destinations: {
      egypt: {
        id: "egypt",
        displayTitle: "EGYPT",
        subtitle: "Cairo · Giza Plateau · Luxor & The Nile Valley",
        editorialIntro:
          "Egypt links monumental antiquity with timeless river landscapes. From the Great Pyramids of Giza and the historic quarters of Old Cairo to the temple sanctuaries of Luxor along the Nile corridor, each journey is structured around clear archaeological context and private planning.",
        featuredLandmarkTitle: "Giza Plateau & Pyramids",
        featuredLandmarkSubtitle: "Cairo · Giza · Sakkara",
        secondaryLandmarkTitle: "Nile Valley & Luxor Temples",
        corridorBadges: ["Cairo & Giza Plateau", "Nile Valley Corridor", "Luxor Sanctuaries"],
        ctaExploreJourneys: "Explore Egypt Journeys",
        ctaInquireDestination: "Plan an Egypt Trip",
      },
      turkiye: {
        id: "turkiye",
        displayTitle: "TÜRKİYE",
        subtitle: "Istanbul · Historic Peninsula · Bosphorus Strait",
        editorialIntro:
          "Where Europe and Asia meet across the shimmering waters of the Bosphorus. Discover Istanbul's imperial mosque silhouettes, bustling grand bazaars, waterfront palaces, and maritime passages connecting two continents in a single curated itinerary.",
        featuredLandmarkTitle: "Istanbul & Historic Peninsula",
        featuredLandmarkSubtitle: "Sultanahmet · Golden Horn",
        secondaryLandmarkTitle: "Bosphorus Strait & Maiden's Tower",
        corridorBadges: ["Historic Peninsula", "Bosphorus Strait", "Üsküdar & Karaköy"],
        ctaExploreJourneys: "Explore Türkiye Journeys",
        ctaInquireDestination: "Plan a Türkiye Trip",
      },
      dubai: {
        id: "dubai",
        displayTitle: "DUBAI",
        subtitle: "Downtown Skyline · Burj Khalifa · Arabian Gulf",
        editorialIntro:
          "Contemporary architectural ambition set between the Arabian Gulf and golden desert dunes. Experience Downtown Dubai's soaring skyline, illuminated evening waterfront promenades, and curated urban-to-desert horizons tailored to your schedule.",
        featuredLandmarkTitle: "Downtown Dubai & Burj Khalifa",
        featuredLandmarkSubtitle: "Waterfront Promenade · City Heart",
        secondaryLandmarkTitle: "Arabian Gulf & Desert Horizon",
        corridorBadges: ["Downtown Dubai", "Burj Khalifa Corridor", "Arabian Gulf Waterfront"],
        ctaExploreJourneys: "Explore Dubai Journeys",
        ctaInquireDestination: "Plan a Dubai Trip",
      },
    },
    journeys: {
      "cairo-luxor-discovery": {
        title: "Cairo & Luxor Discovery",
        locationLabel: "Cairo & Luxor, Egypt",
        description:
          "Navigate the historic Nile corridor linking Cairo's grand heritage with the riverside temple sanctuaries of Luxor.",
        corridorLabel: "Cairo · Nile Valley · Luxor",
        inquiryFormatLabel: "Tailored Private Inquiry",
      },
      "turkiye-culture-escape": {
        title: "Türkiye Culture Escape",
        locationLabel: "Istanbul, Türkiye",
        description:
          "Experience Istanbul's historic peninsula, imperial architecture, and culinary traditions across Europe and Asia.",
        corridorLabel: "Historic Peninsula · Golden Horn",
        inquiryFormatLabel: "Tailored Private Inquiry",
      },
      "dubai-city-experience": {
        title: "Dubai City Experience",
        locationLabel: "Dubai, UAE",
        description:
          "Discover contemporary architectural icons, waterfront promenades, and desert horizons in the heart of Dubai.",
        corridorLabel: "Downtown Dubai · Waterfront · Arabian Gulf",
        inquiryFormatLabel: "Featured Signature Journey",
      },
      "egypt-heritage-trail": {
        title: "Egypt Heritage Trail",
        locationLabel: "Giza & Cairo, Egypt",
        description:
          "Trace antiquity across the Giza Plateau and Old Cairo landmarks with curated archaeological context.",
        corridorLabel: "Giza Plateau · Memphis · Sakkara",
        inquiryFormatLabel: "Tailored Private Inquiry",
      },
      "istanbul-bosphorus-getaway": {
        title: "Istanbul & Bosphorus Getaway",
        locationLabel: "Istanbul, Türkiye",
        description:
          "Sail between two continents along the Bosphorus strait past Maiden's Tower, waterfront palaces, and historic neighborhoods.",
        corridorLabel: "Bosphorus Strait · Üsküdar · Karaköy",
        inquiryFormatLabel: "Tailored Private Inquiry",
      },
    },
  },
  tr: {
    pageEyebrow: "WEST GLOBAL TOURS · DESTİNASYON PORTFÖYÜ",
    backToHomeLabel: "Ana Sayfaya Dön",
    railAriaLabel: "Destinasyon seçici ilerleme çubuğu",
    activeSelectionBadge: "Aktif Destinasyon",
    otherDestinationsHeading: "Destinasyon Değiştir",
    previewSelectLabel: "Destinasyon seçin",
    prevDestinationLabel: "Önceki destinasyon",
    nextDestinationLabel: "Sonraki destinasyon",
    videoAtmosphereLabel: "Sinematik Atmosfer",
    journeysSectionEyebrow: "SEÇKİN ROTALAR",
    journeysSectionHeadingPrefix: "Seçili Destinasyon Turları:",
    journeysSectionAllHeading: "Mısır, Türkiye ve Dubai Genelindeki Tüm Seçkin Turlar",
    journeysSectionSupporting:
      "Doğrulanmış rota koridorlarını incelemek ve size özel fiyat teklifi istemek için yukarıdan bir destinasyon seçin.",
    filterAllDestinationsLabel: "Tüm 3 Destinasyon",
    journeysCountSingular: "Seçkin Tur",
    journeysCountPlural: "Seçkin Tur",
    requestCustomQuoteCta: "Özel Rota Planla",
    inquireThisJourneyCta: "Bu Tur İçin Teklif İste",
    emptyState: {
      badge: "Özel Planlama Mevcut",
      heading: "Bu seçim için henüz hazır paket tur listelenmedi",
      description:
        "Tahmini fiyatlar veya doğrulanmamış tarihler göstermiyoruz. Tercih ettiğiniz tarihleri ve kişi sayısını ekibimizle paylaşarak size özel rota teklifi alabilirsiniz.",
      primaryCta: "Özel Teklif Talep Et",
      secondaryCta: "Tüm Destinasyonları Gör",
    },
    journeyDetail: {
      backToDiscoveryLabel: "Destinasyon Keşfine Dön",
      viewAllDestinationsLabel: "Tüm Destinasyonları Keşfet",
      corridorHeading: "Coğrafi Koridor",
      durationHeading: "Süre",
      bookingModelHeading: "Rezervasyon Modeli",
      catalogRefHeading: "Katalog Kodu",
      inquireHeading: "Bu Yolculuğu WEST GLOBAL TOURS ile Planlayın",
      inquireDescription:
        "Tercih ettiğiniz seyahat tarihlerini ve yolcu sayısını paylaşın. Planlama ekibimiz WhatsApp veya E-posta üzerinden doğrulanmış rota ve teklifinizi hazırlasın.",
      inquirePrimaryCta: "Tur Teklifi İste",
      relatedJourneysHeading: "Bu Destinasyondaki Diğer Turlar",
    },
    destinations: {
      egypt: {
        id: "egypt",
        displayTitle: "MISIR",
        subtitle: "Kahire · Gize Platosu · Luksor ve Nil Vadisi",
        editorialIntro:
          "Mısır, anıtsal antik tarihi zamansız Nil manzaralarıyla buluşturur. Gize Piramitleri ve Eski Kahire'nin tarihi dokusundan Nil kıyısındaki Luksor tapınaklarına kadar her yolculuk, net arkeolojik bağlam ve özenli özel planlama etrafında şekillendirilir.",
        featuredLandmarkTitle: "Gize Platosu ve Piramitler",
        featuredLandmarkSubtitle: "Kahire · Gize · Sakkara",
        secondaryLandmarkTitle: "Nil Vadisi ve Luksor Tapınakları",
        corridorBadges: ["Kahire ve Gize Platosu", "Nil Vadisi Koridoru", "Luksor Tapınakları"],
        ctaExploreJourneys: "Mısır Turlarını İncele",
        ctaInquireDestination: "Mısır Seyahati Planla",
      },
      turkiye: {
        id: "turkiye",
        displayTitle: "TÜRKİYE",
        subtitle: "İstanbul · Tarihi Yarımada · İstanbul Boğazı",
        editorialIntro:
          "Avrupa ve Asya'nın Boğaz'ın ışıltılı sularında buluştuğu eşsiz coğrafya. İstanbul'un imparatorluk camilerini, tarihi çarşılarını, kıyı saraylarını ve iki kıtayı birbirine bağlayan deniz rotalarını özenle kurgulanmış tek bir deneyimde keşfedin.",
        featuredLandmarkTitle: "İstanbul ve Tarihi Yarımada",
        featuredLandmarkSubtitle: "Sultanahmet · Haliç",
        secondaryLandmarkTitle: "Boğaziçi ve Kız Kulesi",
        corridorBadges: ["Tarihi Yarımada", "İstanbul Boğazı", "Üsküdar ve Karaköy"],
        ctaExploreJourneys: "Türkiye Turlarını İncele",
        ctaInquireDestination: "Türkiye Seyahati Planla",
      },
      dubai: {
        id: "dubai",
        displayTitle: "DUBAİ",
        subtitle: "Downtown Silüeti · Burj Khalifa · Basra Körfezi",
        editorialIntro:
          "Basra Körfezi ile altın çöl kumulları arasında yükselen çağdaş mimari vizyon. Downtown Dubai'nin etkileyici silüetini, akşam ışıklarıyla parlayan su kıyısı bulvarlarını ve programınıza göre uyarlanmış şehir-çöl rotalarını deneyimleyin.",
        featuredLandmarkTitle: "Downtown Dubai ve Burj Khalifa",
        featuredLandmarkSubtitle: "Su Kıyısı Bulvarı · Şehir Merkezi",
        secondaryLandmarkTitle: "Basra Körfezi ve Çöl Ufku",
        corridorBadges: ["Downtown Dubai", "Burj Khalifa Koridoru", "Körfez Kıyısı"],
        ctaExploreJourneys: "Dubai Turlarını İncele",
        ctaInquireDestination: "Dubai Seyahati Planla",
      },
    },
    journeys: {
      "cairo-luxor-discovery": {
        title: "Kahire ve Luksor Keşfi",
        locationLabel: "Kahire ve Luksor, Mısır",
        description:
          "Kahire'nin görkemli mirasını Luksor'un nehir kıyısındaki antik tapınaklarıyla birleştiren tarihi Nil koridorunu keşfedin.",
        corridorLabel: "Kahire · Nil Vadisi · Luksor",
        inquiryFormatLabel: "Özel Kişisel Teklif",
      },
      "turkiye-culture-escape": {
        title: "Türkiye Kültür Kaçamağı",
        locationLabel: "İstanbul, Türkiye",
        description:
          "Avrupa ve Asya yakasında İstanbul'un tarihi yarımadasını, imparatorluk mimarisini ve mutfak kültürünü deneyimleyin.",
        corridorLabel: "Tarihi Yarımada · Haliç",
        inquiryFormatLabel: "Özel Kişisel Teklif",
      },
      "dubai-city-experience": {
        title: "Dubai Şehir Deneyimi",
        locationLabel: "Dubai, BAE",
        description:
          "Dubai'nin kalbinde çağdaş mimari simgeleri, su kıyısı kordonlarını ve çöl ufuklarını keşfedin.",
        corridorLabel: "Downtown Dubai · Su Kıyısı · Basra Körfezi",
        inquiryFormatLabel: "Öne Çıkan İmza Yolculuk",
      },
      "egypt-heritage-trail": {
        title: "Mısır Miras Rotası",
        locationLabel: "Gize ve Kahire, Mısır",
        description:
          "Gize Platosu ve Eski Kahire'nin tarihi yapılarını özenle hazırlanmış arkeolojik bağlamla adım adım izleyin.",
        corridorLabel: "Gize Platosu · Memfis · Sakkara",
        inquiryFormatLabel: "Özel Kişisel Teklif",
      },
      "istanbul-bosphorus-getaway": {
        title: "İstanbul ve Boğaziçi Rotası",
        locationLabel: "İstanbul, Türkiye",
        description:
          "Kız Kulesi, kıyı sarayları ve tarihi semtler eşliğinde İstanbul Boğazı'nda iki kıta arasında yelken açın.",
        corridorLabel: "Boğaziçi · Üsküdar · Karaköy",
        inquiryFormatLabel: "Özel Kişisel Teklif",
      },
    },
  },
  es: {
    pageEyebrow: "WEST GLOBAL TOURS · PORTAFOLIO DE DESTINOS",
    backToHomeLabel: "Volver al Inicio",
    railAriaLabel: "Barra de progreso del selector de destinos",
    activeSelectionBadge: "Destino Activo",
    otherDestinationsHeading: "Cambiar Destino",
    previewSelectLabel: "Seleccionar destino",
    prevDestinationLabel: "Destino anterior",
    nextDestinationLabel: "Siguiente destino",
    videoAtmosphereLabel: "Atmósfera Cinematográfica",
    journeysSectionEyebrow: "ITINERARIOS SELECCIONADOS",
    journeysSectionHeadingPrefix: "Viajes en",
    journeysSectionAllHeading: "Todos los Viajes Seleccionados en Egipto, Türkiye y Dubái",
    journeysSectionSupporting:
      "Selecciona un destino arriba o filtra abajo para explorar los corredores geográficos confirmados y solicitar una cotización a medida.",
    filterAllDestinationsLabel: "Los 3 Destinos",
    journeysCountSingular: "Viaje Seleccionado",
    journeysCountPlural: "Viajes Seleccionados",
    requestCustomQuoteCta: "Planificar Ruta a Medida",
    inquireThisJourneyCta: "Consultar Sobre Este Viaje",
    emptyState: {
      badge: "Planificación a Medida Disponible",
      heading: "Aún no hay viajes preempaquetados listados para esta selección",
      description:
        "No mostramos precios ficticios ni horarios no confirmados. Comparte tus fechas preferidas y el tamaño de tu grupo para recibir una cotización personalizada.",
      primaryCta: "Solicitar Cotización a Medida",
      secondaryCta: "Ver Todos los Destinos",
    },
    journeyDetail: {
      backToDiscoveryLabel: "Volver a Destinos",
      viewAllDestinationsLabel: "Explorar Todos los Destinos",
      corridorHeading: "Corredor Geográfico",
      durationHeading: "Duración",
      bookingModelHeading: "Formato de Reserva",
      catalogRefHeading: "Código de Referencia",
      inquireHeading: "Planifica Este Viaje con WEST GLOBAL TOURS",
      inquireDescription:
        "Comparte tus fechas tentativas y número de viajeros. Nuestro equipo preparará un itinerario confirmado y cotización por WhatsApp o Correo.",
      inquirePrimaryCta: "Solicitar Cotización del Viaje",
      relatedJourneysHeading: "Más Viajes en Este Destino",
    },
    destinations: {
      egypt: {
        id: "egypt",
        displayTitle: "EGIPTO",
        subtitle: "El Cairo · Meseta de Guiza · Luxor y Valle del Nilo",
        editorialIntro:
          "Egipto une la antigüedad monumental con paisajes fluviales eternos. Desde las Grandes Pirámides de Guiza y los barrios históricos de El Cairo hasta los santuarios de Luxor junto al Nilo, cada ruta se organiza con contexto arqueológico claro y planificación privada.",
        featuredLandmarkTitle: "Meseta de Guiza y Pirámides",
        featuredLandmarkSubtitle: "El Cairo · Guiza · Saqqara",
        secondaryLandmarkTitle: "Valle del Nilo y Templos de Luxor",
        corridorBadges: ["El Cairo y Guiza", "Corredor del Nilo", "Santuarios de Luxor"],
        ctaExploreJourneys: "Explorar Viajes en Egipto",
        ctaInquireDestination: "Planificar Viaje a Egipto",
      },
      turkiye: {
        id: "turkiye",
        displayTitle: "TÜRKİYE",
        subtitle: "Estambul · Península Histórica · Estrecho del Bósforo",
        editorialIntro:
          "Donde Europa y Asia se encuentran sobre las aguas del Bósforo. Descubre las mezquitas imperiales de Estambul, los bazares históricos, los palacios costeros y las travesías marítimas que conectan dos continentes en un solo itinerario.",
        featuredLandmarkTitle: "Estambul y Península Histórica",
        featuredLandmarkSubtitle: "Sultanahmet · Cuerno de Oro",
        secondaryLandmarkTitle: "Estrecho del Bósforo y Torre de la Doncella",
        corridorBadges: ["Península Histórica", "Estrecho del Bósforo", "Üsküdar y Karaköy"],
        ctaExploreJourneys: "Explorar Viajes en Türkiye",
        ctaInquireDestination: "Planificar Viaje a Türkiye",
      },
      dubai: {
        id: "dubai",
        displayTitle: "DUBÁI",
        subtitle: "Horizonte Urbano · Burj Khalifa · Golfo Pérsico",
        editorialIntro:
          "Ambición arquitectónica contemporánea entre el Golfo Pérsico y las dunas doradas del desierto. Vive el horizonte de Downtown Dubái, los paseos marítimos iluminados al anochecer y rutas urbanas y desérticas adaptadas a tu ritmo.",
        featuredLandmarkTitle: "Downtown Dubái y Burj Khalifa",
        featuredLandmarkSubtitle: "Paseo Marítimo · Centro Urbano",
        secondaryLandmarkTitle: "Golfo Pérsico y Horizonte del Desierto",
        corridorBadges: ["Downtown Dubái", "Corredor Burj Khalifa", "Costa del Golfo Pérsico"],
        ctaExploreJourneys: "Explorar Viajes en Dubái",
        ctaInquireDestination: "Planificar Viaje a Dubái",
      },
    },
    journeys: {
      "cairo-luxor-discovery": {
        title: "Descubrimiento de El Cairo y Luxor",
        locationLabel: "El Cairo y Luxor, Egipto",
        description:
          "Navega por el corredor histórico del Nilo que conecta el gran patrimonio de El Cairo con los templos ribereños de Luxor.",
        corridorLabel: "El Cairo · Valle del Nilo · Luxor",
        inquiryFormatLabel: "Consulta Privada a Medida",
      },
      "turkiye-culture-escape": {
        title: "Escapada Cultural por Türkiye",
        locationLabel: "Estambul, Türkiye",
        description:
          "Experimenta la península histórica de Estambul, su arquitectura imperial y tradiciones culinarias entre Europa y Asia.",
        corridorLabel: "Península Histórica · Cuerno de Oro",
        inquiryFormatLabel: "Consulta Privada a Medida",
      },
      "dubai-city-experience": {
        title: "Experiencia Urbana en Dubái",
        locationLabel: "Dubái, EAU",
        description:
          "Descubre iconos arquitectónicos contemporáneos, paseos frente al agua y horizontes del desierto en el corazón de Dubái.",
        corridorLabel: "Downtown Dubái · Paseo Marítimo · Golfo Pérsico",
        inquiryFormatLabel: "Viaje Destacado de Autor",
      },
      "egypt-heritage-trail": {
        title: "Ruta del Patrimonio de Egipto",
        locationLabel: "Guiza y El Cairo, Egipto",
        description:
          "Recorre la antigüedad en la Meseta de Guiza y los monumentos del Viejo Cairo con contexto arqueológico seleccionado.",
        corridorLabel: "Meseta de Guiza · Menfis · Saqqara",
        inquiryFormatLabel: "Consulta Privada a Medida",
      },
      "istanbul-bosphorus-getaway": {
        title: "Escapada por Estambul y el Bósforo",
        locationLabel: "Estambul, Türkiye",
        description:
          "Navega entre dos continentes por el estrecho del Bósforo junto a la Torre de la Doncella, palacios costeros y barrios históricos.",
        corridorLabel: "Estrecho del Bósforo · Üsküdar · Karaköy",
        inquiryFormatLabel: "Consulta Privada a Medida",
      },
    },
  },
};
