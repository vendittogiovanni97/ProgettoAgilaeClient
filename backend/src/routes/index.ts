import { Router, Express } from "express";
import { UploadedFile } from "./uploadRouter";

const addRouter = (app: Express) => {
  const router = Router();

  UploadedFile(router);

  app.use("/rest", router);
};

export default addRouter;
