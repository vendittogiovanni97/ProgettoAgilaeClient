import { userTrafficData } from "@/types/valoriGraficoMui";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Grafico1() {
  return (
    <>
      <PieChart
        sx={{}}
        series={[
          {
            data: userTrafficData.map((item) => ({
              id: item.id,
              value: item.value,
              label: item.label,
            })),
            innerRadius: 20,
            outerRadius: 120,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -100,
            endAngle: 260,
            cx: 150,
            cy: 150,
          },
        ]}
        width={300}
        height={300}
      />
    </>
  );
}
