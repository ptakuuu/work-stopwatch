import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  showtimeContainer: {
    paddingBottom: theme.spacing(2),
  },
}));

function Stopwatch(props) {
  const classes = useStyles();
  const [showTime, setShowTime] = React.useState("00 : 00 : 00");
  const [t, setT] = React.useState();
  const [started, setStarted] = React.useState(false);
  const [stopped, setStopped] = React.useState(false);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  function stopTimer() {
    clearInterval(t);
    setStopped(true);
    setStarted(false);
  }

  function clearTimer() {
    clearInterval(t);
    setShowTime("00 : 00 : 00");
    setStarted(false);
  }

  function setHigher(timestamp) {
    if (timestamp === "seconds") {
      minutes++;
      seconds = 0;
    } else {
      hours++;
      minutes = 0;
    }
  }

  function startTimer() {
    let t;
    setStarted(true);
    t = setInterval(() => {
      if (seconds === 60) {
        setHigher("seconds");
      } else if (minutes === 60) {
        setHigher("minutes");
      }
      seconds++;
      setShowTime(
        `${hours < 10 ? "0" + hours : hours} : ${
          minutes < 10 ? "0" + minutes : minutes
        } : ${seconds < 10 ? "0" + seconds : seconds}`
      );
    }, 0.001);

    setT(t);
  }

  return (
    <>
      <Grid container justify='center' className={classes.showtimeContainer}>
        <Grid container item justify='center'>
          <Typography variant='h4'>{showTime}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant='contained'
            color={started ? "secondary" : "primary"}
            onClick={started ? () => stopTimer() : () => startTimer()}
          >
            {started ? "Stop" : "Start"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            color='default'
            onClick={() => clearTimer()}
            disabled={started || !stopped}
          >
            Clear
          </Button>
        </Grid>
        {props.stopWatchExtended && (
          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => props.addHours(showTime)}
              disabled={started || !stopped}
            >
              Add
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Stopwatch;
