import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeProvider";
import type { Color, Font, BreakTimes, Mode } from "../types/types";
const baseUrl = import.meta.env.BASE_URL;

const SettingsModal = () => {
  const context = useContext(ThemeContext);
  let [tbreak, tsetBreak] = useState<BreakTimes>({
    pomodoro: context?.breakTimes?.pomodoro || 25,
    short: context?.breakTimes?.short || 5,
    long: context?.breakTimes?.long || 15,
  });
  const [tfont, tsetFont] = useState<Font>(context?.font || "font-m");
  const [tcolor, tsetColor] = useState<Color>(context?.color || "Cyan");

  const setColor = context?.setColor || (() => {});
  const setFont = context?.setFont || (() => {});
  const setBreakTimes = context?.setBreakTimes || (() => {});

  // Re-run if color changes
  function stepUp(which: Mode) {
    tsetBreak({
      ...tbreak,
      [which]: tbreak[which] + 1,
    });
  }
  function stepDown(which: Mode) {
    tsetBreak({ ...tbreak, [which]: tbreak[which] - 1 });
  }

  useEffect(() => {
    console.log(tcolor);
  }, [tcolor]);

  return (
    <div className="settings-modal">
      <header>
        <h2>Settings</h2>
        <button aria-label="Close">
          <img src={`${baseUrl}/assets/icon-close.svg`} alt="close" />
        </button>
      </header>

      <div className="settings-content">
        {/* Time Settings */}
        <section className="section1">
          <h3>Time (Minutes)</h3>
          <div className="time-inputs">
            <div className="input-group">
              <label>pomodoro</label>
              <input
                type="number"
                value={tbreak.pomodoro}
                min={1}
                onChange={(e) => {
                  tsetBreak({ ...tbreak, pomodoro: +e.target.value });
                }}
              />
              <div className="arrow-container">
                <button
                  className="arrow up"
                  onClick={(_) => stepUp("pomodoro")}
                >
                  <img src={`${baseUrl}/assets/icon-arrow-up.svg`} alt="up" />
                </button>
                <button
                  className="arrow down"
                  onClick={(_) => stepDown("pomodoro")}
                >
                  <img
                    src={`${baseUrl}/assets/icon-arrow-down.svg`}
                    alt="down"
                  />
                </button>
              </div>
            </div>
            <div className="input-group">
              <label>short break</label>
              <input
                type="number"
                value={tbreak.short}
                min={1}
                onChange={(e) => {
                  tsetBreak({ ...tbreak, short: +e.target.value });
                }}
              />
              <div className="arrow-container">
                <button className="arrow up" onClick={(_) => stepUp("short")}>
                  <img src={`${baseUrl}/assets/icon-arrow-up.svg`} alt="up" />
                </button>
                <button
                  className="arrow down"
                  onClick={(_) => stepDown("short")}
                >
                  <img
                    src={`${baseUrl}/assets/icon-arrow-down.svg`}
                    alt="down"
                  />
                </button>
              </div>
            </div>
            <div className="input-group">
              <label>long break</label>
              <input
                type="number"
                value={tbreak.long}
                min={1}
                onChange={(e) => {
                  tsetBreak({ ...tbreak, long: +e.target.value });
                }}
              />
              <div className="arrow-container">
                <button className="arrow up" onClick={(_) => stepUp("long")}>
                  <img src={`${baseUrl}/assets/icon-arrow-up.svg`} alt="up" />
                </button>
                <button
                  className="arrow down"
                  onClick={(_) => stepDown("long")}
                >
                  <img
                    src={`${baseUrl}/assets/icon-arrow-down.svg`}
                    alt="down"
                  />
                </button>
              </div>
            </div>
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
              className="cyan"
              onClick={(_) => tsetColor("Cyan")}
            ></button>
            <button
              type="button"
              className="red"
              onClick={(_) => tsetColor("Red")}
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
        className="btn-apply"
        onClick={() => {
          setColor(tcolor);
          setFont(tfont);
          setBreakTimes(tbreak);
        }}
      >
        Apply
      </button>
    </div>
  );
};

export default SettingsModal;
