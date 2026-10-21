import type { SupportedLocale } from "./hero-dictionary";
import type { AboutFaqTopicId, AboutStoryPillarId } from "@/config/about-us";

export interface AboutFactCopy {
  label: string;
  detail: string;
}

export interface AboutStoryPillarCopy {
  title: string;
  description: string;
}

export interface AboutFaqItemCopy {
  question: string;
  answer: string;
  actionLabel?: string;
}

export interface AboutUsLocaleCopy {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  hero: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    supportingText: string;
    editorialCalloutLine1: string;
    editorialCalloutLine2: string;
    editorialCalloutLine3: string;
    mainImageAlt: string;
    travelerImageAlt: string;
    factsPanelTitle: string;
    factsPanelSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  facts: Record<string, AboutFactCopy>;
  story: {
    scriptEyebrow: string;
    headingLine1: string;
    headingLine2: string;
    leadParagraph: string;
    secondaryParagraph: string;
    collageBadgeTitle: string;
    collageBadgeSubtitle: string;
    collagePrimaryAlt: string;
    collageSecondaryAlt: string;
    primaryCta: string;
    secondaryCta: string;
    planningDeskLabel: string;
    planningDeskRole: string;
    pillars: Record<AboutStoryPillarId, AboutStoryPillarCopy>;
  };
  corridorsOverview: {
    eyebrow: string;
    heading: string;
    supportingText: string;
    exploreCta: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    supportingText: string;
    stillHaveQuestionsTitle: string;
    stillHaveQuestionsText: string;
    stillHaveQuestionsCta: string;
    expandAllLabel: string;
    collapseAllLabel: string;
    items: Record<AboutFaqTopicId, AboutFaqItemCopy>;
  };
}

