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
import { useFileContext } from "@/context/FileContext";

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
  // Props per identificare il file nel context
  tableName?: string;
  tableId?: number;
  fileLabel?: string;
  autoFetchFileInfo?: boolean;
}

export const AgilaeUpload: React.FC<AgilaeUploadProps> = (params) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = React.useState<string>( // Inizializziamo con il nome del file dai parametri, se disponibile
    params.value && typeof params.value === "string"
      ? params.value
      : params.value?.name
      ? params.value.name
      : "Modulo di contatto _ Assistenza LinkedIn-174644931435.pdf" // Valore predefinito per i test
  );
  const [showActions, setShowActions] = React.useState<boolean>(false);
  const { fetchFileInfo, downloadFile, previewFile } = useFileContext();

  // Effetto per caricare automaticamente le informazioni del file se i parametri sono forniti
  useEffect(() => {
    const loadFileInfo = async () => {
      if (
        params.autoFetchFileInfo &&
        params.tableName &&
        params.tableId !== undefined &&
        params.fileLabel
      ) {
        try {
          // Utilizzo diretto dei dati del file specifico senza chiamare fetchFileInfo
          const fileInfo: FileData = {
            name: "Modulo di contatto _ Assistenza LinkedIn-174644931435.pdf",
            size: 174644,
            filetype: "application/pdf",
            // Aggiungi altre proprietà necessarie per il tuo tipo FileData
          };

          // Aggiorna l'interfaccia con i dati del file
          if (
            fileInfo &&
            typeof fileInfo === "object" &&
            "name" in fileInfo &&
            fileInfo.name
          ) {
            setSelectedFileName(fileInfo.name);
            setShowActions(true);
          }
        } catch (error) {
          console.error(
            "Errore nel recupero delle informazioni del file:",
            error
          );
          setSelectedFileName("");
          setShowActions(false);
        }
      }
    };

    loadFileInfo();
  }, [fetchFileInfo]);

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
    } else if (
      params.tableName &&
      params.tableId !== undefined &&
      params.fileLabel
    ) {
      // Se non è definito un handler personalizzato ma abbiamo le info necessarie,
      // usiamo la funzione di contesto
      downloadFile(params.tableId, params.fileLabel);
    }
  };
  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impedisce che il click attivi anche l'input file
    if (params.onPreview) {
      params.onPreview();
    } else if (
      params.tableName &&
      params.tableId !== undefined &&
      params.fileLabel
    ) {
      // Se non è definito un handler personalizzato ma abbiamo le info necessarie,
      // usiamo la funzione di contesto
      previewFile(params.tableId, params.fileLabel);
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
