import {
  Button,
  FormControl,
  Grid,
  Hidden,
  Input,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { Paper } from "material-ui";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { PostData } from "../../Services/ApiService";
import SignIn from '../../Assets/SignIn.png';

const useStyles = makeStyles({
  header: {
    textAlign:"right",
    color: "#D36F26",
    padding: "0 30px",
    fontSize:"28px",
    marginBottom: 10,
  },
  fullWidth: {
    width: "90%",
    marginTop:20,
  },
  banner:{
    width:"100%",
    height:"100%",
  },
  paper:{
    width:"60%",
    height:"auto",
    boxShadow:"none !important"
  },
  submitButton: {
    width: "85%",
    marginTop: 40,
    margin: 20,
    backgroundColor:"#FD7D21",
    maxWidth:"100px",
    "&:hover": {
      backgroundColor:"#DC6945",
    },
  },
  label: {
    left: "auto",
    paddingRight: 5,
    right: "0 !important",
    color: "#FD7D21 !important",
  },
});

const initValue: { [index: string]: string } = {
  userName: "",
  password: "",
};

export const Login = () => {
  const [form, setForm] = useState(initValue);
  const history = useHistory();
  const handleChange = (e: FormEvent<{}>) => {
    const newForm = { ...form };
    newForm[(e.target as HTMLInputElement).name] = (
      e.target as HTMLInputElement
    ).value;
    setForm(newForm);
  };

  const handleSubmit = () => {
    PostData("Identity/Login", form)
      .then(() => history.push("/"))
      .catch(() => alert("نام کاربری یا رمز اشتباه است"));
  };

  const classes = useStyles();
  return (
    <Grid container>
        <Grid xs={12} md={6} container alignItems="center" justify="center">
          <Paper rounded className={classes.paper}>
            <Grid className={classes.header}>
              <h3>ورود به الورتبه</h3>
            </Grid>
            <Grid>
              <FormControl className={classes.fullWidth}>
                <InputLabel className={classes.label}>نام کاربری</InputLabel>
                <Input
                  onChange={handleChange}
                  value={form.userName}
                  name="userName"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.fullWidth}>
                <InputLabel className={classes.label}>رمز ورود</InputLabel>
                <Input
                  onChange={handleChange}
                  value={form.password}
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>
            <Button
              className={classes.submitButton}
              color="primary"
              onClick={handleSubmit}
              variant="contained"
            >
              ورود
            </Button>
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid md={6}>
              <img src={SignIn} alt="signin" className={classes.banner}/>
          </Grid>
        </Hidden>
    </Grid>
  );
};