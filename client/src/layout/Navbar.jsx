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
import { Link as RouterLink } from "react-router-dom";

const fetchHeaderData = async (headerName) => {
  // Simulating a fetch call to your backend
  // Example: const response = await fetch(`/api/${headerName}`);
  // return await response.json();
  return `Dynamic ${headerName}`;
};

const Navbar = ({ isNonMobile }) => {
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [header1Data, setHeader1Data] = useState("");
  const [header2Data, setHeader2Data] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data1 = await fetchHeaderData("header1");
      const data2 = await fetchHeaderData("header2");
      setHeader1Data(data1);
      setHeader2Data(data2);
    };

    fetchData();
  }, []);
  const navbarHeaders = [
    { name: header1Data || "Header 1", isButton: false, link: "/" },
    { name: header2Data || "Header 2", isButton: false, link: "/" },
    { name: "Dashboard", isButton: true, link: "/dashboard" },
    { name: "Orders", isButton: true, link: "/orders" },
    { name: "Holdings", isButton: true, link: "/holdings" },
    { name: "Login", isButton: true, link: "/login" },
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
      {navbarHeaders.map((header, index) => (
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
  );
};

export default Navbar;
