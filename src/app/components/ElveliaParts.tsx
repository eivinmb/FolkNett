"use client";

import { motion, type MotionProps } from "framer-motion";
import {
  CARE_HOME,
  FIBERS,
  HOUSES,
  HOUSE_H,
  HOUSE_W,
  LISTEN,
  NODE,
  ROADS,
  STREAM_PATH,
  dotsAlong,
  toPoints,
  type House,
  type Pt,
} from "./elvelia";

export type HouseState = "sleep" | "dark" | "lit";
export type DotStatus = "ok" | "watch" | "alarm";

export const DOT_COLORS: Record<DotStatus, string> = {
  ok: "#34d399",
  watch: "#fbbf24",
  alarm: "#fb7185",
};

function HouseShape({ house, state }: { house: House; state: HouseState }) {
  return (
    <g>
      <rect
        x={house.x - HOUSE_W / 2}
        y={house.y - HOUSE_H / 2}
        width={HOUSE_W}
        height={HOUSE_H}
        rx={2}
        fill="#273449"
        stroke="#3b4a63"
        strokeWidth={1}
      />
      {state !== "dark" && (
        <rect
          x={house.x - 3}
          y={house.y - 3}
          width={6}
          height={6}
          rx={1}
          fill="#fcd34d"
          opacity={state === "lit" ? 0.95 : 0.35}
        />
      )}
    </g>
  );
}

