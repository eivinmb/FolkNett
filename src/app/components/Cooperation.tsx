"use client";

import { Building2, Cable, Ear, Flame, Landmark, Mountain, Radio, ShieldCheck, type LucideIcon } from "lucide-react";
import DataFlow from "./DataFlow";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Actor = { icon: LucideIcon; name: string; who?: string; before: string; during: string; isNew?: boolean };

const ACTORS: Actor[] = [
  {
    icon: Cable,
    name: "Fiberoperatørene",
    who: "Telenor, Telia, Altibox og de lokale selskapene",
    before: "Avtaler hvilke ledige fibre som kan lånes, og gjør kabelkartene klare til sikker deling.",
    during: "Måler bruddene fra noden og kobler Fiberlytterne til ledige fibre.",
  },
  {
    icon: Radio,
    name: "Nkom",
    before: "Gjør avtalen til en del av beredskapskravene for ekomnettet.",
    during: "Hjelper til når flere operatører må bidra samtidig.",
  },
  {
    icon: Ear,
    name: "Fiberlytterne",
    who: "Ny vaktordning med fagfolk fra NORSAR, NGI og NTNU",
    before: "Eier instrumentene, utvikler programvaren og øver med nødetatene.",
    during: "Rykker ut, kobler seg på og tolker signalene sammen med NVE.",
    isNew: true,
  },
  {
    icon: Mountain,
    name: "NVE",
    before: "Deler kart over kvikkleireområder og peker ut boligfelt som bør forberedes.",
    during: "Tolker målingene og gir råd om søk, sikring og hjemflytting.",
  },
  {
    icon: ShieldCheck,
    name: "Politiet",
    before: "Tar kartet inn i planverket for skredaksjoner.",
    during: "Innsatsleder bruker kartet til å styre innsatsen og passe på mannskapene.",
  },
  {
    icon: Flame,
    name: "Brann og redning",
    before: "Øver på å jobbe med lyttevarsler.",
    during: "Får varsler på sambandet og trekker seg tilbake når grunnen beveger seg.",
  },
  {
    icon: Building2,
    name: "Kommunen",
    before: "Kjenner sine kvikkleireområder og sørger for lokale avtaler.",
    during: "Tar vare på de evakuerte og bruker målingene når folk skal flytte hjem.",
  },
  {
    icon: Landmark,
    name: "Hovedredningssentralen og DSB",
    before: "Tar lytting og bruddkart inn i nasjonale planer og øvelser.",
    during: "Koordinerer, evaluerer og deler erfaringene.",
  },
];

export default function Cooperation() {
  return (
    <section id="samarbeid" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Spørsmål 4 av 4"
          title="Hvem må samarbeide?"
          lead="Teknologien finnes allerede. Det som mangler, er at de riktige aktørene har avtalt på forhånd hvem som gjør hva. Vi foreslår én ny rolle: Fiberlytterne, et lite vaktteam med instrumenter og fagfolk."
        />

        <Reveal className="mt-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500">
            Slik går informasjonen fra kabelen til beslutningen
          </p>
          <DataFlow />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ACTORS.map(({ icon: Icon, name, who, before, during, isNew }, i) => (
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
                  <div>
                    <p className="font-bold leading-tight text-slate-900">{name}</p>
                    {isNew ? <p className="text-xs font-semibold text-emerald-700">Ny rolle</p> : null}
                  </div>
                </div>
                {who ? <p className="mt-2 text-sm text-slate-500">{who}</p> : null}
                <dl className="mt-3 space-y-2 text-sm">
                  <div>
                    <dt className="font-semibold text-slate-700">Før krisen</dt>
                    <dd className="text-slate-600">{before}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-700">Når skredet går</dt>
                    <dd className="text-slate-600">{during}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
