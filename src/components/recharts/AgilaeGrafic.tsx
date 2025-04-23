import Grid from "@mui/material/Grid2";
import BarChart from "./graficTest/barChart";
import PieChart from "./graficTest/pieChart";
import { Box } from "@mui/material";

export default function AgilaeGrafic() {
  return (
    <>
      <Grid container direction="column" sx={{ height: "100vh" }}>
        <Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              p: 2,
            }}
          >
            <BarChart />
          </Box>
        </Grid>

        <Grid sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "70%",
            p: 2,
          }}
        >
          <PieChart />
        </Box>
      </Grid>
    </>
  );
}
