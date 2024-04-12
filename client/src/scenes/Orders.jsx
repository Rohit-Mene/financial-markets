import React from "react";
import OrdersTable from "../layout/OrdersTable";
import SearchAndTable from "../layout/StockList";
import { Box } from "@mui/material";
const Orders = () => {
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
        <OrdersTable />
      </Box>
    </Box>
  );
};

export default Orders;
