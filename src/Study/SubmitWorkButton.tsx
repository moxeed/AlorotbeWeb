import { SubmitWork } from "./Components/SubmitWork";
import IModal from "../Common/IModal";
import { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { GetData } from "../Services/ApiService";
import CheckIcon from "@material-ui/icons/Check";

export const SubmitWorkButton = () => {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(true);

  useEffect(() => {
    GetData("Planning/Submit").then(setSent);
  }, []);
  return (
    <>
      {sent ? (
        <div>
          <CheckIcon color="secondary" />
          ثبت شده
        </div>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={() => setOpen(true)}
        >
          ثبت گزارش
        </Button>
      )}
      <IModal open={open} onClose={() => setOpen(false)}>
        <SubmitWork onFinish={() => setOpen(false)} />
      </IModal>
    </>
  );
};
