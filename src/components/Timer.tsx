import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../ThemeProvider";
import { pause, setStart, start, stop } from "../utils/script";
import type { KeyboardEvent } from "react";
let restartVar = false;

export function handleRestart() {
  restartVar = true;
}
export default function Timer() {
  const context = useContext(ThemeContext);
  const color = context?.color || "Cyan";
  const breakTimes = context?.breakTimes || {
    pomodoro: 25,
    short: 5,
    long: 15,
  };
  const mode = context?.mode || "pomodoro";
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [needsRestart, setNeedsRestart] = useState<boolean>(false);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleChange();
    } else if (event.key === "Escape") {
      event.preventDefault();
      stop();
      setIsRunning(false);
      setNeedsRestart(false);
      setStart(breakTimes[mode]);
    }
  };
  // 1. Monitor the external variable
  useEffect(() => {
    const timer = setInterval(() => {
      if (restartVar) {
        setNeedsRestart(true);
        restartVar = false;
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // 2. Reset timer when mode/settings change
  useEffect(() => {
    setIsRunning(false);
    stop(); // Assuming you want to stop the old timer
  }, [breakTimes, mode]);

  function handleChange() {
    if (isRunning) {
      if (needsRestart) {
        start(breakTimes[mode]);
        setNeedsRestart(false);
      } else {
        pause();
        setIsRunning(false);
      }
    } else {
      start(breakTimes[mode]);
      setIsRunning(true);
    }
  }
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
        <h1>00:00</h1>
        <div
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onClick={handleChange}
          className={color.toLowerCase()}
        >
          <p>{isRunning ? (needsRestart ? "Restart" : "Pause") : "Start"}</p>
        </div>
      </div>
    </div>
  );
}
