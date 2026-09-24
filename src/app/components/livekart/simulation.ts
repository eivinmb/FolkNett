// Simulering av tillitskartet: hvert målepunkt sammenligner GPS-tid med fibertid.
// Alle tall er simulerte og kun ment for å demonstrere prinsippet.

import { STATIONS, type StationDef } from "./stations";

export type Status = "green" | "yellow" | "red";

export type Scenario = "normal" | "jamming" | "spoofing" | "storm1" | "storm2" | "storm3";

// Grenser for avvik mellom GPS-tid og fibertid.
// 100 ns ≈ kravet til en primær tidskilde i telenett.
// 1 µs ligger godt innenfor det 5G-master tåler (±1,5 µs) – over dette må systemene over på fibertid.
export const GREEN_LIMIT_NS = 100;
export const RED_LIMIT_NS = 1000;
export const WEAK_SIGNAL_CN0 = 35; // dB-Hz
export const STABLE_TICKS = 8; // antall stabile minutter før det er trygt å bytte tilbake til GPS
const HISTORY_LEN = 40;

export type Measurement = {
  offset: number | null; // GPS-tid minus fibertid i nanosekunder, null = ingen GPS-signal
  cn0: number; // signalstyrke (dB-Hz)
  cause: string;
};

export type StationState = Measurement & {
  raw: Status;
  status: Status;
  greenStreak: number;
  nonRedStreak: number;
  history: (number | null)[];
};

export type SimEvent = {
  id: number;
  minute: number;
  status: Status;
  text: string;
};

// ---------- tilfeldige tall (deterministiske, slik at demoen oppfører seg likt hver gang) ----------
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rng: () => number) {
  const u = Math.max(rng(), 1e-9);
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Fast tall mellom 0 og 1 per målepunkt (gir hvert punkt sin egen «personlighet»)
function stationHash(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
// 0 i Sør-Norge, 1 i Finnmark – forstyrrelser fra solstormer er sterkest langt nord
const northness = (lat: number) => clamp((lat - 60) / 10, 0, 1);

const SPOOF_TARGETS = new Set(["hammerfest", "honningsvag", "alta"]);

function normal(rng: () => number): Measurement {
  return { offset: gauss(rng) * 18, cn0: 44 + gauss(rng) * 1.5, cause: "GPS-tida stemmer med fiberklokka" };
}

function lost(rng: () => number, cause: string): Measurement {
  return { offset: null, cn0: 10 + rng() * 8, cause };
}

export function measure(def: StationDef, scenario: Scenario, t: number, rng: () => number): Measurement {
  const s = stationHash(def.id);
  const n = northness(def.lat);

  switch (scenario) {
    case "normal":
      return normal(rng);

    case "jamming": {
      if (def.lat >= 69.3 && def.lon >= 28.5) return lost(rng, "Jamming: GPS-signalet er borte");
      if (def.lat >= 69.3 && def.lon >= 21) {
        if (rng() < 0.3) return lost(rng, "Jamming i nærheten: signalet faller ut");
        return { offset: gauss(rng) * 70, cn0: 31 + gauss(rng) * 2, cause: "Svakt GPS-signal (jamming i nærheten)" };
      }
      return normal(rng);
    }

    case "spoofing": {
      if (!SPOOF_TARGETS.has(def.id)) return normal(rng);
      const drift = Math.min(55 * (t + 1) * (0.8 + 0.4 * s), 20000);
      return {
        offset: drift + gauss(rng) * 15,
        cn0: 47 + gauss(rng), // et falskt signal er ofte sterkere enn det ekte
        cause: "Falskt signal: GPS-tida glir bort fra fiberklokka",
      };
    }

    case "storm1": {
      const ramp = Math.min(1, (t + 1) / 6);
      const e = ramp * (0.12 + 0.88 * n);
      if (rng() < e * 0.3) return lost(rng, "Solstorm: mottakeren mister satellittene");
      const bias = e * 520 * (0.35 + 0.65 * s) * (0.75 + 0.25 * Math.sin(t / 2 + s * 6));
      return {
        offset: bias + gauss(rng) * (18 + e * 220),
        cn0: 44 - e * 12 + gauss(rng) * 2,
        cause: "Solstorm: forstyrret ionosfære gir feil tid",
      };
    }

    case "storm2":
      return lost(rng, "Solstorm: ingen satellitter å stole på");

    case "storm3": {
      const tRec = 1 + (def.lat - 58) * 1.4 + s * 2; // sør kommer tilbake først
      if (t < tRec) return lost(rng, "Venter på at satellittene kommer tilbake");
      const e = (0.15 + 0.6 * n) * Math.exp(-(t - tRec) / 4);
      if (rng() < e * 0.25) return lost(rng, "Signalet er tilbake, men faller fortsatt ut");
      return {
        offset: gauss(rng) * (18 + e * 250) + e * 300 * s,
        cn0: 44 - e * 10 + gauss(rng) * 1.5,
        cause: "Signalet er tilbake – følges tett",
      };
    }
  }
}

export function classify(m: Measurement): Status {
  if (m.offset === null || Math.abs(m.offset) >= RED_LIMIT_NS) return "red";
  if (Math.abs(m.offset) >= GREEN_LIMIT_NS || m.cn0 < WEAK_SIGNAL_CN0) return "yellow";
  return "green";
}

export function initialStates(): Record<string, StationState> {
  const rng = mulberry32(7);
  const out: Record<string, StationState> = {};
  for (const def of STATIONS) {
    const m = normal(rng);
    out[def.id] = {
      ...m,
      raw: "green",
      status: "green",
      greenStreak: STABLE_TICKS,
      nonRedStreak: STABLE_TICKS,
      history: [Math.abs(m.offset ?? 0)],
    };
  }
  return out;
}

// Ett tidssteg (ett simulert minutt) for ett målepunkt.
// Blir det verre, slår kartet ut med en gang. Blir det bedre, kreves en prøvetid før posten blir grønn igjen.
export function step(prev: StationState, m: Measurement): StationState {
  const raw = classify(m);
  const greenStreak = raw === "green" ? prev.greenStreak + 1 : 0;
  const nonRedStreak = raw !== "red" ? prev.nonRedStreak + 1 : 0;

  let status: Status;
  let cause = m.cause;
  if (raw === "red") status = "red";
  else if (prev.status === "red" && nonRedStreak < 3) {
    status = "red";
    cause = "Signalet er tilbake, men for kort tid til å stole på";
  } else if (raw === "yellow") status = "yellow";
  else if (prev.status === "green" || greenStreak >= STABLE_TICKS) status = "green";
  else {
    status = "yellow";
    cause = `Prøvetid: ${greenStreak} av ${STABLE_TICKS} minutter stabilt`;
  }

  const history = [...prev.history, m.offset === null ? null : Math.abs(m.offset)].slice(-HISTORY_LEN);
  return { ...m, cause, raw, status, greenStreak, nonRedStreak, history };
}
