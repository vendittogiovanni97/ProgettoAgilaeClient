import { userTrafficData } from "@/types/valoriGraficoMui";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Grafico1() {
  return (
    <>
      <PieChart
        series={[
          {
            data: userTrafficData.map((item) => ({
              id: item.id,
              value: item.value,
              label: item.label,
            })),
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 40, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={300}
        width={300}
      />
    </>
  );
}
