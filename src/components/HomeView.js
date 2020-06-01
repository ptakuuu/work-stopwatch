import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Paper, Typography } from "@material-ui/core";

import ProjectsTable from "./ProjectsTable";
import ProjectDialog from "./ProjectDialog";
import Stopwatch from "./Stopwatch";

import SnackBar from "./SnackBar";

import fire from "../firebase-config";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  buttonsContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  stopwatchContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: theme.spacing(3, 5),
    margin: theme.spacing(2),
  },
}));

function HomeView(props) {
  const db = fire.firestore();
  const classes = useStyles();
  const [loading, setIsLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [projectsData, setProjectsData] = React.useState([]);
  const [checkedElement, setCheckedElement] = React.useState(null);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [showTimer, setShowTimer] = React.useState();
  const [stopWatchExtended, setStopWatchExtended] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      getProjects();
    }
  }, [loading]);

  async function getProjects() {
    const firebaseProjects = await db.collection("projects").get();
    let projects = [];
    firebaseProjects.docs.map((item) =>
      projects.push({
        ...item.data(),
        id: item.id,
      })
    );
    setProjectsData(projects);
    setIsLoading(false);
  }

  async function getActualProject(id) {
    let project;

    if (id) {
      project = await db.collection("projects").doc(id).get();
    } else {
      project = await db.collection("projects").doc(checkedElement).get();
    }

    project = project.data();
    setSelectedProject(project);
  }

  function handleOpenCloseDialog() {
    setOpenDialog(!openDialog);
  }

  function handleCheck(id) {
    setShowTimer(false);
    setCheckedElement(id);
    getActualProject(id);
  }

  function deleteItem() {
    db.collection("projects")
      .doc(checkedElement)
      .delete()
      .then(() => {
        setCheckedElement(null);
        getProjects();
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  function setActualProject() {
    getActualProject();
    setShowTimer(true);
  }

  async function addHours(time) {
    let hoursToAdd = parseFloat(time.substr(0, 2));
    let minutesToAdd = parseFloat(time.substr(5, 2));
    let project = await db.collection("projects").doc(checkedElement);
    let projectElements = await db
      .collection("projects")
      .doc(checkedElement)
      .get();
    projectElements = projectElements.data();

    hoursToAdd += projectElements.time.hours;
    minutesToAdd += projectElements.time.minutes;

    if (minutesToAdd >= 60) {
      hoursToAdd += 1;
      minutesToAdd -= 60;
    }

    project.update({
      time: {
        hours: hoursToAdd,
        minutes: minutesToAdd,
      },
    });

    setShowSnackbar(true);
    getProjects();
    setShowTimer(false);
    setSelectedProject(null);
    setCheckedElement(null);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  }

  return !loading ? (
    <>
      {showTimer && (
        <Paper
          className={classes.stopwatchContainer}
          onMouseEnter={() => setStopWatchExtended(true)}
          onMouseLeave={() => setStopWatchExtended(false)}
        >
          {stopWatchExtended && (
            <Grid container justify='center'>
              <Grid item>
                <Typography variant='h6'>{selectedProject.name}</Typography>
              </Grid>
            </Grid>
          )}
          <Stopwatch
            stopWatchExtended={stopWatchExtended}
            addHours={addHours}
          />
        </Paper>
      )}
      <Grid container justify='center' className={classes.mainContainer}>
        <ProjectDialog
          openDialog={openDialog}
          handleOpenCloseDialog={handleOpenCloseDialog}
          getProjects={getProjects}
        />
        <Grid container item md={10} className={classes.tableItem}>
          <Grid item xs={12}>
            <ProjectsTable
              projectsData={projectsData}
              checkedElement={checkedElement}
              handleCheck={handleCheck}
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            justify='flex-end'
            className={classes.buttonsContainer}
            spacing={2}
          >
            <Grid item>
              <Button
                variant='contained'
                color='default'
                onClick={() => setActualProject()}
                disabled={!checkedElement || showTimer}
              >
                Timing
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => deleteItem()}
                disabled={!checkedElement}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={handleOpenCloseDialog}
              >
                Add new
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {showSnackbar && (
        <SnackBar type='success' message='Succesfully added hours' />
      )}
    </>
  ) : (
    <span>Loading</span>
  );
}

export default withRouter(HomeView);
