import { ReactChildren } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Paper } from "material-ui";
import { ReactChild } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      position: "absolute",
      maxWidth: 700,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: "100%",
      overflowY: "auto",
    },
  })
);

export default function IModal(prop: {
  open: boolean;
  onClose: () => void;
  children: ReactChild | ReactChildren;
}) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={prop.open}
      onClose={prop.onClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Paper className={classes.paper}>{prop.children}</Paper>
    </Modal>
  );
}
