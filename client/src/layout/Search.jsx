import React, { useState } from "react";
import { Paper, TextField, IconButton, InputAdornment, List, ListItem, ListItemText, CircularProgress, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      toast.error('Please enter a search term.');
      return; 
    }
    setIsLoading(true);  
    try {
      const response = await fetch(`http://localhost:5001/api/stocks/ticker/search?searchData=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setSearchResults(data);
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

  return (
    <div>
      <Paper>
        <TextField
          sx={{ m: 2 }}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search eg: AAPL, MSFT"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
                <IconButton onClick={handleClear} disabled={!searchTerm && searchResults.length === 0}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {isLoading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', right: '30px', marginTop: '-12px' }} />}
      </Paper>
      {searchResults.length > 0 && (
        <div>
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {searchResults.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`Symbol: ${item.symbol}`} secondary={`Type: ${item.type}`} />
              </ListItem>
            ))}
          </List>
          <Button onClick={handleClear} variant="outlined" sx={{ my: 2 }}>Clear Results</Button>
        </div>
      )}
    </div>
  );
};

export default Search;
