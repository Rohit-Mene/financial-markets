import Navbar from "./Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Box flexGrow={1}>
        <Navbar isNonMobile={isNonMobile} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
