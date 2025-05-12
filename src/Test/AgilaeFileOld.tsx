import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { ErrorResponse, GenericResponse } from '../interfaces/Common';
import { validateIsPresent } from '../utils/ValidateUtils';
import CustomIconButton from './CustomIconButton';
import { AttachFile } from '@mui/icons-material';
import { FileCategoryInterface, FileDataInterface } from '../interfaces/AgilaeFile';

interface AgilaeFileOldParams {
  category?: FileCategoryInterface;
  onRead?: (successCallback?: (res: FileDataInterface) => void, errorCallback?: (error: ErrorResponse) => void) => Promise<FileDataInterface | undefined>;
  onUpload?: (file: File, successCallback?: (res: GenericResponse) => void, errorCallback?: (error: ErrorResponse) => void) => Promise<GenericResponse | undefined>;
  onDownload?: (filename: string, errorCallback?: (error: ErrorResponse) => void) => Promise<void>;
};

const AgilaeFileOld: React.FC<AgilaeFileOldParams> = (params) => {
  const {onUpload, onDownload, onRead} = params;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');

  useEffect(()=>{
    if(!!onRead)
      onRead(
        (res) => setFileName(res.fileName),
        (error) => {}
      )
  },[onRead]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if(!!onUpload)
        onUpload(file);
      // Puoi gestire il file qui (es. inviarlo a un server)
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <TextField
        label="Carica file"
        value={fileName}
        onClick={handleClick}
        InputProps={{ readOnly: true }}
        fullWidth
      />
      {!!onDownload && validateIsPresent(fileName) && <CustomIconButton icon={<AttachFile />} color="primary" tooltip="Download" onClick={() => onDownload(fileName)} />}
    </div>
  );
};

export default AgilaeFileOld;
