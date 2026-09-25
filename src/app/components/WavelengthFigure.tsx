"use client";

const LANES = [
  { y: 58, color: "#67e8f9", label: "Internett ned · 1490 nm", from: 110, to: 790 },
  { y: 86, color: "#c4b5fd", label: "Internett opp · 1310 nm", from: 790, to: 110 },
  { y: 114, color: "#fbbf24", label: "Måling · 1650 nm", from: 110, to: 700 },
];

/** Tre bølgelengder i samme glasstråd. Målingen filtreres bort før huset. */
export default function WavelengthFigure() {
  return (
    <svg
      viewBox="0 0 900 170"
      className="h-auto w-full"
      role="img"
      aria-label="Internett og måling sendes på ulike bølgelengder i samme fiber uten å forstyrre hverandre. Målingen filtreres bort før huset."
    >
      <rect width={900} height={170} rx={18} fill="#020617" />
      <rect x={100} y={38} width={700} height={96} rx={48} fill="#0f172a" stroke="#1e293b" strokeWidth={2} />

      <rect x={20} y={62} width={70} height={48} rx={8} fill="#0f172a" stroke="#67e8f9" />
      <text x={55} y={91} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={600}>
        Node
      </text>
      <rect x={810} y={62} width={70} height={48} rx={8} fill="#0f172a" stroke="#67e8f9" />
      <text x={845} y={91} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={600}>
        Hus
      </text>

      {LANES.map((lane) => (
        <g key={lane.label}>
          <line x1={lane.from} y1={lane.y} x2={lane.to} y2={lane.y} stroke={lane.color} strokeOpacity={0.25} strokeWidth={3} />
          <line
            x1={lane.from}
            y1={lane.y}
            x2={lane.to}
            y2={lane.y}
            stroke={lane.color}
            strokeWidth={4}
            strokeLinecap="round"
            className="fiber-flow"
          />
          <text x={130} y={lane.y - 7} fill={lane.color} fontSize={11} fontWeight={600}>
            {lane.label}
          </text>
        </g>
      ))}

      <rect x={702} y={100} width={14} height={28} rx={3} fill="#78350f" stroke="#fbbf24" />
      <text x={709} y={156} textAnchor="middle" fill="#fcd34d" fontSize={11}>
        filter
      </text>
    </svg>
  );
}
