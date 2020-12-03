<<<<<<< HEAD
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeaderTitle: {
    fontWeight: 600,
  },
  deleteButton: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

function ProjectsTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderTitle}>Lp.</TableCell>
            <TableCell className={classes.tableHeaderTitle} align="center">
              Date
            </TableCell>
            <TableCell className={classes.tableHeaderTitle} align="center">
              Project
            </TableCell>
            <TableCell className={classes.tableHeaderTitle} align="center">
              Hours
            </TableCell>
            <TableCell className={classes.tableHeaderTitle} align="center">
              Select
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.projectsData ? (
            props.projectsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" size="small">
                  1
                </TableCell>
                <TableCell align="center">
                  {moment(item.date).local().format("DD-MM-yyyy")}
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.hours}</TableCell>
                <TableCell align="center">
                  {/* <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.deleteItem(item.id)}
                    // disabled={checkedElements.length === 0}
                  >
                  </Button> */}
                  <DeleteIcon
                    className={classes.deleteButton}
                    color="secondary"
                    onClick={() => props.handleOpenCloseDeleteDialog(item.id)}
                    // onClick={() => props.deleteItem(item.id)}
                    // onClick={() => props.handleOpenCloseDeleteDialog()}
                  />

                  {/* <Checkbox
                    checked={props.checkedElements.includes(item.id)}
                    onChange={() => props.handleCheck(item.id)}
                    color="primary"
                  /> */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <span>No data</span>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectsTable;
=======
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  monthContainer: {
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  tableHeaderTitle: {
    fontWeight: 600,
  },
}));

function ProjectsTable(props) {
  const classes = useStyles();
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });

  return (
    <>
      <Grid container className={classes.monthContainer} justify='center'>
        <Grid item>
          <Typography variant='h5'> 📅 Working hours for {month} 📅</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderTitle}>Lp.</TableCell>
                <TableCell className={classes.tableHeaderTitle} align='center'>
                  Date
                </TableCell>
                <TableCell className={classes.tableHeaderTitle} align='center'>
                  Project
                </TableCell>
                <TableCell className={classes.tableHeaderTitle} align='center'>
                  Hours
                </TableCell>
                <TableCell className={classes.tableHeaderTitle} align='center'>
                  Select
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.projectsData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component='th' scope='row' size='small'>
                    {index + 1}
                  </TableCell>
                  <TableCell align='center'>{item.date}</TableCell>
                  <TableCell align='center'>{item.name}</TableCell>
                  <TableCell align='center'>
                    {`${item.time.hours},${
                      item.time.minutes < 10
                        ? "0" + item.time.minutes
                        : item.time.minutes
                    }`}
                  </TableCell>
                  <TableCell align='center'>
                    <Checkbox
                      checked={props.checkedElement === item.id}
                      onChange={() => props.handleCheck(item.id)}
                      color='primary'
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default ProjectsTable;
>>>>>>> 0cdb158daa8daf2fb6a50d855b475677d2f36ec6
