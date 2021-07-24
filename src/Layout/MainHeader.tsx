/** @format */

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    top: "5px",
    position: "fixed",
    width: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "right",
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
    justifyContent: "right",
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
}));

export const MainHeader = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
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
          </Hidden>
          <Hidden smDown>
            <Button color="inherit">خروج</Button>
          </Hidden>
        </nav>
        <Drawer
          variant="temporary"
          anchor={"right"}
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
            <Link
              onClick={handleDrawerToggle}
              to={"/Top"}
              style={{ color: "#000" }}
            >
              <ListItem button component="a" divider={true}>
                <ListItemText primary={"لیست برتر ها"} />
              </ListItem>
            </Link>
            <ListItem
              button
              component="a"
              className={classes.service}
              divider={true}
            >
              <ListItemIcon>
                <PowerSettingsNewIcon />
              </ListItemIcon>
              <Button color="inherit">خروج</Button>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </div>
  );
};
