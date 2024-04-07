import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PortfoliosTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsData, setTransactionsData] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5001/transactions/getPortfolio",
          {
            params: { _id: localStorage.getItem("_id") },
            withCredentials: true,
          }
        );
        const formattedTransactions = response.data.map((tx) => ({
          id: tx._id,
          symbol: tx.symbol,
          quantity: tx.quantity,
          totalValue: tx.averageBuyPrice,
        }));
        setTransactionsData(formattedTransactions);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchPortfolioData();
    }
  }, [isLoggedIn]);

  const columns = [
    { field: "symbol", headerName: "Stock Symbol", width: 130 },
    { field: "quantity", headerName: "Quantity", type: "number", width: 130 },
    {
      field: "totalValue",
      headerName: "Total Value",
      type: "number",
      width: 130,
    },
  ];

  return (
    <>
      {!isLoggedIn ? (
        <Box sx={{ justifyContent: "center" }}>
          Not Logged In. Please{" "}
          <Button onClick={() => navigate("/login")}>Login</Button>.
        </Box>
      ) : (
        <div style={{ height: 600, width: "95%" }}>
          {isLoading ? <Box>Loading...</Box> : null}
          <DataGrid
            rows={transactionsData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      )}
    </>
  );
};

export default PortfoliosTable;
