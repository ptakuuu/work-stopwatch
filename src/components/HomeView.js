import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

import ProjectsTable from "./ProjectsTable";
import ProjectDialog from "./ProjectDialog";

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
  const [checkedElements, setCheckedElements] = React.useState([]);

  React.useEffect(() => {
    if (loading) {
      getProjects();
    }
  }, []);

  async function getProjects() {
    const projects = await db.collection("projects").get();
    projects.docs.map((item) =>
      projectsData.push({
        ...item.data(),
        id: item.id,
      })
    );
    setIsLoading(false);
  }

  function updateProjects() {
    db.collection("projects").onSnapshot(function (querySnapshot) {
      var projects = [];
      querySnapshot.forEach(function (doc) {
        projects.push(doc.data());
      });
      setProjectsData(projects);
    });
  }

  function handleOpenCloseDialog() {
    setOpenDialog(!openDialog);
  }

  function handleCheck(event, id) {
    let checkedElementsCopy = checkedElements;
    if (checkedElementsCopy.includes(id)) {
      checkedElementsCopy = checkedElementsCopy.filter((item) => item !== id);
    } else {
      checkedElementsCopy.push(id);
    }
    setCheckedElements(checkedElementsCopy);
    console.log(checkedElements);
  }

  function deleteItems(ids) {
    ids.map((item) => {
      db.collection("projects")
        .doc(item)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
      updateProjects();
    });
  }

  return !loading ? (
    <Grid container justify="center">
      <ProjectDialog
        openDialog={openDialog}
        handleOpenCloseDialog={handleOpenCloseDialog}
        updateProjects={updateProjects}
      />
      <Grid container item md={10} className={classes.tableItem}>
        <Grid item xs={12}>
          <ProjectsTable
            projectsData={projectsData}
            checkedElements={checkedElements}
            handleCheck={handleCheck}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="flex-end"
          className={classes.buttonsContainer}
          spacing={2}
        >
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteItems(checkedElements)}
              disabled={!checkedElements.length}
            >
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenCloseDialog}
            >
              Add new
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <span>Loading</span>
  );
}

export default withRouter(HomeView);
