"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { optionGrafico2 } from "@/lib/settingGraficiEcharts";

export default function Grafico2Recharts() {
  return <ReactECharts option={optionGrafico2} style={{ height: "500px" }} />;
}
