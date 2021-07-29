/** @format */
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Period, Top,Critrien } from "../../Top/Components/Top";

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
export const TopStudentTest = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.title}>
          برتر های امروز
        </Typography>
      </Grid>
      <Grid
        className={classes.container}
        container
        item
        xs={12}
        justify="center"
        alignItems="center"
        style={{maxWidth:"1020px",}}
      >
        <Top 
            period={Period.Week}
            critrien={Critrien.Score}
            count={15}
            gradeId={null}
        />
      </Grid>
    </Grid>
  );
};




