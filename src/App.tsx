import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from "./Landing/LandingPage";
import { IdentityPage } from "./Identity/IdentityPage";
import { TopPage } from "./Top/TopPage";
import {
  createTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core";
import { MuiThemeProvider } from "material-ui/styles";
import { SubmitWorkWrapper } from "./Study/SubmitWorkWrapper";
import ModalWrapper from "./Common/ModalWrapper";
import { create } from "jss";
import rtl from "jss-rtl";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#FD7D21",
      contrastText: "white",
    },
  },
  direction: "rtl",
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  document.body.setAttribute("dir", "rtl");
  return (
    <div className="App">
      <MuiThemeProvider>
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Switch>
                <Route path="/Identity" component={IdentityPage} />
                <Route path="/Top" component={TopPage} />
                <Route path="/" component={LandingPage} />
              </Switch>
            </BrowserRouter>
            <div style={{ position: "fixed", bottom: 80, right: 50 }}>
              <SubmitWorkWrapper />
            </div>
          </ThemeProvider>
        </StylesProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
