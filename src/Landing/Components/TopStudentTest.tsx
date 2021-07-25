/** @format */
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { GetData } from "../../Services/ApiService";
import { CardsTop } from "../../Top/Components/CardsTop";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    transform: "rotate(90deg)",
    width: "160px",
    height: "100px",
    fontSize: "18px",
    marginTop: "40px",
    "@media (max-width: 425px)": {
      transform: "rotate(0deg)",
      width: "auto",
      height: "auto",
    },
  },
}));
export const TopStudentTest = () => {
  const classes = useStyles();
  const [data, setData] = useState(
    undefined as
      | Array<{
          name: string;
          lastName: string;
          majorName: string;
          gardeName: string;
          totalStudy: string;
          totalTestCount: number;
        }>
      | null
      | undefined
  );
  useEffect(() => {
    GetData("Planning/DailyTop/Test/10")
      .then(setData)
      .catch(() => setData(null));
  }, []);
  return (
    <Grid container style={{ height: "200px" }}>
      <Grid item xs={12} sm={1}>
        <Typography variant="h5" className={classes.title}>
          برتر های تستی امروز
        </Typography>
      </Grid>
      <Grid
        className={classes.container}
        container
        item
        xs={12}
        sm={11}
        justify="center"
        alignItems="center"
      >
        <CardsTop Data={data} />
      </Grid>
    </Grid>
  );
};
