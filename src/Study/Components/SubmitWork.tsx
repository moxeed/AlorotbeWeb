import {
  Button,
  Fab,
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from "@material-ui/core";
import { FormEvent, useEffect, useState } from "react";
import { GetData, PostData } from "../../Services/ApiService";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { TimePicker } from "material-ui";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#3f51b5",
    color: "White",
    padding: 1,
    marginBottom: 10,
  },
  fullWidth: {
    width: "90%",
    margin: "0 5%",
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

export const SubmitWork = () => {
  const [courseStudies, setStudies] = useState(
    [] as Array<{
      testCount: number | null;
      studyTime: string;
      courseId: number | null;
    }>
  );
  const [selfEstimation, setSelfEstimation] = useState(10);
  const [mood, setMood] = useState(0);
  const [awakeTime, setAwakeTime] = useState("08:00");

  const [courses, setCourses] = useState(
    [] as Array<{ id: number; name: string }>
  );

  const handleAddCourse = () => {
    const newState = [
      ...courseStudies,
      {
        testCount: null,
        studyTime: "01:00",
        courseId: courses[0]?.id,
      },
    ];
    setStudies(newState);
  };

  useEffect(() => {
    GetData("BasicInfo/Course")
      .then((res) => {
        setCourses(res);
        handleAddCourse();
      })
      .catch();
  }, []);

  const handleStudyTimeChange = (time: Date, index: number) => {
    const newState = [...courseStudies];
    newState[index].studyTime = `${time.getHours()}:${time.getMinutes()}`;
    setStudies(newState);
  };

  const handleCourseChange = (e: FormEvent<{}>, index: number) => {
    const newState = [...courseStudies];
    newState[index].courseId = +(e.target as HTMLInputElement).value;
    setStudies(newState);
  };

  const handleTestCountChange = (e: FormEvent<{}>, index: number) => {
    const newState = [...courseStudies];
    newState[index].testCount = +(e.target as HTMLInputElement).value;
    setStudies(newState);
  };

  const handleSubmit = () => {
    PostData("Planning/Submit", {
      selfEstimation,
      mood,
      awakeTime,
      courseStudies,
    })
      .then(() => {
        debugger;
        alert("ثبت شد");
      })
      .catch();
  };

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <h3>ثبت برنامه امروز</h3>
      <Grid container justify="center" spacing={5} style={{ padding: 20 }}>
        <Grid item>
          <Fab
            color={mood === 0 ? "secondary" : "default"}
            onClick={() => setMood(0)}
          >
            <SentimentVerySatisfiedIcon style={{ fontSize: 50 }} />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            color={mood === 1 ? "secondary" : "default"}
            onClick={() => setMood(1)}
          >
            <SentimentSatisfiedIcon style={{ fontSize: 50 }} />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            color={mood === 2 ? "secondary" : "default"}
            onClick={() => setMood(2)}
          >
            <SentimentDissatisfiedIcon style={{ fontSize: 50 }} />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            color={mood === 3 ? "secondary" : "default"}
            onClick={() => setMood(3)}
          >
            <SentimentVeryDissatisfiedIcon style={{ fontSize: 50 }} />
          </Fab>
        </Grid>
      </Grid>
      <Grid xs={12} container justify="center">
        <Grid xs={6}>
          <FormControl className={classes.fullWidth} variant="outlined">
            <TimePicker
              onChange={(e, d) =>
                setAwakeTime(`${d.getHours()}:${d.getMinutes()}`)
              }
              className="MuiInputBase-input MuiInput-input"
              fullWidth
              format="24hr"
              hintText="مدت زمان بیدار بودن"
              cancelLabel
            />
          </FormControl>
        </Grid>
        <Grid xs={6}>
          <TextField
            variant="outlined"
            label="ارزیابی از خود"
            onChange={(e) =>
              setSelfEstimation(+(e.target as HTMLInputElement).value)
            }
            value={selfEstimation}
            type="number"
            fullWidth
          />
        </Grid>

        {courseStudies.map((s, index) => (
          <Grid container key={index} style={{ margin: 5 }}>
            <Grid xs={5}>
              <FormControl className={classes.fullWidth} variant="outlined">
                <InputLabel id="demo-simple-select-readonly-label">
                  درس
                </InputLabel>
                <Select
                  key={index}
                  labelId="demo-simple-select-readonly-label"
                  onChange={(e) => handleCourseChange(e, index)}
                  value={s.courseId}
                  label="درس"
                >
                  {courses.map((c) => (
                    <option value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={4}>
              <FormControl className={classes.fullWidth} variant="outlined">
                <TimePicker
                  key={index}
                  onChange={(e, d) => handleStudyTimeChange(d, index)}
                  className="MuiInputBase-input MuiInput-input"
                  fullWidth
                  format="24hr"
                  hintText="زمان مطالعه"
                  cancelLabel
                />
              </FormControl>
            </Grid>
            <Grid xs={3}>
              <TextField
                onChange={(e) => handleTestCountChange(e, index)}
                label="تعداد تست"
                value={s.testCount}
                type="number"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 20 }}
        onClick={handleAddCourse}
      >
        افزودن درس
      </Button>
      <Button
        color="secondary"
        style={{ margin: 20 }}
        variant="contained"
        onClick={handleSubmit}
      >
        ارسال
      </Button>
    </Grid>
  );
};
