"use client";

import { useFileContext } from "@/context/FileContext";
import { CircularProgress, Box } from "@mui/material";

export function LoadingIndicator() {
  const { loading } = useFileContext();

  if (!loading) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
      <CircularProgress size={24} />
    </Box>
  );
}
