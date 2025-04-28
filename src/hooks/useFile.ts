import { FileContext } from "@/context/FileContext";
import { useContext } from "react";

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
