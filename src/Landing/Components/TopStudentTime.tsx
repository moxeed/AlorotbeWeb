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
    transform: "rotate(0deg)",
    fontSize: "18px",
    marginTop: "40px",
  },
}));
export const TopStudentTime = () => {
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
    GetData("Planning/DailyTop/Time/10")
      .then(setData)
      .catch(() => setData(null));
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.title}>
          برتر های زمانی امروز
        </Typography>
      </Grid>
      <Grid
        className={classes.container}
        container
        item
        xs={12}
        justify="center"
        alignItems="center"
      >
        <CardsTop Data={data} />
      </Grid>
    </Grid>
  );
};
