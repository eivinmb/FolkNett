"use client";

const SOURCES = [
  {
    title:
      "Hovedredningssentralen (2021): Evaluering av redningsaksjonen og den akutte krisehåndteringen under kvikkleireskredet på Gjerdrum",
    url: "https://www.hovedredningssentralen.no/wp-content/uploads/2025/03/NY-Rapport-Gjerdrum-Hovedredningssentralen-03-06-2021.pdf",
  },
  {
    title: "Wikipedia: Leirskredet i Gjerdrum 2020",
    url: "https://no.wikipedia.org/wiki/Leirskredet_i_Gjerdrum_2020",
  },
  {
    title: "NVE (2021): Redningsaksjon trappes ned, NVE fortsetter sin bistand",
    url: "https://www.nve.no/nytt-fra-nve/nyheter-skred-og-vassdrag/redningsaksjon-trappes-ned-nve-fortsetter-sin-bistand/",
  },
  {
    title: "Nkom (2025): Husstandsdekning for fast bredbånd 2024",
    url: "https://www.nkom.no/aktuelt/husstandsdekning-for-fast-bredband-2024-regionale-og-nasjonale-tall",
  },
  {
    title: "NTNU: Senter for geofysisk overvaking og varsling (CGF)",
    url: "https://www.ntnu.no/cgf",
  },
  {
    title:
      "Rørstadbotnen mfl. (2023): Quick clay monitoring using distributed acoustic sensing. A case study from Rissa, Norway. Geophysics",
    url: "https://pubs.geoscienceworld.org/seg/geophysics/article-abstract/88/5/B267/627515/Quick-clay-monitoring-using-distributed-acoustic",
  },
  {
    title: "NORSAR (2022): Fiberteknologi gjør veiene tryggere",
    url: "https://www.norsar.no/om-oss/2022/fiberteknologi-gjor-veiene-tryggere_3/",
  },
  {
    title: "Digi.no (2026): Bane NOR vil varsle skred med fiberkabler",
    url: "https://www.digi.no/artikler/bane-nor-vil-varsle-skred-med-fiberkabler/574540",
  },
  {
    title: "Nature Communications (2024): Previously hidden landslide processes revealed using distributed acoustic sensing",
    url: "https://www.nature.com/articles/s41467-024-50604-6",
  },
];

export default function Sources() {
  return (
    <section id="kilder" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-slate-900">Kilder</h2>
        <ol className="mt-6 space-y-3">
          {SOURCES.map((source, i) => (
            <li key={source.url} className="flex gap-3 text-slate-700">
              <span className="w-6 flex-none text-right font-mono text-sm text-slate-400">{i + 1}.</span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-300 underline-offset-4 transition hover:text-cyan-700 hover:decoration-cyan-600"
              >
                {source.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
