import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SubmitWork } from "./Components/SubmitWork";
import DateFnsUtils from "@date-io/date-fns";

export const SubmitWorkWrapper = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <SubmitWork />
    </MuiPickersUtilsProvider>
  );
};
