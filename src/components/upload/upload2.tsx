"use client";

import { useFileContext } from "@/context/FileContext";
import AgilaeFile, { FileDataInterface } from "@/Test/AgilaeFile";

export default function UploadComponents2() {
  const { uploadFiles } = useFileContext();
  return (
    <>
      <AgilaeFile
        onUpload={(file) =>
          uploadFiles(file) as Promise<FileDataInterface | undefined>
        }
        /*onDownload={(filename) =>
          downloadFile("FormData", 1, "cantero", filename)
        } */
        /*onPreview={(successCallback, errorCallback) =>
          downloadPreview(
            "FormData",
            1,
            "cantero",
            successCallback,
            errorCallback
          )
        }
        onRead={(successCallback, errorCallback) =>
          getFile("FormData", 1, "cantero", successCallback, errorCallback)
        }*/
      />
    </>
  );
}
