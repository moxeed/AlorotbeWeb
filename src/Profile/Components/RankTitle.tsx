/** @format */
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import CreateIcon from "@material-ui/icons/Create";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { GetData } from "../../Services/ApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  item:{
    width:"100%",
    borderRadius:"5px",
    backgroundColor:"#2E8BC0",
  },
  list:{

  }
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
    <Grid item container xs={12} spacing={1} justify="center" alignItems="center">
        <Grid item xs={12} md={4}> 
            <ListItem className={classes.item}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#B1D4E0" }}>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText style={{ textAlign: "right",color:"#fff" }} primary=" رتبه کل" secondary={rank}/>
            </ListItem>
        </Grid>
        <Grid item xs={12} md={4}>
            <ListItem className={classes.item}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#B1D4E0" }}>
                  <CreateIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                style={{ textAlign: "right",color:"#fff" }}
                primary="رتبه در تعداد تست"
                secondary={test}
              />
            </ListItem>
        </Grid>
        <Grid item xs={12} md={4}>
            <ListItem className={classes.item}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#B1D4E0" }}>
                  <ImportContactsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                style={{ textAlign: "right",color:"#fff" }}
                primary="رتبه در ساعت مطالعه"
                secondary={time}
              />
            </ListItem>
        </Grid>
    </Grid>
  );
};
