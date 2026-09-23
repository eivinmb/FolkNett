"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import CaseSummary from "./components/CaseSummary";

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
      </main>
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500">
          © 2026 Bakken som lytter · Dream Bernoulli · Your Extreme 2026
        </div>
      </footer>
    </div>
  );
}
