import Grid from "@mui/material/Grid2";
import BarChart from "./graficTest/barChart";
import { Box, Paper } from "@mui/material";

export default function AgilaeBar() {
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            p: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              borderRadius: 10,
              p: 2,
              pl: 12,
              pb: 0,
              pr: 0,
              bgcolor: "#d2d6d4",
              maxWidth: 1000,
              boxShadow: "0 8px 16px -8px rgba(0,0,0,0.8)",
            }}
          >
            <BarChart />
          </Paper>
        </Box>
      </Grid>
    </>
  );
}
