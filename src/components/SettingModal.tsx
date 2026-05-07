import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeProvider";
import type { Color, Font, BreakTimes, Mode } from "../types/types";
import { setStart, stop } from "../utils/script";
import ArrowUp from "../components/ArrowUP.svg";
import ArrowDown from "../components/ArrowDown.svg";
const baseUrl = import.meta.env.BASE_URL;

const SettingsModal = () => {
  const context = useContext(ThemeContext);
  let [tbreak, tsetBreak] = useState<BreakTimes>({
    pomodoro: context?.breakTimes?.pomodoro || 25,
    short: context?.breakTimes?.short || 5,
    long: context?.breakTimes?.long || 15,
  });
  const show = context?.showSetting || false;
  const setMode = context?.setMode || (() => {});
  const setShowSetting = context?.setShowSetting || (() => {});
  const setColor = context?.setColor || (() => {});
  const setFont = context?.setFont || (() => {});
  const setBreakTimes = context?.setBreakTimes || (() => {});

  const [tfont, tsetFont] = useState<Font>(context?.font || "font-p");
  const [tcolor, tsetColor] = useState<Color>(context?.color || "Red");
  // Re-run if color changes
  function stepUp(which: Mode) {
    if (tbreak[which] >= 60) {
      return;
    }
    tsetBreak({
      ...tbreak,
      [which]: tbreak[which] + 1,
    });
  }
  function stepDown(which: Mode) {
    if (tbreak[which] <= 1) {
      return;
    }
    tsetBreak({ ...tbreak, [which]: tbreak[which] - 1 });
  }

  return (
    <div className={`settings-modal ${show ? "show" : ""}`}>
      <header>
        <h2>Settings</h2>
        <button type="button" className="close" aria-label="Close">
          <img
            src={`${baseUrl}/assets/close.svg`}
            alt="close"
            onClick={() => setShowSetting(false)}
          />
        </button>
      </header>

      <div className="settings-content">
        {/* Time Settings */}
        <section className="section1">
          <h3>Time (Minutes)</h3>
          <div className="time-inputs">
            <form className="input-group">
              <label htmlFor="pomodoro">pomodoro</label>
              <input
                id="pomodoro"
                type="number"
                value={tbreak.pomodoro}
                min={1}
                onChange={(e) => {
                  const val = +e.target.value;
                  // Only update state if the value is 1 or higher
                  if (val >= 1 && val <= 60) {
                    tsetBreak({ ...tbreak, pomodoro: val });
                  }
                }}
              />{" "}
              <div className="arrow-container">
                <button
                  type="button"
                  className="arrow up"
                  onClick={(e) => {
                    e.preventDefault();
                    stepUp("pomodoro");
                  }}
                >
                  <img className="svg-icon" src={ArrowUp} alt="up" />
                </button>
                <button
                  type="button"
                  className="arrow down"
                  onClick={(e) => {
                    e.preventDefault();
                    stepDown("pomodoro");
                  }}
                >
                  <img className="svg-icon" src={ArrowDown} alt="down" />
                </button>
              </div>
            </form>

            <form className="input-group">
              <label htmlFor="short">short break</label>
              <input
                id="short"
                type="number"
                value={tbreak.short}
                min={1}
                onChange={(e) => {
                  const val = +e.target.value;
                  // Only update state if the value is 1 or higher
                  if (val >= 1 && val <= 60) {
                    tsetBreak({ ...tbreak, short: val });
                  }
                }}
              />
              <div className="arrow-container">
                <button
                  type="button"
                  className="arrow up"
                  onClick={(e) => {
                    e.preventDefault();
                    stepUp("short");
                  }}
                >
                  <img className="svg-icon" src={ArrowUp} alt="up" />
                </button>
                <button
                  type="button"
                  className="arrow down"
                  onClick={(e) => {
                    e.preventDefault();
                    stepDown("short");
                  }}
                >
                  <img className="svg-icon" src={ArrowDown} alt="down" />
                </button>
              </div>
            </form>
            <form className="input-group">
              <label htmlFor="long">long break</label>
              <input
                id="long"
                type="number"
                value={tbreak.long}
                min={1}
                onChange={(e) => {
                  const val = +e.target.value;
                  // Only update state if the value is 1 or higher
                  if (val >= 1 && val <= 60) {
                    tsetBreak({ ...tbreak, long: val });
                  }
                }}
              />
              <div className="arrow-container">
                <button
                  type="button"
                  className="arrow up"
                  onClick={(e) => {
                    e.preventDefault();
                    stepUp("long");
                  }}
                >
                  <img className="svg-icon" src={ArrowUp} alt="up" />
                </button>
                <button
                  type="button"
                  className="arrow down"
                  onClick={(e) => {
                    e.preventDefault();
                    stepDown("long");
                  }}
                >
                  <img className="svg-icon" src={ArrowDown} alt="down" />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Font Settings */}
        <section className="selection-row">
          <h3>Font</h3>
          <div className="font-group">
            <button
              type="button"
              className={`font-p ${tfont === "font-p" ? "active" : ""}`}
              onClick={(_) => tsetFont("font-p")}
            >
              Aa
            </button>
            <button
              type="button"
              className={`font-s ${tfont === "font-s" ? "active" : ""}`}
              onClick={(_) => tsetFont("font-s")}
            >
              Aa
            </button>
            <button
              type="button"
              className={`font-m ${tfont === "font-m" ? "active" : ""}`}
              onClick={(_) => tsetFont("font-m")}
            >
              Aa
            </button>
          </div>
        </section>

        {/* Color Settings */}
        <section className="selection-row">
          <h3>Color</h3>
          <div className="color-group">
            <img
              src={`${baseUrl}/assets/check.svg`}
              alt="checkmark"
              className={tcolor}
            />

            <button
              type="button"
              className="red"
              onClick={(_) => tsetColor("Red")}
            ></button>
            <button
              type="button"
              className="cyan"
              onClick={(_) => tsetColor("Cyan")}
            ></button>
            <button
              type="button"
              className="purple"
              onClick={(_) => tsetColor("Purple")}
            ></button>
          </div>
        </section>
      </div>

      <button
        type="button"
        className="btn-apply"
        onClick={() => {
          setColor(tcolor);
          setFont(tfont);
          setBreakTimes(tbreak);
          setMode("pomodoro");
          stop();
          setStart(tbreak.pomodoro);
          setShowSetting(false);
        }}
      >
        Apply
      </button>
    </div>
  );
};

export default SettingsModal;
