import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import Main from "./Main";

const themeOptions = {};

const history = createBrowserHistory();

const theme = createMuiTheme({
  ...themeOptions,
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Main />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
