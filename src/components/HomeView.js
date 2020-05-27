import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

import ProjectsTable from "./ProjectsTable";
import ProjectDialog from "./ProjectDialog";
import Stopwatch from "./Stopwatch";

import fire from "../firebase-config";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tableItem: {
    paddingTop: theme.spacing(4),
  },
  buttonsContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

function HomeView() {
  const db = fire.firestore();
  const classes = useStyles();
  const [loading, setIsLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [projectsData, setProjectsData] = React.useState([]);
  const [checkedElement, setCheckedElement] = React.useState(null);

  React.useEffect(() => {
    if (loading) {
      getProjects();
    }
  }, []);

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

  function handleOpenCloseDialog() {
    setOpenDialog(!openDialog);
  }

  function handleCheck(id) {
    setCheckedElement(id);
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

  return !loading ? (
    <Grid container justify='center'>
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
              // onClick={() => deleteItem()}
              disabled={!checkedElement}
            >
              Start timing
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
        <Grid container>
          <Grid item>
            <Stopwatch />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <span>Loading</span>
  );
}

export default withRouter(HomeView);
