"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import CaseSummary from "./components/CaseSummary";
import Scenario from "./components/Scenario";
import Problem from "./components/Problem";
import Technology from "./components/Technology";
import Solution from "./components/Solution";
import CommandMap from "./components/CommandMap";
import SectionHeading from "./components/SectionHeading";
import Cooperation from "./components/Cooperation";
import Impact from "./components/Impact";
import Feasibility from "./components/Feasibility";
import AboutUs from "./components/AboutUs";
import Sources from "./components/Source";

const NAV = [
  { id: "casen", label: "Casen" },
  { id: "krisen", label: "Krisen" },
  { id: "teknologien", label: "Teknologien" },
  { id: "losningen", label: "Løsningen" },
  { id: "prototype", label: "Prototype" },
  { id: "samarbeid", label: "Samarbeid" },
  { id: "effekt", label: "Effekt" },
  { id: "gjennomforing", label: "Gjennomføring" },
  { id: "team", label: "Team" },
];

const NAV_IDS = NAV.map((item) => item.id);

function useSectionSpy(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function StickyNav({ active }: { active: string }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <a href="#top" className="hidden flex-none font-semibold text-white sm:block">
          Bakken som lytter
        </a>
        <div className="no-scrollbar ml-auto flex items-center gap-1 overflow-x-auto">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
                active === item.id
                  ? "bg-cyan-400 font-semibold text-slate-950"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function Page() {
  const active = useSectionSpy(NAV_IDS);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <StickyNav active={active} />
      <main>
        <Hero />
        <CaseSummary />
        <Scenario />
        <Problem />
        <Technology />
        <Solution />

        <section id="prototype" className="bg-slate-950 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading
              dark
              kicker="Prototype"
              title="Innsatsleders kart"
              lead="Slik kan nettbrettet til innsatsleder se ut. Kartet spiller av natten og ukene etter skredet, og du kan bla selv med knappene."
            />
            <div className="mt-10">
              <CommandMap />
            </div>
          </div>
        </section>

        <Cooperation />
        <Impact />
        <Feasibility />

        <section id="team" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading
              kicker="Teamet"
              title="Dream Bernoulli"
              lead="Fem studenter ved NTNU."
            />
            <AboutUs />
          </div>
        </section>

        <Sources />

        <section className="bg-white pb-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
              <p className="font-semibold text-slate-900">Bruk av KI</p>
              <p className="mt-2">
                Fiber som teknologi er vår idé fra i fjor, og det er vi som har valgt skred som case og vurdert og
                videreutviklet løsningen. KI (Claude) er brukt til research, sparring om case og løsning, renskriving
                og koding. Hele loggen ligger i KI_LOGG.md.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500">
          © 2026 Bakken som lytter · Dream Bernoulli · Your Extreme 2026
        </div>
      </footer>
    </div>
  );
}
