"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";
import { formatTooltip } from "@/lib/formatterTooltipChart";
import { data } from "@/types/valoriGraficoRadar";

const optionGrafico = {
  // Titolo del grafico
  title: {
    left: "center",
    textStyle: {
      color: "black",
    },
  },
  // Configurazione del tooltip
  tooltip: {
    trigger: "item", //// Si attiva al passaggio del mouse su un item
    formatter: formatTooltip,
  },
  legend: {
    show: false,
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",

      data: data.map((item) => ({
        value: item.value,
        name: item.name,
        itemStyle: { color: item.color },
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

export default function PieChart() {
  return (
    <Box sx={{ width: "60%" }}>
      <ReactECharts option={optionGrafico} opts={{ renderer: "canvas" }} />
      {/*Opzione base per il rendering, migliora la dinamicità del grafico quando utilizza aggiornamenti frequenti */}
    </Box>
  );
}
