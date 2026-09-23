"use client";

import { Cable, Ear, FlaskConical, MapPin, Sparkles } from "lucide-react";
import BreakFigure from "./BreakFigure";
import ListeningFigure from "./ListeningFigure";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const STATS = [
  { value: "91 %", text: "av norske husstander har fiberdekning. Kablene ligger i gatene der folk bor." },
  { value: "Tusenvis", text: "av målepunkter langs én kabel når fiberen brukes til å lytte." },
  { value: "0", text: "nye kabler. Vi låner ledige fibre i kablene som allerede ligger der." },
];

const LISTEN_STEPS = [
  "Instrumentet i noden sender korte lyspulser inn i en ledig fiber.",
  "Litt av lyset spres tilbake fra hver meter av glasset.",
  "Når bakken beveger seg, strekkes fiberen litt akkurat der.",
  "Instrumentet ser hvor det skjer, hvor mye og hvordan det låter.",
];

const TESTED = [
  "NTNU målte på kvikkleire i Rissa i 2021 og 2022, som et første steg mot varsling av kvikkleireskred.",
  "NORSAR testet fiber i veien ved Holmbuktura i Troms fra 2022 til 2024. Systemet oppdaget snøskred som traff veien.",
  "Bane NOR vil oppdage steinras langs jernbanen med fiber etter ulykken ved Finneidfjord i 2024.",
  "Forskning har vist at fiberen kan se når bakken begynner å strekke seg ved skredkanten, og når skredet sprer seg bakover.",
  "Oljeindustrien har brukt den samme lytteteknologien i brønner i mange år.",
];

export default function Technology() {
  return (
    <section id="teknologien" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Spørsmål 2 av 4"
          title="Hvilken sivil teknologi?"
          lead="Vi finner ikke opp noe nytt. Vi bruker tre ting som allerede finnes, og gir dem en ny jobb."
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

        {/* 1. Fibernettet */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <Cable className="h-5 w-5" />
              </span>
              <h3 className="text-2xl font-bold text-slate-900">1. Fibernettet i gata</h3>
            </div>
            <p className="mt-4 text-slate-600">
              Fra operatørens node går kabler med mange glassfibre ut langs gatene. Mange av fibrene står ubrukt som
              reserve, og det er dem vi låner. Selve fiberen er glass og trenger ikke strøm. Det er bare instrumentet i
              noden som gjør det, og noden har reservestrøm.
            </p>
            <p className="mt-3 text-slate-600">
              Kablene ble lagt for internett og TV. Men lyset i glasset kan brukes til mye mer enn å frakte data.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Slik ligger det i et boligfelt</p>
              <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 text-slate-700">
                <span className="rounded-lg bg-cyan-700 px-3 py-1 text-sm font-semibold text-white">Node</span>
                <span>Operatørens skap eller bygg, med strøm og reservebatteri</span>
                <span className="rounded-lg bg-cyan-500 px-3 py-1 text-sm font-semibold text-white">Kabel</span>
                <span>Følger gatene, ofte i ring, med mange fibre i hver kabel</span>
                <span className="rounded-lg bg-cyan-300 px-3 py-1 text-sm font-semibold text-slate-900">Fiber</span>
                <span>Hvert glasshår kan frakte data, eller lånes til å lytte</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 2. Bruddmåling */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="text-2xl font-bold text-slate-900">2. Bruddmåling</h3>
            </div>
            <p className="mt-4 max-w-3xl text-slate-600">
              Når en kabel ryker, sender operatøren en lyspuls inn i fiberen fra noden. Pulsen kastes tilbake fra
              bruddet, og tiden den bruker viser hvor langt ute bruddet er. I dag brukes målingen til å sende
              reparatører til rett sted. Hos oss blir hvert brudd et punkt på kartet over skredet.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <BreakFigure />
            <p className="mt-2 text-sm text-slate-500">
              Lyset går rundt 200 000 kilometer i sekundet i glass. En tur fram og tilbake på 3,8 milliondels sekund
              betyr at bruddet er 382 meter ute.
            </p>
          </Reveal>
        </div>

        {/* 3. Lytting */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Ear className="h-5 w-5" />
              </span>
              <h3 className="text-2xl font-bold text-slate-900">3. Lytting med fiber (DAS)</h3>
            </div>
            <p className="mt-4 max-w-3xl text-slate-600">
              Et lytteinstrument sender tusenvis av korte lyspulser i sekundet inn i en ledig fiber. Når bakken
              beveger seg, endrer lyset som kommer tilbake seg akkurat der. Slik blir én kabel til tusenvis av
              mikrofoner. Teknikken heter distribuert akustisk måling, forkortet DAS.
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

        {/* Prøvd i Norge */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <FlaskConical className="h-5 w-5 text-cyan-700" />
                Prøvd og testet
              </div>
              <ul className="mt-4 space-y-3 text-slate-600">
                {TESTED.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-600" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl bg-gradient-to-br from-cyan-900 to-slate-900 p-6 text-cyan-50">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Sparkles className="h-5 w-5 text-amber-300" />
                Det nye hos oss
              </div>
              <p className="mt-4 text-lg">
                Alle eksemplene er faste anlegg som skal oppdage skred før eller mens de går, på vei og bane.
              </p>
              <p className="mt-3 text-lg">
                Vi har ikke funnet noen som bruker fiberen i selve redningsaksjonen, eller som tegner skredet ut fra
                bruddene. Det er den nye jobben vi gir fiberen: å bli kartet og ørene til redningsmannskapene, der
                skredet faktisk har gått.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
