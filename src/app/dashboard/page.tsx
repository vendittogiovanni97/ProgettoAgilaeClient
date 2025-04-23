import AgilaeGrafic from "@/components/recharts/AgilaeGrafic";
import { Box } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box
      style={{ background: "#DCDCDC", minHeight: "100vh", overflow: "auto" }}
    >
      <AgilaeGrafic />
    </Box>
  );
}
