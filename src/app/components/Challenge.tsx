import React from "react";
import { RadioTower, Zap, Landmark } from "lucide-react";
import Ref from "./Ref";

const TIMELINE: { when: string; what: React.ReactNode }[] = [
  { when: "Kl. 10:00", what: "Et kraftig utbrudd på sola." },
  {
    when: "+ 8 minutter",
    what: (
      <>
        Radiostøy fra sola overdøver GPS-signalene på hele dagsiden av jorda. Det skjedde i mindre skala i 2006 <Ref n={10} />.
      </>
    ),
  },
  { when: "Samme dag", what: "Partikkelstormen treffer satellittene, og mange går i nødmodus eller blir skadet." },
  {
    when: "+ 1–2 døgn",
    what: (
      <>
        Magnetstormen bremser satellittene i lav bane. En moderat storm i 2022 kostet Starlink 38 av 49 nye satellitter{" "}
        <Ref n={11} />, og i mai 2024 måtte omtrent halvparten av satellittene i lav bane flytte seg samtidig <Ref n={12} />.
      </>
    ),
  },
  {
    when: "+ 2–3 døgn",
    what: (
      <>
        Når satellittene ikke lenger klarer å styre unna hverandre, regner forskere med at det første store sammenstøtet i lav bane kommer i løpet av to–tre døgn{" "}
        <Ref n={13} />.
      </>
    ),
  },
  { when: "Uker og måneder", what: "Navigasjonssatellittene som overlevde, er ustabile. Nye tar flere år å bygge." },
];

const CONSEQUENCES = [
  {
    icon: <RadioTower className="h-5 w-5" />,
    title: "Mobilnettet",
    body: "Mastene kommer ut av takt og forstyrrer hverandre, og mobilen slutter å virke. Det gjør også Nødvarsel.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Strømnettet",
    body: "Driftssentralene mister kontakten med sensorene de bruker for å holde balansen i strømnettet.",
  },
  {
    icon: <Landmark className="h-5 w-5" />,
    title: "Bankene",
    body: "Går klokka til en bank feil i forhold til Norges Bank, blir banken stengt ute fra handel og oppgjør.",
  },
];

export default function Challenge() {
  return (
    <div className="space-y-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-slate-600">
          <p>
            Vi har valgt en solstorm som krise. Tenk deg en helt vanlig tirsdag i februar der et kraftig utbrudd på sola
            treffer jorda. Det høres kanskje ut som science fiction, men det har skjedd før. I år 774 kom et utbrudd som var
            langt kraftigere enn noe vi har målt siden, og sporene kan fortsatt leses i årringene til gamle trær <Ref n={16} />. Sola er dessuten nettopp forbi toppen av sin
            elleveårige syklus <Ref n={17} />.
          </p>
          <p>
            Det som overrasket oss mest, var at det ikke hjelper å ha flere satellittsystemer. GPS, Galileo, GLONASS og
            BeiDou går i bane i det samme rommet, så en solstorm treffer alle på én gang. Og Norge får det verst, fordi
            forstyrrelsene er kraftigst langt nord.
          </p>
          <p>
            Hvert steg i tidslinjen har skjedd før, bare i mindre skala. I Øst-Finnmark trenger man ikke engang en solstorm.
            Der forsvinner GPS nesten hver dag på grunn av jamming <Ref n={8} />
            <Ref n={9} />.
          </p>
          <blockquote className="border-l-4 border-blue-600 pl-5 text-xl font-medium text-slate-900">
            Spørsmålet vi satt igjen med, var hvordan vi kan vite hvor GPS fortsatt er til å stole på, og holde viktige
            systemer i gang der den ikke er det.
          </blockquote>
        </div>

        <ol className="relative space-y-6 border-l-2 border-slate-200 pl-8">
          {TIMELINE.map((t) => (
            <li key={t.when} className="relative">
              <span className="absolute -left-[2.45rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-600 ring-2 ring-blue-100" />
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-600">{t.when}</div>
              <div className="mt-1 text-slate-700">{t.what}</div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Det er klokka som svikter først</h3>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-600">
          Før vi startet, trodde vi GPS mest handlet om kart og veibeskrivelser. Men mange av de viktigste systemene våre
          bruker GPS som klokke. DSB har selv analysert hva som skjer når den klokka går feil <Ref n={1} />.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {CONSEQUENCES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-rose-600">
                {c.icon}
                <span className="font-semibold text-slate-900">{c.title}</span>
              </div>
              <p className="mt-2 text-slate-600">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl leading-relaxed text-slate-600">
          Nødetatene er mest utsatt, og FFI vurderer sårbarheten deres som «middels til høy» <Ref n={2} />. Menon Economics har
          regnet ut at en uke uten satellittnavigasjon vil koste Norge rundt 3,4 milliarder kroner <Ref n={3} />. Det som
          bekymrer oss mest, er likevel ikke at GPS forsvinner. Det er når den gir feil svar uten at noen merker det.
        </p>
      </div>
    </div>
  );
}
