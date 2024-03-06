import React,{useEffect,useState} from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";
const DashboardPortfolio = () => {
    const [portfolioData, setportfolioData] = useState();
    useEffect(() => {
        const fetchStockList = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5001/api/stocks/init",{params:{_id:"65e2b83bf0fb9ff9d0eed09f"}}
            );
            const portfolio = response.data;
            setportfolioData(portfolio);
            console.log(portfolioData);
          } catch (error) {
            console.error("Failed to fetch Stock List", error);
          }
        };
    
        fetchStockList();
      }, []);
  return (
    <Box sx={{ width: '100%', padding: 4, bgcolor: 'background.default', color: 'text.primary' }}>
      <Typography variant="h4" gutterBottom>
        Hi, Rohit
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Paper elevation={3} sx={{ padding: 2, margin: 1, flexGrow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Equity</Typography>
          <Typography variant="h6">Margin available</Typography>
          <Typography variant="h6" gutterBottom>0</Typography>
          <Typography>Margins used 0</Typography>
          <Typography>Opening balance 0</Typography>
          <Button color="primary">View statement</Button>
        </Paper>

        <Paper elevation={3} sx={{ padding: 2, margin: 1, flexGrow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Commodity</Typography>
          <Typography variant="h6">Margin available</Typography>
          <Typography variant="h6" gutterBottom>0</Typography>
          <Typography>Margins used 0</Typography>
          <Typography>Opening balance 0</Typography>
          <Button color="primary">View statement</Button>
        </Paper>
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceWalletIcon sx={{ marginRight: 1 }} />
          <Typography variant="subtitle1" component="span">Holdings (16)</Typography>
        </Box>
        <Box>
          <Typography variant="h4" component="span" color="success.main">23.5k</Typography>
          <Typography variant="subtitle1" component="span" color="success.main">+23.50%</Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="span">Current value: </Typography>
          <Typography variant="h6" component="span">1.24L</Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="span">Investment: </Typography>
          <Typography variant="h6" component="span">1L</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPortfolio;
