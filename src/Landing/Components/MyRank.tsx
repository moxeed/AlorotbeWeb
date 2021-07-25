import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { GetData } from "../../Services/ApiService";

const useStyles = makeStyles((theme) => ({
  contentInfo: {
    backgroundColor: "#FD7D21",
    borderRadius: "50%",
    color: "#fff",
    width: "60px",
    height: "60px",
    textAlign: "center",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    verticalAlign: "text-bottom",
  },
}));

export const MyRank = () => {
  const [rank, setRank] = useState<{ timeRank: number; testRank: number }>();

  useEffect(() => {
    GetData("Planning/Rank")
      .then((res) => {
        setRank({ timeRank: res.timeRank + 1, testRank: res.testRank + 1 });
      })
      .catch();
  }, []);

  const classes = useStyles();

  return (
    <Grid container style={{ margin: 20 }} justify="center">
      <Grid item xs={4}>
        <div className={classes.contentInfo}>
          <Typography style={{ fontSize: "20px" }}>{rank?.timeRank}</Typography>
        </div>
        <Typography>رتبه مطالعه</Typography>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.contentInfo}>
          <Typography style={{ fontSize: "20px" }}>{rank?.testRank}</Typography>
        </div>
        <Typography>رتبه تست زنی</Typography>
      </Grid>
    </Grid>
  );
};
