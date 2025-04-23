import { grafico1, grafico2, grafico3 } from "@/types/valoriGraficiEcharts";

export const optionGrafico1 = {
  title: {
    text: "Primo Grafico",
    left: "center",
    top: 20,
    textStyle: {
      color: "#ccc",
    },
  },

  tooltip: {
    trigger: "item",
  },

  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1],
    },
  },
  series: [
    {
      name: "Grafico 1",
      type: "pie",
      radius: "55%",
      center: ["50%", "50%"],
      data: grafico1
        .map((item) => ({
          id: 1,
          value: item.value,
          name: item.name,
          description: "text",
        }))
        .sort(function (a, b) {
          return a.value - b.value;
        }),
      roseType: "radius",
      label: {
        color: "white",
      },
      labelLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)",
        },
        smooth: 0.2,
        length: 10,
        length2: 20,
      },
      itemStyle: {
        color: "#c23531",
        shadowBlur: 200,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },

      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: function () {
        return Math.random() * 200;
      },
    },
  ],
};

export const optionGrafico2 = {
  title: {
    text: "Secondo Grafico",
    left: "center",
    textStyle: {
      color: "#ccc",
    },
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: grafico2.map((item) => ({
        value: item.value,
        name: item.name,
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

export const optionGrafico3 = {
  legend: {
    top: "bottom",
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "Nightingale Chart",
      type: "pie",
      radius: [50, 250],
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 8,
      },
      data: grafico3.map((item) => ({
        value: item.value,
        name: item.name,
      })),
    },
  ],
};
