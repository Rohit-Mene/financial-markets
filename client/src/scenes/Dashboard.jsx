import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Mock data
const initialStockData = [
  { name: 'AAPL', change: '+1.15', percentChange: '+0.95%', price: '121.00' },
  { name: 'MSFT', change: '-0.85', percentChange: '-0.65%', price: '210.25' },

];

const SearchAndTable = () => {
  const [stockData, setStockData] = useState(initialStockData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleSearch = async () => {
    const searchedData = initialStockData.filter(stock => stock.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setStockData(searchedData);
  };

  return (
    <Box sx={{ width: '30%' }}>

      <TextField sx={{mt:"1.5rem"}}
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search eg: AAPL, MSFT"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="stock table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Stock Name</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">% Change</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right" style={{ color: row.change.startsWith('-') ? 'red' : 'green' }}>
                  {row.change}
                </TableCell>
                <TableCell align="right" style={{ color: row.change.startsWith('-') ? 'red' : 'green' }}>
                  {row.percentChange}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SearchAndTable;
