/** @format */

import { ListItem, ListItemText, List } from "@material-ui/core";
import { Grid, makeStyles } from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import InstagramIcon from "@material-ui/icons/Instagram";
import PhoneIcon from "@material-ui/icons/Phone";
import Divider from "@material-ui/core/Divider";
import "./Footer.css";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  Footer: {
    background: "#535353",
    marginTop:"30px",
  },
  textContainer: {
    textAlign: "right",
    padding: "20px",
    color: "#fff",
  },
  listSocialmedia: {
    background: "transparent !important",
  },
  sizeIcon: {
    fontSize: "1rem",
    paddingTop:"5px",
  },
}));
export const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.Footer}>
      <Grid
        item
        xs={12}
        md={6}
        container
        className={classes.textContainer}
        justify="center"
      >
        <Grid xs={12}>
          <Typography>الورتبه در شبکه های مجازی</Typography>
          <Divider style={{ marginTop: "5px" }} />
        </Grid>
        <Grid item xs={11} md={8} container alignItems="center" >
          <Typography style={{ padding: "20px", fontSize: "15px" }}>
            دانش آموزان عزیز، شما میتوانید از طریق راه های ارتباطی الورتبه، از
            اخرین اخبار و امکانات اکادمی مطلع شوید.
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          md={4}
          container
          justify="center"
          alignItems="center"
        >
          <List className={classes.listSocialmedia}>
            <ListItem style={{ padding: "0" }}>
              <div className={"snip1472"}>
                <TelegramIcon className={classes.sizeIcon} />
              </div>
              <a href="https://t.me/alorotbe_konkoor" style={{ color: "#fff" }}>
                <ListItemText primary="کانال تلگرام" />
              </a>
            </ListItem>
          
            <ListItem style={{ padding: "0" }}>
              <div className={"snip1472"}>
                <InstagramIcon className={classes.sizeIcon} />
              </div>
              <a href="https://www.instagram.com/alorotbe/" style={{ color: "#fff" }}>
                <ListItemText primary="پیج اینستاگرام " />
              </a>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        container
        className={classes.textContainer}
        justify="center"
      >
        {/*
         <Grid xs={12}>
          <Typography>ارتباط با الورتبه</Typography>
          <Divider style={{ marginTop: "5px", color: "#fff" }} />
        </Grid>
        <Grid item xs={12} md={8} container alignItems="center">
          <p style={{ padding: "20px", fontSize: "15px" }}>
            جهت تماس با دفتر مرکزی گروه پشتیبانی الورتبه از یکی از روش های رو به
            رو اقدام کنید
          </p>
        </Grid>
        <Grid
          item
          xs={10}
          md={4}
          container
          justify="center"
          alignItems="center"
        >
          <List className={classes.listSocialmedia}>
            <ListItem style={{ padding: "0" }}>
              <div className={"snip1472"}>
                <PhoneIcon className={classes.sizeIcon} />
              </div>
              <span style={{ color: "#fff", cursor: "context-menu" }}>
                <ListItemText primary="021-11111111" />
              </span>
            </ListItem>
            <ListItem style={{ padding: "0" }}>
              <div className={"snip1472"}>
                <PhoneIcon className={classes.sizeIcon} />
              </div>
              <span style={{ color: "#fff", cursor: "context-menu" }}>
                <ListItemText primary="021-11111111" />
              </span>
            </ListItem>
          </List>
        </Grid>
        */}
       
        
      </Grid>
      <Grid
        item
        xs={12}
        container
        justify="center"
        style={{ background: "#F67C01" }}
      >
        <Typography style={{ color: "#fff", fontSize: "10px" }}>
          Copyright @2021 Alorotbeh.com
        </Typography>
      </Grid>
    </Grid>
  );
};
