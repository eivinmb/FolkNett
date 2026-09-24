import Ref from "./Ref";

const items = [
  {
    sdg: 3,
    title: "God helse og livskvalitet",
    body: "Når operatørene vet hvor GPS kan være feil, blir ambulansene og luftambulansen sendt riktig vei.",
    image: "/sdg/goal3.png",
    ref: 20,
  },
  {
    sdg: 9,
    title: "Industri, innovasjon og infrastruktur",
    body: "Vi bygger ikke noe nytt, men gir fibernett og GPS-mottakere som allerede finnes, en ny oppgave.",
    image: "/sdg/goal9.png",
    ref: 21,
  },
  {
    sdg: 11,
    title: "Bærekraftige byer og lokalsamfunn",
    body: "Mobilnett, strømnett og radio kan holde seg i gang lokalt selv om satellittene svikter.",
    image: "/sdg/goal11.png",
    ref: 22,
  },
  {
    sdg: 16,
    title: "Velfungerende institusjoner",
    body: "Når alle etatene ser det samme kartet, blir det lettere å ta gode beslutninger og å stole på hverandre i en krise.",
    image: "/sdg/goal16.png",
    ref: 23,
  },
];

export default function Sustainability() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article key={item.sdg} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <img src={item.image} alt={`FNs bærekraftsmål ${item.sdg}`} className="h-16 w-16 rounded-lg" loading="lazy" />
          <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            {item.body} <Ref n={item.ref} />
          </p>
        </article>
      ))}
    </div>
  );
}
