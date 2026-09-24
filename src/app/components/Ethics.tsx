import { Eye, Layers, ShieldCheck, Scale } from "lucide-react";

const PRINCIPLES = [
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Ingen persondata",
    body: "Kartet sier noe om hvor GPS kan stoles på, aldri om hvem som er der. Vi samler ikke inn noe fra mobiler eller biler.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "To nivåer av tilgang",
    body: "Et detaljert kart kan vise hvor infrastrukturen er sårbar. Vi mener nødetatene og de som eier infrastrukturen skal se alt, mens folk flest får et grovere kart per region.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Unngå falske alarmer",
    body: "Et rødt varsel som ikke stemmer, kan skape uro. Derfor må flere målepunkter i samme område være enige før det blir rødt, og det må være stabilt en stund før det blir grønt igjen. Alt blir logget.",
  },
  {
    icon: <Scale className="h-5 w-5" />,
    title: "Sivilt og åpent",
    body: "Løsningen bygger på sivil teknologi og skal eies av sivile etater. Målet er å beskytte folk og holde samfunnet i gang.",
  },
];

export default function Ethics() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {PRINCIPLES.map((p) => (
        <div key={p.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-fit rounded-lg bg-blue-50 p-2 text-blue-600">{p.icon}</div>
          <div>
            <h3 className="font-semibold text-slate-900">{p.title}</h3>
            <p className="mt-1 leading-relaxed text-slate-600">{p.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
