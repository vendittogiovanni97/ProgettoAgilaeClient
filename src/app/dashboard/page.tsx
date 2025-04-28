import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import AgilaeBar from "@/components/recharts/AgilaeBar";
import AgilaePie from "@/components/recharts/AgilaePie";
import AgilaeUpload from "@/components/upload/AgilaeUpload";

export default function DashboardPage() {
  return (
    <Box
      style={{ background: "#c4c4c3", minHeight: "100vh", overflow: "auto" }}
    >
      <Grid container direction="column" sx={{ height: "100vh" }}>
        <AgilaeBar />
        <AgilaePie />
      </Grid>
      <AgilaeUpload />
    </Box>
  );
}
