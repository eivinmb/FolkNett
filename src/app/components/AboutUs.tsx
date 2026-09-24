import { User } from "lucide-react";

type TeamMember = {
  name: string;
  year?: string;
  img?: string;
  study?: string;
};

const team: TeamMember[] = [
  { name: "Eivin Burmester", year: "5. klasse", img: "/team/eivin.png", study: "Marin kybernetikk" },
  { name: "Eirik Hekkli", year: "4. klasse", img: "/team/eirik.png", study: "Marin kybernetikk" },
  { name: "Isak Halse Kjerstad" }, // klasse, linje og bilde kommer
  { name: "Henrik Sehm-Hansen", year: "4. klasse", img: "/team/henrik.png", study: "Industriell økonomi og teknologiledelse" },
  { name: "Syver Strand", year: "3. klasse", img: "/team/syver.png", study: "Maskiningeniør" },
];

export default function AboutUs() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {team.map((m) => (
        <div key={m.name} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          {m.img ? (
            <img src={m.img} alt={m.name} className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-slate-100" />
          ) : (
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-300 ring-4 ring-slate-100">
              <User className="h-10 w-10" />
            </div>
          )}
          <h3 className="mt-4 font-semibold text-slate-900">{m.name}</h3>
          {m.year && <p className="text-sm text-slate-500">{m.year}</p>}
          {m.study && <p className="mt-2 text-sm text-slate-600">{m.study}</p>}
        </div>
      ))}
    </div>
  );
}
