/*
<AgilaeFile 
    onUpload={(file,successCallback,errorCallback) => uploadFile(file,"FormData",100,"cantero",0,"Generico",(res) => {if(!!successCallback) successCallback(res as FileDataInterface)},errorCallback) as Promise<FileDataInterface | undefined>}
    onDownload={(filename,successCallback,errorCallback) => downloadFile("FormData",100,"cantero",filename,successCallback,errorCallback)}
    onPreview={(successCallback,errorCallback) => downloadPreview("FormData",100,"cantero",successCallback,errorCallback)}
    onRead={(successCallback,errorCallback) => getFile("FormData",100,"cantero",successCallback,errorCallback)}
/>
*/

export enum FileCategoryId {
  Generico = "Generico",
  // Altri non definiti non servono per check e potrebbero variare da service
}

export interface FileCategoryInterface {
  id: string;
  button: ButtonInfo;
  accepts: string;
  maxSize: number;
}

export interface FileDataInterface {
  fileName: string;
  fileSize: number;
  contentType: string;
  category: FileCategoryInterface;
}

export const fileDataDefault = (
  category?: FileCategoryInterface
): FileDataInterface => {
  return {
    fileName: "",
    fileSize: 0,
    contentType: "",
    category: category ?? {
      id: FileCategoryId.Generico,
      button: new ButtonInfo({
        icon: "Upload",
        label: "Carica file",
        color: "primary",
      }),
      accepts: "",
      maxSize: 10,
    },
  };
};

import { CloseButton } from "@/module/common/components/CustomButton";
import CustomDialog from "@/module/common/components/CustomDialog";
import CustomIconButton, {
  ShowIcon,
} from "@/module/common/components/CustomIconButton";
import { getPresetByButtonInfo } from "@/module/common/interfaces/ButtonPresets";
import {
  ErrorResponse,
  GenericResponse,
} from "@/module/common/interfaces/Common";
import { useThemeContext } from "@/module/common/providers/ThemeProvider";
import { renderErrors } from "@/module/common/utils/ValidateUtils";
import { AttachFile } from "@mui/icons-material";
import { TextField, InputAdornment, Box, Typography } from "@mui/material";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { ButtonInfo } from "@/module/common/interfaces/Entity";

interface AgilaeFileProps {
  uploadOnButton?: boolean; //se true creare tasto ed usare quello
  min?: number;
  max?: number;
  attributeName?: string;
  required?: boolean;
  readOnly?: boolean;
  label?: string;
  onChange?: (value: FileDataInterface) => void;
  value?: FileDataInterface;
  category?: FileCategoryInterface;
  onRead?: (
    successCallback?: (res: FileDataInterface) => void,
    errorCallback?: (error: ErrorResponse) => void
  ) => Promise<FileDataInterface | undefined>;
  onUpload?: (
    file: File,
    successCallback?: (res: FileDataInterface) => void,
    errorCallback?: (error: ErrorResponse) => void
  ) => Promise<FileDataInterface | undefined>;
  onDownload?: (
    filename: string,
    successCallback?: (res: GenericResponse) => void,
    errorCallback?: (error: ErrorResponse) => void
  ) => Promise<void>;
  onPreview?: (
    successCallback?: (res: Blob) => void,
    errorCallback?: (error: ErrorResponse) => void
  ) => Promise<Blob | undefined>;
  errors?: string[] | undefined;
  variant?: "standard" | "outlined" | "filled";
}

const getFileSignature = async (file: File): Promise<string> => {
  const buffer = await file.slice(0, 4).arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join(" ");
};

const magicNumbers: Record<string, string[]> = {
  pdf: ["25 50 44 46"], // "%PDF"
  doc: ["D0 CF 11 E0"], // vecchi Word .doc
  docx: ["50 4B 03 04"], // File ZIP (formato base di .docx, .xlsx, .pptx)
};

const isPdf = async (file: File): Promise<boolean> => {
  const buffer = await file.slice(0, 4).arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  ); // %PDF
};

