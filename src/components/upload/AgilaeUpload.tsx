import { Box, Paper } from "@mui/material";
import UploadComponents2 from "./upload2";

export default function AgilaeUpload() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // centra orizzontalmente
        alignItems: "center", // centra verticalmente (se vuoi)
        width: "100%",
        minHeight: "400px", // altezza minima decente
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
          backgroundColor: "background.paper",
        }}
      >
        <UploadComponents2 />
      </Paper>
    </Box>
  );
}
