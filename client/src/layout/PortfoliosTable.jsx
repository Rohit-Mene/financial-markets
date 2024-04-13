import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import StockTransactionCard from "./StockCard";
import axios from "axios";

const PortfoliosTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsData, setTransactionsData] = useState([]);
  const { isLoggedIn } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const navigate = useNavigate();
  //Neded For Popover-Modal
  const [selectedStock, setSelectedStock] = useState(null);
  const [transactionType, setTransactionType] = useState("buy");
  const [modalOpen, setModalOpen] = useState(false);

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
          averageBuyPrice: tx.averageBuyPrice,
          totalValue: Number(tx.quantity) * Number(tx.averageBuyPrice),
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
    { field: "symbol", headerName: "Stock Symbol", width: 230 },
    { field: "quantity", headerName: "Quantity", type: "number" },
    {
      field: "averageBuyPrice",
      headerName: "Average Buy Price",
      type: "number",
      width: 130 
    },
    {
      field: "totalValue",
      headerName: "Total Value",
      type: "number",
      width: 130 ,
    },
  ];

  const handleRowClick = (params) => {
    console.log(params.row);
    setSelectedRow(params.row);
    // MUI DataGrid rows usually have an attribute "data-id" that matches the row id.
    const rowElement = document.querySelector(`[data-id='${params.id}']`);
    setAnchorEl(rowElement);
    setOpenPopover(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopover(false);
  };
  const handleOpenModal = async (currentRow, type) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/stocks/reqstock",
        {
          params: { symbol: currentRow },
        }
      );
      const newPrice = response.data.price;
      const newSelectedRow = { ...selectedRow, price: newPrice };
      setSelectedRow(newSelectedRow);
      setSelectedStock(currentRow);
      setTransactionType(type);
      setModalOpen(true);
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStock(null);
    setTransactionType("");
  };

  return (
    <>
      {!isLoggedIn ? (
        <Box sx={{ justifyContent: "center" }}>
          Not Logged In. Please{" "}
          <Button onClick={() => navigate("/login")}>Login</Button>.
        </Box>
      ) : (
        <div style={{ height: 600 }}>
          {isLoading ? <Box>Loading...</Box> : null}
          <DataGrid
            rows={transactionsData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            onRowClick={(params) => handleRowClick(params)}
          />
          <Popover
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorPosition={{ top: 500, left: 200 }}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Box p={2}>
              {selectedRow && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(selectedRow.symbol, "buy")}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenModal(selectedRow.symbol, "sell")}
                  >
                    Sell
                  </Button>
                </>
              )}
            </Box>
          </Popover>
          <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="transaction-modal-title"
            aria-describedby="transaction-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ backgroundColor: "background.paper", p: 4 }}>
              {selectedRow && (
                <StockTransactionCard
                  stockSymbol={selectedRow}
                  transactionType={transactionType}
                  onClose={handleCloseModal}
                />
              )}
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default PortfoliosTable;
