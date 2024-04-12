import React from "react";
import SearchAndTable from "../layout/StockList";
import { Box } from "@mui/material";
import PortfoliosTable from "../layout/PortfoliosTable";
const Portfolio = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SearchAndTable />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          alignItems: "center",
          flex:1
        }}
      >
        <PortfoliosTable />
      </Box>
    </Box>
  );
};

export default Portfolio;
