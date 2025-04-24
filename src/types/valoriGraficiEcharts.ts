interface DatiGrafico {
  value: number;
  name: string;
  description?: string;
  color?: string;
}

export const grafico1: DatiGrafico[] = [
  { value: 335, name: "Direct" },
  { value: 310, name: "Email" },
  { value: 274, name: "Union Ads" },
  { value: 235, name: "Video Ads" },
  { value: 400, name: "Search Engine" },
];

export const grafico2: DatiGrafico[] = [
  {
    value: 1048,
    name: "Search Engine",
    description: "Utenti da motori di ricerca",
    color: "#FF1493",
  },
  {
    value: 735,
    name: "Direct",
    description: "Utenti da motori di ricerca",
    color: "#FF7F50",
  },
  {
    value: 580,
    name: "Email",
    description: "Utenti da motori di ricerca",
    color: "#00FFFF",
  },
  {
    value: 484,
    name: "Union Ads",
    description: "Utenti da motori di ricerca",
    color: "#B8860B",
  },
  {
    value: 300,
    name: "Video Ads",
    description: "Utenti da motori di ricerca",
    color: "#006400",
  },
];

export const grafico3: DatiGrafico[] = [
  { value: 40, name: "rose 1" },
  { value: 38, name: "rose 2" },
  { value: 32, name: "rose 3" },
  { value: 30, name: "rose 4" },
  { value: 28, name: "rose 5" },
  { value: 26, name: "rose 6" },
  { value: 22, name: "rose 7" },
  { value: 18, name: "rose 8" },
];

type CarRentalData = {
  nome: string;
  percentuale: number;
  color: string;
};

// Dati di esempio per l'autonoleggio
export const datiAutonoleggio: CarRentalData[] = [
  {
    nome: "Ayvens",
    percentuale: 50,
    color: "#5fc0c9",
  },
  {
    nome: "Athlon",
    percentuale: 65,
    color: "#e00067",
  },
  {
    nome: "Arval",
    percentuale: -19,
    color: "#f07f0d",
  },
  {
    nome: "Leasys",
    percentuale: 80,
    color: "#1e8233",
  },
];
