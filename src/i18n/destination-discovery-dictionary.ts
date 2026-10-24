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

export interface LocalizedDaySegmentCopy {
  periodLabel: string;
  focusTitle: string;
  pacingNote: string;
}

export interface LocalizedItineraryDayCopy {
  dayNumber: number;
  cityLabel: string;
  title: string;
  description: string;
  landmarks: readonly string[];
  segments: {
    morning: LocalizedDaySegmentCopy;
    afternoon: LocalizedDaySegmentCopy;
    evening: LocalizedDaySegmentCopy;
  };
}

export interface LocalizedJourneyCopy {
  title: string;
  locationLabel: string;
  description: string;
  extendedOverview: string;
  corridorLabel: string;
  inquiryFormatLabel: string;
  travelStyleLabel: string;
  citiesCovered: readonly string[];
  highlights: readonly string[];
  overnightCorridors: readonly string[];
  days: readonly LocalizedItineraryDayCopy[];
}

export interface DestinationDiscoveryLocaleCopy {
  pageEyebrow: string;
  backToHomeLabel: string;
  railAriaLabel: string;
  activeSelectionBadge: string;
  nextPreviewBadge: string;
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
  viewAllTripsCta: string;
  showingAllTripsLabel: string;
  filterBySelectedDestinationCta: string;
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
    bookThisTripCta: string;
    jumpToItineraryCta: string;
    sectionNavAriaLabel: string;
    navOverview: string;
    navItinerary: string;
    navAccommodation: string;
    navGallery: string;
    navInclusions: string;
    navBook: string;
    overviewEyebrow: string;
    overviewHeading: string;
    corridorHeading: string;
    durationHeading: string;
    durationFlexibleValue: string;
    bookingModelHeading: string;
    catalogRefHeading: string;
    citiesCoveredHeading: string;
    travelStyleHeading: string;
    keyHighlightsHeading: string;
    itineraryEyebrow: string;
    itineraryHeading: string;
    itinerarySupporting: string;
    expandAllDaysLabel: string;
    collapseAllDaysLabel: string;
    dayPrefixLabel: string;
    scheduleTableHeading: string;
    scheduleColumnSegment: string;
    scheduleColumnFocus: string;
    scheduleColumnPacing: string;
    landmarksHeading: string;
    mealsHeading: string;
    mealsPendingValue: string;
    overnightHeading: string;
    overnightPendingValue: string;
    accommodationEyebrow: string;
    accommodationHeading: string;
    accommodationPendingBadge: string;
    accommodationPendingTitle: string;
    accommodationPendingMessage: string;
    accommodationOvernightZonesLabel: string;
    accommodationCategoriesLabel: string;
    accommodationCategoriesList: readonly string[];
    accommodationCtaLabel: string;
    galleryEyebrow: string;
    galleryHeading: string;
    gallerySupporting: string;
    galleryCaptions: Record<string, string>;
    inclusionsEyebrow: string;
    inclusionsHeading: string;
    inclusionsSupporting: string;
    confirmedPlanningTitle: string;
    confirmedPlanningItems: readonly string[];
    tailoredQuotationTitle: string;
    tailoredQuotationItems: readonly string[];
    practicalNotesTitle: string;
    practicalNotesItems: readonly string[];
    inquireHeading: string;
    inquireDescription: string;
    inquirePrimaryCta: string;
    inquireWhatsappCta: string;
    inquireEmailCta: string;
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
    nextPreviewBadge: "Up Next",
    otherDestinationsHeading: "Switch Destination",
    previewSelectLabel: "Select destination",
    prevDestinationLabel: "Previous destination",
    nextDestinationLabel: "Next destination",
    videoAtmosphereLabel: "Live Video Backdrop",
    journeysSectionEyebrow: "CURATED ITINERARIES",
    journeysSectionHeadingPrefix: "Journeys in",
    journeysSectionAllHeading: "All Curated Trips Across Egypt, Türkiye & Dubai",
    journeysSectionSupporting:
      "Inspect confirmed geographic corridors for the active destination or expand the full catalog to view all five curated trips.",
    filterAllDestinationsLabel: "All 3 Destinations",
    viewAllTripsCta: "View All Trips",
    showingAllTripsLabel: "Showing all 5 configured journeys",
    filterBySelectedDestinationCta: "Show Only Selected Destination",
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
      secondaryCta: "View All Trips",
    },
    journeyDetail: {
      backToDiscoveryLabel: "Back to Destination Discovery",
      viewAllDestinationsLabel: "Explore All Trips",
      bookThisTripCta: "Request This Trip",
      jumpToItineraryCta: "Day-by-Day Itinerary",
      sectionNavAriaLabel: "Trip detail sections",
      navOverview: "Overview",
      navItinerary: "Day-by-Day Itinerary",
      navAccommodation: "Accommodation",
      navGallery: "Gallery",
      navInclusions: "Scope & Notes",
      navBook: "Book / Inquire",
      overviewEyebrow: "JOURNEY OVERVIEW",
      overviewHeading: "Route Architecture & Confirmed Scope",
      corridorHeading: "Geographic Corridor",
      durationHeading: "Duration",
      durationFlexibleValue: "3-Stage Core Route · Custom Length on Request",
      bookingModelHeading: "Booking Format",
      catalogRefHeading: "Reference Code",
      citiesCoveredHeading: "Cities & Zones Covered",
      travelStyleHeading: "Travel Style",
      keyHighlightsHeading: "Confirmed Corridor Highlights",
      itineraryEyebrow: "DAY-BY-DAY ITINERARY",
      itineraryHeading: "Daily Route Progression & Schedule",
      itinerarySupporting:
        "Explore the structured day-by-day sequence across the destination's primary landmarks. Exact departure times and duration extensions are tailored to your travel dates.",
      expandAllDaysLabel: "Expand All Days",
      collapseAllDaysLabel: "Collapse All Days",
      dayPrefixLabel: "Day",
      scheduleTableHeading: "Structured Daily Pacing",
      scheduleColumnSegment: "Segment",
      scheduleColumnFocus: "Geographic Focus & Landmarks",
      scheduleColumnPacing: "Planning & Pacing Note",
      landmarksHeading: "Featured Landmarks & Corridors",
      mealsHeading: "Meals",
      mealsPendingValue: "Board basis confirmed in your personalized quotation",
      overnightHeading: "Overnight Zone",
      overnightPendingValue: "Hotel property confirmed upon quotation",
      accommodationEyebrow: "ACCOMMODATION & HOTELS",
      accommodationHeading: "Where You Stay & Property Selection",
      accommodationPendingBadge: "Confirmed Upon Quotation",
      accommodationPendingTitle:
        "Accommodation details will be confirmed by our team",
      accommodationPendingMessage:
        "WEST GLOBAL TOURS does not display unverified hotel names, placeholder room rates, or stock hotel interiors. Once you share your travel dates and party size, our planning desk proposes verified properties aligned with your preferred tier and overnight corridors.",
      accommodationOvernightZonesLabel: "Overnight Corridors for This Route",
      accommodationCategoriesLabel: "Available Property Tiers on Request",
      accommodationCategoriesList: [
        "5-Star Landmark & Riverfront / Waterfront Hotels",
        "Boutique Heritage & Historic Quarter Properties",
        "Private Family Suites & Connecting Room Configurations",
      ],
      accommodationCtaLabel: "Specify Hotel Preferences",
      galleryEyebrow: "VISUAL PORTFOLIO",
      galleryHeading: "Destination & Corridor Gallery",
      gallerySupporting:
        "Authentic photography from the destination landmarks and scenic corridors featured in this journey.",
      galleryCaptions: {
        luxor_nile_sanctuary:
          "Nile River sunset and ancient temple columns along the Luxor and Cairo corridor",
        giza_pyramids_sunset:
          "Great Pyramids of Giza rising above the desert plateau at golden hour",
        nile_felucca_horizon:
          "Traditional white felucca sailboats gliding across the Nile at sunset",
        luxor_colonnade_detail:
          "Monumental Pharaonic sandstone colonnades in the Luxor sanctuary zone",
        istanbul_historic_peninsula:
          "Istanbul Historic Peninsula and Golden Horn silhouette at dusk",
        golden_horn_minarets:
          "Imperial mosque domes and minarets overlooking the Istanbul waterfront",
        bosphorus_maidens_tower:
          "Maiden's Tower on the Bosphorus strait between Europe and Asia",
        istanbul_dusk_waterfront:
          "Evening reflections along Istanbul's historic maritime promenades",
        downtown_dubai_burj:
          "Burj Khalifa and Downtown Dubai skyline reflected in the waterfront promenade",
        dubai_waterfront_promenade:
          "Contemporary architectural towers and illuminated evening promenade in Dubai",
        arabian_gulf_skyline:
          "Dubai coastal skyline and Arabian Gulf horizon at sunset",
        sakkara_desert_horizon:
          "Pyramid sanctuaries and desert horizon across the Giza and Sakkara plateau",
        giza_plateau_camel_view:
          "Panoramic perspective across the Giza Pyramid complex",
        bosphorus_ferry_crossing:
          "Maritime ferry crossing the Bosphorus strait at sunset",
      },
      inclusionsEyebrow: "SCOPE, INCLUSIONS & PRACTICAL NOTES",
      inclusionsHeading: "What Is Included & How Quotations Work",
      inclusionsSupporting:
        "To keep every proposal transparent, we distinguish between our standard planning scope and customizable services confirmed in your written quotation.",
      confirmedPlanningTitle: "Included in Every WEST GLOBAL TOURS Consultation",
      confirmedPlanningItems: [
        "Dedicated trilingual itinerary planning desk (English, Turkish, and Spanish)",
        "Custom day-by-day route structuring across the confirmed geographic corridors",
        "Direct WhatsApp (+20 120 139 8685) and Email quotation support",
        "Flexible pacing adapted for solo travelers, couples, families, or private groups",
      ],
      tailoredQuotationTitle: "Customizable Services Confirmed in Your Quote",
      tailoredQuotationItems: [
        "Hotel accommodation category, room configuration, and daily meal board basis",
        "Private air-conditioned ground transfers and intercity transport segments",
        "Licensed local specialist guides and monument entrance ticket arrangements",
        "Optional domestic flights, Nile or Bosphorus boat charters, and duration extensions",
      ],
      practicalNotesTitle: "Exclusions & Important Planning Notes",
      practicalNotesItems: [
        "International airfare, visa fees, and personal travel insurance are not automatically included unless explicitly requested.",
        "Exact monument opening hours, payment schedules, deposit terms, and cancellation policies are provided in writing with your official quotation.",
      ],
      inquireHeading: "Ready to Plan This Journey?",
      inquireDescription:
        "Share your preferred travel dates, group size, and hotel preferences. Our team will prepare a tailored itinerary and transparent quotation via WhatsApp or Email.",
      inquirePrimaryCta: "Request This Trip",
      inquireWhatsappCta: "Inquire via WhatsApp",
      inquireEmailCta: "Request Quote by Email",
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
        corridorBadges: [
          "Cairo & Giza Plateau",
          "Nile Valley Corridor",
          "Luxor Sanctuaries",
        ],
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
        corridorBadges: [
          "Historic Peninsula",
          "Bosphorus Strait",
          "Üsküdar & Karaköy",
        ],
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
        corridorBadges: [
          "Downtown Dubai",
          "Burj Khalifa Corridor",
          "Arabian Gulf Waterfront",
        ],
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
        extendedOverview:
          "Designed for travelers seeking a cohesive connection between Egypt's northern capital and Upper Egypt's monumental Nile Valley. This route pairs the Giza Plateau and Old Cairo with the East and West Bank temple complexes of Luxor.",
        corridorLabel: "Cairo · Nile Valley · Luxor",
        inquiryFormatLabel: "Tailored Private Inquiry",
        travelStyleLabel: "Cultural & Archaeological Corridor",
        citiesCovered: ["Cairo", "Giza Plateau", "Nile Valley", "Luxor"],
        highlights: [
          "Great Pyramids of Giza & Sphinx panoramic plateau exploration",
          "Historic Cairo architectural heritage & Nile waterfront perspectives",
          "Luxor East & West Bank monumental temple sanctuaries",
          "Traditional sunset felucca perspective along the Nile River",
        ],
        overnightCorridors: [
          "Cairo / Giza Plateau Corridor",
          "Luxor Nile Riverfront Corridor",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Cairo & Giza Plateau",
            title: "Arrival in Cairo & The Great Pyramids of Giza",
            description:
              "Begin along the western desert plateau of Giza to explore the Great Pyramids of Khufu, Khafre, and Menkaure alongside the Great Sphinx and Valley Temple, with panoramic viewpoints across the Cairo horizon.",
            landmarks: [
              "Great Pyramids of Giza",
              "Great Sphinx & Valley Temple",
              "Giza Western Plateau Viewpoint",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Giza Plateau & Great Pyramids Sanctuary",
                pacingNote: "Private pacing tailored to your arrival window",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Sphinx Precinct & Panoramic Desert Ridge",
                pacingNote: "Flexible photography & archaeological context",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Cairo Nile Riverfront Leisure",
                pacingNote: "Optional dinner or riverfront walk on request",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Historic Cairo & Nile Corridor",
            title: "Old Cairo Heritage & Transition to Upper Egypt",
            description:
              "Explore the layered architectural heritage of Historic Cairo and its museum collections before transitioning southward along the Nile Valley corridor toward Luxor.",
            landmarks: [
              "Historic Cairo Quarters",
              "Egyptian Antiquities Collections",
              "Nile Valley Southern Corridor",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Antiquities & Historic Cairo Citadels",
                pacingNote: "Curated route based on your cultural interests",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Old Cairo Bazaars & Nile Corridor Connection",
                pacingNote: "Domestic flight or rail transfer arranged in quote",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Luxor Corniche Arrival & Illuminated Temple View",
                pacingNote: "Evening check-in along the Luxor Nile zone",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Luxor & The Nile River",
            title: "Luxor Temple Sanctuaries & Sunset Felucca Sail",
            description:
              "Discover the monumental colonnades of Karnak and Luxor on the East Bank along with the royal necropolis valleys of the West Bank, concluding with a serene sunset perspective on the Nile.",
            landmarks: [
              "Karnak & Luxor Temple Complexes",
              "Theban West Bank Sanctuaries",
              "Nile Sunset Felucca Corridor",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "West Bank Royal Necropolis & Memorial Temples",
                pacingNote: "Early start recommended for cooler desert air",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Karnak Great Hypostyle Hall & Avenue of Sphinxes",
                pacingNote: "Guided archaeological walk at your own pace",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Golden-Hour Nile Felucca Perspective",
                pacingNote: "Onward departure or multi-day Nile extension",
              },
            },
          },
        ],
      },
      "turkiye-culture-escape": {
        title: "Türkiye Culture Escape",
        locationLabel: "Istanbul, Türkiye",
        description:
          "Experience Istanbul's historic peninsula, imperial architecture, and culinary traditions across Europe and Asia.",
        extendedOverview:
          "A focused cultural immersion into Istanbul's imperial heart. Walk through centuries of Byzantine and Ottoman heritage in Sultanahmet, explore historic covered markets above the Golden Horn, and experience vibrant neighborhood life across both shores.",
        corridorLabel: "Historic Peninsula · Golden Horn",
        inquiryFormatLabel: "Tailored Private Inquiry",
        travelStyleLabel: "Imperial Architecture & Culinary Heritage",
        citiesCovered: [
          "Sultanahmet",
          "Historic Peninsula",
          "Golden Horn",
          "Beyoğlu & Eminönü",
        ],
        highlights: [
          "Sultanahmet imperial mosque domes, courtyards, and historic monuments",
          "Grand Bazaar & Spice Market artisan and culinary corridors",
          "Golden Horn panoramic viewpoints and waterfront heritage",
          "Cross-continental cultural quarters linking European and Asian traditions",
        ],
        overnightCorridors: [
          "Sultanahmet / Historic Peninsula Zone",
          "Golden Horn & Karaköy Waterfront Zone",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Sultanahmet, Istanbul",
            title: "Imperial Monuments of the Historic Peninsula",
            description:
              "Explore the UNESCO-listed heart of Old Istanbul around Sultanahmet Square, tracing monumental domes, tranquil courtyards, and subterranean cistern architecture.",
            landmarks: [
              "Hagia Sophia & Blue Mosque Precinct",
              "Hippodrome & Sultanahmet Square",
              "Topkapı Palace Imperial Courtyards",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Sultanahmet Square & Monumental Sanctuaries",
                pacingNote: "Walking-friendly route in the historic core",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Imperial Palace Pavilions & Historic Cisterns",
                pacingNote: "Timed around monument visiting windows",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Rooftop Terrace Views Over the Minarets",
                pacingNote: "Culinary recommendations tailored to your group",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Golden Horn & Historic Bazaars",
            title: "Grand Bazaar Artisans, Spice Market & Golden Horn",
            description:
              "Navigate the vaulted lanes of the Grand Bazaar and the aromatic Spice Bazaar in Eminönü, followed by scenic viewpoints along the Golden Horn inlet.",
            landmarks: [
              "Grand Bazaar Covered Lanes",
              "Eminönü Spice Bazaar",
              "Golden Horn Waterfront & Hilltop Views",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Grand Bazaar Courtyards & Traditional Crafts",
                pacingNote: "Tailored to artisan, textile, or historical focus",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Spice Market & Golden Horn Historic Quarters",
                pacingNote: "Includes traditional Turkish coffee & culinary stops",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Sunset Along the Galata & Golden Horn Bridges",
                pacingNote: "Evening leisure along the waterfront",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Beyoğlu & Cross-Continental Istanbul",
            title: "Galata Heritage, Culinary Streets & Farewell Panorama",
            description:
              "Ascend toward the historic Galata and Pera quarters to experience 19th-century passages, contemporary art promenades, and sweeping vistas where the Golden Horn meets the Bosphorus.",
            landmarks: [
              "Galata Tower Quarter",
              "İstiklal & Pera Historic Passages",
              "Bosphorus & Golden Horn Confluence",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Galata Cobblestone Lanes & Panoramic Terrace",
                pacingNote: "Relaxed morning architectural walk",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Pera Cultural Passages & Local Gastronomy",
                pacingNote: "Flexible time for shopping or museum visits",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Departure Transfer or Türkiye Route Extension",
                pacingNote: "Can be combined with Bosphorus or regional extensions",
              },
            },
          },
        ],
      },
      "dubai-city-experience": {
        title: "Dubai City Experience",
        locationLabel: "Dubai, UAE",
        description:
          "Discover contemporary architectural icons, waterfront promenades, and desert horizons in the heart of Dubai.",
        extendedOverview:
          "Our signature urban-and-horizon itinerary in the United Arab Emirates. Experience the vertical engineering of Downtown Dubai and Burj Khalifa, stroll illuminated Arabian Gulf promenades, and contrast futuristic skylines with timeless desert dunes.",
        corridorLabel: "Downtown Dubai · Waterfront · Arabian Gulf",
        inquiryFormatLabel: "Featured Signature Journey",
        travelStyleLabel: "Contemporary Architecture, Coast & Desert",
        citiesCovered: [
          "Downtown Dubai",
          "Burj Khalifa District",
          "Arabian Gulf Waterfront",
          "Dubai Desert Conservation Horizon",
        ],
        highlights: [
          "Downtown Dubai boulevard, Burj Khalifa skyline & waterfront promenades",
          "Arabian Gulf marina and coastal architectural vistas",
          "Historic Dubai Creek heritage quarters & traditional abra crossing",
          "Golden-hour desert dune horizon experience outside the city core",
        ],
        overnightCorridors: [
          "Downtown Dubai / Burj Khalifa Boulevard Corridor",
          "Arabian Gulf Waterfront / Marina Corridor",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Downtown Dubai",
            title: "Burj Khalifa Skyline & Illuminated Waterfront Promenade",
            description:
              "Immerse yourself in the architectural centerpiece of modern Dubai, exploring Downtown boulevards, waterfront lagoons, and elevated observation perspectives over the city.",
            landmarks: [
              "Burj Khalifa & Downtown Boulevard",
              "Dubai Waterfront Fountains & Lagoons",
              "Contemporary Design & Opera District",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Arrival & Downtown Architectural Orientation",
                pacingNote: "Private transfer & check-in coordination",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Skyline Observation Deck & Boulevard Promenades",
                pacingNote: "Timed for clear afternoon & sunset visibility",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Illuminated Waterfront Show & Dining Promenade",
                pacingNote: "Evening leisure in the heart of Downtown Dubai",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Arabian Gulf Coast & Marina",
            title: "Coastal Architecture, Palm Horizon & Marina Walk",
            description:
              "Follow the shimmering coastline of the Arabian Gulf from Jumeirah's beachfront landmarks to the high-rise waterfront canals of Dubai Marina.",
            landmarks: [
              "Arabian Gulf Coastal Corniche",
              "Palm & Marina Waterfront Canals",
              "Evening Dhow or Yacht Perspective",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Jumeirah Coastline & Architectural Icons",
                pacingNote: "Scenic coastal route with photo stops",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Waterfront Boardwalks & Island Viewpoints",
                pacingNote: "Relaxed afternoon pacing by the Arabian Gulf",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Dubai Marina Illuminated Skyline Walk",
                pacingNote: "Optional private waterfront cruise in quotation",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Old Dubai Creek & Desert Horizon",
            title: "Historic Creek Souks & Golden Desert Dunes",
            description:
              "Contrast Dubai's trading origins along the historic Creek and Al Fahidi wind-tower quarter with an afternoon transition into the sweeping golden dunes of the Arabian desert.",
            landmarks: [
              "Al Fahidi Historic District & Dubai Creek",
              "Traditional Gold & Spice Souk Lanes",
              "Arabian Desert Sunset Dunes",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Al Fahidi Courtyard Houses & Creek Abra Crossing",
                pacingNote: "Cultural heritage walk in Old Dubai",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Transition to the Golden Desert Dunes",
                pacingNote: "Private 4x4 desert excursion options on request",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Desert Sunset Horizon & Return to City / Airport",
                pacingNote: "Customizable for longer UAE stays",
              },
            },
          },
        ],
      },
      "egypt-heritage-trail": {
        title: "Egypt Heritage Trail",
        locationLabel: "Giza & Cairo, Egypt",
        description:
          "Trace antiquity across the Giza Plateau and Old Cairo landmarks with curated archaeological context.",
        extendedOverview:
          "A concentrated archaeological journey through Egypt's Old Kingdom pyramid fields and historic capital quarters. Ideal for travelers who want deep historical context across Giza, Sakkara, Memphis, and Old Cairo without rushing.",
        corridorLabel: "Giza Plateau · Memphis · Sakkara",
        inquiryFormatLabel: "Tailored Private Inquiry",
        travelStyleLabel: "Focused Archaeological & Pyramid Trail",
        citiesCovered: ["Giza Plateau", "Sakkara", "Memphis", "Old Cairo"],
        highlights: [
          "Comprehensive exploration of the Giza Pyramid complex and Valley Temple",
          "Step Pyramid of Djoser and Old Kingdom tombs at Sakkara",
          "Open-air colossi and royal antiquities at ancient Memphis",
          "Historic Cairo citadels, mosques, and Coptic heritage quarters",
        ],
        overnightCorridors: [
          "Giza Plateau View Corridor",
          "Central Cairo / Nile Corridor",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Giza Plateau, Egypt",
            title: "The Great Pyramids, Sphinx & Desert Plateau",
            description:
              "Dedicate a full, unhurried day to the Giza Plateau, examining the pyramid complexes of Khufu, Khafre, and Menkaure, the Solar Boat precinct, and the Great Sphinx.",
            landmarks: [
              "Great Pyramid of Khufu",
              "Pyramid of Khafre & Menkaure",
              "Great Sphinx & Valley Temple",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Giza Pyramid Precinct & Architectural Walk",
                pacingNote: "Structured with Egyptologist context on request",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Western Plateau Panorama & Valley Temple",
                pacingNote: "Unhurried time for photography and exploration",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Sunset View Over the Pyramid Silhouette",
                pacingNote: "Relaxed evening in Giza or Cairo",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Sakkara & Ancient Memphis",
            title: "Origins of Stone Architecture at Sakkara & Memphis",
            description:
              "Journey south of Giza to the ancient necropolis of Sakkara — home to the Step Pyramid of Djoser — and continue to the palm-shaded open-air museum of Memphis, Egypt's first imperial capital.",
            landmarks: [
              "Step Pyramid of Djoser at Sakkara",
              "Old Kingdom Painted Mastaba Tombs",
              "Memphis Open-Air Museum & Colossi",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Sakkara Step Pyramid & funerary Complex",
                pacingNote: "Traces the evolution of pyramid construction",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Ancient Capital of Memphis & Royal Statuary",
                pacingNote: "Scenic drive through Nile palm groves",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Return to Cairo & Nile Evening Walk",
                pacingNote: "Flexible evening dining options",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Old Cairo & Nile Island Quarters",
            title: "Citadel Panorama, Historic Cairo & Nile Felucca",
            description:
              "Conclude your trail through the historic quarters of Coptic and Islamic Cairo, visiting hilltop citadel viewpoints and traditional bazaar lanes before a tranquil sunset along the Nile.",
            landmarks: [
              "Citadel Hilltop Panorama",
              "Coptic & Islamic Cairo Heritage Lanes",
              "Nile River Sunset Felucca",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Old Cairo Sanctuaries & Citadel Viewpoint",
                pacingNote: "Covers centuries of Cairo urban history",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Historic Market Artisans & Museum Highlights",
                pacingNote: "Tailored to your departure schedule",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Sunset Nile Sail or Airport Transfer",
                pacingNote: "Can be extended with Luxor or Red Sea add-ons",
              },
            },
          },
        ],
      },
      "istanbul-bosphorus-getaway": {
        title: "Istanbul & Bosphorus Getaway",
        locationLabel: "Istanbul, Türkiye",
        description:
          "Sail between two continents along the Bosphorus strait past Maiden's Tower, waterfront palaces, and historic neighborhoods.",
        extendedOverview:
          "A maritime-focused Istanbul itinerary celebrating the waterway that divides and connects Europe and Asia. Combine private or small-group Bosphorus sailing with waterfront palaces, the Asian shore's Üsküdar promenade, and the vibrant creative piers of Karaköy.",
        corridorLabel: "Bosphorus Strait · Üsküdar · Karaköy",
        inquiryFormatLabel: "Tailored Private Inquiry",
        travelStyleLabel: "Two-Continent Maritime & Waterfront Escape",
        citiesCovered: [
          "Bosphorus Strait",
          "Karaköy & Beşiktaş",
          "Üsküdar (Asian Shore)",
          "Maiden's Tower Corridor",
        ],
        highlights: [
          "Scenic Bosphorus strait sailing past Ottoman waterfront palaces and wooden yalı mansions",
          "Üsküdar Asian-shore promenade with sunset views of Maiden's Tower (Kız Kulesi)",
          "Karaköy and Galata waterfront piers, cafés, and contemporary cultural spaces",
          "Seamless cross-continental ferry and private boat routing options",
        ],
        overnightCorridors: [
          "Bosphorus European Shore (Karaköy / Beşiktaş)",
          "Historic Peninsula / Golden Horn Overlook",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Bosphorus European Shore",
            title: "Waterfront Palaces & Bosphorus Strait Cruise",
            description:
              "Begin along the European shore of the Bosphorus in Beşiktaş and Kabataş, exploring ornate imperial waterfront palaces before embarking on a scenic cruise between Europe and Asia.",
            landmarks: [
              "Dolmabahçe & Waterfront Palace Precinct",
              "Bosphorus Strait Maritime Channel",
              "Ortaköy Mosque & Bridge Panorama",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "European Shore Imperial Waterfront Palaces",
                pacingNote: "Guided architectural visit along the strait",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Bosphorus Cruise Past Yalı Mansions & Fortresses",
                pacingNote: "Private yacht or curated ferry options in quote",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Ortaköy & Bosphorus Shoreline Evening",
                pacingNote: "Waterfront dining recommendations available",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Üsküdar & Asian Shore",
            title: "Cross-Continental Ferry to Üsküdar & Maiden's Tower",
            description:
              "Cross the strait to Istanbul's Asian shore to explore Üsküdar's historic waterfront mosques, tea gardens, and the iconic silhouette of Maiden's Tower (Kız Kulesi) at golden hour.",
            landmarks: [
              "Maiden's Tower (Kız Kulesi) Promenade",
              "Üsküdar Historic Waterfront",
              "Kadıköy & Kuzguncuk Neighborhood Lanes",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Scenic Ferry Crossing & Kuzguncuk Wooden Houses",
                pacingNote: "Authentic local neighborhood atmosphere",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Üsküdar Squares & Asian-Shore Markets",
                pacingNote: "Relaxed coastal and culinary exploration",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Sunset Opposite Maiden's Tower & Historic Peninsula",
                pacingNote: "Signature golden-hour photography vantage point",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Karaköy & Golden Horn",
            title: "Karaköy Waterfront Piers, Galata & Farewell Vista",
            description:
              "Spend your final day around the revitalized port district of Karaköy and Galata, where historic maritime warehouses meet contemporary galleries and panoramic rooftop views.",
            landmarks: [
              "Karaköy Waterfront Promenade",
              "Galata Historic Quarter",
              "Golden Horn & Bosphorus Harbor View",
            ],
            segments: {
              morning: {
                periodLabel: "Morning",
                focusTitle: "Karaköy Port Promenade & Historic Passages",
                pacingNote: "Stroll along the Bosphorus entrance",
              },
              afternoon: {
                periodLabel: "Afternoon",
                focusTitle: "Galata Boutiques & Waterfront Museums",
                pacingNote: "Flexible pacing before onward travel",
              },
              evening: {
                periodLabel: "Evening",
                focusTitle: "Departure Transfer or Extended Türkiye Itinerary",
                pacingNote: "Tailored to your flight or continuation dates",
              },
            },
          },
        ],
      },
    },
  },
  tr: {
    pageEyebrow: "WEST GLOBAL TOURS · DESTİNASYON PORTFÖYÜ",
    backToHomeLabel: "Ana Sayfaya Dön",
    railAriaLabel: "Destinasyon seçici ilerleme çubuğu",
    activeSelectionBadge: "Aktif Destinasyon",
    nextPreviewBadge: "Sıradaki",
    otherDestinationsHeading: "Destinasyon Değiştir",
    previewSelectLabel: "Destinasyon seçin",
    prevDestinationLabel: "Önceki destinasyon",
    nextDestinationLabel: "Sonraki destinasyon",
    videoAtmosphereLabel: "Canlı Video Atmosferi",
    journeysSectionEyebrow: "SEÇKİN ROTALAR",
    journeysSectionHeadingPrefix: "Seçili Destinasyon Turları:",
    journeysSectionAllHeading:
      "Mısır, Türkiye ve Dubai Genelindeki Tüm Seçkin Turlar",
    journeysSectionSupporting:
      "Seçili destinasyonun doğrulanmış rota koridorlarını inceleyin veya beş seçkin turun tamamını görmek için tüm listeyi açın.",
    filterAllDestinationsLabel: "Tüm 3 Destinasyon",
    viewAllTripsCta: "Tüm Turları Gör",
    showingAllTripsLabel: "Yapılandırılmış 5 turun tamamı gösteriliyor",
    filterBySelectedDestinationCta: "Yalnızca Seçili Destinasyonu Göster",
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
      secondaryCta: "Tüm Turları Gör",
    },
    journeyDetail: {
      backToDiscoveryLabel: "Destinasyon Keşfine Dön",
      viewAllDestinationsLabel: "Tüm Turları Keşfet",
      bookThisTripCta: "Bu Turu Talep Et",
      jumpToItineraryCta: "Gün Gün Program",
      sectionNavAriaLabel: "Tur detay bölümleri",
      navOverview: "Genel Bakış",
      navItinerary: "Gün Gün Program",
      navAccommodation: "Konaklama",
      navGallery: "Galeri",
      navInclusions: "Kapsam ve Notlar",
      navBook: "Teklif / Rezervasyon",
      overviewEyebrow: "TUR GENEL BAKIŞI",
      overviewHeading: "Rota Mimarisi ve Doğrulanmış Kapsam",
      corridorHeading: "Coğrafi Koridor",
      durationHeading: "Süre",
      durationFlexibleValue: "3 Aşamalı Ana Rota · Tarihinize Göre Esnek Süre",
      bookingModelHeading: "Rezervasyon Modeli",
      catalogRefHeading: "Katalog Kodu",
      citiesCoveredHeading: "Kapsanan Şehir ve Bölgeler",
      travelStyleHeading: "Seyahat Tarzı",
      keyHighlightsHeading: "Doğrulanmış Rota Öne Çıkanları",
      itineraryEyebrow: "GÜN GÜN SEYAHAT PROGRAMI",
      itineraryHeading: "Günlük Rota Akışı ve Planlama",
      itinerarySupporting:
        "Destinasyonun ana simgeleri boyunca yapılandırılmış gün gün rota akışını inceleyin. Kesin hareket saatleri ve süre uzatmaları seyahat tarihlerinize göre uyarlanır.",
      expandAllDaysLabel: "Tüm Günleri Aç",
      collapseAllDaysLabel: "Tüm Günleri Kapat",
      dayPrefixLabel: "Gün",
      scheduleTableHeading: "Yapılandırılmış Günlük Akış",
      scheduleColumnSegment: "Zaman Dilimi",
      scheduleColumnFocus: "Coğrafi Odak ve Simgeler",
      scheduleColumnPacing: "Planlama ve Tempo Notu",
      landmarksHeading: "Öne Çıkan Noktalar ve Koridorlar",
      mealsHeading: "Öğünler",
      mealsPendingValue: "Pansiyon durumu özel teklifinizde netleştirilir",
      overnightHeading: "Konaklama Bölgesi",
      overnightPendingValue: "Otel seçimi teklif aşamasında teyit edilir",
      accommodationEyebrow: "KONAKLAMA VE OTELLER",
      accommodationHeading: "Konaklama Bölgeleri ve Otel Seçimi",
      accommodationPendingBadge: "Teklif İle Teyit Edilir",
      accommodationPendingTitle:
        "Konaklama detayları ekibimiz tarafından teyit edilecektir",
      accommodationPendingMessage:
        "WEST GLOBAL TOURS doğrulanmamış otel isimleri, tahmini oda fiyatları veya stok otel fotoğrafları yayınlamaz. Seyahat tarihlerinizi ve grup büyüklüğünüzü paylaştığınızda, planlama ekibimiz tercih ettiğiniz kategoriye uygun doğrulanmış otel seçeneklerini sunar.",
      accommodationOvernightZonesLabel: "Bu Rota İçin Konaklama Koridorları",
      accommodationCategoriesLabel: "Talep Edilebilecek Konaklama Kategorileri",
      accommodationCategoriesList: [
        "5 Yıldızlı Simge Yapı ve Nehir / Boğaz / Kıyı Otelleri",
        "Butik Miras ve Tarihi Yarımada Konaklama Seçenekleri",
        "Özel Aile Süitleri ve Bağlantılı Oda Konfigürasyonları",
      ],
      accommodationCtaLabel: "Otel Tercihini Belirt",
      galleryEyebrow: "GÖRSEL PORTFÖY",
      galleryHeading: "Destinasyon ve Rota Galerisi",
      gallerySupporting:
        "Bu yolculukta yer alan destinasyon simgelerinden ve manzara koridorlarından özgün fotoğraflar.",
      galleryCaptions: {
        luxor_nile_sanctuary:
          "Luksor ve Kahire koridorunda Nil Nehri gün batımı ve antik tapınak sütunları",
        giza_pyramids_sunset:
          "Altın saatte çöl platosu üzerinde yükselen Gize Piramitleri",
        nile_felucca_horizon:
          "Gün batımında Nil Nehri'nde süzülen geleneksel beyaz feluka yelkenlileri",
        luxor_colonnade_detail:
          "Luksor tapınak bölgesindeki anıtsal kumtaşı sütun dizileri",
        istanbul_historic_peninsula:
          "Alacakaranlıkta İstanbul Tarihi Yarımada ve Haliç silüeti",
        golden_horn_minarets:
          "İstanbul kıyısına bakan imparatorluk camisi kubbeleri ve minareleri",
        bosphorus_maidens_tower:
          "Avrupa ve Asya arasındaki İstanbul Boğazı'nda Kız Kulesi",
        istanbul_dusk_waterfront:
          "İstanbul'un tarihi deniz kordonlarında akşam yansımaları",
        downtown_dubai_burj:
          "Su kıyısı bulvarında yansıyan Burj Khalifa ve Downtown Dubai silüeti",
        dubai_waterfront_promenade:
          "Dubai'de çağdaş mimari kuleler ve ışıklandırılmış akşam kordonu",
        arabian_gulf_skyline:
          "Gün batımında Dubai kıyı silüeti ve Basra Körfezi ufku",
        sakkara_desert_horizon:
          "Gize ve Sakkara platosunda piramit tapınakları ve çöl ufku",
        giza_plateau_camel_view:
          "Gize Piramit kompleksi boyunca panoramik görünüm",
        bosphorus_ferry_crossing:
          "Gün batımında İstanbul Boğazı'nı geçen şehir hatları vapuru",
      },
      inclusionsEyebrow: "KAPSAM, DAHİL OLANLAR VE PRATİK NOTLAR",
      inclusionsHeading: "Neler Dahil ve Teklif Süreci Nasıl İşler",
      inclusionsSupporting:
        "Her teklifin şeffaf olması için standart planlama kapsamımız ile yazılı teklifinizde netleştirilen kişiselleştirilebilir hizmetleri birbirinden ayırıyoruz.",
      confirmedPlanningTitle:
        "Her WEST GLOBAL TOURS Danışmanlığına Dahil Olanlar",
      confirmedPlanningItems: [
        "Üç dilli özel rota planlama masası (İngilizce, Türkçe ve İspanyolca)",
        "Doğrulanmış coğrafi koridorlar boyunca kişiye özel gün gün rota kurgusu",
        "Doğrudan WhatsApp (+20 120 139 8685) ve E-posta üzerinden teklif desteği",
        "Bireysel gezginler, çiftler, aileler veya özel gruplar için esnek tempo",
      ],
      tailoredQuotationTitle: "Teklifinizde Teyit Edilen Kişiselleştirilebilir Hizmetler",
      tailoredQuotationItems: [
        "Otel konaklama kategorisi, oda tipi ve günlük yemek/pansiyon planı",
        "Özel klimalı kara transferleri ve şehirlerarası ulaşım bağlantıları",
        "Lisanslı uzman yerel rehberlik ve müze/ören yeri giriş bileti organizasyonu",
        "İsteğe bağlı iç hat uçuşları, Nil veya Boğaz tekne kiralamaları ve süre uzatmaları",
      ],
      practicalNotesTitle: "Hariç Olanlar ve Önemli Planlama Notları",
      practicalNotesItems: [
        "Uluslararası uçak biletleri, vize harçları ve kişisel seyahat sigortası açıkça talep edilmedikçe otomatik olarak dahil değildir.",
        "Kesin ziyaret saatleri, ödeme takvimi, kapora koşulları ve iptal şartları resmi yazılı teklifinizle birlikte sunulur.",
      ],
      inquireHeading: "Bu Yolculuğu Planlamaya Hazır mısınız?",
      inquireDescription:
        "Tercih ettiğiniz seyahat tarihlerini, kişi sayısını ve otel beklentilerinizi paylaşın. Ekibimiz WhatsApp veya E-posta üzerinden size özel rota ve şeffaf teklif hazırlasın.",
      inquirePrimaryCta: "Bu Turu Talep Et",
      inquireWhatsappCta: "WhatsApp ile Sor",
      inquireEmailCta: "E-posta ile Teklif İste",
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
        corridorBadges: [
          "Kahire ve Gize Platosu",
          "Nil Vadisi Koridoru",
          "Luksor Tapınakları",
        ],
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
        corridorBadges: [
          "Tarihi Yarımada",
          "İstanbul Boğazı",
          "Üsküdar ve Karaköy",
        ],
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
        corridorBadges: [
          "Downtown Dubai",
          "Burj Khalifa Koridoru",
          "Körfez Kıyısı",
        ],
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
        extendedOverview:
          "Mısır'ın kuzey başkenti ile Yukarı Mısır'ın anıtsal Nil Vadisi arasında bütünlüklü bir bağ kurmak isteyen gezginler için tasarlandı. Bu rota, Gize Platosu ve Eski Kahire'yi Luksor'un Doğu ve Batı Yakası tapınak kompleksleriyle birleştirir.",
        corridorLabel: "Kahire · Nil Vadisi · Luksor",
        inquiryFormatLabel: "Özel Kişisel Teklif",
        travelStyleLabel: "Kültürel ve Arkeolojik Koridor",
        citiesCovered: ["Kahire", "Gize Platosu", "Nil Vadisi", "Luksor"],
        highlights: [
          "Gize Piramitleri ve Büyük Sfenks panoramik plato keşfi",
          "Tarihi Kahire mimari mirası ve Nil kıyısı perspektifleri",
          "Luksor Doğu ve Batı Yakası anıtsal tapınak kompleksleri",
          "Nil Nehri üzerinde geleneksel gün batımı feluka deneyimi",
        ],
        overnightCorridors: [
          "Kahire / Gize Platosu Koridoru",
          "Luksor Nil Kıyısı Koridoru",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Kahire ve Gize Platosu",
            title: "Kahire'ye Varış ve Gize Piramitleri",
            description:
              "Gize'nin batı çöl platosunda Keops, Kefren ve Mikerinos piramitlerini, Büyük Sfenks'i ve Vadi Tapınağı'nı keşfederek başlayın; Kahire ufku üzerinde panoramik seyir noktalarını deneyimleyin.",
            landmarks: [
              "Gize Büyük Piramitleri",
              "Büyük Sfenks ve Vadi Tapınağı",
              "Gize Batı Platosu Seyir Noktası",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Gize Platosu ve Büyük Piramitler Bölgesi",
                pacingNote: "Varış saatinize göre uyarlanmış özel tempo",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Sfenks Alanı ve Panoramik Çöl Sırtı",
                pacingNote: "Fotoğraf ve arkeolojik anlatım için esnek süre",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Kahire Nil Kıyısında Serbest Zaman",
                pacingNote: "Talebe göre akşam yemeği veya nehir kıyısı yürüyüşü",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Tarihi Kahire ve Nil Koridoru",
            title: "Eski Kahire Mirası ve Yukarı Mısır Bağlantısı",
            description:
              "Nil Vadisi koridoru boyunca güneye, Luksor'a doğru geçmeden önce Tarihi Kahire'nin çok katmanlı mimari mirasını ve koleksiyonlarını keşfedin.",
            landmarks: [
              "Tarihi Kahire Semtleri",
              "Mısır Eski Eserler Koleksiyonları",
              "Nil Vadisi Güney Koridoru",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Tarihi Kahire Kalesi ve Müzeler",
                pacingNote: "Kültürel ilgi alanlarınıza göre kurgulanan rota",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Eski Kahire Çarşıları ve Luksor Bağlantısı",
                pacingNote: "Uçuş veya tren transferi teklifte organize edilir",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Luksor Kordonuna Varış ve Işıklandırılmış Tapınak Görünümü",
                pacingNote: "Luksor Nil kıyısı bölgesinde akşam yerleşimi",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Luksor ve Nil Nehri",
            title: "Luksor Tapınakları ve Gün Batımı Feluka Seyri",
            description:
              "Doğu Yakası'ndaki Karnak ve Luksor tapınaklarının anıtsal sütunlarını ve Batı Yakası'nın kraliyet nekropol vadilerini keşfedin; günü Nil üzerinde huzurlu bir gün batımıyla tamamlayın.",
            landmarks: [
              "Karnak ve Luksor Tapınak Kompleksleri",
              "Batı Yakası Kraliyet Nekropolü",
              "Nil Gün Batımı Feluka Koridoru",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Batı Yakası Kraliyet Vadisi ve Anıt Tapınaklar",
                pacingNote: "Serin sabah saatleri için erken başlangıç önerilir",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Karnak Büyük Hipostil Salonu ve Sfenksli Yol",
                pacingNote: "Kendi temponuzda rehberli arkeolojik yürüyüş",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Altın Saatte Nil Feluka Perspektifi",
                pacingNote: "Dönüş transferi veya çok günlü Nil uzatması",
              },
            },
          },
        ],
      },
      "turkiye-culture-escape": {
        title: "Türkiye Kültür Kaçamağı",
        locationLabel: "İstanbul, Türkiye",
        description:
          "Avrupa ve Asya yakasında İstanbul'un tarihi yarımadasını, imparatorluk mimarisini ve mutfak kültürünü deneyimleyin.",
        extendedOverview:
          "İstanbul'un imparatorluk kalbine odaklanan kapsamlı bir kültür rotası. Sultanahmet'te yüzyıllara yayılan Bizans ve Osmanlı mirasını adımlayın, Haliç üzerindeki tarihi kapalı çarşıları keşfedin ve iki kıtanın mahalle kültürünü deneyimleyin.",
        corridorLabel: "Tarihi Yarımada · Haliç",
        inquiryFormatLabel: "Özel Kişisel Teklif",
        travelStyleLabel: "İmparatorluk Mimarisi ve Gastronomi Mirası",
        citiesCovered: [
          "Sultanahmet",
          "Tarihi Yarımada",
          "Haliç",
          "Beyoğlu ve Eminönü",
        ],
        highlights: [
          "Sultanahmet imparatorluk camileri, avluları ve tarihi anıtları",
          "Kapalıçarşı ve Mısır Çarşısı zanaat ve lezzet koridorları",
          "Haliç panoramik seyir noktaları ve kıyı mirası",
          "Avrupa ve Asya geleneklerini buluşturan kültür durakları",
        ],
        overnightCorridors: [
          "Sultanahmet / Tarihi Yarımada Bölgesi",
          "Haliç ve Karaköy Kıyı Bölgesi",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Sultanahmet, İstanbul",
            title: "Tarihi Yarımada'nın İmparatorluk Anıtları",
            description:
              "Sultanahmet Meydanı çevresindeki UNESCO mirası Eski İstanbul kalbini, anıtsal kubbeleri, saray avlularını ve tarihi sarnıç mimarisini keşfedin.",
            landmarks: [
              "Ayasofya ve Sultanahmet Camii Çevresi",
              "Hipodrom ve Sultanahmet Meydanı",
              "Topkapı Sarayı Avluları",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Sultanahmet Meydanı ve Anıtsal Mabedler",
                pacingNote: "Tarihi merkezde yürüyüş dostu rota",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Saray Köşkleri ve Tarihi Sarnıçlar",
                pacingNote: "Ziyaret saatlerine göre optimize edilmiş akış",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Minareler Üzerinde Teras Manzarası",
                pacingNote: "Grubunuza özel gastronomi önerileri",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Haliç ve Tarihi Çarşılar",
            title: "Kapalıçarşı Zanaatkarları, Mısır Çarşısı ve Haliç",
            description:
              "Kapalıçarşı'nın tonozlu sokaklarını ve Eminönü'ndeki Mısır Çarşısı'nın baharat kokulu koridorlarını gezin; ardından Haliç kıyısındaki seyir noktalarına geçin.",
            landmarks: [
              "Kapalıçarşı Tarihi Hanları",
              "Eminönü Mısır Çarşısı",
              "Haliç Kıyısı ve Panoramik Tepeler",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Kapalıçarşı Avluları ve Geleneksel El Sanatları",
                pacingNote: "Zanaat, tekstil veya tarih odaklı özel kurgu",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Mısır Çarşısı ve Haliç Tarihi Semtleri",
                pacingNote: "Geleneksel Türk kahvesi ve lezzet durakları dahil",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Galata ve Haliç Köprülerinde Gün Batımı",
                pacingNote: "Su kıyısında akşam serbest zamanı",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Beyoğlu ve İki Kıta İstanbul",
            title: "Galata Mirası, Lezzet Sokakları ve Veda Panoraması",
            description:
              "19. yüzyıl pasajlarını, çağdaş sanat duraklarını ve Haliç'in Boğaz ile buluştuğu panoramayı deneyimlemek için tarihi Galata ve Pera semtlerine çıkın.",
            landmarks: [
              "Galata Kulesi Semti",
              "İstiklal ve Pera Tarihi Pasajları",
              "Boğaz ve Haliç Kavşağı",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Galata Arnavut Kaldırımlı Sokaklar ve Teras",
                pacingNote: "Rahat tempolu sabah mimari yürüyüşü",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Pera Kültür Pasajları ve Yerel Lezzetler",
                pacingNote: "Alışveriş veya müze ziyareti için esnek zaman",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Dönüş Transferi veya Türkiye Rota Uzatması",
                pacingNote: "Boğaz veya farklı şehir uzatmalarıyla birleştirilebilir",
              },
            },
          },
        ],
      },
      "dubai-city-experience": {
        title: "Dubai Şehir Deneyimi",
        locationLabel: "Dubai, BAE",
        description:
          "Dubai'nin kalbinde çağdaş mimari simgeleri, su kıyısı kordonlarını ve çöl ufuklarını keşfedin.",
        extendedOverview:
          "Birleşik Arap Emirlikleri'ndeki imza şehir ve ufuk rotamız. Downtown Dubai ve Burj Khalifa'nın dikey mimarisini deneyimleyin, Basra Körfezi'nin ışıltılı su kıyısı bulvarlarında yürüyün ve modern silüeti altın çöl kumullarıyla tamamlayın.",
        corridorLabel: "Downtown Dubai · Su Kıyısı · Basra Körfezi",
        inquiryFormatLabel: "Öne Çıkan İmza Yolculuk",
        travelStyleLabel: "Çağdaş Mimari, Kıyı ve Çöl Ufku",
        citiesCovered: [
          "Downtown Dubai",
          "Burj Khalifa Bölgesi",
          "Basra Körfezi Kıyısı",
          "Dubai Çöl Ufku",
        ],
        highlights: [
          "Downtown Dubai bulvarı, Burj Khalifa silüeti ve su kıyısı kordonları",
          "Basra Körfezi marinası ve kıyı mimarisi manzaraları",
          "Tarihi Dubai Koyu (Creek) miras semtleri ve geleneksel abra geçişi",
          "Şehir merkezinin dışında altın saat çöl kumulları deneyimi",
        ],
        overnightCorridors: [
          "Downtown Dubai / Burj Khalifa Bulvarı Koridoru",
          "Basra Körfezi Kıyısı / Marina Koridoru",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Downtown Dubai",
            title: "Burj Khalifa Silüeti ve Işıltılı Su Kıyısı Bulvarı",
            description:
              "Downtown bulvarlarını, su kıyısı lagünlerini ve şehir üzerindeki yüksek seyir teraslarını keşfederek modern Dubai'nin mimari kalbine adım atın.",
            landmarks: [
              "Burj Khalifa ve Downtown Bulvarı",
              "Dubai Su Kıyısı Çeşmeleri ve Lagünleri",
              "Çağdaş Tasarım ve Opera Bölgesi",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Varış ve Downtown Mimari Oryantasyonu",
                pacingNote: "Özel transfer ve otele yerleşme koordinasyonu",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Seyir Terası ve Bulvar Yürüyüş Yolu",
                pacingNote: "Açık görüş ve gün batımı ışığı için planlanır",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Işıklandırılmış Su Kıyısı Gösterisi ve Akşam Bulvarı",
                pacingNote: "Downtown Dubai kalbinde akşam keyfi",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Basra Körfezi Kıyısı ve Marina",
            title: "Kıyı Mimarisi, Palmiye Ufku ve Marina Kordonu",
            description:
              "Jumeirah sahil simgelerinden Dubai Marina'nın yüksek katlı su kanallarına uzanan Basra Körfezi kıyı şeridini takip edin.",
            landmarks: [
              "Basra Körfezi Sahil Kordonu",
              "Palmiye ve Marina Su Kanalları",
              "Akşam Tekne veya Yat Perspektifi",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Jumeirah Kıyı Şeridi ve Mimari Simgeler",
                pacingNote: "Fotoğraf duraklı manzaralı sahil rotası",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Su Kıyısı Yürüyüş Yolları ve Ada Seyir Noktaları",
                pacingNote: "Basra Körfezi kıyısında rahat öğleden sonra temposu",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Dubai Marina Işıltılı Silüet Yürüyüşü",
                pacingNote: "Teklifte isteğe bağlı özel tekne turu",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Eski Dubai Koyu ve Çöl Ufku",
            title: "Tarihi Çarşılar ve Altın Çöl Kumulları",
            description:
              "Tarihi Dubai Koyu ve Al Fahidi rüzgar kuleli mahallesindeki ticaret mirasını, öğleden sonra Arap çölünün altın kumullarına yapılan geçişle birleştirin.",
            landmarks: [
              "Al Fahidi Tarihi Bölgesi ve Dubai Koyu",
              "Geleneksel Altın ve Baharat Çarşısı Sokakları",
              "Arap Çölü Gün Batımı Kumulları",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Al Fahidi Avlulu Evleri ve Abra ile Koy Geçişi",
                pacingNote: "Eski Dubai'de kültürel miras yürüyüşü",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Altın Çöl Kumullarına Geçiş",
                pacingNote: "Talebe göre özel 4x4 çöl programı seçenekleri",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Çölde Gün Batımı Ufku ve Şehre / Havalimanına Dönüş",
                pacingNote: "Daha uzun BAE konaklamaları için uyarlanabilir",
              },
            },
          },
        ],
      },
      "egypt-heritage-trail": {
        title: "Mısır Miras Rotası",
        locationLabel: "Giza ve Kahire, Mısır",
        description:
          "Gize Platosu ve Eski Kahire'nin tarihi yapılarını özenle hazırlanmış arkeolojik bağlamla adım adım izleyin.",
        extendedOverview:
          "Mısır'ın Eski Krallık piramit alanları ve tarihi başkent semtleri boyunca yoğunlaştırılmış bir arkeoloji yolculuğu. Gize, Sakkara, Memfis ve Eski Kahire'yi acele etmeden derin tarihsel bağlamla görmek isteyen gezginler için idealdir.",
        corridorLabel: "Gize Platosu · Memfis · Sakkara",
        inquiryFormatLabel: "Özel Kişisel Teklif",
        travelStyleLabel: "Odaklı Arkeoloji ve Piramit Rotası",
        citiesCovered: ["Gize Platosu", "Sakkara", "Memfis", "Eski Kahire"],
        highlights: [
          "Gize Piramit kompleksi ve Vadi Tapınağı'nın kapsamlı keşfi",
          "Sakkara'daki Zoser Basamaklı Piramidi ve Eski Krallık mezarları",
          "Antik Memfis açık hava müzesindeki kraliyet heykelleri",
          "Tarihi Kahire kaleleri, camileri ve Kıpti miras semtleri",
        ],
        overnightCorridors: [
          "Gize Platosu Manzaralı Koridor",
          "Merkezi Kahire / Nil Koridoru",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Gize Platosu, Mısır",
            title: "Büyük Piramitler, Sfenks ve Çöl Platosu",
            description:
              "Keops, Kefren ve Mikerinos piramit komplekslerini, Güneş Teknesi alanını ve Büyük Sfenks'i inceleyerek Gize Platosu'na tam ve sakin bir gün ayırın.",
            landmarks: [
              "Keops Büyük Piramidi",
              "Kefren ve Mikerinos Piramitleri",
              "Büyük Sfenks ve Vadi Tapınağı",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Gize Piramit Alanı ve Mimari İnceleme",
                pacingNote: "Talebe göre Mısırolog rehberliğinde anlatım",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Batı Platosu Panoraması ve Vadi Tapınağı",
                pacingNote: "Fotoğraf ve keşif için telaşsız zaman",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Piramit Silüeti Üzerinde Gün Batımı",
                pacingNote: "Gize veya Kahire'de sakin akşam",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Sakkara ve Antik Memfis",
            title: "Sakkara ve Memfis'te Taş Mimarisinin Kökenleri",
            description:
              "Gize'nin güneyine, Zoser Basamaklı Piramidi'ne ev sahipliği yapan Sakkara nekropolüne ilerleyin ve Mısır'ın ilk başkenti Memfis'in açık hava müzesini ziyaret edin.",
            landmarks: [
              "Sakkara Zoser Basamaklı Piramidi",
              "Eski Krallık Mastaba Mezarları",
              "Memfis Açık Hava Müzesi ve Dev Heykeller",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Sakkara Basamaklı Piramidi ve Külliyesi",
                pacingNote: "Piramit mimarisinin gelişimini adım adım izler",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Antik Başkent Memfis ve Kraliyet Heykelleri",
                pacingNote: "Nil palmiye koruları arasında manzaralı geçiş",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Kahire'ye Dönüş ve Nil Akşam Yürüyüşü",
                pacingNote: "Esnek akşam yemeği alternatifleri",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Eski Kahire ve Nil Adaları",
            title: "Kale Panoraması, Tarihi Kahire ve Nil Felukası",
            description:
              "Nil üzerinde huzurlu bir gün batımı öncesinde Kıpti ve İslami Kahire'nin tarihi semtlerini, kale seyir teraslarını ve geleneksel çarşı sokaklarını keşfedin.",
            landmarks: [
              "Kahire Kalesi Panoramik Seyir Noktası",
              "Kıpti ve İslami Kahire Miras Sokakları",
              "Nil Nehri Gün Batımı Felukası",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Eski Kahire Mabedleri ve Kale Seyir Terası",
                pacingNote: "Kahire'nin yüzyıllara yayılan kent tarihini kapsar",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Tarihi Çarşı Zanaatkarları ve Müze Seçkisi",
                pacingNote: "Dönüş saatinize göre uyarlanır",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Gün Batımı Nil Yelkenlisi veya Havalimanı Transferi",
                pacingNote: "Luksor veya Kızıldeniz uzatmalarıyla birleştirilebilir",
              },
            },
          },
        ],
      },
      "istanbul-bosphorus-getaway": {
        title: "İstanbul ve Boğaziçi Rotası",
        locationLabel: "İstanbul, Türkiye",
        description:
          "Kız Kulesi, kıyı sarayları ve tarihi semtler eşliğinde İstanbul Boğazı'nda iki kıta arasında yelken açın.",
        extendedOverview:
          "Avrupa ve Asya'yı hem ayıran hem birleştiren su yolunu kutlayan deniz odaklı bir İstanbul rotası. Boğaz seyrini kıyı sarayları, Anadolu yakasındaki Üsküdar kordonu ve Karaköy'ün canlı iskeleleriyle birleştirin.",
        corridorLabel: "Boğaziçi · Üsküdar · Karaköy",
        inquiryFormatLabel: "Özel Kişisel Teklif",
        travelStyleLabel: "İki Kıta Deniz ve Kıyı Kaçamağı",
        citiesCovered: [
          "İstanbul Boğazı",
          "Karaköy ve Beşiktaş",
          "Üsküdar (Anadolu Yakası)",
          "Kız Kulesi Koridoru",
        ],
        highlights: [
          "Osmanlı kıyı sarayları ve tarihi yalılar boyunca manzaralı Boğaz seyri",
          "Kız Kulesi gün batımı manzaralı Üsküdar Anadolu yakası kordonu",
          "Karaköy ve Galata iskeleleri, kafeleri ve çağdaş kültür alanları",
          "Kıtalararası vapur ve özel tekne rota seçenekleri",
        ],
        overnightCorridors: [
          "Boğaziçi Avrupa Yakası (Karaköy / Beşiktaş)",
          "Tarihi Yarımada / Haliç Görünümlü Bölge",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Boğaziçi Avrupa Yakası",
            title: "Kıyı Sarayları ve İstanbul Boğazı Seyri",
            description:
              "Beşiktaş ve Kabataş hattında Avrupa yakası kıyı saraylarını keşfederek başlayın; ardından Avrupa ile Asya arasında manzaralı bir Boğaz seyrine çıkın.",
            landmarks: [
              "Dolmabahçe ve Kıyı Sarayları Hattı",
              "İstanbul Boğazı Su Yolu",
              "Ortaköy Camii ve Köprü Panoraması",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Avrupa Yakası İmparatorluk Kıyı Sarayları",
                pacingNote: "Boğaz kıyısında rehberli mimari ziyaret",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Yalılar ve Hisarlar Boyunca Boğaz Turu",
                pacingNote: "Teklifte özel yat veya seçkin vapur alternatifleri",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Ortaköy ve Boğaz Kıyısında Akşam",
                pacingNote: "Su kıyısı restoran önerileri sunulur",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Üsküdar ve Anadolu Yakası",
            title: "Kıtalararası Vapur ile Üsküdar ve Kız Kulesi",
            description:
              "Üsküdar'ın tarihi kıyı camilerini, çay bahçelerini ve altın saatte Kız Kulesi'nin simgesel silüetini keşfetmek üzere Anadolu yakasına geçin.",
            landmarks: [
              "Kız Kulesi Kordonu",
              "Üsküdar Tarihi Sahili",
              "Kadıköy ve Kuzguncuk Sokakları",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Manzaralı Vapur Geçişi ve Kuzguncuk Ahşap Evleri",
                pacingNote: "Özgün yerel mahalle atmosferi",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Üsküdar Meydanları ve Anadolu Yakası Çarşıları",
                pacingNote: "Rahat tempolu sahil ve lezzet keşfi",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Kız Kulesi Karşısında Gün Batımı",
                pacingNote: "Altın saat fotoğrafçılığı için imza seyir noktası",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Karaköy ve Haliç",
            title: "Karaköy İskeleleri, Galata ve Veda Manzarası",
            description:
              "Son gününüzü tarihi denizcilik antrepolarının çağdaş galeriler ve panoramik teraslarla buluştuğu Karaköy ve Galata kıyı bölgesinde geçirin.",
            landmarks: [
              "Karaköy Sahil Kordonu",
              "Galata Tarihi Semti",
              "Haliç ve Boğaz Liman Görünümü",
            ],
            segments: {
              morning: {
                periodLabel: "Sabah",
                focusTitle: "Karaköy Liman Kordonu ve Tarihi Pasajlar",
                pacingNote: "Boğaz girişinde sabah yürüyüşü",
              },
              afternoon: {
                periodLabel: "Öğleden Sonra",
                focusTitle: "Galata Butikleri ve Kıyı Müzeleri",
                pacingNote: "Dönüş öncesinde esnek zamanlama",
              },
              evening: {
                periodLabel: "Akşam",
                focusTitle: "Dönüş Transferi veya Uzatılmış Türkiye Programı",
                pacingNote: "Uçuş veya devam tarihlerinize göre uyarlanır",
              },
            },
          },
        ],
      },
    },
  },
  es: {
    pageEyebrow: "WEST GLOBAL TOURS · PORTAFOLIO DE DESTINOS",
    backToHomeLabel: "Volver al Inicio",
    railAriaLabel: "Barra de progreso del selector de destinos",
    activeSelectionBadge: "Destino Activo",
    nextPreviewBadge: "Siguiente",
    otherDestinationsHeading: "Cambiar Destino",
    previewSelectLabel: "Seleccionar destino",
    prevDestinationLabel: "Destino anterior",
    nextDestinationLabel: "Siguiente destino",
    videoAtmosphereLabel: "Video de Fondo Activo",
    journeysSectionEyebrow: "ITINERARIOS SELECCIONADOS",
    journeysSectionHeadingPrefix: "Viajes en",
    journeysSectionAllHeading:
      "Todos los Viajes Seleccionados en Egipto, Türkiye y Dubái",
    journeysSectionSupporting:
      "Explora los corredores geográficos confirmados del destino activo o despliega el catálogo completo para ver los cinco viajes seleccionados.",
    filterAllDestinationsLabel: "Los 3 Destinos",
    viewAllTripsCta: "Ver Todos los Viajes",
    showingAllTripsLabel: "Mostrando los 5 viajes configurados",
    filterBySelectedDestinationCta: "Mostrar Solo el Destino Activo",
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
      secondaryCta: "Ver Todos los Viajes",
    },
    journeyDetail: {
      backToDiscoveryLabel: "Volver a Destinos",
      viewAllDestinationsLabel: "Explorar Todos los Viajes",
      bookThisTripCta: "Solicitar Este Viaje",
      jumpToItineraryCta: "Itinerario Día por Día",
      sectionNavAriaLabel: "Secciones del detalle del viaje",
      navOverview: "Resumen",
      navItinerary: "Itinerario Día por Día",
      navAccommodation: "Alojamiento",
      navGallery: "Galería",
      navInclusions: "Alcance y Notas",
      navBook: "Reservar / Consultar",
      overviewEyebrow: "RESUMEN DEL VIAJE",
      overviewHeading: "Arquitectura de la Ruta y Alcance Confirmado",
      corridorHeading: "Corredor Geográfico",
      durationHeading: "Duración",
      durationFlexibleValue: "Ruta Base de 3 Etapas · Duración a Medida",
      bookingModelHeading: "Formato de Reserva",
      catalogRefHeading: "Código de Referencia",
      citiesCoveredHeading: "Ciudades y Zonas Cubiertas",
      travelStyleHeading: "Estilo de Viaje",
      keyHighlightsHeading: "Puntos Destacados Confirmados",
      itineraryEyebrow: "ITINERARIO DÍA POR DÍA",
      itineraryHeading: "Progresión Diaria de la Ruta y Horario",
      itinerarySupporting:
        "Explora la secuencia estructurada día por día a través de los monumentos principales del destino. Los horarios exactos y las extensiones se adaptan a tus fechas.",
      expandAllDaysLabel: "Expandir Todos los Días",
      collapseAllDaysLabel: "Contraer Todos los Días",
      dayPrefixLabel: "Día",
      scheduleTableHeading: "Ritmo Diario Estructurado",
      scheduleColumnSegment: "Tramo",
      scheduleColumnFocus: "Enfoque Geográfico y Monumentos",
      scheduleColumnPacing: "Nota de Planificación",
      landmarksHeading: "Monumentos y Corredores Destacados",
      mealsHeading: "Comidas",
      mealsPendingValue: "Régimen alimenticio confirmado en tu cotización",
      overnightHeading: "Zona de Alojamiento",
      overnightPendingValue: "Propiedad hotelera confirmada en la cotización",
      accommodationEyebrow: "ALOJAMIENTO Y HOTELES",
      accommodationHeading: "Dónde Te Alojas y Selección de Propiedades",
      accommodationPendingBadge: "Confirmado al Cotizar",
      accommodationPendingTitle:
        "Los detalles del alojamiento serán confirmados por nuestro equipo",
      accommodationPendingMessage:
        "WEST GLOBAL TOURS no publica nombres de hoteles no verificados, tarifas ficticias ni fotos genéricas de habitaciones. Al compartir tus fechas y número de viajeros, nuestro equipo propone propiedades verificadas alineadas con tu categoría preferida.",
      accommodationOvernightZonesLabel: "Corredores de Alojamiento para Esta Ruta",
      accommodationCategoriesLabel: "Categorías de Propiedades Disponibles a Solicitud",
      accommodationCategoriesList: [
        "Hoteles de 5 Estrellas Frente al Río / Mar o Monumentos",
        "Propiedades Boutique de Patrimonio en Barrios Históricos",
        "Suites Familiares Privadas y Habitaciones Conectadas",
      ],
      accommodationCtaLabel: "Indicar Preferencias de Hotel",
      galleryEyebrow: "PORTAFOLIO VISUAL",
      galleryHeading: "Galería del Destino y Corredores",
      gallerySupporting:
        "Fotografía auténtica de los monumentos y corredores escénicos incluidos en este viaje.",
      galleryCaptions: {
        luxor_nile_sanctuary:
          "Atardecer en el río Nilo y columnas de templos antiguos entre Luxor y El Cairo",
        giza_pyramids_sunset:
          "Grandes Pirámides de Guiza sobre la meseta desértica al atardecer",
        nile_felucca_horizon:
          "Veleros tradicionales de faluca deslizándose por el Nilo al atardecer",
        luxor_colonnade_detail:
          "Columnatas monumentales de piedra arenisca en el santuario de Luxor",
        istanbul_historic_peninsula:
          "Silueta de la Península Histórica de Estambul y el Cuerno de Oro al anochecer",
        golden_horn_minarets:
          "Cúpulas y minaretes imperiales frente a la costa de Estambul",
        bosphorus_maidens_tower:
          "Torre de la Doncella en el estrecho del Bósforo entre Europa y Asia",
        istanbul_dusk_waterfront:
          "Reflejos vespertinos en los paseos marítimos históricos de Estambul",
        downtown_dubai_burj:
          "Burj Khalifa y el horizonte de Downtown Dubái reflejados en el paseo marítimo",
        dubai_waterfront_promenade:
          "Torres contemporáneas y paseo marítimo iluminado en Dubái",
        arabian_gulf_skyline:
          "Horizonte costero de Dubái y el Golfo Pérsico al atardecer",
        sakkara_desert_horizon:
          "Santuarios piramidales y horizonte desértico en la meseta de Guiza y Saqqara",
        giza_plateau_camel_view:
          "Perspectiva panorámica del complejo piramidal de Guiza",
        bosphorus_ferry_crossing:
          "Travesía en ferry por el estrecho del Bósforo al atardecer",
      },
      inclusionsEyebrow: "ALCANCE, INCLUSIONES Y NOTAS PRÁCTICAS",
      inclusionsHeading: "Qué Incluye y Cómo Funcionan las Cotizaciones",
      inclusionsSupporting:
        "Para mantener cada propuesta transparente, distinguimos entre nuestro alcance de planificación estándar y los servicios personalizables confirmados en tu cotización escrita.",
      confirmedPlanningTitle:
        "Incluido en Cada Consulta con WEST GLOBAL TOURS",
      confirmedPlanningItems: [
        "Mesa de planificación de itinerarios trilingüe (inglés, turco y español)",
        "Diseño de ruta día por día a través de los corredores geográficos confirmados",
        "Soporte directo de cotización por WhatsApp (+20 120 139 8685) y Correo",
        "Ritmo flexible adaptado a viajeros individuales, parejas, familias o grupos privados",
      ],
      tailoredQuotationTitle:
        "Servicios Personalizables Confirmados en Tu Cotización",
      tailoredQuotationItems: [
        "Categoría de hotel, configuración de habitaciones y régimen de comidas diario",
        "Traslados terrestres privados climatizados y tramos interurbanos",
        "Guías locales especializados con licencia y gestión de entradas a monumentos",
        "Vuelos domésticos opcionales, paseos privados por el Nilo o el Bósforo y extensiones",
      ],
      practicalNotesTitle: "Exclusiones y Notas Importantes",
      practicalNotesItems: [
        "Los vuelos internacionales, tasas de visado y seguro de viaje personal no se incluyen automáticamente salvo solicitud expresa.",
        "Los horarios exactos de monumentos, calendario de pagos, depósitos y condiciones de cancelación se entregan por escrito junto con tu cotización oficial.",
      ],
      inquireHeading: "¿Listo para Planificar Este Viaje?",
      inquireDescription:
        "Comparte tus fechas preferidas, tamaño de grupo y preferencias de hotel. Nuestro equipo preparará un itinerario a medida y cotización transparente por WhatsApp o Correo.",
      inquirePrimaryCta: "Solicitar Este Viaje",
      inquireWhatsappCta: "Consultar por WhatsApp",
      inquireEmailCta: "Solicitar Cotización por Correo",
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
        corridorBadges: [
          "El Cairo y Guiza",
          "Corredor del Nilo",
          "Santuarios de Luxor",
        ],
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
        corridorBadges: [
          "Península Histórica",
          "Estrecho del Bósforo",
          "Üsküdar y Karaköy",
        ],
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
        corridorBadges: [
          "Downtown Dubái",
          "Corredor Burj Khalifa",
          "Costa del Golfo Pérsico",
        ],
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
        extendedOverview:
          "Diseñado para viajeros que buscan una conexión coherente entre la capital del norte de Egipto y el monumental Valle del Nilo en el Alto Egipto. Esta ruta combina la Meseta de Guiza y el Viejo Cairo con los templos de las riberas oriental y occidental de Luxor.",
        corridorLabel: "El Cairo · Valle del Nilo · Luxor",
        inquiryFormatLabel: "Consulta Privada a Medida",
        travelStyleLabel: "Corredor Cultural y Arqueológico",
        citiesCovered: ["El Cairo", "Meseta de Guiza", "Valle del Nilo", "Luxor"],
        highlights: [
          "Exploración panorámica de las Grandes Pirámides de Guiza y la Esfinge",
          "Patrimonio arquitectónico del Viejo Cairo y vistas ribereñas del Nilo",
          "Santuarios monumentales de las riberas oriental y occidental de Luxor",
          "Navegación tradicional en faluca al atardecer por el río Nilo",
        ],
        overnightCorridors: [
          "Corredor El Cairo / Meseta de Guiza",
          "Corredor Ribereño del Nilo en Luxor",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "El Cairo y Meseta de Guiza",
            title: "Llegada a El Cairo y Las Grandes Pirámides de Guiza",
            description:
              "Comienza en la meseta occidental de Guiza para explorar las Grandes Pirámides de Keops, Kefrén y Micerinos junto con la Gran Esfinge y el Templo del Valle, con miradores panorámicos hacia El Cairo.",
            landmarks: [
              "Grandes Pirámides de Guiza",
              "Gran Esfinge y Templo del Valle",
              "Mirador Occidental de la Meseta de Guiza",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Meseta de Guiza y Santuario de las Grandes Pirámides",
                pacingNote: "Ritmo privado adaptado a tu horario de llegada",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Recinto de la Esfinge y Mirador del Desierto",
                pacingNote: "Tiempo flexible para fotografía y contexto arqueológico",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Paseo Ribereño por el Nilo en El Cairo",
                pacingNote: "Cena opcional o paseo junto al río a solicitud",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "El Cairo Histórico y Corredor del Nilo",
            title: "Patrimonio del Viejo Cairo y Conexión al Alto Egipto",
            description:
              "Explora el patrimonio arquitectónico del Cairo Histórico y sus colecciones de antigüedades antes de continuar hacia el sur por el corredor del Valle del Nilo rumbo a Luxor.",
            landmarks: [
              "Barrios del Cairo Histórico",
              "Colecciones de Antigüedades Egipcias",
              "Corredor Sur del Valle del Nilo",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Antigüedades y Ciudadelas del Cairo Histórico",
                pacingNote: "Ruta adaptada a tus intereses culturales",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Bazares del Viejo Cairo y Conexión a Luxor",
                pacingNote: "Vuelo doméstico o tren coordinado en la cotización",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Llegada a la Corniche de Luxor y Templo Iluminado",
                pacingNote: "Registro vespertino en la zona ribereña de Luxor",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Luxor y el Río Nilo",
            title: "Santuarios de Luxor y Paseo en Faluca al Atardecer",
            description:
              "Descubre las columnatas monumentales de Karnak y Luxor en la Ribera Oriental junto con las necrópolis reales de la Ribera Occidental, culminando con un atardecer sereno sobre el Nilo.",
            landmarks: [
              "Complejos de los Templos de Karnak y Luxor",
              "Santuarios de la Ribera Occidental Tebana",
              "Corredor de Falucas al Atardecer en el Nilo",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Necrópolis Real de la Ribera Occidental y Templos",
                pacingNote: "Se recomienda salida temprana por el clima más fresco",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Gran Sala Hipóstila de Karnak y Avenida de las Esfinges",
                pacingNote: "Recorrido arqueológico guiado a tu propio ritmo",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Perspectiva en Faluca durante la Hora Dorada",
                pacingNote: "Traslado de salida o extensión de varios días por el Nilo",
              },
            },
          },
        ],
      },
      "turkiye-culture-escape": {
        title: "Escapada Cultural por Türkiye",
        locationLabel: "Estambul, Türkiye",
        description:
          "Experimenta la península histórica de Estambul, su arquitectura imperial y tradiciones culinarias entre Europa y Asia.",
        extendedOverview:
          "Una inmersión cultural enfocada en el corazón imperial de Estambul. Recorre siglos de legado bizantino y otomano en Sultanahmet, explora los mercados cubiertos sobre el Cuerno de Oro y vive el ambiente de los barrios de ambas orillas.",
        corridorLabel: "Península Histórica · Cuerno de Oro",
        inquiryFormatLabel: "Consulta Privada a Medida",
        travelStyleLabel: "Arquitectura Imperial y Tradición Culinaria",
        citiesCovered: [
          "Sultanahmet",
          "Península Histórica",
          "Cuerno de Oro",
          "Beyoğlu y Eminönü",
        ],
        highlights: [
          "Cúpulas de mezquitas imperiales, patios y monumentos de Sultanahmet",
          "Corredores artesanales y gastronómicos del Gran Bazar y Bazar de las Especias",
          "Miradores panorámicos y patrimonio ribereño del Cuerno de Oro",
          "Barrios culturales intercontinentales entre Europa y Asia",
        ],
        overnightCorridors: [
          "Zona Sultanahmet / Península Histórica",
          "Zona Ribereña del Cuerno de Oro y Karaköy",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Sultanahmet, Estambul",
            title: "Monumentos Imperiales de la Península Histórica",
            description:
              "Explora el corazón histórico de Estambul declarado Patrimonio de la Humanidad alrededor de la Plaza de Sultanahmet, recorriendo cúpulas monumentales, patios imperiales y cisternas subterráneas.",
            landmarks: [
              "Recinto de Santa Sofía y la Mezquita Azul",
              "Hipódromo y Plaza de Sultanahmet",
              "Patios Imperiales del Palacio de Topkapı",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Plaza de Sultanahmet y Santuarios Monumentales",
                pacingNote: "Ruta peatonal en el centro histórico",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Pabellones del Palacio Imperial y Cisternas",
                pacingNote: "Coordinado según los horarios de apertura",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Terrazas Panorámicas sobre los Minaretes",
                pacingNote: "Recomendaciones gastronómicas adaptadas a tu grupo",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Cuerno de Oro y Bazares Históricos",
            title: "Artesanos del Gran Bazar, Bazar de las Especias y Cuerno de Oro",
            description:
              "Recorre las galerías abovedadas del Gran Bazar y el aromático Bazar de las Especias en Eminönü, seguidos de miradores escénicos a lo largo del Cuerno de Oro.",
            landmarks: [
              "Galerías Cubiertas del Gran Bazar",
              "Bazar de las Especias de Eminönü",
              "Costa y Miradores del Cuerno de Oro",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Patios del Gran Bazar y Artesanía Tradicional",
                pacingNote: "Enfoque adaptable a artesanía, textiles o historia",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Mercado de las Especias y Barrios del Cuerno de Oro",
                pacingNote: "Incluye paradas de café turco y gastronomía local",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Atardecer en los Puentes de Gálata y Cuerno de Oro",
                pacingNote: "Tiempo libre vespertino frente al agua",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Beyoğlu y Estambul Intercontinental",
            title: "Patrimonio de Gálata, Calles Culinarias y Panorama Final",
            description:
              "Asciende hacia los barrios históricos de Gálata y Pera para descubrir pasajes del siglo XIX, paseos culturales y vistas donde el Cuerno de Oro se une con el Bósforo.",
            landmarks: [
              "Barrio de la Torre de Gálata",
              "Pasajes Históricos de İstiklal y Pera",
              "Confluencia del Bósforo y el Cuerno de Oro",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Calles Empedradas de Gálata y Terraza Panorámica",
                pacingNote: "Caminata arquitectónica matutina a ritmo relajado",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Pasajes Culturales de Pera y Gastronomía Local",
                pacingNote: "Tiempo flexible para compras o museos",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Traslado de Salida o Extensión por Türkiye",
                pacingNote: "Combinable con rutas por el Bósforo o nuevas regiones",
              },
            },
          },
        ],
      },
      "dubai-city-experience": {
        title: "Experiencia Urbana en Dubái",
        locationLabel: "Dubái, EAU",
        description:
          "Descubre iconos arquitectónicos contemporáneos, paseos frente al agua y horizontes del desierto en el corazón de Dubái.",
        extendedOverview:
          "Nuestro itinerario urbano y escénico de referencia en los Emiratos Árabes Unidos. Experimenta la ingeniería vertical de Downtown Dubái y Burj Khalifa, recorre los paseos iluminados del Golfo Pérsico y contrasta el horizonte moderno con las dunas doradas del desierto.",
        corridorLabel: "Downtown Dubái · Paseo Marítimo · Golfo Pérsico",
        inquiryFormatLabel: "Viaje Destacado de Autor",
        travelStyleLabel: "Arquitectura Contemporánea, Costa y Desierto",
        citiesCovered: [
          "Downtown Dubái",
          "Distrito Burj Khalifa",
          "Costa del Golfo Pérsico",
          "Horizonte del Desierto de Dubái",
        ],
        highlights: [
          "Bulevar de Downtown Dubái, horizonte de Burj Khalifa y paseos frente al agua",
          "Vistas arquitectónicas de la marina y la costa del Golfo Pérsico",
          "Barrios históricos de Dubai Creek y cruce tradicional en abra",
          "Experiencia al atardecer en las dunas doradas del desierto",
        ],
        overnightCorridors: [
          "Corredor Downtown Dubái / Bulevar Burj Khalifa",
          "Corredor Costero del Golfo Pérsico / Marina",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Downtown Dubái",
            title: "Horizonte de Burj Khalifa y Paseo Marítimo Iluminado",
            description:
              "Sumérgete en el centro arquitectónico del Dubái moderno, explorando los bulevares de Downtown, las lagunas frente al agua y los miradores elevados sobre la ciudad.",
            landmarks: [
              "Burj Khalifa y Bulevar Downtown",
              "Fuentes y Lagunas de Downtown Dubái",
              "Distrito de Diseño Contemporáneo y Ópera",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Llegada y Orientación Arquitectónica en Downtown",
                pacingNote: "Coordinación de traslado privado y registro",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Mirador del Horizonte y Paseos del Bulevar",
                pacingNote: "Programado para visibilidad clara al atardecer",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Espectáculo Iluminado Frente al Agua y Paseo Nocturno",
                pacingNote: "Velada en el corazón de Downtown Dubái",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Costa del Golfo Pérsico y Marina",
            title: "Arquitectura Costera, Horizonte de la Palmera y Marina Walk",
            description:
              "Sigue la costa resplandeciente del Golfo Pérsico desde los iconos de playa de Jumeirah hasta los canales bordeados de torres en Dubai Marina.",
            landmarks: [
              "Corniche Costera del Golfo Pérsico",
              "Canales de la Palmera y Dubai Marina",
              "Perspectiva Nocturna en Dhow o Yate",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Costa de Jumeirah e Iconos Arquitectónicos",
                pacingNote: "Ruta escénica costera con paradas fotográficas",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Paseos Marítimos y Miradores Insulares",
                pacingNote: "Ritmo relajado junto al Golfo Pérsico",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Paseo por el Horizonte Iluminado de Dubai Marina",
                pacingNote: "Crucero privado opcional en tu cotización",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Dubai Creek Histórico y Desierto",
            title: "Zocos Históricos de Creek y Dunas Doradas del Desierto",
            description:
              "Contrasta los orígenes comerciales de Dubái a lo largo de la ría histórica de Creek y el barrio de Al Fahidi con una transición vespertina hacia las dunas doradas del desierto.",
            landmarks: [
              "Distrito Histórico de Al Fahidi y Dubai Creek",
              "Calles Tradicionales de los Zocos del Oro y las Especias",
              "Dunas del Desierto Árabe al Atardecer",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Casas con Patio de Al Fahidi y Cruce en Abra",
                pacingNote: "Recorrido de patrimonio cultural en el Viejo Dubái",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Transición hacia las Dunas Doradas del Desierto",
                pacingNote: "Opciones de excursión privada 4x4 a solicitud",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Atardecer en el Desierto y Regreso a la Ciudad / Aeropuerto",
                pacingNote: "Personalizable para estancias más largas en los EAU",
              },
            },
          },
        ],
      },
      "egypt-heritage-trail": {
        title: "Ruta del Patrimonio de Egipto",
        locationLabel: "Guiza y El Cairo, Egipto",
        description:
          "Recorre la antigüedad en la Meseta de Guiza y los monumentos del Viejo Cairo con contexto arqueológico seleccionado.",
        extendedOverview:
          "Un viaje arqueológico concentrado por los campos de pirámides del Reino Antiguo y los barrios históricos de la capital. Ideal para viajeros que desean contexto histórico profundo en Guiza, Saqqara, Menfis y el Viejo Cairo sin prisas.",
        corridorLabel: "Meseta de Guiza · Menfis · Saqqara",
        inquiryFormatLabel: "Consulta Privada a Medida",
        travelStyleLabel: "Ruta Arqueológica y de Pirámides",
        citiesCovered: ["Meseta de Guiza", "Saqqara", "Menfis", "Viejo Cairo"],
        highlights: [
          "Exploración completa del complejo piramidal de Guiza y el Templo del Valle",
          "Pirámide Escalonada de Zoser y tumbas del Reino Antiguo en Saqqara",
          "Colosos al aire libre y antigüedades reales en la antigua Menfis",
          "Ciudadelas históricas, mezquitas y barrios de patrimonio copto en El Cairo",
        ],
        overnightCorridors: [
          "Corredor con Vista a la Meseta de Guiza",
          "Corredor Central de El Cairo / Nilo",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Meseta de Guiza, Egipto",
            title: "Las Grandes Pirámides, la Esfinge y la Meseta Desértica",
            description:
              "Dedica un día completo y sin prisas a la Meseta de Guiza, examinando los complejos piramidales de Keops, Kefrén y Micerinos, el recinto de la Barca Solar y la Gran Esfinge.",
            landmarks: [
              "Gran Pirámide de Keops",
              "Pirámides de Kefrén y Micerinos",
              "Gran Esfinge y Templo del Valle",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Recinto Piramidal de Guiza y Recorrido Arquitectónico",
                pacingNote: "Estructurado con contexto egiptológico a solicitud",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Panorama de la Meseta Occidental y Templo del Valle",
                pacingNote: "Tiempo amplio para fotografía y exploración",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Vista del Atardecer sobre la Silueta de las Pirámides",
                pacingNote: "Velada tranquila en Guiza o El Cairo",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Saqqara y Antigua Menfis",
            title: "Orígenes de la Arquitectura en Piedra en Saqqara y Menfis",
            description:
              "Viaja al sur de Guiza hacia la necrópolis antigua de Saqqara — hogar de la Pirámide Escalonada de Zoser — y continúa hacia el museo al aire libre de Menfis, primera capital imperial de Egipto.",
            landmarks: [
              "Pirámide Escalonada de Zoser en Saqqara",
              "Tumbas Mastaba Pintadas del Reino Antiguo",
              "Museo al Aire Libre y Colosos de Menfis",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Pirámide Escalonada y Complejo Funerario de Saqqara",
                pacingNote: "Traza la evolución de la construcción piramidal",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Antigua Capital de Menfis y Estatuaria Real",
                pacingNote: "Recorrido escénico entre palmerales del Nilo",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Regreso a El Cairo y Paseo Nocturno por el Nilo",
                pacingNote: "Opciones flexibles para la cena",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Viejo Cairo e Islas del Nilo",
            title: "Panorama de la Ciudadela, Cairo Histórico y Faluca en el Nilo",
            description:
              "Concluye tu ruta por los barrios históricos del Cairo Copto e Islámico, visitando miradores en la colina de la Ciudadela y calles de bazares tradicionales antes de un atardecer en el Nilo.",
            landmarks: [
              "Mirador de la Ciudadela de El Cairo",
              "Calles Patrimoniales del Cairo Copto e Islámico",
              "Faluca al Atardecer en el Río Nilo",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Santuarios del Viejo Cairo y Mirador de la Ciudadela",
                pacingNote: "Cubre siglos de historia urbana de El Cairo",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Artesanos del Mercado Histórico y Museos",
                pacingNote: "Adaptado a tu horario de salida",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Navegación al Atardecer en el Nilo o Traslado al Aeropuerto",
                pacingNote: "Ampliable con extensiones a Luxor o el Mar Rojo",
              },
            },
          },
        ],
      },
      "istanbul-bosphorus-getaway": {
        title: "Escapada por Estambul y el Bósforo",
        locationLabel: "Estambul, Türkiye",
        description:
          "Navega entre dos continentes por el estrecho del Bósforo junto a la Torre de la Doncella, palacios costeros y barrios históricos.",
        extendedOverview:
          "Un itinerario marítimo por Estambul que celebra el estrecho que divide y conecta Europa y Asia. Combina navegación por el Bósforo con palacios costeros, el paseo marítimo de Üsküdar en la orilla asiática y los muelles culturales de Karaköy.",
        corridorLabel: "Estrecho del Bósforo · Üsküdar · Karaköy",
        inquiryFormatLabel: "Consulta Privada a Medida",
        travelStyleLabel: "Escapada Marítima e Intercontinental",
        citiesCovered: [
          "Estrecho del Bósforo",
          "Karaköy y Beşiktaş",
          "Üsküdar (Orilla Asiática)",
          "Corredor de la Torre de la Doncella",
        ],
        highlights: [
          "Navegación escénica por el Bósforo frente a palacios otomanos y mansiones yalı",
          "Paseo costero de Üsküdar en la orilla asiática con vistas a la Torre de la Doncella",
          "Muelles, cafés y espacios culturales contemporáneos de Karaköy y Gálata",
          "Opciones fluidas de cruce intercontinental en ferry y barco privado",
        ],
        overnightCorridors: [
          "Orilla Europea del Bósforo (Karaköy / Beşiktaş)",
          "Península Histórica / Mirador del Cuerno de Oro",
        ],
        days: [
          {
            dayNumber: 1,
            cityLabel: "Orilla Europea del Bósforo",
            title: "Palacios Costeros y Crucero por el Estrecho del Bósforo",
            description:
              "Comienza en la orilla europea del Bósforo entre Beşiktaş y Kabataş, explorando palacios imperiales frente al agua antes de embarcar en un crucero escénico entre Europa y Asia.",
            landmarks: [
              "Recinto de Dolmabahçe y Palacios Costeros",
              "Canal Marítimo del Estrecho del Bósforo",
              "Mezquita de Ortaköy y Panorama del Puente",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Palacios Imperiales de la Orilla Europea",
                pacingNote: "Visita arquitectónica guiada junto al estrecho",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Crucero por el Bósforo frente a Mansiones Yalı y Fortalezas",
                pacingNote: "Opciones de yate privado o ferry en tu cotización",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Velada en la Costa de Ortaköy y el Bósforo",
                pacingNote: "Recomendaciones de restaurantes frente al mar",
              },
            },
          },
          {
            dayNumber: 2,
            cityLabel: "Üsküdar y Orilla Asiática",
            title: "Ferry Intercontinental a Üsküdar y Torre de la Doncella",
            description:
              "Cruza el estrecho hacia la orilla asiática de Estambul para explorar las mezquitas costeras de Üsküdar, sus jardines de té y la silueta icónica de la Torre de la Doncella (Kız Kulesi) al atardecer.",
            landmarks: [
              "Paseo de la Torre de la Doncella (Kız Kulesi)",
              "Frente Marítimo Histórico de Üsküdar",
              "Calles de los Barrios de Kadıköy y Kuzguncuk",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Cruce Escénico en Ferry y Casas de Madera de Kuzguncuk",
                pacingNote: "Auténtico ambiente de barrio local",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Plazas de Üsküdar y Mercados de la Orilla Asiática",
                pacingNote: "Exploración costera y gastronómica sin prisas",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Atardecer frente a la Torre de la Doncella",
                pacingNote: "Mirador emblemático durante la hora dorada",
              },
            },
          },
          {
            dayNumber: 3,
            cityLabel: "Karaköy y Cuerno de Oro",
            title: "Muelles de Karaköy, Gálata y Vista de Despedida",
            description:
              "Pasa tu último día alrededor del renovado distrito portuario de Karaköy y Gálata, donde antiguos almacenes marítimos conviven con galerías contemporáneas y terrazas panorámicas.",
            landmarks: [
              "Paseo Marítimo de Karaköy",
              "Barrio Histórico de Gálata",
              "Vista del Puerto del Cuerno de Oro y el Bósforo",
            ],
            segments: {
              morning: {
                periodLabel: "Mañana",
                focusTitle: "Paseo Portuario de Karaköy y Pasajes Históricos",
                pacingNote: "Recorrido matutino en la entrada del Bósforo",
              },
              afternoon: {
                periodLabel: "Tarde",
                focusTitle: "Boutiques de Gálata y Museos Frente al Agua",
                pacingNote: "Ritmo flexible antes de tu próximo tramo",
              },
              evening: {
                periodLabel: "Noche",
                focusTitle: "Traslado de Salida o Extensión por Türkiye",
                pacingNote: "Adaptado a tus fechas de vuelo o continuación",
              },
            },
          },
        ],
      },
    },
  },
};
