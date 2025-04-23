import { Grid2 } from "@mui/material";
import PieChart from "./graficTest/pieChart";

export default function AgilaeGrafic() {
  return (
    <>
      <Grid2
        container
        spacing={3}
        direction="row"
        sx={{
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
        <PieChart />
      </Grid2>
    </>
  );
}
