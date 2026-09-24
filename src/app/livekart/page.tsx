import LiveMap from "../components/livekart/LiveMap";

export const metadata = {
  title: "Fiberklokka – livekart",
  description: "Prototype: et livekart som viser hvor GPS kan stoles på, ved å sammenligne GPS-tid med fibertid.",
};

export default function LivekartPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 text-slate-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-sm font-semibold uppercase tracking-widest text-blue-600">Prototype · simulerte data</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Fiberklokka: livekart over GPS</h1>
        <p className="mt-4 mb-10 max-w-3xl text-lg leading-relaxed text-slate-600">
          42 målepunkter over hele landet sammenligner GPS-tida med Norges offisielle tid fra fibernettet. Kartet viser
          grønt, gult eller rødt: kan GPS stoles på her, akkurat nå?
        </p>
        <LiveMap />
      </div>
    </main>
  );
}
