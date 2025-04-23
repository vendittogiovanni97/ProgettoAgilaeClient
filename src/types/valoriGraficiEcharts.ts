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

// Dati di esempio per l'autonoleggio
export const datiAutonoleggio = [
  {
    nome: "Leasing",
    valore: 1250,
    percentuale: 15.3, // percentuale di crescita positiva
    description: "Contratti di leasing attivi",
  },
  {
    nome: "Noleggio a lungo termine",
    valore: 980,
    percentuale: -4.7, // percentuale di decrescita
    description: "Contratti di noleggio a lungo termine",
  },
  {
    nome: "Noleggio a breve termine",
    valore: 1450,
    percentuale: 23.8,
    description: "Noleggi giornalieri e settimanali",
  },
  {
    nome: "Rent-to-buy",
    valore: 475,
    percentuale: 5.2,
    description: "Contratti rent-to-buy attivi",
  },
  {
    nome: "Car sharing",
    valore: 350,
    percentuale: -12.6,
    description: "Utenti servizio car sharing",
  },
];
