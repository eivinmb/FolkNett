"use client";

import React, { useEffect, useReducer, useState } from "react";
import { Anchor, Pause, Play, Radio, RadioTower, RotateCcw, Zap } from "lucide-react";
import { COUNTRY_PATHS, MAP_H, MAP_W, project } from "./norwayMap";
import { KIND_LABEL, STATIONS, type StationDef, type StationKind } from "./stations";
import { STABLE_TICKS, initialStates, measure, mulberry32, step, type Scenario, type SimEvent, type Status, type StationState } from "./simulation";

// -------------------- oppsett --------------------

const COLORS: Record<Status, string> = { green: "#10b981", yellow: "#f59e0b", red: "#f43f5e" };
const STATUS_LABEL: Record<Status, string> = { green: "Grønn", yellow: "Gul", red: "Rød" };
const STATUS_MEANING: Record<Status, string> = { green: "GPS kan stoles på", yellow: "Usikkert", red: "Ikke stol på GPS" };

type Mode = "normal" | "jamming" | "spoofing" | "storm";

const MODES: { id: Mode; label: string; caption: string }[] = [
  { id: "normal", label: "Normal drift", caption: "GPS-tida stemmer med fiberklokka over hele landet." },
  { id: "jamming", label: "Jamming", caption: "Slik er hverdagen i Øst-Finnmark: GPS-signalet forsvinner." },
  {
    id: "spoofing",
    label: "Falskt signal",
    caption: "Signalet ser helt normalt ut. Bare sammenligningen med fiberklokka avslører at tida er feil.",
  },
  { id: "storm", label: "Solstorm", caption: "Solstormen spilles av i tre faser: forstyrrelser, under krisen og gjenoppretting." },
];

const STORM_PHASES: { scenario: Scenario; label: string; ticks: number; caption: string }[] = [
  { scenario: "storm1", label: "Forstyrrelser", ticks: 10, caption: "Solstormen treffer. GPS blir upålitelig, verst i nord." },
  { scenario: "storm2", label: "Under krisen", ticks: 6, caption: "Ingen satellitter å stole på. Kritiske systemer går på fibertid." },
  {
    scenario: "storm3",
    label: "Gjenoppretting",
    ticks: Infinity,
    caption: `Satellittene kommer tilbake fra sør. Hvert målepunkt må være stabilt i ${STABLE_TICKS} minutter før den blir grønn.`,
  },
];

const KIND_ICON: Record<StationKind, React.ReactNode> = {
  mast: <RadioTower className="h-4 w-4" />,
  kraft: <Zap className="h-4 w-4" />,
  dab: <Radio className="h-4 w-4" />,
  kyst: <Anchor className="h-4 w-4" />,
};

const RED_ACTION: Record<StationKind, string> = {
  mast: "Mobilmasta går på fibertid",
  kraft: "Strømnettets målinger går på fibertid",
  dab: "DAB-senderen går på fibertid",
  kyst: "Kystverket er varslet",
};

// -------------------- simuleringstilstand --------------------

type SimState = {
  minute: number;
  mode: Mode;
  phase: number; // fase i solstormen
  phaseTick: number;
  stations: Record<string, StationState>;
  events: SimEvent[];
};

type Action = { type: "tick" } | { type: "mode"; mode: Mode } | { type: "reset" };

const initialSim = (): SimState => ({ minute: 0, mode: "normal", phase: 0, phaseTick: 0, stations: initialStates(), events: [] });

function eventText(def: StationDef, st: StationState) {
  if (st.status === "red") return `${def.name}: ikke stol på GPS. ${RED_ACTION[def.kind]}.`;
  if (st.status === "yellow") return `${def.name}: usikkert.`;
  return `${def.name}: stabilt igjen, trygt å bruke GPS.`;
}

