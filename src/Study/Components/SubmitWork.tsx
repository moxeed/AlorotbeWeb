import {
  Button,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { FormEvent, useEffect, useState } from "react";
import { GetData, PostData } from "../../Services/ApiService";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { Course } from "./CoursePicker";
import { ITimePicker } from "./ITimePicker";
import { toast } from "react-toastify";
import { MenuItem } from "material-ui";

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
      name: string;
    }>
  );
  const [selfEstimation, setSelfEstimation] = useState<number | null>(10);
  const [mood, setMood] = useState(0);
  const [awakeTime, setAwakeTime] = useState("");
  const [courses, setCourses] = useState([] as Array<Course>);
  const [isValid, setValid] = useState<boolean>(true);
  let remainingCourses = courses.filter(
    (c) => courseStudies.filter((cs) => cs.courseId == c.id).length === 0
  );

  const handleAddCourse = () => {
    if(!remainingCourses[0]) return;

    const newState = [
      ...courseStudies,
      {
        testCount: null,
        studyTime: "",
        courseId: remainingCourses[0].id,
        name: remainingCourses[0].name
      },
    ];
    setStudies(newState);
  };

  useEffect(() => {
    GetData("BasicInfo/Course")
      .then((res) => {
        setCourses(res);
        remainingCourses = res;
        handleAddCourse();
      })
      .catch(() => {
        toast.error("مشکل در گرفتن برنامه!", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
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

  const handleCourseChange = (e: FormEvent<{}>, index: number) => {
    const newState = [...courseStudies];
    const courseId = +(e.target as HTMLInputElement).value;
    const course = courses.find(c => c.id === courseId)
    if (!course) return;
    newState[index].courseId = courseId;
    newState[index].name = course.name;
    setStudies(newState);
  };

  const handleSubmit = () => {
    if (selfEstimation === null || awakeTime === "") {
      setValid(false);
      return;
    }

    if (
      courseStudies.filter((c) => c.testCount === null || c.studyTime === "")
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
        toast.success("گزارش امروز ثبت شد", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        prop.onFinish();
      })
      .catch(() => {
        toast.error("مشکل در ثبت برنامه!", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Typography variant="h5">ثبت برنامه امروز</Typography>
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
              {
                const rate = +(e.target as HTMLInputElement).value;
                if (rate > 0 && rate < 11)
                setSelfEstimation(rate);
              }
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
                  onChange={(e) => handleCourseChange(e, index)}
                  error={s.courseId === null}
                  key={index}
                  value={s.courseId}
                  label="درس"
                >
                  {remainingCourses.map((c) => (
                    <MenuItem value={c.id}>{c.name}</MenuItem>
                    ))}
                  <MenuItem value={s.courseId}>{s.name}</MenuItem>
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
