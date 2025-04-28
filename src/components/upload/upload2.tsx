"use client";

import { useState, ChangeEvent } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  IconButton,
  Alert,
} from "@mui/material";
import {
  CloudUpload,
  Check,
  Close,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";
import { FileData } from "@/types/FileData";

export default function UploadComponents2() {
  const [files, setFiles] = useState<FileData[]>([
    { name: "nome-file-01.pdf", size: "68 MB", status: "success" },
    { name: "nome-file-02.doc", size: "68 MB", status: "success" },
    { name: "nome-file-03.png", status: "uploading", progress: 33 },
    { name: "nome-file-04.jpg", status: "error" },
  ]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        status: "uploading" as const,
        progress: 0,
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  return (
    <>
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

      <List dense>
        {files.map((file, index) => (
          <ListItem
            key={index}
            sx={{
              borderLeft: 4,
              borderColor:
                file.status === "success"
                  ? "success.main"
                  : file.status === "error"
                  ? "error.main"
                  : "divider",
            }}
          >
            <ListItemIcon>
              <FileIcon color={file.status === "error" ? "error" : "inherit"} />
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              secondary={file.size}
              primaryTypographyProps={{
                noWrap: true,
                title: file.name, // Tooltip per nomi lunghi
              }}
            />
            {file.status === "success" && (
              <IconButton
                disabled
                edge="end"
                aria-label="Caricamento completato"
              >
                <Check color="success" />
              </IconButton>
            )}
            {(file.status === "error" || file.status === "uploading") && (
              <IconButton
                edge="end"
                aria-label={`Elimina ${file.name}`}
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
              >
                <Close color={file.status === "error" ? "error" : "inherit"} />
              </IconButton>
            )}
            {file.status === "uploading" && (
              <LinearProgress
                variant="determinate"
                value={file.progress}
                sx={{
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
              />
            )}
          </ListItem>
        ))}
      </List>

      {files.some((file) => file.status === "error") && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Errore nel caricamento di alcuni file.
        </Alert>
      )}
    </>
  );
}
