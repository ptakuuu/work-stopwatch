<<<<<<< HEAD
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
import moment from "moment";

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
  const db = fire.firestore();
  const [projectDate, setProjectDate] = React.useState(getActualDate());
  const [projectName, setProjectName] = React.useState();
  const [projectHours, setProjectHours] = React.useState();

  function addNewProject() {
    db.collection("projects")
      .doc()
      .set({
        date: projectDate,
        name: projectName,
        hours: projectHours,
      })
      .then(() => {
        props.updateProjects();
        props.handleOpenCloseDialog();
      })
      .catch((error) => {
        console.error("Error adding new project: ", error);
      });
  }

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
          format="yyyy-MM-dd"
          className={classes.dialogInput}
          defaultValue={moment().local().format("yyyy-MM-DD")}
          onChange={(e) => setProjectDate(e.target.value)}
        />
        <TextField
          autoFocus
          label="Name"
          fullWidth
          className={classes.dialogInput}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <TextField
          label="Hours"
          fullWidth
          type="number"
          className={classes.dialogInput}
          onChange={(e) => setProjectHours(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={props.handleOpenCloseDialog}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => addNewProject()}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDialog;
=======
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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

function getActualDate() {
  let today = new Date();
  let month = today.getMonth() + 1;
  if (month < 10) month = `0` + month;
  return (
    today.getFullYear() +
    "-" +
    month +
    "-" +
    (today.getDate() < 10 ? "0" + today.getDate() : today.getDate())
  );
}

function ProjectDialog(props) {
  const classes = useStyles();
  const db = fire.firestore();
  const [projectDate, setProjectDate] = React.useState(getActualDate());
  const [projectName, setProjectName] = React.useState("");
  const [projectTime, setProjectTime] = React.useState("00.00");

  function addNewProject() {
    db.collection("projects")
      .doc()
      .set({
        date: projectDate,
        name: projectName,
        time: {
          hours: parseInt(projectTime.substr(0, 2)),
          minutes: parseInt(projectTime.substr(3, 2)),
        },
      })
      .then(() => {
        console.log("Project succesfully added!");
        setProjectDate(getActualDate());
        setProjectName("");
        setProjectTime("00.00");
        props.getProjects();
        props.handleOpenCloseDialog();
      })
      .catch((error) => {
        console.error("Error adding new project: ", error);
      });
  }

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleOpenCloseDialog}
      aria-labelledby='form-dialog-title'
      fullWidth
      maxWidth={"sm"}
      className={classes.dialog}
    >
      <DialogTitle className={classes.dialogTitle}>Add new project</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          label='Date'
          fullWidth
          type='date'
          className={classes.dialogInput}
          defaultValue={getActualDate()}
          onChange={(e) => setProjectDate(e.target.value)}
        />
        <TextField
          autoFocus
          label='Name'
          fullWidth
          className={classes.dialogInput}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <TextField
          label='Hours'
          fullWidth
          type='number'
          defaultValue={projectTime}
          className={classes.dialogInput}
          onChange={(e) => setProjectTime(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={props.handleOpenCloseDialog}
          color='secondary'
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={() => addNewProject()}
          color='primary'
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDialog;
>>>>>>> 0cdb158daa8daf2fb6a50d855b475677d2f36ec6
