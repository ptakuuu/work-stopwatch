import React from "react";

export default function Stopwatch() {
  const [showTime, setShowTime] = React.useState();
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let t;

  function add() {
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
    }, 1);
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
    add();
  }

  return (
    <>
      <div>{showTime}</div>
      <div>
        <button onClick={() => startTimer()}>Start</button>
        <button onClick={() => clearInterval(t)}>Stop</button>
      </div>
    </>
  );
}
