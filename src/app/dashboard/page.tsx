import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import AgilaeBar from "@/components/recharts/AgilaeBar";

export default function DashboardPage() {
  return (
    <Box
      style={{ background: "#DCDCDC", minHeight: "100vh", overflow: "auto" }}
    >
      <Grid container direction="column" sx={{ height: "100vh" }}>
        <AgilaeBar />
      </Grid>
    </Box>
  );
}
