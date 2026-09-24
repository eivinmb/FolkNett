import React from "react";
import Ref from "./Ref";

const FLOW = [
  { n: "1", title: "Atomklokker", body: "Justervesenet har Norges offisielle tid." },
  { n: "2", title: "Fiberklokka", body: "Tida sendes gjennom fiber og er ikke avhengig av satellitter." },
  { n: "3", title: "Målepunkter", body: "Master og bygg sammenligner GPS-tid med fibertid hvert minutt." },
  { n: "4", title: "Tillitskart", body: "Hvert område blir grønt, gult eller rødt." },
];

const STATUS = [
  { color: "bg-emerald-500", label: "Grønn", text: "Avviket er under 100 nanosekunder. GPS kan brukes som vanlig." },
  { color: "bg-amber-500", label: "Gul", text: "Noe er usikkert, så systemene bruker fiberklokka som fasit." },
  { color: "bg-rose-500", label: "Rød", text: "Avviket er over ett mikrosekund, eller signalet er borte. Systemene bytter til fibertid, og nødetatene får beskjed." },
];

export default function Solution() {
  return (
    <div className="space-y-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-slate-600">
          <p>
            <span className="font-semibold text-slate-900">Den første jobben er å være Norges klokke.</span> Tid fra
            Justervesenets atomklokker sendes gjennom fibernettet, slik Sverige allerede gjør <Ref n={6} />. Nkom og
            Justervesenet utreder det samme for Norge nå <Ref n={4} />
            <Ref n={5} />, så vi er ikke alene om å tenke i denne retningen.
          </p>
          <p>
            <span className="font-semibold text-slate-900">Den andre jobben er den vi har brukt mest tid på:</span> å bruke
            fibertida til å sjekke GPS. Mobilmaster, trafostasjoner, DAB-sendere og kaianlegg som har både GPS og fiber, blir
            målepunkter. Hvert minutt sammenligner de de to klokkene. Er det avvik, er GPS forstyrret eller forfalsket
            akkurat der.
          </p>
          <p>
            Det vi liker best med løsningen, er at et falskt GPS-signal kan se helt normalt ut, mens tida likevel avslører
            det. Fiberklokka ligger i bakken og kan ikke forfalskes fra lufta.
          </p>
        </div>

        <div className="space-y-3">
          {STATUS.map((s) => (
            <div key={s.label} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className={`mt-1 h-4 w-4 shrink-0 rounded-full ${s.color}`} />
              <div>
                <div className="font-semibold text-slate-900">{s.label}</div>
                <div className="text-slate-600">{s.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ol className="grid gap-4 md:grid-cols-4">
        {FLOW.map((f) => (
          <li key={f.n} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {f.n}
            </div>
            <div className="mt-3 font-semibold text-slate-900">{f.title}</div>
            <div className="mt-1 text-sm text-slate-600">{f.body}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
