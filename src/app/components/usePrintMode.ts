"use client";

import { useEffect, useState } from "react";

/** Sant når siden er åpnet med ?utskrift, som brukes når PDF-en lages. Da vises alt i ferdig tilstand. */
export function usePrintMode() {
  const [printMode, setPrintMode] = useState(false);
  useEffect(() => {
    setPrintMode(window.location.search.includes("utskrift"));
  }, []);
  return printMode;
}
