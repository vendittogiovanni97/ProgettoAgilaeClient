import { Box } from "@mui/material";
import UploadComponents2 from "./upload2";

export default function AgilaeUpload() {
  return (
    <>
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: 500,
          background: "white",
          marginLeft: "60%",
        }}
      >
        <UploadComponents2 />
      </Box>
    </>
  );
}
