"use client";

import { CircleCheck, Construction, Rocket } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const EXISTS = [
  "Kablene: 91 prosent av husstandene har fiberdekning.",
  "Bruddmåling: et vanlig verktøy hos fiberoperatørene.",
  "Lytteinstrumenter: brukt i oljeindustrien og prøvd på skred i Norge.",
  "Kart over kvikkleireområder fra NVE.",
  "Nødnett, som varslene kan gå ut på.",
];

const TO_BUILD = [
  "En beredskapsavtale mellom staten og operatørene.",
  "Et lite vaktteam med instrumenter i hver region.",
  "Programvare som samler brudd og lytting på ett kart og skiller støy fra bevegelse.",
  "Et forhåndskart over boligfelt på kvikkleire som har fiber, og hvilken node de kan lyttes fra.",
  "Øvelser, så innsatsledere vet hvordan kartet brukes.",
];

const FAQ = [
  {
    q: "Hva om kablene nærmest skredet blir revet over?",
    a: "Da er bruddet i seg selv informasjonen, fordi det viser hvor grunnen har gått. Vi lytter med resten av fiberen. Der kablene går i ring, måler og lytter vi fra begge ender.",
  },
  {
    q: "Ser dere ikke bare langs kablene?",
    a: "Jo. Fiberen følger gatene, og det er der husene og menneskene er. Den erstatter ikke helikopter, droner og geoteknikere, men gir dem et bilde av bakken som de ikke har i dag.",
  },
  {
    q: "Kan fiberen varsle før skredet går?",
    a: "Det forsker NTNU på, men det lover vi ikke. Løsningen vår starter når skredet har gått, fordi det er der behovet er dokumentert i evalueringen av Gjerdrum.",
  },
  {
    q: "Hva med støy fra helikoptre, aggregater og gravemaskiner?",
    a: "Hver kilde har sitt eget mønster i signalet. Programvaren lærer å skille dem fra bevegelse i grunnen, og mye av forskningen på dette finnes allerede. Innsatsleder vet dessuten hvor maskinene står.",
  },
  {
    q: "Forstyrrer lyttingen internett og TV for dem som bor i nærheten?",
    a: "Nei. Vi bruker ledige fibre i kablene, ikke fibrene som frakter trafikk.",
  },
  {
    q: "Er ikke kabelkart hemmelige?",
    a: "De er sensitive. Derfor deles de bare i en krise, med politiet og NVE, og forhåndskartet lages innenfor sikre rammer.",
  },
  {
    q: "Hvorfor gjør ikke operatørene dette allerede?",
    a: "Fordi ingen har bedt dem om det. Bruddmålingen brukes i dag bare til reparasjon. Det som er nytt, er avtalen og rollene, ikke teknologien.",
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
            <div className="h-full rounded-2xl border border-emerald-200 bg-white p-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <CircleCheck className="h-5 w-5 text-emerald-600" />
                Dette finnes allerede
              </div>
              <ul className="mt-4 space-y-3 text-slate-600">
                {EXISTS.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
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
        </div>

        <Reveal delay={0.1}>
          <div className="mt-5 flex gap-4 rounded-2xl bg-slate-900 p-6 text-slate-200">
            <Rocket className="mt-1 h-6 w-6 flex-none text-cyan-300" />
            <div>
              <p className="font-semibold text-white">Første steg: en pilot</p>
              <p className="mt-1">
                Et kvikkleireområde i Trøndelag, NTNU, en lokal fiberoperatør og brann og redning gjennomfører en
                øvelse sammen. Målet er å vise at bruddkartet og lyttevarslene virker i en realistisk situasjon, før
                ordningen bygges ut i flere regioner.
              </p>
            </div>
          </div>
        </Reveal>

        <h3 className="mt-16 text-2xl font-bold text-slate-900 md:text-3xl">Spørsmål vi forventer</h3>
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
