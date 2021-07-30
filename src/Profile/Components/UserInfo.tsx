/** @format */
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Grid, ListItemSecondaryAction } from "@material-ui/core";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GetData } from "../../Services/ApiService";
import CallIcon from "@material-ui/icons/Call";
import InfoIcon from "@material-ui/icons/Info";
import SchoolIcon from "@material-ui/icons/School";
import { ProfileImage } from "./ProfileImage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const UserInfo = () => {
  const [info, setInfo] = useState<any>({});
  const classes = useStyles();

  useEffect(() => {
    GetData("Identity/UserInfo").then((res) => {
      setInfo(res);
    });
  }, []);
  return (
    <>
      <Grid item xs={12} style={{ padding: "2px 8px" }}>
        <Grid item xs={12} container justify="center" alignItems="center">
          <List className={classes.root}>
            <ListItem>
              <ProfileImage />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#FD7D21" }}>
                  <InfoIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText style={{ textAlign: "right" }} primary="نام" />
              <ListItemSecondaryAction>
                {info.name + " " + info.lastName}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#FD7D21" }}>
                  <SchoolIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                style={{ textAlign: "right" }}
                primary="رشته تحصیلی"
              />
              <ListItemSecondaryAction>
                {info.grade + " " + info.major}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#FD7D21" }}>
                  <CallIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                style={{ textAlign: "right" }}
                primary=" شماره تماس"
              />
              <ListItemSecondaryAction>
                {info.phoneNumber}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
};
