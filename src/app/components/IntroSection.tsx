import { AlertTriangle, Lightbulb, Clock } from "lucide-react";
import Ref from "./Ref";

const ITEMS = [
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "Problemet",
    body: "Mye av det som må virke i en krise, fra mobilnettet til ambulansen, bruker GPS for å vite hva klokka er eller hvor ting er. Det skumle er at en forstyrret GPS ofte ikke merkes. Den gir bare feil svar.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Løsningen",
    body: "Vi vil sende Norges offisielle tid gjennom fibernettet og sammenligne den med GPS-tida på steder over hele landet. Blir avviket for stort, lyser området rødt på et kart, og da vet alle at de ikke skal stole på GPS der.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Hvorfor nå",
    body: (
      <>
        Dette er ikke bare teori. GPS forstyrres nesten daglig i Øst-Finnmark <Ref n={8} />, og både FFI <Ref n={2} /> og Nkom{" "}
        <Ref n={4} /> har pekt på at Norge mangler en reserve for satellitt-tid.
      </>
    ),
  },
];

export default function IntroSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {ITEMS.map((it) => (
        <div key={it.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="inline-flex rounded-lg bg-blue-50 p-2 text-blue-600">{it.icon}</div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">{it.title}</h3>
          <p className="mt-2 leading-relaxed text-slate-600">{it.body}</p>
        </div>
      ))}
    </div>
  );
}
