import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import AgilaeBar from "@/components/recharts/AgilaeBar";
import AgilaePie from "@/components/recharts/AgilaePie";
import AgilaeUpload1 from "@/components/upload/AgilaeUpload";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <Box
      style={{ background: "#c4c4c3", minHeight: "100vh", overflow: "auto" }}
    >
      <Grid container direction="column" sx={{ height: "100vh" }}>
        {/* provare grid 3x */}
        <Footer />
      </Grid>
    </Box>
  );
}