export const ABOUT_US_DICTIONARY: Record<SupportedLocale, AboutUsLocaleCopy> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "About WEST GLOBAL TOURS",
    hero: {
      eyebrow: "ABOUT WEST GLOBAL TOURS",
      headingLine1: "Thoughtful Planning Across",
      headingLine2: "Egypt, Türkiye & Dubai",
      supportingText:
        "We help travelers explore three iconic destinations through structured journey corridors, clear itinerary context, and direct personal consultation.",
      editorialCalloutLine1: "Travel",
      editorialCalloutLine2: "is a",
      editorialCalloutLine3: "Journey",
      mainImageAlt:
        "Panoramic golden sunset view across the Nile Valley, Giza Pyramids, and Dubai waterfront horizon",
      travelerImageAlt:
        "Traveler holding an open route map exploring Egypt, Türkiye, and Dubai with WEST GLOBAL TOURS",
      factsPanelTitle: "Verified Company Scope",
      factsPanelSubtitle: "Confirmed destinations, curated routes & direct planning channels",
      primaryCta: "Start Planning Your Trip",
      secondaryCta: "Explore Our 3 Destinations",
    },
    facts: {
      verified_destinations: {
        label: "Core Destinations",
        detail: "Egypt · Türkiye · Dubai",
      },
      curated_journey_routes: {
        label: "Signature Journeys",
        detail: "Curated Cultural & City Routes",
      },
      supported_languages: {
        label: "Multilingual Desk",
        detail: "English · Türkçe · Español",
      },
      direct_inquiry_channels: {
        label: "Direct Consultation",
        detail: "WhatsApp & Email Planning",
      },
      travelers_served: {
        label: "Travelers Served",
        detail: "Verified Guest Records",
      },
      journeys_organized: {
        label: "Journeys Organized",
        detail: "Completed Itineraries",
      },
      years_experience: {
        label: "Years of Experience",
        detail: "Regional Planning Expertise",
      },
    },
    story: {
      scriptEyebrow: "About Company",
      headingLine1: "A Dedicated Opportunity for",
      headingLine2: "Cultural & Modern Discovery",
      leadParagraph:
        "WEST GLOBAL TOURS serves individual travelers, couples, families, and private groups looking to experience Egypt, Türkiye, and Dubai with clarity and confidence. Rather than overwhelming visitors with hundreds of generic listings, we focus on three distinct destinations where historic heritage and modern hospitality meet.",
      secondaryParagraph:
        "Each journey in our portfolio highlights confirmed geographic corridors—from Cairo, Giza, and Luxor along the Nile, to Istanbul's Historic Peninsula and the Bosphorus Strait, to Downtown Dubai and the Arabian Gulf. When you are ready to travel, our team prepares a tailored quotation around your preferred dates and group size.",
      collageBadgeTitle: "Egypt · Türkiye · Dubai",
      collageBadgeSubtitle: "Tailored Private & Cultural Journeys",
      collagePrimaryAlt:
        "Golden sunset over the Nile River and ancient temple columns in Egypt",
      collageSecondaryAlt:
        "Istanbul mosque domes and Bosphorus waterfront at sunset in Türkiye",
      primaryCta: "Start Your Journey",
      secondaryCta: "Browse Destination Portfolio",
      planningDeskLabel: "WEST GLOBAL TOURS",
      planningDeskRole: "Direct Itinerary & Quotation Desk",
      pillars: {
        destination_focus: {
          title: "Focused Three-Destination Expertise",
          description:
            "Dedicated exclusively to Egypt, Türkiye, and Dubai—allowing you to explore a single country or combine corridors.",
        },
        mission_approach: {
          title: "Mission & Planning Approach",
          description:
            "Clear geographic routing, honest trip overviews, and tailored quotations without hidden placeholder fees.",
        },
        transparent_corridors: {
          title: "Curated Journey Selection",
          description:
            "Every featured trip outlines its core cities and landmarks so you know exactly what each route covers.",
        },
        direct_consultation: {
          title: "Direct WhatsApp & Email Support",
          description:
            "Connect directly with our team via WhatsApp (+20 120 139 8685) or Email for responsive trip planning.",
        },
      },
    },
    corridorsOverview: {
      eyebrow: "WHERE WE OPERATE",
      heading: "Three Extraordinary Destinations, One Cohesive Standard",
      supportingText:
        "Explore each destination's signature landmarks and open our interactive Destination Discovery portfolio to view available journeys.",
      exploreCta: "Open Destination Discovery",
    },
    faq: {
      eyebrow: "QUESTIONS & ANSWERS",
      heading: "Frequently Asked Questions",
      supportingText:
        "Clear answers about our destinations, how to explore available journeys, and how to request a tailored trip quotation from WEST GLOBAL TOURS.",
      stillHaveQuestionsTitle: "Have a specific question about your travel dates?",
      stillHaveQuestionsText:
        "Reach out directly through our Trip Inquiry Drawer, WhatsApp (+20 120 139 8685), or Email (westglobaltours.info@gmail.com).",
      stillHaveQuestionsCta: "Open Trip Inquiry Form",
      expandAllLabel: "Expand all questions",
      collapseAllLabel: "Collapse all questions",
      items: {
        destinations_covered: {
          question: "Which destinations does WEST GLOBAL TOURS cover?",
          answer:
            "WEST GLOBAL TOURS specializes in three primary destinations: Egypt (including Cairo, the Giza Plateau, Sakkara, and the Nile Valley corridor to Luxor), Türkiye (including Istanbul's Historic Peninsula, the Golden Horn, and the Bosphorus Strait across Europe and Asia), and Dubai in the United Arab Emirates (including Downtown Dubai, the Burj Khalifa corridor, waterfront promenades, and desert horizons).",
          actionLabel: "Explore All 3 Destinations →",
        },
        explore_journeys: {
          question: "How can I explore the journeys available for each destination?",
          answer:
            "You can preview our destinations directly in the Homepage Hero or open the dedicated Destination Discovery page (/destinations). Selecting Egypt, Türkiye, or Dubai updates the active visual stage and filters the journey cards below to display the curated routes associated with that destination. Clicking any journey card opens its detailed route overview.",
          actionLabel: "Browse Curated Journeys →",
        },
        request_quotation: {
          question: "How do I request a trip quotation?",
          answer:
            "Click any 'Plan My Trip', 'Start Your Journey', or 'Contact' button across the website to open the right-side Trip Inquiry Drawer. Select your preferred destination and journey, enter your contact details and party size, and submit the form to generate a structured inquiry ready to send directly to our team via WhatsApp or Email.",
          actionLabel: "Open Trip Inquiry Drawer →",
        },
        inquiry_information: {
          question: "What information should I provide when making an inquiry?",
          answer:
            "To help us prepare an accurate quotation, please share your full name, an active phone or WhatsApp number, your chosen destination (Egypt, Türkiye, or Dubai), the specific journey you are interested in, the number of travelers (adults and children), and your preferred travel dates or any special requests in the notes field.",
          actionLabel: "Start an Inquiry Now →",
        },
        contact_channels: {
          question: "How can I contact the company?",
          answer:
            "You can contact WEST GLOBAL TOURS directly on WhatsApp at +20 120 139 8685, by email at westglobaltours.info@gmail.com, through the interactive Trip Inquiry Drawer on any page, or via the quick-access floating social menu in the bottom-right corner of the screen (which also links to our official Instagram and Facebook pages).",
          actionLabel: "Contact Our Team →",
        },
        booking_conditions: {
          question: "Where can I find confirmed journey details and booking conditions?",
          answer:
            "Each journey page displays confirmed geographic corridors, location highlights, and inquiry format metadata. Because itinerary durations, seasonal accommodation options, transfer arrangements, and booking terms depend on your travel dates and group size, confirmed schedules and commercial terms are provided directly in your personalized written quotation from WEST GLOBAL TOURS.",
          actionLabel: "View Journey Catalog →",
        },
      },
    },
  },
  tr: {
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "WEST GLOBAL TOURS Hakkında",
    hero: {
      eyebrow: "WEST GLOBAL TOURS HAKKINDA",
      headingLine1: "Mısır, Türkiye ve Dubai'de",
      headingLine2: "Özenli Seyahat Planlaması",
      supportingText:
        "Gezginlerin üç simgesel destinasyonu yapılandırılmış rota koridorları, net tur bilgileri ve doğrudan kişisel danışmanlık ile keşfetmesine yardımcı oluyoruz.",
      editorialCalloutLine1: "Seyahat",
      editorialCalloutLine2: "Bir",
      editorialCalloutLine3: "Yolculuktur",
      mainImageAlt:
        "Nil Vadisi, Gize Piramitleri ve Dubai su kıyısı ufkunda panoramik altın gün batımı görünümü",
      travelerImageAlt:
        "WEST GLOBAL TOURS ile Mısır, Türkiye ve Dubai rotalarını keşfeden haritalı gezgin",
      factsPanelTitle: "Doğrulanmış Hizmet Kapsamı",
      factsPanelSubtitle: "Onaylı destinasyonlar, seçkin rotalar ve doğrudan iletişim kanalları",
      primaryCta: "Seyahatinizi Planlayın",
      secondaryCta: "3 Destinasyonumuzu Keşfedin",
    },
    facts: {
      verified_destinations: {
        label: "Ana Destinasyonlar",
        detail: "Mısır · Türkiye · Dubai",
      },
      curated_journey_routes: {
        label: "İmza Rotalar",
        detail: "Kültür ve Şehir Yolculukları",
      },
      supported_languages: {
        label: "Çok Dilli Destek",
        detail: "English · Türkçe · Español",
      },
      direct_inquiry_channels: {
        label: "Doğrudan Danışmanlık",
        detail: "WhatsApp ve E-posta Planlama",
      },
      travelers_served: {
        label: "Ağırlanan Misafir",
        detail: "Doğrulanmış Misafir Kayıtları",
      },
      journeys_organized: {
        label: "Düzenlenen Turlar",
        detail: "Tamamlanan Programlar",
      },
      years_experience: {
        label: "Yıllık Deneyim",
        detail: "Bölgesel Planlama Uzmanlığı",
      },
    },
    story: {
      scriptEyebrow: "Şirketimiz Hakkında",
      headingLine1: "Kültürel ve Modern Keşif İçin",
      headingLine2: "Özel Bir Seyahat Deneyimi",
      leadParagraph:
        "WEST GLOBAL TOURS; Mısır, Türkiye ve Dubai'yi netlik ve güvenle deneyimlemek isteyen bireysel gezginlere, çiftlere, ailelere ve özel gruplara hizmet verir. Ziyaretçileri yüzlerce karmaşık paketle yormak yerine, tarihi miras ile modern misafirperverliğin buluştuğu üç seçkin destinasyona odaklanıyoruz.",
      secondaryParagraph:
        "Portföyümüzdeki her yolculuk; Kahire, Gize ve Nil boyunca Luksor'dan, İstanbul'un Tarihi Yarımadası ve Boğaziçi'ne, Downtown Dubai ve Basra Körfezi'ne kadar doğrulanmış coğrafi koridorları öne çıkarır. Seyahate hazır olduğunuzda ekibimiz tercih ettiğiniz tarihlere ve kişi sayısına uygun özel bir teklif hazırlar.",
      collageBadgeTitle: "Mısır · Türkiye · Dubai",
      collageBadgeSubtitle: "Özel Kurgulanmış Kültür ve Şehir Rotaları",
      collagePrimaryAlt:
        "Mısır'da Nil Nehri ve antik tapınak sütunları üzerinde altın gün batımı",
      collageSecondaryAlt:
        "Türkiye'de gün batımında İstanbul cami kubbeleri ve Boğaz kıyısı",
      primaryCta: "Yolculuğunuza Başlayın",
      secondaryCta: "Destinasyon Portföyünü İncele",
      planningDeskLabel: "WEST GLOBAL TOURS",
      planningDeskRole: "Doğrudan Rota ve Teklif Masası",
      pillars: {
        destination_focus: {
          title: "Üç Destinasyonda Odaklı Uzmanlık",
          description:
            "Yalnızca Mısır, Türkiye ve Dubai'ye odaklanarak tek bir ülkeyi keşfetmenize veya rotaları birleştirmenize olanak tanır.",
        },
        mission_approach: {
          title: "Misyon ve Planlama Yaklaşımı",
          description:
            "Net coğrafi rotalar, şeffaf tur özetleri ve yanıltıcı başlangıç fiyatları olmadan kişiye özel tekliflendirme.",
        },
        transparent_corridors: {
          title: "Seçkin Rota Koleksiyonu",
          description:
            "Öne çıkan her yolculuk, hangi şehirleri ve simgesel noktaları kapsadığını açıkça gösterir.",
        },
        direct_consultation: {
          title: "Doğrudan WhatsApp ve E-posta Desteği",
          description:
            "Hızlı ve özenli seyahat planlaması için ekibimizle WhatsApp (+20 120 139 8685) veya E-posta üzerinden doğrudan iletişime geçin.",
        },
      },
    },
    corridorsOverview: {
      eyebrow: "HİZMET BÖLGELERİMİZ",
      heading: "Üç Olağanüstü Destinasyon, Tek Bir Kalite Standardı",
      supportingText:
        "Her destinasyonun simgesel bölgelerini inceleyin ve mevcut turları görmek için interaktif Destinasyon Keşfi sayfamızı açın.",
      exploreCta: "Destinasyon Keşfini Aç",
    },
    faq: {
      eyebrow: "SORULAR VE YANITLAR",
      heading: "Sıkça Sorulan Sorular",
      supportingText:
        "Destinasyonlarımız, mevcut turları nasıl inceleyebileceğiniz ve WEST GLOBAL TOURS'tan nasıl özel seyahat teklifi alabileceğiniz hakkında net yanıtlar.",
      stillHaveQuestionsTitle: "Seyahat tarihlerinizle ilgili özel bir sorunuz mu var?",
      stillHaveQuestionsText:
        "Seyahat Planlama Formumuz, WhatsApp (+20 120 139 8685) veya E-posta (westglobaltours.info@gmail.com) üzerinden bize doğrudan ulaşabilirsiniz.",
      stillHaveQuestionsCta: "Seyahat Talep Formunu Aç",
      expandAllLabel: "Tüm soruları aç",
      collapseAllLabel: "Tüm soruları kapat",
      items: {
        destinations_covered: {
          question: "WEST GLOBAL TOURS hangi destinasyonları kapsıyor?",
          answer:
            "WEST GLOBAL TOURS üç ana destinasyonda uzmanlaşmıştır: Mısır (Kahire, Gize Platosu, Sakkara ve Luksor'a uzanan Nil Vadisi koridoru), Türkiye (İstanbul Tarihi Yarımada, Haliç ve Avrupa ile Asya'yı birleştiren İstanbul Boğazı) ve Birleşik Arap Emirlikleri'nde Dubai (Downtown Dubai, Burj Khalifa koridoru, su kıyısı bulvarları ve çöl ufukları).",
          actionLabel: "3 Destinasyonu Keşfet →",
        },
        explore_journeys: {
          question: "Her destinasyon için mevcut turları nasıl inceleyebilirim?",
          answer:
            "Destinasyonlarımızı doğrudan Ana Sayfa Hero alanında önizleyebilir veya özel Destinasyon Keşfi sayfasını (/destinations) açabilirsiniz. Mısır, Türkiye veya Dubai'yi seçtiğinizde görsel sahne güncellenir ve alt kısımdaki tur kartları seçilen destinasyona ait rotaları gösterecek şekilde filtrelenir. Herhangi bir tur kartına tıklayarak detay sayfasını açabilirsiniz.",
          actionLabel: "Seçkin Turları İncele →",
        },
        request_quotation: {
          question: "Nasıl seyahat fiyat teklifi talep edebilirim?",
          answer:
            "Sitedeki herhangi bir 'Seyahatimi Planla', 'Yolculuğunuza Başlayın' veya 'İletişim' butonuna tıklayarak sağ taraftan açılan Seyahat Talep Formunu (Trip Inquiry Drawer) kullanabilirsiniz. Destinasyonunuzu ve turunuzu seçip iletişim bilgilerinizi ve yolcu sayısını girdikten sonra, talebinizi WhatsApp veya E-posta ile doğrudan ekibimize gönderebilirsiniz.",
          actionLabel: "Seyahat Talep Formunu Aç →",
        },
        inquiry_information: {
          question: "Talep oluştururken hangi bilgileri paylaşmalıyım?",
          answer:
            "Size doğru ve kapsamlı bir teklif hazırlayabilmemiz için lütfen adınızı-soyadınızı, aktif telefon veya WhatsApp numaranızı, seçtiğiniz destinasyonu (Mısır, Türkiye veya Dubai), ilgilendiğiniz turu, yolcu sayısını ve tercih ettiğiniz seyahat tarihlerini veya özel notlarınızı paylaşın.",
          actionLabel: "Şimdi Talep Oluştur →",
        },
        contact_channels: {
          question: "Şirketle nasıl iletişime geçebilirim?",
          answer:
            "WEST GLOBAL TOURS ekibine +20 120 139 8685 numaralı WhatsApp hattından, westglobaltours.info@gmail.com e-posta adresinden, her sayfada yer alan Seyahat Talep Formundan veya sağ alt köşedeki hızlı iletişim menüsünden (resmi Instagram ve Facebook sayfalarımız dahil) doğrudan ulaşabilirsiniz.",
          actionLabel: "Ekibimizle İletişime Geçin →",
        },
        booking_conditions: {
          question: "Doğrulanmış tur detaylarını ve rezervasyon koşullarını nerede bulabilirim?",
          answer:
            "Her tur sayfası onaylanmış coğrafi koridorları, öne çıkan bölgeleri ve talep modelini gösterir. Tur süreleri, dönemsel konaklama seçenekleri, transfer düzenlemeleri ve rezervasyon koşulları seyahat tarihlerinize ve grup büyüklüğünüze göre şekillendiğinden, kesinleşmiş program ve ticari koşullar doğrudan yazılı teklifinizde paylaşılır.",
          actionLabel: "Tur Kataloğunu Gör →",
        },
      },
    },
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Sobre WEST GLOBAL TOURS",
    hero: {
      eyebrow: "SOBRE WEST GLOBAL TOURS",
      headingLine1: "Planificación Cuidadosa en",
      headingLine2: "Egipto, Türkiye y Dubái",
      supportingText:
        "Ayudamos a los viajeros a explorar tres destinos icónicos mediante corredores de viaje estructurados, detalles claros de itinerario y consulta personal directa.",
      editorialCalloutLine1: "Viajar",
      editorialCalloutLine2: "es una",
      editorialCalloutLine3: "Aventura",
      mainImageAlt:
        "Vista panorámica al atardecer dorado sobre el Valle del Nilo, las Pirámides de Guiza y el horizonte de Dubái",
      travelerImageAlt:
        "Viajero con mapa explorando Egipto, Türkiye y Dubái con WEST GLOBAL TOURS",
      factsPanelTitle: "Alcance Verificado",
      factsPanelSubtitle: "Destinos confirmados, rutas seleccionadas y canales directos",
      primaryCta: "Planificar Tu Viaje",
      secondaryCta: "Explorar los 3 Destinos",
    },
    facts: {
      verified_destinations: {
        label: "Destinos Principales",
        detail: "Egipto · Türkiye · Dubái",
      },
      curated_journey_routes: {
        label: "Rutas de Autor",
        detail: "Viajes Culturales y Urbanos",
      },
      supported_languages: {
        label: "Atención Multilingüe",
        detail: "English · Türkçe · Español",
      },
      direct_inquiry_channels: {
        label: "Consulta Directa",
        detail: "Planificación por WhatsApp y Correo",
      },
      travelers_served: {
        label: "Viajeros Atendidos",
        detail: "Registros Verificados",
      },
      journeys_organized: {
        label: "Viajes Organizados",
        detail: "Itinerarios Completados",
      },
      years_experience: {
        label: "Años de Experiencia",
        detail: "Experiencia en Planificación Regional",
      },
    },
    story: {
      scriptEyebrow: "Sobre la Compañía",
      headingLine1: "Una Gran Oportunidad para el",
      headingLine2: "Descubrimiento Cultural y Moderno",
      leadParagraph:
        "WEST GLOBAL TOURS atiende a viajeros individuales, parejas, familias y grupos privados que desean descubrir Egipto, Türkiye y Dubái con claridad y confianza. En lugar de saturar con cientos de paquetes genéricos, nos enfocamos en tres destinos extraordinarios donde el patrimonio histórico y la hospitalidad moderna se unen.",
      secondaryParagraph:
        "Cada viaje de nuestro portafolio presenta corredores geográficos confirmados: desde El Cairo, Guiza y Luxor junto al Nilo, pasando por la Península Histórica de Estambul y el Bósforo, hasta Downtown Dubái y el Golfo Pérsico. Cuando estés listo para viajar, nuestro equipo prepara una cotización adaptada a tus fechas y grupo.",
      collageBadgeTitle: "Egipto · Türkiye · Dubái",
      collageBadgeSubtitle: "Rutas Privadas y Culturales a Medida",
      collagePrimaryAlt:
        "Puesta de sol dorada sobre el río Nilo y columnas de templos antiguos en Egipto",
      collageSecondaryAlt:
        "Cúpulas de mezquitas de Estambul y costa del Bósforo al atardecer en Türkiye",
      primaryCta: "Comenzar Tu Viaje",
      secondaryCta: "Ver Portafolio de Destinos",
      planningDeskLabel: "WEST GLOBAL TOURS",
      planningDeskRole: "Mesa Directa de Rutas y Cotizaciones",
      pillars: {
        destination_focus: {
          title: "Especialización en Tres Destinos",
          description:
            "Dedicados exclusivamente a Egipto, Türkiye y Dubái, permitiéndote explorar un país o combinar corredores.",
        },
        mission_approach: {
          title: "Misión y Enfoque de Planificación",
          description:
            "Rutas geográficas claras, resúmenes transparentes y cotizaciones personalizadas sin cargos ficticios.",
        },
        transparent_corridors: {
          title: "Selección de Viajes Curados",
          description:
            "Cada viaje destacado detalla sus ciudades y monumentos clave para que conozcas el alcance exacto de la ruta.",
        },
        direct_consultation: {
          title: "Soporte Directo por WhatsApp y Correo",
          description:
            "Comunícate directamente con nuestro equipo por WhatsApp (+20 120 139 8685) o Correo para planificar tu viaje.",
        },
      },
    },
    corridorsOverview: {
      eyebrow: "DÓNDE OPERAMOS",
      heading: "Tres Destinos Extraordinarios, Un Estándar Cohesivo",
      supportingText:
        "Explora las regiones emblemáticas de cada destino y abre nuestro portafolio interactivo para ver los viajes disponibles.",
      exploreCta: "Abrir Descubrimiento de Destinos",
    },
    faq: {
      eyebrow: "PREGUNTAS Y RESPUESTAS",
      heading: "Preguntas Frecuentes",
      supportingText:
        "Respuestas claras sobre nuestros destinos, cómo explorar los viajes disponibles y cómo solicitar una cotización personalizada con WEST GLOBAL TOURS.",
      stillHaveQuestionsTitle: "¿Tienes alguna pregunta específica sobre tus fechas de viaje?",
      stillHaveQuestionsText:
        "Escríbenos directamente a través del Formulario de Consulta, WhatsApp (+20 120 139 8685) o Correo (westglobaltours.info@gmail.com).",
      stillHaveQuestionsCta: "Abrir Formulario de Consulta",
      expandAllLabel: "Expandir todas las preguntas",
      collapseAllLabel: "Contraer todas las preguntas",
      items: {
        destinations_covered: {
          question: "¿Qué destinos cubre WEST GLOBAL TOURS?",
          answer:
            "WEST GLOBAL TOURS se especializa en tres destinos principales: Egipto (incluyendo El Cairo, la Meseta de Guiza, Saqqara y el corredor del Valle del Nilo hacia Luxor), Türkiye (incluyendo la Península Histórica de Estambul, el Cuerno de Oro y el Estrecho del Bósforo entre Europa y Asia) y Dubái en los Emiratos Árabes Unidos (incluyendo Downtown Dubái, el corredor del Burj Khalifa, paseos marítimos y horizontes del desierto).",
          actionLabel: "Explorar los 3 Destinos →",
        },
        explore_journeys: {
          question: "¿Cómo puedo explorar los viajes disponibles para cada destino?",
          answer:
            "Puedes previsualizar nuestros destinos directamente en el Hero de la página de inicio o abrir la página dedicada de Descubrimiento de Destinos (/destinations). Al seleccionar Egipto, Türkiye o Dubái, se actualiza el escenario visual activo y se filtran las tarjetas de viaje inferiores para mostrar las rutas asociadas a ese destino. Al hacer clic en cualquier tarjeta, se abre su página de detalles.",
          actionLabel: "Explorar Viajes Seleccionados →",
        },
        request_quotation: {
          question: "¿Cómo solicito una cotización de viaje?",
          answer:
            "Haz clic en cualquier botón 'Planificar Mi Viaje', 'Comenzar Tu Viaje' o 'Contacto' en el sitio web para abrir el panel lateral de Consulta de Viaje (Trip Inquiry Drawer). Selecciona tu destino y ruta preferidos, ingresa tus datos de contacto y número de viajeros, y envía el formulario para generar una solicitud lista para enviar por WhatsApp o Correo.",
          actionLabel: "Abrir Panel de Consulta →",
        },
        inquiry_information: {
          question: "¿Qué información debo proporcionar al hacer una consulta?",
          answer:
            "Para ayudarnos a preparar una cotización precisa, comparte tu nombre completo, un número activo de teléfono o WhatsApp, el destino elegido (Egipto, Türkiye o Dubái), el viaje que te interesa, el número de viajeros (adultos y niños) y tus fechas tentativas de viaje o notas especiales.",
          actionLabel: "Iniciar Consulta Ahora →",
        },
        contact_channels: {
          question: "¿Cómo puedo contactar a la empresa?",
          answer:
            "Puedes comunicarte con WEST GLOBAL TOURS directamente por WhatsApp al +20 120 139 8685, por correo electrónico a westglobaltours.info@gmail.com, mediante el Formulario de Consulta de Viaje en cualquier página, o a través del botón flotante de contacto rápido en la esquina inferior derecha (que también enlaza a nuestras páginas oficiales de Instagram y Facebook).",
          actionLabel: "Contactar al Equipo →",
        },
        booking_conditions: {
          question: "¿Dónde puedo encontrar detalles confirmados del viaje y condiciones de reserva?",
          answer:
            "Cada página de viaje muestra los corredores geográficos confirmados, ubicaciones clave y formato de consulta. Dado que la duración exacta, opciones de alojamiento por temporada, traslados y condiciones de reserva dependen de tus fechas de viaje y tamaño del grupo, los horarios confirmados y términos comerciales se entregan directamente en tu cotización personalizada por escrito.",
          actionLabel: "Ver Catálogo de Viajes →",
        },
      },
    },
  },
};
