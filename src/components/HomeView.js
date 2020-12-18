import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

import ProjectsTable from "./ProjectsTable";
import ProjectDialog from "./ProjectDialog";
import RemoveProjectDialog from "./RemoveProjectDialog";

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
  const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = React.useState(
    false
  );
  const [projectsData, setProjectsData] = React.useState([]);
  const [checkedElements, setCheckedElements] = React.useState([]);
  const [removedItemId, setRemovedItemId] = React.useState(null);

  React.useEffect(() => {
    if (loading) {
      updateProjects();
    }
  }, []);

  // async function getProjects() {
  //   const projects = await db.collection("projects").get();

  //   projects.docs.map((item) =>
  //     projectsData.push({
  //       ...item.data(),
  //       id: item.id,
  //     })
  //   );
  //   setIsLoading(false);
  // }

  function updateProjects() {
    let elements = [];
    db.collection("projects")
      .orderBy("date", "desc")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          elements.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setProjectsData(elements);
        setIsLoading(false);
      });
  }

  function handleOpenCloseDialog() {
    setOpenDialog(!openDialog);
  }

  function handleCheck(id) {
    let checkedElementsCopy = checkedElements;
    if (checkedElementsCopy.includes(id)) {
      checkedElementsCopy = checkedElementsCopy.filter((item) => item !== id);
    } else {
      checkedElementsCopy.push(id);
    }
    // console.log(checkedElementsCopy);
    setCheckedElements(checkedElementsCopy);
  }

  function deleteItem(id) {
    db.collection("projects")
      .doc(removedItemId)
      .delete()
      .then(function () {
        updateProjects();
        setDeleteProjectDialogOpen(false);
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  const handleOpenCloseDeleteDialog = (id) => {
    setRemovedItemId(id);
    setDeleteProjectDialogOpen(!deleteProjectDialogOpen);
  };

  return !loading ? (
    <Grid container justify="center">
      <ProjectDialog
        openDialog={openDialog}
        handleOpenCloseDialog={handleOpenCloseDialog}
        updateProjects={updateProjects}
      />
      <RemoveProjectDialog
        openDialog={deleteProjectDialogOpen}
        handleOpenCloseDialog={handleOpenCloseDeleteDialog}
        updateProjects={updateProjects}
        deleteItem={deleteItem}
      />
      <Grid container item md={10} className={classes.tableItem}>
        <Grid item xs={12}>
          <ProjectsTable
            projectsData={projectsData}
            checkedElements={checkedElements}
            handleCheck={handleCheck}
            handleOpenCloseDeleteDialog={handleOpenCloseDeleteDialog}
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
