"use client";

import { Ear, FlaskConical, MapPin } from "lucide-react";
import BreakFigure from "./BreakFigure";
import ListeningFigure from "./ListeningFigure";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import WavelengthFigure from "./WavelengthFigure";

const STATS = [
  { value: "91 %", text: "av norske husstander har fiberdekning, så kablene ligger der folk bor." },
  { value: "Tusenvis", text: "av målepunkter langs én kabel når fiberen lytter." },
  { value: "0", text: "nye kabler. Vi bruker fibrene som allerede ligger i gata." },
];

const LISTEN_STEPS = [
  "Instrumentet i noden sender korte lyspulser inn i fiberen.",
  "Litt av lyset spres tilbake fra hver meter av glasset.",
  "Når bakken beveger seg, strekkes fiberen litt akkurat der.",
  "Instrumentet ser hvor det skjer og hvor mye.",
];

const TESTED = [
  "NTNU har målt på kvikkleire i Rissa med fiber.",
  "NORSAR og Bane NOR bruker fiber til å oppdage skred på vei og bane.",
  "Forskning viser at fiberen kan se når skredkanten begynner å bevege seg.",
];

export default function Technology() {
  return (
    <section id="teknologien" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Spørsmål 2 av 4"
          title="Hvilken sivil teknologi?"
          lead="Fibernettet ble lagt for internett og TV. Vi bruker det som finnes og gir det en ny jobb."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-slate-900 p-6 text-slate-300">
                <p className="text-4xl font-extrabold text-cyan-300">{stat.value}</p>
                <p className="mt-2">{stat.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Bruddmåling</h3>
            </div>
            <p className="mt-4 max-w-3xl text-slate-600">
              Når en kabel ryker, sender operatøren en lyspuls fra noden og måler hvor lang tid refleksen fra bruddet
              bruker. I dag brukes det til å sende reparatører til rett sted. Hos oss blir hvert brudd et punkt på
              kartet over skredet.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <BreakFigure />
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Ear className="h-5 w-5" />
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Lytting med fiber (DAS)</h3>
            </div>
            <p className="mt-4 max-w-3xl text-slate-600">
              Med et lytteinstrument blir én kabel til tusenvis av mikrofoner. Fiberen trenger ikke strøm, bare
              instrumentet i noden, som har reservestrøm.
            </p>
          </Reveal>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
            <Reveal delay={0.1}>
              <ListeningFigure />
            </Reveal>
            <Reveal delay={0.15}>
              <ol className="space-y-3">
                {LISTEN_STEPS.map((step, i) => (
                  <li key={step} className="flex gap-3 text-slate-700">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <Reveal>
            <h3 className="text-2xl font-bold text-slate-900">Hvilke fibre bruker vi?</h3>
            <p className="mt-4 text-slate-600">
              I evakueringssonen er husene tomme, så operatøren kan låne fibrene som går dit. Der fiberen også frakter
              viktig trafikk, for eksempel til mobilmaster, sender vi målingen på en egen bølgelengde. Det er slik
              operatørene overvåker nettet i dag.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <WavelengthFigure />
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <div className="grid gap-6 rounded-2xl border border-slate-200 p-6 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <FlaskConical className="h-5 w-5 text-cyan-700" />
                Prøvd i Norge
              </div>
              <ul className="mt-3 space-y-2 text-slate-600">
                {TESTED.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-600" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <p className="self-center text-lg text-slate-800">
              Det nye hos oss: vi har ikke funnet noen som bruker fiberen i selve redningsaksjonen, der skredet
              faktisk har gått. Det er den jobben vi gir den.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
