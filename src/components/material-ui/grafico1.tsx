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
          },
        ]}
        width={300}
        height={300}
      />
    </>
  );
}
