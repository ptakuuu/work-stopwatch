import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeaderTitle: {
    fontWeight: 600,
  },
});

function ProjectsTable(props) {
  const classes = useStyles();

  return (
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
                {`${item.time.hours}.${
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
  );
}

export default ProjectsTable;
