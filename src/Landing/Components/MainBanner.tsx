import { makeStyles, Typography } from "@material-ui/core";
import Banner from "../../Assets/banner.jpg";

const useStyles = makeStyles({
  intro: {
    flexGrow: 1,
    top: "150px",
    position: "absolute",
    width: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "@media (max-width: 425px)": {
      top: "220px",
    },
  },
  root: {
    width: "100%",
    height: "100vh",
    display: "block",
    padding: "20px",
    backgroundImage: `url(${Banner})`,
    backgroundColor: "#EBEBEB",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
});
export const MainBanner = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.intro}>
          <Typography variant="h3" style={{ color: "#FD7D21" }}>
            الورتبه
          </Typography>
          <Typography
            style={{ color: "#666666", fontSize: "18px", marginTop: "10px" }}
          >
            اینجا کنکور بهت خوش میگذره!
          </Typography>
        </div>
      </div>
    </>
  );
};
