import { Box, Stack, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";

const AppFooter = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        justifyContent: "space-between",
        borderBottom: `solid 8px`,
        borderColor: "primary.main",
        // boxShadow: 2,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexBasis: "70%",
          minHeight: "100px",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          justifyContent: "center",
          clipPath: "polygon(0 0, 88% 0, 100% 100%, 0 100%)",
        }}
      >
        <Typography variant="h3"></Typography>
      </Box>
    </Stack>
  );
};

export default AppFooter;
