import { Box, Paper } from "@mui/material";
import UploadComponents2 from "./upload2";

export default function AgilaeUpload1() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        justifyContent: "center", // centra orizzontalmente
        alignItems: "center", // centra verticalmente
        width: "100%",
        minHeight: "100px",
        mt: 4, // margin-top
      }}
    >
      <UploadComponents2 />
    </Box>
  );
}
