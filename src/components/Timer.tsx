import { useState, useContext, useMemo } from "react";
import { ThemeContext } from "../ThemeProvider";
import { start, stop } from "../utils/script";

export default function Timer() {
  const [runing, setRuning] = useState<boolean>(false);
  const context = useContext(ThemeContext);
  const color = context?.color || "Cyan";
  const breakTimes = context?.breakTimes || {
    pomodoro: 25,
    short: 5,
    long: 15,
  };
  const mode = context?.mode || "pomodoro";
  function handleChange() {
    if (runing) {
      stop();
      setRuning(false);
    } else {
      start(breakTimes[mode]);
      setRuning(true);
    }
  }
  useMemo(() => {
    setRuning(false);
  }, [breakTimes, mode]);
  return (
    <div className="timer-container">
      <svg className="timer-svg" viewBox="0 0 200 200">
        <circle className="bg" cx="100" cy="100" r="89" />
        <circle
          className={`progress ${color.toLowerCase()}`}
          cx="100"
          cy="100"
          r="89"
        />
      </svg>
      <div id="time-display">
        <h1></h1>
        <p
          onClick={(_) => {
            handleChange();
          }}
        >
          {runing ? "Stop" : "Start"}
        </p>
      </div>
    </div>
  );
}
