"use client";

import { style2 } from "@/lib/settingGraficiChartJs";
import { grafico2 } from "@/types/valoriGraficiChartsJs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Grafico2() {
  return <Pie data={grafico2} options={style2} />;
}
