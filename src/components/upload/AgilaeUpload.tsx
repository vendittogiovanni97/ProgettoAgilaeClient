import { Box, Paper } from "@mui/material";
import UploadComponents2 from "./upload2";

export default function AgilaeUpload() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // centra orizzontalmente
        alignItems: "center", // centra verticalmente
        width: "100%",
        minHeight: "400px",
        mt: 4, // margin-top
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4, // padding interno
          width: "150%",
          maxWidth: 800,
          borderRadius: 3,
          backgroundColor: "#d2d6d4",
        }}
      >
        <UploadComponents2 />
      </Paper>
    </Box>
  );
}
