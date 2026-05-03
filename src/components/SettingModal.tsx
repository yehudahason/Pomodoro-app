const SettingsModal = () => {
  return (
    <div className="settings-modal">
      <header>
        <h2>Settings</h2>
        <button aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <path
              fill="#1E213F"
              fillRule="evenodd"
              d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
              opacity=".5"
            />
          </svg>
        </button>
      </header>

      <div className="settings-content">
        {/* Time Settings */}
        <section>
          <h3>Time (Minutes)</h3>
          <div className="time-inputs">
            <div className="input-group">
              <label>pomodoro</label>
              <input type="number" defaultValue={25} min={1} />
            </div>
            <div className="input-group">
              <label>short break</label>
              <input type="number" defaultValue={5} min={1} />
            </div>
            <div className="input-group">
              <label>long break</label>
              <input type="number" defaultValue={15} min={1} />
            </div>
          </div>
        </section>

        {/* Font Settings */}
        <section className="selection-row">
          <h3>Font</h3>
          <div className="radio-group">
            <button className="active">Aa</button>
            <button>Aa</button>
            <button>Aa</button>
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
            <button className="color-cyan"></button>
            <button className="color-purple"></button>
          </div>
        </section>
      </div>

      <button className="btn-apply">Apply</button>
    </div>
  );
};

export default SettingsModal;
