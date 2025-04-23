import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import PieChart from "./graficTest/pieChart";

export default function AgilaePie() {
  return (
    <>
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
    </>
  );
}
