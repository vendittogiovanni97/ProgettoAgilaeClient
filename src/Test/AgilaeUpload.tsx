import { Button, SxProps, Theme } from "@mui/material";
import React, { ChangeEvent, HTMLInputTypeAttribute, useRef } from "react";

interface AgilaeUploadProps {
  onUpload?: (files: File[]) => Promise<any> | void;
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  startIcon?: React.ReactNode;
  components?: any;
  variant?: "text" | "outlined" | "contained";
  sx?: SxProps<Theme>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: any) => Promise<any> | void;
  buttonProps?: AgilaeUploadProps;
  hidden?: boolean | undefined;
}

export const AgilaeUpload: React.FC<AgilaeUploadProps> = (params) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      console.log("File selezionati:", selectedFiles);

      // Chiama onUpload se esiste
      if (params.onUpload) {
        await params.onUpload(selectedFiles);
      }

      if (params.onChange) {
        await params.onChange(selectedFiles);
      }
    }
  };
  return (
    <>
      <Button
        variant={params.variant}
        startIcon={params.startIcon}
        disabled={params.disabled}
        onClick={handleClick}
        sx={params.sx}
        {...params.buttonProps}
      >
        {params.label}
      </Button>
      <input
        type="file"
        ref={inputRef}
        hidden
        multiple={params.multiple}
        accept={params.accept}
        onChange={handleFileChange}
        {...params.inputProps}
      />
    </>
  );
};
