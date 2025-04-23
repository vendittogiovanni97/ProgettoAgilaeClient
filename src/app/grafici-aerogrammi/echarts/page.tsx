import Grafico1Recharts from "@/components/recharts/grafico1";
import Grafico2Recharts from "@/components/recharts/grafico2";
import Grafico3Echarts from "@/components/recharts/grafico3";
import { Box, Typography } from "@mui/material";

export default function GraficiEcharts() {
  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", padding: 3, marginBottom: 4 }}
      >
        Grafici Libreria Echarts
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" },
          gap: 4,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Grafico1Recharts />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Grafico2Recharts />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Terzo Grafico
          </Typography>
          <Grafico3Echarts />
        </Box>
      </Box>
    </div>
  );
}
