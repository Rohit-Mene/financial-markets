import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import FundManagementCard from "../layout/FundManagementCard";
import FundsInfoCard from "../layout/FundsInformationCard";
// Utility function for formatting currency
const formatCurrency = (value) => {
  return `$${value.toLocaleString()}`;
};

// Utility function for formatting percentages
const formatPercentage = (value) => {
  const numericValue = parseFloat(value);
  const sign = numericValue > 0 ? "+" : "-";
  return `${sign}${numericValue.toFixed(2)}%`;
};

const DashboardPortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setportfolioData] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/dashboard/summary",
          {
            params: { _id: localStorage.getItem("_id") },
            withCredentials: true,
          }
        );
        const portfolio = await response.data;
        setportfolioData(portfolio);
      } catch (error) {
        console.error("Failed to fetch Stock List", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [isLoggedIn]);

  const investmentAmount = Number(portfolioData?.investmentAmount);
  const currentValue = Number(portfolioData?.currentValue);

  const profitLoss = currentValue - investmentAmount;

  let profitLossPercentage = 0;
  if (investmentAmount !== 0) {
    profitLossPercentage = (profitLoss / investmentAmount) * 100;
  }

  return (
    <>
      {isLoading ? <Box>Loading...</Box> : null}
      {!isLoggedIn ? (
        <Box sx={{ justifyContent: "center" }}>
          Not Logged In. Please{" "}
          <Button onClick={() => navigate("/login")}>Login</Button>.
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            padding: 4,
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Hi, Rohit
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Paper elevation={3} sx={{ padding: 2, margin: 1, flexGrow: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Equity
              </Typography>
              <Typography variant="h6">Margin available</Typography>
              <Typography variant="h6" gutterBottom>
                0
              </Typography>
              <Typography>Margins used 0</Typography>
              <Typography>Opening balance 0</Typography>
              <Button color="primary">View statement</Button>
            </Paper>

            <Paper elevation={3} sx={{ padding: 2, margin: 1, flexGrow: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Commodity
              </Typography>
              <Typography variant="h6">Margin available</Typography>
              <Typography variant="h6" gutterBottom>
                0
              </Typography>
              <Typography>Margins used 0</Typography>
              <Typography>Opening balance 0</Typography>
              <Button color="primary">View statement</Button>
            </Paper>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountBalanceWalletIcon sx={{ marginRight: 1 }} />
              <Typography variant="subtitle1" component="span">
                Holdings ({portfolioData?.totalStocks ?? "N/A"})
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" component="span" color="success.main">
                {formatCurrency(profitLoss)}
              </Typography>
              <Typography
                variant="subtitle1"
                component="span"
                color="success.main"
              >
                {formatPercentage(profitLossPercentage)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                Current value:{" "}
              </Typography>
              <Typography variant="h6" component="span">
                {formatCurrency(portfolioData?.currentValue ?? 0)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                Investment:{" "}
              </Typography>
              <Typography variant="h6" component="span">
                {formatCurrency(portfolioData?.investmentAmount ?? 0)}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ marginY: 2 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FundManagementCard />
            <FundsInfoCard />
          </Box>
        </Box>
      )}
    </>
  );
};

export default DashboardPortfolio;
