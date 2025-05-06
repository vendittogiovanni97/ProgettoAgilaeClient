import { FileData } from "@/context/types/TypeFileContext";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  SxProps,
  Theme,
  Tooltip,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useRef } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ButtonInfo {
  icon: string;
  label: string;
  color: string;
  sortOrder: number;
}

interface AgilaeUploadProps {
  onUpload?: (files: File) => Promise<any> | void;
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  startIcon?: React.ReactNode;
  components?: any;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  sx?: SxProps<Theme>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: any) => Promise<any> | void;
  buttonProps?: AgilaeUploadProps;
  hidden?: boolean | undefined;
  value?: FileData;
  onPreview?: () => void;
  onDownload?: () => void;
  onRead?: () => void;
  buttonInfo?: ButtonInfo;
}

export const AgilaeUpload: React.FC<AgilaeUploadProps> = (params) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = React.useState<string>("");
  const [showActions, setShowActions] = React.useState<boolean>(false);

  useEffect(() => {
    if (params.value) {
      if (typeof params.value === "string") {
        setSelectedFileName(params.value);
        setShowActions(true);
      } else if (params.value.name) {
        setSelectedFileName(params.value.name);
        setShowActions(true);
      }
    } else {
      setShowActions(false);
    }
  }, [params.value]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      console.log("File selezionati:", selectedFile);

      setSelectedFileName(selectedFile.name);
      setShowActions(true);

      // Chiama onUpload se esiste
      if (params.onUpload) {
        await params.onUpload(selectedFile);
      }

      if (params.onChange) {
        await params.onChange(selectedFile);
      }
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impedisce che il click attivi anche l'input file
    if (params.onDownload) {
      params.onDownload();
    }
  };
  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impedisce che il click attivi anche l'input file
    if (params.onPreview) {
      params.onPreview();
    }
  };
  return (
    <>
      <FormControl
        variant="outlined"
        disabled={params.disabled}
        sx={{ cursor: "pointer", width: "40%" }}
      >
        <InputLabel htmlFor="file-input">{params.label}</InputLabel>
        <OutlinedInput
          readOnly
          value={selectedFileName}
          color={params.color}
          disabled={params.disabled}
          onClick={handleClick}
          inputProps={{ style: { cursor: "pointer" } }}
          sx={params.sx}
          label={params.label}
          endAdornment={
            showActions && (
              <Box sx={{ display: "flex" }}>
                <Tooltip title="Scarica file">
                  <IconButton
                    edge="end"
                    onClick={handleDownloadClick}
                    disabled={!params.onDownload}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Anteprima file">
                  <IconButton
                    edge="end"
                    onClick={handlePreviewClick}
                    disabled={!params.onPreview}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )
          }
        />
        <input
          type="file"
          ref={inputRef}
          hidden
          multiple={params.multiple}
          accept={params.accept}
          onChange={handleFileChange}
          {...params.inputProps}
        />
      </FormControl>
    </>
  );
};
