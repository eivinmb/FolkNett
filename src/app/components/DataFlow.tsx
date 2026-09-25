"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cable, Ear, Map as MapIcon, Server, Users, type LucideIcon } from "lucide-react";

const NODES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Cable, title: "Fiberen i gata", text: "Ryker eller kjenner bevegelse" },
  { icon: Server, title: "Fiberoperatøren", text: "Måler bruddene og låner ut fiber" },
  { icon: Ear, title: "Fiberlytterne", text: "Tolker signalene" },
  { icon: MapIcon, title: "Innsatsleder og NVE", text: "Tar beslutningene" },
  { icon: Users, title: "Mannskaper og beboere", text: "Varsles, evakueres og flytter hjem" },
];

function Connector({ reduce, index }: { reduce: boolean | null; index: number }) {
  return (
    <>
      <div className="relative hidden h-0.5 min-w-8 flex-1 self-center bg-cyan-200 md:block">
        {!reduce && (
          <motion.span
            className="absolute -top-1 h-2.5 w-2.5 rounded-full bg-cyan-500"
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: index * 0.4 }}
          />
        )}
      </div>
      <div className="relative mx-auto h-8 w-0.5 bg-cyan-200 md:hidden">
        {!reduce && (
          <motion.span
            className="absolute -left-1 h-2.5 w-2.5 rounded-full bg-cyan-500"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: index * 0.4 }}
          />
        )}
      </div>
    </>
  );
}

export default function DataFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col items-stretch md:flex-row">
      {NODES.map(({ icon: Icon, title, text }, i) => (
        <Fragment key={title}>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm md:w-40 md:flex-none">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-cyan-300">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-2 font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-sm text-slate-500">{text}</p>
          </div>
          {i < NODES.length - 1 && <Connector reduce={reduce} index={i} />}
        </Fragment>
      ))}
    </div>
  );
}