/** Bekken, gatene, husene og omsorgssenteret i Elvelia. */
export function MapBase({
  houseState,
  labels = true,
}: {
  houseState: (house: House) => HouseState;
  labels?: boolean;
}) {
  return (
    <g>
      <path d={STREAM_PATH} stroke="#0c2a45" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d={STREAM_PATH} stroke="#38bdf8" strokeOpacity={0.35} strokeWidth={4} fill="none" strokeLinecap="round" />

      {ROADS.map((road) => (
        <polyline
          key={road.name}
          points={toPoints(road.pts)}
          fill="none"
          stroke="#172033"
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {labels &&
        ROADS.map((road) => (
          <text
            key={`${road.name}-label`}
            x={road.label[0]}
            y={road.label[1]}
            fill="#64748b"
            fontSize={9}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="middle"
            letterSpacing={0.6}
            transform={road.vertical ? `rotate(-90 ${road.label[0]} ${road.label[1]})` : undefined}
          >
            {road.name.toUpperCase()}
          </text>
        ))}

      {HOUSES.map((house) => (
        <HouseShape key={house.id} house={house} state={houseState(house)} />
      ))}

      <rect
        x={CARE_HOME.x}
        y={CARE_HOME.y}
        width={CARE_HOME.w}
        height={CARE_HOME.h}
        rx={4}
        fill="#273449"
        stroke="#3b4a63"
      />
      {labels && (
        <text
          x={CARE_HOME.x + CARE_HOME.w / 2}
          y={CARE_HOME.y + CARE_HOME.h / 2}
          fill="#94a3b8"
          fontSize={9}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Omsorgssenter
        </text>
      )}
      {labels && (
        <text x={60} y={604} fill="#38bdf8" fillOpacity={0.6} fontSize={10} fontWeight={600}>
          BEKKEN
        </text>
      )}
    </g>
  );
}

/** Fiberkablene med lyspulser som går ut fra noden. */
export function Fibers() {
  return (
    <g>
      {FIBERS.map((fiber, i) => (
        <g key={i}>
          <polyline
            points={toPoints(fiber)}
            fill="none"
            stroke="#22d3ee"
            strokeOpacity={0.35}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <polyline
            points={toPoints(fiber)}
            fill="none"
            stroke="#a5f3fc"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fiber-flow"
          />
        </g>
      ))}
    </g>
  );
}

export function NodeBox({ instrument = false }: { instrument?: boolean }) {
  const [x, y] = NODE;
  return (
    <g>
      <circle cx={x} cy={y} r={24} fill="#22d3ee" opacity={0.12} />
      <rect x={x - 16} y={y - 12} width={32} height={24} rx={5} fill="#0e7490" stroke="#67e8f9" />
      <text x={x + 26} y={y + 4} fill="#a5f3fc" fontSize={11} fontWeight={600}>
        Fibernode
      </text>
      {instrument && <InstrumentBox />}
    </g>
  );
}

/** Lytteinstrumentet Fiberlytterne kobler til i noden. */
export function InstrumentBox() {
  const [x, y] = NODE;
  return (
    <g>
      <motion.circle
        cx={x - 56}
        cy={y}
        r={14}
        fill="none"
        stroke="#34d399"
        strokeWidth={2}
        animate={{ r: [14, 30], opacity: [0.8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <rect x={x - 76} y={y - 11} width={40} height={22} rx={5} fill="#064e3b" stroke="#34d399" />
      <text x={x - 56} y={y + 4} fill="#d1fae5" fontSize={9} fontWeight={700} textAnchor="middle">
        DAS
      </text>
      <text x={x - 56} y={y - 20} fill="#6ee7b7" fontSize={10} fontWeight={600} textAnchor="middle">
        Lytteinstrument
      </text>
    </g>
  );
}

/** Farge og struktur for skredmassene. Prefikset holder id-ene unike når flere kart vises. */
export function SlideDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <linearGradient id={`${prefix}-clay`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8b6545" />
        <stop offset="1" stopColor="#4a3322" />
      </linearGradient>
      <pattern
        id={`${prefix}-debris`}
        width={30}
        height={30}
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(18)"
      >
        <path d="M2 6 L11 9 M16 20 L25 17 M6 24 L9 29" stroke="#2f2015" strokeWidth={1.6} strokeLinecap="round" />
        <rect x={18} y={4} width={6} height={4} rx={1} fill="#3a281b" transform="rotate(25 21 6)" />
        <circle cx={8} cy={16} r={2.2} fill="#a07a55" opacity={0.55} />
        <circle cx={24} cy={27} r={1.6} fill="#a07a55" opacity={0.5} />
      </pattern>
    </defs>
  );
}

/** Skredmassene. Tar imot de samme animasjonene som en vanlig motion.path. */
export function SlideBody({
  prefix,
  d,
  initial,
  animate,
  transition,
}: {
  prefix: string;
  d: string;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  transition?: MotionProps["transition"];
}) {
  return (
    <g>
      <motion.path
        d={d}
        fill={`url(#${prefix}-clay)`}
        stroke="#c2803f"
        strokeOpacity={0.7}
        strokeWidth={2}
        initial={initial}
        animate={animate}
        transition={transition}
      />
      <motion.path
        d={d}
        fill={`url(#${prefix}-debris)`}
        initial={initial}
        animate={animate}
        transition={transition}
      />
    </g>
  );
}

export function BreakMarker({ at, pulse = true }: { at: Pt; pulse?: boolean }) {
  const [x, y] = at;
  return (
    <g>
      {pulse && (
        <motion.circle
          cx={x}
          cy={y}
          r={10}
          fill="none"
          stroke="#fb7185"
          strokeWidth={2}
          animate={{ r: [10, 24], opacity: [0.7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <circle cx={x} cy={y} r={10} fill="#4c0519" stroke="#fb7185" strokeWidth={2} />
      <path
        d={`M ${x - 4.5} ${y - 4.5} L ${x + 4.5} ${y + 4.5} M ${x + 4.5} ${y - 4.5} L ${x - 4.5} ${y + 4.5}`}
        stroke="#ffe4e6"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </g>
  );
}

/** Målepunktene langs de hele fibrene rundt skredet. */
export function ListenDots({ status }: { status: (segmentId: string, p: Pt) => DotStatus | null }) {
  return (
    <g>
      {LISTEN.map((segment) =>
        dotsAlong(segment).map((p, i) => {
          const s = status(segment.id, p);
          if (!s) return null;
          const key = `${segment.id}-${i}`;
          if (s === "alarm") {
            return (
              <motion.circle
                key={key}
                cx={p[0]}
                cy={p[1]}
                r={3}
                fill={DOT_COLORS.alarm}
                animate={{ r: [2.6, 5, 2.6], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: (i % 5) * 0.08 }}
              />
            );
          }
          return (
            <circle
              key={key}
              cx={p[0]}
              cy={p[1]}
              r={2.6}
              fill={DOT_COLORS[s]}
              className="listen-dot"
              style={{ animationDelay: `${(i % 7) * 0.3}s` }}
            />
          );
        }),
      )}
    </g>
  );
}
