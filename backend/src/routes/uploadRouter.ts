import { Router } from "express";
import {
  downloadFile,
  listFiles,
  previewFile,
  uploadFiles,
} from "../controllers/uploadControllers";

export const UploadedFile = (app: Router) => {
  const router = Router();

  // Post - Carica file
  router.post("/upload", uploadFiles);

  // Get - Lista file
  router.get("/files", listFiles);

  // Get - Download file
  router.get("/:id/download", downloadFile);

  // Get - Prewiew file
  router.get("/:id/preview", previewFile);

  app.use("/", router);
};
