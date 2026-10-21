# WEST GLOBAL TOURS — Final Website Polish, Social FAB, Trip Inquiry Drawer, Motion Refinement & Footer

## 1. Official Company Identity & Contact Configuration (`src/config/final-cta-footer.ts`)
- **Official Company Name**: `WEST GLOBAL TOURS`
- **Official Logo Asset**: `public/images/west-travel/west-global-tours-logo.webp` (`256x256`, `21.6 KB`) and `public/images/west-travel/west-global-tours-logo.png` (`256x256`, `89.9 KB`), processed directly from the supplied official `Luxury Globe Travel Emblem.png`.
- **Official Contact & Social Channels**:
  - **WhatsApp**: `+20 120 139 8685` (`https://wa.me/201201398685`)
  - **Email**: `westglobaltours.info@gmail.com` (`mailto:westglobaltours.info@gmail.com`)
  - **Instagram**: `https://www.instagram.com/westglobaltours/`
  - **Facebook**: `https://www.facebook.com/profile.php?id=61595448091591`
  - **Developer Credit**: `Developed by Mina Medhat` (`https://mina-medhat.is-a.dev/`)
- No unverified TikTok URL, physical street address, or fake social channels were added.

## 2. Slowed & Refined Site-Wide Motion System
- **Viewport-Only Triggers Below the Fold**: `useInViewOnce` in `src/components/motion/MotionPrimitives.tsx` uses `IntersectionObserver` (`threshold: 0.16`, `rootMargin: "0px 0px -10% 0px"`) with `once: true` so below-the-fold sections remain in their pre-reveal state until scrolled into view and animate once cleanly.
- **Refined Durations & Staggers**:
  - Standard content/line reveals (`SplitLinesReveal`, `MotionReveal`): `840ms–980ms` with `110ms–160ms` staggers (`cubic-bezier(0.22, 1, 0.36, 1)`).
  - Directional image-mask reveals (`DirectionalMaskReveal`): `1140ms–1240ms`.
  - Featured Trips 5-card cascade (`FeaturedTripsSection.tsx` / `JourneyCard.tsx`): `980ms` reveal duration with `140ms` per-card stagger (`0ms` to `560ms`).
  - Why West Global Tours editorial section (`WhyWestTravelSection.tsx`): `940ms–1180ms` reveal durations with `150ms` feature-row staggers.
  - Final CTA panel (`FinalCtaSection.tsx`): `1180ms` directional mask reveal + `900ms` staggered text/CTA reveals.
- **Traveler Stories ("Our Latest Stories") 7-Step Clothesline Sequence (`TravelerStoriesSection.tsx` & `.module.css`)**:
  1. Empty SVG hemp clothesline fades in (`900ms`) when the section enters the viewport.
  2. Empty line holds visibly for `~900ms` before any Polaroid cards arrive.
  3. Polaroid review cards enter from their respective lateral/vertical directions (`--entry-x`, `--entry-y`) in a coordinated `150ms` staggered sequence (`980ms` travel duration).
  4. Each card reaches its clothespin position and triggers a subtle physical rope-impact flex (`1520ms`).
  5. Neighboring cards maintain clean spacing and never overlap or obscure text.
  6. Layered inner pendulum wrapper (`pendulumInitialHangLeft` / `pendulumInitialHangRight`) performs a damped spring-back swing (`1.85s`) independent of the horizontal carousel track transform.
  7. Cards settle into their resting tilt (`-2.5deg` / `+1.8deg`) with no continuous oscillation.

## 3. Animated Floating Social Action Button (`src/components/social-fab/FloatingSocialFab.tsx`)
- **Closed State**: Compact circular WhatsApp orb (`56x56px`) anchored in the bottom-right corner (`right/bottom: max(1.25rem, env(safe-area-inset-*))`), with tactile top specular highlight, subtle ring glow, and accessible label.
- **Expanded State (Liquid/Spring Physics)**:
  - Uses an inline SVG gooey filter (`feGaussianBlur` + `feColorMatrix` + `feComposite`) combined with spring-physics `cubic-bezier(0.34, 1.54, 0.64, 1)` trajectories.
  - Clicking the orb morphs the base, pulls an emerging liquid bridge upward, and separates 4 circular action buttons (`WhatsApp`, `Instagram`, `Facebook`, `Email`) along a compact upward quarter-circle arc (`40ms–205ms` stagger).
  - Main orb crossfades and rotates into a dark navy/petrol close (`X`) control.
  - Supports click-outside dismissal, `Escape` key dismissal (returning focus to the main button), keyboard `Tab` navigation, and automatically hides when the Trip Inquiry Drawer is open.

## 4. Right-Side Slide-Out Trip Inquiry Drawer (`src/components/inquiry-drawer/TripInquiryDrawer.tsx`)
- **Layout & Visual Design**: Slides in from the right edge (`820ms`, `cubic-bezier(0.22, 1, 0.36, 1)`), occupying `~34vw` (`420px–510px`) on desktop with a restrained translucent dark backdrop over the remaining two-thirds of the homepage, and full-width on mobile. Features warm-cream (`#FBF7F0`) Light Mode and deep petrol (`#102030`) Dark Mode surfaces, plus faint Giza pyramids/palm artwork in the bottom-left and a vintage airplane postmark stamp in the bottom-right.
- **Implemented Fields**:
  1. **Full Name** (`required`, placeholder `"e.g., Mark Zuckerberg"`)
  2. **Phone / WhatsApp** (`required`, international phone validation, placeholder `"e.g., +20 1XX XXX XXXX"`)
  3. **Destination** (`required`, localized `Egypt`, `Dubai`, `Türkiye`)
  4. **Journey / Trip** (`required`, dynamically filtered from `FEATURED_TRIPS_CONFIG` by the selected destination)
  5. **Number of Travelers** (`1` to `10+` travelers selector, default `2 travelers`)
  6. **Preferred Travel Date** (`optional` native date input)
  7. **Additional Notes** (`optional` multiline field, placeholder `"Anything we should know?"`)
- **Submission & Accessibility**:
  - Frontend validation prevents invalid submissions with accessible inline `role="alert"` messages.
  - Honest submission boundary: does **not** fake background delivery; prepares a structured inquiry summary with direct one-click WhatsApp (`https://wa.me/201201398685?text=...`) and Email (`mailto:westglobaltours.info@gmail.com?...`) handoff links.
  - Focus moves into the drawer on open, traps `Tab` / `Shift+Tab` inside the drawer, protects dirty form data against accidental backdrop clicks with a confirmation prompt, locks background page scroll, and restores focus to the triggering CTA on close.
