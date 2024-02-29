import Navbar from "./Navbar";
import { Box, useMediaQuery } from "@mui/material";
const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Navbar isNonMobile={isNonMobile}/>
    </Box>
  );
};

export default Layout;
