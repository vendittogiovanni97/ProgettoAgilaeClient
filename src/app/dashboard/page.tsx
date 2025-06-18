"use client";
import { FaCogs } from "react-icons/fa";
import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { options } from "@/components/recharts/graficTest/barChart";
import Chart from "@/components/Chart";
import CardWidget from "@/components/CardWidget";
import FlottaRunningWidget from "@/components/FlottaRunningWidget";
import TopAgentsWidget from "@/components/TopAgentsWidget";

export default function DashboardPage() {
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* GRAFICO: 2 colonne intere */}
        <Grid size={{ xs: 12 }}>
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
              <Chart option={options} />
            </Paper>
          </Box>
        </Grid>

        {/* CARD 1 - A sinistra */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TopAgentsWidget />
        </Grid>

        {/* CARD STATISTICA - Al centro */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            width={300}
            height={315}
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            p={2}
            borderRadius={4}
            boxShadow={3}
            bgcolor="#d2d6d4" // colore simile a quello dell’immagine
          >
            <CardWidget
              label="Trattative"
              count={347}
              icon={<FaCogs />}
              href="/dashboard/form/documenti/flowcategory/1"
            />
            <CardWidget
              label="Ordini"
              count={862}
              icon={<FaCogs />}
              href="/dashboard/form/documenti/flowcategory/3"
            />
            <CardWidget
              label="Pratiche"
              count={480}
              icon={<FaCogs />}
              href="/dashboard/form/documenti/flowcategory/2"
            />
          </Box>
        </Grid>

        {/* CARD 3 - A destra */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FlottaRunningWidget />
        </Grid>
      </Grid>
    </Box>
  );
}
