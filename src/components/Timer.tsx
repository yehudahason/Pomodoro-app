export default function Timer() {
  return (
    <div className="timer-container">
      <svg className="timer-svg" viewBox="0 0 200 200">
        <circle className="bg" cx="100" cy="100" r="89" />
        <circle className="progress" cx="100" cy="100" r="89" />
      </svg>
      <div id="time-display">
        <h1></h1>
        <p>start</p>
      </div>
    </div>
  );
}
