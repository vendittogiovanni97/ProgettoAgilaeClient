"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { FileContextType, FileData } from "./types/TypeFileContext";
import backendFetch from "@/config/backendFetch";
import { backendFetchFormData } from "@/config/backendFetchFormData";

// Creiamo il Context
export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export const FileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<FileData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { responseBody } = await backendFetch("/files");
      if (!responseBody) throw new Error("Failed to fetch files.");
      const formattedFiles = responseBody.map((file: any) => ({
        id: file.id,
        name: file.filename || "File senza nome", // Assicurati che ci sia sempre un nome
        status: "success" as const, // I file già caricati sono in stato success
        filepath: file.filepath,
        mimetype: file.mimetype,
        filetype: file.filetype,
      }));
      setFiles(formattedFiles);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async (selectedFile: File) => {
    try {
      setLoading(true);

      setFiles({
        name: selectedFile.name,
      });
      const formData = new FormData();
      formData.append("files", selectedFile);
      const res = await backendFetchFormData("/upload", formData);

      if (!res.ok) throw new Error("Failed to upload files.");

      await fetchFiles(); // Aggiorna lista
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (id: number, filename: string) => {
    try {
      const { fetchResult, responseBody } = await backendFetch(
        `/${id}/download`,
        "get",
        undefined,
        "blob"
      );

      if (!fetchResult.ok) throw new Error("Failed to download file.");
      //l'URL del file da saricare, viene creato qui
      const url = window.URL.createObjectURL(responseBody);

      //Viene creato dinamicamente un elemento <a> (un link HTML). Questo elemento sarà usato per innescare il download.
      const link = document.createElement("a");
      link.href = url;
      //Specifica il nome con cui il file verrà salvato sul computer dell’utente. Senza questa riga, il browser userebbe il nome originale del file dal server
      link.download = filename;
      link.click();
      //Evita perdite di memoria
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  const previewFile = async (id: number, filename: string) => {
    try {
      const { fetchResult, responseBody } = await backendFetch(
        `/${id}/preview`,
        "get",
        undefined,
        "blob"
      );

      if (!fetchResult.ok) throw new Error("Failed to preview file.");

      const url = window.URL.createObjectURL(responseBody);
      return url;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      throw err;
    }
  };

  // Funzione per ottenere le info del file
  const fetchFileInfo = async (
    tableName: string,
    tableId: number,
    fileLabel: string
  ) => {
    try {
      const query = new URLSearchParams({
        tableName,
        tableId: tableId.toString(),
        fileLabel,
      });

      const { fetchResult, responseBody } = await backendFetch(
        `files/info?${query.toString()}`,
        "get",
        undefined,
        "json"
      );

      if (!fetchResult.ok) {
        throw new Error(responseBody.error || "Errore nella fetch");
      }

      console.log("File Info:", responseBody);
      return responseBody;
    } catch (error) {
      console.error("Errore nel recupero info file:", error);
      return null;
    }
  };

  return (
    <FileContext.Provider
      value={{
        files,
        loading,
        error,
        uploadFiles,
        downloadFile,
        previewFile,
        fetchFiles,
        fetchFileInfo,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
