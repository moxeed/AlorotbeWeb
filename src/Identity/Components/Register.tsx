/** @format */

import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  Input,
  InputLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { Typography, StepLabel, Step, Stepper } from "@material-ui/core";
import { MenuItem, Paper } from "material-ui";
import React, { useState, FC, FormEvent, useEffect } from "react";
import { PostData, GetData } from "../../Services/ApiService";
import SignIn from "../../Assets/SignIn.png";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { SetToken } from "../../Services/Identity";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginRight: theme.spacing(1),
  },
  header: {
    textAlign: "left",
    padding: "0 30px",
    fontSize: "28px",
    marginBottom: 10,
  },
  fullWidth: {
    width: "90%",
    marginTop: 10,
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  paper: {
    width: "80%",
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
  RadioBtns: {
    flexDirection: "row",
    marginTop: "10px",
  },
}));

interface Props {
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
}

const initValue: { [index: string]: any } = {
  userName: "",
  password: "",
  name: "",
  lastName: "",
  phoneNumber: "",
  avgLevel: 0,
  gpa: 0,
  hasSupporter: false,
  cityId: 1,
  majorId: 0,
  gradeId: 0,
  suppporterId: null,
};

export const Register: FC<Props> = ({ isDone, setIsDone, ...props }) => {
  const [form, setForm] = useState(initValue);
  const [grades, setGrades] = useState(
    [] as Array<{ id: number; name: string }>
  );
  const [majors, setMajors] = useState(
    [] as Array<{ id: number; name: string }>
  );
  const [city, setCity] = useState([] as Array<{ id: number; name: string }>);
  const [supporters, setSupporters] = useState(
    [] as Array<{ id: number; name: string; lastName: string }>
  );
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  useEffect(() => {
    GetData("BasicInfo/Grade").then((res) => {
      setGrades(res);
    });
    GetData("BasicInfo/Major").then((res) => {
      setMajors(res);
    });
    GetData("BasicInfo/City").then((res) => {
      setCity(res);
    });
    GetData("Identity/Supporter").then((res) => {
      setSupporters(res);
    });
  }, [isDone]);

  const handleChangeString = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleChangeInt = (e: FormEvent<{}>) => {
    const newForm = { ...form };
    newForm[(e.target as HTMLInputElement).name] = Number(
      (e.target as HTMLInputElement).value
    );
    setForm(newForm);
  };
  const handleChangeBool = (e: FormEvent<{}>) => {
    const newForm = { ...form };
    newForm[(e.target as HTMLInputElement).name] =
      (e.target as HTMLInputElement).value === "true";
    setForm(newForm);
  };
  function getSteps() {
    return [" کاربری", " شخصی", " تحصیلی"];
  }
  function getStepContent(step: Number) {
    switch (step) {
      case 0:
        return (
          <>
            <Grid>
              <FormControl className={classes.fullWidth} required>
                <InputLabel className={classes.label}>نام کاربری</InputLabel>
                <Input
                  onChange={handleChangeString}
                  value={form.userName}
                  name="userName"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.fullWidth} required>
                <InputLabel className={classes.label}>رمز ورود(شامل عدد، حروف و کارکتر)</InputLabel>
                <Input
                  onChange={handleChangeString}
                  value={form.password}
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid>
              <FormControl className={classes.fullWidth} required>
                <InputLabel className={classes.label}> نام</InputLabel>
                <Input
                  onChange={handleChangeString}
                  value={form.name}
                  name="name"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.fullWidth} required>
                <InputLabel className={classes.label}>نام خانوادگی</InputLabel>
                <Input
                  onChange={handleChangeString}
                  value={form.lastName}
                  name="lastName"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.fullWidth} required>
                <InputLabel className={classes.label}>شماره تماس(دوازده رقم)</InputLabel>
                <Input
                  onChange={handleChangeString}
                  value={form.phoneNumber}
                  name="phoneNumber"
                />
              </FormControl>
            </Grid>

            <Grid>
              <FormControl className={classes.fullWidth}>
                <InputLabel className={classes.label}>شهر محل سکونت</InputLabel>
                <Select
                  value={form.cityId}
                  name="cityId"
                  onChange={(e) => handleChangeInt(e)}
                  style={{ textAlign: "right" }}
                >
                  {city.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.fullWidth} required>
                <InputLabel className={classes.label}>پایه تحصیلی </InputLabel>
                <Select
                  value={form.gradeId}
                  name="gradeId"
                  onChange={(e) => handleChangeInt(e)}
                  style={{ textAlign: "right" }}
                >
                  {grades.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid>
              <FormControl className={classes.fullWidth} required>
                <InputLabel className={classes.label}> رشته تحصیلی</InputLabel>
                <Select
                  value={form.majorId}
                  name="majorId"
                  onChange={(e) => handleChangeInt(e)}
                  style={{ textAlign: "right" }}
                >
                  {majors.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.fullWidth}>
                <InputLabel className={classes.label}>تراز آزمون </InputLabel>
                <Input
                  onChange={handleChangeInt}
                  value={form.avgLevel}
                  name="avgLevel"
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.fullWidth}>
                <InputLabel className={classes.label}>
                  {" "}
                  معدل سال اخیر
                </InputLabel>
                <Input
                  onChange={handleChangeInt}
                  type="number"
                  value={form.gpa}
                  name="gpa"
                />
              </FormControl>
            </Grid>

            <Grid>
              <FormControl className={classes.fullWidth}>
                <InputLabel className={classes.label}>
                  {" "}
                  آیا مشاور دارید؟
                </InputLabel>
                <RadioGroup
                  name="hasSupporter"
                  value={Boolean(form.hasSupporter)}
                  onChange={handleChangeBool}
                  className={classes.RadioBtns}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="بله"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="خیر"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {String(form.hasSupporter) === "true" ? (
              <Grid>
                <FormControl className={classes.fullWidth} required>
                  <InputLabel className={classes.label}>نام مشاور</InputLabel>
                  <Select
                    value={form.suppporterId}
                    name="suppporterId"
                    onChange={(e) => handleChangeInt(e)}
                    style={{ textAlign: "right" }}
                  >
                    {supporters.map((item) => (
                      <MenuItem value={item.id}>
                        {item.name + " " + item.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : null}
          </>
        );
      default:
        return "محتوایی وجود ندارد ";
    }
  }

  const isStepSkipped = (step: Number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSubmit = () => {
    if (
      form.userName !== "" &&
      form.password !== "" &&
      form.name !== "" &&
      form.lastName !== "" &&
      form.phoneNumber !== "" &&
      form.majorId !== 0 &&
      form.gradeId !== 0
    ) {
      PostData("Identity/Register", form)
        .then((res) => {
          setIsDone(true);
          SetToken(res?.token);
        })
        .catch((error) => {
          toast.error(error[0].description, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.warn("برخی فیلد های ضروری ناقص است", {
        position: "bottom-right",
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
    <Grid container className={"Fade-in"}>
      <Grid xs={12} md={6} container alignItems="center" justify="center">
        <Paper rounded className={classes.paper}>
          <Grid className={classes.header}>
            <h3> ثبت نام در الورتبه </h3>
          </Grid>
          <Grid>
            <div className={classes.root}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                <div>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                      className={"submitButton"}
                    >
                      قبلی
                    </Button>
                    {activeStep !== 2 ? (
                      <Button
                        variant="contained"
                        className={"submitButton"}
                        onClick={handleNext}
                      >
                        بعدی
                      </Button>
                    ) : (
                      <Button
                        className={"submitButton"}
                        onClick={() => handleSubmit()}
                        variant="contained"
                      >
                        ثبت نام
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <NavLink to="/Identity/Login" style={{color: "#FD7D21"}}>حساب دارید؟ وارد شوید</NavLink>
          </Grid>
        </Paper>
      </Grid>
      <Hidden smDown>
        <Grid md={6}>
          <img src={SignIn} alt="signin" className={classes.banner} />
        </Grid>
      </Hidden>
    </Grid>
  );
};