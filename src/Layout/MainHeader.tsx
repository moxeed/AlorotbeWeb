/** @format */

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, NavLink, Route, Router, useHistory } from "react-router-dom";
import {
  Drawer,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import { useContext } from "react";
import { IdentityContext } from "../App";

const useStyles = makeStyles((theme) => ({
  root1: {
    width: "80%",
    margin: "5px 10%",
    marginBottom: "-150px",
    zIndex: 900,
  },
  root2: {
    width: "90%",
    margin: "20px 10%",
  },
  service: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      color: "#43BF46",
      borderBottom: "2px solid #43BF46",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: "0 20px",
  },
  links: {
    display: "flex",
    justifyContent: "left",
    minHeight: "70px",
    alignItems: "center",
  },
  drawerPaper: {
    width: "100%",
    maxWidth: "300px",
    flexShrink: 0,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerHeader: {
    left: 0,
    width: "100%",
    display: "flex",
    padding: "0 30px",
  },
  icon: {
    fontSize: "32px",
    color: "#FD7D21",
    verticalAlign: "middle",
    margin: "0 10px",
  },
}));

export const MainHeader = () => {
  const { isAuthenticated, setToken } = useContext(IdentityContext);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Router history={useHistory()}>
        <Route path="/" exact>
          <Grid container className={classes.root2}>
            <div>
              <LocationOnIcon className={classes.icon} />
              <label>آدرس شرکت</label>
            </div>
            <div>
              <PhoneCallbackIcon className={classes.icon} />
              <label> شماره تماس</label>
            </div>
          </Grid>
        </Route>
      </Router>

      <AppBar position="sticky" color="inherit" className={classes.root1}>
        <nav className={classes.links}>
          <Hidden mdUp>
            <Button onClick={handleDrawerToggle} style={{ width: "60px" }}>
              <MenuIcon style={{ color: "#FD7D21" }} />
            </Button>
          </Hidden>
          <Link to="/" style={{ color: "#FD7D21" }}>
            <Typography variant="h5" className={classes.title}>
              الورتبه
            </Typography>
          </Link>
          <Hidden smDown>
            <Link to="/Top" style={{ color: "#555555" }}>
              <Typography variant="h6" className={classes.title}>
                لیست برتر ها
              </Typography>
            </Link>
            {isAuthenticated ? (
              <Button color="inherit" onClick={() => setToken(null)}>
                <Typography variant="h6" className={classes.title}>
                  خروج
                </Typography>
              </Button>
            ) : (
              <>
                <NavLink to="/Identity/Login" style={{ color: "#555555" }}>
                  <Typography variant="h6" className={classes.title}>
                    ورود
                  </Typography>
                </NavLink>
                <NavLink to="/Identity/Register" style={{ color: "#555555" }}>
                  <Typography variant="h6" className={classes.title}>
                    ثبت نام
                  </Typography>
                </NavLink>
              </>
            )}
          </Hidden>
        </nav>
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerToggle}>
              <HighlightOffIcon />
            </IconButton>
          </div>
          <List>
            <ListItem
              button
              component="a"
              className={classes.service}
              divider={true}
            >
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <NavLink to="/Top" style={{ color: "#555555" }}>
                <Typography variant="h6" className={classes.title}>
                  لیست برتر ها
                </Typography>
              </NavLink>
            </ListItem>

            {isAuthenticated ? (
              <ListItem
                button
                component="a"
                className={classes.service}
                divider={true}
              >
                <ListItemIcon>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <Button color="inherit" onClick={() => setToken(null)}>
                  <Typography variant="h6" className={classes.title}>
                    خروج
                  </Typography>
                </Button>
              </ListItem>
            ) : (
              <>
                <ListItem
                  button
                  component="a"
                  className={classes.service}
                  divider={true}
                >
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <NavLink to="/Identity/Login" style={{ color: "#555555" }}>
                    <Typography variant="h6" className={classes.title}>
                      ورود
                    </Typography>
                  </NavLink>
                </ListItem>

                <ListItem
                  button
                  component="a"
                  className={classes.service}
                  divider={true}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <NavLink to="/Identity/Register" style={{ color: "#555555" }}>
                    <Typography variant="h6" className={classes.title}>
                      ثبت نام
                    </Typography>
                  </NavLink>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </AppBar>
    </>
  );
};
