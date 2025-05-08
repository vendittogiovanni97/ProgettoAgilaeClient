"use client";

import { AgilaeUpload } from "@/Test/AgilaeUpload";
import { useFileContext } from "@/context/FileContext";

export default function UploadComponents2() {
  const { files, uploadFiles } = useFileContext();
  return (
    <>
      <AgilaeUpload
        value={files}
        onUpload={uploadFiles}
        onRead={() => files}
        accept=".pdf, .doc, .docx"
        buttonProps={{ color: "primary" }}
        hidden
        label="Carica Allegato"
        maxFileSize={5 * 1024 * 1024} // 5MB
      ></AgilaeUpload>
    </>
  );
}
