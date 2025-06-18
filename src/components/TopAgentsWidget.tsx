'use client'

import { Box, Typography, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

///Ordinamento Dinamico per pratiche
/// Pulsante Mostra tutti
/// Refresh Automatico
/// Filri Dinamici per mese o settimana 
/// Nome cliccabile per visualizzare il profilo

const topAgents = [
  { name: "Mario Rossi", pratiche: 35 },
  { name: "Luca Bianchi", pratiche: 28 },
  { name: "Giulia Verdi", pratiche: 25 },
  { name: "Stefano Gialli", pratiche: 22 },
  { name: "Laura Neri", pratiche: 20 },
];

function TopAgentsWidget() {
  return (
    <Box
      width={300}
      height={315}
      borderRadius={4}
      boxShadow={3}
      bgcolor="#d2d6d4"
      p={2}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "bold", fontSize: 18, color: '#1e1d4f' }}
        gutterBottom
      >
        Top 5 Agenti
      </Typography>

      <Stack spacing={1.5}>
        {topAgents.map((agent, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="#C0C0C0"
            px={2}
            py={1}
          >
            <Box display="flex" alignItems="center">
              <PersonIcon sx={{ color: "#444", mr: 1 }} />
              <Typography variant="body1" fontFamily={'Roboto'} sx={{color: "#1e1d4f"}}>
                {agent.name}
              </Typography>
            </Box>
            <Typography fontSize={13} fontWeight={600} color="#333">
              {agent.pratiche} pratiche
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default TopAgentsWidget;