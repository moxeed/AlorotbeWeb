/** @format */

import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import IconCard from "../../Assets/IconCard.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    width: "100%",
    padding: "10px",
    minHeight: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentInfo: {
    backgroundColor: "#FD7D21",
    borderRadius: "50%",
    color: "#fff",
    width: "60px",
    height: "60px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const CardsTop = (prop: {
  Data:
    | Array<{
        name: string;
        lastName: string;
        gardeName: string;
        totalStudy: string;
        totalTestCount: number;
      }>
    | null
    | undefined;
}) => {
  const { Data } = prop;
  const classes = useStyles();
  console.log(Data);
  return (
    <>
      {" "}
      {Data && Data?.length > 0 ? (
        Data.map((item) => (
          <Grid item sm={4} md={2} xs={12} style={{ margin: "10px" }}>
            <Card className={classes.root}>
              <Grid container>
                <Grid
                  item
                  xs={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography>{item.name + " " + item.lastName}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <img src={IconCard} alt="icon" width="60px" />
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: "12px" }}>
                    {item.gardeName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="center" alignItems="center">
                    <Grid
                      item
                      xs={6}
                      style={{ justifyContent: "center", display: "flex" }}
                    >
                      <div className={classes.contentInfo}>
                        <Typography style={{ fontSize: "10px" }}>
                          {item.totalStudy}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ justifyContent: "center", display: "flex" }}
                    >
                      <div className={classes.contentInfo}>
                        <Typography style={{ fontSize: "10px" }}>
                          {item.totalTestCount + " "} تست
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>داده ای برای نمایش وجود ندارد</Typography>
      )}
    </>
  );
};
