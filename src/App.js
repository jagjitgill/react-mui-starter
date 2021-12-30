import React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiTheme from "./MuiTheme";
import Routes from "./routes";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
