# Our Latest Stories — Traveler Reviews Section Handoff

## 1. Scope & Homepage Integration

Implements Section 4 (**"Our Latest Stories"** / `#traveler-stories`) directly below `WhyWestTravelSection` in `src/app/page.tsx` while leaving `HeroSection`, `FeaturedTripsSection`, `WhyWestTravelSection`, `FloatingNavbar`, and `globals.css` untouched:

1. `HeroSection`
2. `FeaturedTripsSection`
3. `WhyWestTravelSection`
4. `TravelerStoriesSection`

Global Light Mode / Dark Mode and `en` / `tr` / `es` locale switching are consumed directly from `useHero()`.

## 2. Polaroid Card Dimensions & Proportions

To avoid tall 2:3 portrait cards, each Polaroid card uses a compact, near-square physical print proportion verified in headless Chromium:

| Viewport Tier | Visible Cards | Rendered Card Width | Rendered Card Height | Card Aspect Ratio (`W:H`) | Landscape Photo Area | Review Body Height |
| --- | --- | --- | --- | --- | --- | --- |
| Desktop (`1440px`) | 4 cards | `302–309px` | `327–334px` | `0.924:1 – 0.927:1` | `1.42:1` (`~60.5%` card height) | `111–117px` |
| Tablet (`820px`) | 2 cards | `296px` | `321px` | `0.922:1` | `1.42:1` (`~60.3%` card height) | `108px` |
| Mobile (`390px`) | 1 card | `292px` | `317px` | `0.921:1` | `1.42:1` (`~60.2%` card height) | `106px` |

- **Paper frame padding**: `11px` top/left/right and `13px` bottom around the landscape photograph.
- **Resting suspension angles**: `[-2.8deg, +1.5deg, -1.5deg, +2.8deg]` across the 4 desktop slots around `transform-origin: 50% -8px` (the clothespin pinch point).
- **Catenary rope sag alignment**: `[0px, 14px, 14px, 0px]` across the 4 desktop slots so the inner two Polaroids hang lower in the center sag of the clothesline rope and every wooden clothespin visibly overlaps both the rope and the top center edge of its card.

## 3. Physical Clothesline, Clothespins & Travel Micrographics

All decorative and physical elements are authored in `src/components/traveler-stories/StoriesArtwork.tsx`:

- **`ClotheslineRope`**: Full-bleed quadratic Bézier catenary curve (`viewBox="0 0 1600 84"`) combining a soft drop shadow, primary braided hemp base stroke, upper sunlit fiber highlight, and diagonal twisted-strand dash overlay. Flexes `2px` downward during carousel transitions.
- **`WoodenClothespin`**: Natural oak/birch SVG peg with warm wood-grain gradients, left bevel highlight, split clamping jaws, and metallic spring coil band positioned at `top: -23px; left: 50%`.
- **`UpperTravelMicrographics`**:
  - Upper-left curved dotted route (`--route-gold`) with a flat 2D line-art travel camera tilted `-9deg` and path anchor dot.
  - Upper-right curved dotted route leading to a banking airplane silhouette (`--micro-navy`).
  - Positioned outside the center heading column (`x < 462` and `x > 1138`) so neither route overlaps the eyebrow, heading, or supporting copy; hidden on small mobile screens (`< 640px`).
- **`LowerLeftGizaArtwork` & `LowerRightPostmark`**:
  - Lower-left editorial line-art & dual-tone silhouette illustration of the three Giza Pyramids, twin foreground date palms, distant oasis palms, and desert horizon ripples.
  - Lower-right low-opacity circular travel postmark stamp (`>= 1024px`).

## 4. One-by-One Carousel Motion & Settling Swing

- **Virtualized ring-buffer window**: Renders `slotOffset = -1` (left offscreen buffer) through `slotOffset = visibleCount` (right offscreen buffer) keyed by monotonic `rope-item-${absoluteStepKey}`.
- **Layered transforms**:
  - Outer `.cardSlot` translates horizontally (`calc(var(--slot-offset) * (100% + var(--card-gap)))`) and vertically (`var(--slot-sag-y)`) over `560ms cubic-bezier(0.22, 1, 0.36, 1)`.
  - Inner `.polaroidPendulum` maintains the card's resting tilt (`rotate(var(--card-angle))`) and triggers a damped rotational settling swing (`pendulumEnterNext` / `pendulumEnterPrev`, `±6.2deg → ∓2.1deg → ±0.75deg → 0deg` over `680ms`) for the incoming card and a subtle inertia sway (`±2.1deg`) for shifting cards.
- **Reduced motion**: When `prefers-reduced-motion: reduce` is active, card rotation, pendulum swing, and rope flex are disabled while Previous, Next, pagination dots, keyboard arrows, and touch swipe remain fully functional.

## 5. Review-Data Integrity

- `src/config/traveler-stories.ts` defines `TravelerStoryRecord` with `isSampleData: boolean` and `verificationStatus: "verified_customer_review" | "sample_development_preview"`.
- Temporary development entries in `SAMPLE_TRAVELER_STORIES` are explicitly flagged with `isSampleData: true` and `verificationStatus: "sample_development_preview"`, and exposed in the DOM via `data-review-dataset="sample_development_preview"` and `data-sample-review="true"`.
- Supplying verified backend records via `<TravelerStoriesSection stories={verifiedRecords} />` replaces the sample dataset without modifying component markup or styles.
