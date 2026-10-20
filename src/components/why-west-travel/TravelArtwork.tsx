import styles from "./WhyWestTravelSection.module.css";

/** Original decorative line art; intentionally not a translation of hieroglyphs. */
export function EgyptianEdges() {
  return (
    <>
      {(["left", "right"] as const).map((side) => (
        <svg key={side} className={`${styles.edge} ${styles[side]}`} viewBox="0 0 64 560" fill="none" aria-hidden="true" focusable="false">
          <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 20V540M56 20V540M22 24H42M22 536H42" />
            <path d="M20 82Q32 68 44 82Q32 94 20 82ZM18 73Q31 63 46 73M32 87V103L24 111M25 87L19 99Q16 105 23 105" />
            <circle cx="32" cy="81" r="3" />
            <path d="M19 156L32 143L45 156L32 169ZM25 190H39" />
            <path d="M32 274V222M32 231Q20 216 16 231Q23 231 32 242M32 231Q44 216 48 231Q41 231 32 242M32 248Q20 233 16 248Q23 248 32 259M32 248Q44 233 48 248Q41 248 32 259M23 279H41" />
            <path d="M19 344L32 319L45 344ZM32 319L37 344M22 358H42" />
            <path d="M32 424C15 409 24 395 32 405C40 395 49 409 32 424ZM32 424V449M22 432H42" />
            <path d="M20 493H44M24 484L32 472L40 484M24 505L32 517L40 505" />
          </g>
        </svg>
      ))}
    </>
  );
}

/** One open route, with its airplane pointing along the final tangent. */
export function FlightRoute() {
  return (
    <svg className={styles.route} viewBox="0 0 480 100" fill="none" aria-hidden="true" focusable="false">
      <path d="M38 81C96 10 256 5 417 50" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 7" strokeLinecap="round" />
      <path transform="translate(424 52) rotate(16)" d="M17 0L-2-5L-9-17L-14-17L-9-4L-20-5L-25-10L-28-9L-24 0L-28 9L-25 10L-20 5L-9 4L-14 17L-9 17L-2 5Z" fill="currentColor" />
    </svg>
  );
}

export function LandmarkPins() {
  return (
    <>
      {(["gizaPin", "dubaiPin"] as const).map((position) => (
        <svg key={position} className={`${styles.pin} ${styles[position]}`} viewBox="0 0 24 32" fill="none" aria-hidden="true" focusable="false">
          <path d="M12 30S2 19 2 12a10 10 0 0 1 20 0c0 7-10 18-10 18Z" fill="currentColor" />
          <circle cx="12" cy="12" r="3.5" className={styles.pinCenter} />
        </svg>
      ))}
    </>
  );
}
