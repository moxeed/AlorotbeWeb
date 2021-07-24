import { Button, Grid, makeStyles } from "@material-ui/core";
import { NavLink, Route, Router, useHistory } from "react-router-dom";
import { TestTop } from "./Components/TestTop";
import { TimeTop } from "./Components/TimeTop";
import StudentImage from "../Assets/StudentVector.jpg";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
}));

export const TopPage = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid container justify="center">
        <Grid xs={9} md={4} item>
          <img src={StudentImage} style={{ width: "100%" }} alt="Students" />
        </Grid>
        <Grid
          xs={12}
          md={5}
          item
          container
          justify="center"
          alignItems="center"
        >
          <Grid item style={{ paddingBottom: 20 }}>
            <h1> نفرات برتر الو رتبه </h1>
            <Grid container justify="center" spacing={4}>
              <Grid item>
                <NavLink className={classes.link} to="/Top/Test">
                  <Button color="secondary" variant="contained">
                    تعداد تست
                  </Button>
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink className={classes.link} to="/Top/Time">
                  <Button color="secondary" variant="contained">
                    مدت زمان مطالعه
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} md={10} item>
        <Router history={useHistory()}>
          <Route exact path="/Top/Test" component={TestTop} />
          <Route exact path="/Top/Time" component={TimeTop} />
        </Router>
      </Grid>
    </Grid>
  );
};
