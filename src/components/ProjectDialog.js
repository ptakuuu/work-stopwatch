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

function getActualDate() {
  let today = new Date();
  let month = today.getMonth() + 1;
  if (month < 10) month = `0` + month;
  return today.getFullYear() + "-" + month + "-" + today.getDate();
}

function ProjectDialog(props) {
  const classes = useStyles();

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleOpenCloseDialog}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth={"sm"}
      className={classes.dialog}
    >
      <DialogTitle className={classes.dialogTitle}>Add new project</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          label="Date"
          fullWidth
          type="date"
          className={classes.dialogInput}
          defaultValue={getActualDate()}
        />
        <TextField
          autoFocus
          label="Project"
          fullWidth
          className={classes.dialogInput}
        />
        <TextField
          label="Hours"
          fullWidth
          type="number"
          className={classes.dialogInput}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={props.handleOpenCloseDialog}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={props.handleOpenCloseDialog}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDialog;
