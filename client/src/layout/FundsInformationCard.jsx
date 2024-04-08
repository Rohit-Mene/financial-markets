import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const FundsInfoCard = () => {
  const [funds, setFunds] = useState(0);
  const [lastAdded, setLastAdded] = useState('');

  // Dummy function to simulate fetching data
  const fetchFundsInfo = () => {
    // Simulate an API call to fetch funds info
    // This is where you would use axios to fetch real data
    setFunds(5000); // Replace with real data
    setLastAdded('April 1, 2024'); // Replace with real data
  };

  useEffect(() => {
    fetchFundsInfo();
  }, []);

  return (
    <Card sx={{width: '500px', height:'350px', padding: 2, margin:'20px'}}>
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
      <CardActions style={{ justifyContent: 'center' }}>
        <Button size="small">View More</Button>
      </CardActions>
    </Card>
  );
};

export default FundsInfoCard;
