/** @format */
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { IdentityContext } from "../../App";
import Banner from "../../Assets/Study.jpg";
import { GetData } from "../../Services/ApiService";
import { SubmitWorkButton } from "../../Study/SubmitWorkButton";
import { MyRank } from "./MyRank";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: "500px",
    height: "500px",
    overflow: "hidden",
    display: "grid",
    placeItems: "center",
  },
}));
export const StudentStatus = () => {
  const { isAuthenticated } = useContext(IdentityContext);
  const [info, setInfo] = useState<any>();
  
  useEffect(() => {
    GetData("Identity/UserInfo").then((res) => {
      setInfo(res);
    });
  }, []);
  
  const classes = useStyles();
  return (
    <Grid container>
      <Grid
        className={classes.container}
        container
        direction="column"
        item
        xs={12}
        md={6}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h5">
            <span style={{ color: "#FD7D21" }}>{info? info.name + " " + info.lastName : "دوست"} عزیز</span>، به پنل خودت خوش
            اومدی!
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ textAlign: "right", padding: "20px" }}>
            {`
              در این پنل میتونی گزارش روزانه خودت رو ثبت کنی و از روند پیشرفت خودت مطلع بشی.
              همینطور رقابتی سالم با دوستای هم پایه خودت رو تجربه کنی!
                                            `}
          </Typography>
        </Grid>
        {isAuthenticated ? (
          <>
            <MyRank />
            <Grid item>
              <Typography className={"Main-text-Ex"}>
                گزارش امروزتو ثبت نکردی؟
              </Typography>
              <SubmitWorkButton />
            </Grid>
          </>
        ) : null}
      </Grid>
      <Grid className={classes.container} item xs={12} md={6}>
        <img src={Banner} alt="banner" width="75%" />
      </Grid>
    </Grid>
  );
};
