import { Router } from "express";

export const UploadedFile = (app: Router) => {
  const router = Router();

  app.use("/upload", router);
};
