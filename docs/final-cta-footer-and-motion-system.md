# WEST GLOBAL TOURS — Animation Timing, Thin-Line Image Reveals, Horizontal Clothesline Physics, Icon Quality & Form Polish

## 1. Root Cause Diagnosis & Fix for Image Reveals (`MotionPrimitives.tsx`, `JourneyCard.tsx`, `DestinationCards.tsx`, `WhyWestTravelSection.tsx`, `FinalCtaSection.tsx`)
- **Why Image Reveals Were Previously Invisible or Looked Like Ordinary Slides**:
  1. `JourneyCard.tsx` and `DestinationCards.tsx` previously applied `opacity: 0` and `translate3d(-44px/44px)` to the outer `<article>` / `<button>` card shell *while simultaneously* applying `opacity: 0.01` inside `getDirectionalMaskStyle()`. As a result, while the `clip-path` mask was expanding during the first `~500ms`, the card's `opacity` was still near `0`, hiding the mask progression and making the animation look like a simple card slide + fade.
  2. `FinalCtaSection.tsx` used `center-out` with `inset(10% 16% 10% 16%)`, which already exposed ~70% of the final image before the reveal even began.
  3. Below-the-fold `IntersectionObserver` triggers (`threshold: 0.16`, `rootMargin: "0px 0px -10% 0px"`) could fire as soon as the top section padding crossed the bottom viewport edge before the images were comfortably within the user's line of sight.
- **How Initial States & Scroll Triggers Were Corrected**:
  1. **Thin-Line Initial Mask State (`getDirectionalMaskStyle`)**: Before entering the viewport (`!hasEntered`), images start masked down to a narrow `2.5%` visible strip (`inset(0% 0% 97.5% 0% round ...)` for `top-to-bottom`, `inset(97.5% 0% 0% 0% round ...)` for `bottom-to-top`) at **full `opacity: 1`**.
  2. **Progressive Uncover (`1280ms–1380ms`) + Inner Scale Settle (`getImageScaleSettleStyle`)**: When triggered, `clip-path` expands smoothly in one direction from the `2.5%` thin line to `inset(0% 0% 0% 0%)` over `1280ms–1380ms` (`cubic-bezier(0.22, 1, 0.36, 1)`), accompanied by a subtle inner image scale settle (`scale(1.05)` → `scale(1.0)` over `1380ms–1520ms`). Outer card shells stay anchored in their grid coordinates without sliding.
  3. **Double-Buffered Viewport Trigger (`useSectionEntrance`)**: Below-the-fold sections use `threshold: 0.22–0.24` and `rootMargin: "0px 0px -12% 0px"` with nested `requestAnimationFrame` double-buffering so the browser is guaranteed to paint the initial thin-line masked state before transitioning to the revealed state.

## 2. Slowed Multi-Phase Floating Social FAB (`FloatingSocialFab.tsx`)
- **Distinct 3-Phase Timing Sequence**:
  1. **Phase 1 — Main Button Response & Liquid Morph (`420ms` / within `300–500ms`)**: Clicking the WhatsApp button immediately triggers `fabMainButtonMorphOpen` (`440ms`) and stretches the emerging liquid neck blob (`440ms`) through the inline SVG gooey filter (`feGaussianBlur` + `feColorMatrix` + `feComposite`).
  2. **Phase 2 — Secondary Icon Emergence (`640ms` / within `500–750ms`) with `115ms` Stagger (`90ms`, `205ms`, `320ms`, `435ms`)**: Each secondary button (`WhatsApp`, `Instagram`, `Facebook`, `Email`) emerges from the center of the main button `(0, 0)` along its trajectory (`0%` → `55%` of the `1160ms` `fabSecondaryEmergeAndSettle` keyframe).
  3. **Phase 3 — Spring Overshoot & Rebound Settle (`520ms` / within `400–600ms`)**: From `55%` (`1.11×` trajectory overshoot, `scale(1.08)`) → `78%` (`0.95×` rebound, `scale(0.97)`) → `91%` (`1.02×` micro-settle) → `100%` (`1.00×` resting coordinate, `scale(1)`).
