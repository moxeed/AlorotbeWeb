import { Button, FormLabel, Grid, Select } from "@material-ui/core";
import { Critrien, Period, Top } from "./Components/Top";
import StudentImage from "../Assets/StudentVector.jpg";
import { useState } from "react";
import { useEffect } from "react";
import { GetData } from "../Services/ApiService";
import { MenuItem } from "material-ui";

interface Grade {
  id: number;
  name: string;
}

export const TopPage = () => {
  const [critiren, setCritiren] = useState(Critrien.Test);
  const [period, setPeriod] = useState<Period>(Period.Day);
  const [grade, setGrade] = useState<number>(-1);
  const [grades, setGrades] = useState<Array<Grade>>([]);

  useEffect(() => {
    GetData("BasicInfo/Grade").then(setGrades).catch(console.log);
  }, []);

  return (
    <Grid
      container
      justify="center"
      style={{ marginTop: "150px", minHeight: "60vh" }}
    >
      <Grid container justify="center">
        <Grid xs={9} md={4} item>
          <img src={StudentImage} style={{ width: "100%" }} alt="Students" />
        </Grid>
        <Grid
          xs={12}
          md={5}
          item
          container
          justify="center"
          alignItems="center"
        >
          <Grid item style={{ paddingBottom: 20 }}>
            <h1> نفرات برتر الو رتبه </h1>
            <Grid container justify="center" spacing={0}>
              <Grid item >
                <Button
                  onClick={() => setCritiren(Critrien.Test)}
                  color="secondary"
                  variant="contained"
                >
                  تعداد تست
                </Button>
              </Grid>
              <Grid item >
                <Button
                  onClick={() => setCritiren(Critrien.Time)}
                  color="secondary"
                  variant="contained"
                >
                  مدت زمان مطالعه
                </Button>
              </Grid>
              <Grid item > 
                <Button
                  onClick={() => setCritiren(Critrien.Score)}
                  color="secondary"
                  variant="contained"
                >
                  امتیاز
                </Button>
              </Grid>
            </Grid>
            <Grid container style={{ padding: 20 }}>
              <Grid xs={6}>
                <FormLabel>بازه زمانی</FormLabel>
                <Select
                  fullWidth
                  style={{ width: "90%" }}
                  onChange={(e) =>
                    setPeriod(
                      (e.target as HTMLInputElement).value as unknown as Period
                    )
                  }
                  value={period}
                >
                  <MenuItem value={Period.Day}>دیروز</MenuItem>
                  <MenuItem value={Period.Week}>هفته اخیر</MenuItem>
                  <MenuItem value={Period.Month}>ماه اخیر</MenuItem>
                  <MenuItem value={Period.Year}>سال اخیر</MenuItem>
                </Select>
              </Grid>
              <Grid xs={6}>
                <FormLabel>پایه</FormLabel>
                <Select
                  style={{ width: "90%" }}
                  onChange={(e) =>
                    setGrade(+(e.target as HTMLInputElement).value)
                  }
                  value={grade}
                >
                  {grades.map((g) => (
                    <MenuItem value={g.id}>{g.name}</MenuItem>
                  ))}
                  <MenuItem value="-1">همه</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} md={10} item>
        <Top
          critrien={critiren}
          period={period}
          count={100}
          gradeId={grade === -1 ? null : grade}
        />
      </Grid>
    </Grid>
  );
};
