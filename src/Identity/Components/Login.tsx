import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { Paper } from "material-ui";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { PostData } from "../../Services/ApiService";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#3f51b5",
    color: "White",
    padding: 1,
    marginBottom: 10,
  },
  fullWidth: {
    width: "90%",
  },
  submitButton: {
    width: "85%",
    marginTop: 40,
    margin: 20,
  },
  label: {
    left: "auto",
    paddingRight: 10,
    right: "0 !important",
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
    <Grid xs={11} md={4} lg={3}>
      <Paper rounded style={{ overflow: "hidden" }}>
        <Grid className={classes.header}>
          <h3>الو رتبه</h3>
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
  );
};
