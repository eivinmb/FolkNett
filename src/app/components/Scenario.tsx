"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, History, Users } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const TIMELINE = [
  {
    time: "03.52",
    text: "Etter en våt høst glir skråningen ved bekken ut, og skredet spiser seg bakover mot husene.",
  },
  {
    time: "03.55",
    text: "Strømmen går. De første meldingene kommer til 113. Ingen vet om det er tre hus eller tretti.",
  },
  {
    time: "04.10",
    text: "I sludd og mørke går mannskapene fra dør til dør, mens mindre ras går fra kanten.",
  },
  {
    time: "Døgn 1 til 3",
    text: "Savnede ligger i skredgropa, men ingen vet om grunnen er trygg nok til å søke fra bakken.",
  },
  {
    time: "Uke 1 og utover",
    text: "Over tusen evakuerte venter på å få vite når det er trygt å flytte hjem.",
  },
];

const AFFECTED = [
  "Rundt 1200 innbyggere, de fleste sover",
  "Beboerne på omsorgssenteret",
  "Redningsmannskapene på ustabil grunn",
  "Kommunen, som tar vare på de evakuerte",
];

export default function Scenario() {
  const reduce = useReducedMotion();

  return (
    <section id="krisen" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Spørsmål 1 av 4"
          title="Hva har skjedd?"
          lead="Elvelia er et oppdiktet boligfelt på kvikkleire i Trøndelag, men alt som skjer i scenarioet har skjedd før."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <ol className="relative border-l-2 border-slate-200 pl-8">
            {TIMELINE.map((item, i) => (
              <motion.li
                key={item.time}
                className="reveal relative pb-8 last:pb-0"
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <span
                  className={`absolute -left-[43px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    i === 0 ? "border-rose-500 bg-rose-100" : "border-slate-300 bg-white"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-rose-500" : "bg-slate-400"}`} />
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
                  Den akutte fasen i timer, redningen i dager og evakueringen i uker eller måneder.
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
                  Gjerdrum, 30. desember 2020: Et kvikkleireskred tok 31 boliger. Ti mennesker og et ufødt barn
                  omkom, og over 1500 ble evakuert.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