const AgilaeFile: React.FC<AgilaeFileProps> = (params) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localValue, setLocalValue] = useState<FileDataInterface>(
    params.value ?? fileDataDefault(params.category)
  );
  const [onPreview, setOnPreview] = useState<Blob | undefined>(undefined);
  const { setLoading, setApiError } = useThemeContext();

  useEffect(() => {
    if (!!params.onRead)
      params.onRead(
        (res) => setLocalValue(res),
        (error) => {
          void error;
        }
      );
  }, [params.onRead]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!!localValue && event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      //Test dim  file
      const CURRENT_SIZE = selectedFile.size / 1024 / 1024;
      const MAX_FILE_SIZE = localValue.category.maxSize;
      if (CURRENT_SIZE > MAX_FILE_SIZE) {
        const errorResponse = new ErrorResponse({
          status: 500,
          message: "Il file selezionato è troppo grande.",
          errors: [
            `La dimensione massima consentita è ${MAX_FILE_SIZE}MB.
             Il file selezionato ha una dimensione di ${CURRENT_SIZE}MB.`,
          ],
        });
        setApiError(errorResponse);
        return;
      }

      const valid = await isPdf(selectedFile);
      if (!valid) {
        const errorResponse = new ErrorResponse({
          status: 400,
          message: "Il file non è un PDF valido.",
        });
        setApiError(errorResponse);
        return;
      }

      /*const signature = (await getFileSignature(selectedFile)).toUpperCase();
      const acceptedSignatures = Object.entries(magicNumbers).filter(([key]) =>
        localValue.category.accepts.includes(key)
      );

      const isValidSignature = acceptedSignatures.some(([, signatures]) =>
        signatures.includes(signature)
      );

      if (!isValidSignature) {
        const errorResponse = new ErrorResponse({
          status: 400,
          message: "Il contenuto del file non corrisponde al tipo dichiarato.",
          errors: [
            `Tipo dichiarato: ${selectedFile.type}`,
            `Firma trovata: ${signature}`,
          ],
        });
        setApiError(errorResponse);
        return;
      } */

      //Test extension content
      //TODO: Verificare se il file è effettivamente del tipo indicato

      setLocalValue({ ...localValue, fileName: selectedFile.name });

      // Chiama onUpload se esiste
      if (params.onUpload) {
        const keyLoading = setLoading("AgilaeFile.handleFileChange", true);
        params.onUpload(
          selectedFile,
          (fileData: FileDataInterface) => {
            setLoading(keyLoading, false);
            setLocalValue(fileData);
          },
          () => setLoading(keyLoading, false)
        );
      }

      // Chiama onChange se esiste
      if (params.onChange) {
        params.onChange(localValue);
      }
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impedisce che il click attivi anche l'input file
    if (params.onDownload && !!localValue.fileName) {
      params.onDownload(localValue.fileName);
    }
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impedisce che il click attivi anche l'input file
    if (params.onPreview && !!localValue.fileName) {
      params.onPreview(
        (blob: Blob) => {
          setOnPreview(blob);
        },
        () => {}
      );
    }
  };

  const getLabel = () => {
    return params.label ?? localValue.category.id;
  };

  const multiple = () => {
    return (
      (params.min != undefined && params.min > 1) ||
      (params.max != undefined && params.max > 1)
    );
  };

  console.log(localValue);

  return (
    <>
      <TextField
        fullWidth
        variant={params.variant ? params.variant : "outlined"}
        label={getLabel()}
        value={localValue?.fileName ?? ""}
        onClick={
          params.readOnly || params.uploadOnButton ? undefined : handleClick
        }
        slotProps={{
          htmlInput: { readOnly: true, style: { cursor: "pointer" } },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={{ display: "flex", gap: 1 }}>
                  {!!params.uploadOnButton && !params.readOnly && (
                    <CustomIconButton
                      preset={getPresetByButtonInfo(localValue.category.button)}
                      onClick={handleClick}
                    />
                  )}
                  {!!localValue?.fileName && !!params.onDownload && (
                    <DownloadIcon onClick={handleDownloadClick} />
                  )}
                  {!!localValue?.fileName && !!params.onPreview && (
                    <ShowIcon tooltip="Preview" onClick={handlePreviewClick} />
                  )}
                </Box>
              </InputAdornment>
            ),
          },
        }}
        disabled={params.readOnly}
        sx={{ width: "40%", cursor: "pointer" }}
        error={params.errors !== undefined && params.errors.length > 0}
        helperText={renderErrors(params.errors)}
        color={params.readOnly ? "secondary" : "primary"}
      />
      <input
        type="file"
        ref={inputRef}
        hidden
        multiple={multiple()}
        accept={localValue.category.accepts ?? ""}
        onChange={handleFileChange}
        disabled={params.readOnly}
      />
      {!!onPreview && (
        <CustomDialog
          isOpen={!!onPreview}
          onClose={() => setOnPreview(undefined)}
          size="md"
          title={
            <>
              <AttachFile color="primary" />
              Preview
            </>
          }
          actions={<CloseButton onClick={() => setOnPreview(undefined)} />}
        >
          {
            <Typography variant="subtitle1">
              {localValue?.contentType}
            </Typography>
          }
        </CustomDialog>
      )}
    </>
  );
};

export default AgilaeFile;
