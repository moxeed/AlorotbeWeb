import { Route, BrowserRouter } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Grid } from "@material-ui/core";

export const IdentityPage = () => {
  return (
    <Grid container justify="center">
      <BrowserRouter>
        <Route path="/Identity/Login" exact component={Login} />
        <Route path="/Identity/Register" exact component={Register} />
      </BrowserRouter>
    </Grid>
  );
};
