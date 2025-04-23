"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { optionGrafico1 } from "@/lib/settingGraficiEcharts";

export default function Grafico1Recharts() {
  return <ReactECharts option={optionGrafico1} style={{ height: "500px" }} />;
}
