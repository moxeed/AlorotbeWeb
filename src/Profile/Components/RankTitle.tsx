/** @format */
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import CreateIcon from "@material-ui/icons/Create";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { ListItemSecondaryAction } from "@material-ui/core";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { GetData } from "../../Services/ApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const RankTitle = () => {
  const [rank, setRank] = useState < number > (0);
  const [time, setTime] = useState < number > (0);
  const [test, setTest] = useState < number > (0);
  const classes = useStyles();

  useEffect(() => {
    GetData("Planning/Rank").then((res) => {
      setRank(res.scoreRank);
      setTime(res.timeRank);
      setTest(res.testRank);
    });
  }, []);
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: "#FD7D21" }}>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText style={{ textAlign: "right" }} primary="رتبه کل" />
        <ListItemSecondaryAction>{rank}</ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: "#FD7D21" }}>
            <CreateIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          style={{ textAlign: "right" }}
          primary="رتبه در تعداد تست"
        />
        <ListItemSecondaryAction>{test}</ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: "#FD7D21" }}>
            <ImportContactsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          style={{ textAlign: "right" }}
          primary="رتبه در ساعت مطالعه"
        />
        <ListItemSecondaryAction>{time}</ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};
