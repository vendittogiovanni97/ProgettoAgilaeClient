"use client";

import { useFileContext } from "@/context/FileContext";
import { List } from "@mui/material";
import { FileItem } from "./fileItem";

export function FileList() {
  const { files } = useFileContext();

  return (
    <List dense>
      {files.map((file, index) => (
        <FileItem key={index} file={file} />
      ))}
    </List>
  );
}
