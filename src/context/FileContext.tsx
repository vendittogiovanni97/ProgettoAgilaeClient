import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch iniziale
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { responseBody } = await backendFetch("/rest/files");
      if (!responseBody) throw new Error("Failed to fetch files.");
      setFiles(responseBody);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async (selectedFiles: File[]) => {
    try {
      setLoading(true);

      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));

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
      const { fetchResult } = await backendFetch(
        `/files/${id}/download`,
        "get"
      );

      if (!fetchResult.ok) throw new Error("Failed to download file.");

      const blob = await fetchResult.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  const previewFile = async (id: number) => {
    try {
      const { fetchResult } = await backendFetch(`/files/${id}/preview`, "get");

      if (!fetchResult.ok) throw new Error("Failed to preview file.");

      const blob = await fetchResult.blob();
      const url = window.URL.createObjectURL(blob);
      return url;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      throw err;
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
