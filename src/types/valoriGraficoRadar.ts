// Assumo che questi dati vengano importati. Li ricreo qui per completezza
export const data = [
  { name: "Ayven", value: 20000, color: "#4EABC5" }, // colore teal
  { name: "Athion", value: 10000, color: "#E9BE6D" }, // colore giallo/arancione
  { name: "Arvial", value: 30000, color: "#C54E6D" }, // colore rosso
  { name: "Leasys", value: 15000, color: "#8C3A3A" }, // colore bordeaux
];

export const totale = data.reduce((sum, item) => sum + item.value, 0);
