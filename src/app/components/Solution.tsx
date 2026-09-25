"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Ear, House, Map as MapIcon, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const PHASES = [
  {
    icon: ShieldCheck,
    when: "Før krisen",
    title: "Forberedt",
    color: "bg-slate-800 text-slate-100",
    text: "Operatørene har avtalt å låne ut fibre i en krise. Fiberlytterne har instrumenter klare, og vi vet på forhånd hvilke boligfelt på kvikkleire som har fiber.",
  },
  {
    icon: MapIcon,
    when: "Minutt 0 til 15",
    title: "Bruddene tegner skredet",
    color: "bg-rose-600 text-white",
    text: "Kablene ryker der grunnen raser ut. Bruddene legges på kartet og gir omrisset, og tidspunktene viser hvilken vei skredet vokser.",
  },
  {
    icon: Ear,
    when: "Time 1 til døgn 3",
    title: "Fiberen lytter for mannskapene",
    color: "bg-emerald-600 text-white",
    text: "De hele fibrene rundt kanten lytter fra noden, trygt unna faresonen. Beveger bakken seg, går varselet rett ut på sambandet.",
  },
  {
    icon: House,
    when: "Uke 1 og utover",
    title: "Fiberen vokter hjemmene",
    color: "bg-cyan-600 text-white",
    text: "Lyttingen fortsetter mens skråningen sikres. Rolige målinger gir grunnlag for å friskmelde sonene og la folk flytte hjem.",
  },
];

export default function Solution() {
  const reduce = useReducedMotion();

  return (
    <section id="losningen" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Spørsmål 3 av 4"
          title="Hvordan brukes teknologien på en ny måte?"
          lead="Fiberen får tre nye jobber som starter i det øyeblikket skredet går."
        />

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-7 hidden h-1 rounded-full bg-slate-200 lg:block" />
          <motion.div
            className="print-full absolute left-0 top-7 hidden h-1 rounded-full bg-gradient-to-r from-slate-700 via-rose-500 to-cyan-500 lg:block"
            initial={{ width: reduce ? "100%" : "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <div className="grid gap-6 lg:grid-cols-4">
            {PHASES.map(({ icon: Icon, when, title, color, text }, i) => (
              <Reveal key={title} delay={i * 0.15} className="relative">
                <span className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${color}`}>
                  <Icon className="h-7 w-7" />
                </span>
                <p className="mt-4 font-mono text-sm font-semibold text-cyan-700">{when}</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
