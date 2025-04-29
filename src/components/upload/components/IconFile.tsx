import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export const getFileIcon = (filename: string, status: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  const color = status === "error" ? "error" : "action";

  switch (extension) {
    case "pdf":
      return <PictureAsPdfIcon color={color} />;
    case "doc":
    case "docx":
      return <DescriptionIcon color={color} />;
    default:
      return <InsertDriveFileIcon color={color} />;
  }
};
