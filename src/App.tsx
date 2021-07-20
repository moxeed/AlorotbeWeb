import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from "./Landing/LandingPage";
import { IdentityPage } from "./Identity/IdentityPage";
import { MuiThemeProvider } from "material-ui/styles";

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/Identity" component={IdentityPage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
