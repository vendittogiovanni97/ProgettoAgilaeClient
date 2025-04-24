"use client";
import { tooltipBar } from "@/lib/formatterTooltipChart";
import { datiAutonoleggio } from "@/types/valoriGraficiEcharts";
import ReactECharts from "echarts-for-react";

//Grafico a barre con etichette di percentuale accanto
export const options = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: tooltipBar,
  },
  grid: {
    left: "100px",
    right: "45px",
    top: "10px",
    bottom: "20px",
    containLabel: false,
  },
  xAxis: {
    type: "value",
    max: 100,
    show: false,
  },
  yAxis: {
    type: "category",
    data: datiAutonoleggio.map((item) => item.nome),
    inverse: true,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      align: "left",
      margin: 80,
      fontSize: 16,
      fontFamily: "monospace",
      color: "#555",
      fontWeight: "bold",
    },
  },
  series: [
    // 🎨 Serie 1 – Valori reali con colore dinamico
    {
      type: "bar",
      data: datiAutonoleggio.map((item) => Math.abs(item.percentuale)), // Valore assoluto
      barWidth: 32,
      itemStyle: {
        borderRadius: 18,
        color: (params: any) => datiAutonoleggio[params.dataIndex].color,
      },
      label: {
        show: true,
        position: "right",
        offset: [10, 0], // [x, y] ➜ sposta il testo 10px a destra
        fontSize: 14,
        color: "black",
        formatter: (params: any) => {
          const val = datiAutonoleggio[params.dataIndex].percentuale;
          return (val > 0 ? "+" : "") + val + "%";
        },
      },
      showBackground: true,
      backgroundStyle: {
        color: "#DCDCDC",
        borderRadius: 18,
        borderWidth: 1, // Usa borderWidth invece di border
        borderColor: "#808080",
        borderType: "solid",
      },
    },
  ],
};

export default function BarChart() {
  return (
    <ReactECharts option={options} style={{ height: 300, width: "100%" }} />
  );
}