- **Responsive Arrangement**:
  - **Desktop (`>= 640px`)**: Radial upward-left quarter-circle arc (`(-6, -76)`, `(-64, -58)`, `(-80, 2)`, `(-12, -142)`).
  - **Mobile (`< 640px`)**: Compact vertical stack rising directly above the main orb (`(0, -68)`, `(0, -126)`, `(0, -184)`, `(0, -242)`).

## 3. Traveler Stories ("Our Latest Stories") 4-Phase Horizontal Clothesline Physics (`TravelerStoriesSection.tsx` & `.module.css`)
- **Layered Transform Architecture**:
  1. `.cardSlot` (Outer): Controls resting slot coordinate (`--slot-offset`) and catenary rope sag (`--slot-sag-y`).
  2. `.cardSlideCarriage` (Middle): Controls the initial horizontal right-to-left race along the rope, neighbor bump overshoot, and horizontal spring rebound (`clotheslineRaceHorizontal`).
  3. `.polaroidPendulum` (Inner): Controls rotational swing around the clothespin pinch point (`transform-origin: 50% -10px`, `pendulumRaceFromRight`), keeping `<WoodenClothespin />` attached to its Polaroid card at all times.
- **4-Phase Sequence**:
  - **Phase A (`0ms–920ms`)**: Braided clothesline reveals first and remains visibly empty for `920ms` while cards wait offscreen to the far right (`data-carriage-state="waiting-right"`).
  - **Phase B (`920ms` start, `135ms` stagger)**: Cards race horizontally from the far right (`+980px` desktop, `+560px` tablet, `+340px` mobile) from right to left along the rope (`data-carriage-state="racing-in"`).
  - **Phase C (`~1460ms` impact)**: Each arriving card overshoots slightly left (`-18px` to `-20px` desktop, `-11px` mobile), lightly bumping/approaching its neighbor and flexing the rope downward (`3.5px`), then rebounds horizontally (`+11px` → `-3px` → `0px`) without overlapping any photos or text.
  - **Phase D (`~2850ms` settled)**: Cards finish their diminishing rotational swing (`+11.5deg` drag → `-7.2deg` impact → `+3.8deg` rebound → `-1.2deg` sway → resting slot angle `[-2.8deg, +1.5deg, -1.5deg, +2.8deg]`). Subsequent manual `Next`/`Prev` clicks bring new cards in horizontally from the right without replaying the empty-line pause.

## 4. Consistent Icon Library & Trip Inquiry Form Refinements (`BrandIcons.tsx`, `TripInquiryDrawer.tsx`, `SiteFooter.tsx`)
- **Icon Library Upgrade**:
  - Replaced all hand-drawn inline form SVGs in `TripInquiryDrawer.tsx` and `FloatingSocialFab.tsx` with `lucide-react` components (`User`, `Phone`, `MapPin`, `Compass`, `Users`, `Calendar`, `FileText`, `ChevronDown`, `ArrowRight`, `ArrowUpRight`, `ShieldCheck`, `Mail`, `X`) using a uniform `18×18px` scale and `1.75` stroke weight.
  - Created `src/components/icons/BrandIcons.tsx` with canonical Simple Icons vector paths for `WhatsAppBrandIcon`, `InstagramBrandIcon`, and `FacebookBrandIcon`, shared across `FloatingSocialFab.tsx`, `SiteFooter.tsx`, and `TripInquiryDrawer.tsx`.
- **Trip Inquiry Form Visual Polish**:
  - Replaced heavy filled corner illustrations with clean, minimal `1.3px` line-art SVGs in muted warm-gold / sand-gold (`#C5A367` in Light Mode at `0.28` opacity, `#D4B475` in Dark Mode at `0.14` opacity) depicting the Giza pyramids, desert dune contours, slender date palm fronds, and a circular travel postmark stamp.
  - Refined icon-to-label vertical alignment (`mt-[3px]`), field-group spacing (`space-y-[18px]`), underline border contrast (`#D8CEBC` / `white/15`), and top warm-gold hairline accent.
