/** @format */

import { Route, Router } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Grid } from "@material-ui/core";
import RedirectImg from "../Assets/orange_down.png";
import "./Loading/RedirectIdentity.css";
import { useEffect, useState } from "react";
import { LoadingRedirect } from "./Loading/Loading";
import { useHistory } from "react-router-dom";

export const IdentityPage = () => {
  const [isDone, setIsDone] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (isDone === true) {
      history.push("/");
    }
  }, [isDone]);

  return (
    <Grid container justify="center">
      <Router history={useHistory()}>
        <Route
          path="/Identity/Login"
          exact
          component={() => <Login setIsDone={setIsDone} isDone={isDone} />}
        />
        <Route
          path="/Identity/Register"
          exact
          component={() => <Register setIsDone={setIsDone} isDone={isDone} />}
        />
      </Router>
    </Grid>
  );
};
