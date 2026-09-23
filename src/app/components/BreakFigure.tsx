"use client";

import { motion, useReducedMotion } from "framer-motion";

const Y = 92;
const NODE_X = 110;
const BREAK_X = 520;
const LOOP = 2.8;
const INSET_LOOP = 7;

const INSET_DOTS = [
  { x: 48, y: 150, t: 0.1 },
  { x: 138, y: 150, t: 0.18 },
  { x: 58, y: 70, t: 0.3 },
  { x: 130, y: 66, t: 0.38 },
];

export default function BreakFigure() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 900 250"
      className="h-auto w-full"
      role="img"
      aria-label="Animasjon: en lyspuls sendes fra noden, kastes tilbake fra bruddet, og tiden viser hvor langt ute bruddet er. Alle bruddene til sammen tegner omrisset av skredet."
    >
      <rect width={900} height={250} rx={18} fill="#020617" />

      {/* Noden */}
      <rect x={18} y={62} width={92} height={60} rx={10} fill="#0f172a" stroke="#67e8f9" />
      <text x={64} y={97} textAnchor="middle" fill="#e2e8f0" fontSize={14} fontWeight={600}>
        Node
      </text>

      {/* Kabelen før og etter bruddet */}
      <line x1={NODE_X} y1={Y} x2={BREAK_X} y2={Y} stroke="#67e8f9" strokeWidth={4} strokeLinecap="round" />
      <line x1={BREAK_X + 18} y1={Y} x2={680} y2={Y} stroke="#67e8f9" strokeWidth={4} strokeDasharray="6 8" opacity={0.3} />

      {/* Bruddet */}
      <path
        d={`M ${BREAK_X} ${Y - 9} L ${BREAK_X + 5} ${Y - 3} L ${BREAK_X - 2} ${Y + 2} L ${BREAK_X + 4} ${Y + 9}`}
        stroke="#fb7185"
        strokeWidth={3}
        fill="none"
      />
      <path
        d={`M ${BREAK_X + 18} ${Y - 9} L ${BREAK_X + 13} ${Y - 3} L ${BREAK_X + 20} ${Y + 2} L ${BREAK_X + 14} ${Y + 9}`}
        stroke="#fb7185"
        strokeWidth={3}
        fill="none"
      />
      <motion.circle
        cx={BREAK_X + 9}
        cy={Y}
        r={16}
        fill="#f43f5e"
        initial={{ opacity: 0.25 }}
        animate={reduce ? { opacity: 0.25 } : { opacity: [0.1, 0.45, 0.1] }}
        transition={{ duration: 1.3, repeat: Infinity }}
      />
      <text x={BREAK_X + 9} y={Y - 26} textAnchor="middle" fill="#fda4af" fontSize={13} fontWeight={600}>
        Brudd
      </text>

      {/* Pulsen ut og refleksen tilbake */}
      {!reduce && (
        <>
          <motion.circle
            cy={Y}
            r={7}
            fill="#ecfeff"
            initial={{ cx: NODE_X, opacity: 1 }}
            animate={{ cx: [NODE_X, BREAK_X, BREAK_X], opacity: [1, 1, 0] }}
            transition={{ duration: LOOP, times: [0, 0.45, 0.46], repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cy={Y}
            r={7}
            fill="#fbbf24"
            initial={{ cx: BREAK_X, opacity: 0 }}
            animate={{ cx: [BREAK_X, BREAK_X, NODE_X, NODE_X], opacity: [0, 1, 1, 0] }}
            transition={{ duration: LOOP, times: [0, 0.46, 0.91, 0.92], repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      {/* Avstanden */}
      <line x1={NODE_X} y1={140} x2={BREAK_X} y2={140} stroke="#475569" />
      <line x1={NODE_X} y1={132} x2={NODE_X} y2={148} stroke="#475569" />
      <line x1={BREAK_X} y1={132} x2={BREAK_X} y2={148} stroke="#475569" />
      <text x={(NODE_X + BREAK_X) / 2} y={168} textAnchor="middle" fill="#e2e8f0" fontSize={16} fontWeight={700}>
        382 meter
      </text>
      <text x={(NODE_X + BREAK_X) / 2} y={190} textAnchor="middle" fill="#94a3b8" fontSize={12}>
        Refleksen er tilbake etter 3,8 milliondels sekund
      </text>

      {/* Alle bruddene på kartet */}
      <g transform="translate(700 20)">
        <rect width={182} height={210} rx={12} fill="#0f172a" stroke="#1e293b" />
        <text x={91} y={24} textAnchor="middle" fill="#94a3b8" fontSize={11}>
          Alle bruddene på kartet
        </text>
        <text x={154} y={205} textAnchor="middle" fill="#38bdf8" fillOpacity={0.7} fontSize={9}>
          bekken
        </text>
        <line x1={16} y1={70} x2={166} y2={66} stroke="#67e8f9" strokeOpacity={0.4} strokeWidth={2} />
        <line x1={16} y1={150} x2={166} y2={150} stroke="#67e8f9" strokeOpacity={0.4} strokeWidth={2} />
        <path d="M 10 194 C 60 186 120 200 172 190" stroke="#38bdf8" strokeOpacity={0.5} strokeWidth={4} fill="none" />
        <motion.path
          d="M 76 194 L 48 150 L 58 70 L 130 66 L 138 150 L 104 194"
          fill="none"
          stroke="#fbbf24"
          strokeWidth={2}
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={reduce ? { pathLength: 1 } : { pathLength: [0, 0, 1, 1, 0] }}
          transition={reduce ? { duration: 0 } : { duration: INSET_LOOP, times: [0, 0.45, 0.7, 0.92, 1], repeat: Infinity }}
        />
        {INSET_DOTS.map((dot) => (
          <motion.g
            key={`${dot.x}-${dot.y}`}
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: INSET_LOOP, times: [0, dot.t, dot.t + 0.03, 0.92, 1], repeat: Infinity }
            }
          >
            <circle cx={dot.x} cy={dot.y} r={7} fill="#4c0519" stroke="#fb7185" strokeWidth={2} />
          </motion.g>
        ))}
        <text x={91} y={42} textAnchor="middle" fill="#fcd34d" fontSize={11} fontWeight={600}>
          tegner omrisset av skredet
        </text>
      </g>
    </svg>
  );
}
