import { ChartOptions, TooltipItem } from "chart.js";

export const style1: ChartOptions<"pie"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        color: "#fff", // se usi tema scuro
      },
    },
  },
};

export const style2: ChartOptions<"pie"> = {
  responsive: true,
  cutout: "40%", // per effetto anello
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#ddd",
        padding: 20,
        boxWidth: 20,
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: TooltipItem<"pie">) {
          const value = context.parsed;
          const label = context.label || "";
          return `${label}: ${value}%`;
        },
      },
    },
  },
};

export const style3: ChartOptions<"pie"> = {
  responsive: true,
  animation: {
    animateRotate: true,
    animateScale: true,
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#444",
        font: {
          size: 16,
          family: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif",
          weight: "bold",
        },
      },
    },
    tooltip: {
      bodyFont: {
        size: 14,
        family: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif",
      },
      backgroundColor: "#ffecb3",
      borderColor: "#ff9800",
      borderWidth: 1,
      titleColor: "#e65100",
    },
  },
};
