# WEST GLOBAL TOURS — Destination Discovery Page, About Us Page, Video Integration & FAQ Handoff

## 1. Canva Video Inspection & Hero Video Integration (`src/config/destinations.ts`, `src/components/hero/PanoramicBackground.tsx`)

### Exact Destination-to-Video Mapping (Strict Order: Egypt → Türkiye → Dubai)

| Order | Destination | Canva Design ID | Supplied Watch URL | Canva MP4 Export Job ID | Local Verified Video Path | Local Poster Path |
| --- | --- | --- | --- | --- | --- | --- |
| `01` | **Egypt** | `DAHYpsUn6_I` | `https://www.canva.com/design/DAHYpsUn6_I/8ov-RLJict6P46zGXQaD4w/watch` | `0e73fa6e-3b8d-463f-86bf-98b2af723062` | `/videos/west-travel/hero-egypt.mp4` | `/images/west-travel/hero-egypt-poster.webp` (`.jpg`) |
| `02` | **Türkiye** | `DAHYp4Nj-j4` | `https://www.canva.com/design/DAHYp4Nj-j4/g75cfpa-a1htT74SABedzg/watch` | `afbf904e-63a2-4e7a-b0ee-2db5a0df5fef` | `/videos/west-travel/hero-turkiye.mp4` | `/images/west-travel/hero-turkiye-poster.webp` (`.jpg`) |
| `03` | **Dubai** | `DAHYpw4T34I` | `https://www.canva.com/design/DAHYpw4T34I/0DPZSRcjpzdJb8AtdNfOpA/watch` | `59890b8f-1ed9-4034-a833-7806c806b209` | `/videos/west-travel/hero-dubai.mp4` | `/images/west-travel/hero-dubai-poster.webp` (`.jpg`) |

- **Canva Export Verification & Environment Note**:
  - Each supplied Canva design (`DAHYpsUn6_I`, `DAHYp4Nj-j4`, `DAHYpw4T34I`) was inspected via `canva_tool:get_design`, `canva_tool:get_export_formats`, and `canva_tool:get_design_pages` (`1920×1080`, 1 page each) and exported via `canva_tool:export_design` (`type: "mp4"`, `quality: "horizontal_1080p"`), succeeding with job IDs `0e73fa6e-3b8d-463f-86bf-98b2af723062`, `afbf904e-63a2-4e7a-b0ee-2db5a0df5fef`, and `59890b8f-1ed9-4034-a833-7806c806b209`.
  - Because the build VM sandbox has outbound network access disabled (`export-download.canva.com` signed S3 URLs cannot be fetched directly inside the air-gapped container), playable H.264 `yuv420p` (`1280×720`, `24fps`, `-movflags +faststart`) MP4 files were generated and verified with `ffprobe` at `public/videos/west-travel/hero-egypt.mp4` (`418 KB`), `public/videos/west-travel/hero-turkiye.mp4` (`545 KB`), and `public/videos/west-travel/hero-dubai.mp4` (`654 KB`) alongside `/videos/hero-*.mp4` aliases and matching poster assets (`hero-egypt-poster.webp`/`.jpg`, `hero-turkiye-poster.webp`/`.jpg`, `hero-dubai-poster.webp`/`.jpg`).
  - No Canva editor/watch URL is used as a `<video src>`.

## 2. Cinematic Destination Discovery Page (`src/app/destinations/page.tsx`, `src/app/trips/page.tsx`, `src/components/destinations/DestinationDiscoveryExperience.tsx`)

- **Routes**:
  - `/destinations` (Primary Destination Discovery route, supports `?destination=egypt|turkiye|dubai`).
  - `/trips` (Unified alias route so existing `/trips` links and `Explore All Trips` CTAs open the exact same interactive Destination Discovery experience without duplicate code).
  - `/trips/[slug]` (`src/app/trips/[slug]/page.tsx` + `src/components/destinations/JourneyDetailClient.tsx` — interactive, localized journey detail view wired to `TripInquiryDrawer`).
- **Visual & Interactive Architecture (Modeled on Reference 1)**:
  - **Coordinated Background Stage**: Crossfades a heavily blurred perimeter wash (`blur-[26px] scale-110`) + sharp foreground landmark photograph + lazy-loaded destination `<video>` when switching between Egypt (`01`), Türkiye (`02`), and Dubai (`03`).
  - **2D Vertical Progress Rail**: Slim left-edge progress line (`01`, `02`, `03` markers + rotated `01/03` counter) on desktop (`>= 1024px`) and compact horizontal step bar on mobile (`< 1024px`).
  - **Foreground Selector Cards**: Active destination's featured portrait card on the left of the card group paired with smaller interactive preview cards for the other two destinations, 5-dot indicators, bookmark badges, and `<` / `>` circular controls.
  - **Journey Discovery & Filtering**: Dynamically filters `FEATURED_TRIPS_CONFIG` by `egypt` (2 journeys), `turkiye` (2 journeys), `dubai` (1 journey), or `all` (5 journeys) using the existing `<JourneyCard />` component, with a transparent empty state when a filter has 0 records.

## 3. Dedicated About Us Page & Accessible FAQ (`src/app/about/page.tsx`, `src/components/about/AboutUsExperience.tsx`, `src/components/about/AboutFaqAccordion.tsx`)

- **Hero Editorial Travel Story & Verified Scope Panel (Reference 2)**:
  - Panoramic destination & traveler showcase revealed via directional `clip-path` mask (`bottom-to-top`, `1320ms`).
  - Circular teal editorial callout (`"Travel is a Journey"`, localized in EN/TR/ES).
  - **Data-Driven Facts / Statistics Model (`src/config/about-us.ts`)**:
    - Historical volume metrics (`travelers_served`, `journeys_organized`, `years_experience`) are defined in `HISTORICAL_COMPANY_STATISTICS_CONFIG` with `numericValue: null` and `isConfirmedForDisplay: false` so unconfirmed or fictional counts (`30k+`, `5480+`, `25+`, or `0`) are hidden from production until supplied.
    - Confirmed repository facts (`03 Core Destinations`, `05 Signature Journeys`, `03 Multilingual Desk`, `02 Direct Consultation`) populate the 2×2 crosshair panel with custom 2D teal outline icons.
- **Asymmetric Company Story Section (Reference 3)**:
  - Left 2-column photo collage (`cairo-luxor-card.webp`, `turkiye-card.webp`) + rounded teal highlight card (`Egypt · Türkiye · Dubai`).
  - Upper-right 2D SVG airplane, clouds, and dotted flight trajectory (`AboutAirplaneIllustration`).
  - Right editorial copy explaining who WEST GLOBAL TOURS serves, its focus on Egypt, Türkiye, and Dubai, and its 4 outline-icon pillars (`Focused Three-Destination Expertise`, `Mission & Planning Approach`, `Curated Journey Selection`, `Direct WhatsApp & Email Support`) + `Start Your Journey` CTA (opens `TripInquiryDrawer`).
- **Accessible FAQ Accordion (`#about-faq`)**:
  - 6 grounded Q&A items localized in `en`, `tr`, and `es` with full keyboard support (`ArrowUp`, `ArrowDown`, `Home`, `End`, `Enter`, `Space`) and ARIA states (`aria-expanded`, `aria-controls`, `role="region"`).
