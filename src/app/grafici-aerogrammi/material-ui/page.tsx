import { Grafico1, Grafico2, Grafico3 } from "@/components/material-ui";
import { Box, Typography } from "@mui/material";

export default function GraficiMaterialUI() {
  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", padding: 3, marginBottom: 4 }}
      >
        Andamento Visitatori 2025
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
            Primo Grafico Material-ui
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
