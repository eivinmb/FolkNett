import { Phone, ShieldAlert, RadioTower, Plane, Anchor, Building2 } from "lucide-react";

const MAIN = [
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Nødnumrene og AMK",
    body: "Når du ringer 112, sender mobilen posisjonen din automatisk, og den kommer fra GPS. Er området rødt på kartet, vet operatøren at posisjonen kan være feil og spør heller hvor du er. AMK får samme beskjed om ambulansene.",
  },
  {
    icon: <ShieldAlert className="h-5 w-5" />,
    title: "Politiet og omvendt voldsalarm",
    body: "Personer med besøksforbud kan få fotlenke som bruker GPS. Blir GPS forstyrret, kan det gå falske alarmer, eller en ekte trussel kan bli oversett. Med kartet kan politiet se om det er hele området som er forstyrret.",
  },
  {
    icon: <RadioTower className="h-5 w-5" />,
    title: "Mobilnett og strømnett",
    body: "Når et målepunkt blir rødt, bytter mastene og strømnettet selv over til fibertid. Folk flest merker ingenting, og både mobilen og Nødvarsel fortsetter å virke.",
  },
];

const EXAMPLE = [
  { t: "14:02", text: "Tre målepunkter ved Kirkenes melder at GPS-tida ikke stemmer med fiberklokka. Området blir rødt." },
  { t: "14:02", text: "Mobilmastene i området bytter selv til fibertid, og mobilnettet holder seg oppe." },
  { t: "14:03", text: "Et 112-anrop kommer inn med en posisjon midt ute i fjorden. Operatøren ser det røde området og spør. Personen står egentlig på en gårdsvei tre kilometer unna." },
  { t: "14:05", text: "Luftambulansen får beskjed før den letter, og velger en innflyging som ikke bruker GPS." },
];

const OTHERS = [
  { icon: <Plane className="h-4 w-4" />, text: "Avinor og luftambulansen" },
  { icon: <Anchor className="h-4 w-4" />, text: "Kystverket" },
  { icon: <Building2 className="h-4 w-4" />, text: "Kriseledelsen i kommunene" },
];

export default function Preparedness() {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        {MAIN.map((m) => (
          <div key={m.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex rounded-lg bg-blue-50 p-2 text-blue-600">{m.icon}</div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{m.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{m.body}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-6 text-slate-200 shadow-sm lg:col-span-2">
          <div className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Eksempel</div>
          <h3 className="mt-2 text-xl font-semibold text-white">Kirkenes, en tirsdag i februar</h3>
          <ol className="mt-5 space-y-3">
            {EXAMPLE.map((e, i) => (
              <li key={i} className="grid grid-cols-[3.5rem_1fr] gap-3">
                <span className="font-mono text-sm text-cyan-300">{e.t}</span>
                <span>{e.text}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">Disse får også beskjed</h3>
          <ul className="mt-4 space-y-3 text-slate-600">
            {OTHERS.map((o) => (
              <li key={o.text} className="flex items-center gap-3">
                <span className="rounded-md bg-slate-100 p-1.5 text-slate-500">{o.icon}</span>
                {o.text}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            Kommunen kan også sende en enkel beskjed til innbyggerne: «Ikke stol på GPS i dag, ta med kart og kompass.»
          </p>
        </div>
      </div>
    </div>
  );
}
