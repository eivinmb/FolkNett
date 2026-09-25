"use client";

import { ArrowRight, Cable, Handshake, Lightbulb, TriangleAlert } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const CARDS = [
  {
    icon: TriangleAlert,
    question: "Hva har skjedd?",
    answer:
      "Et kvikkleireskred går i et boligfelt i Trøndelag en vinternatt. Ingen vet hvor stort det er, eller om mer vil rase.",
    href: "#krisen",
    link: "Til krisen",
  },
  {
    icon: Cable,
    question: "Hvilken sivil teknologi?",
    answer: "Fibernettet som allerede ligger i gatene, og verktøy for å finne brudd og lytte med fiber.",
    href: "#teknologien",
    link: "Til teknologien",
  },
  {
    icon: Lightbulb,
    question: "Hvordan brukes den på en ny måte?",
    answer:
      "Bruddene tegner skredet på minutter, fiberen rundt kanten varsler mannskapene, og målingene viser når folk kan flytte hjem.",
    href: "#losningen",
    link: "Til løsningen",
  },
  {
    icon: Handshake,
    question: "Hvem må samarbeide?",
    answer: "Fiberoperatørene, NVE, nødetatene og kommunen, pluss en ny vaktordning vi kaller Fiberlytterne.",
    href: "#samarbeid",
    link: "Til samarbeidet",
  },
];

const GOALS = ["Beskytter mennesker", "Får samfunnet raskere tilbake i normal drift"];

export default function CaseSummary() {
  return (
    <section id="casen" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Casen"
          title="Casen på 30 sekunder"
          lead="Én idé: fibernettet som allerede ligger der folk bor, får en ny jobb når et kvikkleireskred går."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ icon: Icon, question, answer, href, link }, i) => (
            <Reveal key={question} delay={i * 0.08} className="h-full">
              <a
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-cyan-400 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-500">Spørsmål {i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{question}</h3>
                <p className="mt-2 flex-1 text-slate-600">{answer}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-700">
                  {link}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
          <span className="mr-1 font-semibold text-slate-700">Målene i oppgaven vi svarer på:</span>
          {GOALS.map((goal) => (
            <span key={goal} className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-800 ring-1 ring-emerald-200">
              {goal}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
