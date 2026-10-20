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
      {(["palmTop", "palmBottom"] as const).map((position) => (
        <svg key={position} className={`${styles.palm} ${styles[position]}`} viewBox="0 0 260 240" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M0 12Q116 63 243 220L240 222Q117 75 0 16Z" />
          <path d="M20 25Q67 2 137 9Q83 20 36 34ZM40 38Q99 16 169 32Q105 34 52 47ZM65 54Q128 37 201 66Q132 54 77 65ZM89 73Q155 63 224 106Q155 82 101 85ZM115 96Q181 98 242 148Q180 117 127 109ZM143 124Q205 135 258 193Q199 152 155 138ZM170 156Q219 174 260 230Q211 191 180 169Z" />
          <path d="M22 27Q14 76 46 124Q34 74 35 35ZM47 44Q44 104 87 158Q65 106 60 53ZM73 63Q77 132 126 187Q97 127 86 73ZM101 85Q111 157 166 212Q132 148 114 98ZM132 113Q146 181 208 237Q169 174 145 127ZM163 147Q188 208 245 239Q208 195 176 160Z" />
        </svg>
      ))}
      <svg className={styles.dunes} viewBox="0 0 1600 240" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 135C130 42 229 244 405 208S657 73 850 145S1103 7 1250 54S1465 78 1600 0V240H0Z" fill="currentColor" opacity=".55" />
        <path d="M0 188C212 93 320 267 532 208S809 138 1015 199S1369 78 1600 110V240H0Z" fill="currentColor" opacity=".35" />
      </svg>
    </>
  );
}

/** One cubic route; the plane follows its exact position and derivative at t=.72. */
export function FlightRoute() {
  const t = 0.72;
  const u = 1 - t;
  const x = u ** 3 * 35 + 3 * u ** 2 * t * 137 + 3 * u * t ** 2 * 456 + t ** 3 * 565;
  const y = u ** 3 * 153 + 3 * u ** 2 * t * 5 + 3 * u * t ** 2 * 3 + t ** 3 * 153;
  const dx = 3 * u ** 2 * (137 - 35) + 6 * u * t * (456 - 137) + 3 * t ** 2 * (565 - 456);
  const dy = 3 * u ** 2 * (5 - 153) + 6 * u * t * (3 - 5) + 3 * t ** 2 * (153 - 3);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  return (
    <svg className={styles.route} viewBox="0 0 600 600" fill="none" aria-hidden="true" focusable="false">
      <path d="M35 153C137 5 456 3 565 153" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.6" strokeDasharray="1 7" strokeLinecap="round" />
      <path transform={`translate(${x} ${y}) rotate(${angle}) scale(.36)`} d="M24 0L2-5L-10-22L-16-22L-10-4L-23-5L-29-12L-33-11L-28 0L-33 11L-29 12L-23 5L-10 4L-16 22L-10 22L2 5Z" fill="currentColor" opacity=".85" />
      {([{ x: 95, y: 300, gold: true }, { x: 510, y: 240, gold: false }] as const).map(({ x: pinX, y: pinY, gold }) => (
        <g key={pinX} transform={`translate(${pinX} ${pinY})`} className={gold ? styles.pinGold : styles.pinTeal}>
          <path d="M0 0S-8-10-8-16a8 8 0 0 1 16 0C8-10 0 0 0 0Z" fill="currentColor" />
          <circle cy="-16" r="3" fill="var(--surface)" />
        </g>
      ))}
      <g className={styles.clouds} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity=".32">
        <path d="M28 104H65C76 104 76 90 66 89C66 74 44 71 40 87C27 82 18 100 28 104Z" />
        <path d="M498 165H539C550 165 550 151 540 150C540 134 518 132 514 147C501 142 489 160 498 165Z" />
      </g>
    </svg>
  );
}
