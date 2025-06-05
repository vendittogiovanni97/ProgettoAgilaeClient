import React from "react";
import { Box, Typography, Link, IconButton, TextField, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X"; // Sostituisci con TwitterIcon se necessario
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      {/* Primo blocco arancione */}
      <Box sx={{ bgcolor: "#ef4423", color: "white", py: 5, px: { xs: 2, md: 6 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 4,
          }}
        >
          {/* Contatti */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              CONTATTI
            </Typography>
            <Typography variant="body2">Lorem Ipsum dolor sit:<br />0000000</Typography>
            <Typography variant="body2">Lorem Ipsum, ## 000000</Typography>
          </Box>
          {/* Social */}
          <Box sx={{ textAlign: { xs: "left"} }}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              SEGUICI SU
            </Typography>
            <Box>
              <IconButton sx={{ color: "white" }}>
                <XIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Box>
          {/* Newsletter */}
          <Box sx={{ width: { xs: "100%", md: "auto" }, textAlign: { xs: "left", md: "right" } }}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              NEWSLETTER
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: { xs: "flex-start", md: "flex-end" },
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                placeholder="Indirizzo email"
                sx={{
                  bgcolor: "white",
                  borderRadius: "20px 0 0 20px",
                  width: 220,
                  mr: 0,
                  "& .MuiInputBase-input": { color: "#333" },
                }}
                InputProps={{
                  sx: { borderRadius: "20px 0 0 20px" },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#222",
                  color: "white",
                  borderRadius: "0 20px 20px 0",
                  boxShadow: "none",
                  px: 3,
                  height: "40px",
                  "&:hover": { bgcolor: "#444" },
                }}
              >
                Iscriviti
              </Button>
            </Box>
          </Box>
        </Box>
        {/* Copyright */}
        <Box sx={{ textAlign: "right", mt: 4 }}>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            © 2025 All Rights Reserved
          </Typography>
        </Box>
      </Box>
      {/* Secondo blocco verde */}
      <Box sx={{ bgcolor: "#13b1ac", color: "white", py: 2, height: "100px" }}>
        <Box sx={{ 
            bgcolor: "#13b1ac", 
            color: "white", 
            py: 3, 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            gap: 8, 
            flexWrap: "wrap",
          }}
          >
          <Link href="#" underline="always"
           sx={{ color: "white", fontWeight: 500, textDecorationColor: "white", 
            "&:hover": {
              textDecorationColor: "white", 
            },
            "&:visited": {
              textDecorationColor: "white",
            } }}
            >       
            Area Personale
          </Link>
          <Link href="#" underline="always" sx={{ color: "white", fontWeight: 500, textDecorationColor: "white", "&:hover": { textDecorationColor: "white" }, "&:visited": { textDecorationColor: "white" } }}>
            Privacy Policy
          </Link>
          <Link href="#" underline="always" sx={{ color: "white", fontWeight: 500,textDecorationColor: "white", "&:hover": { textDecorationColor: "white" }, "&:visited": { textDecorationColor: "white" }  }}>
            Cookie Policy
          </Link>
          <Link href="#" underline="always" sx={{ color: "white", fontWeight: 500, textDecorationColor: "white", "&:hover": { textDecorationColor: "white" }, "&:visited": { textDecorationColor: "white" } }}>
            FAQ
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
