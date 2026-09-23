"use client";

import { motion, useReducedMotion } from "framer-motion";

const CABLE_Y = 172;
const START = 120;
const END = 880;
const EVENT_X = 600;
const PULSE_SECONDS = 2.4;
const SPEED = (END - START) / PULSE_SECONDS;
const BASELINE = 290;

function noisePath(): string {
  const pts: string[] = [];
  for (let x = START; x <= END; x += 6) {
    const y = BASELINE + Math.sin(x * 0.37) * 2.2 + Math.sin(x * 0.113) * 1.6;
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

function spikePath(): string {
  const pts: string[] = [];
  for (let x = EVENT_X - 60; x <= EVENT_X + 60; x += 3) {
    const d = (x - EVENT_X) / 20;
    const envelope = Math.exp(-d * d);
    const y = BASELINE - envelope * 34 * Math.abs(Math.cos((x - EVENT_X) * 0.35));
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

const NOISE = noisePath();
const SPIKE = spikePath();
const BACKSCATTER = [200, 330, 460, 600, 720, 840];
const MARKERS = [
  { n: 1, x: 69, y: 226 },
  { n: 2, x: 330, y: 204 },
  { n: 3, x: 636, y: 126 },
  { n: 4, x: 700, y: 262 },
];

export default function ListeningFigure() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 900 330"
      className="h-auto w-full"
      role="img"
      aria-label="Animasjon: et lytteinstrument sender lyspulser inn i fiberen under gata, og ser akkurat hvor bakken beveger seg."
    >
      <defs>
        <linearGradient id="lf-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a3526" />
          <stop offset="1" stopColor="#1f160f" />
        </linearGradient>
        <filter id="lf-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width={900} height={330} rx={18} fill="#020617" />

      {/* Husene over gata */}
      {[240, 420, 780].map((x) => (
        <g key={x}>
          <rect x={x - 24} y={78} width={48} height={32} fill="#1e293b" />
          <path d={`M ${x - 30} 80 L ${x} 56 L ${x + 30} 80 Z`} fill="#334155" />
          <rect x={x - 5} y={90} width={10} height={10} fill="#fcd34d" opacity={0.45} />
        </g>
      ))}
      <rect x={0} y={110} width={900} height={8} fill="#1e293b" />
      <rect x={0} y={118} width={900} height={112} fill="url(#lf-soil)" />
      <text x={880} y={222} textAnchor="end" fill="#a8a29e" fontSize={11}>
        Kvikkleire under gata
      </text>

      {/* Fiberkabelen */}
      <line x1={START} y1={CABLE_Y} x2={END} y2={CABLE_Y} stroke="#67e8f9" strokeWidth={4} strokeLinecap="round" opacity={0.85} />

      {/* Lytteinstrumentet i noden */}
      <rect x={18} y={140} width={102} height={64} rx={10} fill="#0f172a" stroke="#67e8f9" />
      <text x={69} y={168} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={600}>
        Lytte
      </text>
      <text x={69} y={186} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={600}>
        instrument
      </text>
      <motion.circle
        cx={106}
        cy={152}
        r={4}
        fill="#34d399"
        animate={reduce ? undefined : { opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />

      {/* Bevegelse i grunnen */}
      <path d="M 596 110 L 604 122 L 596 134 L 606 146" stroke="#fbbf24" strokeWidth={2.5} fill="none" />
      {[0, 0.55, 1.1].map((delay) => (
        <motion.ellipse
          key={delay}
          cx={EVENT_X}
          cy={CABLE_Y - 18}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={2}
          initial={{ rx: 10, ry: 5, opacity: reduce ? 0.5 : 0 }}
          animate={reduce ? { rx: 44, ry: 20, opacity: 0.5 } : { rx: [10, 70], ry: [5, 30], opacity: [0.8, 0] }}
          transition={reduce ? { duration: 0 } : { duration: 1.6, repeat: Infinity, delay, ease: "easeOut" }}
        />
      ))}
      <motion.circle
        cx={EVENT_X}
        cy={CABLE_Y}
        r={9}
        fill="#fbbf24"
        filter="url(#lf-glow)"
        animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />

      {/* Lyspulsen som går ut */}
      {!reduce && (
        <motion.circle
          cy={CABLE_Y}
          r={7}
          fill="#ecfeff"
          filter="url(#lf-glow)"
          initial={{ cx: START }}
          animate={{ cx: [START, END] }}
          transition={{ duration: PULSE_SECONDS, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Lyset som spres tilbake fra hver meter */}
      {!reduce &&
        BACKSCATTER.map((x) => {
          const back = (x - START) / SPEED;
          return (
            <motion.circle
              key={x}
              cy={CABLE_Y + 9}
              r={3}
              fill={x === EVENT_X ? "#fbbf24" : "#a5f3fc"}
              initial={{ cx: x, opacity: 0 }}
              animate={{ cx: [x, START], opacity: [0, 0.9, 0] }}
              transition={{
                duration: back,
                repeat: Infinity,
                repeatDelay: PULSE_SECONDS - back,
                delay: (x - START) / SPEED,
                ease: "linear",
              }}
            />
          );
        })}

      {/* Signalet instrumentet ser */}
      <text x={START} y={250} fill="#94a3b8" fontSize={12}>
        Det instrumentet ser: signal langs hele kabelen
      </text>
      <line x1={START} y1={BASELINE + 10} x2={END} y2={BASELINE + 10} stroke="#334155" />
      <path d={NOISE} stroke="#67e8f9" strokeWidth={1.5} fill="none" opacity={0.7} />
      <motion.path
        d={SPIKE}
        stroke="#fbbf24"
        strokeWidth={2}
        fill="none"
        style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
        animate={reduce ? undefined : { scaleY: [0.4, 1, 0.5, 0.9, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <text x={EVENT_X} y={318} textAnchor="middle" fill="#fbbf24" fontSize={12}>
        her beveger bakken seg
      </text>

      {MARKERS.map((m) => (
        <g key={m.n}>
          <circle cx={m.x} cy={m.y} r={11} fill="#0891b2" />
          <text x={m.x} y={m.y + 4} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={700}>
            {m.n}
          </text>
        </g>
      ))}
    </svg>
  );
}
