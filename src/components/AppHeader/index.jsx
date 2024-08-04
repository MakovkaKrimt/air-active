import { Box, Stack, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";

const AppHeader = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        justifyContent: "space-between",
        borderBottom: `solid 8px`,
        borderColor: "primary.main",
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          px: 8,
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundSize: "cover",
            width: "235px",
            height: "54px",
            backgroundImage: 'url("./media/company-logo.png")',
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexBasis: "70%",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          justifyContent: "center",
          clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <Typography variant="h3">AIRMAG TOOLKIT</Typography>
      </Box>
    </Stack>
  );
};

export default AppHeader;

{
  /* <AppBar
                position='static'
                sx={{
                    px: 5,
                    py: 2,
                    alignItems: "end"
                }}
            >
                <Typography
                    variant='h3'
                    sx={{
                        width: "fit-content"
                    }}
                >
                    AIRMAG TOOLKIT
                </Typography>
            </AppBar > */
}
