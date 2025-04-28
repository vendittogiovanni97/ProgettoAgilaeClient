import { UploadedFile } from "express-fileupload";
import { Request, Response } from "express";
import path from "path";
import dbClient from "../configuration/db.config";

export const uploadProfilePic = async (
  request: Request,
  response: Response
) => {
  const profilePicsPath = "./public/document";
  const files = Array.isArray(request.files?.profilePic)
    ? request.files?.profilePic
    : [request.files?.profilePic];

  console.log(request.body.mioJson);

  if (files.length > 1) {
    response.status(400).json("You can upload one file only");
    return;
  }

  const file: UploadedFile | undefined = files[0];

  if (file === undefined) {
    response.status(400).json("Provide a profilePic");
    return;
  }

  if (!file.mimetype.startsWith("image/")) {
    response.status(400).json("Invalid file type");
    return;
  }

  const ext = path.extname(file.name);

  const filename = `${file.name}-${new Date().valueOf()}${ext}`;

  file.mv(`${profilePicsPath}/${filename}`);

  await dbClient.profile.update({
    data: {
      profilePic: filename,
    },
  });

  response.status(200).json({ filename });
};
