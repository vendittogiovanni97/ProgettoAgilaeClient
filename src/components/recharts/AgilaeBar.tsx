import Grid from "@mui/material/Grid2";
import BarChart from "./graficTest/barChart";
import { Box } from "@mui/material";

export default function AgilaeBar() {
  return (
    <>
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
    </>
  );
}
