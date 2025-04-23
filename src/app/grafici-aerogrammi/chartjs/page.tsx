import Grafico1 from "@/components/chartjs/grafico1";
import Grafico2 from "@/components/chartjs/grafico2";
import Grafico3 from "@/components/chartjs/grafico3";
import { Box, Typography } from "@mui/material";

export default function GraficiChartJS() {
  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", padding: 3, marginBottom: 4 }}
      >
        Grafici Libreria ChartJs
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
          <Typography variant="h6" gutterBottom>
            Primo Grafico
          </Typography>
          <Grafico1 />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Secondo Grafico
          </Typography>
          <Grafico2 />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Terzo Grafico
          </Typography>
          <Grafico3 />
        </Box>
      </Box>
    </div>
  );
}
