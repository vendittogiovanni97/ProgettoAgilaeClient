"use client";

import { AgilaeUpload } from "@/Test/AgilaeUpload";
import { useFileContext } from "@/context/FileContext";
import { useState } from "react";

export default function UploadComponents2() {
  const { files } = useFileContext();
  return (
    <>
      <AgilaeUpload
        value={files}
        accept=".pdf, .doc, .docx"
        buttonProps={{ color: "primary" }}
        hidden
        label="Carica Allegato"
        maxFileSize={5 * 1024 * 1024} // 5MB
      ></AgilaeUpload>
    </>
  );
}
