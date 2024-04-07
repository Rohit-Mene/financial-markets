import React from "react";
import OrdersTable from "../layout/OrdersTable";
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
          justifyContent:"center"
        }}
      >
        <PortfoliosTable />
      </Box>
    </Box>
  );
};

export default Portfolio;
