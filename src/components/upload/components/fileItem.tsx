"use client";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { Check, InsertDriveFile as FileIcon } from "@mui/icons-material";
import { FileData } from "@/context/types/TypeFileContext";

interface FileItemProps {
  file: FileData;
}

export function FileItem({ file }: FileItemProps) {
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
        <IconButton disabled edge="end" aria-label="Caricamento completato">
          <Check color="success" />
        </IconButton>
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
          }}
        />
      )}
    </ListItem>
  );
}
