import { SubmitWork } from "./Components/SubmitWork";
import IModal from "../Common/IModal";
import { useEffect, useState } from "react";
import { Fab } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { GetData } from "../Services/ApiService";

export const SubmitWorkWrapper = () => {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(true);

  useEffect(() => {
    GetData("Planning/Submit").then(setSent);
  }, []);

  return (
    <>
      {sent ? (
        <Fab color="primary">
          <CheckIcon />
        </Fab>
      ) : (
        <Fab color="primary" type="button" onClick={() => setOpen(true)}>
          +
        </Fab>
      )}
      <IModal open={open} onClose={() => setOpen(false)}>
        <SubmitWork onFinish={() => setOpen(false)} />
      </IModal>
    </>
  );
};
