import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import fire from "../firebase-config";

const useStyles = makeStyles((theme) => ({
  dialog: {},
  dialogContent: {
    padding: theme.spacing(0, 3),
  },
  dialogInput: {
    margin: theme.spacing(1, 0),
  },
  dialogTitle: {
    padding: theme.spacing(2, 3),
  },
}));

function RemoveProjectDialog(props) {
  const classes = useStyles();
  const db = fire.firestore();

  // function addNewProject() {
  //   db.collection("projects")
  //     .doc()
  //     .set({
  //       date: projectDate,
  //       name: projectName,
  //       hours: projectHours,
  //     })
  //     .then(() => {
  //       props.updateProjects();
  //       props.handleOpenCloseDialog();
  //     })
  //     .catch((error) => {
  //       console.error("Error adding new project: ", error);
  //     });
  // }

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleOpenCloseDeleteDialog}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth={"sm"}
      className={classes.dialog}
    >
      <DialogTitle className={classes.dialogTitle}>Remove project</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        Are you sure you want to delete project?
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => props.handleOpenCloseDialog()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => props.deleteItem()}
          color="secondary"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveProjectDialog;
