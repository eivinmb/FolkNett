"use client";

import { EarOff, EyeOff, Lock, Target } from "lucide-react";
import Reveal from "./Reveal";

const PROBLEMS = [
  {
    icon: EyeOff,
    title: "Blinde",
    text: "Ingen visste hvor skredkanten gikk. Det første helhetsbildet kom fra et helikopter med nattbriller 73 minutter etter skredet, og anslagene sprikte mellom 30 og 50 hus.",
  },
  {
    icon: EarOff,
    title: "Døve",
    text: "Mannskapene måtte selv følge med på grunnen mens mindre ras gikk fra kanten.",
    quote: "vi så etter sprekker i bakken og lyttet",
    cite: "Mannskap fra brannvesenet, sitert i evalueringen",
  },
  {
    icon: Lock,
    title: "Låst ute",
    text: "Søket i skredgropa startet fra bakken først etter 48 timer, og området ble ikke erklært trygt før i august 2023.",
  },
];

export default function Problem() {
  return (
    <section className="print-break bg-slate-50 pb-24 print:pt-16">
      <div className="mx-auto max-w-6xl px-4">
        <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">Problemet vi løser</h3>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Evalueringen av Gjerdrum viser at mange av de vanskeligste timene kom etter at skredet hadde gått.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, text, quote, cite }, i) => (
            <Reveal key={title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h4 className="mt-4 text-xl font-bold text-slate-900">{title}</h4>
                <p className="mt-2 text-slate-600">{text}</p>
                {quote ? (
                  <figure className="mt-4 border-l-4 border-amber-400 pl-4">
                    <blockquote className="text-lg italic text-slate-800">«{quote}»</blockquote>
                    <figcaption className="mt-1 text-sm text-slate-500">{cite}</figcaption>
                  </figure>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex gap-4 rounded-2xl bg-cyan-900 p-6 text-cyan-50 md:p-8">
            <Target className="mt-1 h-7 w-7 flex-none text-cyan-300" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Problemet i én setning</p>
              <p className="mt-2 text-lg md:text-xl">
                I timene og ukene etter et kvikkleireskred mangler redningsledelsen et løpende bilde av grunnen: hvor
                stort skredet er, om mer vil rase, og når det er trygt å gå inn eller flytte hjem.
              </p>
            </div>
          </div>
        </Reveal>
        <p className="mt-4 text-sm text-slate-500">Kilde: Hovedredningssentralens evaluering (2021).</p>
      </div>
    </section>
  );
}
