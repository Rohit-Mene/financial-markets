import React, { useState } from "react";
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
  Box,
  Container,
} from "@mui/material";
import axios from "axios";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function StockTransactionCard({ stockSymbol, transactionType, onClose }) {
  const [quantity, setQuantity] = useState(0);
  const [priceType, setPriceType] = useState("market");
  const [limitPrice, setLimitPrice] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/transactions/save",
        {
          _id: localStorage.getItem("_id"),
          symbol: stockSymbol.symbol,
          type: transactionType,
          quantity: quantity,
          priceAtTransaction: stockSymbol.price,
          totalValue: Number(quantity) * Number(stockSymbol.price),
        },
        { withCredentials: true }
      );

      console.log("Response:", response.data);
      if (response) {
        // if(!response.data){
        //   toast.success("Transaction complete.")
        // }

        toast.success(
          `Transaction Submitted: ${transactionType.toUpperCase()} ${quantity} of ${stockSymbol.symbol.toUpperCase()} at ${priceType.toUpperCase()} price at ${
            stockSymbol.price
          }`
        );
        onClose();
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(
          error.response.data.message
        );
      }
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          flexDirection="column"
        >
          <FormControl
            fullWidth
            component="form"
            onSubmit={handleSubmit}
            sx={{ m: 3 }}
          >
            <TextField
              label="Stock Symbol"
              variant="outlined"
              value={stockSymbol.symbol}
              required
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              label="Quantity"
              type="number"
              variant="outlined"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setTotalValue(
                  Number(e.target.value) * Number(stockSymbol.price)
                );
              }}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Total Amount"
              type="number"
              variant="outlined"
              value={totalValue}
              //onChange={(e) => setTotalValue(Number(quantity) * Number(stockSymbol.price))}
              disabled
              sx={{ mb: 2 }}
            />

            <FormLabel component="legend" sx={{ mt: 2 }}>
              Transaction Type
            </FormLabel>
            <RadioGroup row value={transactionType} sx={{ mb: 2 }}>
              <FormControlLabel value="buy" control={<Radio />} label="Buy" />
              <FormControlLabel value="sell" control={<Radio />} label="Sell" />
            </RadioGroup>
            <FormLabel id="price-type-label" sx={{ mt: 2 }}>
              Price Type
            </FormLabel>
            <Select
              labelId="price-type-label"
              value={priceType}
              label="Price Type"
              onChange={(e) => setPriceType(e.target.value)}
              sx={{ mb: 2, width: "100%" }}
            >
              <MenuItem value="market">Market</MenuItem>
              <MenuItem value="limit">Limit</MenuItem>
            </Select>
            {priceType === "limit" && (
              <TextField
                label="Limit Price"
                type="number"
                variant="outlined"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                required={priceType === "limit"}
                sx={{ mb: 2 }}
              />
            )}
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit Order
            </Button>
          </FormControl>
        </Box>
      </Container>
    </>
  );
}

export default StockTransactionCard;
