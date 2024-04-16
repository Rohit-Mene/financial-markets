import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FundManagementCard = () => {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const handleTransactionChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const submitTransaction = async () => {
    try {
      const requestBody = {
        type: transactionType,
        funds: Number(amount),
      };
      const response = await axios.put(
        "http://localhost:5001/transactions/manageFunds",
        requestBody,
        {
          params: { _id: localStorage.getItem("_id") },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(`Transaction Complete`);
        setAmount("");
        setTransactionType("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(`Cannot Remove more than the Balance`);
      }
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
      }
    }
  };
  //width: '500px', height:'300px',margin:'20px'
  return (
    <Card sx={{ width: "500px", height: "350px", padding: 2, margin: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Fund Management
        </Typography>
        <TextField
          label="Transaction Type"
          select
          value={transactionType}
          onChange={handleTransactionChange}
          helperText="Please select your transaction type"
          fullWidth
          margin="normal"
        >
          <MenuItem value="add">Add Funds</MenuItem>
          <MenuItem value="remove">Remove Funds</MenuItem>
          {/* Add more options here if needed */}
        </TextField>
        <TextField
          label="Amount"
          value={amount}
          onChange={handleAmountChange}
          type="number"
          helperText="Please enter the amount"
          fullWidth
          margin="normal"
        />
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button size="small" onClick={submitTransaction}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default FundManagementCard;
