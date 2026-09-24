// Målepunkter: steder som allerede har både GPS-mottaker og fiber.
// Koordinatene er omtrentlige bykoordinater – kun for demonstrasjon.

export type StationKind = "mast" | "kraft" | "dab" | "kyst";

export type StationDef = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  kind: StationKind;
  label?: boolean; // vis navnet på kartet
};

export const KIND_LABEL: Record<StationKind, string> = {
  mast: "Mobilmast",
  kraft: "Trafostasjon",
  dab: "DAB-sender",
  kyst: "Kaianlegg / fyr",
};

export const STATIONS: StationDef[] = [
  // Finnmark
  { id: "kirkenes", name: "Kirkenes", region: "Finnmark", lat: 69.73, lon: 30.05, kind: "mast", label: true },
  { id: "vardo", name: "Vardø", region: "Finnmark", lat: 70.37, lon: 31.11, kind: "kyst" },
  { id: "vadso", name: "Vadsø", region: "Finnmark", lat: 70.07, lon: 29.75, kind: "kraft" },
  { id: "honningsvag", name: "Honningsvåg", region: "Finnmark", lat: 70.98, lon: 25.97, kind: "kyst" },
  { id: "hammerfest", name: "Hammerfest", region: "Finnmark", lat: 70.66, lon: 23.68, kind: "mast" },
  { id: "alta", name: "Alta", region: "Finnmark", lat: 69.97, lon: 23.27, kind: "dab" },
  { id: "karasjok", name: "Karasjok", region: "Finnmark", lat: 69.47, lon: 25.51, kind: "mast" },
  // Troms
  { id: "tromso", name: "Tromsø", region: "Troms", lat: 69.65, lon: 18.96, kind: "mast", label: true },
  { id: "finnsnes", name: "Finnsnes", region: "Troms", lat: 69.23, lon: 17.98, kind: "kraft" },
  { id: "harstad", name: "Harstad", region: "Troms", lat: 68.8, lon: 16.54, kind: "kyst" },
  { id: "narvik", name: "Narvik", region: "Nordland", lat: 68.44, lon: 17.43, kind: "kraft" },
  // Nordland
  { id: "svolvaer", name: "Svolvær", region: "Nordland", lat: 68.23, lon: 14.57, kind: "kyst" },
  { id: "bodo", name: "Bodø", region: "Nordland", lat: 67.28, lon: 14.4, kind: "mast", label: true },
  { id: "moirana", name: "Mo i Rana", region: "Nordland", lat: 66.31, lon: 14.14, kind: "kraft" },
  { id: "mosjoen", name: "Mosjøen", region: "Nordland", lat: 65.84, lon: 13.19, kind: "dab" },
  { id: "bronnoysund", name: "Brønnøysund", region: "Nordland", lat: 65.47, lon: 12.21, kind: "kyst" },
  // Trøndelag
  { id: "namsos", name: "Namsos", region: "Trøndelag", lat: 64.47, lon: 11.5, kind: "mast" },
  { id: "steinkjer", name: "Steinkjer", region: "Trøndelag", lat: 64.01, lon: 11.5, kind: "kraft" },
  { id: "trondheim", name: "Trondheim", region: "Trøndelag", lat: 63.43, lon: 10.39, kind: "mast", label: true },
  { id: "roros", name: "Røros", region: "Trøndelag", lat: 62.57, lon: 11.38, kind: "dab" },
  // Møre og Romsdal
  { id: "kristiansund", name: "Kristiansund", region: "Møre og Romsdal", lat: 63.11, lon: 7.73, kind: "kyst" },
  { id: "molde", name: "Molde", region: "Møre og Romsdal", lat: 62.74, lon: 7.16, kind: "mast" },
  { id: "alesund", name: "Ålesund", region: "Møre og Romsdal", lat: 62.47, lon: 6.15, kind: "kyst" },
  // Vestland og Rogaland
  { id: "forde", name: "Førde", region: "Vestland", lat: 61.45, lon: 5.85, kind: "mast" },
  { id: "voss", name: "Voss", region: "Vestland", lat: 60.63, lon: 6.42, kind: "dab" },
  { id: "bergen", name: "Bergen", region: "Vestland", lat: 60.39, lon: 5.32, kind: "mast", label: true },
  { id: "haugesund", name: "Haugesund", region: "Rogaland", lat: 59.41, lon: 5.27, kind: "kyst" },
  { id: "stavanger", name: "Stavanger", region: "Rogaland", lat: 58.97, lon: 5.73, kind: "kraft" },
  { id: "egersund", name: "Egersund", region: "Rogaland", lat: 58.45, lon: 6.0, kind: "mast" },
  // Innlandet og Buskerud
  { id: "lillehammer", name: "Lillehammer", region: "Innlandet", lat: 61.12, lon: 10.47, kind: "dab" },
  { id: "elverum", name: "Elverum", region: "Innlandet", lat: 60.88, lon: 11.56, kind: "kraft" },
  { id: "hamar", name: "Hamar", region: "Innlandet", lat: 60.79, lon: 11.07, kind: "mast" },
  { id: "gol", name: "Gol", region: "Buskerud", lat: 60.7, lon: 8.95, kind: "mast" },
  { id: "kongsberg", name: "Kongsberg", region: "Buskerud", lat: 59.67, lon: 9.65, kind: "kraft" },
  { id: "drammen", name: "Drammen", region: "Buskerud", lat: 59.74, lon: 10.2, kind: "mast" },
  // Oslo og omegn
  { id: "oslo", name: "Oslo", region: "Oslo", lat: 59.91, lon: 10.75, kind: "mast", label: true },
  { id: "fredrikstad", name: "Fredrikstad", region: "Østfold", lat: 59.22, lon: 10.93, kind: "kraft" },
  { id: "tonsberg", name: "Tønsberg", region: "Vestfold", lat: 59.27, lon: 10.41, kind: "dab" },
  // Telemark og Agder
  { id: "skien", name: "Skien", region: "Telemark", lat: 59.21, lon: 9.61, kind: "mast" },
  { id: "arendal", name: "Arendal", region: "Agder", lat: 58.46, lon: 8.77, kind: "kyst" },
  { id: "kristiansand", name: "Kristiansand", region: "Agder", lat: 58.15, lon: 8.0, kind: "mast", label: true },
  { id: "mandal", name: "Mandal", region: "Agder", lat: 58.03, lon: 7.46, kind: "dab" },
];
