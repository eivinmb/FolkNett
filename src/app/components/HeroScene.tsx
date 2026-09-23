"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BREAKS, ESTIMATE, HOUSES, SLIDE_PATHS, polyPath } from "./elvelia";
import {
  BreakMarker,
  Fibers,
  InstrumentBox,
  ListenDots,
  MapBase,
  NodeBox,
  SlideBody,
  SlideDefs,
} from "./ElveliaParts";

/** Lengden på én runde av animasjonen, i sekunder. */
const LOOP = 13;

type Fade = { values: number[]; times: number[] };

const FADES: Record<string, Fade> = {
  windows: { values: [1, 1, 0, 0, 1], times: [0, 0.22, 0.25, 0.95, 1] },
  slide: { values: [0, 0, 1, 1, 0], times: [0, 0.2, 0.28, 0.93, 1] },
  stage1: { values: [0, 0, 1, 1, 0], times: [0, 0.27, 0.3, 0.93, 1] },
  stage2: { values: [0, 0, 1, 1, 0], times: [0, 0.45, 0.48, 0.93, 1] },
  outline: { values: [0, 0, 1, 1, 0], times: [0, 0.52, 0.56, 0.93, 1] },
  listen: { values: [0, 0, 1, 1, 0], times: [0, 0.62, 0.66, 0.93, 1] },
};

export default function HeroScene() {
  const reduce = useReducedMotion();

  const fade = (name: keyof typeof FADES) => {
    const { values, times } = FADES[name];
    if (reduce) {
      const still = values[values.length - 2];
      return { initial: { opacity: still }, animate: { opacity: still }, transition: { duration: 0 } };
    }
    return {
      initial: { opacity: values[0] },
      animate: { opacity: values },
      transition: { duration: LOOP, times, repeat: Infinity, ease: "linear" as const },
    };
  };

  return (
    <svg
      viewBox="-20 -10 1040 640"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden="true"
    >
      <SlideDefs prefix="hero" />
      <defs>
        <radialGradient id="hero-glow" cx="0.45" cy="0.55" r="0.6">
          <stop offset="0" stopColor="#0e7490" stopOpacity={0.35} />
          <stop offset="1" stopColor="#020617" stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect x={-20} y={-10} width={1040} height={640} fill="url(#hero-glow)" />

      <g>
        <MapBase houseState={() => "dark"} labels={false} />

        {/* Vinduer med lys før strømmen går */}
        <motion.g {...fade("windows")}>
          {HOUSES.filter((_, i) => i % 3 === 0).map((h) => (
            <rect key={h.id} x={h.x - 3} y={h.y - 3} width={6} height={6} rx={1} fill="#fcd34d" opacity={0.5} />
          ))}
        </motion.g>

        <Fibers />
        <NodeBox />

        <SlideBody
          prefix="hero"
          d={SLIDE_PATHS.A}
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={
            reduce
              ? { d: SLIDE_PATHS.B, opacity: 1 }
              : {
                  d: [SLIDE_PATHS.A, SLIDE_PATHS.A, SLIDE_PATHS.B, SLIDE_PATHS.B],
                  opacity: FADES.slide.values,
                }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  d: { duration: LOOP, times: [0, 0.4, 0.5, 1], repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: LOOP, times: FADES.slide.times, repeat: Infinity, ease: "linear" },
                }
          }
        />

        <motion.path
          d={polyPath(ESTIMATE)}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={2}
          strokeDasharray="8 7"
          {...fade("outline")}
        />

        <motion.g {...fade("stage1")}>
          {BREAKS.filter((b) => b.stage === 1).map((b) => (
            <BreakMarker key={b.id} at={b.at} pulse={!reduce} />
          ))}
        </motion.g>
        <motion.g {...fade("stage2")}>
          {BREAKS.filter((b) => b.stage === 2).map((b) => (
            <BreakMarker key={b.id} at={b.at} pulse={!reduce} />
          ))}
        </motion.g>

        <motion.g {...fade("listen")}>
          <ListenDots status={() => "ok"} />
          <InstrumentBox />
        </motion.g>
      </g>
    </svg>
  );
}
