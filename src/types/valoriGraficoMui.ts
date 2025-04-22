interface DatiGrafico {
  id: number;
  value: number;
  label: string;
}

export const userTrafficData: DatiGrafico[] = [
  { id: 0, value: 5840, label: "Visitatori Desktop" },
  { id: 1, value: 7920, label: "Visitatori Mobile" },
  { id: 2, value: 1280, label: "Visitatori Tablet" },
  { id: 3, value: 320, label: "Altri Dispositivi" },
];
