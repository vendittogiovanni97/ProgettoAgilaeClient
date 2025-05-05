import { FileData } from "@/context/types/TypeFileContext";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  SxProps,
  Theme,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useRef } from "react";

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
}

export const AgilaeUpload: React.FC<AgilaeUploadProps> = (params) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = React.useState<string>("");

  useEffect(() => {
    if (params.value) {
      if (typeof params.value === "string") {
        setSelectedFileName(params.value);
      } else if (params.value.name) {
        setSelectedFileName(params.value.name);
      }
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

      // Chiama onUpload se esiste
      if (params.onUpload) {
        await params.onUpload(selectedFile);
      }

      if (params.onChange) {
        await params.onChange(selectedFile);
      }
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
          {...params.buttonProps}
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
