"use client";
import { tooltipBar } from "@/lib/formatterTooltipChart";
import { datiAutonoleggio } from "@/types/valoriGraficiEcharts";
import { Box } from "@mui/material";
import ReactECharts from "echarts-for-react";

//Grafico a barre con etichette di percentuale accanto
export const options = {
  title: {
    text: "Andamento Autonoleggio",
    left: "center",
    textStyle: {
      color: "black",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: tooltipBar,
  },
  grid: {
    left: "3%",
    right: "15%", // Spazio maggiore a destra per le percentuali
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    position: "top",
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  },
  yAxis: {
    type: "category",
    data: datiAutonoleggio.map((item) => item.nome),
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
  },
  series: [
    {
      name: "Valore",
      type: "bar",
      data: datiAutonoleggio.map((item) => item.valore),
      label: {
        show: true,
        position: "right",
        formatter: function (params: any) {
          const dataIndex = params.dataIndex;
          const percentuale = datiAutonoleggio[dataIndex].percentuale;
          const segno = percentuale > 0 ? "+" : "";

          return `{percentStyle|${segno}${percentuale}%}`;
        },
        rich: {
          percentStyle: {
            fontWeight: "bold",
            fontSize: 14,
          },
        },
      },
    },
  ],
};

export default function BarChart() {
  return (
    <Box sx={{ width: "60%", height: "10vh" }}>
      <ReactECharts option={options} opts={{ renderer: "canvas" }} />
    </Box>
  );
}
