"use client";

import { ErrorAlert } from "./components/errorAlert";
import { LoadingIndicator } from "./components/loadingIndicator";
import { FileList } from "./components/fileList";
import { AgilaeUpload } from "@/Test/AgilaeUpload";
import { useFileContext } from "@/context/FileContext";
import { CloudUpload } from "@mui/icons-material";

export default function UploadComponents2() {
  const { uploadFiles } = useFileContext();
  return (
    <>
      <AgilaeUpload
        components="label"
        onUpload={uploadFiles}
        accept=".pdf, .doc, .docx"
        startIcon={<CloudUpload />}
        buttonProps={{ variant: "contained" }}
        multiple
        hidden
        sx={{ mb: 2 }}
        label="Carica File"
        maxFileSize={5 * 1024 * 1024} // 5MB
      ></AgilaeUpload>
      <LoadingIndicator />
      <FileList />
      <ErrorAlert />
    </>
  );
}
