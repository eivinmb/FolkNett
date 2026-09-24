import { Building2, Users, ShieldCheck } from "lucide-react";

const GROUPS = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Stat og tilsyn",
    items: [
      ["Justervesenet", "eier Norges offisielle tid"],
      ["Nkom", "stiller krav til operatørene og driver kartet"],
      ["DSB", "bygger kartet inn i beredskapsplanene"],
    ],
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Eierne av infrastrukturen",
    items: [
      ["Teleoperatørene", "sender tida og stiller master til rådighet"],
      ["Statnett og nettselskapene", "målepunkter i trafostasjoner"],
      ["NRK og Norkring", "DAB-senderne blir målepunkter"],
    ],
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Brukerne av kartet",
    items: [
      ["Nødetatene", "AMK, 110, 112 og luftambulansen"],
      ["Kystverket og Avinor", "varsling langs kysten og ved flyplasser"],
      ["Kommunene", "kriseledelse og beskjed til innbyggerne"],
    ],
  },
];

export default function Organization() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {GROUPS.map((g) => (
        <div key={g.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">{g.icon}</div>
            <h3 className="text-lg font-semibold text-slate-900">{g.title}</h3>
          </div>
          <ul className="mt-5 divide-y divide-slate-100">
            {g.items.map(([who, what]) => (
              <li key={who} className="py-3">
                <div className="font-medium text-slate-900">{who}</div>
                <div className="text-sm text-slate-600">{what}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
