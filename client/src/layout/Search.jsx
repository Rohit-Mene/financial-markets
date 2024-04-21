import React, { useState } from "react";
import {
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
const Search = ({ addStockToState }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      toast.error("Please enter a search term.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5001/stock/ticker/search",
        {
          params: { searchData: searchTerm },
          withCredentials: true,
        }
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchResults([]);
  };
  const handleAddStock = (stock) => {
    addStockToState(stock);
    toast.success(`${stock} added to your stock list!`);
  };

  return (
    <div>
      <Paper>
        <TextField
          sx={{ m: 2 }}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search eg: AAPL, MSFT"
          size="small"
          disabled={!isLoggedIn}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} disabled={!isLoggedIn}>
                  <SearchIcon />
                </IconButton>
                <IconButton
                  onClick={handleClear}
                  disabled={!searchTerm && searchResults.length === 0}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              right: "30px",
              marginTop: "-12px",
            }}
          />
        )}
      </Paper>
      {searchResults.length > 0 && (
        <div>
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {searchResults.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Symbol: ${item.symbol}`}
                  secondary={`Type: ${item.type}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleAddStock(item.symbol)}
                  >
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button onClick={handleClear} variant="outlined" sx={{ my: 2 }}>
            Clear Results
          </Button>
        </div>
      )}
    </div>
  );
};

export default Search;
