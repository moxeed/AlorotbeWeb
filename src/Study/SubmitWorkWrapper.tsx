import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SubmitWork } from "./Components/SubmitWork";
import DateFnsUtils from "@date-io/date-fns";
import IModal from "../Common/IModal";
import { useState } from "react";
import { Fab } from "@material-ui/core";

export const SubmitWorkWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab type="button" onClick={() => setOpen(true)}>
        +
      </Fab>
      <IModal open={open} onClose={() => setOpen(false)}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SubmitWork onFinish={() => setOpen(false)} />
        </MuiPickersUtilsProvider>
      </IModal>
    </>
  );
};
