import React, { useState } from 'react';
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
  Box,
  Container // Import Container for better layout management
} from '@mui/material';

function StockTransactionCard({ stockSymbol, transactionType }) {
  const [quantity, setQuantity] = useState('');
  const [priceType, setPriceType] = useState('market');
  const [limitPrice, setLimitPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Transaction Submitted: ${transactionType.toUpperCase()} ${quantity} of ${stockSymbol.toUpperCase()} at ${priceType.toUpperCase()} price`);
  };

  return (
    <Container maxWidth="sm"> {/* Use Container to center and control the width */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        flexDirection="column" // Set flexDirection to column for stacking elements vertically
      >
        <FormControl fullWidth component="form" onSubmit={handleSubmit} sx={{ m: 3 }}> {/* Use fullWidth to control form width */}
          <TextField
            label="Stock Symbol"
            variant="outlined"
            value={stockSymbol}
            required
            disabled
            sx={{ mb: 2 }} // Ensure there's margin at the bottom
          />
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            sx={{ mb: 2 }} // Ensure there's margin at the bottom
          />
          {/* Transaction Type - No changes needed */}
          <FormLabel component="legend" sx={{ mt: 2 }}>Transaction Type</FormLabel> {/* Add top margin */}
          <RadioGroup
            row
            value={transactionType}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="buy" control={<Radio />} label="Buy" />
            <FormControlLabel value="sell" control={<Radio />} label="Sell" />
          </RadioGroup>
          <FormLabel id="price-type-label" sx={{ mt: 2 }}>Price Type</FormLabel> {/* Add top margin */}
          <Select
            labelId="price-type-label"
            value={priceType}
            label="Price Type"
            onChange={(e) => setPriceType(e.target.value)}
            sx={{ mb: 2, width: '100%' }} // Use 100% width for consistency
          >
            <MenuItem value="market">Market</MenuItem>
            <MenuItem value="limit">Limit</MenuItem>
          </Select>
          {priceType === 'limit' && (
            <TextField
              label="Limit Price"
              type="number"
              variant="outlined"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              required={priceType === 'limit'}
              sx={{ mb: 2 }} // Ensure there's margin at the bottom
            />
          )}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit Order</Button> {/* Add top margin for spacing */}
        </FormControl>
      </Box>
    </Container>
  );
}

export default StockTransactionCard;
