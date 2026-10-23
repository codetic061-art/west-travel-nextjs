# WEST GLOBAL TOURS — Canva Destination Video Integration, 3-Second Poster Sequence, Destination Discovery & About Us

## 1. Exact Canva Video & Poster Mapping

| Order | Destination | Canva Watch URL | Canva Design ID | Canva MP4 Export Job ID | Canva Poster Export Job ID | Local Video Path(s) | Local Poster Path(s) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Egypt** | `https://www.canva.com/design/DAHYpsUn6_I/8ov-RLJict6P46zGXQaD4w/watch` | `DAHYpsUn6_I` | `835021ab-18c7-4f16-bb3c-1376a3ae27d5` | `4702f5c2-e050-4396-98e6-f3c9a788d9a9` | `/videos/hero-egypt.mp4`, `/videos/west-travel/hero-egypt.mp4` | `/images/west-travel/hero-egypt-poster.jpg`, `/images/hero-egypt-poster.jpg` |
| **02** | **Türkiye** | `https://www.canva.com/design/DAHYp4Nj-j4/g75cfpa-a1htT74SABedzg/watch` | `DAHYp4Nj-j4` | `a7df0b94-f44e-4298-969a-d94e1690838f` | `6d5dfef2-6fd6-4579-be66-79a1ff019ace` | `/videos/hero-turkiye.mp4`, `/videos/west-travel/hero-turkiye.mp4` | `/images/west-travel/hero-turkiye-poster.jpg`, `/images/hero-turkiye-poster.jpg` |
| **03** | **Dubai** | `https://www.canva.com/design/DAHYpw4T34I/0DPZSRcjpzdJb8AtdNfOpA/watch` | `DAHYpw4T34I` | `7b02a25b-7ca1-4ce8-895f-a6f9383942e7` | `8580c904-6d40-4d53-bd46-68120abd3ee1` | `/videos/hero-dubai.mp4`, `/videos/west-travel/hero-dubai.mp4` | `/images/west-travel/hero-dubai-poster.jpg`, `/images/hero-dubai-poster.jpg` |

## 2. Shared 3-Second Poster-to-Video Sequence (`src/hooks/useDestinationVideoSequence.ts`)

Both the Homepage Hero (`src/components/hero/PanoramicBackground.tsx`) and the Destination Discovery Page (`src/components/destinations/DestinationDiscoveryExperience.tsx`) share `useDestinationVideoSequence`:

1. **Immediate Poster Display (`0ms`)**: Selecting **Egypt**, **Türkiye**, or **Dubai** immediately renders the corresponding poster (`hero-egypt-poster.jpg`, `hero-turkiye-poster.jpg`, or `hero-dubai-poster.jpg`) at `opacity-100`.
2. **Exact 3-Second Poster Hold (`POSTER_HOLD_DURATION_MS = 3000`)**: A `3000ms` timer holds the poster visible for 3 full seconds while a single `<video preload="metadata" muted playsInline loop>` mounts for the selected destination in the background.
3. **Playable Readiness Gate (`isVideoRevealed = isPosterHoldElapsed && isVideoPlayable`)**:
   - After 3 seconds, if the video has fired `onLoadedData`, `onCanPlay`, or `onPlaying` (`readyState >= 2`), playback starts from frame `0` and the video layer smoothly crossfades in (`duration-[880ms] ease-in-out`).
   - If the video is still buffering at the 3-second mark (`isWaitingForVideoAfterHold === true`), the poster remains `opacity-100` until the video reaches a playable state — preventing any blank or black frame.
4. **Reset on Destination Change**: Switching destinations clears the active timer, resets `posterHoldCompletedFor` and `videoPlayableFor`, increments `sequenceTick`, and restarts the 3-second poster -> video sequence for the newly selected destination.
5. **Performance & Accessibility Safeguards**:
   - Only the active destination's `<video>` is mounted (`key={`${activeConfig.id}-${sequenceTick}`}`), preventing all three videos from downloading on initial page load.
   - Respects `prefers-reduced-motion: reduce` and mobile `navigator.connection.saveData` / `2g` by keeping the static poster active without downloading video streams.
