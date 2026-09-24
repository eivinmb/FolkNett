"use client";

import React from "react";

// Rekkefølgen her bestemmer nummereringen [1], [2] ... i teksten.
const sources = [
  {
    title: "DSB. Ny analyse av krisescenario: Manipulering av satellittbaserte tidssignaler",
    url: "https://www.dsb.no/aktuelt/ny-analyse-av-krisescenario---manipulering-av-satellittbaserte-tidssignaler/",
  },
  {
    title: "Nærings- og fiskeridepartementet (2026). Ny analyse av totalforsvarets avhengighet til PNT (FFI)",
    url: "https://www.regjeringen.no/no/aktuelt/ny-side7/id3172189/",
  },
  {
    title: "Nærings- og fiskeridepartementet (2026). Ny samfunnsøkonomisk analyse av satellittbaserte PNT-tjenester (Menon Economics)",
    url: "https://www.regjeringen.no/no/aktuelt/ny-side4/id3155197/",
  },
  {
    title: "Nkom (2026). Tilgang til presis tid blir stadig viktigere – ber om innspill til utredning",
    url: "https://nkom.no/aktuelt/tilgang-til-presis-tid-blir-stadig-viktigere--ber-om-innspill-til-utredning",
  },
  {
    title: "Nkom (2025). Jakter på et alternativ til rett tid",
    url: "https://nkom.no/aktuelt/jakter-et-alternativ-til-rett-tid",
  },
  {
    title: "Netnod. Swedish Distributed Time Service",
    url: "https://www.netnod.se/swedish-distributed-time-service",
  },
  {
    title: "CERN. Open Hardware: White Rabbit",
    url: "https://openscience.cern/node/447",
  },
  {
    title: "Nkom (2023). Mangedobling av GPS-jamming mot Norge",
    url: "https://nkom.no/aktuelt/Mangedobling%20av%20GPS-jamming%20mot%20Norge",
  },
  {
    title: "Nkom. Har avdekket nye alvorlige GPS-forstyrrelser i Øst-Finnmark",
    url: "https://nkom.no/aktuelt/har-avdekket-nye-alvorlige-gps-forstyrrelser-i-ost-finnmark",
  },
  {
    title: "Cerruti mfl. (2008). Effect of intense December 2006 solar radio bursts on GPS receivers. Space Weather",
    url: "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2007SW000375",
  },
  {
    title: "Baruah mfl. (2024). The Loss of Starlink Satellites in February 2022. Space Weather",
    url: "https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2023SW003716",
  },
  {
    title: "Space.com (2024). May solar superstorm caused largest 'mass migration' of satellites in history",
    url: "https://www.space.com/may-solar-storm-largest-mass-migration-satellites",
  },
  {
    title: "Thiele mfl. (2025). An Orbital House of Cards: Frequent Megaconstellation Close Conjunctions (CRASH-klokka)",
    url: "https://arxiv.org/abs/2512.09643",
  },
  {
    title: "Phys.org (2019). Europe's Galileo GPS system back after six-day outage",
    url: "https://phys.org/news/2019-07-europe-galileo-gps-six-day-outage.html",
  },
  {
    title: "Inside GNSS (2016). BBC, Chronos Report on Lengthy Disruptions Caused by GPS Timing Problem",
    url: "https://insidegnss.com/bbc-chronos-report-on-lengthy-disruptions-caused-by-gps-timing-problem/",
  },
  {
    title: "Atmospheric impacts of the strongest known solar particle storm of 775 AD. Scientific Reports (2017)",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5368659/",
  },
  {
    title: "NOAA/NASA (2024). Joint Solar Maximum Announcement",
    url: "https://www.swpc.noaa.gov/news/joint-solar-maximum-announcement-nasa-and-noaa",
  },
  {
    title: "Sharma mfl. (2026). GNSS Spoofing Detection in TDD Networks: A 3GPP Standards-Based Security Framework",
    url: "https://arxiv.org/abs/2607.11398",
  },
  {
    title: "Spanghero, Zhang og Papadimitratos (2022). Authenticated time for detecting GNSS attacks",
    url: "https://arxiv.org/abs/2202.10838",
  },
  {
    title: "God helse og livskvalitet (FN-sambandet)",
    url: "https://fn.no/om-fn/fns-baerekraftsmaal/god-helse-og-livskvalitet",
  },
  {
    title: "Industri, innovasjon og infrastruktur (FN-sambandet)",
    url: "https://fn.no/om-fn/fns-baerekraftsmaal/industri-innovasjon-og-infrastruktur",
  },
  {
    title: "Bærekraftige byer og lokalsamfunn (FN-sambandet)",
    url: "https://fn.no/om-fn/fns-baerekraftsmaal/baerekraftige-byer-og-lokalsamfunn",
  },
  {
    title: "Fred, rettferdighet og velfungerende institusjoner (FN-sambandet)",
    url: "https://fn.no/om-fn/fns-baerekraftsmaal/fred-rettferdighet-og-velfungerende-institusjoner",
  },
  {
    title: "Adtran (2024). Adtran demonstrates Oscilloquartz assured PNT solution at Jammertest",
    url: "https://www.adtran.com/en/newsroom/press-releases/20241024-adtran-demonstrates-oscilloquartz-assured-pnt-solution-at-jammertest",
  },
  {
    title: "Qualcomm (2012). Patent US9185516B2: Radio frequency interference awareness assistance data",
    url: "https://patents.google.com/patent/US9185516B2/en",
  },
  {
    title: "Kartverket. seSolstorm – overvåking av ionosfæreforstyrrelser for GNSS",
    url: "https://sesolstorm.kartverket.no/help.xhtml",
  },
  {
    title: "Traficom (2024). Finland has a good ability to detect interference with satellite navigation",
    url: "https://www.traficom.fi/en/news/finland-has-good-ability-detect-interference-satellite-navigation",
  },
  {
    title: "RNTF (2026). Finland – 'Cellular also impacted by interference' (om Traficom-forskrift 54)",
    url: "https://rntfnd.org/2026/04/23/finland-cellular-also-impacted-by-interference/",
  },
  {
    title: "NPL. NPLTime – tid over fiber, uavhengig av GNSS",
    url: "https://www.npl.co.uk/products-services/time-frequency/npltime",
  },
  {
    title: "Adtran (2025). Adtran launches industry-first Galileo OSNMA authentication for Oscilloquartz timing solutions",
    url: "https://www.adtran.com/en/newsroom/press-releases/20251023-adtran-launches-industry-first-galileo-osnma-authentication-for-oscilloquartz-timing",
  },
];

export default function Sources() {
  return (
    <ol className="grid gap-x-10 gap-y-3 text-sm md:grid-cols-2">
      {sources.map((source, index) => (
        <li key={source.url} id={`ref${index + 1}`} className="flex scroll-mt-24 gap-3">
          <span className="w-6 shrink-0 text-right font-mono text-slate-400">{index + 1}</span>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-blue-700 hover:decoration-blue-400"
          >
            {source.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
