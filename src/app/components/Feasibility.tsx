"use client";

import { Construction, Rocket } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const TO_BUILD = [
  "En beredskapsavtale mellom staten og fiberoperatørene.",
  "Et lite vaktteam med instrumenter i hver region.",
  "Programvare som samler brudd og lytting på ett kart og skiller støy fra bevegelse.",
  "Et forhåndskart over boligfelt på kvikkleire med fiber.",
  "Varsler rett ut på Nødnett, og øvelser med nødetatene.",
];

const FAQ = [
  {
    q: "Hva om kablene nærmest skredet blir revet over?",
    a: "Da er bruddet i seg selv informasjonen. Vi lytter med resten, og der kablene går i ring, fra begge ender.",
  },
  {
    q: "Kan fiberen varsle før skredet går?",
    a: "Det forsker NTNU på, men vi lover det ikke. Løsningen starter når skredet har gått, der behovet er dokumentert.",
  },
  {
    q: "Hva med støy fra helikoptre og gravemaskiner?",
    a: "Hver kilde har sitt eget mønster, og programvaren lærer å skille dem fra bevegelse i grunnen.",
  },
  {
    q: "Hvorfor gjør ikke operatørene dette allerede?",
    a: "Fordi ingen har bedt dem om det. Det nye er avtalen og rollene, ikke teknologien.",
  },
];

export default function Feasibility() {
  return (
    <section id="gjennomforing" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Gjennomføring"
          title="Er det mulig å gjennomføre?"
          lead="Ja. Kablene er allerede betalt. Det som koster, er instrumenter, programvare, vakt og øvelser."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-2xl border border-amber-200 bg-white p-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Construction className="h-5 w-5 text-amber-600" />
                Dette må bygges
              </div>
              <ul className="mt-4 space-y-3 text-slate-600">
                {TO_BUILD.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full gap-4 rounded-2xl bg-slate-900 p-6 text-slate-200">
              <Rocket className="mt-1 h-6 w-6 flex-none text-cyan-300" />
              <div>
                <p className="text-lg font-semibold text-white">Første steg: en pilot</p>
                <p className="mt-2">
                  NTNU, en lokal fiberoperatør og brann og redning øver sammen i et kvikkleireområde i Trøndelag. Målet
                  er å vise at bruddkartet og varslene virker før ordningen bygges ut.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <h3 className="mt-14 text-2xl font-bold text-slate-900 md:text-3xl">Spørsmål vi forventer</h3>
        <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {FAQ.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-slate-900 hover:bg-slate-50">
                {item.q}
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
