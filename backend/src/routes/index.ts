import { Router } from "express";
import { UploadedFile } from "./uploadRouter";

const addRouter = (app: Router) => {
  const router = Router();

  UploadedFile(router);

  app.use("/rest", router);
};

export default addRouter;
