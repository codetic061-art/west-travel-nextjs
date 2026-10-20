# Why West Travel — redesign handoff

## Scope and design

Replaces the existing Why section, not the Hero, Featured Trips, navbar, or global theme controls. The homepage already imports the component in the correct third position; its entry file is unchanged. The old combined raster collage is no longer used by this section and is preserved for other consumers, including About.

Warm ivory, navy Playfair serif, muted teal, mint benefit icon surfaces, fine separators and low-opacity sand ornaments replace the prior layered treatment. A single semantic DOM tree uses CSS grid areas: message → visual → benefits on mobile; visual + message with benefits below on tablet; benefits / visual / message at 1200px and above (26/40/34 starting proportions). The intermediate two-column layout avoids forcing three narrow columns at 1024px. No additional homepage sections or dependencies.

## Pending raster assets — not generated or uploaded

The GitHub-only implementation environment cannot generate, inspect visually, or upload raster photography. The photographic campaign composition is **not visually complete** until these two files are supplied:

| Repository path | Brief and delivery specification |
| --- | --- |
| `public/images/why-west-travel/traveler.webp` | Original/licensed premium editorial portrait: naturally smiling young adult male, sand/beige hat, light-blue shirt, olive/dark backpack, folded map; realistic anatomy, warm soft light. Transparent alpha cutout with no landmarks, text, badge, frame or baked shadow. Suggested 1000 × 1400px, tightly trimmed transparent margins, subject centered, hat and hands fully visible. Target under 250KB if quality allows. |
| `public/images/why-west-travel/landmarks.webp` | Separate subdued Giza + Dubai scene, pyramids/ancient architecture on left, palms, Burj Khalifa skyline on right, modest waterfront reflection. No person, text, globe or circular framing. Suggested 1600 × 1120px (10:7 wide canvas). Keep landmark details within roughly x=12–88%, y=25–70% to survive the organic feather. Keep the center quieter behind the traveler. Target under 300KB if quality allows. |

The component references their public URLs without the `public` prefix. Next Image uses lazy loading and responsive sizes. Fixed aspect ratios reserve space. Images remain transparent while loading and unmount on error; no broken-image glyph is intended. A single quiet atmospheric gradient remains when either/both files are unavailable. Missing assets still cause failed image/optimizer network requests; the fallback does not eliminate those HTTP errors. Reload after adding files. Do not reuse the merged legacy collage as the traveler layer: that would defeat independent composition.

After supplying images, confirm crop, alpha quality, alt descriptions, traveler size, and exact pin alignment at all breakpoints. Adjust each layer independently rather than increasing decoration or widening content over text.

## No-circle composition and SVGs

- The backdrop lives in its own absolute-positioned 10:7 box behind the independent traveler cutout. It uses `landmark-feather.svg` as a CSS alpha mask (standard and WebKit properties).
- The mask is an asymmetric landscape-shaped Bézier path softened with Gaussian blur. It is not an ellipse, circle, radial mask, border-radius frame or globe. Its intrinsic 800 × 560 viewBox matches the backdrop ratio.
- Traveler is unmasked, contained and bottom-aligned with separate sizing; it is never baked into the landmarks.
- `TravelArtwork.tsx` contains original inline Egyptian-inspired edge ornaments (eye motif, palm/reed outlines, geometric accents), one open dashed flight curve, a small tangent-aligned plane, and two consistent pins. Pins render only when landmarks load. Route stays above the traveler box. Edge ornaments hide below desktop; route and pins hide on small mobile screens.
- No clouds were added: they were unnecessary visual noise. Feature icons reuse the installed Lucide outline set.
- All decorative SVG elements are hidden from assistive tech. Content photographs have independent EN/TR/ES alt strings.

## Translations and business claims

Marketing strings were already present for EN/TR/ES in `HERO_DICTIONARY.whyWestTravel` and are reused unchanged, including eyebrow, heading, description, CTA and four benefits. Independent image descriptions are in the typed supplemental `src/i18n/why-west-travel-assets.ts` dictionary using the same locale context. No runtime translation or second locale/theme state.

Keep `src/config/why-west-travel.ts` verification flags and notes: all four benefits are currently pending business confirmation. Before production confirm global partner/network coverage, transfer availability/inclusion/security, actual 24/7 support staffing and coverage, flexible booking/rescheduling/cancellation policies, and fast confirmation expectations. The existing supporting copy's comparative safety wording (“safer”) also needs business/legal approval. No claims were strengthened by this redesign. Flags are editorial metadata, **not a publication gate**: visible copy must be approved or revised in all three locales before launch.

## Source review (not runtime validation)

Read back the committed TSX, CSS and homepage integration; checked component imports, locale-key reuse, one heading ID and one CTA, semantic benefit list, scoped theme variables, observer teardown, reduced-motion cancellation, reserved image dimensions and error handling. Corrected the backdrop from a height-dependent box to a fixed wide ratio to reduce landmark cropping. No unrelated existing file was edited. About retains its existing config/image behavior.

The client boundary is required for the existing locale/theme context, image error handling and IntersectionObserver/Web Animations enhancement. SSR content is visible by default: there is no permanently hidden content if animation APIs or JavaScript fail. Each element reveals once; no continuous movement. Reduced-motion users skip entrance animation and image/hover transitions. No lint, typecheck, tests, build, screenshots, or browser previews were run because no execution/browser tools are available.

## Required local verification before merge/production

- Run `npm run typecheck`, `npm run lint`, and `npm run build`. The existing lint script is `next lint` while dependencies specify Next 15 / ESLint 9; if unsupported, configure the repository's lint tooling separately rather than treating it as a redesign test pass.
- Preview both light/dark through the existing toggle, reload persisted theme, and check contrast/focus visually. No duplicated theme state was added.
- Switch EN/TR/ES, especially long Spanish and Turkish titles; check heading wraps, benefit widths and CTA fit at 320, 375, 600, 768, 1024, 1199, 1200, 1440 and 1920px, plus 200% browser zoom. Desktop heading is naturally balanced, not forced into an English-only line break.
- Test both images present, each missing separately, both missing, and slow loading. Confirm no layout shift, accessible alt text, no broken-image glyphs and acceptable fallback spacing. Verify mask rendering in Safari, Firefox and Chromium.
- Test scroll entrance once, back-scroll, reduced motion (including switching while animating), keyboard CTA focus, and real `/about` navigation.
- Recheck Hero destination/video interaction, Featured Trips five-card layout, carousel controls and responsive CTAs for regressions, plus the section boundary/spacing after Featured Trips.
- Capture local light/dark desktop/mobile screenshots after approved photos arrive; tune cutout scale and landmark pin positions against those actual assets.
