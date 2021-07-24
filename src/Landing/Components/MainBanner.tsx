/** @format */

import { MainHeader } from "../../Layout/MainHeader";
import { makeStyles, Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import Banner from "../../Assets/banner.jpg";
const useStyles = makeStyles({
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
  contact: {
    flexGrow: 1,
    top: "130px",
    position: "absolute",
    width: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    color: "#666666",
  },
  infoContact: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    "@media (max-width: 425px)": {
      display: "none",
    },
  },
  icon: {
    fontSize: "32px",
    color: "#FD7D21",
  },
  intro: {
    flexGrow: 1,
    top: "250px",
    position: "absolute",
    width: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "@media (max-width: 425px)": {
      top: "220px",
    },
  },
});
export const MainBanner = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.contact}>
          <div className={classes.infoContact}>
            <LocationOnIcon className={classes.icon} />
            <label>آدرس شرکت</label>
          </div>
          <div className={classes.infoContact}>
            <PhoneCallbackIcon className={classes.icon} />
            <label> شماره تماس</label>
          </div>
        </div>
        <div className={classes.intro}>
          <Typography variant="h4" style={{ color: "#FD7D21" }}>
            الورتبه
          </Typography>
          <Typography
            style={{ color: "#666666", fontSize: "15px", marginTop: "20px" }}
          >
            تضمین موفقیت در دوران تحصیلی شما
          </Typography>
        </div>
      </div>
    </>
  );
};
