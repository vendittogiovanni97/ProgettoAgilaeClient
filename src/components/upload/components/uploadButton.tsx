import { useFileContext } from "@/context/FileContext";
import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ChangeEvent } from "react";

export function UploadButton() {
  const { uploadFiles } = useFileContext();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      // Chiama la funzione invece di riassegnarla
      await uploadFiles(selectedFiles);
    }
  };
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUpload />}
      sx={{ mb: 2 }}
    >
      Carica file
      <input
        type="file"
        hidden
        multiple
        onChange={handleFileChange}
        data-testid="file-input"
      />
    </Button>
  );
}
