"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import {
  BREAKS,
  CLOSED_ZONE,
  ESTIMATE,
  EVAC_ZONE,
  HOUSES,
  LISTEN_METERS,
  NORTH_EDGE_PATH,
  SLIDE_C,
  SLIDE_PATHS,
  pointInPolygon,
  polyPath,
  type Break,
  type House,
  type Pt,
} from "./elvelia";
import {
  BreakMarker,
  DOT_COLORS,
  Fibers,
  ListenDots,
  MapBase,
  NodeBox,
  SlideBody,
  SlideDefs,
  type DotStatus,
  type HouseState,
} from "./ElveliaParts";
import { usePrintMode } from "./usePrintMode";

const HOUSES_IN_ESTIMATE = HOUSES.filter((h) => pointInPolygon([h.x, h.y], ESTIMATE)).length;

type Step = { time: string; title: string; text: string; log: string[] };

const STEPS: Step[] = [
  {
    time: "03.51",
    title: "Natt i Elvelia",
    text: "Folk sover. Fibernettet går fra noden ut i alle gatene og frakter internett som vanlig.",
    log: ["03.51 Alle kabler er normale."],
  },
  {
    time: "03.53",
    title: "Skredet går",
    text: "Kabelen i Elvestien ryker to steder. Det andre bruddet finnes ved å måle fra den andre enden av ringen.",
    log: ["03.53 Brudd i Elvestien, 382 m fra noden.", "03.53 Brudd i Elvestien, 531 m målt rundt ringen."],
  },
  {
    time: "03.56",
    title: "Skredet vokser",
    text: "Nye brudd i Lyngveien viser at skredet spiser seg bakover mot nord.",
    log: ["03.55 Brudd i Lyngveien, 299 m fra noden.", "03.56 Brudd i Lyngveien, 465 m målt rundt ringen."],
  },
  {
    time: "04.02",
    title: "Første omriss",
    text: `${HOUSES_IN_ESTIMATE} hus ligger innenfor omrisset. Nordkanten er ukjent fordi ingen kabel krysser der. Kartet går til innsatsleder, AMK og helikopteret.`,
    log: ["04.02 Omriss og evakueringssone sendt ut."],
  },
  {
    time: "06.30",
    title: "Fiberen lytter",
    text: `${LISTEN_METERS} meter fiber rundt skredet lytter nå. Gult betyr at bevegelsen øker nær kanten.`,
    log: ["06.30 Lytting aktiv rundt skredkanten."],
  },
  {
    time: "07.14",
    title: "Varsel: grunnen beveger seg",
    text: "Fiberen langs Solbakken måler økende bevegelse. Mannskapene trekker seg tilbake, og et minutt senere raser kanten ut der de sto.",
    log: ["07.14 VARSEL på sambandet: trekk tilbake fra Solbakken.", "07.15 Nytt ras ved Solbakken. Ingen skadet."],
  },
  {
    time: "Døgn 2",
    title: "Rolig grunn",
    text: "Tolv timer uten bevegelse. Sammen med NVEs vurdering gir det grunnlag for å søke fra bakken, med lyttingen som vakt.",
    log: ["Døgn 2: Søk fra bakken starter."],
  },
  {
    time: "Uke 3",
    title: "Hjem igjen",
    text: "Der målingene lenge har vært rolige, friskmeldes sonene, og beboerne kan flytte hjem.",
    log: ["Uke 3: Sonene i nord og øst er friskmeldt."],
  },
];

const ALARM_STEP = 5;
const LAST_STEP = STEPS.length - 1;

const BREAK_LABEL_OFFSET: Record<string, Pt> = {
  b1: [16, 24],
  b2: [-128, 24],
  b3: [16, -16],
  b4: [-128, -16],
};

function slidePath(step: number): string {
  if (step <= 1) return SLIDE_PATHS.A;
  if (step < ALARM_STEP) return SLIDE_PATHS.B;
  return SLIDE_PATHS.C;
}

