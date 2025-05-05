import { ButtonInfo } from "../../../src/lib/buttonInfo"; // dove hai la classe
import { Request, Response } from "express";
import dbClient from "../configuration/db.config";
import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";

/////// Lista di tutti i files ////////

export const listFiles = async (request: Request, response: Response) => {
  try {
    //Ordina tutti i file in ordine più recente
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
      where: { id: parseInt(request.params.id) }, //il recupero del file per ID
    });

    if (!file) {
      response.status(404).send("File not found.");
      return;
    }

    const absolutePath = path.join(__dirname, "../../", file.filepath); //usiamo path.join per costruire il percorso assoluto
    response.download(absolutePath, file.filename); // Download automatico con il nome corretto del file
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

    if (!fs.existsSync(absolutePath)) {
      response.status(404).send("File not found on disk.");
      return;
    }

    response.setHeader("Content-Type", file.mimetype); //Con Content-Type dinamico in base al mimetype, il browser può gestire correttamente anteprime PDF o Word.
    fs.createReadStream(absolutePath).pipe(response); // Stream file come preview
  } catch (error) {
    console.error(error);
    response.status(500).send("Error previewing file.");
  }
};

///////////////////////////////////////////////////////////////////////////////

/////////// Upload File ///////////

export const uploadFiles = async (request: Request, response: Response) => {
  const documentsPath = "./public/document";

  try {
    const { tableName, tableId, fileLabel } = request.body;

    // Verifica parametri base
    if (!tableName || !tableId || !fileLabel) {
      response
        .status(400)
        .json({ error: "Missing tableName, tableId or fileLabel." });
      return;
    }

    if (!request.files || !request.files.files) {
      response
        .status(400)
        .json({ error: "Please upload at least one file to proceed." });
      return;
    }

    const files = request.files.files;
    const uploadedFiles = Array.isArray(files) ? files : [files];

    const acceptedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const savedFiles = [];
    const formattedFiles = [];

    for (const file of uploadedFiles as UploadedFile[]) {
      try {
        if (!acceptedMimeTypes.includes(file.mimetype)) {
          throw new Error(`Invalid file type for file: ${file.name}`);
        }

        const ext = path.extname(file.name);
        const safeFilename = `${
          path.parse(file.name).name
        }-${Date.now()}${ext}`;
        const savePath = path.join(documentsPath, safeFilename);

        await file.mv(savePath);

        const createdFile = await dbClient.uploadFile.create({
          data: {
            filename: safeFilename,
            mimetype: file.mimetype,
            filetype: ext.replace(".", ""),
            filepath: `/public/document/${safeFilename}`,
            size: file.size,
          },
        });

        // Collegamento con FileReference
        await dbClient.fileReference.create({
          data: {
            fileId: createdFile.id,
            tableName: tableName,
            tableId: Number(tableId),
            fileLabel: fileLabel,
          },
        });

        // Crea l'oggetto formattato con ButtonInfo
        const formattedFile = {
          nomefile: createdFile.filename,
          tipofile: createdFile.filetype,
          buttonInfo: new ButtonInfo({
            icon: "download",
            label: "Scarica",
            color: "primary",
            sortOrder: 1,
          }),
          dim: createdFile.size ?? 0,
          id: createdFile.id,
          filepath: createdFile.filepath,
        };

        savedFiles.push(createdFile);
        formattedFiles.push(formattedFile);
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
      }
    }

    if (savedFiles.length === 0) {
      response.status(400).json({
        error: "No files were successfully processed.",
      });
      return;
    }

    response.status(200).json({
      message: "Files uploaded and linked successfully.",
      files: formattedFiles,
      count: savedFiles.length,
    });
  } catch (error) {
    console.error("Server error during file upload:", error);
    response.status(500).json({
      error: "Internal server error while uploading files.",
    });
  }
};

export const getUploadFileInfo = async (req: Request, res: Response) => {
  const { tableName, tableId, fileLabel } = req.body;

  if (!tableName || !tableId || !fileLabel) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  try {
    const files = await dbClient.uploadFile.findMany({
      where: {
        fileReferences: {
          some: {
            tableName,
            tableId,
            fileLabel,
          },
        },
      },
      include: {
        fileReferences: true,
      },
    });

    const result = files.map((file) => ({
      nomefile: file.filename,
      tipofile: file.filetype,
      buttonInfo: new ButtonInfo({
        icon: "download",
        label: "Scarica",
        color: "primary",
        sortOrder: 1,
      }),
      dim: file.size ?? 0,
    }));
    res.json(result);
  } catch (error) {
    console.error("Errore nel recupero file:", error);
    res.status(500).json({ error: "Errore durante il recupero dei file" });
  }
};

export const uploadFiles2 = async (request: Request, response: Response) => {
  const documentsPath = "./public/document";

  try {
    if (!request.files || !request.files.files) {
      response
        .status(400)
        .json({ error: "Please upload at least one file to proceed." });
      return;
    }

    const files = request.files.files;
    const uploadedFiles = Array.isArray(files) ? files : [files];

    const acceptedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const savedFiles = [];
    const formattedFiles = [];

    for (const file of uploadedFiles as UploadedFile[]) {
      try {
        if (!acceptedMimeTypes.includes(file.mimetype)) {
          throw new Error(`Invalid file type for file: ${file.name}`);
        }

        const ext = path.extname(file.name);
        const safeFilename = `${
          path.parse(file.name).name
        }-${Date.now()}${ext}`;
        const savePath = path.join(documentsPath, safeFilename);

        await file.mv(savePath);

        const createdFile = await dbClient.uploadFile.create({
          data: {
            filename: safeFilename,
            mimetype: file.mimetype,
            filetype: ext.replace(".", ""),
            filepath: `/public/document/${safeFilename}`,
            size: file.size,
          },
        });

        /* // Collegamento con FileReference - COMMENTATO PER TEST
        await dbClient.fileReference.create({
          data: {
            fileId: createdFile.id,
            tableName: tableName,
            tableId: Number(tableId),
            fileLabel: fileLabel,
          },
        }); */

        // Crea l'oggetto formattato con ButtonInfo
        const formattedFile = {
          id: createdFile.id,
          nomefile: createdFile.filename,
          tipofile: createdFile.filetype,
          buttonInfo: {
            icon: "download",
            label: "Scarica",
            color: "primary",
            sortOrder: 1,
          },
          dim: createdFile.size ?? 0,
          filepath: createdFile.filepath,
        };

        savedFiles.push(createdFile);
        formattedFiles.push(formattedFile);
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
      }
    }

    if (savedFiles.length === 0) {
      response.status(400).json({
        error: "No files were successfully processed.",
      });
      return;
    }

    response.status(200).json({
      message: "Files uploaded successfully.",
      files: formattedFiles, // Restituisci i file formattati con ButtonInfo
      count: formattedFiles.length,
    });
  } catch (error) {
    console.error("Server error during file upload:", error);
    response.status(500).json({
      error: "Internal server error while uploading files.",
    });
  }
};
