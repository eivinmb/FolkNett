"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import AboutUs from "./components/AboutUs";
import Challenge from "./components/Challenge";
import Sustainability from "./components/Sustainablity";
import Organization from "./components/Organization";
import Preparedness from "./components/Preparedness";
import Solution from "./components/Solution";
import Ethics from "./components/Ethics";
import International from "./components/International";
import Technology from "./components/Technology";
import IntroSection from "./components/IntroSection";
import Source from "./components/Source";
import Feasibility from "./components/Feasibility";
import SectionHeader from "./components/SectionHeader";
import Ref from "./components/Ref";
import LiveMap from "./components/livekart/LiveMap";

// -------------------- SECTION SPY --------------------
function useSectionSpy(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const NAV_ITEMS = [
  { id: "krisen", label: "Krisen" },
  { id: "teknologi", label: "Teknologi" },
  { id: "losning", label: "Løsning" },
  { id: "livekart", label: "Livekart" },
  { id: "samarbeid", label: "Samarbeid" },
  { id: "gjennomforing", label: "Gjennomføring" },
  { id: "faq", label: "FAQ" },
];

function StickyNav({ active }: { active: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
        <a href="#top" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          Fiberklokka
        </a>
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
                active === it.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {it.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// Seksjon med felles luft. Alle seksjoner deler samme bakgrunn.
function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

// -------------------- HERO --------------------
const STATS = [
  { value: "13 µs", label: "Så liten var GPS-feilen (13 milliondels sekund) som forstyrret BBCs digitalradio i 2016", ref: 15 },
  { value: "Nesten daglig", label: "forsvinner GPS i Øst-Finnmark", ref: 8 },
  { value: "Ingen", label: "Så mange nasjonale tidstjenester uten satellitter har Norge i dag", ref: 4 },
];

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-slate-950 pt-16 text-white">
      {/* Nordlys-glød */}
      <div aria-hidden className="absolute -top-40 left-1/4 h-[32rem] w-[48rem] rounded-full bg-emerald-500/20 blur-3xl" />
      <div aria-hidden className="absolute -top-20 right-0 h-[24rem] w-[32rem] rounded-full bg-cyan-500/20 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-2">
        <div>
          <div className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Your Extreme 2026 · Dream Bernoulli</div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Fibernettet sier ifra når GPS lyver
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Mobilnettet, strømnettet, bankene og nødetatene er avhengige av GPS, både for å vite hvor ting er og hva klokka
            er. Vi vil bruke fiberen som allerede ligger i bakken som reserveklokke for hele Norge, og som en måte å sjekke om
            GPS er til å stole på, også midt i en krise.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#livekart" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-slate-900 hover:bg-slate-100">
              Prøv livekartet <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#krisen" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium text-white hover:bg-white/10">
              Les casen
            </a>
          </div>
        </div>

        {/* Eksempel på et målepunkt */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Målepunkt Kirkenes</div>
              <div className="text-sm text-slate-400">Mobilmast · Finnmark</div>
            </div>
            <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-slate-950">Rød · Ikke stol på GPS</span>
          </div>
          <dl className="mt-6 space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Fibertid</dt>
              <dd>14:02:00,000 000 000</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">GPS-tid</dt>
              <dd>14:02:00,000 003 214</dd>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2">
              <dt className="text-slate-400">Avvik</dt>
              <dd className="text-rose-400">+3,2 µs</dd>
            </div>
          </dl>
          <div className="mt-6 space-y-2 text-sm text-slate-300">
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />Mobilmasta går på fibertid</div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />AMK og luftambulansen er varslet</div>
          </div>
          <div className="mt-4 text-xs text-slate-500">Illustrasjon</div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <dl className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.value}>
              <dt className="text-3xl font-semibold tracking-tight">{s.value}</dt>
              <dd className="mt-1 text-sm text-slate-400">
                {s.label} <Ref n={s.ref} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// -------------------- FAQ --------------------
const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Hva mister man når systemene bytter til fibertid?",
    a: "Fibertida kan bare erstatte klokka i GPS, ikke posisjonen. Mobilnett, strømnett og banker, som trenger tid, klarer seg fint. Ambulanser, fly og skip trenger posisjon, og de får i stedet beskjed om å bruke reserverutinene sine. Derfor vil vi ha både GPS og fiber, så de kan passe på hverandre.",
  },
  {
    q: "Hvorfor ikke bare bruke Galileo som reserve for GPS?",
    a: (
      <>
        Det lurte vi på også. Problemet er at alle satellittsystemene går i bane i det samme rommet, så en solstorm treffer
        dem samtidig. Galileo var dessuten nede i seks døgn i 2019 på grunn av en feil på bakken <Ref n={14} />.
      </>
    ),
  },
  {
    q: "Hva hvis fibernettet også går ned?",
    a: "Glass leder ikke strøm, så solstormen skader ikke selve kabelen. Utstyret som sender tida, trenger reservestrøm, og tida bør sendes flere veier. Mister et målepunkt både GPS og fiber, blir det rødt, og da stoler ingen på GPS der.",
  },
  {
    q: "Hva med skip på havet og fly i lufta?",
    a: "Dit når ikke fiberen. Kartet kan varsle Kystverket og Avinor om hvor GPS er upålitelig langs kysten og rundt flyplassene, men navigasjon til havs og i lufta må løses på andre måter. Det har vi valgt å holde utenfor.",
  },
];

// -------------------- PAGE --------------------
export default function Page() {
  const active = useSectionSpy(NAV_ITEMS.map((i) => i.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <StickyNav active={active} />
      <Hero />

      <Section>
        <IntroSection />
      </Section>

      <Section id="krisen">
        <SectionHeader eyebrow="01 · Hva har skjedd?" title="Krisen: Solstormen" />
        <Challenge />
      </Section>

      <Section id="teknologi">
        <SectionHeader
          eyebrow="02 · Hvilken sivil teknologi?"
          title="Teknologien vi gjenbruker"
          lead="Vi har ikke funnet opp noe nytt. Alt vi bruker, finnes allerede rundt om i landet. Vi gir det bare en ny jobb."
        />
        <Technology />
      </Section>

      <Section id="losning">
        <SectionHeader
          eyebrow="03 · Hvordan tilpasses den?"
          title="Norges klokke i fibernettet"
          lead="Vi mener reserven for GPS må ligge på bakken, ikke i verdensrommet. Derfor gir vi fibernettet to nye jobber."
        />
        <Solution />
      </Section>

      <section id="livekart" className="scroll-mt-16 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Prototype"
            title="Prøv livekartet"
            lead="Vi har laget en prototype for å vise hvordan kartet kan se ut. 42 målepunkter sammenligner GPS-tid med fibertid. Trykk på «Solstorm» for å se krisen i tre faser, eller på «Falskt signal» for å se hvordan fiberklokka avslører et signal som ser helt normalt ut. Dataene er simulerte."
          />
          <LiveMap />
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Hvem får nytte?"
          title="Når kartet skifter farge"
          lead="Et kart hjelper lite hvis ingen gjør noe med det. Vi har valgt ut tre brukere der feil posisjon eller feil tid kan få alvorlige følger."
        />
        <Preparedness />
      </Section>

      <Section id="samarbeid">
        <SectionHeader
          eyebrow="04 · Hvem må samarbeide?"
          title="Dette klarer ingen alene"
          lead="Operatørene eier målepunktene, staten eier tida og nødetatene er de som trenger svaret. Det krever en avtale om å dele målinger, omtrent slik operatørene allerede samarbeider om Nødvarsel."
        />
        <Organization />
        <h3 className="mt-16 text-2xl font-semibold tracking-tight">Fra Finnmark til Europa</h3>
        <p className="mt-3 mb-8 max-w-3xl text-lg leading-relaxed text-slate-600">
          Vi vil starte der problemet allerede er, og bygge ut derfra.
        </p>
        <International />
      </Section>

      <Section id="gjennomforing">
        <SectionHeader
          eyebrow="Gjennomføring"
          title="Er dette mulig? Vi tror det"
          lead="Utstyret står allerede der. Det som mangler, er tid i fiberen, programvare og en avtale om å dele data. Vi har også prøvd å være ærlige om hva som blir vanskelig."
        />
        <Feasibility />
      </Section>

      <Section>
        <SectionHeader eyebrow="Etikk og sikkerhet" title="Personvern og sikkerhet" lead="Et kart som sier noe om sårbarheter i samfunnet, må brukes med omhu. Dette er reglene vi mener bør gjelde." />
        <Ethics />
        <h3 className="mt-16 mb-6 text-2xl font-semibold tracking-tight">Bærekraft</h3>
        <Sustainability />
      </Section>

      <Section id="faq">
        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">FAQ</h2>
        <div className="max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-slate-900">
                {item.q}
                <Plus className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-45" />
              </summary>
              <div className="mt-3 leading-relaxed text-slate-600">{item.a}</div>
            </details>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Teamet" title="Dream Bernoulli" />
        <AboutUs />
      </Section>

      <Section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Kilder</h2>
        <Source />
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-900">Bruk av KI:</span> Vi har brukt KI (Claude) mye i dette prosjektet,
          og vil være åpne om hvordan. Vi brukte det som sparringspartner da vi lette etter en idé, og tanken om å
          sammenligne GPS-tid med fibertid kom frem i en slik runde. Vi har også brukt KI til å finne og sjekke kilder, til å
          formulere tekst og til å programmere nettsiden og livekartet. Valget av krise, avgrensningene og hva vi la vekt på,
          har vi bestemt selv, og alle tall har vi sjekket mot kildene.
        </div>
      </Section>

      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-slate-500">
          <span>© 2026 Fiberklokka · Dream Bernoulli</span>
          <span>Besvarelse til Your Extreme 2026</span>
        </div>
      </footer>
    </div>
  );
}
