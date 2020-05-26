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

  React.useEffect(() => {
    if (loading) {
      getProjects();
    }
  }, []);

  async function getProjects() {
    const projects = await db.collection("projects").get();
    projects.docs.map((item) => projectsData.push(item.data()));
    setIsLoading(false);
  }

  const handleOpenCloseDialog = () => {
    setOpenDialog(!openDialog);
  };

  return !loading ? (
    <Grid container justify="center">
      <ProjectDialog
        openDialog={openDialog}
        handleOpenCloseDialog={handleOpenCloseDialog}
      />
      <Grid container item md={10} className={classes.tableItem}>
        <Grid item xs={12}>
          <ProjectsTable projectsData={projectsData} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="flex-end"
          className={classes.buttonsContainer}
        >
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
  ) : (
    <span>Loading</span>
  );
}

export default withRouter(HomeView);
