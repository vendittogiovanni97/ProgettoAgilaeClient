// Tipo base per ogni file
export interface FileData {
  id?: number;
  name: string;
  size: string;
  status: "uploading" | "success" | "error";
  progress?: number;
  filepath?: string;
  mimetype?: string;
  filetype?: string;
}

// Tipo per il Context
export interface FileContextType {
  files: FileData[];
  loading: boolean;
  error: string | null;
  uploadFiles: (files: File[]) => Promise<void>;
  downloadFile: (id: number, filename: string) => Promise<void>;
  previewFile: (id: number) => Promise<string>; // ritorna URL per preview
  fetchFiles: () => Promise<void>;
}
