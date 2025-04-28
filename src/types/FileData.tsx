export interface FileData {
  name: string;
  size?: string;
  status: "success" | "error" | "uploading";
  progress?: number;
}
