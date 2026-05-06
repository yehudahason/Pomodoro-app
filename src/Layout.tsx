import { Outlet } from "react-router-dom";
import { setStart, stop } from "./utils/script";
import { useContext, useLayoutEffect, useEffect } from "react";
import type { Mode } from "./types/types";
import { ThemeContext } from "./ThemeProvider";
import Footer from "./components/Footer";

// Define the modes for better type safety
const baseUrl = import.meta.env.BASE_URL;

const Layout = () => {
  const context = useContext(ThemeContext);
  const color = context?.color || "Cyan";
  const font = context?.font || "font-m";
  const showSetting = context?.showSetting || false;
  const setShowSetting = context?.setShowSetting || (() => {});
  const setMode = context?.setMode || (() => {});
  const mode = context?.mode || (() => {});
  const breakTimes = context?.breakTimes || {
    pomodoro: 25,
    short: 5,
    long: 15,
  };

  const handleModeChange = (mode: Mode) => {
    // 1. Update the UI state
    setMode(mode);
    setStart(breakTimes[mode]);
    // 2. Trigger the timer logic (which now handles its own AbortController)
    stop();
  };
  useLayoutEffect(() => {
    // Update the body background based on the context color
    document.body.className = font.toLowerCase();
  }, [font]);

  useEffect(() => {
    setMode("pomodoro");
    setStart(breakTimes.pomodoro);
  }, []);
  return (
    <div className={`app-wrapper ${showSetting ? "show" : ""}`}>
      <header>
        <h1>Pomodoro</h1>
        <nav>
          <ul>
            <li>
              <button
                type="button"
                className={`btn ${color.toLowerCase()} ${mode === "pomodoro" ? "active" : ""}`}
                onClick={() => {
                  handleModeChange("pomodoro");
                }}
              >
                pomodoro
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`btn ${color.toLowerCase()} ${mode === "short" ? "active" : ""}`}
                onClick={() => {
                  handleModeChange("short");
                }}
              >
                short break
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`btn ${color.toLowerCase()} ${mode === "long" ? "active" : ""}`}
                onClick={() => {
                  handleModeChange("long");
                }}
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
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
