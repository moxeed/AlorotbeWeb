import { TextField } from "@material-ui/core";
import { TimePicker } from "material-ui";

export const ITimePicker = (prop: {
  value: string;
  label: string;
  error: boolean | undefined;
  onChange: (time: string) => void;
}) => {
  return (
    <div
      onClick={(e) => {
        (e.target as HTMLElement).parentElement?.parentElement?.parentElement
          ?.getElementsByTagName("input")[1]
          .click();
      }}
    >
      <TextField
        error={prop.error}
        label={prop.label}
        value={prop.value}
        style={{ width: "90%" }}
      />
      <TimePicker
        onChange={(e, d) => prop.onChange(`${d.getHours()}:${d.getMinutes()}`)}
        format="24hr"
        id="picker"
        style={{ display: "none" }}
      />
    </div>
  );
};
