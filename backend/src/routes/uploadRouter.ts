import { Router } from "express";
import {
  downloadFile,
  getFileInfo,
  listFiles,
  previewFile,
  uploadFiles2,
} from "../controllers/uploadControllers";

export const UploadedFile = (router: Router) => {
  // RIMUOVI questa riga:
  // const router = Router();

  router.post("/upload", uploadFiles2);
  router.get("/files", listFiles);
  router.get("/:id/download", downloadFile);
  router.get("/:id/preview", previewFile);
  router.get("/files/info", getFileInfo);
};
