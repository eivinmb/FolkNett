import React from "react";
import { Check, Sparkles, AlertTriangle } from "lucide-react";
import Ref from "./Ref";

const EXISTING: React.ReactNode[] = [
  <>
    Tid over fiber finnes allerede i Sverige <Ref n={6} /> og Storbritannia <Ref n={29} />, og det utredes i Norge{" "}
    <Ref n={4} />.
  </>,
  <>
    Det finnes utstyr som sammenligner GPS med tid fra nettverket <Ref n={30} />, men da bare på ett sted og inne i ett
    selskaps nett. Et av produktene ble testet på Jammertest i Norge i 2024 <Ref n={24} />.
  </>,
  <>
    Qualcomm tok patent i 2012 på å lage kart over GPS-forstyrrelser fra basestasjoner <Ref n={25} />, og Finland har et
    nasjonalt nett som finner forstyrrelser <Ref n={27} />. Begge måler radiosignaler, ikke tid.
  </>,
  <>
    Kartverket har et kart som viser hvordan solstormer påvirker GPS-posisjonen i Norge <Ref n={26} />.
  </>,
  <>
    Forskere har foreslått lignende sjekker, både i mobilnett og med tid sendt over wifi. Forslaget for mobilnett er så
    langt bare testet i simuleringer <Ref n={18} />
    <Ref n={19} />.
  </>,
];

const CHALLENGES = [
  "Ikke all fiber kan bære så presis tid uten ekstra utstyr og kalibrering.",
  "Konkurrerende operatører må bli enige om å dele målinger.",
  "Utstyret som sender tida, må ha reservestrøm.",
  "Kartet kan være sensitivt og kan ikke være helt åpent for alle.",
  "Skip på havet og fly i lufta får ikke direkte hjelp. De trenger egne løsninger.",
  "Vi kan ikke utelukke at operatørene har interne verktøy som ligner. Det ville vi sjekket med Nkom som neste steg.",
];

export default function Feasibility() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Finnes dette fra før?</h3>
        <p className="mt-2 text-slate-600">Vi lette grundig, og fant flere ting som ligner:</p>
        <ul className="mt-4 space-y-3 text-slate-600">
          {EXISTING.map((e, i) => (
            <li key={i} className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-3 rounded-xl bg-blue-50 p-4 text-slate-700">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
          <p>
            <span className="font-semibold text-slate-900">Det vi ikke fant,</span> var noen som setter bitene sammen. Vi vil
            bruke Norges egen fiberklokke som fasit for ett felles kart over hele landet, på tvers av operatører og sektorer.
            Kartet skal deles med nødetatene og brukes gjennom hele krisen, også for å avgjøre når det er trygt å gå tilbake
            til GPS. Kartverket viser hvordan posisjonen påvirkes. Vi vil vise hvordan tida påvirkes.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Det som blir vanskelig</h3>
        <ul className="mt-5 space-y-3 text-slate-600">
          {CHALLENGES.map((c) => (
            <li key={c} className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
