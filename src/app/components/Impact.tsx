"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const COMPARISON = [
  {
    topic: "Første oversikt",
    before: "Over en time. Første helhetsbilde kom fra et politihelikopter med nattbriller klokka 05.09.",
    after: "Minutter. Bruddene tegner et første omriss før helikopteret er i lufta.",
  },
  {
    topic: "Varsel til mannskapene",
    before: "Mannskapene så etter sprekker i asfalten og lyttet selv.",
    after: "Varsel på sambandet når grunnen beveger seg.",
  },
  {
    topic: "Søk fra bakken",
    before: "Startet etter 48 timer.",
    after: "Rolige målinger gir et bedre grunnlag for å starte tidligere, med lyttingen som vakt.",
  },
  {
    topic: "Hjem igjen",
    before: "Området ble erklært trygt i august 2023.",
    after: "Målinger døgnet rundt gir grunnlag for å friskmelde soner etter tur.",
  },
];

const TABLE_HEAD = ["", "Fiber i gata", "Helikopter", "Drone", "Nye sensorer"];

const TABLE_ROWS: { label: string; cells: [string, string, string, string] }[] = [
  { label: "Er på plass når skredet går", cells: ["Ja", "Nei, må fly inn", "Nei, må hentes", "Nei, må monteres"] },
  { label: "Virker i mørke, sludd og vind", cells: ["Ja", "Begrenset", "Begrenset", "Ja"] },
  { label: "Måler bevegelse i grunnen døgnet rundt", cells: ["Ja", "Nei", "Nei", "Ja, der de står"] },
  { label: "Krever folk på farlig grunn", cells: ["Nei", "Nei", "Nei", "Ja, for å montere"] },
  { label: "Ser hele skredet ovenfra", cells: ["Nei, bare langs kablene", "Ja", "Ja", "Nei"] },
];

function cellTone(value: string, positiveIsYes: boolean) {
  const yes = value.startsWith("Ja");
  const no = value.startsWith("Nei");
  if (!yes && !no) return "text-amber-700";
  return yes === positiveIsYes ? "text-emerald-700" : "text-rose-700";
}

export default function Impact() {
  const reduce = useReducedMotion();

  return (
    <section id="effekt" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Effekt"
          title="Hvorfor det utgjør en forskjell"
          lead="Vi sammenligner med Gjerdrum i 2020. Kolonnen til høyre viser målene våre, ikke løfter, men alle bygger på teknologi som finnes i dag."
        />

        <Reveal className="mt-10">
          <div className="rounded-2xl bg-slate-900 p-6 text-slate-200 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Tid til første oversikt over skredet
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Gjerdrum 2020</span>
                  <span className="font-mono">73 minutter</span>
                </div>
                <div className="mt-1 h-4 rounded-full bg-slate-800">
                  <motion.div
                    className="h-4 rounded-full bg-rose-500"
                    initial={{ width: reduce ? "100%" : "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Med Bakken som lytter (mål)</span>
                  <span className="font-mono">under 15 minutter</span>
                </div>
                <div className="mt-1 h-4 rounded-full bg-slate-800">
                  <motion.div
                    className="h-4 rounded-full bg-cyan-400"
                    initial={{ width: reduce ? "20%" : "0%" }}
                    whileInView={{ width: "20%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Gjerdrum: skredet gikk 03.56, første helhetsbilde 05.09 (Hovedredningssentralen 2021).
            </p>
          </div>
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200">
          <div className="hidden grid-cols-[1fr_1.4fr_1.4fr] bg-slate-100 text-sm font-semibold text-slate-600 md:grid">
            <div className="p-4" />
            <div className="p-4">Gjerdrum 2020</div>
            <div className="p-4 text-cyan-800">Med Bakken som lytter</div>
          </div>
          {COMPARISON.map((row, i) => (
            <Reveal key={row.topic} delay={i * 0.05}>
              <div className="grid gap-2 border-t border-slate-200 p-4 md:grid-cols-[1fr_1.4fr_1.4fr] md:gap-0 md:p-0">
                <div className="font-semibold text-slate-900 md:p-4">{row.topic}</div>
                <div className="text-slate-600 md:p-4">
                  <span className="font-semibold text-slate-500 md:hidden">Gjerdrum 2020: </span>
                  {row.before}
                </div>
                <div className="text-slate-800 md:bg-cyan-50/60 md:p-4">
                  <span className="font-semibold text-cyan-800 md:hidden">Med fiber: </span>
                  {row.after}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mt-16 text-2xl font-bold text-slate-900 md:text-3xl">
          Hvorfor fiber, og ikke bare helikopter og droner?
        </h3>
        <Reveal className="mt-6">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  {TABLE_HEAD.map((h, i) => (
                    <th key={h || "tom"} className={`p-4 font-semibold ${i === 1 ? "text-cyan-800" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => {
                  const positiveIsYes = row.label !== "Krever folk på farlig grunn";
                  return (
                    <tr key={row.label} className="border-t border-slate-200">
                      <td className="p-4 font-medium text-slate-900">{row.label}</td>
                      {row.cells.map((cell, i) => (
                        <td
                          key={`${row.label}-${i}`}
                          className={`p-4 font-medium ${cellTone(cell, positiveIsYes)} ${i === 0 ? "bg-cyan-50/60" : ""}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Fiberen erstatter ikke helikopter, droner og geoteknikere. Den fyller hullet de ikke dekker: bakken, døgnet
          rundt, fra første minutt.
        </p>
      </div>
    </section>
  );
}
