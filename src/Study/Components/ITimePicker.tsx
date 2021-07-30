import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import IModal from "../../Common/IModal";

export const ITimePicker = (prop: {
  value: string;
  label: string;
  error: boolean | undefined;
  onChange: (time: string) => void;
}) => {
  const [hour, setHour] = useState<number>(1);
  const [minute, setMinute] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const value = ("0" + hour).slice(-2) + ":" + ("0" + minute).slice(-2);
  return (
    <div style={{ position: "relative" }}>
      <TextField
        onClick={() => setOpen(true)}
        error={prop.error}
        label={prop.label}
        value={value}
        style={{ width: "90%" }}
      />
      <IModal open={open} onClose={() => setOpen(false)}>
        <Grid justify="center" container>
          <h1 style={{ textAlign: "center" }}>{value}</h1>
          <Grid container>
            <br />
            <Grid
              xs={6}
              container
              style={{ overflowY: "auto", height: 200, width: 150 }}
            >
              {[...new Array(60)].map((_, index) => (
                <Button
                  style={{ width: "100%" }}
                  onClick={() => setMinute(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </Grid>
            <Grid
              xs={6}
              container
              style={{ overflowY: "auto", height: 200, width: 150 }}
            >
              {[...new Array(23)].map((_, index) => (
                <Button
                  style={{ width: "100%" }}
                  onClick={() => setHour(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </Grid>
          </Grid>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setOpen(false);
              prop.onChange(value);
            }}
            style={{ margin: 20 }}
          >
            انتخاب
          </Button>
        </Grid>
      </IModal>
    </div>
  );
};
