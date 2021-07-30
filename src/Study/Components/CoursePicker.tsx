import { Button, Grid } from "@material-ui/core";

export interface Course {
  id: number;
  name: string;
}

export const CoursePicker = (prop: {
  courses: Array<Course>;
  onCourseSelect: (id: number | null) => void;
}) => {
  return (
    <Grid xs={12} justify="center" container>
      <Grid item xs={12}>
        {prop.courses.map((c) => (
          <Button
            style={{ margin: 20 }}
            variant="contained"
            color="secondary"
            onClick={() => prop.onCourseSelect(c.id)}
          >
            {c.name}
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};
