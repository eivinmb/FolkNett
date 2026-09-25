"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HeroScene from "./HeroScene";

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay },
        };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-slate-950 pt-14 text-white"
    >
      <div className="absolute inset-0 opacity-40 lg:left-[44%] lg:right-2 lg:opacity-100">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent lg:via-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16">
        <motion.p
          {...rise(0)}
          className="reveal inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-200"
        >
          Your Extreme 2026 · Oppgave 1: Når vi må bruke det vi har
        </motion.p>
        <motion.h1 {...rise(0.1)} className="reveal mt-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
          Bakken som lytter
        </motion.h1>
        <motion.p {...rise(0.2)} className="reveal mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          Når et kvikkleireskred går om natten, gjør vi fiberkablene under gatene om til kartet og ørene
          redningsmannskapene mangler.
        </motion.p>

        <motion.div {...rise(0.3)} className="reveal mt-10 flex flex-wrap gap-3">
          <a
            href="#casen"
            className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Les casen
          </a>
          <a
            href="#prototype"
            className="rounded-full border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
          >
            Prøv prototypen
          </a>
        </motion.div>
      </div>

      <p className="absolute bottom-6 right-4 z-10 hidden max-w-xs text-right text-xs text-slate-400 md:block">
        Illustrasjon av løsningen: lyspulser i fiberen (blått), skredet (brunt), bruddene (rødt), omrisset
        (gult) og fiberen som lytter (grønt).
      </p>
      <a
        href="#casen"
        aria-label="Gå til casen"
        className="no-print absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-slate-400 transition hover:text-white"
      >
        <ArrowDown className={`h-6 w-6 ${reduce ? "" : "animate-bounce"}`} />
      </a>
    </section>
  );
}
