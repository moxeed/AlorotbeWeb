/** @format */

import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from "./Landing/LandingPage";
import { IdentityPage } from "./Identity/IdentityPage";
import { TopPage } from "./Top/TopPage";
import { createTheme, Modal, ThemeProvider } from "@material-ui/core";
import { MuiThemeProvider } from "material-ui/styles";
import { SubmitWorkWrapper } from "./Study/SubmitWorkWrapper";
import ModalWrapper from "./Common/ModalWrapper";
import { Footer } from "./Layout/Footer";
import { MainHeader } from "./Layout/MainHeader";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#FD7D21",
      contrastText: "white",
    },
  },
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <MainHeader />
            <Switch>
              <Route path="/Identity" component={IdentityPage} />
              <Route path="/Top" component={TopPage} />
              <Route path="/" component={LandingPage} />
            </Switch>
          </BrowserRouter>
          <div style={{ position: "fixed", bottom: 80, right: 50 }}>
            <ModalWrapper body={SubmitWorkWrapper} />
          </div>
        </ThemeProvider>
      </MuiThemeProvider>
      <Footer />
    </div>
  );
}

export default App;
