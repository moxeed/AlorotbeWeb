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
import { Footer } from "./Layout/Footer";
import { create } from "jss";
import rtl from "jss-rtl";
import { createContext } from "react";
import { useState } from "react";
import { TokenManager } from "./Identity/Components/TokenManager";
import { WithMenu } from "./Common/WithMenu";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Profile } from "./Profile/Profile";

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
const IdentityContext = createContext({
  isAuthenticated: false,
  token: "" as string | null,
  setToken: (state: string | null) => {},
});

function App() {
  const [token, setToken] = useState<string | null>(null);

  document.body.setAttribute("dir", "rtl");
  return (
    <div className="App">
      <MuiThemeProvider>
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <IdentityContext.Provider
              value={{ isAuthenticated: token !== null, token, setToken }}
            >
              <TokenManager />
              <BrowserRouter>
                <Switch>
                  <Route path="/Profile" component={() => WithMenu(Profile)} />
                  <Route path="/Identity" component={IdentityPage} />
                  <Route path="/Top" component={() => WithMenu(TopPage)} />
                  <Route path="/" component={() => WithMenu(LandingPage)} />
                </Switch>
                <div style={{ position: "fixed", bottom: 80, right: 50 }}>
                  {token === null ? null : <SubmitWorkWrapper />}
                </div>
              </BrowserRouter>
            </IdentityContext.Provider>
          </ThemeProvider>
        </StylesProvider>
      </MuiThemeProvider>
      <Footer />
      <ToastContainer/>
    </div>
  );
}

export default App;
export { IdentityContext };
