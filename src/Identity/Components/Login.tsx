/** @format */

import {
  Button,
  FormControl,
  Grid,
  Hidden,
  Input,
  InputLabel,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Paper } from "material-ui";
import { FormEvent, useState } from "react";
import { PostData } from "../../Services/ApiService";
import SignIn from "../../Assets/Login.png";
import { FC } from "react";
import { useContext } from "react";
import { IdentityContext } from "../../App";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";


const useStyles = makeStyles({
  header: {
    textAlign: "left",
    color: "#D36F26",
    padding: "0 30px",
    fontSize: "28px",
    marginBottom: 10,
  },
  fullWidth: {
    width: "90%",
    marginTop: 20,
  },
  banner: {
    width: "100%",
    height: "auto",
  },
  paper: {
    width: "70%",
    height: "auto",
    boxShadow: "none !important",
    "@media (max-width: 425px)": {
      width: "100%",
    },
  },
  label: {
    paddingRight: 5,
    color: "#FD7D21 !important",
  },
});

interface Props {
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
}

const initValue: { [index: string]: string } = {
  userName: "",
  password: "",
};

export const Login: FC<Props> = ({ isDone, setIsDone, ...props }) => {
  const { setToken } = useContext(IdentityContext);
  const [form, setForm] = useState(initValue);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleChange = (e: FormEvent<{}>) => {
    const newForm = { ...form };
    newForm[(e.target as HTMLInputElement).name] = (
      e.target as HTMLInputElement
    ).value;
    setForm(newForm);
  };

  const handleSubmit = () => {
    if (form.password !== "" && form.userName !== "") {
      setIsProcessing(true);
      PostData("Identity/Login", form)
        .then((res) => {
          setToken(res.token);
          setIsDone(true);
          setIsProcessing(false);
        })
        .catch((error) => {
          toast.error(error.name, {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsProcessing(false);
        });
    } else {
      toast.warn("نام کاربری یا رمز خالی است", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const classes = useStyles();
  return (
    <Grid container className={"Fade-in"} >
      <Hidden smDown>
        <Grid md={6}>
          <img src={SignIn} alt="signin" className={classes.banner} />
        </Grid>
      </Hidden>
      <Grid xs={12} md={6} container alignItems="center" justify="center">
        <Paper rounded className={classes.paper}>
          <Grid className={classes.header}>
            <h3>ورود به الورتبه</h3>
          </Grid>
          <Grid>
            <FormControl className={classes.fullWidth} required>
              <InputLabel className={classes.label}>نام کاربری</InputLabel>
              <Input
                onChange={handleChange}
                value={form.userName}
                name="userName"
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl className={classes.fullWidth} required>
              <InputLabel className={classes.label}>رمز ورود</InputLabel>
              <Input
                onChange={handleChange}
                value={form.password}
                type="password"
                name="password"
              />
            </FormControl>
          </Grid>
          {isProcessing ? (
            <CircularProgress
              style={{ width: 30, height: 30, margin: 10, color: "#FD7D21" }}
            />
          ) : (
            <Button
              className={"submitButton"}
              color="primary"
              onClick={handleSubmit}
              variant="contained"
            >
              ورود
            </Button>
          )}
          <NavLink to="/Identity/Register"style={{color: "#FD7D21"}}>
            حساب ندارید؟    ثبت نام کنید
          </NavLink>
        </Paper>
      </Grid>
    </Grid>
  );
};
