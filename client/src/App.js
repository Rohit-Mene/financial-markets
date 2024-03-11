import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { themeSettings } from "./theme";
import Root from "./scenes/Root";
import { AuthProvider } from "../src/Context/AuthContext";
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
