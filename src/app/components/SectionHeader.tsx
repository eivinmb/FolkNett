import React from "react";

type Props = {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  dark?: boolean;
};

export default function SectionHeader({ eyebrow, title, lead, dark = false }: Props) {
  return (
    <div className="mb-12 max-w-3xl">
      <div className={`text-sm font-semibold uppercase tracking-widest ${dark ? "text-cyan-300" : "text-blue-600"}`}>
        {eyebrow}
      </div>
      <h2 className={`mt-3 text-3xl font-semibold tracking-tight md:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {lead && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{lead}</p>}
    </div>
  );
}
