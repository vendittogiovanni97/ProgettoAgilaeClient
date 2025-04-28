"use client";

import { UploadButton } from "./components/uploadButton";
import { ErrorAlert } from "./components/errorAlert";
import { LoadingIndicator } from "./components/loadingIndicator";
import { FileList } from "./components/fileList";

export default function UploadComponents2() {
  return (
    <>
      <UploadButton />
      <LoadingIndicator />
      <FileList />
      <ErrorAlert />
    </>
  );
}
