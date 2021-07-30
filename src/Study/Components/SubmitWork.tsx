import {
  Button,
  Fab,
  FormControl,
  Grid,
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
import IModal from "../../Common/IModal";
import { Course, CoursePicker } from "./CoursePicker";
import { ITimePicker } from "./ITimePicker";
import { timelineEnd } from "console";

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

export const SubmitWork = (prop: { onFinish: () => void }) => {
  const [courseStudies, setStudies] = useState(
    [] as Array<{
      testCount: number | null;
      studyTime: string;
      courseId: number | null;
    }>
  );
  const [selfEstimation, setSelfEstimation] = useState<number | null>(10);
  const [mood, setMood] = useState(0);
  const [awakeTime, setAwakeTime] = useState("");

  const [courses, setCourses] = useState([] as Array<Course>);
  const [remainingCourses, setRemainingCourses] = useState<Array<Course>>([]);

  const [open, setOpen] = useState(false);
  const [isValid, setValid] = useState<boolean>(true);
  const handleAddCourse = (courseId: number | null) => {
    if (courseId === null) return;

    const newState = [
      ...courseStudies,
      {
        testCount: null,
        studyTime: "",
        courseId: courseId,
      },
    ];
    setOpen(false);
    setStudies(newState);
  };

  useEffect(() => {
    const newRemainingCourses = [...courses].filter(
      (c) => courseStudies.filter((cs) => cs.courseId == c.id).length === 0
    );
    setRemainingCourses(newRemainingCourses);
  }, [courseStudies, courses]);

  useEffect(() => {
    GetData("BasicInfo/Course")
      .then((res) => {
        setCourses(res);
        handleAddCourse(res[0].id);
      })
      .catch();
  }, []);

  const handleStudyTimeChange = (time: string, index: number) => {
    const newState = [...courseStudies];
    newState[index].studyTime = time;
    setStudies(newState);
  };

  const handleTestCountChange = (e: FormEvent<{}>, index: number) => {
    const newState = [...courseStudies];
    newState[index].testCount = +(e.target as HTMLInputElement).value;
    setStudies(newState);
  };

  const handleSubmit = () => {
    if (selfEstimation === null || awakeTime === "") {
      setValid(false);
      return;
    }

    if (
      courseStudies.filter((c) => c.testCount === null || c.studyTime == "")
        .length > 0
    ) {
      setValid(false);
      return;
    }

    PostData("Planning/Submit", {
      selfEstimation,
      mood,
      awakeTime,
      courseStudies,
    })
      .then(() => {
        alert("ثبت شد");
        prop.onFinish();
      })
      .catch();
  };

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <h3>ثبت برنامه امروز</h3>
      <Grid container justify="center" spacing={3} style={{ padding: 10 }}>
        <Grid item>
          <Fab
            style={{ boxShadow: "none" }}
            color={mood === 0 ? "secondary" : "default"}
            onClick={() => setMood(0)}
          >
            <SentimentVerySatisfiedIcon style={{ fontSize: 50 }} />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            style={{ boxShadow: "none" }}
            color={mood === 1 ? "secondary" : "default"}
            onClick={() => setMood(1)}
          >
            <SentimentSatisfiedIcon style={{ fontSize: 50 }} />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            style={{ boxShadow: "none" }}
            color={mood === 2 ? "secondary" : "default"}
            onClick={() => setMood(2)}
          >
            <SentimentDissatisfiedIcon style={{ fontSize: 50 }} />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            style={{ boxShadow: "none" }}
            color={mood === 3 ? "secondary" : "default"}
            onClick={() => setMood(3)}
          >
            <SentimentVeryDissatisfiedIcon style={{ fontSize: 50 }} />
          </Fab>
        </Grid>
      </Grid>
      <Grid xs={12} container justify="center">
        <Grid xs={6}>
          <ITimePicker
            error={!isValid && awakeTime === ""}
            label="ساعت بیدار شدن"
            onChange={setAwakeTime}
            value={awakeTime}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            error={selfEstimation === null && !isValid}
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
              <FormControl className={classes.fullWidth}>
                <InputLabel>درس</InputLabel>
                <Select
                  disabled
                  error={s.courseId === null}
                  key={index}
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
              <ITimePicker
                error={s.studyTime === "" && !isValid}
                label="مدت مطالعه"
                value={s.studyTime}
                onChange={(d) => handleStudyTimeChange(d, index)}
              />
            </Grid>
            <Grid xs={3}>
              <TextField
                error={s.testCount === null && !isValid}
                onChange={(e) => handleTestCountChange(e, index)}
                label="تعداد تست"
                value={s.testCount}
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button
        style={{ margin: 20 }}
        variant="contained"
        color="secondary"
        disabled={remainingCourses.length === 0}
        onClick={() => setOpen(true)}
      >
        افزودن درس
      </Button>
      <IModal open={open} onClose={() => setOpen(false)}>
        <CoursePicker
          courses={remainingCourses}
          onCourseSelect={handleAddCourse}
        />
      </IModal>
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
