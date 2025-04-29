"use client";

import {
  ListItem,
  LinearProgress,
  IconButton,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import {
  Check,
  InsertDriveFile as FileIcon,
  Visibility as PreviewIcon,
  GetApp as DownloadIcon,
} from "@mui/icons-material";
import { FileData } from "@/context/types/TypeFileContext";
import { useFileContext } from "@/context/FileContext";
import { getFileIcon } from "./IconFile";

interface FileItemProps {
  file: FileData;
}

export function FileItem({ file }: FileItemProps) {
  const { downloadFile, previewFile } = useFileContext();

  const handlePreview = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Previene la propagazione
    if (file.id) {
      try {
        const url = await previewFile(file.id, file.name);
        window.open(url, "_blank");
      } catch (error) {
        console.error("Errore durante l/n anteprima", error);
      }
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene la propagazione dell'evento
    if (file.id) {
      downloadFile(file.id, file.name);
    }
  };

  return (
    <ListItem
      sx={{
        borderLeft: 4,
        borderColor:
          file.status === "success"
            ? "success.main"
            : file.status === "error"
            ? "error.main"
            : "divider",
        "&:hover": {
          backgroundColor:
            file.status === "success" ? "rgba(0, 0, 0, 0.04)" : "inherit",
        },
        p: 2,
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {getFileIcon(file.name, file.status)}

      <Box flexGrow={1}>
        <Typography variant="body1" component="div" noWrap>
          {file.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {file.size}
        </Typography>
      </Box>
      {file.status === "success" && (
        <>
          <IconButton
            size="small"
            edge="end"
            aria-label="Caricamento completato"
            sx={{ mr: 0.5 }}
          >
            <Check color="success" />
          </IconButton>
          <Tooltip title="Anteprima">
            <IconButton
              edge="end"
              onClick={handlePreview}
              size="small"
              sx={{ mr: 0.5 }}
            >
              <PreviewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Scarica">
            <IconButton edge="end" onClick={handleDownload} size="small">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {file.status === "uploading" && (
        <LinearProgress
          variant="determinate"
          value={file.progress || 0}
          sx={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 4,
          }}
        />
      )}
    </ListItem>
  );
}
