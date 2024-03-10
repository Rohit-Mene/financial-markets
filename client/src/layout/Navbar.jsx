import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../Context/AuthContext';
const Navbar = ({ isNonMobile }) => {
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [marketStatus, setMarketStatus] = useState({
    India: "Fetching...",
    "United States": "Fetching...",
  });
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 
  const {isLoggedIn,logout} = useAuth();

  // const onClickHandleLogout = () =>{
  //   handleLogout();
  // }

  useEffect(() => {
    const fetchMarketStatus = async () => {
      try {
        const response = await axios.get(
          "https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo"
        );
        const markets = response.data.markets;
        const indiaMarket = markets.find((market) => market.region === "India");
        const usMarket = markets.find(
          (market) => market.region === "United States"
        );

        setMarketStatus({
          India: indiaMarket ? indiaMarket.current_status : "Not Available",
          "United States": usMarket ? usMarket.current_status : "Not Available",
        });
      } catch (error) {
        console.error("Failed to fetch market status", error);
        setMarketStatus({
          India: "Error",
          "United States": "Error",
        });
      }
    };

    fetchMarketStatus();
  }, []);

  const navbarHeaders = [
    { name: `India Market: ${marketStatus.India}`, isButton: false, link: "/" },
    {
      name: `US Market: ${marketStatus["United States"]}`,
      isButton: false,
      link: "/",
    },
    { name: "Dashboard", isButton: true, link: "/dashboard" },
    { name: "Orders", isButton: true, link: "/orders" },
    { name: "Holdings", isButton: true, link: "/holdings" },
    {
      name: isLoggedIn ? "Logout":null,
      isButton: true,
      link:"/login",
      action: logout,
    },
    {
      name: !isLoggedIn ? "Login" : null,
      isButton: true,
      link:"/login"
      //action: handleLogin ,
    },
  ];

  const handleMobileMenuToggle = (event) => {
    setMobileMenuAnchorEl(mobileMenuAnchorEl ? null : event.currentTarget);
  };

  const renderLinkItem = (header, index) =>
    header.isButton ? (
      <Button
        key={index}
        color="inherit"
        component={RouterLink}
        to={header.link}
        onClick={header.action || undefined}
      >
        {header.name}
      </Button>
    ) : (
      <Typography key={index} sx={{ margin: 1, color: "white" }}>
        {header.name}
      </Typography>
    );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      open={Boolean(mobileMenuAnchorEl)}
      onClose={handleMobileMenuToggle}
    >
      {navbarHeaders.filter((obj) => obj.name !== null).map((header, index) => (
        <MenuItem
          key={index}
          onClick={handleMobileMenuToggle}
          component={RouterLink}
          to={header.link}
        >
          {header.name}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!isNonMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMobileMenuToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: isNonMobile ? "space-evenly" : "flex-end",
              }}
            >
              {isNonMobile ? navbarHeaders.map(renderLinkItem) : null}
            </Box>
            {!isNonMobile && renderMobileMenu}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