function houseState(step: number, house: House): HouseState {
  if (step === 0) return "sleep";
  if (step < LAST_STEP) return "dark";
  const p: Pt = [house.x, house.y];
  if (pointInPolygon(p, CLOSED_ZONE) || pointInPolygon(p, SLIDE_C)) return "dark";
  return "lit";
}

function listenStatus(step: number, segmentId: string, p: Pt): DotStatus | null {
  if (step < 4) return null;
  if (step === ALARM_STEP && segmentId === "solb") return p[1] > 300 && p[1] < 430 ? "alarm" : "watch";
  if (step <= ALARM_STEP && ["lyngV", "lyngO", "elvV", "elvO"].includes(segmentId)) return "watch";
  return "ok";
}

function BreakLabel({ b }: { b: Break }) {
  const [dx, dy] = BREAK_LABEL_OFFSET[b.id];
  const x = b.at[0] + dx;
  const y = b.at[1] + dy;
  return (
    <g>
      <rect x={x} y={y - 14} width={112} height={20} rx={6} fill="#1f0a12" stroke="#fb7185" strokeOpacity={0.6} />
      <text x={x + 56} y={y} textAnchor="middle" fill="#ffe4e6" fontSize={11} fontWeight={600}>
        {b.meters} m · {b.time}
      </text>
    </g>
  );
}

function Team({ label, at, color = "#f97316", delay = 0 }: { label: string; at: Pt; color?: string; delay?: number }) {
  return (
    <motion.g
      initial={false}
      animate={{ x: at[0], y: at[1] }}
      transition={{ duration: 1.2, delay, ease: "easeInOut" }}
    >
      <circle r={9} fill={color} stroke="#fff" strokeWidth={2} />
      <text y={-14} textAnchor="middle" fill="#fff7ed" fontSize={10} fontWeight={700}>
        {label}
      </text>
    </motion.g>
  );
}

const LEGEND = [
  { label: "Fiber", swatch: <span className="h-0.5 w-6 bg-cyan-300" /> },
  { label: "Brudd", swatch: <span className="h-3 w-3 rounded-full border-2 border-rose-400 bg-rose-950" /> },
  { label: "Anslått omriss", swatch: <span className="h-0.5 w-6 bg-amber-400" /> },
  { label: "Lytter: rolig", swatch: <span className="h-2.5 w-2.5 rounded-full" style={{ background: DOT_COLORS.ok }} /> },
  { label: "Lytter: økende", swatch: <span className="h-2.5 w-2.5 rounded-full" style={{ background: DOT_COLORS.watch }} /> },
  { label: "Lytter: varsel", swatch: <span className="h-2.5 w-2.5 rounded-full" style={{ background: DOT_COLORS.alarm }} /> },
  { label: "Evakuert sone", swatch: <span className="h-3 w-5 rounded border border-dashed border-rose-400 bg-rose-500/10" /> },
  { label: "Mannskaper", swatch: <span className="h-3 w-3 rounded-full bg-orange-500 ring-2 ring-white" /> },
];

