import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TablePagination,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
// Mock data
const initialStockData = [
  { name: "AAPL", change: "+1.15", percentChange: "+0.95%", price: "121.00" },
  { name: "MSFT", change: "-0.85", percentChange: "-0.65%", price: "210.25" },
];

const SearchAndTable = () => {
  const [stockData, setStockData] = useState(initialStockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const fetchStockList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/stocks/init"
        );
        const stockList = response.data;
        setStockData(stockList);
      } catch (error) {
        console.error("Failed to fetch Stock List", error);
      }
    };

    fetchStockList();
  }, []);
  const handleSearch = async () => {
    // const searchedData = initialStockData.filter((stock) =>
    //   stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // setStockData(searchedData);
    // setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: isNonMobile ? "flex" : "block",
        flexDirection: "column",
        width: isNonMobile ? "30vw" : "100%",
        height: "calc(100vh - 65px)",
      }}
    >
      <TextField
        sx={{ m: 2 }}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search eg: AAPL, MSFT"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
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
              ).map((row) => (
                <TableRow key={row.symbol}>
                  <TableCell component="th" scope="row">
                    {row.symbol}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: row.change.startsWith("-") ? "red" : "green",
                    }}
                  >
                    {row.change}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: row.change.startsWith("-") ? "red" : "green",
                    }}
                  >
                    {row.percentChange}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
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
    </Box>
  );
};

export default SearchAndTable;
