import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  useMediaQuery,
  Popover,
  Button,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import StockTransactionCard from "./StockCard"; // Adjust the import path as necessary
import { useAuth } from "../Context/AuthContext";
import Search from "./Search";
// Mock data
const initialStockData = [
  { symbol: "AAPL", change: "+1.15", percentChange: "+0.95%", price: "121.00" },
  { symbol: "MSFT", change: "-0.85", percentChange: "-0.65%", price: "210.25" },
];

const SearchAndTable = () => {
  const [stockData, setStockData] = useState(initialStockData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const [selectedStock, setSelectedStock] = useState(null);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("buy");
  const { isLoggedIn } = useAuth();

  const handleOpenModal = (stockSymbol, type) => {
    setSelectedStock(stockSymbol);
    setTransactionType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStock(null);
    setTransactionType("");
  };

  useEffect(() => {
    const fetchStockList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/stocks/init"
        );
        setStockData(response.data);
      } catch (error) {
        console.error("Failed to fetch stock list:", error);
      }
    };

    fetchStockList();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePopoverClick = (event, stock) => {
    // If the current stock is already selected, close the popover
    if (selectedStock && stock.symbol === selectedStock.symbol) {
      setAnchorEl(null);
      setSelectedStock(null);
    } else {
      // Otherwise, open the popover for the new stock
      setAnchorEl(event.currentTarget);
      setSelectedStock(stock);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        // display: isNonMobile ? "flex" : "block",
        display: "flex",
        flexDirection: "column",
        width: isNonMobile ? "30vw" : "100%",
        height: "calc(100vh - 65px)",
      }}
    >
      <Search />
      <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", m: 2 }}>
        <TableContainer sx={{ flex: 1 }}>
          <Table stickyHeader aria-label="stock table">
            <TableHead>
              <TableRow>
                <TableCell>Stock Name</TableCell>
                <TableCell align="right">Change</TableCell>
                <TableCell align="right">% Change</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? stockData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : stockData
              ).map((stock) => (
                <TableRow
                  key={stock.symbol}
                  onClick={(event) => handlePopoverClick(event, stock)}
                >
                  <TableCell component="th" scope="row">
                    {stock.symbol}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: stock.change.startsWith("-") ? "red" : "green",
                    }}
                  >
                    {stock.change}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: stock.change.startsWith("-") ? "red" : "green",
                    }}
                  >
                    {stock.percentChange}
                  </TableCell>
                  <TableCell align="right">{stock.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          count={stockData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ flexShrink: 0 }}
        />
      </Paper>
      <Popover
        id="action-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 1 }}>
          {/* Displaying the selected stock's name for clarity */}
          {selectedStock && (
            <>
              {/* <div>Actions for {selectedStock.symbol}</div> */}
              <Button
                disabled={!isLoggedIn}
                color="primary"
                onClick={() => handleOpenModal(selectedStock, "buy")}
              >
                Buy
              </Button>
              <Button
                disabled={!isLoggedIn}
                color="secondary"
                onClick={() => handleOpenModal(selectedStock, "sell")}
              >
                Sell
              </Button>
              <Button onClick={() => navigate("/chart")}>Chart</Button>
            </>
          )}
        </Typography>
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
          {selectedStock && (
            <StockTransactionCard
              stockSymbol={selectedStock}
              transactionType={transactionType}
              onClose={handleCloseModal}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default SearchAndTable;
