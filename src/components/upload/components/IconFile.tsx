import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { FaFileWord } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";

export const getFileIcon = (filename: string, status: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  const color = status === "error" ? "error" : "action";

  switch (extension) {
    case "pdf":
      return <FaFilePdf color={color} size={25} />;
    case "doc":
    case "docx":
      return <FaFileWord color={color} size={25} />;
    default:
      return <InsertDriveFileIcon color={color} />;
  }
};
