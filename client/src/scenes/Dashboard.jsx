import React from "react";
import SearchAndTable from "../layout/StockList";
import DashboardPortfolio from "./DashboardPortfolio";
import { Box, useMediaQuery } from "@mui/material";

const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)"); // breakpoint for non-mobile devices

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
          flexShrink: 0, 
          width: isNonMobile ? "55%" : "100%",
          height: "100%",
          overflowY: "auto", 
          justifyContent:"center"
        }}
      >
        <DashboardPortfolio />
      </Box>
    </Box>
  );
};

export default Dashboard;
