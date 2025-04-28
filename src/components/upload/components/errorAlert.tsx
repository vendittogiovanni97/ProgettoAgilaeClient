"use client";

import { useFileContext } from "@/context/FileContext";
import { Alert } from "@mui/material";

export function ErrorAlert() {
  const { error } = useFileContext();

  if (!error) return null;

  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {error}
    </Alert>
  );
}