function tick(state: SimState): SimState {
  let { phase, phaseTick } = state;
  if (state.mode === "storm") {
    phaseTick += 1;
    if (phaseTick >= STORM_PHASES[phase].ticks && phase < STORM_PHASES.length - 1) {
      phase += 1;
      phaseTick = 0;
    }
  } else {
    phaseTick += 1;
  }
  const scenario = state.mode === "storm" ? STORM_PHASES[phase].scenario : state.mode;

  const rng = mulberry32(state.minute * 7919 + 17);
  const stations: Record<string, StationState> = {};
  const changed: Record<Status, StationDef[]> = { green: [], yellow: [], red: [] };
  for (const def of STATIONS) {
    const prev = state.stations[def.id];
    const next = step(prev, measure(def, scenario, phaseTick, rng));
    stations[def.id] = next;
    if (next.status !== prev.status) changed[next.status].push(def);
  }

  const minute = state.minute + 1;
  const events: SimEvent[] = [];
  (["red", "yellow", "green"] as Status[]).forEach((status) => {
    const list = changed[status];
    if (list.length === 0) return;
    const text =
      list.length > 2
        ? status === "red"
          ? `${list.length} målepunkter ble røde. Systemene i områdene går på fibertid.`
          : status === "yellow"
            ? `${list.length} målepunkter ble gule. Posisjoner der kan være feil.`
            : `${list.length} målepunkter er stabile igjen. Trygt å bruke GPS der.`
        : list.map((d) => eventText(d, stations[d.id])).join(" ");
    events.push({ id: minute * 10 + events.length, minute, status, text });
  });

  return { ...state, minute, phase, phaseTick, stations, events: [...events, ...state.events].slice(0, 20) };
}

function reducer(state: SimState, action: Action): SimState {
  switch (action.type) {
    case "tick":
      return tick(state);
    case "mode":
      return { ...state, mode: action.mode, phase: 0, phaseTick: 0 };
    case "reset":
      return initialSim();
  }
}

// -------------------- visning --------------------

