import type { ReactNode } from "react";

export default function SectionHeading({
  kicker,
  title,
  lead,
  dark = false,
}: {
  kicker: string;
  title: string;
  lead?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-sm font-semibold uppercase tracking-widest ${
          dark ? "text-cyan-300" : "text-cyan-700"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`mt-2 text-3xl font-bold tracking-tight md:text-5xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
