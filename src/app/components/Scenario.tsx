"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, History, Users } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const TIMELINE = [
  {
    time: "Høsten før",
    text: "En uvanlig våt høst. Bekken graver seg stadig lenger inn i skråningen under boligfeltet.",
  },
  {
    time: "03.52",
    text: "Skråningen ved bekken glir ut. Kvikkleiren blir flytende, og skredet spiser seg bakover mot husene.",
  },
  {
    time: "03.55",
    text: "Strømmen går i hele feltet. De første meldingene kommer til 113. Ingen vet om det er tre hus eller tretti.",
  },
  {
    time: "04.10",
    text: "Brann og redning er på stedet. I sludd og mørke går mannskapene fra dør til dør og vekker folk, mens mindre ras går fra kanten.",
  },
  {
    time: "05.00",
    text: "Helikopteret har kjempet seg fram i dårlig vær. Kommunen evakuerer hele feltet og omsorgssenteret.",
  },
  {
    time: "Døgn 1 til 3",
    text: "Savnede ligger i skredgropa. Ingen vet om grunnen er stabil nok til å søke fra bakken.",
  },
  {
    time: "Uke 1 og utover",
    text: "Over tusen mennesker bor på hotell og hos familie mens geoteknikerne vurderer hvor det er trygt.",
  },
];

const AFFECTED = [
  "Rundt 1200 innbyggere, de fleste sover når skredet går",
  "Beboerne på omsorgssenteret, som trenger hjelp for å komme seg ut",
  "Redningsmannskapene, som må jobbe på grunn som kan rase ut",
  "Kommunen, som skal ta vare på over tusen evakuerte",
];

export default function Scenario() {
  const reduce = useReducedMotion();

  return (
    <section id="krisen" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Spørsmål 1 av 4"
          title="Hva har skjedd?"
          lead="Elvelia er et oppdiktet boligfelt i Trøndelag, men alt som skjer i scenarioet har skjedd før. Feltet har rundt 1200 innbyggere, et omsorgssenter og en bekk i bunnen av lia. Som mange boligområder i Trøndelag og på Østlandet ligger det på kvikkleire."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <ol className="relative border-l-2 border-slate-200 pl-8">
            {TIMELINE.map((item, i) => (
              <motion.li
                key={item.time}
                className="relative pb-8 last:pb-0"
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <span
                  className={`absolute -left-[43px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    i === 1 ? "border-rose-500 bg-rose-100" : "border-slate-300 bg-white"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${i === 1 ? "bg-rose-500" : "bg-slate-400"}`} />
                </span>
                <p className="font-mono text-sm font-semibold text-cyan-700">{item.time}</p>
                <p className="mt-1 text-slate-700">{item.text}</p>
              </motion.li>
            ))}
          </ol>

          <div className="space-y-5">
            <Reveal>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Users className="h-5 w-5 text-cyan-700" />
                  Hvem rammes?
                </div>
                <ul className="mt-3 space-y-2 text-slate-600">
                  {AFFECTED.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-600" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Clock className="h-5 w-5 text-cyan-700" />
                  Hvor lenge varer krisen?
                </div>
                <p className="mt-3 text-slate-600">
                  Den akutte fasen varer i timer, redningsaksjonen i dager og evakueringen i uker eller måneder.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-2xl bg-slate-900 p-6 text-slate-200">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <History className="h-5 w-5 text-amber-300" />
                  Dette har skjedd før
                </div>
                <p className="mt-3">
                  Gjerdrum, 30. desember 2020. Et kvikkleireskred tok 14 bygg med 31 boliger klokka 03.56. Ti
                  mennesker og et ufødt barn omkom, og over 1500 ble evakuert.
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  Casen vår bygger på lærdommene i Hovedredningssentralens evaluering av redningsaksjonen.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
