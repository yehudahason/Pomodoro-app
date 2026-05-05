import { Outlet } from "react-router-dom";
import { run } from "./utils/script";
import { useState, useContext, useLayoutEffect } from "react";
import type { Mode } from "./types/types";
import { ThemeContext } from "./ThemeProvider";

// Define the modes for better type safety
const baseUrl = import.meta.env.BASE_URL;

const Layout = () => {
  const [activeMode, setActiveMode] = useState<Mode>("pomodoro");
  const context = useContext(ThemeContext);
  const color = context?.color || "Cyan";
  const font = context?.font || "font-m";
  const showSetting = context?.showSetting || false;
  const setShowSetting = context?.setShowSetting || (() => {});
  const breakTimes = context?.breakTimes || {
    pomodoro: 25,
    short: 5,
    long: 15,
  };

  const handleModeChange = (mode: Mode, time: number) => {
    // 1. Update the UI state
    setActiveMode(mode);

    // 2. Trigger the timer logic (which now handles its own AbortController)
    run(time);
  };

  useLayoutEffect(() => {
    // Update the body background based on the context color
    document.body.className = font.toLowerCase();
  }, [font]);
  return (
    <div className="app-wrapper">
      <header>
        <h1>Pomodoro</h1>
        <nav>
          <ul>
            <li>
              <button
                type="button"
                className={`btn ${color.toLowerCase()} ${activeMode === "pomodoro" ? "active" : ""}`}
                onClick={() =>
                  handleModeChange("pomodoro", breakTimes.pomodoro)
                }
              >
                pomodoro
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`btn ${color.toLowerCase()} ${activeMode === "short" ? "active" : ""}`}
                onClick={() => handleModeChange("short", breakTimes.short)}
              >
                short break
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`btn ${color.toLowerCase()} ${activeMode === "long" ? "active" : ""}`}
                onClick={() => handleModeChange("long", breakTimes.long)}
              >
                long break
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className="setting-btn">
          <img
            src={`${baseUrl}/assets/icon-settings.svg`}
            alt=""
            onClick={() => setShowSetting(!showSetting)}
          />
        </div>
        <p>© 2026 My SPA</p>
      </footer>
    </div>
  );
};

export default Layout;
