"use client";

import { CloudRain, Construction, Flame, Mountain } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const CASES = [
  {
    icon: Flame,
    title: "Skogbrann om natten",
    text: "Fiber på stolper og i kraftlinjer kjenner varmen når helikoptrene må stå på bakken i mørket, slik de måtte i Ålesund i mars 2026.",
  },
  {
    icon: CloudRain,
    title: "Uvær med mange skred",
    text: "Under et uvær som «Hans» i 2023 kan bruddene i hele regionen vise hvor skred har gått, og hvilke veier og bygder som er avskåret.",
  },
  {
    icon: Construction,
    title: "Graving i kvikkleire",
    text: "Mange kvikkleireskred utløses av menneskelige inngrep som graving og fylling. Fiberen under gata kan passe på grunnen mens det graves.",
  },
  {
    icon: Mountain,
    title: "Stein og snø på vei og bane",
    text: "NORSAR og Bane NOR bygger faste anlegg. Fiberlytterne kan dele kompetanse og utstyr med dem.",
  },
];

export default function Scale() {
  return (
    <section id="skalering" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Veien videre"
          title="Samme lyttere, flere kriser"
          lead="Når vaktteamet, avtalene og programvaren først finnes, kan de brukes i mer enn kvikkleireskred."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CASES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-2xl border border-slate-200 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
