import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./scenes/Dashboard";
import { themeSettings } from "./theme";
import Signup from "./scenes/Signup";
import Login from "./scenes/Login";

function App() {
  const theme = createTheme(themeSettings("dark"));
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