export default function CommandMap() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-25% 0px" });

  // I utskriftsversjonen vises steget der fiberen lytter rundt hele skredet, uten animasjon.
  const printMode = usePrintMode();
  const reduce = reduceMotion || printMode;
  useEffect(() => {
    if (printMode) setStep(4);
  }, [printMode]);

  useEffect(() => {
    if (inView && !reduce) setPlaying(true);
  }, [inView, reduce]);

  useEffect(() => {
    if (!playing) return;
    if (step >= LAST_STEP) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setStep((s) => Math.min(s + 1, LAST_STEP)), step === ALARM_STEP ? 6500 : 5000);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  const current = STEPS[step];
  const logs = STEPS.slice(0, step + 1)
    .flatMap((s, index) => s.log.map((line) => ({ line, now: index === step })))
    .reverse();

  const metrics = [
    { label: "Brudd funnet", value: step >= 2 ? "4" : step >= 1 ? "2" : "0" },
    { label: "Hus i anslått omriss", value: step >= 3 ? String(HOUSES_IN_ESTIMATE) : "ukjent" },
    { label: "Fiber som lytter", value: step >= 4 ? `${LISTEN_METERS} m` : "0 m" },
    { label: "Varsler til mannskapene", value: step >= ALARM_STEP ? "1" : "0" },
  ];

  const goTo = (next: number) => {
    setPlaying(false);
    setStep(Math.max(0, Math.min(LAST_STEP, next)));
  };

  const togglePlay = () => {
    if (step === LAST_STEP) setStep(0);
    setPlaying((p) => !p);
  };

  return (
    <div ref={containerRef}>
      <div className="grid items-start gap-6 lg:grid-cols-[1.75fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <svg
            viewBox="0 0 1000 620"
            className="h-auto w-full"
            role="img"
            aria-label={`Kart over boligfeltet Elvelia. ${current.time}: ${current.title}.`}
          >
            <SlideDefs prefix="map" />
            <defs>
              <pattern id="map-grid" width={40} height={40} patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth={1} />
              </pattern>
            </defs>
            <rect width={1000} height={620} fill="#020617" />
            <rect width={1000} height={620} fill="url(#map-grid)" />

            {/* Soner */}
            <AnimatePresence>
              {step >= 3 && step < LAST_STEP && (
                <motion.g key="evac" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <path
                    d={polyPath(EVAC_ZONE)}
                    fill="#f43f5e"
                    fillOpacity={0.07}
                    stroke="#fb7185"
                    strokeWidth={1.5}
                    strokeDasharray="6 6"
                  />
                  <text x={196} y={96} fill="#fda4af" fontSize={11} fontWeight={600}>
                    EVAKUERT SONE
                  </text>
                </motion.g>
              )}
              {step === LAST_STEP && (
                <motion.g key="zones" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <path
                    d={polyPath(EVAC_ZONE)}
                    fill="#10b981"
                    fillOpacity={0.1}
                    stroke="#34d399"
                    strokeWidth={1.5}
                    strokeDasharray="6 6"
                  />
                  <path
                    d={polyPath(CLOSED_ZONE)}
                    fill="#f43f5e"
                    fillOpacity={0.1}
                    stroke="#fb7185"
                    strokeWidth={1.5}
                    strokeDasharray="6 6"
                  />
                  <text x={196} y={96} fill="#6ee7b7" fontSize={11} fontWeight={600}>
                    FRISKMELDT
                  </text>
                  <text x={448} y={234} textAnchor="middle" fill="#fda4af" fontSize={11} fontWeight={600}>
                    FORTSATT STENGT
                  </text>
                </motion.g>
              )}
            </AnimatePresence>

            <MapBase houseState={(h) => houseState(step, h)} />
            <Fibers />

            <SlideBody
              prefix="map"
              d={SLIDE_PATHS.A}
              initial={{ opacity: 0 }}
              animate={{ d: slidePath(step), opacity: step >= 1 ? 1 : 0 }}
              transition={{
                d: {
                  duration: reduce ? 0 : 1.4,
                  delay: step === ALARM_STEP && !reduce ? 2.4 : 0,
                  ease: "easeInOut",
                },
                opacity: { duration: reduce ? 0 : 0.8 },
              }}
            />

            {/* Anslått omriss fra bruddene */}
            <AnimatePresence>
              {step >= 3 && step < LAST_STEP && (
                <motion.g key="estimate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.path
                    d={polyPath(ESTIMATE)}
                    fill="#fbbf24"
                    fillOpacity={0.05}
                    stroke="#fbbf24"
                    strokeWidth={2.5}
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: reduce ? 0 : 1.4 }}
                  />
                  <path d={NORTH_EDGE_PATH} fill="none" stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4 6" />
                  <text x={432} y={236} textAnchor="middle" fill="#fcd34d" fontSize={11} fontWeight={600}>
                    Nordkanten er ukjent
                  </text>
                </motion.g>
              )}
            </AnimatePresence>

            <ListenDots status={(id, p) => listenStatus(step, id, p)} />

            <AnimatePresence>
              {BREAKS.filter((b) => step >= b.stage).map((b) => (
                <motion.g
                  key={b.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : b.ring ? 0.6 : 0.2 }}
                >
                  <BreakMarker at={b.at} pulse={!reduce && step <= 3} />
                  <BreakLabel b={b} />
                </motion.g>
              ))}
            </AnimatePresence>

            {step >= 4 && step <= ALARM_STEP && (
              <>
                <Team label="USAR 1" at={step === ALARM_STEP ? [206, 300] : [292, 380]} delay={step === ALARM_STEP ? 0.8 : 0} />
                <Team label="USAR 2" at={[580, 342]} />
              </>
            )}
            {step === 6 && <Team label="Søk" at={[430, 352]} color="#0ea5e9" />}

            <NodeBox instrument={step >= 4} />

            {/* Varsel */}
            <AnimatePresence>
              {step === ALARM_STEP && (
                <motion.g key="alarm" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <motion.rect
                    x={20}
                    y={18}
                    width={500}
                    height={46}
                    rx={10}
                    fill="#4c0519"
                    stroke="#fb7185"
                    strokeWidth={2}
                    animate={reduce ? undefined : { strokeOpacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <text x={40} y={47} fill="#ffe4e6" fontSize={16} fontWeight={700}>
                    VARSEL 07.14 · Bevegelse langs Solbakken · Trekk tilbake
                  </text>
                </motion.g>
              )}
            </AnimatePresence>

            {/* Målestokk og nordpil */}
            <g transform="translate(24 548)">
              <line x1={0} y1={0} x2={200} y2={0} stroke="#94a3b8" strokeWidth={2} />
              <line x1={0} y1={-5} x2={0} y2={5} stroke="#94a3b8" strokeWidth={2} />
              <line x1={200} y1={-5} x2={200} y2={5} stroke="#94a3b8" strokeWidth={2} />
              <text x={100} y={-8} textAnchor="middle" fill="#94a3b8" fontSize={11}>
                100 m
              </text>
            </g>
            <g transform="translate(962 540)">
              <path d="M 0 -18 L 8 6 L 0 1 L -8 6 Z" fill="#94a3b8" />
              <text x={0} y={22} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight={700}>
                N
              </text>
            </g>
          </svg>
        </div>

        <aside className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-slate-300">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-3xl font-bold text-cyan-300">{current.time}</span>
            <span className="text-sm text-slate-500">
              Steg {step + 1} av {STEPS.length}
            </span>
          </div>
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0.2, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`mt-2 text-xl font-semibold ${step === ALARM_STEP ? "text-rose-300" : "text-white"}`}>
              {current.title}
            </h3>
            <p className="mt-2 leading-relaxed">{current.text}</p>
          </motion.div>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-xl bg-slate-950/70 p-3">
                <dt className="text-xs text-slate-500">{m.label}</dt>
                <dd className="mt-1 font-mono text-lg font-semibold text-white">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Hendelseslogg</p>
            <ul className="mt-2 max-h-44 space-y-1.5 overflow-y-auto pr-1 font-mono text-xs">
              {logs.map((entry, i) => (
                <li
                  key={`${entry.line}-${i}`}
                  className={entry.now ? (entry.line.includes("VARSEL") ? "text-rose-300" : "text-cyan-200") : "text-slate-500"}
                >
                  {entry.line}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Styring */}
      <div className="no-print mt-5 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            aria-label="Forrige steg"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-cyan-300 disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-11 items-center gap-2 rounded-full bg-cyan-400 px-5 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {playing ? "Pause" : step === LAST_STEP ? "Spill av på nytt" : "Spill av"}
          </button>
          <button
            type="button"
            onClick={() => goTo(step + 1)}
            disabled={step === LAST_STEP}
            aria-label="Neste steg"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-cyan-300 disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(0)}
            aria-label="Start på nytt"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-cyan-300"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {STEPS.map((s, i) => (
            <button
              key={s.time}
              type="button"
              onClick={() => goTo(i)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-xs transition ${
                i === step
                  ? "bg-white text-slate-950"
                  : i < step
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "border border-slate-700 text-slate-500 hover:text-slate-300"
              }`}
            >
              {s.time}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
        {LEGEND.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.swatch}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
