import React from "react";
import { Cable, Atom, RadioTower, ArrowRight } from "lucide-react";
import Ref from "./Ref";

const CARDS = [
  {
    icon: <Cable className="h-6 w-6" />,
    title: "Fibernettet",
    madeFor: "Internett og TV",
    newJob: "Bærer Norges offisielle tid",
    body: "Fiber er tynne tråder av glass som leder lys. Glass leder ikke strøm, og derfor bryr fiberen seg ikke om magnetstormer.",
  },
  {
    icon: <Atom className="h-6 w-6" />,
    title: "Presis tid over fiber",
    madeFor: "Å få partikkelakseleratorene ved CERN og mastene i mobilnettet til å gå i takt",
    newJob: "En nasjonal klokke i fibernettet",
    body: (
      <>
        Teknikken ble laget ved CERN, og hvem som helst kan bruke den. Den sender tid gjennom fiber med under en
        milliarddels sekunds nøyaktighet <Ref n={7} />.
      </>
    ),
  },
  {
    icon: <RadioTower className="h-6 w-6" />,
    title: "GPS-mottakere i master og bygg",
    madeFor: "Å hente tid til mobilnett, strømnett og radio",
    newJob: "Målepunkter som avslører når GPS lyver",
    body: "Tusenvis av bygg har allerede en GPS-mottaker på taket og fiber i veggen. Vi trenger ikke sette opp noe nytt, bare programvare som sammenligner de to.",
  },
];

export default function Technology() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {CARDS.map((c) => (
        <div key={c.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="inline-flex w-fit rounded-lg bg-blue-50 p-2.5 text-blue-600">{c.icon}</div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">{c.title}</h3>
          <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
            <div className="text-slate-500">
              <span className="font-medium text-slate-700">Laget for:</span> {c.madeFor}
            </div>
            <div className="flex items-start gap-1.5 font-medium text-blue-700">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
              {c.newJob}
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-slate-600">{c.body}</p>
        </div>
      ))}
    </div>
  );
}
