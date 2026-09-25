"use client";

import { Building2, Cable, Ear, Flame, Landmark, Mountain, ShieldCheck, type LucideIcon } from "lucide-react";
import DataFlow from "./DataFlow";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Actor = { icon: LucideIcon; name: string; role: string; isNew?: boolean };

const ACTORS: Actor[] = [
  {
    icon: Cable,
    name: "Fiberoperatørene og Nkom",
    role: "Låner ut fibre i krisen, måler bruddene og deler kabelkart. Nkom gjør det til et beredskapskrav.",
  },
  {
    icon: Ear,
    name: "Fiberlytterne",
    role: "Nytt vaktteam fra NORSAR, NGI og NTNU som eier instrumentene, rykker ut og tolker signalene.",
    isNew: true,
  },
  {
    icon: Mountain,
    name: "NVE",
    role: "Peker ut boligfelt på kvikkleire og gir råd om søk, sikring og hjemflytting.",
  },
  {
    icon: ShieldCheck,
    name: "Politiet",
    role: "Innsatsleder bruker kartet til å styre innsatsen og passe på mannskapene.",
  },
  {
    icon: Flame,
    name: "Brann og redning",
    role: "Får varslene på sambandet og øver på å jobbe med dem.",
  },
  {
    icon: Building2,
    name: "Kommunen",
    role: "Tar vare på de evakuerte og bruker målingene når folk skal flytte hjem.",
  },
  {
    icon: Landmark,
    name: "Hovedredningssentralen og DSB",
    role: "Tar ordningen inn i nasjonale planer og øvelser.",
  },
];

export default function Cooperation() {
  return (
    <section id="samarbeid" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Spørsmål 4 av 4"
          title="Hvem må samarbeide?"
          lead="Teknologien finnes. Det som mangler, er avtaler om hvem som gjør hva, og én ny rolle: Fiberlytterne."
        />

        <Reveal className="mt-10">
          <DataFlow />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ACTORS.map(({ icon: Icon, name, role, isNew }, i) => (
            <Reveal key={name} delay={(i % 4) * 0.06} className="h-full">
              <div
                className={`flex h-full flex-col rounded-2xl border p-5 ${
                  isNew ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${
                      isNew ? "bg-emerald-600 text-white" : "bg-slate-900 text-cyan-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-bold leading-tight text-slate-900">{name}</p>
                </div>
                <p className="mt-3 text-sm text-slate-600">{role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
