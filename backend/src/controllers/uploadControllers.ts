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
    // Verifica che ci siano file nella richiesta
    if (!request.files || !request.files.files) {
      response
        .status(400)
        .json({ error: "Please upload at least one file to proceed." });
      return;
    }

    // Normalizza i file in un array
    const files = request.files.files;
    const uploadedFiles = Array.isArray(files) ? files : [files]; //gestiamo sia upload multipli che singoli

    // Tipi MIME accettati
    const acceptedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]; //Controllo tipo file

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
        /*La struttura è coerente e facile da capire. filetype ricavato togliendo il punto: funziona,
         ma se mai lavorerai con estensioni multiple potrebbe essere più robusto usare ext.substring(1) o una libreria.*/
        const createdFile = await dbClient.uploadFile.create({
          data: {
            filename: safeFilename,
            mimetype: file.mimetype,
            filetype: ext.replace(".", ""), // rimuove solo il punto
            filepath: `/public/document/${safeFilename}`,
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
