import { Request, Response } from "express";
import dbClient from "../configuration/db.config";
import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";

/////// Lista di tutti i files ////////

export const listFiles = async (request: Request, response: Response) => {
  try {
    const files = await dbClient.uploadFile.findMany({
      orderBy: { createdAt: "desc" },
    });
    response.json(files);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error fetching files.");
  }
};

///////////////////////////////////////////////////////////////////////////////

/////////// Download File ///////////

export const downloadFile = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const file = await dbClient.uploadFile.findUnique({
      where: { id: parseInt(request.params.id) },
    });

    if (!file) {
      response.status(404).send("File not found.");
      return;
    }

    const absolutePath = path.join(__dirname, "../../", file.filepath);
    response.download(absolutePath, file.filename); // Scarica con nome originale
  } catch (error) {
    console.error(error);
    response.status(500).send("Error downloading file.");
  }
};

///////////////////////////////////////////////////////////////////////////////

/////////// Preview File ///////////

export const previewFile = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const file = await dbClient.uploadFile.findUnique({
      where: { id: parseInt(request.params.id) },
    });

    if (!file) {
      response.status(404).send("File not found.");
      return;
    }

    const absolutePath = path.join(__dirname, "../../", file.filepath);

    response.setHeader("Content-Type", file.mimetype);
    fs.createReadStream(absolutePath).pipe(response); // Stream file come preview
  } catch (error) {
    console.error(error);
    response.status(500).send("Error previewing file.");
  }
};

///////////////////////////////////////////////////////////////////////////////

/////////// Upload File ///////////

export const uploadFiles = async (request: Request, response: Response) => {
  const profilePicsPath = "./public/document";
  const files = Array.isArray(request.files?.profilePic)
    ? request.files?.profilePic
    : [request.files?.profilePic];

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

  // Salva nel database
  await dbClient.uploadFile.create({
    data: {
      filename: file.name,
      mimetype: file.mimetype,
      filetype: filename,
      filepath: `/uploads/documents/${file.name}`,
    },
  });
  response.status(200).send("Files uploaded successfully.");
};
