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
  const documentsPath = "./public/document"; // Modificato da 'document' a 'documents' per coerenza

  try {
    // Verifica che ci siano file nella richiesta
    if (!request.files || !request.files.files) {
      response.status(400).json({ error: "No files were uploaded." });
      return;
    }

    // Normalizza i file in un array
    const files = request.files.files;
    const uploadedFiles = Array.isArray(files) ? files : [files];

    // Tipi MIME accettati
    const acceptedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const savedFiles = [];

    // Processa ogni file
    for (const file of uploadedFiles as UploadedFile[]) {
      try {
        // Verifica il tipo di file
        if (!acceptedMimeTypes.includes(file.mimetype)) {
          throw new Error(`Invalid file type for file: ${file.name}`);
        }

        // Genera un nome file sicuro
        const ext = path.extname(file.name);
        const safeFilename = `${
          path.parse(file.name).name
        }-${Date.now()}${ext}`;
        const savePath = path.join(documentsPath, safeFilename);

        // Sposta il file
        await file.mv(savePath);

        // Salva nel database
        const createdFile = await dbClient.uploadFile.create({
          data: {
            filename: safeFilename,
            mimetype: file.mimetype,
            filetype: ext.replace(".", ""), // Corretto: rimuove solo il punto
            filepath: `/documents/${safeFilename}`,
          },
        });

        savedFiles.push(createdFile);
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        // Continua con i file successivi anche se uno fallisce
      }
    }

    // Verifica se almeno un file è stato processato con successo
    if (savedFiles.length === 0) {
      response.status(400).json({
        error: "No files were successfully processed.",
        details: uploadedFiles.map((f) => ({
          name: f.name,
          type: f.mimetype,
          size: f.size,
        })),
      });
    }

    response.status(200).json({
      message: "Files uploaded successfully.",
      files: savedFiles,
      count: savedFiles.length,
    });
  } catch (error) {
    console.error("Server error during file upload:", error);
    response.status(500).json({
      error: "Internal server error while uploading files.",
      details: "",
    });
  }
};
