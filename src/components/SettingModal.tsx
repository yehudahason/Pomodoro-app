import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
const baseUrl = import.meta.env.BASE_URL;

const SettingsModal = () => {
  const context = useContext(ThemeContext);
  const setColor = context?.setColor || (() => {});
  const setFont = context?.setFont || (() => {});
  const setBreakTimes = context?.setBreakTimes || (() => {});

  let tcolor = "Cyan";
  let tfont = "font-m";
  let tbreak = {
    pomodoro: 25,
    short: 5,
    long: 15,
  };
  // Re-run if color changes
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
        <section>
          <h3>Time (Minutes)</h3>
          <div className="time-inputs">
            <div className="input-group">
              <label>pomodoro</label>
              <input
                type="number"
                defaultValue={25}
                min={1}
                onChange={(e) => {
                  tbreak = { ...tbreak, pomodoro: +e.target.value };
                }}
              />
            </div>
            <div className="input-group">
              <label>short break</label>
              <input
                type="number"
                defaultValue={5}
                min={1}
                onChange={(e) => {
                  tbreak = { ...tbreak, short: +e.target.value };
                }}
              />
            </div>
            <div className="input-group">
              <label>long break</label>
              <input
                type="number"
                defaultValue={15}
                min={1}
                onChange={(e) => {
                  tbreak = { ...tbreak, long: +e.target.value };
                }}
              />
            </div>
          </div>
        </section>

        {/* Font Settings */}
        <section className="selection-row">
          <h3>Font</h3>
          <div className="radio-group">
            <button
              type="button"
              className="color-btn active"
              onClick={(_) => (tfont = "font-p")}
            >
              Aa
            </button>
            <button
              type="button"
              className="color-btn"
              onClick={(_) => (tfont = "font-s")}
            >
              Aa
            </button>
            <button
              type="button"
              className="color-btn"
              onClick={(_) => (tfont = "font-m")}
            >
              Aa
            </button>
          </div>
        </section>

        {/* Color Settings */}
        <section className="selection-row">
          <h3>Color</h3>
          <div className="radio-group">
            <button className="color-red active">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11">
                <path
                  fill="none"
                  stroke="#1E213F"
                  strokeWidth="2"
                  d="M1 5.5l4.5 4.5L14 1"
                />
              </svg>
            </button>
            <button className="color-cyan" onClick={(_) => (tcolor = "Cyan")}>
              Cyan
            </button>
            <button
              type="button"
              className="color-red"
              onClick={(_) => (tcolor = "Red")}
            >
              Red
            </button>
            <button
              type="button"
              className="color-purple"
              onClick={(_) => (tcolor = "Purple")}
            >
              Purple
            </button>
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
