// Tipo base per ogni file
export interface FileData {
  id?: number;
  name: string;
  size?: number;
  progress?: number;
  filepath?: string;
  mimetype?: string;
  filetype?: string;
  buttonInfo?: {
    icon: string;
    label: string;
    color: string;
    sortOrder: number;
  };
}

// Tipo per il Context
export interface FileContextType {
  files: FileData | undefined;
  loading: boolean;
  error: string | null;
  uploadFiles: (files: File) => Promise<void>;
  downloadFile: (id: number, filename: string) => Promise<void>;
  previewFile: (id: number, filename: string) => Promise<string>; // ritorna URL per preview
  fetchFiles: () => Promise<void>;
  fetchFileInfo: (
    tableName: string,
    tableId: number,
    fileLabel: string
  ) => Promise<void>;
}
