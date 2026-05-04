export default function Timer() {
  return (
    <div className="timer-container">
      <svg className="timer-svg" viewBox="0 0 200 200">
        <circle className="bg" cx="100" cy="100" r="87" />
        <circle className="progress" cx="100" cy="100" r="87" />
      </svg>
      <div className="text">17:59</div>
    </div>
  );
}
