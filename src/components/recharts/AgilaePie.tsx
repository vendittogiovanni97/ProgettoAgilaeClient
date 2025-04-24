import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import PieChart from "./graficTest/pieChart";

export default function AgilaePie() {
  return (
    <>
      <Grid sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          height: 350,
          display: "flex",
          justifyContent: "center", // Cambiato da flex-start a center
          alignItems: "center",
          width: "30%",
          borderRadius: 4,
          bgcolor: "#d2d6d4",
          maxWidth: 1000,
          boxShadow: "0 8px 16px -8px rgba(0,0,0,0.8)",
          ml: 25, // 24px
          position: "relative",
          top: -70, // 👈 Sposta di 16px verso l'alto
        }}
      >
        <PieChart />
      </Box>
    </>
  );
}
