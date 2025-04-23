export const grafico1 = {
  labels: ["Desktop", "Mobile", "Tablet", "Altri"],
  datasets: [
    {
      label: "Visitatori",
      data: [45, 40, 10, 5],
      backgroundColor: ["#3f51b5", "#ffb74d", "#e57373", "#4dd0e1"],
      borderColor: "#121212",
      borderWidth: 1,
    },
  ],
};

export const grafico2 = {
  labels: ["Social", "Email", "Referral", "Organic Search"],
  datasets: [
    {
      label: "Traffico",
      data: [25, 30, 20, 25],
      backgroundColor: ["#00c853", "#2962ff", "#ff6d00", "#d500f9"],
      borderColor: "#1e1e1e",
      borderWidth: 2,
      hoverOffset: 10,
    },
  ],
};

export const grafico3 = {
  labels: ["Unicorni", "Caramelle", "Nuvolette", "Arcobaleni"],
  datasets: [
    {
      label: "Preferenze",
      data: [40, 20, 25, 15],
      backgroundColor: ["#f06292", "#ba68c8", "#4fc3f7", "#ffd54f"],
      borderColor: "#fff",
      borderWidth: 4,
      hoverOffset: 20,
    },
  ],
};