function fmtClock(minute: number) {
  const total = 10 * 60 + minute;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

// Klokkeslett med nanosekunder, f.eks. 10:07:00,000 000 412
function fmtPrecise(minute: number, offsetNs: number) {
  const total = (10 * 3600 + minute * 60) * 1e9 + Math.round(offsetNs);
  const sec = Math.floor(total / 1e9);
  const frac = String(total - sec * 1e9).padStart(9, "0");
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(sec / 3600) % 24)}:${p(Math.floor((sec % 3600) / 60))}:${p(sec % 60)},${frac.slice(0, 3)} ${frac.slice(3, 6)} ${frac.slice(6)}`;
}

function fmtOffset(ns: number | null) {
  if (ns === null) return "ingen signal";
  const sign = ns >= 0 ? "+" : "−";
  const a = Math.abs(ns);
  return a >= 1000 ? `${sign}${(a / 1000).toFixed(1).replace(".", ",")} µs` : `${sign}${Math.round(a)} ns`;
}

export default function LiveMap() {
  const [sim, dispatch] = useReducer(reducer, undefined, initialSim);
  const [running, setRunning] = useState(true);
  const [selectedId, setSelectedId] = useState("kirkenes");

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => dispatch({ type: "tick" }), 700);
    return () => window.clearInterval(id);
  }, [running]);

  const counts: Record<Status, number> = { green: 0, yellow: 0, red: 0 };
  STATIONS.forEach((s) => counts[sim.stations[s.id].status]++);

  const selDef = STATIONS.find((s) => s.id === selectedId)!;
  const sel = sim.stations[selectedId];
  const caption = sim.mode === "storm" ? STORM_PHASES[sim.phase].caption : MODES.find((m) => m.id === sim.mode)!.caption;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white shadow-xl">
      <div className="grid lg:grid-cols-5">
        {/* KART */}
        <div className="relative lg:col-span-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-6 pt-5">
            <span className="font-mono text-2xl tabular-nums">kl. {fmtClock(sim.minute)}</span>
            <div className="flex items-center gap-3 text-sm">
              {(["green", "yellow", "red"] as Status[]).map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[s] }} />
                  <span className="tabular-nums text-slate-300">{counts[s]}</span>
                </span>
              ))}
            </div>
            <span className="ml-auto text-xs text-slate-500">Simulerte data</span>
          </div>

          <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="block h-auto w-full select-none" role="img" aria-label="Kart over Norge med målepunkter">
            {(["se", "fi", "ru", "dk"] as const).map((c) => (
              <path key={c} d={COUNTRY_PATHS[c]} fill="#111827" />
            ))}
            <path d={COUNTRY_PATHS.no} fill="#1e293b" stroke="#334155" strokeWidth="0.8" />

            {STATIONS.map((def) => {
              const [x, y] = project(def.lat, def.lon);
              return (
                <circle key={`z-${def.id}`} cx={x} cy={y} r={28} fill={COLORS[sim.stations[def.id].status]} opacity={0.18} style={{ transition: "fill 600ms" }} />
              );
            })}

            {STATIONS.map((def) => {
              const [x, y] = project(def.lat, def.lon);
              const st = sim.stations[def.id];
              const selected = def.id === selectedId;
              return (
                <g
                  key={def.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${def.name}: ${STATUS_MEANING[st.status]}`}
                  onClick={() => setSelectedId(def.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelectedId(def.id)}
                  className="cursor-pointer outline-none"
                >
                  <title>{`${def.name} – ${KIND_LABEL[def.kind]}`}</title>
                  {st.status === "red" && (
                    <circle cx={x} cy={y} r={8} fill="none" stroke={COLORS.red} strokeWidth="2">
                      <animate attributeName="r" from="7" to="20" dur="1.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.9" to="0" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={x} cy={y} r={14} fill="transparent" />
                  <circle cx={x} cy={y} r={6} fill={COLORS[st.status]} stroke="#020617" strokeWidth="2" />
                  {selected && <circle cx={x} cy={y} r={11} fill="none" stroke="white" strokeWidth="2" />}
                  {(def.label || selected) && (
                    <text x={x + 13} y={y + 5} fontSize="15" fill={selected ? "#fff" : "#94a3b8"} fontWeight={selected ? 700 : 500}>
                      {def.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* PANEL */}
        <div className="flex flex-col gap-5 border-t border-white/10 bg-slate-900/60 p-6 lg:col-span-2 lg:border-l lg:border-t-0">
          <div>
            <div className="grid grid-cols-2 gap-2">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    dispatch({ type: "mode", mode: m.id });
                    setRunning(true);
                  }}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                    sim.mode === m.id ? "bg-white text-slate-900" : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {sim.mode === "storm" && (
              <div className="mt-3 flex gap-1.5">
                {STORM_PHASES.map((p, i) => (
                  <div key={p.label} className="flex-1">
                    <div className={`h-1 rounded-full ${i <= sim.phase ? "bg-cyan-400" : "bg-white/10"}`} />
                    <div className={`mt-1 text-xs ${i === sim.phase ? "text-cyan-300" : "text-slate-500"}`}>
                      {i + 1}. {p.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{caption}</p>
          </div>

          {/* Valgt målepunkt */}
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{selDef.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  {KIND_ICON[selDef.kind]} {KIND_LABEL[selDef.kind]}
                </div>
              </div>
              <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-slate-950" style={{ backgroundColor: COLORS[sel.status] }}>
                {STATUS_LABEL[sel.status]} · {STATUS_MEANING[sel.status]}
              </span>
            </div>
            <dl className="mt-4 space-y-1 font-mono text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-slate-400">Fibertid</dt>
                <dd>{fmtPrecise(sim.minute, 0)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-400">GPS-tid</dt>
                <dd style={{ color: sel.offset === null ? COLORS.red : undefined }}>
                  {sel.offset === null ? "ingen signal" : fmtPrecise(sim.minute, sel.offset)}
                </dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-white/10 pt-1">
                <dt className="text-slate-400">Avvik</dt>
                <dd style={{ color: COLORS[sel.raw] }}>{fmtOffset(sel.offset)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-slate-300">{sel.cause}.</p>
          </div>

          {/* Logg */}
          <div className="min-h-[7rem] flex-1">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Siste hendelser</div>
            {sim.events.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">Velg et scenario over, eller klikk på et målepunkt i kartet.</p>
            ) : (
              <ul className="mt-2 space-y-2 text-sm">
                {sim.events.slice(0, 4).map((e) => (
                  <li key={e.id} className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: COLORS[e.status] }} />
                    <span className="text-slate-300">
                      <span className="font-mono text-xs text-slate-500">{fmtClock(e.minute)}</span> {e.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 pt-4">
            <button
              onClick={() => setRunning((r) => !r)}
              aria-label={running ? "Pause" : "Spill av"}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10"
            >
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {running ? "Pause" : "Spill av"}
            </button>
            <button
              onClick={() => dispatch({ type: "reset" })}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" /> Nullstill
            </button>
            <span className="ml-auto text-xs text-slate-500">Klikk på en prikk for detaljer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
