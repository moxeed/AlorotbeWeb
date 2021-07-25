import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SubmitWork } from "./Components/SubmitWork";
import DateFnsUtils from "@date-io/date-fns";
import IModal from "../Common/IModal";
import { useState } from "react";
import { Button } from "@material-ui/core";

export const SubmitWorkButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        type="button"
        onClick={() => setOpen(true)}
      >
        ثبت گزارش
      </Button>
      <IModal open={open} onClose={() => setOpen(false)}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SubmitWork onFinish={() => setOpen(false)} />
        </MuiPickersUtilsProvider>
      </IModal>
    </>
  );
};
