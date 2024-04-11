import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import axios from "axios";
const FundsInfoCard = () => {
  const [funds, setFunds] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Dummy function to simulate fetching data
  const fetchFundsInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/transactions/getFundDetails",
        {
          params: { _id: localStorage.getItem("_id") },
          withCredentials: true,
        }
      );

      setFunds(response.data.fundsAmount);
      setLastAdded("April 1, 2024");
    } catch (error) {
      console.error("Failed to fetch Stock List", error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
      }
    }
  };

  useEffect(() => {
    fetchFundsInfo();
  }, []);

  return (
    <Card sx={{ width: "500px", height: "350px", padding: 2, margin: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Funds Available
        </Typography>
        <Typography variant="h5">
          ${funds.toLocaleString()} {/* Format as currency */}
        </Typography>
        <Typography sx={{ m: 1.5 }} color="text.secondary">
          Last Added: {lastAdded}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button size="small" onClick={fetchFundsInfo}>Refresh</Button>
      </CardActions>
    </Card>
  );
};

export default FundsInfoCard;
