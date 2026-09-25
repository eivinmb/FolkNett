/**
 * Geometri for det oppdiktede boligfeltet Elvelia.
 * Brukes av både forsiden og prototypen av innsatsleders kart.
 * Én enhet i kartet tilsvarer 0,5 meter.
 */

export type Pt = [number, number];

export const METER_PER_UNIT = 0.5;

export const NODE: Pt = [900, 70];

export type Road = { name: string; pts: Pt[]; label: Pt; vertical?: boolean };

export const ROADS: Road[] = [
  { name: "Fjellvegen", pts: [[900, 36], [900, 156]], label: [900, 118], vertical: true },
  { name: "Bjørkeveien", pts: [[60, 156], [920, 156]], label: [760, 156] },
  { name: "Lyngveien", pts: [[60, 306], [840, 306]], label: [760, 306] },
  { name: "Elvestien", pts: [[96, 446], [626, 446]], label: [178, 446] },
  { name: "Skoleveien", pts: [[626, 156], [626, 446]], label: [626, 388], vertical: true },
  { name: "Solbakken", pts: [[266, 156], [266, 446]], label: [266, 234], vertical: true },
];

/** Fiberkablene følger gatene. Hver linje starter i enden som ligger nærmest noden. */
export const FIBERS: Pt[][] = [
  [[900, 70], [900, 156], [80, 156]],
  [[626, 156], [626, 446]],
  [[626, 306], [80, 306]],
  [[626, 306], [820, 306]],
  [[626, 446], [120, 446]],
  [[266, 156], [266, 446]],
];

export const STREAM_PATH = "M 0 590 C 150 574 300 608 470 598 S 760 566 1000 586";

export type House = { id: string; x: number; y: number };

export const HOUSE_W = 20;
export const HOUSE_H = 14;

const HOUSE_ROWS: { y: number; xs: number[] }[] = [
  { y: 128, xs: [110, 160, 210, 310, 360, 410, 460, 510, 560, 690, 740, 790, 840] },
  { y: 184, xs: [110, 160, 210, 310, 360, 410, 460, 510, 560, 690, 740, 790, 840] },
  { y: 278, xs: [110, 160, 210, 310, 360, 410, 460, 510, 560, 680, 730, 780] },
  { y: 334, xs: [110, 160, 210, 310, 360, 410, 460, 510, 560, 680, 730, 780] },
  { y: 418, xs: [150, 200, 310, 360, 410, 460, 510, 560] },
  { y: 474, xs: [150, 200, 310, 360, 410, 460, 510, 560] },
];

export const HOUSES: House[] = HOUSE_ROWS.flatMap((row, r) =>
  row.xs.map((x, i) => ({ id: `h${r}${i}`, x, y: row.y })),
);

export const CARE_HOME = { x: 660, y: 200, w: 80, h: 46 };

/* Skredet i tre faser. Alle formene har 21 punkter, slik at de kan gli over i hverandre. */
/* Skredet er en skål med et smalt utløp ned mot bekken. */
const BASE_WEST: Pt[] = [[398, 606], [376, 552], [340, 496], [318, 446]];
const BASE_EAST: Pt[] = [[512, 446], [494, 496], [466, 552], [448, 606]];

const TOP_A: Pt[] = [
  [322, 438], [330, 426], [340, 415], [355, 407], [370, 401], [390, 397], [410, 395],
  [430, 395], [450, 398], [472, 405], [488, 414], [500, 428], [507, 437],
];
const TOP_B: Pt[] = [
  [322, 400], [320, 375], [318, 350], [321, 328], [326, 306], [350, 272], [400, 256],
  [460, 252], [505, 262], [530, 285], [538, 306], [534, 350], [520, 400],
];
const TOP_C: Pt[] = [
  [312, 425], [298, 395], [300, 360], [322, 330], [326, 306], [350, 272], [400, 256],
  [460, 252], [505, 262], [530, 285], [538, 306], [534, 350], [520, 400],
];

