import { Router } from "express";
import {
  downloadFile,
  getUploadFileInfo,
  listFiles,
  previewFile,
  uploadFiles,
  uploadFiles2,
} from "../controllers/uploadControllers";

export const UploadedFile = (app: Router) => {
  const router = Router();

  // Post - Carica file
  router.post("/upload", uploadFiles2);

  // Get - Lista file
  router.get("/files", listFiles);

  // Get - Download file
  router.get("/:id/download", downloadFile);

  // Get - Prewiew file
  router.get("/:id/preview", previewFile);

  // Post // Lettura file
  router.get("/getUploadFileInfo", getUploadFileInfo);

  app.use("/", router);
};
