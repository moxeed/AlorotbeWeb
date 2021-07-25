/** @format */

import { Route, Router } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Box, createStyles, Grid, makeStyles } from "@material-ui/core";
import RedirectImg from "../Assets/orange_down.png";
import "./Loading/RedirectIdentity.css";
import { useEffect, useState } from "react";
import { LoadingRedirect } from "./Loading/Loading";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    top: {
      height: 200,
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

export const IdentityPage = () => {
  const [isDone, setIsDone] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (isDone === true) {
      setTimeout(() => {
        history.push("/");
      }, 5000);
    }
  }, [isDone]);

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Box className={classes.top}></Box>
      <div
        className={isDone === true ? "RedirectIdentity" : "DisplayNoneIdentity"}
      >
        <img
          width="100%"
          height="auto"
          className="RedirectPicture"
          src={RedirectImg}
          alt="banner"
        />
        <div className={"RedirectButton"}>
          <LoadingRedirect />
        </div>
      </div>
      <Router history={useHistory()}>
        <Route
          path="/Identity/Login"
          exact
          component={() => <Login setIsDone={setIsDone} isDone={isDone} />}
        />
        <Route path="/Identity/Register" exact component={Register} />
      </Router>
    </Grid>
  );
};
