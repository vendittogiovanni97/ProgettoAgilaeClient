"use client";

import { style1 } from "@/lib/settingGraficiChartJs";
import { grafico1 } from "@/types/valoriGraficiChartsJs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Grafico1() {
  return <Pie data={grafico1} options={style1} />;
}