export const SLIDE_A: Pt[] = [...BASE_WEST, ...TOP_A, ...BASE_EAST];
export const SLIDE_B: Pt[] = [...BASE_WEST, ...TOP_B, ...BASE_EAST];
export const SLIDE_C: Pt[] = [...BASE_WEST, ...TOP_C, ...BASE_EAST];

/** Lukket, myk kurve gjennom alle punktene (Catmull Rom omgjort til Bezier). */
export function smoothClosedPath(points: Pt[]): string {
  const n = points.length;
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return `${d} Z`;
}

export const SLIDE_PATHS = {
  A: smoothClosedPath(SLIDE_A),
  B: smoothClosedPath(SLIDE_B),
  C: smoothClosedPath(SLIDE_C),
};

/** Omrisset innsatsleder kan tegne bare ut fra bruddene og bekken. */
export const ESTIMATE: Pt[] = [[398, 606], [318, 446], [326, 306], [538, 306], [512, 446], [448, 606]];

/** Nordkanten er ukjent, fordi ingen kabel krysser der. */
export const NORTH_EDGE_PATH = "M 326 306 Q 432 196 538 306";

export type Break = {
  id: string;
  at: Pt;
  meters: number;
  time: string;
  street: string;
  stage: 1 | 2;
  ring: boolean;
};

export const BREAKS: Break[] = [
  { id: "b1", at: [512, 446], meters: 382, time: "03.53", street: "Elvestien", stage: 1, ring: false },
  { id: "b2", at: [318, 446], meters: 531, time: "03.53", street: "Elvestien", stage: 1, ring: true },
  { id: "b3", at: [538, 306], meters: 299, time: "03.55", street: "Lyngveien", stage: 2, ring: false },
  { id: "b4", at: [326, 306], meters: 465, time: "03.56", street: "Lyngveien", stage: 2, ring: true },
];

export type Segment = { id: string; from: Pt; to: Pt };

/** Hele fiberbiter rundt skredet som lytteinstrumentet kan bruke. */
export const LISTEN: Segment[] = [
  { id: "bjork", from: [200, 156], to: [610, 156] },
  { id: "solb", from: [266, 172], to: [266, 436] },
  { id: "skole", from: [626, 172], to: [626, 436] },
  { id: "lyngV", from: [274, 306], to: [318, 306] },
  { id: "lyngO", from: [546, 306], to: [616, 306] },
  { id: "elvV", from: [274, 446], to: [310, 446] },
  { id: "elvO", from: [520, 446], to: [616, 446] },
];

export function segmentLength(seg: Segment): number {
  return Math.hypot(seg.to[0] - seg.from[0], seg.to[1] - seg.from[1]);
}

export function dotsAlong(seg: Segment, spacing = 9): Pt[] {
  const n = Math.max(1, Math.floor(segmentLength(seg) / spacing));
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push([
      seg.from[0] + (seg.to[0] - seg.from[0]) * t,
      seg.from[1] + (seg.to[1] - seg.from[1]) * t,
    ]);
  }
  return pts;
}

export const LISTEN_METERS =
  Math.round((LISTEN.reduce((sum, seg) => sum + segmentLength(seg), 0) * METER_PER_UNIT) / 10) * 10;

export const EVAC_ZONE: Pt[] = [
  [190, 612], [182, 420], [190, 104], [640, 104], [790, 172], [800, 262], [716, 384], [664, 472], [642, 612],
];

export const CLOSED_ZONE: Pt[] = [
  [228, 612], [222, 420], [240, 232], [330, 212], [566, 212], [612, 290], [600, 450], [582, 612],
];

export function toPoints(pts: Pt[]): string {
  return pts.map(([x, y]) => `${x},${y}`).join(" ");
}

export function polyPath(pts: Pt[]): string {
  return `M ${pts.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`;
}

export function pointInPolygon([x, y]: Pt, poly: Pt[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const crosses = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}
