import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./scenes/Dashboard";
import { themeSettings } from "./theme";
import Signup from "./scenes/Signup";
import Login from "./scenes/Login";
import Root from "./scenes/Root";
import { AuthProvider } from '../src/Context/AuthContext';
function App() {
  const theme = createTheme(themeSettings("dark"));
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Root />
        </ThemeProvider>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
