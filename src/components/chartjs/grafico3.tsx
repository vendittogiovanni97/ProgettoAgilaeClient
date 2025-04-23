"use client";

import { style3 } from "@/lib/settingGraficiChartJs";
import { grafico3 } from "@/types/valoriGraficiChartsJs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Grafico3() {
  return <Pie data={grafico3} options={style3} />;
}
