import { Box, Stack } from "@mui/material";
import AppHeader from "../../components/AppHeader";
import LeftMenu from "../../components/LeftMenu";
import PageContent from "../../components/PageContent";
import RightMenu from "../../components/RightMenu";
import AppFooter from "../../components/AppFooter";
import { HomeLoader } from "../../components/Home/HomeLoader";
import { useEffect, useState } from "react";




export const Home = () => {

  const [openLoader, setOpenLoader] = useState(false)

  useEffect(() => {
    setOpenLoader(true)
    setTimeout(() => {
      setOpenLoader(false)
    }, 6000)
  }, [])


  return (

    <>
      <HomeLoader
        openLoader={openLoader}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "grey.200",
          flex: 1,
          height: "100vh",
          width: "100vw",
        }}
      >
        <AppHeader />
        <Stack
          direction={"row"}
          sx={{
            backgroundSize: "cover",
            backgroundImage: 'url("./media/signup_bg.jpg")',
            flex: 1,
            alignItems: "start",
            justifyContent: "space-between",
            py: 3,
            px: 12,
            gap: 5,
          }}
        >
          <LeftMenu />
          <PageContent />
          <RightMenu />
        </Stack>
        <AppFooter />
      </Box>
    </>

  );
};
