"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Ear, House, Map as MapIcon, ShieldCheck, Wrench } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const PHASES = [
  {
    icon: ShieldCheck,
    when: "Før krisen",
    title: "Forberedt",
    color: "bg-slate-800 text-slate-100",
    text: "Staten og fiberoperatørene inngår en beredskapsavtale om å låne ledige fibre og dele bruddmålinger i en krise. Et vaktteam vi kaller Fiberlytterne har lytteinstrumenter klare i hver region. NVEs kart over kvikkleire legges over fiberkartet, så vi vet på forhånd hvilke boligfelt vi kan lytte i, og fra hvilken node.",
  },
  {
    icon: MapIcon,
    when: "Minutt 0 til 15",
    title: "Bruddene tegner skredet",
    color: "bg-rose-600 text-white",
    text: "Når grunnen raser ut, ryker kablene i gatene. Operatøren måler fra noden hvor langt ute hvert brudd er, automatisk eller med en tekniker på vakt. Punktene legges på kabelkartet og tegner omrisset av skredet, og tidspunktene viser hvilken vei det vokser. Kartet går til innsatsleder, AMK og helikopteret.",
  },
  {
    icon: Ear,
    when: "Time 1 til døgn 3",
    title: "Fiberen lytter for mannskapene",
    color: "bg-emerald-600 text-white",
    text: "Fiberlytterne kobler et lytteinstrument på de hele fibrene rundt skredet, fra noden og trygt unna faresonen. Programvaren skiller helikopter og aggregater fra bevegelse i grunnen. Begynner bakken å røre seg, går varselet rett ut på sambandet. Rolige målinger over tid gir innsatsleder et bedre grunnlag for å starte søket fra bakken.",
  },
  {
    icon: House,
    when: "Uke 1 og utover",
    title: "Fiberen vokter hjemmene",
    color: "bg-cyan-600 text-white",
    text: "Lyttingen fortsetter døgnet rundt mens skråningen sikres. NVE og geoteknikerne får målinger fra hele kanten, og kommunen kan friskmelde sonene etter tur. Folk kommer hjem tidligere, og med bedre grunn til å føle seg trygge.",
  },
];

const ADAPTATIONS = [
  "En beredskapsavtale mellom staten og operatørene om lån av fiber og deling av bruddmålinger og kabelkart.",
  "Programvare som legger brudd og lytting på ett kart, og som skiller støy fra bevegelse i grunnen.",
  "Varsler som går rett ut på Nødnett til innsatsleder og mannskaper.",
  "Et vaktteam med instrumenter i hver region, som rykker ut slik redningslagene gjør.",
  "Øvelser, så lytting og bruddkart blir en fast del av planverket for kvikkleireskred.",
];

export default function Solution() {
  const reduce = useReducedMotion();

  return (
    <section id="losningen" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Spørsmål 3 av 4"
          title="Hvordan brukes teknologien på en ny måte?"
          lead="Fiberen får tre nye jobber, og alle starter i det øyeblikket skredet går. De virker fordi noe er forberedt på forhånd."
        />

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-7 hidden h-1 rounded-full bg-slate-200 lg:block" />
          <motion.div
            className="absolute left-0 top-7 hidden h-1 rounded-full bg-gradient-to-r from-slate-700 via-rose-500 to-cyan-500 lg:block"
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

        <Reveal delay={0.1}>
          <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Wrench className="h-5 w-5 text-cyan-700" />
              Dette må tilpasses
            </div>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {ADAPTATIONS.map((line) => (
                <li key={line} className="flex gap-2 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-600" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
