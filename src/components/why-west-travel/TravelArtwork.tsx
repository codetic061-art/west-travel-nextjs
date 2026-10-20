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

/**
 * Shared coordinate space of the `.visual` box (fixed 1 : 1.25 ratio). The landmark layer uses a fixed
 * inset and cover crop inside that box, so these anchors stay on the Giza pyramid apex and the Burj
 * Khalifa spire at every breakpoint without measuring the DOM.
 */
const VIEW_W = 620;
const VIEW_H = 775;
const ROUTE = [
  [64, 336],
  [40, 0],
  [470, -95],
  [549, 252],
] as const;
const PLANE_T = 0.7;
const PINS = [
  { id: "giza", x: 64, y: 372, tone: "gold" },
  { id: "dubai", x: 549, y: 288, tone: "teal" },
] as const;

function bezierPoint(t: number) {
  const u = 1 - t;
  const [p0, p1, p2, p3] = ROUTE;
  const at = (i: 0 | 1) => u ** 3 * p0[i] + 3 * u ** 2 * t * p1[i] + 3 * u * t ** 2 * p2[i] + t ** 3 * p3[i];
  const slope = (i: 0 | 1) =>
    3 * u ** 2 * (p1[i] - p0[i]) + 6 * u * t * (p2[i] - p1[i]) + 3 * t ** 2 * (p3[i] - p2[i]);
  return { x: at(0), y: at(1), angle: (Math.atan2(slope(1), slope(0)) * 180) / Math.PI };
}

const ROUTE_D = `M${ROUTE[0].join(" ")}C${ROUTE.slice(1).map((p) => p.join(" ")).join(" ")}`;
const PLANE = bezierPoint(PLANE_T);
const PLANE_D =
  "M13 0C13-1.3 11.9-2 10.6-2H4.2L-3.4-12.2H-6.6L-2.6-2H-8.8L-11.4-5.4H-13.6L-12.2 0L-13.6 5.4H-11.4L-8.8 2H-2.6L-6.6 12.2H-3.4L4.2 2H10.6C11.9 2 13 1.3 13 0Z";
const PIN_D = "M0 0C-1.6-4.6-9-10.2-9-16.6a9 9 0 0 1 18 0C9-10.2 1.6-4.6 0 0Z";
const CLOUD_D = "M-22 6H22a7 7 0 0 0 0-14a11 11 0 0 0-20.5-3.5A8 8 0 0 0-14-4a5 5 0 0 0-8 10Z";

/** Flat travel micrographics: one dotted Giza → Dubai route, a tangent-aligned plane, two map pins and two outline clouds. */
export function TravelMicrographics({ showPins }: { showPins: boolean }) {
  return (
    <svg
      className={styles.micro}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-why-micrographics=""
    >
      <g className={styles.clouds}>
        <path d={CLOUD_D} transform="translate(150 215)" />
        <path d={CLOUD_D} transform="translate(592 165) scale(.78)" />
      </g>
      <path className={styles.routePath} d={ROUTE_D} />
      <path
        className={styles.plane}
        d={PLANE_D}
        transform={`translate(${PLANE.x.toFixed(1)} ${PLANE.y.toFixed(1)}) rotate(${PLANE.angle.toFixed(1)})`}
      />
      {showPins &&
        PINS.map((pin) => (
          <g
            key={pin.id}
            transform={`translate(${pin.x} ${pin.y})`}
            className={pin.tone === "gold" ? styles.pinGold : styles.pinTeal}
            data-why-pin={pin.id}
          >
            <ellipse className={styles.pinPulse} cx="0" cy="1.5" rx="8" ry="2.6" />
            <path d={PIN_D} />
            <circle cy="-16.6" r="3.4" className={styles.pinCore} />
          </g>
        ))}
    </svg>
  );
}

/** Quiet balance for the empty space above the message column on wide screens. */
export function MessageAccent() {
  return (
    <svg className={styles.messageAccent} viewBox="0 0 132 52" fill="none" aria-hidden="true" focusable="false">
      <g className={styles.clouds}>
        <path d={CLOUD_D} transform="translate(32 30)" />
        <path d={CLOUD_D} transform="translate(104 20) scale(.62)" />
      </g>
    </svg>
  );
}
