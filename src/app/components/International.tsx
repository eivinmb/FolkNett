import React from "react";
import Ref from "./Ref";

const STEPS: { place: string; title: string; body: React.ReactNode }[] = [
  {
    place: "Finnmark",
    title: "Vi starter der problemet er i dag",
    body: (
      <>
        GPS forstyrres nesten daglig <Ref n={8} />, så kartet gjør nytte fra første dag.
      </>
    ),
  },
  {
    place: "Norge",
    title: "En del av den nasjonale tidstjenesten",
    body: (
      <>
        Sjekken bygges inn i tidstjenesten som Nkom og Justervesenet utreder <Ref n={4} />.
      </>
    ),
  },
  {
    place: "Norden",
    title: "Et felles tidsnett over grensene",
    body: (
      <>
        Vi kobler oss på Sveriges tidsnoder <Ref n={6} />. Finland krever allerede at mobilnettene skal tåle to uker uten GNSS{" "}
        <Ref n={28} />.
      </>
    ),
  },
  {
    place: "Europa",
    title: "Kart som henger sammen",
    body: "En solstorm treffer alle land samtidig. Derfor tror vi kartene bør kobles sammen på tvers av grensene.",
  },
];

export default function International() {
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {STEPS.map((s, i) => (
        <li key={s.place} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">{i + 1}</span>
            {s.place}
          </div>
          <div className="mt-3 font-semibold text-slate-900">{s.title}</div>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
