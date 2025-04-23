"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { optionGrafico3 } from "@/lib/settingGraficiEcharts";

export default function Grafico3Echarts() {
  return <ReactECharts option={optionGrafico3} style={{ height: "500px" }} />;
}
