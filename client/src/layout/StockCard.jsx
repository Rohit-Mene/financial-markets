import React, { useState } from 'react';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem, Select, InputLabel, Box } from '@mui/material';

function StockTransactionCard() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [transactionType, setTransactionType] = useState('buy');
  const [priceType, setPriceType] = useState('market');
  const [limitPrice, setLimitPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Transaction Submitted: ${transactionType.toUpperCase()} ${quantity} of ${stockSymbol.toUpperCase()} at ${priceType.toUpperCase()} price`);
    onClose();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <FormControl component="form" onSubmit={handleSubmit} sx={{ m: 3 }}>
        <TextField
          label="Stock Symbol"
          variant="outlined"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Quantity"
          type="number"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormLabel component="legend">Transaction Type</FormLabel>
        <RadioGroup
          row
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          sx={{ mb: 2 }}
        >
          <FormControlLabel value="buy" control={<Radio />} label="Buy" />
          <FormControlLabel value="sell" control={<Radio />} label="Sell" />
        </RadioGroup>
        <InputLabel id="price-type-label">Price Type</InputLabel>
        <Select
          labelId="price-type-label"
          value={priceType}
          label="Price Type"
          onChange={(e) => setPriceType(e.target.value)}
          sx={{ mb: 2, width: '200px' }}
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
            sx={{ mb: 2 }}
          />
        )}
        <Button type="submit" variant="contained">Submit Order</Button>
      </FormControl>
    </Box>
  );
}

export default StockTransactionCard;
