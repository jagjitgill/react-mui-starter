import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiTheme from "./MuiTheme";
import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
